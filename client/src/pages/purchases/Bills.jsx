import React from 'react'
import "./bills.css";

export default function Bills() {
  return (
    <>
    <div class="bill-homepage-container"> 
    <div class="bill-page-wrapper">
        <div class="bill-page-topbar">
            <div class="bill-list-section">
                <div class="bill-list-heading">
                    <span class="bill-list-title">All Bills </span>
                </div>
            </div>
            <div class="action-section">
                <span>+ New Bill</span>
            </div>
        </div>

        <div class="bill-page-bottom">
            <div class="bill-center-content">
                <div class="B1-bill-div"> 
                    <span class="B1-bill">Owe money? It's good to pay bills on time!</span>
                </div>
                <div class="B2-bill-div">
                    <span class="B2-bill-">If you've purchased something for your business, and you don't have to repay it immediately, then you can record it as a bill.

</span>
                </div>
                <div class="B3-bill-button">
                    <span class="B3">Import Bills</span>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}
