import { Fragment, useState } from "react";
import "./styles.css";
import data from "../data.json";
import Select from "../components/Select";
import CheckBox from "../components/Checkbox";
import Radio from "../components/Radio";
import Chips from "../components/Chips";
import { useAppSelector } from "../app/hooks";

interface Filters {
  [key: string]: any;
}

function PageTwo() {
  const { savedDatas } = useAppSelector((state) => state.base);
  const [filters, setFilters] = useState<Filters>({});

  const returnDataBasedOnKey = (key: string) => {
    return [...new Set(savedDatas.map((item) => item[key]))];
  };

  const handleFilterChange = (fieldName: string, fieldvalue: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [fieldName]: fieldvalue,
    }));
  };

  const filterDataBySelectedFilters = savedDatas?.filter((item) => {
    const removeEmptyFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ""));

    return Object.entries(removeEmptyFilters).every(([key, value]) => {
      if (key === "kms") {
        if (value.type === "less") {
          return item[key] < value.value;
        } else if (value.type === "more") {
          return item[key] > value.value;
        } else if (value.type === "between") {
          const [min, max] = value.value;
          return item[key] >= min && item[key] <= max;
        }
      } else {
        return value?.includes(item[key]);
      }
    });
  });

  return (
    <Fragment>
      <div className="grid-container">
        <div className="col-3">
          {data.filters.map((filter, index) => (
            <div key={index} className="filter-item">
              <div>{filter.filterName}</div>
              {filter.filtertype === "select" && <Select value={filters?.[filter.filterkey]} filterkey={filter.filterkey} handleChange={handleFilterChange} options={returnDataBasedOnKey(filter.filterkey)} />}
              {filter.filtertype === "checkbox" && <CheckBox value={filters?.[filter.filterkey] || []} filterkey={filter.filterkey} handleChange={handleFilterChange} options={returnDataBasedOnKey(filter.filterkey)} />}
              {filter.filtertype === "radio" && <Radio value={filters?.[filter.filterkey] || []} filterkey={filter.filterkey} handleChange={handleFilterChange} options={returnDataBasedOnKey(filter.filterkey)} />}
              {filter.filtertype === "chips" && <Chips value={filters?.[filter.filterkey] || []} filterkey={filter.filterkey} handleChange={handleFilterChange} options={filter.options || []} />}
            </div>
          ))}
        </div>
        <div className="col-9">
          <div className="filtered-container">
            {filterDataBySelectedFilters?.map((car, index) => (
              <div key={index} className="filtered-item">
                {car?.model}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ color: "green" }}>Filters used ✔</div>
      {JSON.stringify(filters)}
      <br />
      <br />
      <div style={{ color: "green" }}>
        Current Datas Based on filter ✔ {` `}
        <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(filterDataBySelectedFilters))}`} download="filters.json">
          {`Download as Json`}
        </a>
      </div>
      {JSON.stringify(filterDataBySelectedFilters)}
    </Fragment>
  );
}

export default PageTwo;
