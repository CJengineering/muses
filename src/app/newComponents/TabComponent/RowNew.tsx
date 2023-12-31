import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import styles from './tabComponent.module.css';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '../Icons/GoogleIcon';
import WebflowIcon from '../Icons/WebflowIcon';
import ThumbUpIcon from '../Icons/ThumbUpIcon';
import ArchiveIcon from '../Icons/ArchiveIcon';
import ChatGptIcon from '../Icons/ChatGptIcon';
import BingIcon from '../Icons/BingIcon';
import BellIcon from '../Icons/BellIcon';
import HeartIcon from '../Icons/HeartIcon';
import { IconType, RowNewProps } from 'src/app/interfaces';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  useAppDispatch,
  useAppSelector,
  useUpdateArchive,
  useUpdateShortlist,
} from 'src/app/hooks';
import {
  createPresentationNewTab,
  createPresentationSelectedRows,
} from 'src/presentation/createPresentation';
import { toggleSelectedRow } from 'src/features/rowSelection/rowSlice';
import BingImage from '../Icons/BingNewIcon';
import BingNewIcon from '../Icons/BingNewIcon';
import SlackIcon from '../Icons/SlackIcon';
import NewTab from '../Icons/NewTab';
import Modal from '@mui/material/Modal';
import ArticleInfo from '../ArticleInfoModal/ArticleInfo';

export default function RowNew({
  id,
  title,
  link,
  date,
  keyword,
  score,
  source,
  comments
}: RowNewProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because JavaScript months start from 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const { updateArchive } = useUpdateArchive();
  const stateOfContent = useAppSelector(createPresentationNewTab);
  const dispatch = useAppDispatch();
  const presentation = useAppSelector(createPresentationSelectedRows);
  const typeIcon: Record<IconType, JSX.Element> = {
    bing: <BingNewIcon />,
    google: <GoogleIcon />,
    google_alert: <BellIcon />,
    custom: <HeartIcon />,
  };

  const handleArchive = async (id: number) => {
    await updateArchive(id);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    dispatch(toggleSelectedRow(id));
  };
console.log('this is a comment',comments)
  return (
    <>
      <TableRow
        key={id}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          backgroundColor: presentation.selectedRows.includes(id)
            ? '#FCF9FF'
            : '',
        }}
        className={styles.tableRow}
      >
        <TableCell>
          <Checkbox
            checked={presentation.selectedRows.includes(id)}
            onChange={(event) => handleCheckboxChange(event, id)}
          />
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{
            fontFamily: 'IBM Plex Mono',
            height: '3rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

            alignItems: 'center',
          }}
        >
          {' '}
          <div style={{ display: 'flex' }}>
            <div style={{ cursor: 'pointer', color: comments.length > 0 ? 'green' : 'black' }} onClick={handleOpen}>
              {title}
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
              <Box
                sx={{
                  
                  position: 'absolute' as 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'white',

                  p: 4,
                }}
              > 
              <div style={{display:'flex', justifyContent:'flex-end'}}>

                <CloseIcon  sx={{cursor:'pointer'}} onClick={()=>setOpen(false)}/>
              </div>
                <ArticleInfo id={id} />{' '}
              </Box>
            </Modal>
            <a
              href={link}
              target="_blank"
              style={{}}
              className={styles.text_link}
            >
              <NewTab />
            </a>
          </div>
        </TableCell>
        <TableCell align="left" sx={{}}>
          {typeIcon[source]}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: 'IBM Plex Mono' }}>
          {formatDate(date)}
        </TableCell>
        <TableCell
          align="left"
          sx={{
            fontFamily: 'IBM Plex Mono',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <div
            style={{
              maxHeight: '3rem',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {keyword}
          </div>
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: 'IBM Plex Mono' }}>
          {score}
        </TableCell>
        <TableCell>
          <div className={styles.actions_container}>
            {stateOfContent.status === 'shortlist' ? null : (
              <ThumbUpIcon id={id} />
            )}
            {stateOfContent.status === 'archived' ? null : (
              <ArchiveIcon id={id} />
            )}
            <WebflowIcon link={link} id={id} />

            <ChatGptIcon id={id} />
            <SlackIcon keyword={keyword} link={link} />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
