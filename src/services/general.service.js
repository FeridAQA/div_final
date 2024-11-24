const General = require("../models/General");


// create general
const createGeneral = async (params) => {
    try {
        const general = new General(params);
        await general.save();
        return general;
    } catch (error) {
        throw new Error('general yaratma zamanı xəta baş verdi');
    }
};

// find general
const findGeneral = async () => {
    try {
        const general = await General.find({});
        return general;
    } catch (error) {
        throw new Error('general tapma zamanı xəta baş verdi');
    }
};
// update general
const updateGeneral = async (id, params) => {
    try {
        const general = await General.findByIdAndUpdate(id, params, { new: true });
        return general;
    } catch (error) {
        throw new Error('general yeniləmə zamanı xəta baş verdi');
    }
};



module.exports = {
    createGeneral,
    findGeneral,
    updateGeneral
}