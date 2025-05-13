import React, { useState } from 'react';

const NewItemForm = () => {
  const [itemType, setItemType] = useState('Goods');
  const [isSalesInfo, setIsSalesInfo] = useState(true);
  const [isPurchaseInfo, setIsPurchaseInfo] = useState(true);
  const [trackInventory, setTrackInventory] = useState(true);

  const canTrackInventory = isSalesInfo && isPurchaseInfo;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">New Item</h2>
      <form className="space-y-10">

        {/* Basic Info */}
        <div className="flex justify-between gap-6">
          <div className="w-2/3 space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-40">Type</label>
              <div className="flex gap-4">
                <label><input type="radio" name="type" checked={itemType === 'Goods'} onChange={() => setItemType('Goods')} /> Goods</label>
                <label><input type="radio" name="type" checked={itemType === 'Service'} onChange={() => setItemType('Service')} /> Service</label>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="name" className="w-40">Name<span className="text-red-500">*</span></label>
              <input type="text" id="name" required className="border p-2 w-full" />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="sku" className="w-40">SKU</label>
              <input type="text" id="sku" className="border p-2 w-full" />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="unit" className="w-40">Unit<span className="text-red-500">*</span></label>
              <select id="unit" className="border p-2 w-full">
                <option value="">Select or type to add</option>
              </select>
            </div>

            {itemType === 'Goods' && (
              <div className="flex items-center gap-4">
                <label className="w-40"><input type="checkbox" defaultChecked /> Returnable Item</label>
              </div>
            )}
          </div>

          <div className="w-1/3">
            <label className="block mb-2">Upload Image</label>
            <div className="border-2 border-dashed p-4 text-center text-sm">
              <p>Drag image(s) here or <a href="#" className="text-blue-500">Browse images</a></p>
              <small className="block mt-2 text-gray-500">You can add up to 15 images, each not exceeding 5 MB in size and 7000 X 7000 pixels resolution.</small>
            </div>
          </div>
        </div>

        {/* Sales & Purchase Info Toggles */}
        <div className="flex justify-between items-center gap-6">
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={isSalesInfo}
              onChange={() => setIsSalesInfo(!isSalesInfo)}
            />
            Sales Information
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={isPurchaseInfo}
              onChange={() => setIsPurchaseInfo(!isPurchaseInfo)}
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
              <input type="text" className="border p-2 w-full" disabled={!isSalesInfo} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Cost Price<span className="text-red-500">*</span></label>
            <div className="flex items-center gap-2">
              <span>INR</span>
              <input type="text" className="border p-2 w-full" disabled={!isPurchaseInfo} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Account<span className="text-red-500">*</span></label>
            <select className="border p-2 w-full" disabled={!isSalesInfo}><option>Sales</option></select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Account<span className="text-red-500">*</span></label>
            <select className="border p-2 w-full" disabled={!isPurchaseInfo}><option>Cost of Goods Sold</option></select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Description</label>
            <textarea className="border p-2 w-full" disabled={!isSalesInfo} />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40">Description</label>
            <textarea className="border p-2 w-full" disabled={!isPurchaseInfo} />
          </div>

          <div className="flex items-center gap-4 col-span-2">
            <label className="w-40">Preferred Vendor</label>
            <select className="border p-2 w-full" disabled={!isPurchaseInfo}><option></option></select>
          </div>
        </div>

        {/* Track Inventory Toggle */}
        {canTrackInventory && (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label>
                <input
                  type="checkbox"
                  checked={trackInventory}
                  onChange={() => setTrackInventory(!trackInventory)}
                  className="mr-2"
                />
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
                  <input type="text" className="border p-2 w-full" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-48">Opening Stock Rate per Unit</label>
                  <input type="text" className="border p-2 w-full" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-48">Reorder Point</label>
                  <input type="text" className="border p-2 w-full" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
          <button type="button" className="bg-gray-300 px-6 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewItemForm;
