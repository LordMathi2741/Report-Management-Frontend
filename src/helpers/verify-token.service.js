import {jwtDecode} from 'jwt-decode';

export function isTokenExpired(token) {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}