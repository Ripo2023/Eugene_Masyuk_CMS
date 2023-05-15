import { instance } from "../../../shared/api"

export const getAllOrders = async () => {
    const response = await instance.get("getAllOrders");

    
     return response.data;
}