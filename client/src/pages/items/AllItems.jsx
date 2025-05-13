import React, { useState } from "react";
import { Table, Button, Dropdown, Row, Col, Card } from "react-bootstrap";
import { FaPlus, FaList, FaTh, FaEllipsisV, FaSortUp, FaSortDown } from "react-icons/fa";

const sampleItems = [
  {
    id: 1,
    name: "Sample Item",
    sku: "SKU123",
    stock: 100,
    reorderLevel: 20,
    description: "This is a sample item used for demonstration."
  },
  {
    id: 2,
    name: "Second Item",
    sku: "SKU456",
    stock: 50,
    reorderLevel: 10,
    description: "Second item details go here."
  }
];

const ItemList = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <main className="container-fluid mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Left Filters */}
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">All Items</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>All</Dropdown.Item>
              <Dropdown.Item>Active</Dropdown.Item>
              <Dropdown.Item>Inactive</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Right Toolbar */}
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
        {/* Table Section */}
        <Col md={8}>
          <div className="table-responsive">
            <Table hover bordered>
              <thead className="table-light">
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>
                    Name <FaSortUp />
                  </th>
                  <th>SKU</th>
                  <th className="text-end">Stock On Hand</th>
                  <th className="text-end">Reorder Level</th>
                  <th className="text-center">
                    <Button variant="light" size="sm">
                      🔍
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sampleItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td
                      style={{ cursor: "pointer", color: "#0d6efd" }}
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.name}
                    </td>
                    <td>{item.sku}</td>
                    <td className="text-end">{item.stock}</td>
                    <td className="text-end">{item.reorderLevel}</td>
                    <td className="text-center">...</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>

        {/* Details Pane */}
        <Col md={4}>
          {selectedItem ? (
            <Card>
              <Card.Header>Item Details</Card.Header>
              <Card.Body>
                <h5>{selectedItem.name}</h5>
                <p><strong>SKU:</strong> {selectedItem.sku}</p>
                <p><strong>Stock:</strong> {selectedItem.stock}</p>
                <p><strong>Reorder Level:</strong> {selectedItem.reorderLevel}</p>
                <p><strong>Description:</strong> {selectedItem.description}</p>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-muted">Click an item to see details</div>
          )}
        </Col>
      </Row>
    </main>
  );
};

export default ItemList;
