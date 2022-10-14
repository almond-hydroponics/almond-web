import { Link } from '@components/atoms';
import {
	Collapse,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { Toc } from 'types/Toc';

interface TOCInlineProps {
	toc: Toc;
	indentDepth?: number;
	fromHeading?: number;
	toHeading?: number;
	asDisclosure?: boolean;
	exclude?: string | string[];
}

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {TOCInlineProps} {
 *   toc,
 *   indentDepth = 3,
 *   fromHeading = 1,
 *   toHeading = 6,
 *   asDisclosure = false,
 *   exclude = '',
 * }
 *
 */
const TOCInline = ({
	toc,
	indentDepth = 3,
	fromHeading = 1,
	toHeading = 6,
	asDisclosure = false,
	exclude = '',
}: TOCInlineProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const handleClick = (): void => setOpen((prevState) => !prevState);

	const re = Array.isArray(exclude)
		? new RegExp('^(' + exclude.join('|') + ')$', 'i')
		: new RegExp('^(' + exclude + ')$', 'i');

	const filteredToc = toc.filter(
		(heading) =>
			heading.depth >= fromHeading &&
			heading.depth <= toHeading &&
			!re.test(heading.value)
	);

	const tocList = (
		<List dense>
			{filteredToc.map((heading) => (
				<ListItem divider key={heading.value}>
					<ListItemText
						primary={
							<Link noLinkStyle href={heading.url}>
								{heading.value}
							</Link>
						}
					/>
				</ListItem>
			))}
		</List>
	);

	const title: any = <Typography variant="h5">Table of Contents</Typography>;

	const renderTOC = toc.length >= 1;

	return (
		<>
			{asDisclosure && renderTOC ? (
				<>
					<Typography
						onClick={handleClick}
						variant="h5"
						fontWeight={500}
						sx={{ cursor: 'pointer' }}
					>
						Table of Contents
					</Typography>
					<Collapse in={open} timeout="auto" unmountOnExit title={title}>
						{tocList}
					</Collapse>
				</>
			) : (
				tocList
			)}
		</>
	);
};

export default TOCInline;
