import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { Field } from 'formik';

function SelectField({
  name,
  label,
  options,
  InputLabelProps,
  SelectProps,
  ...props
}) {
  return (
    <div>
      <Field name={name}>
        {({ field, meta, form }) => (
          <TextField
            select
            error={meta.touched && form.errors[name]}
            label={label}
            helperText={meta.touched && form.errors[name]}
            InputLabelProps={{
              ...InputLabelProps,
            }}
            SelectProps={{
              ...SelectProps,
            }}
            {...field}
            {...props}
          >
            {options.map((option, idx) => (
              <MenuItem key={idx} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Field>
    </div>
  );
}

export default SelectField;
