import { Link } from 'react-router-dom'
import "./customerpage.css"


export default function CustomerPage() {
  return (
    <>
<div className="item-homepage-container">
  <div className="item-page-wrapper">

    <div className="item-page-topbar">
      <div className="item-list-section">
        <div className="item-list-heading">
          <span className="item-list-title">All Customers</span>
        </div>
      </div>

      <div className="action-section">
        <Link to="/item/new" className="action-button">
          <span>+ New</span>
        </Link>
      </div>
    </div>

    <div className="customer-page-bottom">
      <div className="customer-center-content">
       <div className='C1-customer-div'>
       <span className='C1-customer'>Business is no fun without people.</span>
       </div>
       <div className="C2-customer-div">
          <span className='C2customer'>Create and manage your contacts, all in one place.</span>
       </div>

         <div className='C3-customer-button'>
          <span className='C3-customer'>CREATE NEW CUSTOMER</span>
        </div> 
      </div>
    </div>

  </div>
</div>


    </>
  )
}
