const express = require('express');
const bodyParser = require('body-parser');
const catalyst = require('zcatalyst-sdk-node'); // Zoho Catalyst SDK
const app = express();

app.use(bodyParser.json());

app.post('/items', async (req, res) => {

	try {
        const app = catalyst.initialize(req);
        const datastore = app.datastore();

        // Items Table
        const itemsTable = datastore.table("Items");
        // Documents Table
        const documentsTable = datastore.table("Documents");

        const itemData = {
            // item_id: "5663785000000106093",  // ROWID
            name: "Chocolatesss",
            sku: "SKU20",
            brand: "MRF",
            manufacturer: "MRF",
            associated_template_id: "",
            can_be_purchased: true,
            can_be_sold: true,
            category_id: "",
            category_name: "",
            custom_field_hash: JSON.stringify({}), // JSON data as string
            custom_fields: JSON.stringify([]),

            default_price_brackets: JSON.stringify([
                {
                    start_quantity: 1,
                    end_quantity: 1,
                    pricebook_rate: 20,
                    pricebook_discount: ""
                }
            ]),

            description: "nthng",
            ean: "20",
            // image_document_id: "5663785000000106102",
            // image_name: "1 (26).png",
            // image_sync_in_progress: false,
            // image_type: "png",
            initial_stock: 0,
            initial_stock_rate: 0,
            inventory_account_id: "5663785000000034001",
            inventory_account_name: "Inventory Asset",
            is_combo_product: false,
            is_receivable: false,
            is_returnable: false,
            isbn: "20",
            item_type: "sales_and_purchases",
            maximum_order_quantity: "",
            minimum_order_quantity: "",

            package_details: JSON.stringify({
                length: 10,
                width: 10,
                height: 20,
                weight: 20,
                weight_unit: "kg",
                dimension_unit: "cm"
            }),

            part_number: "20",
            preferred_vendors: JSON.stringify([]),
            price_brackets: JSON.stringify([]),
            pricebook_rate: 20,
            pricing_scheme: "unit",
            product_short_description: "nthng",
            product_type: "service",
            purchase_account_id: "5663785000000089091", 
            purchase_account_name: "Labor",
            purchase_description: "Nthng",
            purchase_rate: 20,
            rate: 20,
            // sales_channels: JSON.stringify([]),
            sales_margin: "",
            sales_rate: 20,
            source: "user",
            status: "active",
            unit: "cm",
            unit_id: "5663785000000089137",
            upc: "20",
            vendor_id: "",
            vendor_name: "",
        };

       

        const insertedItem = await itemsTable.insertRow(itemData);

        // Insert documents
        const documents = [
            {
                document_id: "5663785000000106102",
                item_id: "5663785000000106093",
                file_name: "1 (26).png",
                file_size: 97439,
                file_size_formatted: "95.2 KB",
                file_type: "png",
                uploaded_by: "Sakthivel B",
                uploaded_on: new Date("2025-03-19T17:00:00Z").toISOString()
            },
            {
                document_id: "5663785000000106104",
                item_id: "5663785000000106093",
                file_name: "Screenshot 2025-03-19 at 2.33.36.PM.png",
                file_size: 955829,
                file_size_formatted: "933.4 KB",
                file_type: "png",
                uploaded_by: "Sakthivel B",
                uploaded_on: new Date("2025-03-19T17:00:00Z").toISOString()
            }
        ];

        const insertedDocuments = await documentsTable.insertRows(documents);

        res.status(200).json({
            message: "Item and documents inserted successfully",
            item: insertedItem,
            documents: insertedDocuments
        });
    } catch (error) {
        console.error("Error inserting item:", error);
        res.status(500).json({ error: "Failed to insert item" });
    }

});



