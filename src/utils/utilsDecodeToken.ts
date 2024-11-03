import { jwtDecode } from "jwt-decode";

interface ITokenDecoded {
  exp: string;
  id: string;
  iat: string;
  roles: string[];
  username: string;
  sub: string;
}
const utilsDecodeToken = (token: string) => {
  const decoded = jwtDecode(token) as ITokenDecoded;
  const expTimestamp = Number(decoded.exp);
  if (expTimestamp === undefined) {
    throw new Error("Token does not contain an expiration timestamp");
  }
  const expDate = new Date(expTimestamp * 1000);
  const expFormatted = `${expDate.getHours()}:${expDate.getMinutes()} ${expDate.getDate()}/${
    expDate.getMonth() + 1
  }/${expDate.getFullYear()}`;
  decoded.exp = expFormatted;
  return decoded;
};
export default utilsDecodeToken;
