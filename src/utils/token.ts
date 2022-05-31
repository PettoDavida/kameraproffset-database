export interface TokenData {
  id: string;
  isAdmin: boolean;
}

export function getTokenData(token: String): TokenData {
  let parts = token.split(".");
  let part = parts[1];

  let js = Buffer.from(part, "base64").toString();
  let data = JSON.parse(js);

  return data;
}

export function getLoginToken(): String | null {
  const token = localStorage.getItem("loginToken");
  return token;
}
