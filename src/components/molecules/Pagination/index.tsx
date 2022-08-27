import { Link } from '@components/atoms';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

type PaginationProps = {
	itemCount: number;
	itemsPerPage: number;
	currentPageNumber: number;
};

export function getQueryPaginationInput(
	itemsPerPage: number,
	currentPageNumber: number
) {
	return {
		take: itemsPerPage,
		skip:
			currentPageNumber === 1
				? undefined
				: itemsPerPage * (currentPageNumber - 1),
	};
}

export function Pagination({
	itemCount,
	itemsPerPage,
	currentPageNumber,
}: PaginationProps) {
	const router = useRouter();

	const totalPages = Math.ceil(itemCount / itemsPerPage);

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex justify-center gap-4 mt-12">
			<Button
				component={Link}
				// @ts-expect-error
				href={{
					pathname: router.pathname,
					query: { ...router.query, page: currentPageNumber - 1 },
				}}
				variant="text"
				className={
					currentPageNumber === 1 ? 'pointer-events-none opacity-50' : ''
				}
			>
				<span className="mr-1">
					<ChevronLeft />
				</span>
				Newer posts
			</Button>
			<Button
				component={Link}
				// @ts-expect-error
				href={{
					pathname: router.pathname,
					query: { ...router.query, page: currentPageNumber + 1 },
				}}
				variant="text"
				className={
					currentPageNumber === totalPages
						? 'pointer-events-none opacity-50'
						: ''
				}
			>
				Older posts{' '}
				<span className="ml-1">
					<ChevronRight />
				</span>
			</Button>
		</div>
	);
}
