import jwtDecode from 'jwt-decode';

export const extractToken = (token: string): any => {
  const whiteSpace = token.indexOf(' ');
  const finalToken: any = jwtDecode(token.slice(whiteSpace + 1, token.length));
  return finalToken;
};
