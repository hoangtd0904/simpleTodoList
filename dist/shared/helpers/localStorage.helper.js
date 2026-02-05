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
