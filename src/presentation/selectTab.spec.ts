import { selectedTableValue } from 'src/features/table/tableSlice';
import { createPresentation } from './createPresentation';

import { store } from '../app/store';

it('should select table with the selected value of the tab', () => {
  const dispatch = store.dispatch;
  dispatch(selectedTableValue('published'));
  const presentation = createPresentation(store.getState());
  expect(presentation).toEqual({ status: 'published' });
});
