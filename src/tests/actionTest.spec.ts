import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { createPresentationBulkAction } from 'src/presentation/createPresentation';
import { RootState, store } from '../app/store';
import { actionSelected } from 'src/features/actionState/actionStateSlice';


it('should show the bulk action on select', () => {
    const dispatch = store.dispatch;
  
    dispatch(actionSelected('archive'));
  
    const presentation = createPresentationBulkAction(store.getState());
    expect(presentation).toEqual({ status: 'archive' });
  });
  