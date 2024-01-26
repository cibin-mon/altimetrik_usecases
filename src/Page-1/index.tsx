import { useState } from "react";
import "./styles.css";
import data from "../data.json";
import Form from "../components/Form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSelectedBrand, addData, resetLastSavedData } from "../app/reducers/baseSlice";
import { FormDataContext } from "../app/context";
import { useNavigate } from "react-router-dom";

function PageOne() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { selectedBrand, savedDatas } = useAppSelector((state) => state.base);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleSetBrand = (brand: string) => {
    dispatch(resetLastSavedData());
    dispatch(setSelectedBrand(brand));
    setFormData({
      model: brand,
    });
  };

  const handleData = () => {
    if (Object.keys(formData).length === data.formFields.length) {
      dispatch(addData(formData));
      setFormData({});
      dispatch(setSelectedBrand(""));
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      <div>
        <div className="container">
          {data.brands.map((brand, index) => (
            <div key={index} className="item" onClick={() => handleSetBrand(brand)}>
              {brand}
            </div>
          ))}
        </div>
        {selectedBrand && <Form handleSubmitData={handleData} />}
        <div>
          {Object.keys(savedDatas).length > 0 && (
            <div>
              <br />
              <div style={{ color: "green" }}>Saved to Redux store ✔</div>
              <br />
              {JSON.stringify(savedDatas)}
              <br />
              <br />
              <button onClick={()=> navigate('/filters')}>View Filters</button>
            </div>
          )}
        </div>
      </div>
    </FormDataContext.Provider>
  );
}

export default PageOne;
