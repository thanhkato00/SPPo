import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Componnents/Pages/HomePage";
import AboutPage from "./Componnents/Pages/AboutPage";
import ContactPage from "./Componnents/Pages/ContactPage";
import NotPound from "./Componnents/Pages/NotPound";
import AddUser from "./Componnents/Users/AddUser";
import EditUser from "./Componnents/Users/EditUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/add-user" element={<AddUser />}></Route>
        <Route path="/edit-user/:id" element={<EditUser />}></Route>
        <Route path="/del-user/:id" element={<EditUser />}></Route>

        <Route path="*" element={<NotPound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
