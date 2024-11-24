const Order = require("../models/Order");
const Order_list = require("../models/Order_list");
const User = require("../models/User");


const createOrderService = async (userId, orderDetails) => {
    try {
        // Yeni sifariş yaradılır
        const newOrder = await Order.create(orderDetails);

        // Mövcud istifadəçinin `Order_list`-inə sifariş əlavə edilir
        const updatedOrderList = await Order_list.findOneAndUpdate(
            { user_id: userId }, // Mövcud istifadəçinin `Order_list`-i tapılır
            { $push: { order_id: newOrder._id } }, // Yeni sifariş ID-si əlavə edilir
            { new: true, upsert: true } // Əgər `Order_list` yoxdursa, yaradılır
        );

        return { newOrder, updatedOrderList };
    } catch (error) {
        console.error("Error in createOrderService:", error.message);
        throw error; // Controller-ə xəta göndərilir
    }
};

const get_user_order = async (userId) => {
    try {
        // 1. İstifadəçinin `order_list_id`-ni tap
        const user = await User.findById(userId);
        if (!user || !user.order_list_id) {
            throw new Error("Order list not found for the user");
        }
        const orderListId = user.order_list_id;

        // 2. `order_list`-dən bütün sifariş ID-lərini götür
        const orderList = await Order_list.findById(orderListId);
        if (!orderList || !orderList.order_id.length) {
            throw new Error("No orders found for the user");
        }
        const orderIds = orderList.order_id;

        // 3. Bütün sifarişlərin məlumatlarını tap
        const orders = await Order.find({ _id: { $in: orderIds } });

        return orders;
    } catch (error) {
        console.error("Error in getUserOrdersService:", error.message);
        throw error; // Controller-ə xəta qaytar
    }
};


const order_find_by_id =async (id) => {
    const order = await Order.findById(id);
    return order
}
module.exports = {
    createOrderService,
    get_user_order,
    order_find_by_id
}