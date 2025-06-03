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

app.post('/item', upload, async (req, res) => {
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
       //const {price_brackets, package_details, vendors} = req.body;  // JSON data file kuda vechu backend ku anupanum apo na epdi handle panalam....

       //Added
        let {price_brackets, package_details, vendors} = req.body;
        price_brackets = JSON.parse(req.body.price_brackets);
        package_details = JSON.parse(req.body.package_details);
        vendors = JSON.parse(req.body.vendors);

       //Ended

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
            console.log("Length: "+price_brackets.length);
            console.log("[0]: "+price_brackets[0]+" [1]: "+price_brackets[1]);
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

            if (!req.files || req.files.length === 0) {
                console.log("No files uploaded.");
            } else {
                console.log("Processing uploaded files...");


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

// Update Single Item
app.put('/item/:itemId', upload, async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const zcql = app.zcql();
        const stratus = app.stratus();
        const bucket = stratus.bucket("documents");
        const itemId = req.params.itemId;

        // Initialize tables
        const itemsTable = datastore.table("Items");
        const priceBracketsTable = datastore.table("ItemPriceBrackets");
        const packageDetailsTable = datastore.table("ItemPackageDetails");
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
            can_be_purchased: req.body.can_be_purchased !== undefined ? req.body.can_be_purchased : existingItem.can_be_purchased,
            can_be_sold: req.body.can_be_sold !== undefined ? req.body.can_be_sold : existingItem.can_be_sold,
            category_id: req.body.category_id || existingItem.category_id,
            category_name: req.body.category_name || existingItem.category_name,
            description: req.body.description || existingItem.description,
            ean: req.body.ean || existingItem.ean,
            initial_stock: req.body.initial_stock !== undefined ? req.body.initial_stock : existingItem.initial_stock,
            initial_stock_rate: req.body.initial_stock_rate !== undefined ? req.body.initial_stock_rate : existingItem.initial_stock_rate,
            inventory_account_id: req.body.inventory_account_id || existingItem.inventory_account_id,
            inventory_account_name: req.body.inventory_account_name || existingItem.inventory_account_name,
            is_combo_product: req.body.is_combo_product !== undefined ? req.body.is_combo_product : existingItem.is_combo_product,
            is_receivable: req.body.is_receivable !== undefined ? req.body.is_receivable : existingItem.is_receivable,
            is_returnable: req.body.is_returnable !== undefined ? req.body.is_returnable : existingItem.is_returnable,
            isbn: req.body.isbn || existingItem.isbn,
            item_type: req.body.item_type || existingItem.item_type,
            maximum_order_quantity: req.body.maximum_order_quantity !== undefined ? req.body.maximum_order_quantity : existingItem.maximum_order_quantity,
            minimum_order_quantity: req.body.minimum_order_quantity !== undefined ? req.body.minimum_order_quantity : existingItem.minimum_order_quantity,
            part_number: req.body.part_number || existingItem.part_number,
            product_short_description: req.body.product_short_description || existingItem.product_short_description,
            product_type: req.body.product_type || existingItem.product_type,
            purchase_account_id: req.body.purchase_account_id || existingItem.purchase_account_id,
            purchase_account_name: req.body.purchase_account_name || existingItem.purchase_account_name,
            purchase_description: req.body.purchase_description || existingItem.purchase_description,
            purchase_rate: req.body.purchase_rate !== undefined ? req.body.purchase_rate : existingItem.purchase_rate,
            rate: req.body.rate !== undefined ? req.body.rate : existingItem.rate,
            sales_rate: req.body.sales_rate !== undefined ? req.body.sales_rate : existingItem.sales_rate,
            unit: req.body.unit || existingItem.unit,
            upc: req.body.upc || existingItem.upc,
            vendor_name: req.body.vendor_name || existingItem.vendor_name,
        };

        // Update main item data
        await itemsTable.updateRow(updateData);
        console.log("Item table row updated");

        // Handle price brackets update using ZCQL
        const priceBracketsQuery = `SELECT ROWID FROM ItemPriceBrackets WHERE item_id = '${itemId}'`;
        const existingPriceBrackets = await zcql.executeZCQLQuery(priceBracketsQuery);

        const priceBracketRowIds = existingPriceBrackets.map(row => row.ItemPriceBrackets.ROWID);

        if (priceBracketRowIds.length > 0) {
            await priceBracketsTable.deleteRows(priceBracketRowIds);
        }

        if (req.body.price_brackets.length > 0) {
            const bracketsData = req.body.price_brackets.map(pb => ({
                item_id: itemId,
                start_quantity: pb.start_quantity,
                end_quantity: pb.end_quantity,
                rate:pb.rate
            }));
            await priceBracketsTable.insertRows(bracketsData);
            console.log("Price brackets table updated");
        }

        // Handle package details update using ZCQL
        const packageQuery = `SELECT ROWID FROM ItemPackageDetails WHERE item_id = '${itemId}'`;
        const existingPackage = await zcql.executeZCQLQuery(packageQuery);

        const packageData = {
            item_id: itemId,
            length: req.body.package_details?.length,
            width: req.body.package_details?.width,
            height: req.body.package_details?.height,
            weight: req.body.package_details?.weight,
            weight_unit: req.body.package_details?.weight_unit,
            dimension_unit: req.body.package_details?.dimension_unit
        };

        if (existingPackage.length > 0) {
            packageData.ROWID = existingPackage[0].ItemPackageDetails.ROWID;
            await packageDetailsTable.updateRow(packageData);
            console.log("Package table row updated");
        } else {
            await packageDetailsTable.insertRow(packageData);
            console.log("New package details added");
        }

        // Handle vendors update using ZCQL
        const vendorQuery = `SELECT ROWID FROM ItemVendors WHERE item_id = '${itemId}'`;
        const existingVendors = await zcql.executeZCQLQuery(vendorQuery);

        const vendorRowIds = existingVendors.map(row => row.ItemVendors.ROWID);

        if (vendorRowIds.length > 0) {
            await itemVendorsTable.deleteRows(vendorRowIds);
        }

        if (req.body.vendors.length > 0) {
            const vendorsData = req.body.vendors.map(v => ({
                item_id: itemId,
                vendor_id: v.vendor_id,
                vendor_name: v.vendor_name
            }));
            await itemVendorsTable.insertRows(vendorsData);
            console.log("Vendors table updated");
        }



        // Document handling

        res.status(200).json({
            message: "Item updated successfully",
            item_id: itemId
        });

    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({
            error: "Failed to update item",
            details: error.message
        });
    }
});

