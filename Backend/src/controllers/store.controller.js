const { Store, Rating } = require("../models");
const { Sequelize, Op } = require("sequelize");

exports.createStore = async (req, res) => {
  const { name, email, address, owner_id } = req.body;

  const store = await Store.create({
    name,
    email,
    address,
    owner_id
  });

  res.status(201).json(store);
};

exports.getAllStores = async (req, res) => {
  const { search = "", order = "ASC" } = req.query;

  const stores = await Store.findAll({
    attributes: [
      "id",
      "name",
      "address",
      [Sequelize.fn("AVG", Sequelize.col("Ratings.rating")), "avgRating"],
      [
        Sequelize.literal(`(
          SELECT rating FROM Ratings
          WHERE Ratings.store_id = Store.id
          AND Ratings.user_id = ${req.user.id}
          LIMIT 1
        )`),
        "userRating"
      ]
    ],
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } }
      ]
    },
    include: [{ model: Rating, attributes: [] }],
    group: ["Store.id"],
    order: [["name", order]]
  });

  res.json(stores);
};