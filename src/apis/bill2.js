import axiosClients from "../axiosClients";

export const apiGetBills = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClients({
            method: 'get',
            url: '/api/v1/bill2/',
            params
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetProductsOfBill2 = (bid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosClients({
            method: 'get',
            url: '/api/v1/bill2/products',
            params: { bid }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})