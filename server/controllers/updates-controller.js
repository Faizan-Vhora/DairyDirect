const TodayUpdates = require("../models/todayUpdatesSchema");

// --------------------------
// Get Latest Today Updates 
// --------------------------
const getLastTodayUpdates = async(req, res) => {
    try {
        const todayUpdates = await TodayUpdates.findOne().sort({ timestamp: -1 });
        return res.status(200).json(todayUpdates);
    } catch (error) {
        next(error);
    }
}

module.exports = { getLastTodayUpdates }
