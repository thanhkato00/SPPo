import React, { useState } from "react";

function Color({ onSearch }) {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorFilters = (color) => {
    console.log(color);

    // Toggle the selected color
    if (selectedColor === color) {
      setSelectedColor(null);
      onSearch({ color: null });
    } else {
      setSelectedColor(color);
      onSearch({ color });
    }
  };

  // Render buttons
  const renderColorButtons = () => {
    const colors = ["black", "white", "brown", "blue", "red", "yellow","gray","cherryred","pink","mauve"];

    return colors.map((color) => (
      <button
        key={color}
        className={`btn ${selectedColor === color ? "selected" : ""}`}
        onClick={() => handleColorFilters(color)}
      >
        {color}
      </button>
    ));
  };

  return (
    <div>
      <div className="sidebar-container">
        <h2 className="sidebar-title price-title">Color</h2>
        {renderColorButtons()}
      </div>
    </div>
  );
}

export default Color;
