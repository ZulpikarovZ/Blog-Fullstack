const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/roles");

const register = async (login, password) => {
	if (!password) {
		throw new Error("Password is empty");
	}

	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({
		login: login,
		password: passwordHash,
	});

	const token = generate({ id: user.id });

	return { user, token };
};

const login = async (login, password) => {
	const user = await User.findOne({ login });

	if (!user) {
		throw new Error("User not found");
	}

	const isPasswordMatch = bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error("Wrong password");
	}

	const token = generate({ id: user.id });

	return { user, token };
};

const getUsers = async () => await User.find();

const getRoles = () => [
	{ id: ROLES.ADMIN, name: "Admin" },
	{ id: ROLES.MODER, name: "Moder" },
	{ id: ROLES.USER, name: "User" },
];

const updateUser = async (id, userData) =>
	await User.findByIdAndUpdate(id, userData, { returnDocument: "after" });

const deleteUser = async (id) => await User.deleteOne({ _id: id });

module.exports = {
	register,
	login,
	getUsers,
	getRoles,
	deleteUser,
	updateUser,
};
