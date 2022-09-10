import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type HtmlViewProps = {
	html: string;
};

const HtmlView = ({ html }: HtmlViewProps) => {
	const theme = useTheme();
	return (
		<Box
			component={'div'}
			color="text.secondary"
			fontSize={16}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
};

export default HtmlView;
