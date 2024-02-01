export const getRandomDate = () =>
	new Date(Math.random() * 1000000000000 + 19000000000000)
		.toISOString()
		.substring(0, 16)
		.replace('T', ' ');
