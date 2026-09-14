export const set = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
export const get = (key: string) => {
  return localStorage.getItem(key);
};
export const setS = (key: string, value: any) => {
  sessionStorage.setItem(key, value);
};
export const getS = (key: string) => {
  return sessionStorage.getItem(key);
};
export default {
  set,
  get,
  setS,
  getS,
};
