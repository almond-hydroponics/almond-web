export default function generateArray<T>(
	length: number,
	generator: () => T
): T[] {
	return Array.from({ length }, generator);
}
