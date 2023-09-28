import React, { useState, useEffect } from 'react';
import styles from './app.module.css'
import {
  TextField,
  Autocomplete,
  Typography,
  Button,
  Snackbar,
} from '@mui/material';

export interface Keyword {
  id: number;
  key_word: string;
  rss_url: string;
  created_at: string;
  updated_at: string;
  factiva: boolean;
}

const ContentFormMobile: React.FC = () => {
  const [link, setLink] = useState('');
  
  const [keywords, setKeywords] = useState<Keyword[]>([]); // Explicitly type the keywords state
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null); // Explicitly type the selectedKeyword state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Fetch keywords from the API endpoint
  useEffect(() => {
    fetch('https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/keyword_list')
      .then((response) => response.json())
      .then((data) => setKeywords(data))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    const updateKeyboardVisibility = () => {
      if (window.innerHeight < window.outerHeight) {
        setKeyboardVisible(true);
      } else {
        setKeyboardVisible(false);
      }
    };

    window.addEventListener('resize', updateKeyboardVisibility);
    
    return () => {
      window.removeEventListener('resize', updateKeyboardVisibility);
    };
  }, []);

  useEffect(() => {
    if (keyboardVisible) {
      document.documentElement.style.setProperty('--button-bottom-position', '20vh');
    } else {
      document.documentElement.style.setProperty('--button-bottom-position', '0');
    }
  }, [keyboardVisible]);

  const handleSubmit = () => {
    if (selectedKeyword && link) {
      const endpoint = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/articleintern?id=${selectedKeyword.id}&link=${encodeURIComponent(link)}`;
  
      // Make API request to the endpoint
      fetch(endpoint)
        .then((response) => {
          if (response.status === 204) {
            setMessage('Form data sent successfully.');
            setLink(''); 
            setSelectedKeyword(null); 
          } else {
            setMessage('An error occurred while sending form data.');
          }
          setSnackbarOpen(true);
        })
        .catch((error) => {
          setMessage('An error occurred while sending form data.');
          setSnackbarOpen(true);
          console.error('Error:', error);
        });
    }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setMessage('');
  };

  return (
 
    <form className={styles.modalForm}>
      <h3>Add Content</h3>
      <TextField
        label="Add content URL"
        value={link}
        onChange={(event) => setLink(event.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ '@media (max-width: 600px)': {
           width:'360px', marginInline:'auto'
          } }}
      />
      <Autocomplete
        options={keywords}
        getOptionLabel={(option) => option.key_word}
        value={selectedKeyword}
        sx={{ '@media (max-width: 600px)': {
            width:'360px', marginInline:'auto'
           } }}
        onChange={(event, newValue) => setSelectedKeyword(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select keyword"
            variant="outlined"
            margin="normal"
          />
          
        )}
      />
      <Button variant="contained"sx={{ 
    '@media (max-width: 600px)': {
      display: 'none',
    } 
  }}  color='success'onClick={handleSubmit} >+ Article</Button>
      <button className={styles.buttonFix} onClick={handleSubmit}type='submit'>+ ADD CONTENT</button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </form>
 
  );
};

export default ContentFormMobile;
