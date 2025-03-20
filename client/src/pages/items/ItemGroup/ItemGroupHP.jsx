

import React, { useState } from 'react';
import "./itemgropuHP.css";
import { Link } from 'react-router-dom';


export default function ItemGroupHP() {
  const [selectedType, setSelectedType] = useState("Goods");

  const [isSalesDropdownOpen, setIsSalesDropdownOpen] = useState(false);
  
  // State for selected unit
  const [selectedUnit, setSelectedUnit] = useState("Select Unit");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState("Select Manufacturer");

  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("Select Brand");

  const [isValuationDropdownOpen, setIsValuationDropdownOpen] = useState(false);
  const [selectedValuationMethod, setSelectedValuationMethod] = useState("Select Valuation Method");

  //Receivable button enable or disable
  const [isChecked, setIsChecked] = useState(false);

  //Attributes and options
  const [attributeOptions, setAttributeOptions] = useState([
    { id: 1, selectedAttribute: "", options: [], inputValue: "" }
]);

// Function to handle attribute selection
const handleAttributeChange = (id, value) => {
    setAttributeOptions(prev =>
        prev.map(attr => (attr.id === id ? { ...attr, selectedAttribute: value } : attr))
    );
};

// Function to handle adding new options
const handleKeyPress = (id, event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
        setAttributeOptions(prev =>
            prev.map(attr =>
                attr.id === id
                    ? { ...attr, options: [...attr.options, event.target.value], inputValue: "" }
                    : attr
            )
        );
    }
};

// Function to remove an option
const handleRemoveOption = (id, optionToRemove) => {
    setAttributeOptions(prev =>
        prev.map(attr =>
            attr.id === id
                ? { ...attr, options: attr.options.filter(option => option !== optionToRemove) }
                : attr
        )
    );
};

// Function to add another attribute selection
const addAttributeBox = () => {
    if (attributeOptions.length < 3) {
        setAttributeOptions(prev => [
            ...prev,
            { id: Date.now(), selectedAttribute: "", options: [], inputValue: "" }
        ]);
    }
};

// Function to remove an attribute selection
const removeAttributeBox = id => {
    setAttributeOptions(prev => prev.filter(attr => attr.id !== id));
};

// **Generating Table Rows Dynamically**
const generateTableRows = () => {
    const optionsLists = attributeOptions.map(attr => attr.options);

    if (optionsLists.some(options => options.length === 0)) return []; // If any attribute has no options, return empty

    // Generate all possible combinations using Cartesian Product
    const cartesianProduct = (arrays) => arrays.reduce((acc, curr) =>
        acc.flatMap(a => curr.map(b => (Array.isArray(a) ? [...a, b] : [a, b]))),
        [[]]
    );

    return cartesianProduct(optionsLists);
};

