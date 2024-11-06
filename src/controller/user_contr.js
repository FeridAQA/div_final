const { find_all_user, find_user_by_Id, delete_user_by_Id } = require("../services/user.service")

//find all user
const c_find_all_user = async (req, res) => {
    try {
        let users = await find_all_user()
        res.status(200).json(users)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const c_find_user_by_Id = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await find_user_by_Id(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const c_delete_user_Id = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await find_user_by_Id(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log(user);
        
       await delete_user_by_Id(user_id)

        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    c_find_all_user,
    c_find_user_by_Id,
    c_delete_user_Id,

}