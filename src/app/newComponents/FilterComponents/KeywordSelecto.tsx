import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './filterStyle.module.css';
export default function KeywordSelector() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 400,marginBottom:'1rem'  }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          <div className={styles.selector_label_container}>
            <div className={styles.keyword_brain}>
              <span className="material-symbols-outlined">neurology</span>
              <div>KEYWORD</div>
            </div>

            <div className={styles.label}>Select Keyword</div>
          </div>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
