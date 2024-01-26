import "./styles.css";

export interface Selectprops {
  filterkey: string;
  options: any[];
  value: string;
  handleChange: (fieldName: string, fieldvalue: any) => void;
}

function Select({ options, handleChange, filterkey }: Selectprops) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(filterkey, event.target.value);
  };

  return (
    <div className="select-component">
      <select onChange={handleSelectChange} name={filterkey}>
        <option hidden>Select</option>
        {options?.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
