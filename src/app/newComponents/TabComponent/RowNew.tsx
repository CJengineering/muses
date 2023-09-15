import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import styles from './tabComponent.module.css';
import IconSource from './IconSource';
import GoogleIcon from '../Icons/GoogleIcon';
import WebflowIcon from '../Icons/WebflowIcon';
import ThumbUpIcon from '../Icons/ThumbUpIcon';
import ArchiveIcon from '../Icons/ArchiveIcon';
import ChatGptIcon from '../Icons/ChatGptIcon';
export default function RowNew() {
  return (
    <TableRow
      key={1}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      className={styles.tableRow}
    >
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{
          fontFamily: 'IBM Plex Mono',
          height: '3rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
        }}
      >
        <a href="#" className={styles.text_link}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          iure repellendus numquam quasi ipsa magnam, ratione quisquam,
          recusandae assumenda maxime quam mollitia alias provident ab sit quod!
          Nobis, ipsa aspernatur.
        </a>
      </TableCell>
      <TableCell align="left">
        <IconSource url="src/assets/ICONS/google_icon.svg" />
      </TableCell>
      <TableCell align="left" sx={{ fontFamily: 'IBM Plex Mono' }}>
        12/03/23
      </TableCell>
      <TableCell align="left" sx={{ fontFamily: 'IBM Plex Mono' }}>
        Cynthia Breazeal
      </TableCell>
      <TableCell align="left" sx={{ fontFamily: 'IBM Plex Mono' }}>
        15
      </TableCell>
      <TableCell>
        <div className={styles.actions_container}>
          <ThumbUpIcon />
          <WebflowIcon />
          <ArchiveIcon />
          <ChatGptIcon />
        </div>
      </TableCell>
    </TableRow>
  );
}
