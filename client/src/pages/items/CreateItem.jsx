// import React, { useState } from 'react';
// import axios from 'axios';
// const NewItemForm = () => {
//   const [itemType, setItemType] = useState('Goods');
//   const [isSalesInfo, setIsSalesInfo] = useState(true);
//   const [isPurchaseInfo, setIsPurchaseInfo] = useState(true);
//   const [trackInventory, setTrackInventory] = useState(true);
//   const [selectedUnit, setSelectedUnit] = useState('kg');

//   const canTrackInventory = isSalesInfo && isPurchaseInfo;

//   const [formData, setFormData] = useState({
//     name: '',
//     sku: '',
//     unit: '',
//     sales_rate: '',
//     purchase_rate: '',
//     sales_account: '',
//     purchase_account: '',
//     sales_description: '',
//     purchase_description: '',
//     preferred_vendor: '',
//     inventory_account_id: '',
//     inventory_valuation_method: '',
//     initial_stock: '',
//     initial_stock_rate: '',
//     reorder_point: '',
//     category_id: '',
//     category_name: '',
//     ean: '',
//     brand: '',
//     manufacturer: '',
//     can_be_purchased: true,
//     can_be_sold: true,
//     is_combo_product: false,
//     is_receivable: true,
//     is_returnable: true,
//     isbn: '',
//     part_number: '',
//     product_short_description: '',
//     product_type: '',
//     purchase_account_id: '',
//     purchase_account_name: '',
//     rate: '',
//     upc: '',
//     vendor_name: ''
//   });

//   const [files, setFiles] = useState([]);
//   const [priceBrackets, setPriceBrackets] = useState([]);
//   const [packageDetails, setPackageDetails] = useState({});
//   const [vendors, setVendors] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFiles([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const finalData = {
//       ...formData,
//       item_type: itemType,
//       price_brackets: priceBrackets,
//       package_details: packageDetails,
//       vendors: vendors
//     };

//     const data = new FormData();
//     files.forEach((file) => data.append('files', file));
//     data.append('name', formData.name);
//     data.append('sku', formData.sku);
//     data.append('brand', formData.brand);
//     data.append('manufacturer', formData.manufacturer);
//     data.append('can_be_purchased', formData.can_be_purchased);
//     data.append('can_be_sold', formData.can_be_sold);
//     data.append('category_id', formData.category_id);
//     data.append('category_name', formData.category_name);
//     data.append('description', formData.description || '');
//     data.append('ean', formData.ean);
//     // data.append('initial_stock', formData.initial_stock);
//     data.append('initial_stock', 0);
//     // data.append('initial_stock_rate', formData.initial_stock_rate);
//     data.append('initial_stock_rate', 0);
//     data.append('inventory_account_id', formData.inventory_account_id);
//     data.append('inventory_account_name', formData.inventory_account_name);
//     data.append('is_combo_product', formData.is_combo_product);
//     data.append('is_receivable', formData.is_receivable);
//     data.append('is_returnable', formData.is_returnable);
//     data.append('isbn', formData.isbn);
//     data.append('item_type', itemType);
//     data.append('maximum_order_quantity', formData.maximum_order_quantity || 0); //Changed
//     data.append('minimum_order_quantity', formData.minimum_order_quantity || 0); //Changed
//     data.append('part_number', formData.part_number);
//     data.append('product_short_description', formData.product_short_description);
//     data.append('product_type', formData.product_type);
//     data.append('purchase_account_id', formData.purchase_account_id);
//     data.append('purchase_account_name', formData.purchase_account_name);
//     data.append('purchase_description', formData.purchase_description);
//     data.append('purchase_rate', formData.purchase_rate || 0); //Changed
//     // data.append('rate', formData.rate);
//     data.append('rate', BigInt(formData.rate).toString());
//     data.append('sales_rate', BigInt(formData.sales_rate).toString());
//     data.append('unit', formData.unit.value);
//     data.append('upc', formData.upc);
//     data.append('vendor_name', formData.vendor_name);
//     //data.append('price_brackets', JSON.stringify(priceBrackets));
//     data.append('price_brackets', JSON.stringify([]));
//     data.append('package_details', JSON.stringify(packageDetails));
//     // data.append('vendors', JSON.stringify(vendors));
//     data.append('vendors', JSON.stringify([]));

//     try {
//       const response = await axios.post('/server/advance_function/item', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Item saved successfully!');
//     } catch (error) {
//       console.error('Error saving item:', error);
//       alert('Failed to save item.');
//     }
//   };


