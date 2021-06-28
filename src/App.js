import { useState } from "react";
import checc from "checc";

function App() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: [],
    lastName: [],
    username: [],
    password: [],
    repeatPassword: [],
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus("");
  };

  const basicInputSchema = {
    minLength: 2,
    maxLength: 20,
    pattern: [/^[A-Za-z]*$/, "You can only include letters"],
  };

  const validationSchema = {
    firstName: basicInputSchema,
    lastName: basicInputSchema,
    username: {
      ...basicInputSchema,
      pattern: [
        /^\w*$/,
        "You can only include letters, digits and underscores",
      ],
    },
    password: {
      ...basicInputSchema,
      pattern: [/\d/, "Password must contain a digit"],
    },
    repeatPassword: {
      custom: (repeatPassword, { data }) =>
        repeatPassword === data.password
          ? null
          : Promise.reject("Passwords must match"),
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, isValid } = await checc(data, validationSchema, {
      keepSchema: true,
    });
    setErrors(errors);

    if (!isValid) {
      setSubmitStatus("Failure...");
    } else {
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
      <label>
        Repeat password
        <input
          value={data.repeatPassword}
          onChange={handleChange}
          name="repeatPassword"
          type="password"
        />
        <ul>
          {errors.repeatPassword.map((err) => (
            <li key={`repeatPassword-${err}`}>{err}</li>
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
