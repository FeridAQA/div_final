const { create_pickup, get_all_pickup } = require("../services/pickup.service");

const c_create_pickup = async (req, res) => {
    try {
        let pickup = await create_pickup({ ...req.body })
        res.status(201).json(pickup)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// all pickup
const c_get_all_pickup = async (req, res) => {
    try {
        let pickup = await get_all_pickup()
        res.status(200).json(pickup)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    c_create_pickup,
    c_get_all_pickup
}