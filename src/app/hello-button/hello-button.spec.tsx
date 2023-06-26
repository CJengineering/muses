import { render } from '@testing-library/react';

import HelloButton from './hello-button';

describe('HelloButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HelloButton />);
    expect(baseElement).toBeTruthy();
  });
});
