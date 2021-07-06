# Checc.js React example

Demo form validation with [checc.js](https://github.com/tomek-ch/checc.js) in React.

![Checc.js demo](/demo.gif)

## Error handling

```
// src/App.js

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
```

## Validation schema

```
// src/validationSchema.js

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
    pattern: [/^\w*$/, "You can only include letters, digits and underscores"],
  },
  password: {
    ...basicInputSchema,
    pattern: [/\d/, "Password must contain a digit"],
  },
  repeatPassword: {
    custom: (repeatPassword, { data }) =>
      repeatPassword !== data.password &&
      Promise.reject("Passwords must match"),
  },
};
```
