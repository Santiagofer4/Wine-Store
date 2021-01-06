import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import FormField from "../../FormComponents/FormField";

function Review() {
  const [value, setValue] = useState(2);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <FormField
        fieldType="textarea"
        label="Comentario"
        name="Comentario"
        rows={8}
        required
      />
    </div>
  );
}

export default Review;
