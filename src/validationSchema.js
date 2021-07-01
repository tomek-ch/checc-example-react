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

export default validationSchema;
