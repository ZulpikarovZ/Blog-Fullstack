module.exports = formatDate = (date) =>
	date.toISOString().substring(0, 16).replace("T", " ");
