const axios = require("axios");
const User = require("../models/Users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);

    // console.log(req.data);
    // res.status(200).json(data);
  } catch (error) {
    console.error("error in getAPi data controller:", error);
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = {
  getUsers,
};
