import { createNotificationEl, getElement } from "./shared/helpers/dom.helper.js"

getElement('#createNotification')?.addEventListener('click', () => {
    createNotification();
})

getElement('#createDialog')?.addEventListener('click', () => {
    createDialog();
})

// 
const createNotification = () => {
    createNotificationEl({
        message: 'This is a notification message!'
    })
}

const createDialog = () => {
    console.log('Hello, world! dialog')
}