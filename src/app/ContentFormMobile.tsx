import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import CloseIcon from '@mui/icons-material/Close';
import {
  TextField,
  Autocomplete,
  Typography,
  Button,
  Snackbar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { createPresentationMobileOpenStatus } from 'src/presentation/createPresentation';
import { modalMobileOpend } from 'src/features/modalMobileOpen/modalMobileOpen';

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
  const [position, setPosition] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([]); // Explicitly type the keywords state
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null); // Explicitly type the selectedKeyword state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const isMobileModalOpen = useAppSelector(createPresentationMobileOpenStatus);
  const dispatch = useAppDispatch();
  // Fetch keywords from the API endpoint
  useEffect(() => {
    fetch('https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/keyword_list')
      .then((response) => response.json())
      .then((data) => setKeywords(data))
      .catch((error) => console.error(error));
  }, []);
  const handleFocus = () => {
    setKeyboardVisible(true);
  };

  const handleBlur = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    if (keyboardVisible) {
      setPosition(true);
    } else {
      setPosition(false);
    }
  }, [keyboardVisible]);

  const handleSubmit = () => {
    if (selectedKeyword && link) {
      const endpoint = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/articleintern?id=${
        selectedKeyword.id
      }&link=${encodeURIComponent(link)}`;

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
  const handleTogleModal = () => {
    dispatch(modalMobileOpend(!isMobileModalOpen.status));
  };
  return (
    <form
      className={styles.modalForm}
      style={{ display: isMobileModalOpen.status ? 'none' : 'flex' }}
    >
      <div className={styles.mobileTitleContainer}>
        <h2>Add Content</h2>
        <CloseIcon onClick={handleTogleModal} />
      </div>
      <div className={styles.modalAbsolutContainer}>
        <TextField
          label="Add content URL"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          fullWidth
          margin="normal"
          onFocus={handleFocus}
          onBlur={handleBlur}
          variant="outlined"
          sx={{
            '@media (max-width: 600px)': {
              width: '360px',
            },
          }}
        />
        <Autocomplete
          options={keywords}
          getOptionLabel={(option) => option.key_word}
          value={selectedKeyword}
          sx={{
            '@media (max-width: 600px)': {
              width: '360px',

              marginBottom: '1rem',
            },
          }}
          onChange={(event, newValue) => setSelectedKeyword(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select keyword"
              variant="outlined"
              margin="normal"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
        />
        <Button
          variant="contained"
          sx={{
            '@media (max-width: 600px)': {
              display: 'none',
            },
          }}
          color="success"
          onClick={handleSubmit}
        >
          + Article
        </Button>
        <button
          className={styles.buttonFix}
          style={{ position: position ? 'relative' : 'fixed' }}
          onClick={handleSubmit}
          type="submit"
        >
          + ADD CONTENT
        </button>
      </div>

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
