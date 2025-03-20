import Home from "./pages/Home/Home";
import { HashRouter, Route, Routes } from 'react-router-dom';
import ItemHomePage from "./pages/items/ItemHomePage";
import CustomerPage from "./pages/sales/CustomerPage";
import TopBar from "./components/topbar/TopBar";
import SideBar from "./components/sidebar/SideBar";
import "./App.css"
import CreateItem from "./pages/items/CreateItem";
import DeliveryChallan from "./pages/sales/DeliveryChallan";
import Invoice from "./pages/sales/Invoice";
import Vendor from "./pages/purchases/Vendor";
import PurchaseOrders from "./pages/purchases/PurchaseOrders";
import Bills from "./pages/purchases/Bills";
import ItemGroupHP from "./pages/items/ItemGroup/ItemGroupHP";

function App() {
  return (
    <HashRouter>
      <TopBar/>
      <div className="applayout">

          <SideBar />
       
        <div className="contentArea">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/item" element={<ItemHomePage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/item/new" element={<ItemGroupHP />} />
            <Route path="/sales/deliveryChallan" element={<DeliveryChallan />} />
            <Route path="/sales/invoice" element={<Invoice />} />
            <Route path="/purchase/vendor" element={<Vendor />} />
            <Route path="/purchase/purchaseOrder" element={<PurchaseOrders />} />
            <Route path="/purchase/bills" element={<Bills />} />
          </Routes>
        </div>

      </div>
    </HashRouter>
  );
}

export default App;