// Update Item group 
app.put('/item-group/:groupId', upload, async (req, res) => {
    console.log("Updating Item Group...");

    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const stratus = app.stratus();
        const bucket = stratus.bucket("documents");

        const groupId = req.params.groupId;
        const updatedData = req.body.item_group;
        const { attributes, documents: groupDocs, items = [] } = updatedData;

        const tables = {
            groups: datastore.table("ItemGroups"),
            items: datastore.table("Items"),
            priceBrackets: datastore.table("ItemPriceBrackets"),
            packageDetails: datastore.table("ItemPackageDetails"),
            documents: datastore.table("Documents"),
            vendors: datastore.table("ItemVendors"),
            attributes: datastore.table("GroupAttributes")
        };

        // Check if the Item Group exists
        const existingGroup = await tables.groups.getRow(groupId);
        if (!existingGroup) {
            return res.status(404).json({ error: "Item Group not found" });
        }

        //  Update Item Group details
        await tables.groups.updateRow({
            ROWID: groupId,
            name: updatedData.name,
            description: updatedData.description,
            manufacturer: updatedData.manufacturer,
            unit: updatedData.unit,
            product_type: updatedData.product_type
        });

        console.log("Item Group updated successfully!");

        // Handle Attributes
        if (attributes?.length) {
            // Delete old attributes
            await tables.attributes.deleteRows({ group_id: groupId });

            // Insert new attributes
            const attrRecords = attributes.map(attr => ({
                group_id: groupId,
                name: attr.name,
                type: attr.type,
                options: JSON.stringify(attr.options)
            }));
            await tables.attributes.insertRows(attrRecords);
        }

        console.log("Attributes updated successfully!");

        // Handle Documents
        //  If new documents are uploaded, delete old ones and add new ones
        // if (groupDocs?.length && req.files?.length) {
        //     await tables.documents.deleteRows({ item_id: groupId });

        //     for (const doc of groupDocs) {
        //         const file = req.files.find(f => f.originalname === doc.file_name);
        //         if (file) {
        //             const filePath = `item-groups/${groupId}/${file.originalname}`;
        //             await bucket.putObject(filePath, file.buffer);

        //             await tables.documents.insertRow({
        //                 item_id: groupId,
        //                 file_name: file.originalname,
        //                 file_path: filePath,
        //                 file_size_formatted: doc.file_size_formatted,
        //                 file_type: file.mimetype.split('/')[1],
        //                 uploaded_by: doc.uploaded_by
        //             });
        //         }
        //     }
        // }

        console.log("Documents updated successfully!");

        // Handle Items
        const existingItems = await tables.items.getRows({ group_id: groupId });
        const existingItemIds = existingItems.map(item => item.ROWID);

        for (const itemData of items) {
            let itemId = itemData.item_id || null;
            console.log("Processing item:", itemData.name);

            if (itemId && existingItemIds.includes(itemId)) {
                //Update existing item
                await tables.items.updateRow({
                    ROWID: itemId,
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
                    group_id: groupId
                });
            } else {
                // Insert new item
                const insertedItem = await tables.items.insertRow({
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
                    group_id: groupId
                });
                itemId = insertedItem.ROWID;
            }

            console.log("Item updated successfully!");

            // Update related tables
            if (itemData.price_brackets?.length) {
                await tables.priceBrackets.deleteRows({ item_id: itemId });
                const brackets = itemData.price_brackets.map(pb => ({
                    item_id: itemId,
                    start_quantity: pb.start_quantity,
                    end_quantity: pb.end_quantity
                }));
                await tables.priceBrackets.insertRows(brackets);
            }

            if (itemData.package_details) {
                await tables.packageDetails.deleteRows({ item_id: itemId });
                await tables.packageDetails.insertRow({
                    item_id: itemId,
                    length: itemData.package_details.length,
                    width: itemData.package_details.width,
                    height: itemData.package_details.height,
                    weight: itemData.package_details.weight,
                    weight_unit: itemData.package_details.weight_unit,
                    dimension_unit: itemData.package_details.dimension_unit
                });
            }

            if (itemData.vendors?.length) {
                await tables.vendors.deleteRows({ item_id: itemId });
                const vendors = itemData.vendors.map(v => ({
                    item_id: itemId,
                    vendor_id: v.vendor_id,
                    vendor_name: v.vendor_name
                }));
                await tables.vendors.insertRows(vendors);
            }
        }

        res.status(200).json({
            success: true,
            message: "Item group updated successfully",
        });

    } catch (error) {
        console.error("Error updating item group:", error);
        res.status(500).json({ success: false, error: "Failed to update item group", details: error.message });
    }
});

