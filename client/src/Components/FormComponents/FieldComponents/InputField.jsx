import { Field } from 'formik';
import React from 'react';
import { TextField } from '@material-ui/core';

function InputField({ name, label, disabled, ...props }) {
  return (
    <div>
      <Field name={name}>
        {({ field, meta, form }) => (
          <TextField
            disabled={disabled ?? form.isSubmitting}
            error={meta.touched && form.errors[name]}
            label={label}
            helperText={meta.touched && form.errors[name]}
            {...field}
            {...props}
          />
        )}
      </Field>
    </div>
  );
}

export default InputField;
