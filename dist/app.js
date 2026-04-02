var _a, _b;
import { createNotificationEl, getElement } from "./shared/helpers/dom.helper.js";
(_a = getElement('#createNotification')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    createNotification();
});
(_b = getElement('#createDialog')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    createDialog();
});
// 
const createNotification = () => {
    createNotificationEl({
        message: 'This is a notification message!'
    });
};
const createDialog = () => {
    console.log('Hello, world! dialog');
};
