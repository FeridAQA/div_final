const Tarif = require("../models/Tarif")

const find_all_tarif=async()=>{
    const tarifs=await Tarif.find()
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

module.exports={
    find_all_tarif,
    create_tarif,
}