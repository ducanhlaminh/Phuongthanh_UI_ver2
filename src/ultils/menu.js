import { ChangePassword } from "../containers/public";
import { path } from "./constant";

export const menuProfile = [
    { path: '/' + path.PROFILE + path.PERSONAL, text: 'Thông tin cá nhân', keyName: 'personal' },
    { path: '/' + path.PROFILE + path.ORDERS, text: 'Hóa đơn của tôi', keyName: 'orders' },
    {path:'/'+path.PROFILE + path.CHANGE_PASSWORD,text: 'Đổi mật khẩu',keyName: 'changePassword'}
]
export const menuStatus = [
    {
        keyname: 'in_progress',
        value: 'in progress',
        text: 'Đang thực hiện',
    },
    {
        keyname: 'completed',
        value: 'completed',
        text: 'Hoàn thành',
    },
    {
        keyname: 'cancel',
        value: 'cancel',
        text: 'Đã hủy',
    },
]