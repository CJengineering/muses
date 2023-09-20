import { store } from 'src/app/store';
import {
  dateEndAttributesSelected,
  dateStartAttributesSelected,
  keywordRemoved,
  keywordsAttributesSelected,
  scoreAttributesSelected,
  sourceAttributedRemoved,
  sourceAttributedToggled,
} from 'src/features/searchAttributes/searchAttributesSlice';
import { createPresentationSearchAttributes } from 'src/presentation/createPresentation';
it('should return search attributes ', () => {
  const dispatch = store.dispatch;

  dispatch(sourceAttributedToggled(['bing']));
  dispatch(keywordsAttributesSelected('Community Jameel'));
  dispatch(dateStartAttributesSelected('12/08/2023'));
  dispatch(keywordRemoved('Community Jameel'));
  dispatch(dateEndAttributesSelected('09/09/2022'));
  dispatch(scoreAttributesSelected([12, 13]));

  const presentation = createPresentationSearchAttributes(store.getState());

  expect(presentation.searchAttributes).toEqual({
    source: ['bing'],
    dateStart: new Date('12/08/2023'),
    dateEnd: new Date('09/09/2022'),
    keywords: [],
    score: [12, 13],
  });
});

it('should inselct bing when bing is selected  ', () => {
  const dispatch = store.dispatch;

  dispatch(sourceAttributedToggled(['bing']));
  dispatch(sourceAttributedToggled(['bing']));

  const presentation = createPresentationSearchAttributes(store.getState());

  expect(presentation.searchAttributes.source).toEqual([]);
});
