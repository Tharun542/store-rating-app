const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (name.length < 3) {
      return res.status(400).json({ message: "Name too short" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      address
    });

    res.status(201).json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

exports.updatePassword = async (req, res) => {
  const { password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await User.update(
    { password: hashed },
    { where: { id: req.user.id } }
  );

  res.json({ message: "Password updated" });
};