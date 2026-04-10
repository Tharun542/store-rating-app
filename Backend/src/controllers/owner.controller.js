const { Store, Rating, User } = require("../models");
const { Sequelize } = require("sequelize");

exports.getOwnerDashboard = async (req, res) => {
  const store = await Store.findOne({
    where: { owner_id: req.user.id }
  });

  const ratings = await Rating.findAll({
    where: { store_id: store.id },
    include: [{ model: User, attributes: ["name", "email"] }]
  });

  const avg = await Rating.findOne({
    where: { store_id: store.id },
    attributes: [
      [Sequelize.fn("AVG", Sequelize.col("rating")), "avgRating"]
    ]
  });

  res.json({
    store,
    ratings,
    avgRating: avg.dataValues.avgRating
  });
};