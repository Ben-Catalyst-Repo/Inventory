import React, { useState } from 'react'
import "./Sales.css"
import { Link } from 'react-router-dom'

export default function Sales() {
    const[show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show);
    }


  return (
    <div className={`sideBarSalesBtnContainer ${show ? "active" : "" } `}>
        <div className="sideBarSalesBtn" onClick={toggleShow}>Sales</div>
        <div className="SalesBtnItems">
            <div className="SalesBtnContent">
              <Link to="/customer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span>Customers</span>
              </Link>
              
            </div>
            <div className="SalesBtnContent">
                Sales orders
            </div>
            <div className="SalesBtnContent">
              <Link to="/sales/deliveryChallan" style={{ textDecoration: 'none', color: 'inherit' }}>
                 <span>Delivery Challan</span>
              </Link>
            </div>
            <div className="SalesBtnContent">
            <Link to="/sales/invoice" style={{ textDecoration: 'none', color: 'inherit' }}>
                 <span>Invoice</span>
              </Link>
            </div>
        </div>
    </div>
  )
}
