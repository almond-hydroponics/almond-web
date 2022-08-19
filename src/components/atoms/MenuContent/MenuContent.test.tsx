import { render } from '@testing-library/react';

import MenuContent from './index';

describe('MenuContent component', () => {
	it('should render correctly', () => {
		const { asFragment } = render(<MenuContent />);
		expect(asFragment()).toMatchSnapshot();
	});
});
