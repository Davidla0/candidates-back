const { registerUser, generateToken, findUser } = require('./auth.service');
const bcrypt = require('bcryptjs');

async function signup(req, res) {
    try {
        // add middleware to check they are exist
        const { username, email, password } = req.body;
        const userId = await registerUser(username, email, password);
        const token = await generateToken(userId);
        res.cookie('token', token)
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Error registering user' });
    }
}

async function signin(req, res) {
    try {
        // add middleware to check they are exist
        let { username, password } = req.body
        user = await findUser(username, 'username')
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) {
            return res.status(401).json({ success: false, msg: 'Invalid credentials' });
        }
        const token = await generateToken(user.id);
        res.cookie('token', token)
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Error authenticating user' });
    }
}

module.exports = {
    signup,
    signin
}