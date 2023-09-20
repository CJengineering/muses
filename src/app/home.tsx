import React from 'react';
import { useAuthentication } from './useAuthetication';
import { Box, Button, Modal, Typography } from '@mui/material';
import CreateKeywordForm from './createKeywordForm';
import Dashboard from './dashboard/dashboard';
import InternArticleForm from './InternArticleForm';
import styles  from './app.module.css'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Home() {
  useAuthentication();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenArticle, setIsModalOpenArticle] = React.useState(false);
  const [data, setData] = React.useState([]);
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleOpenArticle = () => {
    setIsModalOpenArticle(true);
  };

  const handleCloseArticle = () => {
    setIsModalOpenArticle(false);
  };

  return (
    <>
    <h1>Dashboard</h1>
      <div className={styles.formContainer}>
        <CreateKeywordForm />
        <div className="padding_vertical_small"></div>
        <div className="padding_vertical_small"></div>
        <InternArticleForm />
      </div>
    </>
  );
}
