const { createGeneral, findGeneral, updateGeneral } = require("../services/general.service");

const c_create_gen = async (req, res) => {
    try {
        let general = await createGeneral({ ...req.body })
        res.status(201).json(general)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// find general
const c_find_gen = async (req, res) => {
    try {
        let general = await findGeneral()
        res.status(200).json(general)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//update general
const c_update_gen = async (req, res) => {
    try {
        const { id } = req.params; // URL-dən ID-ni alırıq
        const params = req.body; // Request body-dən parametrləri alırıq

        // Servisi çağıraraq məlumatları yeniləyirik
        const updatedGeneral = await updateGeneral(id, params);

        if (!updatedGeneral) {
            return res.status(404).json({ message: 'General tapılmadı' });
        }

        // Uğurlu cavab qaytarırıq
        res.status(200).json({
            message: 'General uğurla yeniləndi',
            data: updatedGeneral,
        });
    } catch (error) {
        console.error('Update error:', error.message);
        res.status(500).json({ message: 'General yeniləmə zamanı xəta baş verdi' });
    }
};


module.exports = {
    c_create_gen,
    c_find_gen,
    c_update_gen
}