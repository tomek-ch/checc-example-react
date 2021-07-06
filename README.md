# Checc.js React example

Demo form validation with [checc.js](https://github.com/tomek-ch/checc.js) in React.

![Checc.js demo](/demo.gif)

## Error handling

Validation is done on form submit. The `isValid` property is used for checking if there were any errors. Then the messages from the `errors` property are displayed.

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

A `basicInputSchema` object is used for basic text validation. The pattern gets overriden for `username` and `password`. A custom validator is used for checking whether the passwords match.

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
