export const saveToLocalStorage = (key: string, data: any): void => {
    window.localStorage.setItem(key, JSON.stringify(data));
}

export const getFromLocalStorage = (key: string): object => {
    const possibleData = window.localStorage.getItem(key);
    return possibleData ? JSON.parse(possibleData) : {};
}

export const removeFromLocalStorage = (key: string): void => {
    window.localStorage.removeItem(key);
}