//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-6">New Item</h2>
//       <form className="space-y-10" onSubmit={handleSubmit}>

//         {/* Basic Info */}
//         <div className="flex justify-between gap-6">
//           <div className="w-2/3 space-y-4">
//             <div className="flex items-center gap-4">
//               <label className="w-40">Type</label>
//               <div className="flex gap-4">
//                 <label><input type="radio" name="type" checked={itemType === 'Goods'} onChange={() => setItemType('Goods')} /> Goods</label>
//                 <label><input type="radio" name="type" checked={itemType === 'Service'} onChange={() => setItemType('Service')} /> Service</label>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <label htmlFor="name" className="w-40">Name<span className="text-red-500">*</span></label>
//               <input type="text" id="name" name="name" required className="border p-2 w-full" onChange={handleChange} />
//             </div>

//             <div className="flex items-center gap-4">
//               <label htmlFor="sku" className="w-40">SKU</label>
//               <input type="text" id="sku" name="sku" className="border p-2 w-full" onChange={handleChange} />
//             </div>

//             <div className="flex items-center gap-4">
//   <label htmlFor="unit" className="w-40">
//     Unit<span className="text-red-500">*</span>
//   </label>
//   <select
//     id="unit"
//     name="unit"
//     className="border p-2 w-full"
//     value={formData.unit?.value || ''}
//     onChange={(e) => {
//       const selectedOption = e.target.options[e.target.selectedIndex];
//       const selectedValue = selectedOption.value;
//       const selectedName = selectedOption.dataset.name || '';
      
//       setFormData(prev => ({
//         ...prev,
//         unit: {
//           name: selectedName,
//           value: selectedValue
//         }
//       }));
//     }}
//   >
//     <option value="">Select or type to add</option>
//     <option value="box">BOX - box</option>
//     <option value="cm">CMS - cm</option>
//     <option value="dz">DOZ - dz</option>
//     <option value="ft">FTS - ft</option>
//     <option value="g">GMS - g</option>
//     <option value="in">INC - in</option>
//     <option value="kg">KGS - kg</option>
//     <option value="km">KME - km</option>
//     <option value="lb">LBS - lb</option>
//     <option value="mg">MGS - mg</option>
//     <option value="ml">MLT - ml</option>
//     <option value="m">MTR - m</option>
//     <option value="pcs">PCS - pcs</option>
//   </select>
// </div>
//             {itemType === 'Goods' && (
//               <div className="flex items-center gap-4">
//                 <label className="w-40"><input type="checkbox" defaultChecked /> Returnable Item</label>
//               </div>
//             )}
//           </div>

//           <div className="w-1/3">
//             <label className="block mb-2">Upload Image</label>
//             <div className="border-2 border-dashed p-4 text-center text-sm">
//               <p>Drag image(s) here or <a href="#" className="text-blue-500">Browse images</a></p>
//               <small className="block mt-2 text-gray-500">You can add up to 15 images, each not exceeding 5 MB in size and 7000 X 7000 pixels resolution.</small>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-8">
//   {/* Dimensions and Weight */}
//   <div>
//     <label className="block font-medium mb-1">Dimensions</label>
//     <div className="flex items-center gap-2 mb-1">
//       <input
//         type="number"
//         name="length"
//         placeholder="L"
//         className="w-20 border p-2 rounded"
//       />
//       <span>x</span>
//       <input
//         type="number"
//         name="width"
//         placeholder="W"
//         className="w-20 border p-2 rounded"
//       />
//       <span>x</span>
//       <input
//         type="number"
//         name="height"
//         placeholder="H"
//         className="w-20 border p-2 rounded"
//       />
//       <select className="border p-2 rounded">
//         <option value="cm">cm</option>
//         <option value="inch">inch</option>
//       </select>
//     </div>
//     <p className="text-sm text-gray-500">(Length X Width X Height)</p>
//   </div>

//   <div>
//     <label className="block font-medium mb-1">Weight</label>
//     <div className="flex items-center gap-2">
//       <input type="number" name="weight" className="w-full border p-2 rounded" />
//       <select className="border p-2 rounded">
//         <option value="kg">kg</option>
//         <option value="lb">lb</option>
//       </select>
//     </div>
//   </div>

//   {/* Manufacturer and Brand */}
//   <div>
//     <label className="block font-medium mb-1">Manufacturer</label>
//     <select className="w-full border p-2 rounded text-gray-500">
//       <option value="">Select or Add Manufacturer</option>
//     </select>
//   </div>

