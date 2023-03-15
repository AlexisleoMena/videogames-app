import React from "react";
import Select from "react-select";
import { FieldProps } from "formik";
import { OptionsType, ValueType } from "react-select/lib/types";


interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: OptionsType<Option>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}


let styles = {
  placeholder: (base:any) => ({
    ...base,
    fontSize: '1rem',
    color: "#06065051",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#F4F9FC",
    textIndent: "5px",
    border: state.isFocused ? "2px solid #06065051 !important" : "1px solid #80808078 !important",
    boxShadow: 'none'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "normal",
    backgroundColor: state.isSelected ? "#151313" : "#F4F9FC",
    color: state.isSelected ? "#fff" : "#151313",
    fontSize: "17px",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: "#151313",
    fontSize: "17px",
  }),
  multiValue: (provided: any, state: any) => ({
    ...provided,
    border: "1px solid #151313",
    borderRadius: "5px",
  }),
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#151313",
    color: "#fff",
    borderRadius: "0"
  }),
  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    color: "#eb1b1b",
    borderRadius: "0",
    ':hover': {
      backgroundColor: "#eb1b1b",
      color: 'white',
    }
  })
};

export const CustomSelect =  ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false
}: CustomSelectProps) => {
  const onChange = (option: ValueType<Option | Option[]>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      styles={styles}
      className={className}
      name={field.name}
      value={getValue() || null}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  )
};
export default CustomSelect;