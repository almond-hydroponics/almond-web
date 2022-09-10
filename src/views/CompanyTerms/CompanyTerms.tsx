import { Main } from '@layouts/index';
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Container from 'components/Container';

import { ContactCard, Content } from './components';

const CompanyTerms = (): JSX.Element => {
	const theme = useTheme();

	return (
		<Main>
			<Container>
				<Box
					borderRadius={2}
					boxShadow={0}
					border={`1px solid ${theme.palette.divider}`}
				>
					<Box bgcolor={theme.palette.primary.main} borderRadius={2}>
						<Container paddingX={{ xs: 2, sm: 4 }} marginBottom={2}>
							<Typography
								variant={'h4'}
								gutterBottom
								sx={{
									fontWeight: 700,
									color: theme.palette.common.white,
								}}
							>
								Company Terms & Privacy Policy
							</Typography>
							<Typography
								gutterBottom
								sx={{
									color: theme.palette.common.white,
								}}
							>
								Last modified on <strong>23 Aug, 2021</strong>
							</Typography>
						</Container>
					</Box>
					<Container
						paddingTop={'0 !important'}
						paddingX={{ xs: 2, sm: 4 }}
						position={'relative'}
						top={0}
					>
						<Box
							component={Grid}
							container
							spacing={4}
							flexDirection={{ xs: 'column-reverse', md: 'row' }}
						>
							<Grid item xs={12} md={9}>
								<Content />
							</Grid>
							<Grid item xs={12} md={3}>
								<Box
									position={'sticky'}
									top={theme.spacing(10)}
									className={'sticky'}
								>
									<ContactCard />
								</Box>
							</Grid>
						</Box>
					</Container>
				</Box>
			</Container>
		</Main>
	);
};

export default CompanyTerms;
