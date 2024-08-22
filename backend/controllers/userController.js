import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import validator from "validator";

//login
const userLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credential" });
		}
		const token = jsonwebtoken.sign(
			{
				userId: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "2h" }
		);
		res.status(200).json({ message: "Login successfully", token });
	} catch (err) {
		res.status(500).json({ message: "Err logging in", err });
	}
};

// createUser
const createUser = async (req, res, next) => {
	try {
		const { email, password, phoneNumber } = req.body;

		if (!email || !validator.isEmail(email)) {
			return res.status(400).json({ message: "Invalid format" });
		}

		if (
			!password ||
			password.length < 8 ||
			!validator.isStrongPassword(password, { minNumbers: 1 })
		) {
			return res.status(400).json({
				message:
					"Password must be at least 8 characters long and contain at least one number",
			});
		}

		if (!phoneNumber || !validator.isMobilePhone(phoneNumber, "any")) {
			return res.status(400).json({ message: "Invalid phone number format" });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ email, password: hashPassword, phoneNumber });
		await newUser.save();
		res.status(201).json({ message: "User create successfully", newUser });
	} catch (err) {
		res.status(400).json({ message: "err create user", err });
	}
};

const forgotPassword = async (req, res, next) => {
	try {
		const gmail = req.body;
		const { oldPassword, newPassword } = req.body;
		const user = User.findOne(gmail);
		if (!user) {
			return res.status(404).json({ message: "Gmail is invalid" });
		}
		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Old password is incorrect" });
		}
		const hashPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashPassword;
		await user.save();
		res.status(200).json({ message: "Password changed successfully" });
	} catch (err) {
		res.status(400).json({ message: "err changing password", err });
	}
};

export default { userLogin, createUser, forgotPassword };
