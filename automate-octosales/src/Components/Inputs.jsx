import "../Styles/inputs.css";
import React, { useRef, useState } from "react";
import Contract from "../Components/Contract.jsx";
import prices from "../data/prices.json";

const CreateContactForm = () => {
  // GET current date (from: https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/)
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const currentDate = `${day}/${month}/${year}`;

  const [formData, setFormData] = useState({
    name: "",
    btw: "",
    address: "",
    representative: "",
    description: "",
    message: "",
    employee: "normal",
    place: "",
    pricing: "",
    payDate: "op",
    date: currentDate,
  });

  const [inputValues, setInputValues] = useState({
    name: "",
    btw: "",
    address: "",
    representative: "",
    description: "",
    employee: "normal",
    payDate: "",
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleUpdate = () => {
    let selectedPayDate;
    switch (inputValues.payDate) {
      case "3m":
        selectedPayDate = "3 maanden na";
        break;
      case "6m":
        selectedPayDate = "6 maanden na";
        break;
      default:
        selectedPayDate = "op";
    }

    console.log("the paydate is", selectedPayDate);

    setFormData({
      ...formData,
      ...inputValues,
      payDate: selectedPayDate,
      pricing: prices[inputValues.employee],
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
            value={inputValues.name}
            onChange={handleFieldChange}
          />
          <input
            type="text"
            placeholder="BTW nummer"
            name="btw"
            value={inputValues.btw}
            onChange={handleFieldChange}
          />
          <input
            type="text"
            placeholder="Maatschappelijke zetel te ADRES KLANT"
            name="address"
            value={inputValues.address}
            onChange={handleFieldChange}
          />
          <input
            type="text"
            placeholder="Vertegenwoordiger naam"
            name="representativeName"
            value={inputValues.representative.name}
            onChange={handleFieldChange}
          />
          <input
            type="text"
            placeholder="Vertegenwoordiger functie"
            name="representativeFunction"
            value={inputValues.representative.function}
            onChange={handleFieldChange}
          />
          <input
            type="text"
            placeholder="Omschrijving takenpakket"
            name="description"
            value={inputValues.description}
            onChange={handleFieldChange}
          />

          <label>
            Type
            <select
              name="employee"
              onChange={handleFieldChange}
              value={inputValues.employee}
            >
              <option value="normal">Young Talent</option>
              <option value="advanced">Advanced Young Talent</option>
              <option value="technical">Technical Young Talent</option>
              <option value="normal">Young Graduate</option>
              <option value="advanced">Advanced Young Graduate</option>
              <option value="technical">Technical Young Graduate</option>
              <option value="normal">Young Professional</option>
              <option value="advanced">Advanced Young Professional</option>
              <option value="technical">Technical Young Professional</option>
            </select>
          </label>
          <label>
            Betaling 50% van fee
            <select
              name="payDate"
              onChange={handleFieldChange}
              value={inputValues.payDate}
            >
              <option value="start">
                op het ogenblik van effectieve opstart
              </option>
              <option value="3m">3 maanden na effectieve opstart</option>
              <option value="6m">6 maanden na effectieve opstart</option>
            </select>
          </label>
        </div>
        <button onClick={handleUpdate}>Update gegevens</button>
      </div>
      <div className="contract-text-container">
        <Contract data={formData} />
      </div>
    </div>
  );
};

export default CreateContactForm;
