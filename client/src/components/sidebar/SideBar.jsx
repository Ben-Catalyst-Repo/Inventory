import React from 'react'
import "./sideBar.css"
import InventoryButton from './InventoryButton'
import Sales from './Sales'
import Purchases from './Purchases'

export default function SideBar() {


  return (
    <div className='sidebarContainer'>
            <InventoryButton/>
            <Sales/>
            <Purchases/>
    </div>
  )
}
