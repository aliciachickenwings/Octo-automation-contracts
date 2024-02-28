import "../Styles/inputs.css";
import React, { useState } from "react";
import Contract from "../Components/Contract.jsx";

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
    place: "Gent",
    date: currentDate,
  });

  const { name, btw, address, representative, description, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRepresentativeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      representative: {
        ...prevState.representative,
        [name]: value,
      },
    }));
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
            name="representativeName"
            value={representative.name}
            onChange={handleRepresentativeChange}
          />
          <input
            type="text"
            placeholder="Vertegenwoordiger functie"
            name="representativeFunction"
            value={representative.function}
            onChange={handleRepresentativeChange}
          />
          <input
            type="text"
            placeholder="Omschrijving takenpakket"
            name="description"
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
