import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	const device = await prisma.device.create({
		data: {
			name: '0013A499',
			verified: false,
			active: false,
		},
	});
	// eslint-disable-next-line no-console
	console.log({ device });
	// eslint-disable-next-line no-console
	console.log(`Database has been seeded. 🌱`);
};

main()
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
