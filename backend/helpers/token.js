const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

module.exports = {
	generate(data) {
		return jwt.sign(data, secretKey, { expiresIn: "30d" });
	},
	verify(token) {
		if (!token) {
			throw new Error("Invalid token");
		}
		return jwt.verify(token, secretKey);
	},
};
