const access = "@token_access";
const refresh = "@token_refresh";

export const getAccess = () => localStorage.getItem(access);

export const setAccess = (token) => localStorage.setItem(access, token);

export const getRefresh = () => localStorage.getItem(refresh);

export const setRefresh = (token) => localStorage.setItem(refresh, token);

export const cleanLocalStorage = () => {
  window.localStorage.clear();
};
