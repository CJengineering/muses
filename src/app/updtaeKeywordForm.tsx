import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
  Modal,
  Box,
  Typography,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UpdateKeywordFormProps {
  keywordId: number;
  keywordName: string;
  rss: string;
  factiva: boolean;
  combined: boolean
}

function UpdateKeywordForm({
  keywordId,
  keywordName,
  rss,
  combined,
  factiva,
}: UpdateKeywordFormProps) {
  const [keyword, setKeyword] = useState<string>(keywordName);
  const [rssFeed, setRssFeed] = useState<string>(rss);
  const [isFactiva, setIsFactiva] = useState<boolean>(factiva);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [isCombined, setIsCombined] = useState<boolean>(combined);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words/${keywordId}`,
        {
          method: 'PUT',
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

        setSuccessMessage('Keyword updated successfully');
      } else {
        throw new Error('Failed to update keyword');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words/${keywordId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setSuccessMessage('Keyword deleted successfully');
        handleClose();
        window.location.reload();
      } else {
        throw new Error('Failed to delete keyword');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
      console.error(error);
      window.location.reload();
    }
  };

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('Keyword change event:', event.target.value);
    setKeyword(event.target.value);
  };

  const handleChangeRssFeed = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('RSS feed change event:', event.target.value);
    setRssFeed(event.target.value);
  };

  const handleToggleFactiva = () => {
    setIsFactiva((prevIsFactiva) => !prevIsFactiva);
  };
  const handleToggleCombined = () => {
    setIsCombined((prevIsCombined => !prevIsCombined));
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Keyword {keywordName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
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
                control={
                  <Switch checked={isFactiva} onChange={handleToggleFactiva} />
                }
                label="Factiva"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={isCombined}
                    onChange={handleToggleCombined}
                  />
                }
                label="Combined"
              />
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </form>
          </Typography>
          <IconButton onClick={handleClose}></IconButton>
        </Box>
      </Modal>
    </>
  );
}

export default UpdateKeywordForm;
