import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  Box,
} from '@mui/material';
import styles from './app.module.css';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  modalMobileForKeywordOpend,
  modalMobileOpend,
} from 'src/features/modalMobileOpen/modalMobileOpen';
import { createPresentationMobileOpenStatus } from 'src/presentation/createPresentation';
import CloseIcon from '@mui/icons-material/Close';

function KeywordFormMobile() {
  const [keyword, setKeyword] = useState<string>('');
  const [rssFeed, setRssFeed] = useState<string>('');
  const [isFactiva, setIsFactiva] = useState<boolean>(false);
  const [isCombined, setIsCombined] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [position, setPosition] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const dispatch = useAppDispatch();
  const isMobileModalOpen = useAppSelector(createPresentationMobileOpenStatus);
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
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key_word: {
              key_word: keyword,
              rss_url: rssFeed,
              factiva: isFactiva,
              combined: isCombined,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Set success message
        setSuccessMessage('Your Keyword is validated');
        setKeyword('');
        setRssFeed('');
        setIsFactiva(false);
        setIsCombined(false);
      } else {
        throw new Error('Failed to submit keyword');
      }
    } catch (error) {
      // Set error message
      setErrorMessage('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleChangeRssFeed = (event: ChangeEvent<HTMLInputElement>) => {
    setRssFeed(event.target.value);
  };

  const handleToggleFactiva = () => {
    setIsFactiva((prevIsFactiva) => !prevIsFactiva);
  };
  const handleToggleCombined = () => {
    setIsCombined((prevIsCombined) => !prevIsCombined);
  };
  const togleMobileModal = () => {
    dispatch(modalMobileForKeywordOpend(!isMobileModalOpen.statusKeyword));
  };
  return (
    <form
      className={styles.modalForm}
      style={{ display: isMobileModalOpen.statusKeyword ? 'none' : 'flex' }}
    >
      <div className={styles.mobileTitleContainer}>
        <h2>Add keyword</h2>
        <CloseIcon onClick={togleMobileModal} />
      </div>
      <div className={styles.modalAbsolutContainer}>
        <TextField
          label="Keyword"
          variant="outlined"
          value={keyword}
          onChange={handleChangeKeyword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          sx={{
            '@media (max-width: 600px)': {
              width: '360px',
              marginInline: 'auto',
            },
          }}
        />
        <TextField
          label="RSS Feed"
          variant="outlined"
          value={rssFeed}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeRssFeed}
          fullWidth
          margin="normal"
          sx={{
            '@media (max-width: 600px)': {
              width: '360px',
              marginInline: 'auto',
            },
          }}
        />

        <div className={styles.switchContainerMobile}>
          <div>Combined</div>
          <Switch checked={isCombined} onChange={handleToggleCombined} />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            marginTop: '2rem',
            '@media (max-width: 600px)': {
              display: 'none',
            },
          }}
        >
          + Keyword
        </Button>
        <button
          className={styles.buttonFixBlue}
          style={{ position: position ? 'relative' : 'fixed' }}
          type="submit"
          onClick={handleSubmit}
        >
          + KEYWORD
        </button>
      </div>

      {successMessage && <h3>{successMessage}</h3>}
      {errorMessage && <h3>{errorMessage}</h3>}
    </form>
  );
}
export default KeywordFormMobile;
