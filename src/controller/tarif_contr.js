const { find_all_tarif, create_tarif, delete_tarif, update_tarif } = require("../services/tarif.service");

const c_find_all_tarif = async (req, res) => {
    try {
        let tarifs = await find_all_tarif()
        res.status(200).json(tarifs)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// create tairf
const c_create_tarif = async (req, res) => {
    try {
        let tarif = await create_tarif(req.body)
        res.status(201).json(tarif)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// delete tarif
const c_delete_tarif = async (req, res) => {
    try {
        let id = req.params.id
        let tarif = await delete_tarif(id)
        res.status(200).json(tarif)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// update tarif
const c_update_tarif = async (req, res) => {
    try {
        let id = req.params.id
        let tarif = await update_tarif(id, req.body)
        res.status(200).json(tarif)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    c_find_all_tarif,
    c_create_tarif,
    c_delete_tarif,
    c_update_tarif,
}