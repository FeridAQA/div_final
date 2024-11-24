const Order_list = require("../models/Order_list");


const all_order_list = async () => {
    const oreder_lists = await Order_list.find()
    return oreder_lists
}
const get_order_list = async (id) => {
    const order_list = await Order_list.findById(id)
    console.log(order_list);

    return order_list

}

const createOrder_list = async (userId) => {
    try {
        const order_list = await Order_list.create({
            user_id: userId,
        });
        return order_list;
    } catch (error) {
        throw new Error('order_list yaratma zamanı xəta baş verdi');
    }
};



module.exports = {
    all_order_list,
    get_order_list,
    createOrder_list
};