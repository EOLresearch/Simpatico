function SelectField({ label, name, placeholder, id, value, onChange, options }) {
  return (
    <>
    {label && <label htmlFor={id}>{label}</label>}
    <div className='input-container'>
      <select name={name} id={id} placeholder={placeholder} value={value} onChange={onChange}>
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
    </>
  );
}

export default SelectField;