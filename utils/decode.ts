export function decodeURIToken(token: string) {
  const extractedToken = token.slice(1).replace(/ /g, "+");

  return encodeURIComponent(extractedToken);
}
