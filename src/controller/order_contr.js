const { default: mongoose } = require("mongoose");
const { createOrderService, get_user_order, order_find_by_id, order_all, updateOrderService, deleteOrderService, updateOrderToCanceledService } = require("../services/order.service");
const { find_user_by_Id } = require("../services/user.service");


const c_createOrder = async (req, res) => {
    try {
        // `authMiddleware` vasitəsilə istifadəçinin ID-si alınır
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        // `req.body`-dən sifariş məlumatları al
        console.log(userId);

        const user = await find_user_by_Id(userId)
        const user_name = user.name

        const orderDetails = {
            ...req.body, // Req.body-də olan digər məlumatlar saxlanır
            user_name,  // user_name əlavə edilir
        };
        // Service-lə işləyir
        const { newOrder, updatedOrderList } = await createOrderService(
            userId,
            orderDetails
        );

        return res.status(201).json({
            message: "Sifariş uğurla yaradıldı və Order_list yeniləndi.",
            order: newOrder,
            orderList: updatedOrderList,
        });
    } catch (error) {
        console.error("Error in createOrderController:", error.message);
        res.status(500).json({ message: error.message });
    }
}

const c_get_user_order = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        // Service-lə istifadəçinin sifarişlərini al
        const orders = await get_user_order(userId);

        return res.status(200).json({
            message: "User orders retrieved successfully",
            orders,
        });
    } catch (error) {
        console.error("Error in getUserOrdersController:", error.message);
        res.status(500).json({ message: error.message });
    }
};



const c_order_find_by_id = async (req, res) => {
    try {
        const { order_id } = req.params;
        const order = await order_find_by_id(order_id);
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// order_all
const c_order_all = async (req, res) => {
    try {
        const orders = await order_all();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


//update order
const c_update_order = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updateData = req.body;

        if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid or missing Order ID" });
        }

        console.log("Update data received for order:", updateData);
        const updatedOrder = await updateOrderService(orderId, updateData);

        return res.status(200).json({
            message: "Order updated successfully",
            order: updatedOrder,
        });
    } catch (error) {
        console.error("Error in updateOrderController:", error.message);
        res.status(500).json({ message: error.message });
    }
};


// delete order
const c_delete_order = async (req, res) => {
    try {
        const { orderId } = req.params; // URL-dən order ID götürülür
        const deletedOrder = await deleteOrderService(orderId);
        res.json(deletedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



// user update order
const c_update_order_to_canceled = async (req, res) => {
    try {
        const { orderId } = req.params; // URL-dən sifariş ID-si alınır
        const userId = req.user.id; // `req.user` vasitəsilə istifadəçi ID-si alınır

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid Order ID" });
        }

        console.log("User attempting to cancel order:", userId, "Order ID:", orderId);

        // Xidmət funksiyasını çağırırıq
        const updatedOrder = await updateOrderToCanceledService(orderId, userId);

        return res.status(200).json({
            message: "Order successfully canceled",
            order: updatedOrder,
        });
    } catch (error) {
        console.error("Error in cancelOrderController:", error.message);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    c_createOrder,
    c_get_user_order,
    c_order_find_by_id,
    c_order_all,
    c_update_order,
    c_delete_order,
    c_update_order_to_canceled
};