import React from "react";

const InputField = (props) => {
  const {
    type,
    placeholder,
    name,
    value,
    onChange,
    label,
    required,
    errors,
    setTouched,
    touched,
  } = props;

  return (
    <div>
      <h5 className="text-success">
        {label}
        {required ? <div className="text-danger d-inline"> *</div> : ""}
      </h5>
      <div className="form-group mb-3">
        <input
          type={type}
          className="form-control form-control-lg"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setTouched({ ...touched, [e.target.name]: true });
          }}
        />
        <ErrorMessageComponent errors={errors} touched={touched[name]} />
      </div>
    </div>
  );
};

const ErrorMessageComponent = (props) => {
  if (props.touched && props.errors) {
    return <div className="text-danger">{props.errors}</div>;
  } else {
    return <div>{""}</div>;
  }
};

export default InputField;
