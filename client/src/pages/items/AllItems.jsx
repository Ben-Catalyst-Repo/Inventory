import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Dropdown, Row, Col, Card, Spinner, Tabs, Tab } from "react-bootstrap";
import { FaPlus, FaList, FaTh, FaEllipsisV } from "react-icons/fa";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoadingItems(true);
      setSelectedItem(null);
      try {
        const response = await axios.get("/server/advance_function/items");
        setItems(response.data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoadingItems(false);
      }
    };
    fetchItems();
  }, []);

  const handleItemClick = async (itemId) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get(`/server/advance_function/items/${itemId}`);
      setSelectedItem(response.data.item);
      console.log("Item: "+JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching item details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <main className="container-fluid mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="secondary">All Items</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>All</Dropdown.Item>
            <Dropdown.Item>Active</Dropdown.Item>
            <Dropdown.Item>Inactive</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="d-flex align-items-center gap-2">
          <Button variant="primary">
            <FaPlus /> New
          </Button>
          <Button variant="secondary" active>
            <FaList />
          </Button>
          <Button variant="secondary">
            <FaTh />
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" className="p-2">
              <FaEllipsisV />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Sort A-Z</Dropdown.Item>
              <Dropdown.Item>Sort Z-A</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Row>
        {!selectedItem ? (
        <Col md={selectedItem ? 6 : 12}>
          <div className="table-responsive">
            {loadingItems ? (
              <div className="text-center py-4">
                <Spinner animation="border" />
              </div>
            ) : (
              <Table hover bordered>
                <thead className="table-light">
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Name</th>
                    <th>SKU</th>
                    <th className="text-end">Stock On Hand</th>
                    <th className="text-end">Reorder Level</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td><input type="checkbox" /></td>
                      <td
                        style={{ cursor: "pointer", color: "#0d6efd" }}
                        onClick={() => handleItemClick(item.ROWID)}
                      >
                        {item.name}
                      </td>
                      <td>{item.sku || "-"}</td>
                      <td className="text-end">{item.stock || 0}</td>
                      <td className="text-end">{item.reorder_level || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
        ):

        /* {selectedItem && (
          <Col md={6}>
            {loadingDetails ? (
              <div className="text-center py-4">
                <Spinner animation="border" />
              </div>
            ) : (
              <Card>
                <Card.Header>{selectedItem.category_name}</Card.Header>
                <Card.Body>
                  <p><strong>SKU:</strong> {selectedItem.sku || "-"}</p>
                  <p><strong>Item Type:</strong> {selectedItem.item_type || "-"}</p>
                  <p><strong>Unit:</strong> {selectedItem.unit || "-"}</p>
                  <p><strong>Dimensions:</strong> {selectedItem.dimensions || "-"}</p>
                  <p><strong>Weight:</strong> {selectedItem.weight || "-"}</p>
                  <p><strong>Cost Price:</strong> ₹{selectedItem.cost_price || "0.00"}</p>
                  <p><strong>Selling Price:</strong> ₹{selectedItem.selling_price || "0.00"}</p>
                  <p><strong>Purchase Account:</strong> {selectedItem.purchase_account || "-"}</p>
                  <p><strong>Sales Account:</strong> {selectedItem.sales_account || "-"}</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        )} */

   (     
  <Col md={selectedItem ? 6 : 12}>
  <div className="table-responsive">
    {loadingItems ? (
      <div className="text-center py-4">
        <Spinner animation="border" />
      </div>
    ) : (
      <Table hover bordered>
        {/* <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Cost Price</th>
          </tr>
        </thead> */}
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              style={
                selectedItem?.ROWID === item.ROWID
                  ? { backgroundColor: "#e7f1ff" }
                  : {}
              }
            >
              <td
                style={{ cursor: "pointer", color: "#0d6efd" }}
                onClick={() => handleItemClick(item.ROWID)}
              >
                {item.name}
              </td>
              <td>₹{item.cost_price || "0.00"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </div>
</Col>
   )}
      


        {selectedItem && (
  <Col md={6}>
    {loadingDetails ? (
      <div className="text-center py-4">
        <Spinner animation="border" />
      </div>
    ) : (
      <Card className="p-4">
        <h4 className="mb-2">{selectedItem.name || "-"}</h4>
        {selectedItem.is_returnable && (
          <p className="text-muted">Returnable Item</p>
        )}

        {/* Tabs */}
        <Tabs defaultActiveKey="overview" className="mb-3">
          <Tab eventKey="overview" title="Overview">
            {/* Overview Section */}
            <div className="mb-4">
              <h5 className="text-muted">General Information</h5>
              <Row>
                <Col md={6}>
                  <p><strong>Item Type:</strong> {selectedItem.item_type || "-"}</p>
                  <p><strong>Unit:</strong> {selectedItem.unit || "-"}</p>
                  <p><strong>Dimensions:</strong> {selectedItem.dimensions || "-"}</p>
                  <p><strong>Weight:</strong> {selectedItem.weight || "-"}</p>
                  <p><strong>Created Source:</strong> {selectedItem.created_source || "User"}</p>
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <div className="border p-3 text-center" style={{ borderStyle: 'dashed', width: '100%' }}>
                    <div>
                      <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
                      <p className="mb-1">Drag image(s) here or</p>
                      <a href="#">Browse images</a>
                      <small className="d-block mt-1 text-muted">Max 15 images, 5MB, 7000x7000 px</small>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Purchase Information */}
            <div className="mb-4">
              <h5 className="text-muted">Purchase Information</h5>
              <p><strong>Cost Price:</strong> ₹{selectedItem.cost_price || "0.00"}</p>
              <p><strong>Purchase Account:</strong> {selectedItem.purchase_account || "-"}</p>
            </div>

            {/* Sales Information */}
            <div>
              <h5 className="text-muted">Sales Information</h5>
              <p><strong>Selling Price:</strong> ₹{selectedItem.selling_price || "0.00"}</p>
              <p><strong>Sales Account:</strong> {selectedItem.sales_account || "-"}</p>
            </div>
          </Tab>

          <Tab eventKey="transactions" title="Transactions">
            <p>No transaction data yet.</p>
          </Tab>

          <Tab eventKey="history" title="History">
            <p>History logs will appear here.</p>
          </Tab>
        </Tabs>
      </Card>
    )}
  </Col>
)}

      </Row>
    </main>
  );
};

export default ItemList;
