import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username == '' || email == '' || password == '') {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const user = await User.create({ username, email, password: hashedPassword });
        user.save();
        return res.status(201).json({ message: 'User created successfully', data: user }); ƒ
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};