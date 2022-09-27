import { Link } from '@components/atoms';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button } from '@mui/material';

type PaginationProps = {
	totalPages: number;
	currentPage: number;
	type?: 'posts';
};

export function Pagination({
	totalPages,
	currentPage,
	type = 'posts',
}: PaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	const prevPage = currentPage - 1 > 0;
	const nextPage = currentPage + 1 <= totalPages;

	return (
		<div className="flex justify-center gap-4 mt-12">
			<Button
				component={Link}
				disabled={!prevPage}
				href={
					currentPage - 1 === 1
						? `/${type}/`
						: `/${type}/page/${currentPage - 1}`
				}
				variant="text"
			>
				<span className="mr-1">
					<ChevronLeft />
				</span>
				Newer posts
			</Button>
			<Button
				component={Link}
				disabled={!nextPage}
				href={`/${type}/page/${currentPage + 1}`}
				variant="text"
			>
				Older posts{' '}
				<span className="ml-1">
					<ChevronRight />
				</span>
			</Button>
		</div>
	);
}
