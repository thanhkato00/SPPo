import React, { useEffect, useState } from "react";
import LayoutNavbar from "../Layout/LayoutNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal"; // Import Modal from react-bootstrap
import Button from "react-bootstrap/Button"; // Import Button from react-bootstrap

function HomePage() {
  const [data, setData] = useState([]);
  //search
  const [searchInput, setSearchInput] = useState("");
  const [sortType, setSortType] = useState("asc");
  const [sortTypeName, setSortTypeName] = useState("");
  //phan tran
  const [currentPage, setCurrentPage] = useState(1);
  //so phan tu trong 1 tran
  const [limitPerPage, setLimitPerPage] = useState(8);
  //tong so trang
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleView = (user) => {
    setSelectedUser(user);
  };
  const loadUser = async () => {
    let url = `http://localhost:8000/users?_page=${currentPage}$_limit=${limitPerPage}`;
    if (searchInput) {
      url = `http://localhost:8000/users?q=${searchInput}`;
    } else if (sortTypeName) {
      if (sortType === "desc") {
        url = `http://localhost:8000/users?_sort=${sortTypeName}&_order=desc&_page=${currentPage}$_limit=${limitPerPage}`;
      } else {
        url = `http://localhost:8000/users?_sort=${sortTypeName}&_order=asc&_page=${currentPage}$_limit=${limitPerPage}`;
      }
    }
    let result = await axios.get(url);
    const countResult = result.headers["x-total-count"];
    console.log(countResult);
    const totalResult = Math.ceil(countResult / limitPerPage);
    console.log(totalResult);
    setTotalPages(totalResult);
    setData(result.data);
  };
  console.log(totalPages);
  let paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        onClick={() => setCurrentPage(i)}
        active={i === currentPage}
      >
        {i}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    loadUser();
  }, [searchInput, sortType, sortTypeName, currentPage]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`);
    loadUser();
  };
  const handleSort = (sortName) => {
    setSortTypeName(sortName);
    setSortType(sortType === "asc" ? "desc" : "asc");
  };

  return (
    <div className="s">
      <LayoutNavbar />
      <h3 style={{ margin: "20px", textAlign: "center" }}>Home</h3>
      <div
        style={{
          display: "flex",
          width: "80%",
          margin: "10px auto",
          justifyContent: "space-around",
        }}
      >
        <Link to="/add-user">
          <button className="btn btn-outline-success" type="button">
            Add User
          </button>
        </Link>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <table
        className="table table-hover text-center"
        style={{ width: "80%", margin: "20px auto" }}
      >
        <thead>
          <tr className="table-dark">
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">
              Age
              <i
                className="fa-solid fa-sort"
                onClick={() => handleSort("age")}
              ></i>
            </th>
            <th scope="col">Address</th>
            <th scope="col" colSpan={3}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr key={element.id}>
              <td>{index + 1}</td>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.phone}</td>
              <td>{element.email}</td>
              <td>{element.age}</td>
              <td>{element.address}</td>
              <td>
                <button
                  onClick={() => handleView(element)}
                  type="button"
                  class="btn btn-outline-info"
                >
                  View
                </button>
              </td>
              <td>
                <Link to={`/edit-user/${element.id}`}>
                  <button type="button" class="btn btn-outline-warning">
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(element.id)}
                  type="button"
                  class="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={10} style={{ Align: "center" }}>
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                {paginationItems}

                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </td>
          </tr>
        </tfoot>
      </table>
      <Modal show={selectedUser !== null} onHide={() => setSelectedUser(null)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>ID: {selectedUser.id}</p>
              <p>Name: {selectedUser.name}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Age: {selectedUser.age}</p>
              <p>Address: {selectedUser.address}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedUser(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomePage;
