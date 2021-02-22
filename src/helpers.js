import { compose, isNil, when, cond, is, always, T } from 'rambda';
export const getItem = (key, defaultValue) => localStorage.getItem(key) || defaultValue
export const setItem = (key, value) => localStorage.setItem(key, value);

export const getParsedItem = (key, defaultValue) => compose(
  JSON.parse,
  when(isNil, cond([
    [is(String), always(defaultValue)],
    [T, () => JSON.stringify(defaultValue)]
  ])),
  getItem
)(key); 
export const setStringifyItem = (key, value) => setItem(key, JSON.stringify(value)); 

export const timestampToDate = ts => new Date(ts * 1000);


export const debounce = (callback, delay) => {
  let timer;
  return function () {
    const args = arguments;
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(function(){
        callback.apply(context, args);
    }, delay)
  }
}