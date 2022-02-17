let accessToken: string | null | undefined = null;
let isLoggedIn: boolean = false;

export const getAccessToken = () => {
  return accessToken;
};

export const setAccessToken = (token: string | null | undefined) => {
  accessToken = token;
};

export const getIsLoggedIn = () => {
  return isLoggedIn;
};

export const setIsLoggedIn = (state: boolean) => {
  isLoggedIn = state;
};