//   <div>
//     <label className="block font-medium mb-1">Brand</label>
//     <select className="w-full border p-2 rounded text-gray-500">
//       <option value="">Select or Add Brand</option>
//     </select>
//   </div>

//   {/* UPC and MPN */}
//   <div>
//     <label className="block font-medium mb-1 flex items-center gap-1">
//       UPC
//     </label>
//     <input type="text" name="upc" className="w-full border p-2 rounded" onChange={handleChange} />
//   </div>

//   <div>
//     <label className="block font-medium mb-1 flex items-center gap-1">
//       MPN
//     </label>
//     <input type="text" name="mpn" className="w-full border p-2 rounded" onChange={handleChange} />
//   </div>

//   {/* EAN and ISBN */}
//   <div>
//     <label className="block font-medium mb-1 flex items-center gap-1">
//       EAN
//     </label>
//     <input type="text" name="ean" className="w-full border p-2 rounded" onChange={handleChange}/>
//   </div>

//   <div>
//     <label className="block font-medium mb-1 flex items-center gap-1">
//       ISBN
//       {/* <span title="International Standard Book Number" className="cursor-pointer text-blue-500">?</span> */}
//     </label>
//     <input type="text" name="isbn" className="w-full border p-2 rounded" onChange={handleChange} />
//   </div>
// </div>


//         {/* Sales & Purchase Info Toggles */}
//         <div className="flex justify-between items-center gap-6">
//           <label>
//             <input
//               type="checkbox"
//               className="mr-2"
//               checked={isSalesInfo}
//               onChange={() => setIsSalesInfo(!isSalesInfo)}
//             />
//             Sales Information
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               className="mr-2"
//               checked={isPurchaseInfo}
//               onChange={() => setIsPurchaseInfo(!isPurchaseInfo)}
//             />
//             Purchase Information
//           </label>
//         </div>

//         {/* Sales & Purchase Fields */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex items-center gap-4">
//             <label className="w-40">Selling Price<span className="text-red-500">*</span></label>
//             <div className="flex items-center gap-2">
//               <span>INR</span>
//               <input type="text" name="sales_rate" className="border p-2 w-full" disabled={!isSalesInfo} onChange={handleChange} />
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <label className="w-40">Cost Price<span className="text-red-500">*</span></label>
//             <div className="flex items-center gap-2">
//               <span>INR</span>
//               <input type="text" name="rate" className="border p-2 w-full" disabled={!isPurchaseInfo} onChange={handleChange} />
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <label className="w-40">Account<span className="text-red-500">*</span></label>
//             <select className="border p-2 w-full" disabled={!isSalesInfo}><option>Sales</option></select>
//           </div>

//           <div className="flex items-center gap-4">
//             <label className="w-40">Account<span className="text-red-500">*</span></label>
//             <select className="border p-2 w-full" disabled={!isPurchaseInfo}><option>Cost of Goods Sold</option></select>
//           </div>

//           <div className="flex items-center gap-4">
//             <label className="w-40">Description</label>
//             <textarea className="border p-2 w-full" disabled={!isSalesInfo} />
//           </div>

//           <div className="flex items-center gap-4">
//             <label className="w-40">Description</label>
//             <textarea name="description" className="border p-2 w-full" disabled={!isPurchaseInfo} onChange={handleChange} />
//           </div>

//           <div className="flex items-center gap-4 col-span-2">
//             <label className="w-40">Preferred Vendor</label>
//             <select className="border p-2 w-full" disabled={!isPurchaseInfo}><option></option></select>
//           </div>
//         </div>

//         {/* Track Inventory Toggle */}
//         {canTrackInventory && (
//           <div className="space-y-4">
//             <div className="flex flex-col">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={trackInventory}
//                   onChange={() => setTrackInventory(!trackInventory)}
//                   className="mr-2"
//                 />
//                 Track Inventory for this item
//               </label>
//               <small className="text-gray-500 ml-6">
//                 You cannot enable/disable inventory tracking once you've created transactions for this item
//               </small>
//             </div>

//             {trackInventory && (
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-center gap-4">
//                   <label className="w-48">Inventory Account<span className="text-red-500">*</span></label>
//                   <select className="border p-2 w-full"><option>Select an account</option></select>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <label className="w-48">Inventory Valuation Method<span className="text-red-500">*</span></label>
//                   <select className="border p-2 w-full"><option>Select the valuation method</option></select>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <label className="w-48">Opening Stock</label>
//                   <input type="text" className="border p-2 w-full" />
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <label className="w-48">Opening Stock Rate per Unit</label>
//                   <input type="text" className="border p-2 w-full" />
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <label className="w-48">Reorder Point</label>
//                   <input type="text" className="border p-2 w-full" />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Submit Buttons */}
//         <div className="flex gap-4 mt-6">
//           <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
//           <button type="button" className="bg-gray-300 px-6 py-2 rounded">Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewItemForm;


