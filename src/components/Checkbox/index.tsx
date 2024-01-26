import "./styles.css";

export interface CheckBoxprops {
  filterkey: string;
  options: any[];
  value: any;
  handleChange: (fieldName: string, fieldvalue: any) => void;
}

function CheckBox({ options, handleChange, filterkey, value }: CheckBoxprops) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let filtered = value?.filter((e:string)=> e !== event.target.value)
    console.log("event", event.target.checked);
    if (event.target.checked) {
      handleChange(filterkey, [...new Set([...value, event.target.value])]);
    }else{
      handleChange(filterkey, filtered.length ? filtered : "");
    }
  };

  return (
    <div className="checkbox-component">
      {options?.map((option, index) => (
        <div key={index}>
          <input type="checkbox" onChange={handleSelectChange} name={filterkey} value={option}></input>
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
}

export default CheckBox;