// Delete Single Item
app.delete('/item/:itemId', async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const itemsTable = datastore.table("Items");
        
        const itemId = req.params.itemId;

        // Check if item exists
        const existingItem = await itemsTable.getRow(itemId);
        if (!existingItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        // Delete the item table row (Cascade will handle related  table row deletion)
        await itemsTable.deleteRow(itemId);
        console.log("Item deleted successfully");

        res.status(200).json({
            message: "Item and all related data deleted successfully",
            item_id: itemId
        });

    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({
            error: "Failed to delete item",
            details: error.message
        });
    }
});

// Get All Items
app.get('/items', async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const zcql = app.zcql();

        // Initialize tables
        // const itemsTable = datastore.table("Items");
        // const priceBracketsTable = datastore.table("ItemPriceBrackets");
        // const packageDetailsTable = datastore.table("ItemPackageDetails");
        // const itemVendorsTable = datastore.table("ItemVendors");
        // const documentsTable = datastore.table("Documents");

        // Get all items using ZCQL for better query capabilities
        const itemsQuery = `SELECT * FROM Items LIMIT 10`;
        const itemsResult = await zcql.executeZCQLQuery(itemsQuery);
        const items = itemsResult.map(item => item.Items);

        // Fetch related data for each item
        const itemsWithDetails = await Promise.all(items.map(async (item) => {
            const itemId = item.ROWID;

            // Get price brackets
            const priceBracketsQuery = `SELECT * FROM ItemPriceBrackets WHERE item_id = '${itemId}'`;
            const priceBracketsResult = await zcql.executeZCQLQuery(priceBracketsQuery);
            
            // Get package details
            const packageQuery = `SELECT * FROM ItemPackageDetails WHERE item_id = '${itemId}'`;
            const packageResult = await zcql.executeZCQLQuery(packageQuery);
            
            // Get vendors
            const vendorsQuery = `SELECT * FROM ItemVendors WHERE item_id = '${itemId}'`;
            const vendorsResult = await zcql.executeZCQLQuery(vendorsQuery);
            
            // Documents to provide the users to visible it on their front-end
            // const documentsQuery = `SELECT * FROM Documents WHERE item_id = '${itemId}'`;
            // const documentsResult = await zcql.executeZCQLQuery(documentsQuery);

            return {
                ...item,
                price_brackets: priceBracketsResult.map(pb => pb.ItemPriceBrackets),
                package_details: packageResult[0]?.ItemPackageDetails || null,
                vendors: vendorsResult.map(v => v.ItemVendors),
                // documents: documentsResult.map(d => d.Documents)
            };
        }));

        res.status(200).json({
            success: true,
            count: itemsWithDetails.length,
            items: itemsWithDetails
        });

    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch items",
            details: error.message
        });
    }
});

