import { Fragment, useContext } from "react";
import "./styles.css";
import data from "../../data.json";
import { FormDataContext } from "../../app/context";

export interface FormProps {
  handleSubmitData: (formData: object) => void;
}

function Form({ handleSubmitData }: FormProps) {
  const context = useContext(FormDataContext);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    context?.setFormData({
      ...context.formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitData(e);
        }}
      >
        <div className="form-container">
          {data.formFields.map((field, index) => (
            <div key={index} className="form-item">
              <label>{field.fieldName}</label>
              <input value={context?.formData[field.fieldKey] || ""} type={field.fieldType} name={field.fieldKey} onChange={handleChangeInput}></input>
            </div>
          ))}
          <button>Submit</button>
        </div>
      </form>
    </Fragment>
  );
}

export default Form;
