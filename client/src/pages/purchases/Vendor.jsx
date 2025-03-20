import React from 'react'
import "./vendor.css"

export default function Vendor() {
  return (
    <>
    <div class="vendor-homepage-container">
    <div class="vendor-page-wrapper">
        <div class="vendor-page-topbar">
            <div class="vendor-list-section">
                <div class="vendor-list-heading">
                    <span class="vendor-list-title">All Vendors</span>
                </div>
            </div>
            <div class="action-section">
                <span>+ New Vendor</span>
            </div>
        </div>

        <div class="vendor-page-bottom">
            <div class="vendor-center-content">
                <div class="C1-vendor-div">
                    <span class="C1-vendor">Business is no fun without people.</span>
                </div>
                <div class="C2-vendor-div">
                    <span class="C2-vendor">Create and manage your contacts, all in one place.</span>
                </div>
                <div class="C3-vendor-button">
                    <span class="C3">CREATE NEW VENDOR</span>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}
