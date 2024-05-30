import React from 'react';
import { TextField, MenuItem } from '@mui/material';

function FilterComponent({ data, label, value, onChange }) {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      InputProps={{
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'black'
        }
      }}
      InputLabelProps={{
        style: {
          color: 'black'
        }
      }}
    >
      {data.map((option) => (
        <MenuItem key={option.value} value={option.value} style={{ color: 'black' }}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default FilterComponent;