const tableRows = generateTableRows();
    


    




  













  // Toggle dropdown
  const toggleSalesDropdown = () => {
    setIsSalesDropdownOpen(!isSalesDropdownOpen);
  };

  // Handle unit selection
  const handleSelect = (unit) => {
    setSelectedUnit(unit);
    setIsSalesDropdownOpen(false); // Close dropdown after selection
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleBrandDropdown = () => {
    setIsBrandDropdownOpen(!isBrandDropdownOpen);
  };

  const toggleValuationDropdown = () => {
    setIsValuationDropdownOpen(!isValuationDropdownOpen);
  };


  const handleSelectForManufasture = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setIsDropdownOpen(false);
  };

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setIsBrandDropdownOpen(false);
  };

  const handleSelectValuationMethod = (method) => {
    setSelectedValuationMethod(method);
    setIsValuationDropdownOpen(false);
  };

  // Toggle for Receivable button

  const handleToggle = () => {
    setIsChecked(!isChecked); // Toggle the checked state
  };


  return (
    <div className="new-item-group-container">
        <div className="item-group-form-container">
            {/* Top Bar */}
            <div className="second-topbar-container">
             <div className="second-topbar-wrapper">
                <div className="second-topbar">
                <div className="topbar-left">
                    <div className="item-group-list-label">
                    <span className="item-group-list-title">New Item Group</span>
                    </div>
                </div>
                <div className="topbar-right">
                    <Link to="/item-group" className="new-item-group-button" style={{ textDecoration: 'none' }}>
                    <span>X</span>
                    </Link>
                </div>
                </div>
             </div>
            </div>

            {/* Form Section */}
            <div className="item-group-form-wrapper">
            <div className="item-group-first-child">
                {/* Type Selection */}
                <div className="item-group-fields-name">
                <label className="item-group-label">Type</label>
                <div className="item-group-input-radio">
                    <label>
                      <input 
                        type="radio" 
                        name="item-group-type" 
                        value="Goods" 
                        checked={selectedType === "Goods"} 
                        onChange={() => setSelectedType("Goods")} 
                      /> Goods
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="item-group-type" 
                        value="Service" 
                        checked={selectedType === "Service"} 
                        onChange={() => setSelectedType("Service")} 
                      /> Service
                    </label>
                </div>
                </div>

                {/* Item Group Name */}
                <div className="item-group-fields-name">
                <label className="item-group-label" htmlFor="item-group-name" style={{color: "red"}}>Item Group Name*</label>
                <div className="item-group-input">
                    <input type="text" id="item-group-name" className="item-group-input-field" />
                </div>
                </div>

                {/* Description */}
                <div className="item-group-fields-name">
                    <label className="item-group-label" htmlFor="description">Description</label>
                    <div className="item-group-textarea">
                        <textarea id="description" className="description-textarea"></textarea>
                    </div>
                </div>

                {/* Returnable Item Group */}
                {selectedType === "Goods" && (
                <div className="item-group-field-return" style={{ marginLeft: "240px", marginBottom: "20px" }}>
                <label htmlFor="returnable-item-group" className="return-item-group-div">
                    <input type="checkbox" id="returnable-item-group" className="new-item-group-checkbox" />
                    <span className="return">Returnable Item Group</span>
                </label>
                </div>
                )}

                <div className="item-group-field-select">
                    <label className="item-group-label" style={{color: "red"}}>Unit*</label>
                    <div className="item-group-select" style={{ marginRight: "43%", width: "36%" }}>
                        <div className="custom-dropdown">
                        <div className="dropdown" style={{ width: "140%" }}>
                            <button className="dropdown-button" style={{ width: "100%", height: "24px" }} onClick={toggleSalesDropdown}>
                            {selectedUnit}
                            </button>
                            {isSalesDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li className="dropdown-item" onClick={() => handleSelect('box')}>box</li>
                                <li className="dropdown-item" onClick={() => handleSelect('cm')}>cm</li>
                                <li className="dropdown-item" onClick={() => handleSelect('ft')}>ft</li>
                                <li className="dropdown-item" onClick={() => handleSelect('g')}>g</li>
                                <li className="dropdown-item" onClick={() => handleSelect('in')}>in</li>
                                <li className="dropdown-item" onClick={() => handleSelect('kg')}>kg</li>
                                <li className="dropdown-item" onClick={() => handleSelect('km')}>km</li>
                                <li className="dropdown-item" onClick={() => handleSelect('lb')}>lb</li>
                                <li className="dropdown-item" onClick={() => handleSelect('mg')}>mg</li>
                                <li className="dropdown-item" onClick={() => handleSelect('ml')}>ml</li>
                                <li className="dropdown-item" onClick={() => handleSelect('m')}>m</li>
                                <li className="dropdown-item" onClick={() => handleSelect('pcs')}>pcs</li>
                            </ul>
                            )}
                        </div>
                        </div>
                    </div>
                </div>


                <div className="item-group-field-select">
                    <label className="item-group-label">Manufacturer</label>
                        <div className="item-group-select" style={{ marginRight: "43%", width: "36%" }}>
                            <div className="custom-dropdown">
                                <div className="dropdown" style={{ width: "140%" }}>
                                    <button
                                    className="dropdown-button"
                                    style={{ width: "100%", height: "24px" }}
                                    onClick={toggleDropdown}
                                    >
                                    {selectedManufacturer}
                                    </button>
                                    {isDropdownOpen && (
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item" onClick={() => handleSelectForManufasture("MRF")}>MRF</li>
                                    </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                </div>

                <div className="item-group-field-select">
                    <label className="item-group-label">Brand</label>
                        <div className="item-group-select" style={{ marginRight: "43%", width: "36%" }}>
                            <div className="custom-dropdown">
                                <div className="dropdown" style={{ width: "140%" }}>
                                <button
                                    className="dropdown-button"
                                    style={{ width: "100%", height: "24px" }}
                                    onClick={toggleBrandDropdown}
                                >
                                    {selectedBrand}
                                </button>
                                {isBrandDropdownOpen && (
                                    <ul className="dropdown-menu">
                                    <li className="dropdown-item" onClick={() => handleSelectBrand("MRF")}>MRF</li>
                                    </ul>
                                )}
                                </div>
                            </div>
                        </div>
                </div>
    


                {/* Selection Fields */}
                {selectedType === "Goods" ? (
                    <div className="item-group-field-select">
                        <label className="item-group-label">Inventory Valuation Method</label>
                            <div className="item-group-select" style={{ marginRight: "43%", width: "36%" }}>
                                <div className="custom-dropdown">
                                    <div className="dropdown" style={{ width: "140%" }}>
                                        <button
                                            className="dropdown-button"
                                            style={{ width: "100%", height: "24px" }}
                                            onClick={toggleValuationDropdown}
                                        >
                                            {selectedValuationMethod}
                                        </button>
                                        {isValuationDropdownOpen && (
                                            <ul className="dropdown-menu">
                                            <li className="dropdown-item" onClick={() => handleSelectValuationMethod("FIFO")}>FIFO (First In First Out)</li>
                                            <li className="dropdown-item" onClick={() => handleSelectValuationMethod("LIFO")}>WAC (Weighted Average Costing)</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                    </div>
                    ) : (
                        <div className="item-group-field-select">
                        <label className="item-group-label">Receivable Item</label>
                        <div className="item-group-input-receivable-radio" style={{paddingRight: "77%"}}>
                          <input
                            type="checkbox"  // Use checkbox to allow toggling
                            name="receivable-item"
                            className="square-radio"
                            checked={isChecked}
                            onChange={handleToggle} 
                          />
                        </div>
                      </div>
                    )}


                {/* Multiple Items Checkbox */}
                <div className="item-group-field-select">
                    <label className="item-group-label">Multiple Items?</label>
                        <div className="item-group-field-MulItems" style={{ marginRight: "61%" }}>
                            <label htmlFor="MulItems-group" className="MulItems-group">
                            <input type="checkbox" id="MulItems-group" className="MulItems-item-group-checkbox" />
                            <span className="return">Create Attributes and Options</span>
                            </label>
                        </div>
                </div>


                <div className='select-item-container'>
                <div className='select-item-first-child'>
                    <div className='select-item-content'>
                    <span>Select your Item Type:</span>
                    </div>
                    <div className="select-item-content">
                    <input type="radio" id="inventory" name="itemType" value="inventory" />
                    <label htmlFor="inventory">Inventory</label>
                    </div>
                    <div className="select-item-content">
                    <input type="radio" id="non-inventory" name="itemType" value="non-inventory" />
                    <label htmlFor="non-inventory">Non-Inventory</label>
                </div>
            </div>
                <div className="select-item-second-child">
                    <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="hidden peer" id="includeStock" />
                    <span>Include Opening Stock</span>
                    </label>
                </div>
            </div>




            

           
    {/* Attribute Section */}
        <div>
            <div className='multiple-items-container'>
                {attributeOptions.map(({ id, selectedAttribute, options, inputValue }) => (
                    <div key={id} className="multiple-items-div">
                        {/* Attribute Section */}
                        <div className="attribute-child">
                            <span>Attribute*</span>
                            <select
                                value={selectedAttribute}
                                onChange={e => handleAttributeChange(id, e.target.value)}
                                className="attribute-dropdown"
                            >
                                <option value="">Select Attribute</option>
                                <option value="Color">Color</option>
                                <option value="Size">Size</option>
                                <option value="Material">Material</option>
                                <option value="Brand">Brand</option>
                            </select>
                        </div>

                        {/* Options Section */}
                        <div className="option-child">
                            <span>Options*</span>
                            <div className='option-box-delete-parent' style={{ display: "flex", alignItems: "center" }}>
                                <div className="options-input-box">
                                    {options.map((option, index) => (
                                        <div key={index} className="option-tag">
                                            {option}
                                            <button className="remove-option-btn" onClick={() => handleRemoveOption(id, option)}>❌</button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={e => setAttributeOptions(prev =>
                                            prev.map(attr =>
                                                attr.id === id ? { ...attr, inputValue: e.target.value } : attr
                                            )
                                        )}
                                        onKeyPress={e => handleKeyPress(id, e)}
                                        className="options-input"
                                        placeholder="Type and press Enter..."
                                    />
                                </div>
                                {/* Delete icon for attribute-option pair */}
                                {attributeOptions.length > 1 && (
                                    <div>
                                        <button className="delete-attribute-btn" onClick={() => removeAttributeBox(id)}>🗑️</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add More Attribute Button (Max 3) */}
                {attributeOptions.length < 3 && (
                    <button className="add-attribute-btn" onClick={addAttributeBox} style={{ marginTop: "15px", alignSelf: "flex-start", marginBottom: "20px" }}>
                        ➕ Add More Attribute
                    </button>
                )}
            </div>

            {/* Table Section */}
            <table className="item-group-table">
                <thead className='item-group-tab-head'>
                    <tr className='item-group-tab-head-rows'>
                        <th className='tab-th-first'>ITEM NAME</th>
                        <th>SKU</th>
                        <th>COST PRICE (RS.) PER UNIT</th>
                        <th>SELLING PRICE</th>
                        <th>UPC</th>
                        <th>EAN</th>
                        <th>ISBN</th>
                        <th>REORDER POINT</th>
                    </tr>
                </thead>
                <tbody className='item-group-tab-body'>
                    {tableRows.length > 0 ? (
                        tableRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.join(" - ")}</td>
                                <td><input type="text" placeholder="SKU" /></td>
                                <td><input type="text" placeholder="Cost Price" /></td>
                                <td><input type="text" placeholder="Selling Price" /></td>
                                <td><input type="text" placeholder="UPC" /></td>
                                <td><input type="text" placeholder="EAN" /></td>
                                <td><input type="text" placeholder="ISBN" /></td>
                                <td><input type="text" placeholder="Reorder Point" /></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>Add attributes and options to generate rows</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
        </div>
        </div>
        </div>
       
        <div className="bottom-bar">
            <div className='bottom-bar-parent'>
                <div className="save-btn">
                    <button className="bottom-btn">Save</button>
                </div>
                
                <div className="cancel-btn">
                    <button className="bottom-btn">Cancel</button>
                </div>
            </div>
        </div>
    </div>
  );
}

