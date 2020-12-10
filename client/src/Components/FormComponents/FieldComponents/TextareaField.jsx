import { Field } from 'formik';
import React from 'react';
import { TextField } from '@material-ui/core';

function TextareaField({ name, label, ...props }) {
  return (
    <div>
      <Field name={name}>
        {({ field, meta, form }) => (
          <TextField
            error={meta.touched && form.errors[name]}
            label={label}
            variant="outlined"
            multiline
            helperText={meta.touched && form.errors[name]}
            {...field}
            {...props}
          />
        )}
      </Field>
    </div>
  );
}

export default TextareaField;
