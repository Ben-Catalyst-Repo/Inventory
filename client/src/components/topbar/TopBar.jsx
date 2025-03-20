import React from 'react'
import "./topbar.css"
import { Link } from 'react-router-dom'

export default function TopBar() {

  return (
    <>
    <div className="topbarContainer">

        <div className="topbarLeft">
          <Link to="/">
             <span className='topLogo'>Inventory</span>
          </Link> 
        </div>
  
        <div className="topBarCenter">
            <div className="seacrhbar">
               <input placeholder='Search here' className="searchinput" />
            </div>
        </div>
       
        <div className="topbarRight">
            <button className="topbarAddButton">+</button>
            <img src="assets/C logo.png" alt="" className="toprightprofileimage" />
        </div>
    </div>

    </>
  )
}
