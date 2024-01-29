import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [formInput, setFormInput] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    address: "",
  });
  const { name, phone, email, age, address } = formInput;
  const handleChangeInput = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  console.log(formInput);
  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/users", formInput);
    navigate("/");
  };
  return (
    <div>
      <div className="mx-auto shadow p5 w-75">
        <span onClick={() => navigate(-1)}>Back</span>
        <h2>Add User</h2>
        <form onSubmit={handleSubmitForm}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
          <br />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChangeInput}
          />
          <br />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          <br />
          <label>Age</label>
          <input
            type="text"
            name="age"
            value={age}
            onChange={handleChangeInput}
          />
          <br />
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChangeInput}
          />
          <br />
          <button type="submit" className="btn btn-success">
            Add User
          </button>
        </form>
        <form action="">
          <label htmlFor="">adf</label>
          <input type="text" />
        </form>
      </div>
    </div>
  );
}

export default AddUser;
