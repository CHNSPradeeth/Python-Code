import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("male");
  const [subjects, setSubjects] = useState({ english: true, maths: false, physics: false });
  const [resume, setResume] = useState(null);
  const [url, setUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubjectChange = (sub) => {
    setSubjects((prev) => ({ ...prev, [sub]: !prev[sub] }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setGender("male");
    setSubjects({ english: true, maths: false, physics: false });
    setResume(null);
    setUrl("");
    setSelectedOption("");
    setAbout("");
    setMessage("");
    setIsError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("gender", gender);
    formData.append("selectedOption", selectedOption);
    formData.append("subjects", JSON.stringify(subjects));
    if (resume) {
      formData.append("resume", resume);
    }
    formData.append("url", url);
    formData.append("about", about);

    try {
      const response = await axios.post("http://localhost:5000/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      handleReset();
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.error || "An error occurred while submitting the form.");
      console.error("Error details:", error);
    }
  };

  return (
    <div className="App">
      <h1>Form in React</h1>
      {message && (
        <div className={`message ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name*</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="lastName">Last Name*</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="email">Email*</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="contact">Contact*</label>
        <input
          id="contact"
          type="tel"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <fieldset>
          <legend>Gender*</legend>
          <label>
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            /> Female
          </label>
          <label>
            <input
              type="radio"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
            /> Other
          </label>
        </fieldset>

        <fieldset>
          <legend>Best Subject*</legend>
          <label>
            <input
              type="checkbox"
              checked={subjects.english}
              onChange={() => handleSubjectChange("english")}
            /> English
          </label>
          <label>
            <input
              type="checkbox"
              checked={subjects.maths}
              onChange={() => handleSubjectChange("maths")}
            /> Maths
          </label>
          <label>
            <input
              type="checkbox"
              checked={subjects.physics}
              onChange={() => handleSubjectChange("physics")}
            /> Physics
          </label>
        </fieldset>

        <label htmlFor="resume">Resume*</label>
        <input
          id="resume"
          type="file"
          onChange={handleFileChange}
          required
        />

        <label htmlFor="url">Website*</label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <label htmlFor="skill">Select Skill</label>
        <select
          id="skill"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="" disabled>Select your skill</option>
          <optgroup label="Beginners">
            <option value="1">HTML</option>
            <option value="2">CSS</option>
            <option value="3">JavaScript</option>
          </optgroup>
          <optgroup label="Advanced">
            <option value="4">React</option>
            <option value="5">Node</option>
            <option value="6">Express</option>
            <option value="7">MongoDB</option>
          </optgroup>
        </select>

        <label htmlFor="about">About You</label>
        <textarea
          id="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        ></textarea>

        <button type="reset" onClick={handleReset}>Reset</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;