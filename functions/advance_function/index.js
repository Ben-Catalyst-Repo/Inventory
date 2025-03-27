const express = require('express');
const catalyst = require('zcatalyst-sdk-node'); 
const fileUpload = require('express-fileupload');
const fs = require("fs");
const os = require('os');
const formdata = require('form-data');
const multer = require('multer');
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });      Changed

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit  // New one
}).array('files', 10);


// app.post('/items', upload.single('file'), async (req, res) => {
app.post('/items', upload, async (req, res) => {
	try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const stratus = app.stratus();
        const bucket = stratus.bucket("documents");

        // console.log(req);
        // console.log('params::::', req.query);

        
        // Items Table
        const itemsTable = datastore.table("Items");
        const priceBracketsTable = datastore.table("ItemPriceBrackets");
        const packageDetailsTable = datastore.table("ItemPackageDetails");
        const documentsTable = datastore.table("Documents");
        const itemVendorsTable = datastore.table("ItemVendors");

        // console.log("REQUEST:::", req.body);


// ////////////////    
       const {price_brackets, package_details, vendors} = req.body;  // JSON data file kuda vechu backend ku anupanum apo na epdi handle panalam....


        const itemData = {
            name: req.body.name,
            sku: req.body.sku,
            brand: req.body.brand,
            manufacturer: req.body.manufacturer,
            can_be_purchased: req.body.can_be_purchased,
            can_be_sold: req.body.can_be_sold,
            category_id: req.body.category_id,
            category_name: req.body.category_name,
            description: req.body.description,
            ean: req.body.ean,
            initial_stock: req.body.initial_stock,
            initial_stock_rate: req.body.initial_stock_rate,
            inventory_account_id: req.body.inventory_account_id,
            inventory_account_name: req.body.inventory_account_name,
            is_combo_product: req.body.is_combo_product,
            is_receivable: req.body.is_receivable,
            is_returnable: req.body.is_returnable,
            isbn: req.body.isbn,
            item_type: req.body.item_type,
            maximum_order_quantity: req.body.maximum_order_quantity,
            minimum_order_quantity: req.body.minimum_order_quantity,
            part_number: req.body.part_number,
            product_short_description: req.body.product_short_description,
            product_type: req.body.product_type,
            purchase_account_id: req.body.purchase_account_id,
            purchase_account_name: req.body.purchase_account_name,
            purchase_description: req.body.purchase_description,
            purchase_rate: req.body.purchase_rate,
            rate: req.body.rate,
            sales_rate: req.body.sales_rate,
            unit: req.body.unit,
            upc: req.body.upc,
            vendor_name: req.body.vendor_name
        };

        // console.log("Item Data::: ", itemData);

        const insertedItem = await itemsTable.insertRow(itemData);
        
        console.log("Item data inserted successfully to the Items table");

        console.log("Inserted Item::: ", insertedItem);

        const itemId = insertedItem.ROWID;
        console.log("itemID:::", itemId);

        // Insert Price Brackets 
        if (price_brackets && price_brackets.length > 0) {
            console.log("111");
            const priceBracketsData = price_brackets.map(pb => ({
                item_id: itemId,
                start_quantity: pb.start_quantity,
                end_quantity: pb.end_quantity,
            }));

            console.log("Price Brackets Data:::", priceBracketsData);

            await priceBracketsTable.insertRows(priceBracketsData);
            console.log("priceBrackets Data  inserted successfully to the priceBracketsTable table");
        }

        // Insert Package Details (If provided)
        if (package_details) {
            const packageData = {
                item_id: itemId,
                length: package_details.length,
                width: package_details.width,
                height: package_details.height,
                weight: package_details.weight,
                weight_unit: package_details.weight_unit,
                dimension_unit: package_details.dimension_unit
            };

            await packageDetailsTable.insertRow(packageData);
            console.log("package  Data   inserted successfully to the packageDetailsTable table");
        }

        // Insert Vendors 
        if (vendors && vendors.length > 0) {
            const vendorData = vendors.map(vendor => ({
                item_id: itemId,
                vendor_id: vendor.vendor_id,
                vendor_name: vendor.vendor_name
            }));
            await itemVendorsTable.insertRows(vendorData);
            console.log("vendor Data inserted successfully to the itemVendorsTable table");
        }



        
//         // Insert documents
//         // First upload it to the Catalyst Stratus and then store the path to the Catalyst Datastore

        

        for(let i =0;i<3;i++)
         {
            const fileName = req.files[i].originalname;
            console.log('file::::', req.files[i].originalname);

        // I want to handle below part

        // const fileName = req.file.originalname;
        // console.log('file name:', fileName);
       
        const bucketResponse = await bucket.putObject(
            `item-documents/${fileName}`,
             req.files[i].buffer
          );

        console.log('data::', bucketResponse);
        console.log('File uploaded successfully');

        const unique_path = `item-documents/${fileName}`
        console.log("Unique_path:::", unique_path);

        const documents = {
                    file_path : unique_path,
                    item_id: '26818000000270057',
                    file_name: fileName,
                    file_size_formatted: "95.2 KB",
                };
    
        const insertedDocuments = await documentsTable.insertRow(documents);
        documents.length = 0;
        console.log("Inserted documents:::", insertedDocuments);
    }

        res.status(200).json({
            message: "Item and documents inserted successfully",
            // item: insertedItem,
            // documents: insertedDocuments
        });
    } catch (error) {
        console.error("Error inserting item:", error);
        res.status(500).json({ error: "Failed to insert item" });
    }

});


