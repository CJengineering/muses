import React from 'react';
import { useAuthentication } from './useAuthetication';
import { Box, Button, Modal, Typography } from '@mui/material';
import CreateKeywordForm from './createKeywordForm';
import Dashboard from './dashboard/dashboard';
import InternArticleForm from './InternArticleForm';
import styles from './app.module.css';
import MobileButtonBig from './newComponents/Mobile Compenents/mobileButtonBig';
import AddItemIcon from './newComponents/Icons/AddItemIcon';
import AddLabelIcon from './newComponents/Icons/AddLabelIcon';
import ContentFormMobile from './ContentFormMobile';
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
      <div className="mobileViewHomeWrapper">
        <h1>Dashboard</h1>
        <div className={styles.mobileViewHomeWrapperButtons} >
          <MobileButtonBig
            onClick={() => console.log('hello')}
            color="green"
            text="ADD CONTENT"
            iconComponent={AddItemIcon}
          />
           <MobileButtonBig
            onClick={() => console.log('hello')}
            color="blue"
            text="ADD KEYWORD"
            iconComponent={AddLabelIcon}
          />
        </div>
   
         <ContentFormMobile/>
      
       
      </div>
      <div className="main-page-wrapper">
        <div className={styles.main_page_nav_container}>
          <h1>Dashboard</h1>
        </div>
        <div className={styles.formContainer}>
          <CreateKeywordForm />

          <InternArticleForm />
        </div>
      </div>
    </>
  );
}
