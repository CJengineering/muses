import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  useAnalyzer,
  useAppDispatch,
  useAppSelector,
  useUpdateArchive,
  useUpdateShortlist,
  useWebflow,
} from 'src/app/hooks';
import {
  createPresentationBulkAction,
  createPresentationPosts,
  createPresentationSelectedRows,
} from 'src/presentation/createPresentation';
import {
  ActionStatus,
  actionSelected,
} from 'src/features/actionState/actionStateSlice';
import { Button } from '@mui/material';
import { selectedPostFiltred } from 'src/features/posts/postsSlice';
import { filterStateChanged } from 'src/features/filterState/filterStateSlice';
import { clearSelectedRows } from 'src/features/rowSelection/rowSlice';
import { Post, RowNewProps } from 'src/app/interfaces';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ActionSelector() {
  function findArticleById(
    articles: RowNewProps[],
    idToFind: number
  ): Post | null {
    const foundArticle = articles.find((article) => article.id === idToFind);
    if (foundArticle) {
      return foundArticle as unknown as Post;
    } else {
      return null;
    }
  }
  const presentationData = useAppSelector(createPresentationPosts);
  const actionStatus = useAppSelector(createPresentationBulkAction);
  const dispatch = useAppDispatch();
  const presentationBulk = useAppSelector(createPresentationSelectedRows);
  const { updateArchive } = useUpdateArchive();
  const { updateShortlist } = useUpdateShortlist();
  const { handleAnalyser } = useAnalyzer();
  const { handleWebflow } = useWebflow();
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(actionSelected(event.target.value as ActionStatus));
  };
  const handleBulkArchive = async () => {
    presentationBulk.selectedRows.forEach(async (item) => {
      if (actionStatus.status == 'archive') {
        toast.success('Item is archiving');
        await updateArchive(item);
        
        dispatch(selectedPostFiltred(item));
      }
      if (actionStatus.status == 'shortlist') {
        toast.success('Item is shortlisting');
        await updateShortlist(item);
        dispatch(selectedPostFiltred(item));
      }
      if (actionStatus.status == 'analyse') {
        toast.success('Item is analysing');
        await handleAnalyser(item);
      }
      if (actionStatus.status == 'webflow') {
        const post = findArticleById(presentationData, item);
        if (post?.link !== null && post?.link !== undefined) {
          toast.success('Item sending to Webflow');
          await handleWebflow(post.link, item);
          dispatch(selectedPostFiltred(item));
        }
      }
    });
    //await dispatch<any>(fetchPosts(presentationTableStatus.status));

    dispatch(filterStateChanged(false));
    dispatch(clearSelectedRows());
  };
  return (
    <Box
      sx={{
        minWidth: 300,
        display: 'flex',
        columnGap: '2rem',
        alignItems: 'center',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Action</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={actionStatus.status}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'archive'}>Archive</MenuItem>
          <MenuItem value={'shortlist'}>Shortlist</MenuItem>
          <MenuItem value={'webflow'}>Webflow</MenuItem>
          <MenuItem value={'analyse'}>Analyse</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={handleBulkArchive}
        variant="contained"
        sx={{
          width: '100%',
          paddingLeft: '1rem',
          backgroundColor:
            actionStatus.status == 'archive'
              ? 'red'
              : actionStatus.status == 'shortlist'
              ? 'green'
              : 'blue',
        }}
      >
        {actionStatus.status}
      </Button>
     
    </Box>
  );
}
