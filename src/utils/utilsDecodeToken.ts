import { jwtDecode } from "jwt-decode";
const utilsDecodeToken = (token: string) => {
  const decoded = jwtDecode(token);
  const expTimestamp = decoded.exp;
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
