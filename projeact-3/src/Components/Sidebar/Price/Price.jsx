import React, { useState } from "react";

function Price({ onSearch }) {
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handlePriceFilter = (priceRange) => {
    console.log("Filtering by price:", priceRange);

    // Toggle the selected price
    if (selectedPrice && selectedPrice === priceRange) {
      setSelectedPrice(null);
      onSearch({ price: null });
    } else {
      setSelectedPrice(priceRange);
      onSearch({ price: priceRange });
    }
  };

  const handleAllFilter = () => {
    // Reset the selected price to "All"
    setSelectedPrice(null);
    // Search with null to reset filters
    onSearch({ price: null });
  };
  

  // Render buttons
  const renderPriceButtons = () => {
    const priceRanges = [
      { min: null, max: null },
      { min: 10000, max: 25000 },
      { min: 25001, max: 50000 },
      { min: 50001, max: 75000 },
      { min: 75001, max: 99000 },
    ];

    return (
      <div>
        <button
          className={`btn ${!selectedPrice ? "selected" : ""}`}
          onClick={handleAllFilter}
        >
          All
        </button>
        {priceRanges.map((range, index) => (
          <button
            key={index}
            className={`btn ${selectedPrice === range.min ? "" : ""}`}

            onClick={() => handlePriceFilter(range)}
          >
            {range.min && range.max ? `${range.min}-${range.max}` : ""}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title price-title">Price</h2>
      {renderPriceButtons()}
    </div>
  );
}

export default Price;
