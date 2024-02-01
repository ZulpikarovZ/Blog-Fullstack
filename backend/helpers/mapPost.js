const mongoose = require("mongoose");
const mapComment = require("./mapComment");
const formatDate = require("./formatDate");

module.exports = (post) => {
	return {
		id: post.id,
		title: post.title,
		imageUrl: post.image,
		content: post.content,
		comments: post.comments.map((comment) =>
			mongoose.isObjectIdOrHexString(comment)
				? comment
				: mapComment(comment)
		),
		publishedAt: formatDate(post.createdAt),
	};
};
