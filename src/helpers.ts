// common helper functions
export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
}

// storage helper functions
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

// ui helper functions
export const createElement = (tag: string, className?: string, innerText?: string): HTMLElement => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerText) element.innerText = innerText;
    return element;
}

export const getElements = <T extends HTMLElement>(idOrClass: string): T[] => {
    const idOrClassRegex = /^([#.])[A-Za-z_][A-Za-z0-9_-]+[a-zA-Z0-9]{1}$/;;
    if (!idOrClassRegex.test(idOrClass)) return []
    return Array.from(document.querySelectorAll(idOrClass)) as T[];
}

export const getElement = <T extends HTMLElement>(idOrClass: string): T | null => {
    const elements = getElements<T>(idOrClass);
    return elements.length > 0 ? elements[0] : null;
}
