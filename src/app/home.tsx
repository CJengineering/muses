import React from 'react';
import { useAuthentication } from './useAuthetication';
import { Box, Button, Modal, Typography } from '@mui/material';
import CreateKeywordForm from './createKeywordForm';
import Dashboard from './dashboard/dashboard';
import InternArticleForm from './InternArticleForm';

export default function Home() {
  useAuthentication();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpenArticle, setIsModalOpenArticle] = React.useState(false);

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
      <div style={{ marginInline: 'auto' }}>
        <div
          style={{
            marginInline: 'auto',
            backgroundColor: '#f5f5f5',
            padding: '5rem 10rem',
            textAlign: 'center',
            marginTop: '2rem',
            width: '10rem',
          }}
        >
          <div style={{ backgroundColor: '#001240' }}>
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                '<svg width="93" height="48" viewBox="0 0 93 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M58.0993 37.3332C55.6768 37.3332 53.6913 36.8103 52.1429 35.7645C50.5945 34.7188 49.658 33.2249 49.3333 31.2828L53.6788 30.1623C53.8536 31.0338 54.1408 31.7185 54.5404 32.2165C54.965 32.7144 55.477 33.0755 56.0763 33.2996C56.7007 33.4987 57.375 33.5983 58.0993 33.5983C59.1981 33.5983 60.0098 33.4116 60.5342 33.0381C61.0587 32.6397 61.3209 32.1542 61.3209 31.5815C61.3209 31.0089 61.0712 30.5731 60.5717 30.2743C60.0722 29.9507 59.273 29.6892 58.1742 29.49L57.1253 29.3033C55.8266 29.0543 54.6403 28.7182 53.5664 28.2949C52.4925 27.8467 51.6309 27.2367 50.9816 26.4648C50.3323 25.693 50.0076 24.697 50.0076 23.477C50.0076 21.6344 50.6819 20.2277 52.0305 19.2566C53.3791 18.2607 55.1523 17.7627 57.35 17.7627C59.4229 17.7627 61.1461 18.2233 62.5197 19.1446C63.8933 20.0658 64.7923 21.2734 65.2169 22.7673L60.8339 24.1119C60.6341 23.1657 60.2221 22.4935 59.5977 22.0951C58.9983 21.6967 58.2491 21.4975 57.35 21.4975C56.451 21.4975 55.7642 21.6593 55.2897 21.983C54.8151 22.2818 54.5779 22.7051 54.5779 23.2529C54.5779 23.8504 54.8276 24.2986 55.3271 24.5974C55.8266 24.8713 56.5009 25.0829 57.35 25.2323L58.3989 25.4191C59.7975 25.6681 61.0587 26.0042 62.1825 26.4275C63.3313 26.8259 64.2304 27.411 64.8797 28.1828C65.554 28.9298 65.8912 29.9507 65.8912 31.2454C65.8912 33.1875 65.1794 34.6939 63.7559 35.7645C62.3574 36.8103 60.4718 37.3332 58.0993 37.3332Z" fill="white"/><path d="M78.4937 37.3332C76.6456 37.3332 75.0098 36.9472 73.5863 36.1754C72.1877 35.3786 71.0889 34.2706 70.2897 32.8514C69.5155 31.4072 69.1284 29.7141 69.1284 27.772V27.3238C69.1284 25.3817 69.5155 23.7011 70.2897 22.2818C71.0639 20.8377 72.1503 19.7297 73.5488 18.9578C74.9474 18.1611 76.5707 17.7627 78.4188 17.7627C80.2419 17.7627 81.8278 18.1735 83.1764 18.9952C84.525 19.7919 85.5739 20.9124 86.3231 22.3565C87.0723 23.7757 87.4469 25.4315 87.4469 27.3238V28.9298H73.9234C73.9734 30.1997 74.4479 31.233 75.347 32.0297C76.246 32.8265 77.3449 33.2249 78.6435 33.2249C79.9672 33.2249 80.9412 32.9385 81.5655 32.3659C82.1899 31.7932 82.6644 31.1583 82.989 30.4611L86.8476 32.4779C86.4979 33.1253 85.986 33.8349 85.3117 34.6067C84.6623 35.3537 83.7882 36.0011 82.6894 36.5489C81.5905 37.0717 80.1919 37.3332 78.4937 37.3332ZM73.9609 25.4191H82.6519C82.552 24.3484 82.115 23.4894 81.3408 22.842C80.5915 22.1947 79.6051 21.871 78.3813 21.871C77.1076 21.871 76.0962 22.1947 75.347 22.842C74.5977 23.4894 74.1357 24.3484 73.9609 25.4191Z" fill="white"/><path d="M5.33331 36.8103V10.6665H14.5113L19.0441 33.4489H19.7184L24.2837 10.6665H33.4617L33.4173 12.8456L33.4053 18.2856V28.9672C33.4053 30.3615 33.7425 31.4072 34.4168 32.1044C35.1161 32.8016 36.1026 33.1502 37.3762 33.1502C38.8247 33.1502 39.9486 32.6771 40.7478 31.7309C41.5469 30.7599 41.9465 29.4153 41.9465 27.6973V18.2856H46.6666V36.8103H42.0214V34.3827H41.3471C41.0475 35.0051 40.4855 35.6152 39.6614 36.2127C38.8372 36.8103 37.5885 37.1838 35.9153 37.1838C34.4668 37.1838 33.1931 36.8601 32.0942 36.2127C31.0203 35.5405 30.1837 34.5445 29.5843 33.3743C28.9849 32.204 28.6852 30.8595 28.6852 29.3406L28.6666 14.2893H27.9923L23.4646 36.8103H15.298L10.8027 14.2893H10.1284V36.8103H5.33331Z" fill="white"/></svg>'
              )}`}
              alt="Logo"
            />
          </div>
          <div className="padding_vertical_small"></div>
          <Button variant="contained" onClick={handleOpen}>
            Add Keyword
          </Button>
          <div className="padding_vertical_small"></div>
          <Button variant="contained" onClick={handleOpenArticle} sx={{backgroundColor: 'green'}}>
            Add Article
          </Button>

          <Modal open={isModalOpenArticle} onClose={handleCloseArticle}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '55%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <InternArticleForm/>
              <Button onClick={handleCloseArticle}>Close</Button>
            </Box>
          </Modal>
          <Modal open={isModalOpen} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '55%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <CreateKeywordForm />
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Modal>
        </div>
        <Dashboard />
      </div>
    </>
  );
}
