import React from 'react';
import { Field, getIn } from 'formik';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function DatePicker({
  name,
  label,
  disabled,
  defaultValue,
  format,
  onChange,
  ...props
}) {
  const props_format = props.format || 'dd/MM/yyyy';

  return (
    <div>
      <Field name={name}>
        {({ field: { onChange: _onChange, ...field }, meta, form }) => {
          // const fieldError = getIn(form.errors, field.name);
          const showError = meta.touched && !!form.errors[name];
          return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name={name}
                label={label}
                format={props_format}
                disabled={disabled ?? form.isSubmitting}
                onChange={
                  onChange ??
                  function (date) {
                    form.setFieldValue(field.name, date);
                  }
                }
                value={field.value}
                error={showError}
                helperText={showError ? form.errors[name] : props.helperText}
                // onError={
                //   onError ??
                //   form.setFieldError(
                //     field.name,
                //     fieldError ? String(fieldError) : undefined
                //   )
                // }
                {...field}
                {...props}
                {...meta}
              />
            </MuiPickersUtilsProvider>
          );
        }}
      </Field>
    </div>
  );
}

export default DatePicker;
