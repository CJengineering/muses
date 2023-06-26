import { render } from '@testing-library/react';

import BasicTable from './basictable';

describe('Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BasicTable />);
    expect(baseElement).toBeTruthy();
  });
});
