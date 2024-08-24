import User from "../database/models/user"

export const getUserByID = async(id:string) =>{
    const user = await User.findOne({where: {id}})
    return user
}