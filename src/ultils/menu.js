import { path } from "./constant";

export const menuProfile = [
    { path: '/' + path.PROFILE + path.PERSONAL, text: 'Thông tin cá nhân', keyName: 'personal' },
    { path: '/' + path.PROFILE + path.ORDERS, text: 'Hóa đơn của tôi', keyName: 'orders' },
]
export const menuStatus = [
    {
        keyname: 'in_progress',
        value: 'in progress',
        text: 'Đơn đang thực hiện',
    },
    {
        keyname: 'completed',
        value: 'completed',
        text: 'Đơn đã hoàn thành',
    },
    {
        keyname: 'cancel',
        value: 'cancel',
        text: 'Đơn đã hủy',
    },
]