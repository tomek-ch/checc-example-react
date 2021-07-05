function Input({ name, label, type, handleChange, errors, value, autoFocus }) {
  return (
    <label>
      {label}
      <input
        value={value}
        onChange={handleChange}
        name={name}
        type={type}
        autoFocus={autoFocus}
      />
      <ul>
        {errors.map((err) => (
          <li className="error" key={`${name}-${err}`}>
            {err}
          </li>
        ))}
      </ul>
    </label>
  );
}

export default Input;
