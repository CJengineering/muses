import React from 'react';
import { useAuthentication } from './useAuthetication';
import { Box, Button, Modal, Typography } from '@mui/material';
import CreateKeywordForm from './createKeywordForm';
import Dashboard from './dashboard/dashboard';
import InternArticleForm from './InternArticleForm';
import styles from './app.module.css';
import AddItemIcon from './newComponents/Icons/AddItemIcon';
import AddLabelIcon from './newComponents/Icons/AddLabelIcon';
import ContentFormMobile from './ContentFormMobile';
import MobileButtonBig from './newComponents/MobileComponents/MobileButtonBig';
import { useAppDispatch, useAppSelector } from './hooks';
import { createPresentationMobileOpenStatus } from 'src/presentation/createPresentation';
import {
  modalMobileForKeywordOpend,
  modalMobileOpend,
} from 'src/features/modalMobileOpen/modalMobileOpen';
import KeywordFormMobile from './KeywordFormMobile';
import LatestLIst from './newComponents/MobileComponents/LatestLIst';
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
  const dispatch = useAppDispatch();
  const isMobileModalOpen = useAppSelector(createPresentationMobileOpenStatus);

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
  const togleMobileModal = () => {
    dispatch(modalMobileOpend(!isMobileModalOpen.status));
  };
  const togleMobileModalKeyword = () => {
    dispatch(modalMobileForKeywordOpend(!isMobileModalOpen.statusKeyword));
  };
  return (
    <>
        <ContentFormMobile />
        <KeywordFormMobile />
      <div className={styles.mobileViewHomeWrapper}>
       <div className={styles.mainTitle}> Welcome, @User!</div>
       <div className={styles.divider24}></div>
        <div className={styles.mobileViewHomeWrapperButtons}>
          <MobileButtonBig
            onClick={togleMobileModal}
            color="green"
            text="ADD CONTENT"
            iconComponent={AddItemIcon}
          />
          <MobileButtonBig
            onClick={togleMobileModalKeyword}
            color="blue"
            text="ADD KEYWORD"
            iconComponent={AddLabelIcon}
          />
        </div>


      
         <div className={styles.divider24}></div>
        <div className={styles.latestWrapper}>
          <div style={{fontWeight: 'bold'}}>Latest articles</div>
          <div className={styles.latestContainer}>
            <LatestLIst />
          </div>
        </div>
      </div>
      <div className="main-page-wrapper">
        <div className={styles.main_page_nav_container}>
          <h1>Dashboard</h1>
        </div>
        <div className={styles.formContainer}>

          <InternArticleForm />
          <CreateKeywordForm />
        </div>
      </div>
    </>
  );
}
