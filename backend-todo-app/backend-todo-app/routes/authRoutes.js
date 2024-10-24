const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
// Registro
router.post('/register', async (req, res) => {
const { username, password } = req.body;
try {
const newUser = new User({ username, password });
await newUser.save();
res.json(newUser);
} catch (error) {
res.status(500).json({ message: 'Error al registrar
usuario' });
}
});
// Login
router.post('/login', async (req, res) => {
const { username, password } = req.body;
try {
const user = await User.findOne({ username });
if (!user) return res.status(404).json({ message: 'Usuario
no encontrado' });
const isMatch = await bcrypt.compare(password,
user.password);
if (!isMatch) return res.status(400).json({ message:
'Contraseña incorrecta' });
const token = jwt.sign({ id: user._id },
process.env.JWT_SECRET, { expiresIn: '1h' });
res.json({ token });
} catch (error) {
res.status(500).json({ message: 'Error al iniciar sesión'
});
}
});
module.exports = router;
