import { Typography } from '@mui/material';
import { ReactElement } from 'react';

export default function Draft(): ReactElement {
	return (
		<div className="mt-24 text-center">
			<Typography variant="h3">
				Under Construction{' '}
				<span role="img" aria-label="roadwork sign">
					🚧
				</span>
			</Typography>
		</div>
	);
}
