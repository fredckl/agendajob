export const getItem = (key, defaultValue) => localStorage.getItem(key) || defaultValue
export const setItem = (key, value) => localStorage.setItem(key, value);

export const getItemParsed = (key, defaultValue) => JSON.parse(getItem(key, defaultValue)); 
export const setItemStringify = (key, value) => setItem(key, JSON.stringify(value)); 

export const timestampToDate = ts => new Date(ts * 1000);
