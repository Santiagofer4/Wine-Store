import React from 'react';
import { MenuItem, TextField, InputLabel, Select } from '@material-ui/core';
import { Field } from 'formik';

function SelectField({
  name,
  label,
  options,
  InputLabelProps,
  SelectProps,
  disabled,
  required,
  ...props
}) {
  return (
    <div>
      <Field name={name}>
        {({ field, meta, form }) => {
          return (
            <>
              <InputLabel id={name}>{label}</InputLabel>
              <Select {...field} {...props}>
                {options.map((option, idx) => (
                  <MenuItem key={idx} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </>
          );
        }}
      </Field>
    </div>
  );
}

export default SelectField;

//  <TextField
//             select
//             label={label}
//             id={name}
//             helperText={meta.touched && form.errors[name]}
//             disabled={disabled ?? form.isSubmitting}
//             InputLabelProps={{
//               ...InputLabelProps,
//             }}
//             SelectProps={{
//               ...SelectProps,
//             }}
//             {...field}
//             {...props}
//           >
//             {!required && (
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//             )}

//             {options.map((option, idx) => (
//               <MenuItem key={idx} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
