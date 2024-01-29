import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
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
    await axios.put(`http://localhost:8000/users/${id}`, formInput);
    navigate("/");
  };
  const { id } = useParams();
  const loadUser = async () => {
    let result = await axios.get(`http://localhost:8000/users/${id}`);
    setFormInput(result.data);
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div>
      <div className="mx-auto shadow p5 w-75">
        <span onClick={() => navigate(-1)}>Back</span>
        <h2>Edit User</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
