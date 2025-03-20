import React, { useState } from 'react';
import "./creationitem.css";
import { Link } from 'react-router-dom';

export default function CreateItem() {

  const [isSalesEnabled, setIsSalesEnabled] = useState(false);
  const [isPurchaseEnabled, setIsPurchaseEnabled] = useState(false);
  const [isInventoryEnabled, setIsInventoryEnabled] = useState(false);
  const [isSalesDropdownOpen, setIsSalesDropdownOpen] = useState(false);  // Separate state for sales dropdown
  const [isNewUnitDropdownOpen, setIsNewUnitDropdownOpen] = useState(false);  // Separate state for new unit dropdown
  const [selectedUnit, setSelectedUnit] = useState('Select a unit');
  const [selectedNewUnit, setSelectedNewUnit] = useState('Select new unit');

  const toggleSalesFields = () => {
    setIsSalesEnabled((prev) => !prev);
  };

  const togglePurchaseFields = () => {
    setIsPurchaseEnabled((prev) => !prev);
  };

  const handleCheckboxChange = () => {
    setIsInventoryEnabled(!isInventoryEnabled);
  };

  const toggleSalesDropdown = () => {
    setIsSalesDropdownOpen(!isSalesDropdownOpen);
    setIsNewUnitDropdownOpen(false);  // Close new unit dropdown when sales dropdown is opened
  };

  const toggleNewUnitDropdown = () => {
    setIsNewUnitDropdownOpen(!isNewUnitDropdownOpen);
    setIsSalesDropdownOpen(false);  // Close sales dropdown when new unit dropdown is opened
  };

  const handleSelect = (unit) => {
    setSelectedUnit(unit);
    setIsSalesDropdownOpen(false);  // Close the dropdown after selection
  };

  const handleSelectNewUnit = (unit) => {
    setSelectedNewUnit(unit);
    setIsNewUnitDropdownOpen(false);  // Close the dropdown after selection
  };
  return (
    <>
      <div className="new-item-container">
        <div className="item-form-container">
          <div className="second-topbar-container">
            <div className="second-topbar-wrapper">
              <div className="second-topbar">
                <div className="topbar-left">
                  <div className="item-list-label">
                    <span className="item-list-title">New Item</span>
                  </div>
                </div>
                <div className="topbar-right">
                  <Link to="/item" className="new-item-button" style={{ textDecoration: 'none' }}>
                    <span>X</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="item-form-wrapper">
            <div className="form-roww">
              <label>Type</label>
              <div className="type-selection">
                <label>
                  <input type="radio" name="item-type" value="Goods" />
                  Goods
                </label>
                <label>
                  <input type="radio" name="item-type" value="Service" />
                  Service
                </label>
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="item-name" className="new-item-label">Name</label>
              <input type="text" id="item-name" className="new-item-input" placeholder="Enter item name" />
            </div>

         
           
            <div className="form-row">
              <label htmlFor="item-unit" className="new-item-label">Unit</label>
                  <div className="custom-dropdown">
                    <div className="dropdown" style={{ marginLeft: '2px' }}>
                      <button className="dropdown-button" onClick={toggleSalesDropdown}>
                        {selectedUnit}
                      </button>
                      {isSalesDropdownOpen && (
                        <ul className="dropdown-menu">
                          <li className="dropdown-item" onClick={() => handleSelect('box')}>BOX - box</li>
                          <li className="dropdown-item" onClick={() => handleSelect('cm')}>CMS - cm</li>
                          <li className="dropdown-item" onClick={() => handleSelect('ft')}>FTS - ft</li>
                          <li className="dropdown-item" onClick={() => handleSelect('g')}>GMS - g</li>
                          <li className="dropdown-item" onClick={() => handleSelect('in')}>INC - in</li>
                          <li className="dropdown-item" onClick={() => handleSelect('kg')}>KGS - kg</li>
                          <li className="dropdown-item" onClick={() => handleSelect('km')}>KME - km</li>
                          <li className="dropdown-item" onClick={() => handleSelect('lb')}>LBS - lb</li>
                          <li className="dropdown-item" onClick={() => handleSelect('mg')}>MGS - mg</li>
                          <li className="dropdown-item" onClick={() => handleSelect('ml')}>MLT - ml</li>
                          <li className="dropdown-item" onClick={() => handleSelect('m')}>MTR - m</li>
                          <li className="dropdown-item" onClick={() => handleSelect('pcs')}>PCS - pcs</li>
                        </ul>
                      )}
                    </div>
                  </div>
             </div>

            


               

            <div className="form-row">
              <label htmlFor='return-item' className='return-item-div'>
                <input type="checkbox" id="returnable-item" className="new-item-checkbox" />
                <span className="return">Returnable Item</span>
              </label>
            </div>

            <div className="image-row">
              <div className="image-upload">
                <button className="browse-images-btn">Browse images</button>
                <p className="image-description">You can add up to 15 images, each not exceeding 5 MB in size and 7000 X 7000 pixels resolution.</p>
              </div>
            </div>
          </div>
        </div>



{/* Second Part */}

<div className="modal-inventory-tracking">
    <hr className='hr-tag' />
   
      {/* Checkbox and Side Heading */}
     
      
    
    <div className="track-inventoryfield-container">

      {/* Fields */}
     <div className="first-child">
        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>Dimensions</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>

        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>Manufacturer</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="stock-quantity"
              className="input-fields"
              placeholder="Enter stock quantity"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>

        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>UPC</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>

        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>EAN</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>
      </div>
     <div className="second-child">
     <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>Weight</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>


        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>Brand</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>

        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>MPN</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>

        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>ISBN</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>
     </div>
    </div>
  </div>




  <hr className='hr-tag' />


{/* Sales and Purchase Information Part */}
        <div className="sale-purchase-info-section">
          {/* Sales Information */}
          <div className="sales-info-side">
            <div className="sales-checkbox-container">
              <input
                type="checkbox"
                id="sales-info-checkbox"
                onChange={toggleSalesFields}
              />
              <label className='sales-info-label' htmlFor="sales-info-checkbox">Sales Information</label>
            </div>

            <div className="sales-fields">
              <div className="left-heading-fields">
                <label htmlFor="">
                  <div className="selling-price-span">
                    <span>Selling Price</span>
                  </div>
                </label>
                <div className="selling-price-label">
                  <input
                    type="text"
                    id="selling-price"
                    className="input-text"
                    placeholder="Enter selling price"
                    disabled={!isSalesEnabled}
                  />
                </div>
              </div>

              <div className="left-heading-fields">
                <label htmlFor="new-item-unit" className="new-item-label">New Unit</label>
                <div className="custom-dropdown">
                <div className="dropdown" style={{ marginLeft: '2px' }}>
                    <button className="dropdown-button" onClick={toggleNewUnitDropdown}>
                      {selectedNewUnit}
                    </button>
                    {isNewUnitDropdownOpen && (
                      <ul className="dropdown-menu">
                        {/* Heading for the units */}
                        <li className="dropdown-heading">Income</li>
                        <li className="dropdown-item" onClick={() => handleSelectNewUnit('liters')}>LITERS - l</li>
                        <li className="dropdown-item" onClick={() => handleSelectNewUnit('meters')}>METERS - m</li>
                        <li className="dropdown-item" onClick={() => handleSelectNewUnit('pieces')}>PIECES - pcs</li>
                        <li className="dropdown-item" onClick={() => handleSelectNewUnit('gallons')}>GALLONS - gal</li>
                        
                        {/* You can add more sections with headings if needed */}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="left-heading-fields">
                <label htmlFor="">
                  <div className="description-span">
                    <span>Description</span>
                  </div>
                </label>
                <div className="description-label">
                  <textarea
                    id="description"
                    className="textarea-text"
                    placeholder="Enter description"
                    disabled={!isSalesEnabled}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Information */}
          <div className="purchase-info-side">
            <div className="purchase-checkbox-container">
              <input
                type="checkbox"
                id="purchase-info-checkbox"
                onChange={togglePurchaseFields}
              />
              <label className="purchase-info-label" htmlFor="purchase-info-checkbox">
                Purchase Information
              </label>
            </div>

            <div className="purchase-fields">
              {/* Cost Price */}
              <div className="purchase-left-heading-fields">
                <label htmlFor="purchase-cost-price">
                  <div className="purchase-cost-price-span">
                    <span>Cost Price</span>
                  </div>
                </label>
                <div className="purchase-cost-price-label">
                  <input
                    type="text"
                    id="purchase-cost-price"
                    className="purchase-input-text"
                    placeholder="Enter cost price"
                    disabled={!isPurchaseEnabled}
                  />
                </div>
              </div>

              {/* INR */}
              <div className="purchase-left-heading-fields">
                <label htmlFor="purchase-inr">
                  <div className="purchase-inr-span">
                    <span>INR</span>
                  </div>
                </label>
                <div className="purchase-inr-label">
                  <input
                    type="text"
                    id="purchase-inr"
                    className="purchase-input-text"
                    placeholder="Enter INR value"
                    disabled={!isPurchaseEnabled}
                  />
                </div>
              </div>

              {/* Account */}
              <div className="purchase-left-heading-fields">
                <label htmlFor="purchase-account">
                  <div className="purchase-account-span">
                    <span>Account</span>
                  </div>
                </label>
                <div className="purchase-account-label">
                  <input
                    type="text"
                    id="purchase-account"
                    className="purchase-input-text"
                    placeholder="Enter account details"
                    disabled={!isPurchaseEnabled}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="purchase-left-heading-fields">
                <label htmlFor="purchase-description">
                  <div className="purchase-description-span">
                    <span>Description</span>
                  </div>
                </label>
                <div className="purchase-description-label">
                  <textarea
                    id="purchase-description"
                    className="purchase-textarea-text"
                    placeholder="Enter description"
                    disabled={!isPurchaseEnabled}
                  ></textarea>
                </div>
              </div>

              {/* Preferred Vendor */}
              <div className="purchase-left-heading-fields">
                <label htmlFor="purchase-preferred-vendor">
                  <div className="purchase-preferred-vendor-span">
                    <span>Preferred Vendor</span>
                  </div>
                </label>
                <div className="purchase-preferred-vendor-label">
                  <input
                    type="text"
                    id="purchase-preferred-vendor"
                    className="purchase-input-text"
                    placeholder="Enter vendor name"
                    disabled={!isPurchaseEnabled}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

<div>
         


{/* Track Inventory Part */}
        
        {isSalesEnabled && isPurchaseEnabled && (
  <div className="modal-inventory-tracking">
    <hr className='hr-tag' />
   
      {/* Checkbox and Side Heading */}
     
      <div className="checkbox-section">
        <label htmlFor="enable-inventory">
          <div className="inventory-checkbox">
            <input
              type="checkbox"
              id="enable-inventory"
              checked={isInventoryEnabled}
              onChange={handleCheckboxChange}
            />
            <span>Track Inventory</span>
          </div>
        </label>
      </div>
    
    <div className="track-inventoryfield-container">

      {/* Fields */}
     <div className="first-child">
        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>Inventory Account</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>

        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>Opening Stock</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="stock-quantity"
              className="input-fields"
              placeholder="Enter stock quantity"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>

        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>Reorder Point</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>
      </div>
     <div className="second-child">
     <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>Inventory Valuation Method</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>


        <div className="track-inventory-fields">
          <label htmlFor="">
            <div className="track-inventory-label">
              <span>Opening Stock Rate per Unit</span>
            </div>
          </label>
          <div className="track-inventory-input">
            <input
              type="text"
              id="product-price"
              className="input-fields"
              placeholder="Enter product price"
              disabled={!isInventoryEnabled}
            />
          </div>
        </div>
     </div>
    </div>
  </div>
)}

        
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
    </>
  );
}