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

  const [errorMessage, setErrorData] = useState();

  const [formData, setFormData] = useState({
    name: "",
    btw: "",
    address: "",
    representative: "",
    description: "",
    message: "",
    employee: "normal",
    place: "",
    pricing: "normal",
    payDate: "op",
    date: currentDate,
    generatePDF: false,
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
    if (
      inputValues.name.trim() === "" ||
      inputValues.btw.trim() === "" ||
      inputValues.address.trim() === "" ||
      inputValues.representativeName.trim() === "" ||
      inputValues.representativeFunction.trim() === "" ||
      inputValues.description.trim() === ""
    ) {
      setErrorData("Een of meerder velden zijn leeg");
      setFormData((prevData) => ({
        ...prevData,
        ...inputValues,
        generatePDF: false,
      }));
      return;
    } else {
      let selectedPayDate;
      console.log("pricing:", inputValues.employee);
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

      setFormData((prevData) => ({
        ...prevData,
        ...inputValues,
        payDate: selectedPayDate,
        pricing: prices[inputValues.employee],
        generatePDF: true,
      }));

      console.log("SELECTED EMPLOYEE", formData.pricing); // This may not reflect the updated value
      setErrorData("");
    }
  };

  return (
    <div className="contract-wrapper">
      <div className="contract-form-container">
        <div className="contract-form-input-fields">
          <h2>New contract</h2>
          <input
            type="text"
            className="input--full"
            placeholder="Naam klant"
            name="name"
            value={inputValues.name}
            onChange={handleFieldChange}
          />
          <div>
            <input
              type="text"
              className="input"
              placeholder="BTW nummer"
              name="btw"
              value={inputValues.btw}
              onChange={handleFieldChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Maatschappelijke zetel te ADRES KLANT"
              name="address"
              value={inputValues.address}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <input
              type="text"
              className="input"
              placeholder="Vertegenwoordiger naam"
              name="representativeName"
              value={inputValues.representative.name}
              onChange={handleFieldChange}
            />

            <input
              type="text"
              className="input"
              placeholder="Vertegenwoordiger functie"
              name="representativeFunction"
              value={inputValues.representative.function}
              onChange={handleFieldChange}
            />
          </div>
          <textarea
            type="text"
            className="input--big input--full"
            placeholder="Omschrijving takenpakket"
            name="description"
            value={inputValues.description}
            onChange={handleFieldChange}
          ></textarea>
          <div className="select-wrapper">
            <div>
              <label>Type</label>
              <select
                name="employee"
                className="input"
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
            </div>
            <div>
              <label>Betaling 50% van fee</label>
              <select
                name="payDate"
                className="input"
                onChange={handleFieldChange}
                value={inputValues.payDate}
              >
                <option value="start">
                  op het ogenblik van effectieve opstart
                </option>
                <option value="3m">3 maanden na effectieve opstart</option>
                <option value="6m">6 maanden na effectieve opstart</option>
              </select>
            </div>
          </div>
          <p className="error">{errorMessage}</p>
          <button onClick={handleUpdate} className="button">
            Update gegevens
          </button>
        </div>
      </div>
      <div className="contract-text-container">
        <Contract data={formData} />
      </div>
    </div>
  );
};

export default CreateContactForm;
