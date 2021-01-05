import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

function Review() {
  const [value, setValue] = React.useState(2);

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
    </div>
  );
}

export default Review;