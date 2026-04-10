const { User, Store, Rating } = require("../models");
const { Op, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

// DASHBOARD
exports.getAdminDashboard = async (req, res) => {
  const totalUsers = await User.count();
  const totalStores = await Store.count();
  const totalRating = await Rating.count();

  res.json({ totalUsers, totalStores, totalRating });
};

// CREATE USER
exports.createUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    address,
    role
  });

  res.status(201).json(user);
};

// FILTER USERS
exports.getUsers = async (req, res) => {
  const { name = "", email = "", address = "", role = "" } = req.query;

  const users = await User.findAll({
    where: {
      name: { [Op.like]: `%${name}%` },
      email: { [Op.like]: `%${email}%` },
      address: { [Op.like]: `%${address}%` },
      role: { [Op.like]: `%${role}%` }
    }
  });

  res.json(users);
};

// GET STORES
exports.getStores = async (req, res) => {
  const stores = await Store.findAll({
    attributes: [
      "id",
      "name",
      "email",
      "address",
      [Sequelize.fn("AVG", Sequelize.col("Ratings.rating")), "rating"]
    ],
    include: [{ model: Rating, attributes: [] }],
    group: ["Store.id"]
  });

  res.json(stores);
};