import "./styles.css";

export interface Radioprops {
  filterkey: string;
  options: any[];
  value: string;
  handleChange: (fieldName: string, fieldvalue: any) => void;
}

function Radio({ options, handleChange, filterkey }: Radioprops) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(filterkey, event.target.value);
  };

  return (
    <div className="radio-component">
      {options?.map((option, index) => (
        <div key={index}>
          <input type="radio" onChange={handleSelectChange} name={filterkey} value={option}></input>
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
}

export default Radio;
