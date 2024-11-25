const Tarif = require("../models/Tarif")

const find_all_tarif = async () => {
    const tarifs = await Tarif.find()
    return tarifs
}
// create tarif

const create_tarif = async (params) => {
    try {
        const tarif = new Tarif(params)
        const result = await tarif.save()
        return result
    } catch (error) {
        console.error("Xəta baş verdi:", error);
        throw error; // Xətanı qaytar
    }
}

// delete tarif
const delete_tarif = async (id) => {
    try {
        const result = await Tarif.findByIdAndDelete(id)
        return result
    } catch (error) {
        console.error("Xəta baş verdi:", error);
        throw error; // Xətanı qaytar
    }
}

// update tarif
const update_tarif = async (id, params) => {
    try {
        const result = await Tarif.findByIdAndUpdate(id, params, { new: true })
        return result
    } catch (error) {
        console.error("Xəta baş verdi:", error);
        throw error; // Xətanı qaytar
    }
}


module.exports = {
    find_all_tarif,
    create_tarif,
    delete_tarif,
    update_tarif
}