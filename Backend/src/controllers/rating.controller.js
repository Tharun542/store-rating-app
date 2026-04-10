const { Rating } = require("../models");

exports.addOrUpdateRating = async (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  let existing = await Rating.findOne({
    where: { user_id, store_id }
  });

  if (existing) {
    existing.rating = rating;
    await existing.save();
    return res.json({ message: "Updated", rating: existing });
  }

  const newRating = await Rating.create({
    user_id,
    store_id,
    rating
  });

  res.status(201).json(newRating);
};