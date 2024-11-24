const Pickup = require("../models/Pickup")

const create_pickup = async (params) => {
    try {
        const pickup = new Pickup(params)
        const result = await pickup.save()
        return result
    } catch (error) {
        console.error("Xəta baş verdi:", error);
        throw error; // Xətanı qaytar
    }
}
// all pickup
const get_all_pickup = async () => {
    try {
        const pickup = await Pickup.find()
        return pickup
    } catch (error) {
        console.error("Xəta baş verdi:", error);
        throw error; // Xətanı qaytar
    }
}


module.exports = {
    create_pickup,
    get_all_pickup,
}