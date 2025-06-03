import React, { useState } from 'react';

const ItemGroupForm = () => {
  // Existing states
  const [type, setType] = useState('Goods');
  const [returnable, setReturnable] = useState(true);
  const [createAttributes, setCreateAttributes] = useState(true);
  const [attributes, setAttributes] = useState([{ name: '', options: '' }]);

  // New states for inventory items section
  const [itemType, setItemType] = useState('Inventory');
  const [includeOpeningStock, setIncludeOpeningStock] = useState(false);
  const [items, setItems] = useState([
    {
      itemName: '',
      sku: '',
      costPrice: '',
      sellingPrice: '',
      upc: '',
      ean: '',
      isbn: '',
      reorderPoint: '',
    },
  ]);

  // Handlers for existing attributes
  const handleAttributeChange = (index, field, value) => {
    const updated = [...attributes];
    updated[index][field] = value;
    setAttributes(updated);
  };

  const addAttribute = () => {
    if (attributes.length < 3) {
      setAttributes([...attributes, { name: '', options: '' }]);
    }
  };

  const removeAttribute = (index) => {
    if (attributes.length > 1) {
      const updated = [...attributes];
      updated.splice(index, 1);
      setAttributes(updated);
    }
  };

  const handleCreateAttributesChange = () => {
    if (createAttributes) {
      setCreateAttributes(false);
      setAttributes([]);
    } else {
      setCreateAttributes(true);
      setAttributes([{ name: '', options: '' }]);
    }
  };

  // Handlers for inventory items
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([
      ...items,
      {
        itemName: '',
        sku: '',
        costPrice: '',
        sellingPrice: '',
        upc: '',
        ean: '',
        isbn: '',
        reorderPoint: '',
      },
    ]);
  };

  const removeItemRow = (index) => {
    if (items.length > 1) {
      const updated = [...items];
      updated.splice(index, 1);
      setItems(updated);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-white">
    <form className="max-w-6xl mx-auto bg-gray-50 p-8 rounded-md shadow-sm space-y-8">
      {/* Existing form fields */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-7 space-y-4">
          {/* Type */}
          <div className="grid grid-cols-3 items-center">
            <label className="font-medium">Type</label>
            <div className="col-span-2 flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={type === 'Goods'}
                  onChange={() => setType('Goods')}
                />
                Goods
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={type === 'Service'}
                  onChange={() => setType('Service')}
                />
                Service
              </label>
            </div>
          </div>

          {/* Item Group Name */}
          <div className="grid grid-cols-3 items-center">
            <label className="text-red-600 font-medium">Item Group Name*</label>
            <input
              type="text"
              required
              className="col-span-2 border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-3 items-start">
            <label className="font-medium">Description</label>
            <textarea
              rows="3"
              className="col-span-2 border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Returnable Item */}
          {type === 'Goods' && (
            <div className="grid grid-cols-3 items-center">
              <label className="font-medium">Returnable Item</label>
              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={returnable}
                  onChange={() => setReturnable(!returnable)}
                />
              </div>
            </div>
          )}

          {/* Unit */}
          <div className="grid grid-cols-3 items-center">
            <label className="text-red-600 font-medium">Unit*</label>
            <select className="col-span-2 border rounded px-3 py-2 w-full">
              <option>Select or type to add</option>
            </select>
          </div>

          {/* Manufacturer & Brand */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <label className="font-medium mt-2">Manufacturer & Brand</label>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Manufacturer</label>
                <select className="border rounded px-3 py-2 w-full">
                  <option>Select or Add Manufacturer</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Brand</label>
                <select className="border rounded px-3 py-2 w-full">
                  <option>Select or Add Brand</option>
                </select>
              </div>
            </div>
          </div>

          {/* Valuation */}
          <div className="grid grid-cols-3 items-center">
            <label className="font-medium leading-5">
              Inventory <br />Valuation Method
            </label>
            <select className="col-span-2 border rounded px-3 py-2 w-full">
              <option>FIFO (First In First Out)</option>
            </select>
          </div>

          {/* Attributes */}
          <div className="grid grid-cols-3 items-start">
            <label className="text-red-600 font-medium">Multiple Items*</label>
            <div className="col-span-2">
              <div className="mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={createAttributes}
                    onChange={handleCreateAttributesChange}
                  />
                  Create Attributes and Options
                </label>
              </div>

              {createAttributes &&
                attributes.map((attr, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      placeholder="eg: color"
                      value={attr.name}
                      onChange={(e) =>
                        handleAttributeChange(idx, 'name', e.target.value)
                      }
                      required
                      className="border rounded px-3 py-2 w-1/2"
                    />
                    <input
                      placeholder="Options"
                      value={attr.options}
                      onChange={(e) =>
                        handleAttributeChange(idx, 'options', e.target.value)
                      }
                      required
                      className="border rounded px-3 py-2 w-1/2"
                    />
                    {attributes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAttribute(idx)}
                        className="text-red-500 text-lg"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}

              {createAttributes && attributes.length < 3 && (
                <button
                  type="button"
                  onClick={addAttribute}
                  className="text-blue-600 text-sm flex items-center gap-1"
                >
                  <span>+ Add more attributes</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column – Image Upload */}
        <div className="col-span-5 flex items-start">
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 border border-dashed border-gray-300 p-4 rounded-md text-center flex flex-col justify-center items-center">
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-sm">
                Drag image(s) here or{' '}
                <span className="text-blue-600 underline cursor-pointer">
                  Browse images
                </span>
              </p>
              <small className="text-gray-500 text-xs mt-2 text-center">
                ℹ️ Max 15 images, ≤ 5 MB, 7000×7000 px
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* New Inventory Items Section */}
      <div className="border-t border-gray-300 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="itemType"
                checked={itemType === 'Inventory'}
                onChange={() => setItemType('Inventory')}
              />
              Inventory
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="itemType"
                checked={itemType === 'Non-Inventory'}
                onChange={() => setItemType('Non-Inventory')}
              />
              Non-Inventory
            </label>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeOpeningStock}
              onChange={() => setIncludeOpeningStock(!includeOpeningStock)}
            />
            Include Opening Stock
          </label>
        </div>

        {/* Table */}
        <table className="min-w-full border border-gray-300 text-left text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-2 text-red-600 font-semibold">ITEM NAME*</th>
              <th className="p-2 text-gray-500">SKU</th>
              <th className="p-2 text-red-600 font-semibold">
                COST PRICE (RS.)*<br />
                <span className="text-xs text-blue-600 cursor-pointer">PER UNIT</span><br />
                <span className="text-xs text-blue-600 cursor-pointer">COPY TO ALL</span>
              </th>
              <th className="p-2 text-red-600 font-semibold">
                SELLING PRICE (RS.)*<br />
                <span className="text-xs text-blue-600 cursor-pointer">PER UNIT</span><br />
                <span className="text-xs text-blue-600 cursor-pointer">COPY TO ALL</span>
              </th>
              <th className="p-2 text-gray-500">UPC</th>
              <th className="p-2 text-gray-500">EAN</th>
              <th className="p-2 text-gray-500">ISBN</th>
              <th className="p-2 text-gray-500">
                REORDER POINT <br />
                <span className="text-xs text-blue-600 cursor-pointer">COPY TO ALL</span>
              </th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="9" className="p-4 text-center text-gray-500">
                  Please enter attributes.
                </td>
              </tr>
            )}
            {items.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="p-2">
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(idx, 'itemName', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={item.sku}
                    onChange={(e) => handleItemChange(idx, 'sku', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.costPrice}
                    onChange={(e) => handleItemChange(idx, 'costPrice', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    required
                    min="0"
                    step="0.01"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.sellingPrice}
                    onChange={(e) => handleItemChange(idx, 'sellingPrice', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    required
                    min="0"
                    step="0.01"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={item.upc}
                    onChange={(e) => handleItemChange(idx, 'upc', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={item.ean}
                    onChange={(e) => handleItemChange(idx, 'ean', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={item.isbn}
                    onChange={(e) => handleItemChange(idx, 'isbn', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.reorderPoint}
                    onChange={(e) => handleItemChange(idx, 'reorderPoint', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    min="0"
                  />
                </td>
                <td className="p-2 text-center">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItemRow(idx)}
                      className="text-red-500 font-bold"
                    >
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add row button */}
        <div className="mt-2">
          <button
            type="button"
            onClick={addItemRow}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add Item
          </button>
        </div>

        {/* Save / Cancel Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            className="border border-gray-400 px-5 py-2 rounded"
            onClick={() => {
              // Reset form or navigate away logic here if needed
              alert('Cancel clicked');
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default ItemGroupForm;
