import React from 'react'
import "./purchaseorder.css"

export default function PurchaseOrders() {
  return (
    <>
   <div class="po-homepage-container"> 
    <div class="po-page-wrapper">
        <div class="po-page-topbar">
            <div class="po-list-section">
                <div class="po-list-heading">
                    <span class="po-list-title">All Purchase Orders </span>
                </div>
            </div>
            <div class="action-section">
                <span>+ New Purchase Order</span>
            </div>
        </div>

        <div class="po-page-bottom">
            <div class="po-center-content">
                <div class="C1-po-div">
                    <span class="C1-po">Start Managing Your Purchase Activities!</span>
                </div>
                <div class="C2-po-div">
                    <span class="C2-po">Create, customize, and send professional Purchase Orders to your vendors.</span>
                </div>
                <div class="C3-po-button">
                    <span class="C3">CREATE NEW PURCHASE ORDER</span>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}
