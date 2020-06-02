import axios from 'axios';

const base_url = 'http://pergosandbox2.com/api/login.php';

export const isBrowser = () => typeof window !== 'undefined';

export const getLoginUser = () =>
  isBrowser() && window.localStorage.getItem('PergoUser')
    ? JSON.parse(window.localStorage.getItem('PergoUser'))
    : {};

export const setLoginUser = user => {
  window.localStorage.setItem('PergoUser', JSON.stringify(user));
};

export const loginService = {
  login: async (username, password) => {
    return axios.get(base_url, {
      params: {
        method: 'login',
        username: username,
        password: password,
      },
    });
  },
};

export const isLoggedIn = () => {
  const user = getLoginUser();
  return !!user.call_taker_name;
};

export const logout = callback => {
  setLoginUser({});
};