//Get Singel Item
app.get('/items/:item_id', async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const zcql = app.zcql();
        const itemId = req.params.item_id;

        // Fetch item by ID
        const itemQuery = `SELECT * FROM Items WHERE ROWID = '${itemId}'`;
        const itemResult = await zcql.executeZCQLQuery(itemQuery);

        if (itemResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        const item = itemResult[0].Items;
        
        // Fetch price brackets
        const priceBracketsQuery = `SELECT * FROM ItemPriceBrackets WHERE item_id = '${itemId}'`;
        const priceBracketsResult = await zcql.executeZCQLQuery(priceBracketsQuery);

        // Fetch package details
        const packageQuery = `SELECT * FROM ItemPackageDetails WHERE item_id = '${itemId}'`;
        const packageResult = await zcql.executeZCQLQuery(packageQuery);

        // Fetch vendors
        const vendorsQuery = `SELECT * FROM ItemVendors WHERE item_id = '${itemId}'`;
        const vendorsResult = await zcql.executeZCQLQuery(vendorsQuery);
    

        // const documentsQuery = `SELECT * FROM Documents WHERE item_id = '${itemId}'`;
        // const documentsResult = await zcql.executeZCQLQuery(documentsQuery);

        res.status(200).json({
            success: true,
            item: {
                ...item,
                price_brackets: priceBracketsResult.map(pb => pb.ItemPriceBrackets),
                package_details: packageResult[0]?.ItemPackageDetails || null,
                vendors: vendorsResult.map(v => v.ItemVendors),
                // documents: documentsResult.map(d => d.Documents)
            }
        });

    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch item",
            details: error.message
        });
    }
});

