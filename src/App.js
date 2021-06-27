import { useState } from "react";
import checc from "checc";

function App() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const initialErrorsObj = {
    firstName: [],
    lastName: [],
    username: [],
    password: [],
  };

  const [errors, setErrors] = useState(initialErrorsObj);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus("");
  };

  const basicInputSchema = {
    minLength: 2,
    maxLength: 20,
    pattern: [/^\w*$/, "You can only include letters, digits and underscores"],
  };

  const validationSchema = {
    firstName: basicInputSchema,
    lastName: basicInputSchema,
    username: basicInputSchema,
    password: {
      ...basicInputSchema,
      pattern: [/\d/, "Password must contain a digit"],
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = await checc(data, validationSchema, {
      keepSchema: true,
    });

    if (!isValid) {
      setErrors(errors);
      setSubmitStatus("Failure...");
    } else {
      setErrors(initialErrorsObj);
      setSubmitStatus("Success!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Checc-js demo</h1>
      <label>
        First name
        <input
          value={data.firstName}
          onChange={handleChange}
          name="firstName"
        />
        <ul>
          {errors.firstName.map((err) => (
            <li key={`firstName-${err}`}>{err}</li>
          ))}
        </ul>
      </label>
      <label>
        Last name
        <input value={data.lastName} onChange={handleChange} name="lastName" />
        <ul>
          {errors.lastName.map((err) => (
            <li key={`lastName-${err}`}>{err}</li>
          ))}
        </ul>
      </label>
      <label>
        Username
        <input value={data.username} onChange={handleChange} name="username" />
        <ul>
          {errors.username.map((err) => (
            <li key={`username-${err}`}>{err}</li>
          ))}
        </ul>
      </label>
      <label>
        Password
        <input
          value={data.password}
          onChange={handleChange}
          name="password"
          type="password"
        />
        <ul>
          {errors.password.map((err) => (
            <li key={`password-${err}`}>{err}</li>
          ))}
        </ul>
      </label>
      <button type="submit">Submit</button>
      <h1
        className={
          submitStatus === "Success!" ? "submit-success" : "submit-fail"
        }
      >
        {submitStatus}
      </h1>
    </form>
  );
}

export default App;
