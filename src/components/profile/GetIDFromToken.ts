export interface TokenData {
  id: string;
  isAdmin: boolean;
}

export default function getTokenData(token: string): TokenData {
  let parts = token.split(".");
  let part = parts[1];

  let js = Buffer.from(part, "base64").toString();
  let data = JSON.parse(js);

  return data;
}
