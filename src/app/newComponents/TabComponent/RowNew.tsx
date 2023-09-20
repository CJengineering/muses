import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import styles from './tabComponent.module.css';

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
import { createPresentationSelectedRows } from 'src/presentation/createPresentation';
import { toggleSelectedRow } from 'src/features/rowSelection/rowSlice';

export default function RowNew({
  id,
  title,
  link,
  date,
  keyword,
  score,
  source,
}: RowNewProps) {
  const { updateArchive } = useUpdateArchive();

  const dispatch = useAppDispatch();
  const presentation = useAppSelector(createPresentationSelectedRows);
  const typeIcon: Record<IconType, JSX.Element> = {
    bing: <BingIcon />,
    google: <GoogleIcon />,
    google_alert: <BellIcon />,
    custom: <HeartIcon />,
  };
  const handleArchive = async (id: number)=>{
    await updateArchive(id)
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    dispatch(toggleSelectedRow(id));
  };

  return (
    <>
      <TableRow
        key={id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
            display: '-webkit-boxflex',
            alignItems: 'center',
          }}
        >
          <a href={link} className={styles.text_link}>
            {title}
          </a>
        </TableCell>
        <TableCell align="left">{typeIcon[source]}</TableCell>
        <TableCell align="left" sx={{ fontFamily: 'IBM Plex Mono' }}>
          {date.toLocaleDateString()}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: 'IBM Plex Mono' }}>
          {keyword}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: 'IBM Plex Mono' }}>
          {score}
        </TableCell>
        <TableCell>
          <div className={styles.actions_container}>
           
            <ThumbUpIcon id={id} />
            <WebflowIcon link={link}/>
            <ArchiveIcon id={id}/>
            <ChatGptIcon id={id}/>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}