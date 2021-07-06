function Input({ label, errors, ...props }) {
  return (
    <label>
      {label}
      <input {...props} />
      <ul>
        {errors.map((err) => (
          <li className="error" key={`${props.name}-${err}`}>
            {err}
          </li>
        ))}
      </ul>
    </label>
  );
}

export default Input;
