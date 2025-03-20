import React from 'react'
import "./invoice.css"

export default function Invoice() {
  return (
    <>
    <div class="invoice-homepage-container">
    <div class="invoice-page-wrapper">
        <div class="invoice-page-topbar">
            <div class="invoice-list-section">
                <div class="invoice-list-heading">
                    <span class="invoice-list-title">All Invoices</span>
                </div>
            </div>
            <div class="action-section">
                <span>+ New Invoice</span>
            </div>
        </div>
        <div class="invoice-page-bottom">
            <div class="invoice-center-content">
                <div class="C1-div">
                    <span class="C1">It's time to get paid!</span>
                </div>
                <div class="C2-div">
                    <span class="C2">We don't want to boast too much, but sending amazing invoices and getting paid is easier than ever. Go ahead! Try it yourself.</span>
                </div>
                <div class="C3-buttonn">
                    <span class="C3">Import Invoice</span>
                </div>
            </div>
        </div>
    </div>
</div>
    
    </>
  )
}
