import { instance } from "../../../shared/api"

export const getAllOrders = async () => {
    const response = await instance.get("getAllOrders");

    console.log(response.data)
    
     return response.data;
}