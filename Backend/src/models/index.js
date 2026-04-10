const User = require("../models/user.model");
const Store = require("../models/store.model");
const Rating = require("../models/rating.model");

// User to store
User.hasMany(Store, {foreignKey: "owner_id"})
Store.belongsTo(User, {foreignKey: "owner_id"})

// User to rating.
User.hasMany(Rating, {foreignKey: "user_id"})
Rating.belongsTo(User, {foreignKey: "user_id"})

// Store to rating.
Store.hasMany(Rating, {foreignKey: "store_id"})
Rating.belongsTo(Store, {foreignKey: "store_id"})

module.exports = {User, Store, Rating};