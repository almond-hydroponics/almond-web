import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const mock = [
	{
		href: '#',
		title: 'Blog',
		isActive: false,
	},
	{
		href: '#',
		title: 'Search Results',
		isActive: true,
	},
];

const Breadcrumb = (): JSX.Element => {
	return (
		<Box>
			<Breadcrumbs aria-label="breadcrumb">
				{mock.map((item, index) => (
					<span key={index}>
						{item.isActive ? (
							<Typography color="text.primary">{item.title}</Typography>
						) : (
							<Link
								href={item.href}
								sx={{
									fontWeight: 700,
									textDecoration: 'none',
								}}
							>
								{item.title}
							</Link>
						)}
					</span>
				))}
			</Breadcrumbs>
		</Box>
	);
};

export default Breadcrumb;
