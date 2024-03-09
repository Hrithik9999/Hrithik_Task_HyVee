import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ageRes = await axios.get(`https://api.agify.io?name=${name}`);
      const genderRes = await axios.get(
        `https://api.genderize.io?name=${name}`
      );
      const countryRes = await axios.get(
        `https://api.nationalize.io?name=${name}`
      );

      setAge(ageRes.data.age);
      setGender(genderRes.data.gender);
      setCountry(countryRes.data.country[0]?.country_id);

      console.log(name, age, gender, country);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {age && <p>Age: {age}</p>}
      {gender && <p>Gender: {gender}</p>}
      {country && <p>Country: {country}</p>}
    </div>
  );
}

export default Form;
