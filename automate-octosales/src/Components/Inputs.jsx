import "../Styles/inputs.css";
import React, { useState } from "react";
import Contract from "../Components/Contract.jsx";

const CreateContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    btw: "",
    address: "",
    representative: "",
    description: "",
    message: "",
  });

  const { name, btw, address, representative, description, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="contract-wrapper">
      <h3>New contract</h3>
      <div className="contract-form-container">
        <div className="contract-form-input-fields">
          <input
            type="text"
            placeholder="Naam klant"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="BTW nummer"
            name="btw"
            value={btw}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Maatschappelijke zetel te ADRES KLANT"
            name="address"
            value={address}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Vertegenwoordiger naam"
            name="representative"
            value={representative}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Omschrijving takenpakket"
            name="Omschrijving takenpakket"
            value={description}
            onChange={handleChange}
          />
        </div>
        {message && <p className="message">{message}</p>}
      </div>
      <div className="contract-text-container">
        <Contract data={formData} />
      </div>
    </div>
  );
};

export default CreateContactForm;
