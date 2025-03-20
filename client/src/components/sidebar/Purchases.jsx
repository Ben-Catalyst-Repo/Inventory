import React, { useState } from 'react'
import "./purchases.css"
import { Link } from 'react-router-dom';

export default function Purchases() {

    const[show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    }
  return (
    <div className={`sideBarPurchaseBtnContainer ${show ? "active" : "" } `}>
    <div className="sideBarPurchaseBtn" onClick={toggleShow}>Purchases</div>
    <div className="PurchaseBtnItems">
        <div className="PurchaseBtnContent">
           <Link to="/purchase/vendor" style={{ textDecoration: 'none', color: 'inherit' }}>
               <span>Vendors</span>
           </Link>
        </div>
        <div className="PurchaseBtnContent">
        <Link to="/purchase/purchaseOrder" style={{ textDecoration: 'none', color: 'inherit' }}>
               <span>Purchase Orders</span>
        </Link>
        </div>
        <div className="PurchaseBtnContent">
        <Link to="/purchase/bills" style={{ textDecoration: 'none', color: 'inherit' }}>
               <span>Bills</span>
        </Link>
        </div>
    </div>
</div>
  )
}
