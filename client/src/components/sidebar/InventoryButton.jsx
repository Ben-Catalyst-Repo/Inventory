import React, { useState } from 'react'
import "./inventoryButton.css"
import { Link } from 'react-router-dom';

export default function InventoryButton() {
    const[show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    }


  return (
    <>
    <div className="homesideBar">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="homeSideBarBtn">Home</span>
        </Link> 
    </div>
    <div className={`sideBarInventoryBtnContainer ${show ? "active" : "" } `}>
        <div className="sideBarInventoryBtn" onClick={toggleShow}>Inventory</div>
        <div className="inventorybtnItems">
            <div className="inventorybtnContent">
                <Link to="/item" style={{ textDecoration: 'none', color: 'inherit' }}>
                   <span className='inventorybtnItems'>Items</span>
                </Link>
            </div>
            <div className="inventorybtnContent"> 
                <Link to="/item" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className='inventorybtnItems'>Items Groups</span>
                </Link>
            </div>
        </div>
    </div>
    </>
  )
}
