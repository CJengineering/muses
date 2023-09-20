import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './filterStyle.module.css';
import { useActionData } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { keywordsAttributesSelected } from 'src/features/searchAttributes/searchAttributesSlice';
import { createPresentationSearchAttributes } from 'src/presentation/createPresentation';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Keyword } from 'src/app/InternArticleForm';

export default function KeywordSelector() {
  const [keywords, setKeywords] = useState<Keyword[]>([]); // Explicitly type the keywords state
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null); // Explicitly type the selectedKeyword state

  const dispatch = useAppDispatch();
  const handleChange = (_: any, value: Keyword | null) => {
    if (value) {
      dispatch(keywordsAttributesSelected(value.key_word));
    } else {
      dispatch(keywordsAttributesSelected(''));
    }
  };
  
  
  React.useEffect(() => {
    fetch('https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/keyword_list')
      .then((response) => response.json())
      .then((data) => setKeywords(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box sx={{ maxWidth: 400, marginBottom: '1rem' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          <div className={styles.selector_label_container}></div>
        </InputLabel>
        <Autocomplete
          options={keywords}
          getOptionLabel={(option) => option.key_word}
          value={selectedKeyword}
          onChange={handleChange}
          renderInput={(params) => (
            <div className={styles.selector_label_container}>
              <span className="material-symbols-outlined">neurology</span>

              <TextField
                {...params}
                label="Select Keyword"
                variant="outlined"
                margin="normal"
                sx={{}}
              />
            </div>
          )}
        />
      </FormControl>
    </Box>
  );
}