import React, { useState, useRef } from "react";
import axios from 'axios';

const NewItemForm = () => {
  const [itemType, setItemType] = useState("Goods");
  const [isSalesInfo, setIsSalesInfo] = useState(true);
  const [isPurchaseInfo, setIsPurchaseInfo] = useState(true);
  const [trackInventory, setTrackInventory] = useState(false);
  const [packageDetails, setPackageDetails] = useState(
    {length: "",
      width: "",
      height: "",
      dimensionUnit: "cm",
      weight: "",
      weightUnit: "kg",});

  const canTrackInventory = true;

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    unit: { name: "", value: "" },
    upc: "",
    mpn: "",
    ean: "",
    isbn: "",
    sales_rate: "",
    rate: "",
    can_be_sold:true,
    can_be_purchased:true,
    brand:"",
    manufacturer:"",
    description: "",
    category_id:"",
    category_name:"",
    inventory_account_id:"",
    inventory_account_name:"",
    is_combo_product:false,
    is_receivable:false,
    is_returnable:false,
    item_type:"",
    part_number:"",
    product_short_description:"",
    product_type:"",
    purchase_account_id:"",
    purchase_account_name:"",
    purchase_description: "",
    preferred_vendor: "",
    packageDetails: {
      length: "",
      width: "",
      height: "",
      dimensionUnit: "cm",
      weight: "",
      weightUnit: "kg",
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageDetailsChange = (e) => {
    const { name, value } = e.target;
    setPackageDetails((prev) => ({
      //...prev,
      packageDetails: {
        ...prev.packageDetails,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    // Handle uploaded file(s)
    console.log(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Submit logic here
    const data = new FormData();
    // files.forEach((file) => data.append('files', file));
    data.append('name', formData.name);
    data.append('sku', formData.sku);
    data.append('brand', formData.brand);
    data.append('manufacturer', formData.manufacturer);
    data.append('can_be_purchased', formData.can_be_purchased);
    data.append('can_be_sold', formData.can_be_sold);
    data.append('category_id', formData.category_id);
    data.append('category_name', formData.category_name);
    data.append('description', formData.description || '');
    data.append('ean', formData.ean);
    // data.append('initial_stock', formData.initial_stock);
    data.append('initial_stock', 0);
    // data.append('initial_stock_rate', formData.initial_stock_rate);
    data.append('initial_stock_rate', 0);
    data.append('inventory_account_id', formData.inventory_account_id);
    data.append('inventory_account_name', formData.inventory_account_name);
    data.append('is_combo_product', formData.is_combo_product);
    data.append('is_receivable', formData.is_receivable);
    data.append('is_returnable', formData.is_returnable);
    data.append('isbn', formData.isbn);
    data.append('item_type', itemType);
    data.append('maximum_order_quantity', formData.maximum_order_quantity || 0); //Changed
    data.append('minimum_order_quantity', formData.minimum_order_quantity || 0); //Changed
    data.append('part_number', formData.part_number);
    data.append('product_short_description', formData.product_short_description);
    data.append('product_type', formData.product_type);
    data.append('purchase_account_id', formData.purchase_account_id);
    data.append('purchase_account_name', formData.purchase_account_name);
    data.append('purchase_description', formData.purchase_description);
    data.append('purchase_rate', formData.purchase_rate || 0); //Changed
    // data.append('rate', formData.rate);
    data.append('rate', formData.rate || 0);
    data.append('sales_rate', formData.sales_rate || 0);
    data.append('unit', formData.unit.value);
    data.append('upc', formData.upc);
    data.append('vendor_name', JSON.stringify([]));
    //data.append('price_brackets', JSON.stringify(priceBrackets));
    data.append('price_brackets', JSON.stringify([]));
    //data.append('package_details', JSON.stringify(packageDetails));
    data.append('package_details', JSON.stringify(packageDetails));
    // data.append('vendors', JSON.stringify(vendors));
    data.append('vendors', JSON.stringify([]));

    try {
      const response = await axios.post('/server/advance_function/item', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Item saved successfully!');
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item.');
    }
  };

  return (
    // <div className="max-w-7xl mx-auto p-6">
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">New Item</h2>
      <form className="space-y-10" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="flex justify-between gap-6">
          <div className="w-2/3 space-y-4">
            {/* Type */}
            <div className="flex items-center gap-4">
              <label className="w-40">Type</label>
              <div className="flex gap-4">
                <label>
                  <input type="radio" name="type" checked={itemType === "Goods"} onChange={() =>{ setItemType("Goods");
                    setFormData(prev => ({ ...prev, is_receivable: true }));
                  }} /> Goods
                </label>
                <label>
                  <input type="radio" name="type" checked={itemType === "Service"} onChange={() => {setItemType("Service");
                    setFormData(prev => ({ ...prev, is_receivable: false }));
                  }} /> Service
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="flex items-center gap-4">
              <label htmlFor="name" className="w-40">Name<span className="text-red-500">*</span></label>
              <input type="text" id="name" name="name" value={formData.name} required className="border p-2 w-full" onChange={handleChange} />
            </div>

            {/* SKU */}
            <div className="flex items-center gap-4">
              <label htmlFor="sku" className="w-40">SKU</label>
              <input type="text" id="sku" name="sku" value={formData.sku} className="border p-2 w-full" onChange={handleChange} />
            </div>

            {/* Unit */}
            <div className="flex items-center gap-4">
              <label htmlFor="unit" className="w-40">Unit<span className="text-red-500">*</span></label>
              <select
                id="unit"
                name="unit"
                className="border p-2 w-full"
                value={formData.unit.value}
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex];
                  setFormData((prev) => ({
                    ...prev,
                    unit: {
                      name: selectedOption.text,
                      value: selectedOption.value,
                    },
                  }));
                }}
              >
                <option value="">Select or type to add</option>
                <option value="box">BOX - box</option>
                <option value="cm">CMS - cm</option>
                <option value="dz">DOZ - dz</option>
                <option value="ft">FTS - ft</option>
                <option value="g">GMS - g</option>
                <option value="in">INC - in</option>
                <option value="kg">KGS - kg</option>
                <option value="km">KME - km</option>
                <option value="lb">LBS - lb</option>
                <option value="mg">MGS - mg</option>
                <option value="ml">MLT - ml</option>
                <option value="m">MTR - m</option>
                <option value="pcs">PCS - pcs</option>
              </select>
            </div>

            {itemType === "Goods" && (
              <div className="flex items-center gap-4">
                <label className="w-40"><input
                        type="checkbox"
                        checked={formData.is_returnable}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, is_returnable: e.target.checked }))
                        }
                      />{" "}
                      Returnable Item
                </label>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="w-1/3">
            <label className="block mb-2">Upload Image</label>
            <div className="border-2 border-dashed p-4 text-center text-sm">
              <p>
                Drag image(s) here or{" "}
                <a
                  href="#"
                  className="text-blue-500"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  Browse images
                </a>
              </p>
              <small className="block mt-2 text-gray-500">
                Up to 15 images, each not exceeding 5 MB and 7000x7000 pixels.
              </small>
              <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
          </div>
        </div>

        {/* Dimensions & Weight */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block font-medium mb-1">Dimensions</label>
            <div className="flex items-center gap-2 mb-1">
              <input type="number" name="length" placeholder="L" className="w-20 border p-2 rounded" value={formData.packageDetails.length} onChange={handlePackageDetailsChange} />
              <span>x</span>
              <input type="number" name="width" placeholder="W" className="w-20 border p-2 rounded" value={formData.packageDetails.width} onChange={handlePackageDetailsChange} />
              <span>x</span>
              <input type="number" name="height" placeholder="H" className="w-20 border p-2 rounded" value={formData.packageDetails.height} onChange={handlePackageDetailsChange} />
              <select name="dimensionUnit" className="border p-2 rounded" value={formData.packageDetails.dimensionUnit} onChange={handlePackageDetailsChange}>
                <option value="cm">cm</option>
                <option value="inch">inch</option>
              </select>
            </div>
            <p className="text-sm text-gray-500">(Length X Width X Height)</p>
          </div>

          <div>
            <label className="block font-medium mb-1">Weight</label>
            <div className="flex items-center gap-2">
              <input type="number" name="weight" className="w-full border p-2 rounded" value={formData.packageDetails.weight} onChange={handlePackageDetailsChange} />
              <select name="weightUnit" className="border p-2 rounded" value={formData.packageDetails.weightUnit} onChange={handlePackageDetailsChange}>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>
          <div>
     <label className="block font-medium mb-1">Manufacturer</label>
     <select className="w-full border p-2 rounded text-gray-500">
       <option value="">Select or Add Manufacturer</option>
     </select>
   </div>

   <div>
     <label className="block font-medium mb-1">Brand</label>
     <select className="w-full border p-2 rounded text-gray-500">
       <option value="">Select or Add Brand</option>
     </select>
   </div>

   {/* UPC and MPN */}
   <div>
     <label className="block font-medium mb-1 flex items-center gap-1">
       UPC
     </label>
     <input type="text" name="upc" className="w-full border p-2 rounded" onChange={handleChange} />
   </div>

   <div>
     <label className="block font-medium mb-1 flex items-center gap-1">
       MPN
     </label>
     <input type="text" name="mpn" className="w-full border p-2 rounded" onChange={handleChange} />
   </div>

   {/* EAN and ISBN */}
   <div>
     <label className="block font-medium mb-1 flex items-center gap-1">
       EAN
     </label>
     <input type="text" name="ean" className="w-full border p-2 rounded" onChange={handleChange}/>
   </div>

   <div>
     <label className="block font-medium mb-1 flex items-center gap-1">
       ISBN
       {/* <span title="International Standard Book Number" className="cursor-pointer text-blue-500">?</span> */}
     </label>
     <input type="text" name="isbn" className="w-full border p-2 rounded" onChange={handleChange} />
   </div>
        </div>

        {/* Sales & Purchase Info Toggles */}
        <div className="flex justify-between items-center gap-6">
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={isSalesInfo}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsSalesInfo(checked);
                setFormData((prev) => ({ ...prev, can_be_sold: checked }));
              }}
            />
            Sales Information
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={isPurchaseInfo}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsPurchaseInfo(checked);
                setFormData((prev) => ({ ...prev, can_be_purchased: checked }));
              }}
            />
            Purchase Information
          </label>
        </div>

        {/* Sales & Purchase Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4">
            <label className="w-40">Selling Price<span className="text-red-500">*</span></label>
            <div className="flex items-center gap-2">
              <span>INR</span>
              <input type="number" name="sales_rate" className="border p-2 w-full" disabled={!isSalesInfo} value={formData.sales_rate} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Cost Price<span className="text-red-500">*</span></label>
            <div className="flex items-center gap-2">
              <span>INR</span>
              <input type="number" name="rate" className="border p-2 w-full" disabled={!isPurchaseInfo} value={formData.rate} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Sales Account<span className="text-red-500">*</span></label>
            <select className="border p-2 w-full" disabled={!isSalesInfo}><option>Sales</option></select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Purchase Account<span className="text-red-500">*</span></label>
            <select className="border p-2 w-full" disabled={!isPurchaseInfo}><option>Cost of Goods Sold</option></select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Sales Description</label>
            <textarea className="border p-2 w-full" disabled={!isSalesInfo} />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Purchase Description</label>
            <textarea name="description" className="border p-2 w-full" disabled={!isPurchaseInfo} value={formData.description} onChange={handleChange} />
          </div>

          <div className="flex items-center gap-4 col-span-2">
            <label className="w-40">Preferred Vendor</label>
            <select name="preferred_vendor" className="border p-2 w-full" disabled={!isPurchaseInfo} value={formData.preferred_vendor} onChange={handleChange}>
              <option value="">Select a vendor</option>
            </select>
          </div>
        </div>

        {/* Track Inventory Toggle */}
        {canTrackInventory && (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label>
                <input type="checkbox" checked={trackInventory} onChange={() => setTrackInventory(!trackInventory)} className="mr-2" />
                Track Inventory for this item
              </label>
              <small className="text-gray-500 ml-6">
                You cannot enable/disable inventory tracking once you've created transactions for this item
              </small>
            </div>

            {trackInventory && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <label className="w-48">Inventory Account<span className="text-red-500">*</span></label>
                  <select className="border p-2 w-full"><option>Select an account</option></select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-48">Inventory Valuation Method<span className="text-red-500">*</span></label>
                  <select className="border p-2 w-full"><option>Select the valuation method</option></select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-48">Opening Stock</label>
                  <input type="number" className="border p-2 w-full" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-48">Opening Stock Rate per Unit</label>
                  <input type="number" className="border p-2 w-full" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-48">Reorder Point</label>
                  <input type="number" className="border p-2 w-full" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
          <button type="button" className="bg-gray-300 px-6 py-2 rounded" onClick={() => window.history.back()}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewItemForm;