// Add Customer
app.post('/add-customers', async (req, res) => {
    console.log("Inside customers");
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const customerData = req.body; 
        
        // Insert into customers table
        const customerTable = datastore.table('customers');
        const customerRow = {
            contact_id: customerData.contact_id, 
            contact_name: customerData.contact_name,
            company_name: customerData.company_name,
            email: customerData.email,
            mobile: customerData.mobile,
            phone: customerData.phone,
            designation: customerData.designation,
            department: customerData.department,
            currency_code: customerData.currency_code,
            status: customerData.status,
            website: customerData.website,
            notes: customerData.notes,
            contact_type: customerData.contact_type // +++++++++
        };
        const insertedCustomer = await customerTable.insertRow(customerRow);
        console.log("Customer table Inserted Successfully!!");
        const customer_id = insertedCustomer.ROWID;
        console.log("ROWID:::", customer_id);


        // Insert addresses (billing & shipping)
        const addressesTable = datastore.table('Addresses');
        const addresses = [];

        if (customerData.billing_address) {
            addresses.push({
                // address_id: customerData.contact.billing_address.address_id,
                contact_id: customer_id, // ROWID 
                attention: customerData.billing_address.attention,
                address: customerData.billing_address.address,
                city: customerData.billing_address.city,
                state: customerData.billing_address.state,
                country: customerData.billing_address.country,
                country_code: customerData.billing_address.country_code,  /// ++++
                zip: customerData.billing_address.zip,
                phone: customerData.billing_address.phone,
                // fax: customerData.billing_address.fax, // Add this
                type: 'Billing'
            });
        }

        if (customerData.shipping_address) {
            addresses.push({
                // address_id: customerData.contact.shipping_address.address_id,
                contact_id: customer_id, // ROWID
                attention: customerData.shipping_address.attention,
                address: customerData.shipping_address.address,
                city: customerData.shipping_address.city,
                state: customerData.shipping_address.state,
                country: customerData.shipping_address.country_code,
                country_code: customerData.shipping_address.country_code, // ++++++++++
                zip: customerData.shipping_address.zip,
                phone: customerData.shipping_address.phone,
                type: 'Shipping'
            });
        }

        console.log("Address:::", addresses)

        if (addresses.length > 0) {
            await addressesTable.insertRows(addresses);
            console.log("Address table Inserted Successfully!!");
        }

        // Insert contact persons

        const contactPersonsTable = datastore.table('contact_persons');
        const contactPersons = customerData.contact.contact_persons.map(person => ({
            // contact_person_id: person.contact_person_id,
            contact_id: customer_id,
            salutation: person.salutation,
            first_name: person.first_name,
            last_name: person.last_name,
            email: person.email,
            phone: person.phone,
            mobile: person.mobile,
            designation: person.designation,
            department: person.department,
            is_primary: person.is_primary_contact
        }));

        if (contactPersons.length > 0) {
            await contactPersonsTable.insertRows(contactPersons);
            console.log("Contact Persons table Inserted Successfully!!");
        }

        // Insert documents

        // const documentsTable = datastore.table('documents');
        // const documents = customerData.contact.documents.map(doc => ({
        //     document_id: doc.file_name, // Assuming file_name as unique ID
        //     contact_id: customerData.contact.contact_id,
        //     file_name: doc.file_name,
        //     file_size: parseInt(doc.file_size),
        //     file_type: doc.file_type,
        //     uploaded_by: doc.uploaded_by
        // }));

        // if (documents.length > 0) {
        //     await documentsTable.insertRows(documents);
        // }

        res.status(200).json({ message: "Customer added successfully" });

    } catch (error) {
        console.error("Error inserting customer:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }

})

//Update Customer
app.put('/update-customer/:customer_id', async (req, res) => {
    console.log("Inside update customer");
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const customer_id = req.params.customer_id;  
        const customerData = req.body; 

       
        const customerTable = datastore.table('Customers');

        // Update the customer details
        const updatedCustomerRow = {
            ROWID: customer_id, 
            contact_name: customerData.contact_name,
            company_name: customerData.company_name,
            email: customerData.email,
            mobile: customerData.mobile,
            phone: customerData.phone,
            designation: customerData.designation,
            department: customerData.department,
            currency_code: customerData.currency_code,
            status: customerData.status,
            website: customerData.website,
            notes: customerData.notes,
            contact_type: customerData.contact_type // +++++++++
        };

        await customerTable.updateRow(updatedCustomerRow);
        console.log("Customer table updated successfully!!");

        // Reference the addresses table
        const addressesTable = datastore.table('Addresses');
        const addresses = [];
        if (customerData.billing_address) {
            addresses.push({
                ROWID: customerData.contact.billing_address.ROWID, // Existing ROWID required for update
                customer_id: customer_id, // Reference customer ROWID
                attention: customerData.billing_address.attention,
                address: customerData.billing_address.address,
                city: customerData.billing_address.city,
                state: customerData.billing_address.state,
                country: customerData.billing_address.country,
                country_code: customerData.billing_address.country_code,  /// ++++
                zip: customerData.billing_address.zip,
                phone: customerData.billing_address.phone,
                type: 'Billing'
            });
        }

        if (customerData.shipping_address) {
            addresses.push({
                ROWID: customerData.shipping_address.ROWID, // Existing ROWID required for update
                customer_id: customer_id,
                attention: customerData.shipping_address.attention,
                address: customerData.shipping_address.address,
                city: customerData.shipping_address.city,
                state: customerData.shipping_address.state,
                country: customerData.shipping_address.country,
                country_code: customerData.shipping_address.country_code, 
                zip: customerData.shipping_address.zip,
                phone: customerData.shipping_address.phone,
                type: 'Shipping'
            });
        }

        if (addresses.length > 0) {
            await addressesTable.updateRows(addresses);
            console.log("Address table updated successfully!!");
        }

        // Reference the contact persons table
        const contactPersonsTable = datastore.table('contact_persons');
        const contactPersons = customerData.contact_persons.map(person => ({
            ROWID: person.ROWID, // Existing ROWID required for update
            customer_id: customer_id,
            salutation: person.salutation,
            first_name: person.first_name,
            last_name: person.last_name,
            email: person.email,
            phone: person.phone,
            mobile: person.mobile,
            designation: person.designation,
            department: person.department,
            is_primary: person.is_primary_contact
        }));

        if (contactPersons.length > 0) {
            await contactPersonsTable.updateRows(contactPersons);
            console.log("Contact persons table updated successfully!!");
        }

        res.status(200).json({ message: "Customer updated successfully" });

    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

// Delete Customer
app.delete('/delete-customer/:customer_id', async (req, res) => {
    console.log("Inside delete customer");
    try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();
        const customer_id = req.params.customer_id;

        const customerTable = datastore.table('Customers');

        await customerTable.deleteRow({ ROWID: customer_id });

        console.log("Customer data deleted successfully ");
        res.status(200).json({ message: "Customer deleted successfully" });

    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

//Get All Customers
app.get('/customers-all', async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        // const datastore = app.datastore();
        const zcql = app.zcql();

      
        const customersQuery = `SELECT * FROM Customers`;
        const customersResult = await zcql.executeZCQLQuery(customersQuery);
        const customers = customersResult.map(cust => cust.Customers);

     
        const customersWithDetails = await Promise.all(customers.map(async (customer) => {
            const customerId = customer.ROWID; // ROWID

            // Get contacts
            const contactsQuery = `SELECT * FROM Contact_persons WHERE customer_id = '${customerId}'`;
            const contactsResult = await zcql.executeZCQLQuery(contactsQuery);

            // Get addresses
            const addressesQuery = `SELECT * FROM Address WHERE customer_id = '${customerId}'`;
            const addressesResult = await zcql.executeZCQLQuery(addressesQuery);

            return {
                ...customer,
                contacts: contactsResult.map(c => c.CustomerContacts),
                addresses: addressesResult.map(a => a.CustomerAddresses),
            };
        }));

        res.status(200).json({
            success: true,
            count: customersWithDetails.length,
            customers: customersWithDetails
        });

    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch customers",
            details: error.message
        });
    }
});

// Get Single Customer
app.get('/customer/:customer_id', async (req, res) => {
    try {
        const app = catalyst.initialize(req);
        const zcql = app.zcql();
        const customerId = req.params.customer_id;

        // Fetch single customer
        const customerQuery = `SELECT * FROM Customers WHERE ROWID = '${customerId}'`;
        const customerResult = await zcql.executeZCQLQuery(customerQuery);

        if (customerResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        const customer = customerResult[0].Customers;

        // Fetch related contact persons
        const contactsQuery = `SELECT * FROM Contact_persons WHERE customer_id = '${customerId}'`;
        const contactsResult = await zcql.executeZCQLQuery(contactsQuery);

        // Fetch related addresses
        const addressesQuery = `SELECT * FROM Address WHERE customer_id = '${customerId}'`;
        const addressesResult = await zcql.executeZCQLQuery(addressesQuery);

        res.status(200).json({
            success: true,
            customer: {
                ...customer,
                contacts: contactsResult.map(c => c.CustomerContacts),
                addresses: addressesResult.map(a => a.CustomerAddresses),
            }
        });

    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch customer",
            details: error.message
        });
    }
});

