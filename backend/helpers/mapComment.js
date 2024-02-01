const formatDate = require("./formatDate");

module.exports = (comment) => {
	return {
		content: comment.content,
		author: comment.author.login,
		id: comment._id,
		publishedAt: formatDate(comment.createdAt),
	};
};
