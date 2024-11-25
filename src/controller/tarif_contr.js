const { find_all_tarif } = require("../services/tarif.service");

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

module.exports={
    c_find_all_tarif,
}