// Add Sales Order
app.post('/add-sales-orders', async (req, res) => {
    console.log("Inside Add sales order");
    const app = catalyst.initialize(req);
    const ds = app.datastore();
  
    const salesOrderTable = ds.table('SalesOrders');
    const soItemsTable = ds.table('SalesOrderItems');
    const soContactsTable = ds.table('SalesOrderContacts');
  
    try {
      const salesOrderRow = {
        customer_id: req.body.customer_id,
        reference_number: req.body.reference_number,
        so_date: req.body.date,
        shipment_date: req.body.shipment_date,
        delivery_method: req.body.delivery_method,
        notes: req.body.notes,
        discount: req.body.discount,
        discount_type: req.body.discount_type,
        adjustment: req.body.adjustment,
        adjustment_description: req.body.adjustment_description,
        template_id: req.body.template_id,
        shipping_address_id: req.body.shipping_address_id,
        billing_address_id: req.body.billing_address_id,
        payment_terms: req.body.payment_terms,
        payment_terms_label: req.body.payment_terms_label,
        status: "NULL"
      };
  

      const insertedSalesOrder = await salesOrderTable.insertRow(salesOrderRow);
      console.log("SO inserted successfully");
      const sales_order_id = insertedSalesOrder.ROWID;
      console.log("SO_ROWID:::", sales_order_id);
  
      //Insert Contact Persons
      const contactRows = req.body.contact_persons.map(contact_id => ({
        sales_order_id : sales_order_id,
        contact_id
      }));

    

      await soContactsTable.insertRows(contactRows);

      console.log("SO contact person inserted successfully");
  
      //Insert Line Items
      const itemRows = req.body.line_items.map(item => ({
        sales_order_id: sales_order_id,
        item_id: item.item_id,
        rate: item.rate,
        quantity: item.quantity,
        discount: item.discount,
        unit: item.unit,
        name: item.name,
        description: item.description,
        item_order: item.item_order
      }));
      await soItemsTable.insertRows(itemRows);
      console.log("SO items inserted succesfully");


      //Need to handle Documents

      res.status(200).json({ success: true, sales_order_id });
  
    } catch (err) {
      console.error("Save SO Error:", err);
      res.status(500).json({ success: false, message: "Error saving sales order", error: err.message });
    }
 });