app.post('/item-group', upload, async (req, res) => {
    console.log("Item-group");

    try{

    const app = catalyst.initialize(req);
    const datastore = app.datastore();
    const stratus = app.stratus();
    const bucket = stratus.bucket("documents");
    console.log("111");
    // Parse incoming data
    // const itemGroup = JSON.parse(req.body.item_group);

    const itemGroup = req.body.item_group;
    // console.log("item group::",itemGroup);
    console.log("222");
    // const { group_id, attributes, documents: groupDocs, items = [] } = itemGroup;
    const { attributes, documents: groupDocs, items = [] } = itemGroup;

    // Initialize table references
    const tables = {
        groups: datastore.table("ItemGroups"),
        items: datastore.table("Items"),
        priceBrackets: datastore.table("ItemPriceBrackets"),
        packageDetails: datastore.table("ItemPackageDetails"),
        documents: datastore.table("Documents"),
        vendors: datastore.table("ItemVendors"),
        attributes: datastore.table("GroupAttributes")
    };

    console.log("Item group name:::", itemGroup.name);

    const itemGrpRes = await tables.groups.insertRow({
        // group_id,
        name: itemGroup.name,
        description: itemGroup.description,
        // inventory_account_id: itemGroup.inventory_account_id,
        manufacturer: itemGroup.manufacturer,
        unit: itemGroup.unit,
        // category_id: itemGroup.category_id,
        // brand_id: itemGroup.brand_id,
        product_type: itemGroup.product_type
    });
    const group_id = itemGrpRes.ROWID;
    console.log("Group ID ROWID:::", group_id);
    // console.log("Item Group Response:::", itemGrpRes);
    console.log("Item group inserted successfully");

    if (attributes?.length) {
        const attrRecords = attributes.map(attr => ({
            group_id: group_id,
            name: attr.name,
            type: attr.type,
            options: JSON.stringify(attr.options)
        }));
       const attributeRes =  await tables.attributes.insertRows(attrRecords);
    //    console.log("Attribute Response:::", attributeRes);
    }

    console.log("Attributes inserted successfully");


    // I NEDD TO CHECK THE DOCUMENTS STORING

    // if (groupDocs?.length && req.files?.length) {
    //     for (const doc of groupDocs) {
    //         const file = req.files.find(f => f.originalname === doc.file_name);
    //         if (file) {
    //             const filePath = `item-groups/${group_id}/${file.originalname}`;
    //             await bucket.putObject(filePath, file.buffer);
                
    //             await tables.documents.insertRow({
    //                 item_id: group_id, 
    //                 file_name: file.originalname,
    //                 file_path: filePath,
    //                 file_size_formatted: doc.file_size_formatted,
    //                 file_type: file.mimetype.split('/')[1],
    //                 uploaded_by: doc.uploaded_by
    //             });
    //         }
    //     }
    // }



     // Process individual items
     for (const itemData of items) {
        // Explicit field mapping for item data
        console.log("itemData name:::", itemData.name);
        const itemRow = {
            name: itemData.name,
            sku: itemData.sku,
            brand: itemData.brand,
            manufacturer: itemData.manufacturer,
            can_be_purchased: itemData.can_be_purchased,
            can_be_sold: itemData.can_be_sold,
            category_id: itemData.category_id,
            category_name: itemData.category_name,
            description: itemData.description,
            ean: itemData.ean,
            initial_stock: itemData.initial_stock,
            initial_stock_rate: itemData.initial_stock_rate,
            inventory_account_id: itemData.inventory_account_id,
            inventory_account_name: itemData.inventory_account_name,
            is_combo_product: itemData.is_combo_product,
            is_receivable: itemData.is_receivable,
            is_returnable: itemData.is_returnable,
            isbn: itemData.isbn,
            item_type: itemData.item_type,
            maximum_order_quantity: itemData.maximum_order_quantity,
            minimum_order_quantity: itemData.minimum_order_quantity,
            part_number: itemData.part_number,
            product_short_description: itemData.product_short_description,
            product_type: itemData.product_type,
            purchase_account_id: itemData.purchase_account_id,
            purchase_account_name: itemData.purchase_account_name,
            purchase_description: itemData.purchase_description,
            purchase_rate: itemData.purchase_rate,
            rate: itemData.rate,
            sales_rate: itemData.sales_rate,
            unit: itemData.unit,
            upc: itemData.upc,
            vendor_name: itemData.vendor_name,
            group_id: group_id
        };
        
        const insertedItem = await tables.items.insertRow(itemRow);
        // console.log("inserted Item:::", insertedItem);
        const itemId = insertedItem.ROWID;

        console.log("Item inserted successfullyyy!!!");

        // Handle price brackets
        if (itemData.price_brackets?.length) { ///I need to check thisss
            const brackets = itemData.price_brackets.map(pb => ({
                item_id: itemId,
                start_quantity: pb.start_quantity,
                end_quantity: pb.end_quantity,
                // pricebook_rate: pb.rate
            }));
            // console.log("brackets::: ", brackets);
            // const bracketso = brackets[0];

            const price_bracket_item = await tables.priceBrackets.insertRows(brackets);
            // console.log("Price brackets:::", price_bracket_item);
            console.log("Price brackets inserted successfully");
        }


        // Handle package details
        if (itemData.package_details) {
            await tables.packageDetails.insertRow({
                item_id: itemId,
                length: itemData.package_details.length,
                width: itemData.package_details.width,
                height: itemData.package_details.height,
                weight: itemData.package_details.weight,
                weight_unit: itemData.package_details.weight_unit,
                dimension_unit: itemData.package_details.dimension_unit
            });
            console.log("Package inserted successfully");
        }

        // Handle vendors
        if (itemData.vendors?.length) {
            const vendors = itemData.vendors.map(v => ({
                item_id: itemId,
                vendor_id: v.vendor_id,
                vendor_name: v.vendor_name
            }));
            await tables.vendors.insertRows(vendors);
            console.log("Vendors inserted successfully");
        }

        // Handle item-specific documents
        if (itemData.image_name && req.files?.length) {
            const file = req.files.find(f => f.originalname === itemData.image_name);
            if (file) {
                const filePath = `item-group-items/${group_id}/${itemId}/${file.originalname}`;
                await bucket.putObject(filePath, file.buffer);
                
                await tables.documents.insertRow({
                    item_id: itemId,
                    file_name: file.originalname,
                    file_path: filePath,
                    file_size_formatted: `${(file.size/1024).toFixed(1)} KB`,
                    file_type: file.mimetype.split('/')[1]
                });
            }

            console.log("Documents inserted successfully");
        }
    }

    res.status(200).json({
        success: true,
        group_id,
        message: "Item group created successfully",
        items_created: items.length
    });

} catch (error) {
    console.error("Error creating item group:", error);
    res.status(500).json({
        success: false,
        error: "Failed to create item group",
        details: error.message
    });
}

});


