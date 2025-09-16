export function decodeJwt(token: string): any {
  const [header, payload] = token.split('.');

  const decode = (str: string) =>
    JSON.parse(
      decodeURIComponent(
        atob(str)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      ),
    );

  return {
    header: decode(header),
    payload: decode(payload),
  };
}
