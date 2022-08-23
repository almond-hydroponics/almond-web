import { Link } from '@components/atoms';
import { Main } from '@layouts/index';
import { LocalGroceryStoreTwoTone } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'components/Container';

const CartView = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Main>
			<Box
				bgcolor={theme.palette.alternate.main}
				position={'relative'}
				minHeight={`calc(100vh - ${isMd ? '247px - 56px' : '300px - 63px'})`}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				height={'100%'}
			>
				<Container>
					<Typography variant="h4" align="center" fontWeight={500}>
						Your cart is empty!
					</Typography>
					<Box marginTop={4} display={'flex'} justifyContent="center">
						<Button
							component={Link}
							href={'/store'}
							variant="outlined"
							color="primary"
							size="large"
							endIcon={<LocalGroceryStoreTwoTone />}
						>
							Continue shopping
						</Button>
					</Box>
				</Container>
			</Box>
		</Main>
	);
};

export default CartView;