// Update Item
app.put('/items/:itemId', upload, async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const stratus = app.stratus();
        const bucket = stratus.bucket("documents");
        const itemId = req.params.itemId;

        // Initialize tables
        const itemsTable = datastore.table("Items");
        const priceBracketsTable = datastore.table("ItemPriceBrackets");
        const packageDetailsTable = datastore.table("ItemPackageDetails");
        const documentsTable = datastore.table("Documents");
        const itemVendorsTable = datastore.table("ItemVendors");

        // Check if item exists
        const existingItem = await itemsTable.getRow(itemId);
        if (!existingItem) {
            return res.status(404).json({ error: "Item not found" });
        }

// Prepare update data
const updateData = {
    ROWID: itemId,
    name: req.body.name || existingItem.name,
    sku: req.body.sku || existingItem.sku,
    brand: req.body.brand || existingItem.brand,
    manufacturer: req.body.manufacturer || existingItem.manufacturer,
    can_be_purchased: req.body.can_be_purchased !== undefined 
        ? req.body.can_be_purchased 
        : existingItem.can_be_purchased,
    can_be_sold: req.body.can_be_sold !== undefined 
        ? req.body.can_be_sold 
        : existingItem.can_be_sold,
    category_id: req.body.category_id || existingItem.category_id,
    category_name: req.body.category_name || existingItem.category_name,
    description: req.body.description || existingItem.description,
    ean: req.body.ean || existingItem.ean,
    initial_stock: req.body.initial_stock !== undefined 
        ? req.body.initial_stock 
        : existingItem.initial_stock,
    initial_stock_rate: req.body.initial_stock_rate !== undefined 
        ? req.body.initial_stock_rate 
        : existingItem.initial_stock_rate,
    inventory_account_id: req.body.inventory_account_id || existingItem.inventory_account_id,
    inventory_account_name: req.body.inventory_account_name || existingItem.inventory_account_name,
    is_combo_product: req.body.is_combo_product !== undefined 
        ? req.body.is_combo_product 
        : existingItem.is_combo_product,
    is_receivable: req.body.is_receivable !== undefined 
        ? req.body.is_receivable 
        : existingItem.is_receivable,
    is_returnable: req.body.is_returnable !== undefined 
        ? req.body.is_returnable 
        : existingItem.is_returnable,
    isbn: req.body.isbn || existingItem.isbn,
    item_type: req.body.item_type || existingItem.item_type,
    maximum_order_quantity: req.body.maximum_order_quantity !== undefined 
        ? req.body.maximum_order_quantity 
        : existingItem.maximum_order_quantity,
    minimum_order_quantity: req.body.minimum_order_quantity !== undefined 
        ? req.body.minimum_order_quantity 
        : existingItem.minimum_order_quantity,
    part_number: req.body.part_number || existingItem.part_number,
    product_short_description: req.body.product_short_description || existingItem.product_short_description,
    product_type: req.body.product_type || existingItem.product_type,
    purchase_account_id: req.body.purchase_account_id || existingItem.purchase_account_id,
    purchase_account_name: req.body.purchase_account_name || existingItem.purchase_account_name,
    purchase_description: req.body.purchase_description || existingItem.purchase_description,
    purchase_rate: req.body.purchase_rate !== undefined 
        ? req.body.purchase_rate 
        : existingItem.purchase_rate,
    rate: req.body.rate !== undefined 
        ? req.body.rate 
        : existingItem.rate,
    sales_rate: req.body.sales_rate !== undefined 
        ? req.body.sales_rate 
        : existingItem.sales_rate,
    unit: req.body.unit || existingItem.unit,
    upc: req.body.upc || existingItem.upc,
    vendor_name: req.body.vendor_name || existingItem.vendor_name,
};

        // Update main item data
        const updatedItem = await itemsTable.updateRow(updateData);

        // Handle price brackets update. // Ipo enku 2 data varum ithu ula onuthula change pana ennala athuku matum delete panamudiyathu so delete panitu insert pana thnn panamudiyum....
        if (req.body.price_brackets) {
            // Delete existing price brackets
            await priceBracketsTable.deleteRows({
                item_id: itemId
            });

            // Insert new price brackets
            if (req.body.price_brackets.length > 0) {
                const bracketsData = req.body.price_brackets.map(pb => ({
                    item_id: itemId,
                    start_quantity: pb.start_quantity,
                    end_quantity: pb.end_quantity
                }));
                await priceBracketsTable.insertRows(bracketsData);
            }
        }

        // Handle package details update
        if (req.body.package_details) {
            const existingPackage = await packageDetailsTable.getRow({
                item_id: itemId
            });

            const packageData = {
                item_id: itemId,
                length: req.body.package_details.length,
                width: req.body.package_details.width,
                height: req.body.package_details.height,
                weight: req.body.package_details.weight,
                weight_unit: req.body.package_details.weight_unit,
                dimension_unit: req.body.package_details.dimension_unit
            };

        if (existingPackage) {
                packageData.ROWID = existingPackage.ROWID;
                await packageDetailsTable.updateRow(packageData);
            } else {
                await packageDetailsTable.insertRow(packageData);
            }
        }

        // Handle vendors update
        if (req.body.vendors) {
            // Delete existing vendors
            await itemVendorsTable.deleteRows({
                item_id: itemId
            });

            // Insert new vendors
            if (req.body.vendors.length > 0) {
                const vendorsData = req.body.vendors.map(v => ({
                    item_id: itemId,
                    vendor_id: v.vendor_id,
                    vendor_name: v.vendor_name
                }));
                await itemVendorsTable.insertRows(vendorsData);
            }
        }

        // Handle document updates
        if (req.files?.length > 0) {
            for (const file of req.files) {
                const filePath = `item-documents/${Date.now()}-${file.originalname}`;
                await bucket.putObject(filePath, file.buffer);
                
                await documentsTable.insertRow({
                    item_id: itemId,
                    file_name: file.originalname,
                    file_path: filePath,
                    file_size_formatted: `${(file.size/1024).toFixed(1)} KB`,
                    file_type: file.mimetype.split('/')[1]
                });
            }
        }

        res.status(200).json({
            message: "Item updated successfully",
            item_id: itemId,
            updated_fields: Object.keys(updateData).filter(k => k !== 'ROWID')
        });

    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({
            error: "Failed to update item",
            details: error.message
        });
    }
});


app.delete('items-delete/:itemId', async(req,res) => {
    console.log("Inside delete!!!");

    var catalystApp = catalyst.initialize(req);


});



module.exports = app