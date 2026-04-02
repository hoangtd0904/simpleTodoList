export const REGEX = {
    DOM_CLASS: /^\.[A-Za-z_][A-Za-z0-9_-]+[a-zA-Z0-9]{1}$/,
    DOM_ID: /^#[A-Za-z][A-Za-z0-9]+[a-zA-Z0-9]{1}$/,
};
export const DURATION = {
    HIDE_NOTIFICATION: 4000,
};
export const NOTIFICATION = {
    TYPE: {
        SUCCESS: 'success',
        ERROR: 'error',
        INFO: 'info',
        WARNING: 'warning',
    },
    CSS: {
        OFFSET_VAR_NAME: '--offset',
        INDEX_VAR_NAME: '--i',
        MARGIN_IN_PIXEL: 8
    },
    STACK: {
        MAX_NUMBER: 5,
    }
};