// Update Sales Order
app.put('/update-sales-order/:id', async (req, res) => {
    console.log("Inside Update sales order");
    const app = catalyst.initialize(req);
    const ds = app.datastore();
  
    const salesOrderTable = ds.table('SalesOrders');
    const soItemsTable = ds.table('SalesOrderItems');
    const soContactsTable = ds.table('SalesOrderContacts');
  
    const sales_order_id = req.params.id;
  
    try {
      const updatedSalesOrder = {
        ROWID: sales_order_id,
        customer_id: req.body.customer_id,
        reference_number: req.body.reference_number,
        so_date: req.body.date,
        shipment_date: req.body.shipment_date,
        delivery_method: req.body.delivery_method,
        notes: req.body.notes,
        discount: req.body.discount,
        discount_type: req.body.discount_type,
        adjustment: req.body.adjustment,
        adjustment_description: req.body.adjustment_description,
        template_id: req.body.template_id,
        shipping_address_id: req.body.shipping_address_id,
        billing_address_id: req.body.billing_address_id,
        payment_terms: req.body.payment_terms,
        payment_terms_label: req.body.payment_terms_label,
        status: req.body.status || "NULL"
      };
    
      await salesOrderTable.updateRow(updatedSalesOrder);
      console.log("Sales order updated successfully");
    
      await soContactsTable.deleteRows({ sales_order_id });
      await soItemsTable.deleteRows({ sales_order_id });
  
      console.log("Old contact persons and items deleted");
  
 
      const contactRows = req.body.contact_persons.map(contact_id => ({
        sales_order_id,
        contact_id
      }));
      await soContactsTable.insertRows(contactRows);

      const itemRows = req.body.line_items.map(item => ({
        sales_order_id,
        item_id: item.item_id,
        rate: item.rate,
        quantity: item.quantity,
        discount: item.discount,
        unit: item.unit,
        name: item.name,
        description: item.description,
        item_order: item.item_order
      }));

      await soItemsTable.insertRows(itemRows);
  
      console.log("Updated contacts and items inserted");
  
      res.status(200).json({
        success: true,
        message: "Sales order updated successfully",
        sales_order_id
      });
  
    } catch (err) {
      console.error("Update SO Error:", err);
      res.status(500).json({ success: false, message: "Error updating sales order", error: err.message });
    }
  });

