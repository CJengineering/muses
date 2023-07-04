import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Switch, FormControlLabel } from '@mui/material';

function CreateKeywordForm() {
  const [keyword, setKeyword] = useState<string>('');
  const [rssFeed, setRssFeed] = useState<string>('');
  const [isFactiva, setIsFactiva] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Make API call to submit the keyword https://new-alerts-e4f6j5kdsq-ew.a.run.app
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
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Set success message
        setSuccessMessage('Your Keyword is validated');
        setKeyword("");
        setRssFeed("");
        setIsFactiva(false);
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

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a new Keyword</h3>
      <TextField
        label="Keyword"
        variant="outlined"
        value={keyword}
        onChange={handleChangeKeyword}
        fullWidth
        margin="normal"
      />
      <TextField
        label="RSS Feed"
        variant="outlined"
        value={rssFeed}
        onChange={handleChangeRssFeed}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={<Switch checked={isFactiva} onChange={handleToggleFactiva} />}
        label="Factiva"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      {successMessage && <h1>{successMessage}</h1>}
      {errorMessage && <h1>{errorMessage}</h1>}
    </form>
  );
}

export default CreateKeywordForm;
