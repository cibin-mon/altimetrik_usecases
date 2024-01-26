import "./styles.css";

export interface Value {
  label: string;
}

export interface ChipsProps {
  filterkey: string;
  options: any[];
  value: Value;
  handleChange: (fieldName: string, fieldvalue: any) => void;
}

function Chips({ options, handleChange, filterkey, value }: ChipsProps) {
  const handleClick = (value: object) => {
    handleChange(filterkey, value);
  };

  return (
    <div className="chips-component">
      {options?.map((option, index) => (
        <div key={index} className={`chip ${value.label === option.label && "chips-selected"}`} onClick={() => handleClick(option)}>
          {option.label}
        </div>
      ))}
    </div>
  );
}

export default Chips;
