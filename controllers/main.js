
const Chargers = require("../models/model");
const getAllChargers = async (req, res) => {
    try {
        const chargers = await Chargers.find({});
        res.status(200).json(chargers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllChargers };