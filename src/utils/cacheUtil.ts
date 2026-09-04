const set = (key: string, value: any) => {
  localStorage.setItem(key, value);
};
const get = (key: string) => {
  return localStorage.getItem(key);
};
const setS = (key: string, value: any) => {
  sessionStorage.setItem(key, value);
};
const getS = (key: string) => {
  return sessionStorage.getItem(key);
};
export default {
  set,
  get,
  setS,
  getS,
};
