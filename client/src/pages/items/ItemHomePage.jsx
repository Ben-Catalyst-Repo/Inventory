import React from 'react'
import "./itemHomePage.css"
import { Link } from 'react-router-dom'


export default function ItemHomePage() {
  return (
    <>
      <div className="itmhomepage1-container">
         <div className="itempage1Wrapper">

         <div className="itempagetopbar">
  <div className="AllitemTopLeft">
    <div className="showallItemsLists">
      <span className="AllItemList">All Items</span>
    </div>
  </div>

  <div className="OtherItemsRightbar">
    <Link to="/item/new" className="rightbarbutton">
      + New
    </Link>
  </div>
</div>

            <div className="itemCretion-body">    
            <div className="box top">
              <div className="box-heading">
                 <span className='heading'>Item groups</span>
              </div>
              <div className='box-icon'>Icon</div>
              <div className="boxbottom">
                <span className="box-content">Create multiple variants of the same item using Item Groups</span>
                <div className="bottomboxdiv">
                   <button className="boxbottombutton">New Item Group</button>
                </div>
              </div>
            </div>
            
            <div className="box right">
            <div className="box-heading">
                 <span className='heading'>Items</span>
              </div>
              <div className='box-icon'>Icon</div>
              <div className="boxbottom">
                <span className="box-content">Create standalone items and services that you buy and sell</span>
                <div className="bottomboxdiv">
                   <button className="boxbottombutton">New Item</button>
                </div>
              </div>
            </div>


          <div className="box left-bottom">
            <div className="box-heading">
                 <span className='heading'>Composite Items</span>
              </div>
              <div className='box-icon'>Icon</div>
              <div className="boxbottom">
                <span className="box-content">Bundle different items together and sell them as kits</span>
                <div className="bottomboxdiv">
                   <button className="boxbottombutton">New Composite Item</button>
                </div>
              </div>
          </div>


          <div className="box right-bottom"><div className="box-heading">
                 <span className='heading'>Price Lists
                 </span>
              </div>
              <div className='box-icon'>Icon</div>
              <div className="boxbottom">
                <span className="box-content">Tweak your item prices for specific contacts or transactions</span>
                <div className="bottomboxdiv">
                   <button className="boxbottombutton">Enable Now</button>
                </div>
              </div></div> 
               
            </div>
          </div>
      </div>
    </>
  )
}




