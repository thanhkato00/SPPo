import React from "react";
import "./Recommended.css";
import axios from "axios";
function Recommended({ onSearch }) {
  const url = "http://localhost:8000/product";
  const handleCategorySearch = async (category) => {
    // try {
    //   console.log(`Searching for category: ${category}`);
    //   const response = await axios.get(`${url}/?category=${category}`);
    //   const searchResults = response.data;
    //   console.log("Search results:", searchResults);
    //   onSearch(category);
    // } catch (error) {
    //   console.error("Error searching for category:", error);
    // }
    if (category === "All Product") {
      onSearch({
        price:null,
        color:null,
        category:null,
      }); // Truyền một đối tượng trống để hiển thị tất cả sản phẩm
    } else {
      onSearch({ category });
    }  };

  return (
    <div>
      <div className="recommended-flex">
        
        <button
          className="btns"
          onClick={() => handleCategorySearch("All Product")}
        >
          All Product
        </button>
        <button className="btns" onClick={() => handleCategorySearch("Nike")}>
          Nike
        </button>
        <button className="btns" onClick={() => handleCategorySearch("Adidas")}>
          Adidas
        </button>
        <button className="btns" onClick={() => handleCategorySearch("Jordan")}>
          Jordan
        </button>
        <button
          className="btns"
          onClick={() => handleCategorySearch("Puma")}
        >
          Puma
        </button>
        <button className="btns" onClick={() => handleCategorySearch("MLB")}>
          MLB
        </button>
        <button
          className="btns"
          onClick={() => handleCategorySearch("Onitsuka Tiger")}
        >
          Onitsuka Tiger
        </button>
        <button
          className="btns"
          onClick={() => handleCategorySearch("Dr. Martens")}
        >
          Dr. Martens
        </button>
      </div>
    </div>
  );
}

export default Recommended;
