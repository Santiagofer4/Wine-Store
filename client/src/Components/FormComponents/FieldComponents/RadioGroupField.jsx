import React from 'react';
import { Field } from 'formik';
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

function RadioGroupField({ name, label, labelPlacement, options, ...props }) {
  return (
    <FormControl component="fieldset">
      <Field name={name}>
        {({ field, meta, form }) => {
          return (
            <>
              <RadioGroup {...field} {...props}>
                {options.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    label={option.label}
                    value={option.value}
                    control={<Radio />}
                    labelPlacement={labelPlacement || 'start'}
                  />
                ))}
              </RadioGroup>
              <FormHelperText>
                {form.errors && form.errors[name]}
              </FormHelperText>
            </>
          );
        }}
      </Field>
    </FormControl>
  );
}

export default RadioGroupField;
