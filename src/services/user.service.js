const User = require("../models/User");


const find_all_user=async()=>{
    const users=await User.find()
    return users
}

const find_user_by_Id = async (id) => {
    const user = await User.findById(id);
    return user
}

const delete_user_by_Id=async (id)=>{
    const user=await User.findByIdAndDelete(id);
    return user
}


module.exports = {
    find_all_user,
    find_user_by_Id,
    delete_user_by_Id,
}