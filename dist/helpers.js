// common helper functions
export const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
};
// storage helper functions
export const saveToLocalStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
};
export const getFromLocalStorage = (key) => {
    const possibleData = window.localStorage.getItem(key);
    return possibleData ? JSON.parse(possibleData) : {};
};
export const removeFromLocalStorage = (key) => {
    window.localStorage.removeItem(key);
};
// ui helper functions
export const createElement = (tag, className, innerText) => {
    const element = document.createElement(tag);
    if (className)
        element.className = className;
    if (innerText)
        element.innerText = innerText;
    return element;
};
export const getElements = (idOrClass) => {
    const idOrClassRegex = /^([#.])[A-Za-z_][A-Za-z0-9_-]+[a-zA-Z0-9]{1}$/;
    ;
    if (!idOrClassRegex.test(idOrClass))
        return [];
    return Array.from(document.querySelectorAll(idOrClass));
};
export const getElement = (idOrClass) => {
    const elements = getElements(idOrClass);
    return elements.length > 0 ? elements[0] : null;
};
