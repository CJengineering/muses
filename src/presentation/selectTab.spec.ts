import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {createPresentation} from './createPresentation'
import {
  TableState,
  initialState,

  selectedTableValue
} from 'src/features/table/tableSlice';
import tableReducer from 'src/features/table/tableSlice';

import { RootState, store } from '../app/store';


it('should select table with the selected value of the tab', () => {
    const dispatch = store.dispatch;
  
    dispatch(selectedTableValue('published'));
  
    const presentation = createPresentation(store.getState());
    expect(presentation).toEqual({ status: 'published' });
  });
  