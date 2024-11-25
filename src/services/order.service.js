const Order = require("../models/Order");
const Order_list = require("../models/Order_list");
const User = require("../models/User");
const { decrementUserBalance } = require("./balance.service");


const createOrderService = async (userId, orderDetails) => {
    try {
        // Yeni sifariş yaradılır
        const newOrder = await Order.create({ ...orderDetails, user_id: userId });

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


const order_find_by_id = async (id) => {
    const order = await Order.findById(id);
    return order
}
const order_all = async () => {
    const orders = await Order.find();
    return orders
}

//update order

const updateOrderService = async (orderId, updateData) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }

    if (updateData.order_status === "accepted") {
        console.log("Attempting to decrement balance for user:", order.user_id);
        try {
            const result = await decrementUserBalance(order.user_id, order.price, "Order accepted");
            console.log("Balance decrement result:", result);
        } catch (error) {
            console.error("Error during balance decrement:", error.message);
            if (error.message === "Insufficient balance") {
                updateData.order_status = "insufficient_balance";
            } else {
                throw error;
            }
        }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedOrder) {
        throw new Error("Order not found after update");
    }

    console.log("Order successfully updated:", updatedOrder);
    return updatedOrder;
};





// delete order
const deleteOrderService = async (orderId) => {
    try {
        // Sifarişi ID ilə tap və sil
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            throw new Error("Order not found");
        }
        return deletedOrder;
    } catch (error) {
        console.error("Error in deleteOrderService:", error.message);
        throw error; // Controller-ə xəta qaytarılır
    }
}


// user update_order
const updateOrderToCanceledService = async (orderId, userId) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    // Yalnız pending statusu olduqda dəyişiklik edə bilər
    if (order.order_status !== "pending") {
        throw new Error("Only orders with 'pending' status can be canceled");
    }

    // Sifarişin istifadəçiyə aid olduğunu yoxlayırıq
    if (!order.user_id.equals(userId)) {
        throw new Error("You are not authorized to cancel this order");
    }

    // Sifariş statusunu canceled kimi yeniləyirik
    order.order_status = "canceled";
    await order.save();

    console.log("Order successfully canceled:", order);
    return order;
};


module.exports = {
    createOrderService,
    get_user_order,
    order_find_by_id,
    order_all,
    updateOrderService,
    deleteOrderService,
    updateOrderToCanceledService
}