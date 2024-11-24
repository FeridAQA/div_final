const { all_order_list, get_order_list } = require("../services/order_list.service");

const c_all_order_list = async (req, res) => {
    try {
        let order_lists = await all_order_list()
        res.status(200).json(order_lists)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const c_user_order_list = async (req, res) => {
    try {
        console.log(req.user);
        
        const id = req.user.order_list_id
        // console.log(id);
        
        let order_list = await get_order_list(id)
        res.status(200).json(order_list)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    c_all_order_list,
    c_user_order_list
};
