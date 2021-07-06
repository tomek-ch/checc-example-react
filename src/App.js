import { useState } from "react";
import checc from "checc";
import inputs from "./inputs";
import validationSchema from "./validationSchema";
import Input from "./Input";

function App() {
  const getObj = (val) =>
    inputs.reduce((obj, { name }) => ({ ...obj, [name]: val }), {});

  const [data, setData] = useState(getObj(""));
  const [errors, setErrors] = useState(getObj([]));
  const [submitStatus, setSubmitStatus] = useState("");

  const onChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, isValid } = await checc(data, validationSchema, {
      keepSchema: true,
    });
    setErrors(errors);

    if (isValid) {
      setSubmitStatus("Success!");
    } else {
      setSubmitStatus("Failure...");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Checc.js demo</h1>
      {inputs.map((input) => (
        <Input
          key={input.name}
          {...input}
          onChange={onChange}
          errors={errors[input.name]}
          value={data[input.name]}
        />
      ))}
      <button type="submit">Submit</button>
      <h1 className={submitStatus === "Success!" ? "success" : "error"}>
        {submitStatus}
      </h1>
    </form>
  );
}

export default App;
