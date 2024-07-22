//const TOP_LEVEL_DOMAIN = 'https://www.keepalive.club';
const TOP_LEVEL_DOMAIN = '';
export function getBaseUrl(): string {
  const tld = TOP_LEVEL_DOMAIN;
  return tld.length > 0 ? `https://${tld}` : 'localhost:3000';
}

/**
 * Ensures the given URL has a protocol (http:// or https://).
 * If no protocol is present, it adds http:// by default.
 *
 * @param {string} url The URL to check and potentially modify.
 * @returns {string} The URL with a protocol.
 */
export function ensureProtocol(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `http://${url}`;
  }
  return url;
}

/**
 * Sends a fetch request to the specified URL using the cookies from the specified URL.
 *
 * @param {string} [cookiesUrl] The URL from which the cookies will be fetched.
 * @param {string} [requestUrl] The URL to which the request will be sent.
 * @param {string} [method] The HTTP method to use for the request.
 * @param {unknown} [data] The data to be sent in the request body.
 * @returns {Promise<Response>} A promise that resolves to the response object.
 */
export async function sendRequestUsingCookies(
  cookiesUrl: string,
  requestUrl: string,
  method: string,
  data?: unknown,
): Promise<Response> {
  try {
    const cookies = await chrome.cookies.getAll({ url: cookiesUrl });
    const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    requestUrl = ensureProtocol(requestUrl);

    const response = await fetch(requestUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error in sendRequestUsingCookies:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}
