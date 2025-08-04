import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Medicinestore.css';

const Medicinestore = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/getallmedicines");
        setMedicines(res.data);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
        setMedicines([]);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="medicine-container">
      <h2 className="medicine-title">🩺 Medicine Store</h2>

      {medicines.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No medicines found.</p>
      ) : (
        <div className="medicine-grid">
          {medicines.map((med, index) => (
            <div key={index} className="medicine-card">
              <img src={med.img} alt={med.name} className="medicine-image" />
              <h3 className="medicine-name">{med.name}</h3>
              <p><strong>Price:</strong> ₹{med.price}</p>
              <p><strong>Usage:</strong> {med.usage}</p>
              <p className="medicine-description">{med.description}</p>
              <button className="add-cart-button">Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Medicinestore;