// Delete Sales order
app.delete('/delete-sales-order/:id', async (req, res) => {
    console.log("Inside Delete sales order");
    const app = catalyst.initialize(req);
  
    const salesOrderTable = ds.table('SalesOrders');
    const soItemsTable = ds.table('SalesOrderItems');
    const soContactsTable = ds.table('SalesOrderContacts');
    const ds = app.datastore();

    const sales_order_id = req.params.id;
  
    try {
      await soContactsTable.deleteRows({ sales_order_id });
      await soItemsTable.deleteRows({ sales_order_id });
      console.log("Deleted contact persons and items");
  
      await salesOrderTable.deleteRow(sales_order_id);
      console.log("Sales order deleted successfully");
  
      res.status(200).json({
        success: true,
        message: "Sales order and associated data deleted successfully",
        sales_order_id
      });
  
    } catch (err) {
      console.error("Delete SO Error:", err);
      res.status(500).json({ success: false, message: "Error deleting sales order", error: err.message });
    }
  });

// Get Sales Order Details
app.get('/get-sales-order/:id', async (req, res) => {
    console.log("Inside Get sales order details");
    const app = catalyst.initialize(req);
    const zcql = app.zcql();
  
    const sales_order_id = req.params.id;
  
    try {
      // Fetch SalesOrder main details
      const salesOrderResult = await zcql.executeZCQLQuery(`
        SELECT * FROM SalesOrders WHERE ROWID = '${sales_order_id}'
      `);
      if (salesOrderResult.length === 0) {
        return res.status(404).json({ success: false, message: "Sales order not found" });
      }
      const salesOrder = salesOrderResult[0].SalesOrders;
  
      // Fetch Line Items
      const itemsResult = await zcql.executeZCQLQuery(`
        SELECT * FROM SalesOrderItems WHERE sales_order_id = '${sales_order_id}'
      `);
      const line_items = itemsResult.map(row => row.SalesOrderItems);
      
      // Fetch Contact Persons
      const contactsResult = await zcql.executeZCQLQuery(`
        SELECT * FROM SalesOrderContacts WHERE sales_order_id = '${sales_order_id}'
      `);
      const contact_persons = contactsResult.map(row => row.SalesOrderContacts);
  
      res.status(200).json({
        success: true,
        sales_order: salesOrder,
        line_items,
        contact_persons
      });
      
    } catch (err) {
      console.error("Get SO Error:", err);
      res.status(500).json({ success: false, message: "Error fetching sales order", error: err.message });
    }
  });
  


module.exports = app