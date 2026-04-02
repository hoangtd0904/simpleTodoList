import { NOTIFICATION, REGEX, DURATION } from '../constants.js';
import { generateId } from './common.helper.js';
// constants
const idRegex = REGEX.DOM_ID;
const classRegex = REGEX.DOM_CLASS;
const CSS = {
    COMMON_CLASS: {
        CLOSE_BUTTON: '.close-btn',
    },
    COMMON_ID: {
        NOTIFICATION: {
            LIST: '#notificationQueue'
        },
        TASK: {
            LIST: '#taskList'
        },
    },
    MANAGED_TEMPLATES: {
        NOTIFICATION: '#templateNoti',
        DIALOG: '#templateDialog',
        TASK: '#templateTask',
        CLOSE_BUTTON: '#templateCloseBtn',
    },
    UNIT: 'px'
};
// global lists
let notificationList, taskList;
let notificationListContainer, taskListContainer;
// 
const isValidId = (id) => {
    return idRegex.test(id);
};
const isValidClassname = (classStr) => {
    return classRegex.test(classStr);
};
const isValidIdOrClass = (idOrClass) => {
    return isValidId(idOrClass) || isValidClassname(idOrClass);
};
export const createElement = (tag, className, innerText) => {
    const element = document.createElement(tag);
    if (className)
        element.className = className;
    if (innerText)
        element.innerText = innerText;
    return element;
};
export const getElements = (idOrClass, from = document) => {
    if (!isValidIdOrClass(idOrClass))
        return [];
    return Array.from(from.querySelectorAll(idOrClass));
};
export const getElement = (idOrClass, from = document) => {
    const elements = getElements(idOrClass, from);
    return elements.length > 0 ? elements[0] : null;
};
export const deleteElement = (idOrClass) => {
    if (!isValidIdOrClass(idOrClass))
        return false;
    const element = getElement(idOrClass);
    if (!element || !element.parentElement)
        return false;
    element.parentElement.removeChild(element);
    return true;
};
export const deleteAllElementsByClass = (className) => {
    if (!isValidClassname(className))
        return 0;
    const elements = getElements(className);
    let deletedElements = 0;
    try {
        elements.forEach(element => {
            if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
        });
    }
    catch (error) {
        console.error('Error deleting elements:', error);
    }
    finally {
        return deletedElements;
    }
};
const cloneTemplate = (templateId) => {
    if (!isValidId(templateId))
        throw new Error(`Invalid template ID: ${templateId}`);
    const template = getElement(templateId);
    if (!template)
        throw new Error(`Template with ID ${templateId} not found.`);
    const clone = template.content.cloneNode(true);
    return clone;
};
const cloneTemplateElementById = (templateId) => {
    const clone = cloneTemplate(templateId);
    switch (clone.nodeType) {
        case Node.ELEMENT_NODE:
            return clone;
        case Node.DOCUMENT_FRAGMENT_NODE:
            const firstChild = clone.firstElementChild;
            if (firstChild && firstChild instanceof HTMLElement) {
                return firstChild;
            }
            throw new Error(`No HTMLElement found in the DocumentFragment cloned from template ID: ${templateId}`);
        default:
            throw new Error(`Cloned node is not an HTMLElement. Node type: ${clone.nodeType}`);
    }
};
export const addCloseBtnToElement = ({ element, closeCallback, closeBtnClassname = CSS.COMMON_CLASS.CLOSE_BUTTON, delayFire, preFireCallback }) => {
    const onClose = () => {
        if (element && element.parentElement) {
            element.parentElement.removeChild(element);
        }
        if (closeCallback) {
            closeCallback();
        }
    };
    const closeBtns = getElements(closeBtnClassname, element);
    if (closeBtns.length === 0) {
        const newCloseBtn = cloneTemplateElementById(CSS.MANAGED_TEMPLATES.CLOSE_BUTTON);
        if (!newCloseBtn)
            throw Error(`Can not add close button to element ${element.id}`);
        closeBtns.push(newCloseBtn);
        element.appendChild(newCloseBtn);
    }
    closeBtns.forEach(el => {
        el.addEventListener('click', onClose);
    });
};
// -- notification related functions
const getNotificationListContainer = () => {
    const notiListEl = getElement(CSS.COMMON_ID.NOTIFICATION.LIST);
    if (!notiListEl) {
        throw new Error('Notification list container not found.');
    }
    return notiListEl;
};
const getNotificationList = () => {
    const notiListEl = notificationListContainer || getNotificationListContainer();
    const currentNotiList = getElements('.notification', notiListEl);
    return Array.from(currentNotiList);
};
const getOffsetForNotiAtIndex = (index) => {
    const currentNotiList = notificationList || getNotificationList();
    const offsetList = currentNotiList.slice(0, index);
    const offset = offsetList.reduce((curOffset, curEl) => {
        const curElHeight = curEl.offsetHeight;
        const nextOffset = curOffset + curElHeight + NOTIFICATION.CSS.MARGIN_IN_PIXEL;
        return nextOffset;
    }, 0);
    return offset;
};
export const createNotificationEl = ({ className, innerText, message, type = NOTIFICATION.TYPE.INFO, autoHide = true, autoHideAfter = DURATION.HIDE_NOTIFICATION }) => {
    var _a;
    try {
        const notiNode = cloneTemplateElementById(CSS.MANAGED_TEMPLATES.NOTIFICATION);
        const notiListEl = notificationListContainer || getNotificationListContainer();
        const currentNotiList = notificationList || getNotificationList();
        const nextNotiIdx = (_a = currentNotiList.length) !== null && _a !== void 0 ? _a : 0;
        const offset = getOffsetForNotiAtIndex(nextNotiIdx);
        const notiId = `noti${generateId()}`;
        if (innerText) {
            notiNode.innerText = innerText;
        }
        notiNode.classList.add(`notification--${type} ${className ? className : ''}`.trim());
        const messageEl = notiNode.querySelector('.notification__message');
        if (messageEl) {
            messageEl.textContent = `${message}${Math.random()}`; //TODO: return this
        }
        let hideTimeout = null;
        if (autoHide) {
            hideTimeout = setTimeout(() => {
                var _a;
                (_a = notiNode.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(notiNode);
            }, autoHideAfter);
        }
        // 
        notiNode.id = notiId;
        notiNode.style.setProperty(NOTIFICATION.CSS.INDEX_VAR_NAME, `${nextNotiIdx}`);
        notiNode.style.setProperty(NOTIFICATION.CSS.OFFSET_VAR_NAME, `${offset}${CSS.UNIT}`);
        addCloseBtnToElement({
            element: notiNode,
            closeCallback: () => {
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                }
            }
        });
        notiListEl.appendChild(notiNode);
    }
    catch (error) {
        console.error('Can not create notification element due to: ', { error });
    }
};
// -- dialog related functions
export const createDialogEl = () => {
    // get template
    const taskTemplate = getElement(CSS.MANAGED_TEMPLATES.DIALOG);
    const clone = taskTemplate === null || taskTemplate === void 0 ? void 0 : taskTemplate.content.cloneNode(true);
    const taskList = getElement('#taskList');
    console.log('taskList', { clone, nodeType: clone === null || clone === void 0 ? void 0 : clone.nodeType });
    if (taskList && clone)
        taskList.insertBefore(clone, taskList.childNodes[taskList.childNodes.length - 2]);
};
// -- task related functions
export const createTaskEl = () => {
    // get template
    const taskTemplate = getElement(CSS.MANAGED_TEMPLATES.TASK);
    const clone = taskTemplate === null || taskTemplate === void 0 ? void 0 : taskTemplate.content.cloneNode(true);
    const taskList = getElement('#taskList');
    console.log('taskList', { clone, nodeType: clone === null || clone === void 0 ? void 0 : clone.nodeType });
    if (taskList && clone)
        taskList.insertBefore(clone, taskList.childNodes[taskList.childNodes.length - 2]);
};
export const createButtonEl = () => { };
