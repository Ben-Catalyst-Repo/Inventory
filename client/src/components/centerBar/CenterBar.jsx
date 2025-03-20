import React from 'react'
import "./centerBar.css"

export default function CenterBar() {
  return (
    <div className='homePagecenterConatainer'>
        <div className="homepageCenterWrapper">
            <div className="centerPageTop">
              <div className="centerpagetopName">
                   {/* Icon */}
                  <span className="centerTopName">Hello, Sakthivel</span>
              </div>

              <div className="centerPagetopDashboard">
                  <span className="centerPageDashboard">Dashboard</span>
              </div>
            </div>

            <div className="centerPageBottom">

              <div className="centerPageBottomTop">
                <div className="BottomTopSalesActivity">

                  <div className="BottomTopSalesActivityTopOrder">
                      <span className="BottomTopSalesActivityContent">Sales Activity</span>
                  </div>
                  
                  <div className="BottomTopSalesActivityBottomOrder">
                    <div className="SalesActivityBottomOrder">
                       <div className="ToBePackaged">
                          <div className="tobepackagedContent">
                             <div className="packageCount">0</div>
                             <span className="packageSalesQty">Qty</span>
                             <div className="bottomSalesPackaged">TO BE PACKAGED</div>
                          </div>
                       </div>

                       <div className="ToBePackaged">
                          <div className="tobeshippedContent">
                             <div className="ShippedCount">0</div>
                             <span className="shippedSalesQty">Qty</span>
                             <div className="bottomSalesShipped">TO BE Shipped</div>
                          </div>
                       </div>

                       <div className="ToBeDelivered">
                          Hello333
                       </div>

                       <div className="ToBeInvoiced">
                          Hello444
                       </div>
                    </div>
                  </div>
                </div>
               
              
                <div className="BottomTopInventorySummary">
                   <div className="BottomTopInventorySummaryWrapper">
                       <div className="BottomTopInventorySummaryTop">

                          <div className="BottomTopInventorySummaryheadDiv">
                             <span className="BottomTopInventorySummaryHeader">Inventory Summary</span>
                          </div>
                       </div>

                       <div className="BottomTopInventorySummaryBottom">

                          <div className="BottomTopInventorySummaryBottomItemLists">
                            <span className="BottomTopInventorySummaryBottomItemContent">QUANTITY IN HAND</span> 
                            <span className="BottomTopInventorySummaryBottomItemContentHandCount">0</span>
                          </div>

                          <hr className='BottomHr'/>

                          <div className="BottomTopInventorySummaryBottomItemLists">
                            <span className="BottomTopInventorySummaryBottomItemContent">QUANTITY TO BE RECEIVED</span>
                            <span className="BottomTopInventorySummaryBottomItemContentReceivedCount">0</span>
                          </div>

                       </div>
                   </div>
                </div>
              </div>

{/* /////Start From thisss///// */}

              <div className="centerPageBottomCenter">
                Heyyyyyy

              </div>
              <div className="centerPageBottomBottom"></div>
             
            </div>
        </div>
    </div>
  )
}
