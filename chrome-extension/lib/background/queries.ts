import { errorStringStorage, sectionIdStorage } from '@chrome-extension-boilerplate/storage';
import { getBaseUrl, sendRequestUsingCookies } from './utils';

const baseUrl = getBaseUrl();
const baseUrlString = `${baseUrl}/`;
const sendQAUrl = `${baseUrl}/api/send-qa`;
const questionsUrl = `${baseUrl}/api/questions`;
const sendMessageUrl = `${baseUrl}/api/send-message`;
const instructionsUrl = `${baseUrl}/instructions`;

export async function sendQuestionAnswer(question: string, answer: string) {
  if (!question || !answer) return;

  const data = {
    question: question,
    answer: answer,
  };

  try {
    const response = await sendRequestUsingCookies(baseUrlString, sendQAUrl, 'POST', data);
    const result = await response.json();
    console.log('API response:', result);
  } catch (error) {
    console.error('Error in sendQuestionAnswer:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}

/**
 * Fetches a question from the server.
 *
 * @returns {Promise<Questionwithlink>} A promise that resolves to an object containing the question and a link.
 */
export async function getQuestion(): Promise<Questionwithlink> {
  const response = await sendRequestUsingCookies(baseUrlString, questionsUrl, 'GET');

  if (!response.ok) {
    await sectionIdStorage.set('get-question-error');
    await errorStringStorage.set('Failed to fetch question');
    return { question: '', link: '' };
  }

  const result = await response.json();
  await sectionIdStorage.set('get-question-success');
  return { question: result.question, link: result.url }; // Assuming the API returns a JSON object with a 'question' field
}

/**
 * Sends a message with the specified text and tab information.
 * The function returns early if the text or tab is undefined or if the tab has no URL.
 * It sends a post request to the send message api endpoint and responds accordingly acoording to the response.
 *
 * @param {string} [text] - The text message to send. If undefined or empty, the function returns early.
 * @param {chrome.tabs.Tab} [tab] - The tab object containing the URL information. If undefined or if the tab has no URL, the function returns early.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function sendMessage(text: string | undefined, tab: chrome.tabs.Tab | undefined) {
  if (!text || !tab) return;
  if (!tab.url) return;
  const url = new URL(tab.url);
  const data = {
    text: text,
    host: url.host,
    path: url.pathname,
  };

  try {
    const response = await sendRequestUsingCookies(baseUrlString, sendMessageUrl, 'POST', data);

    if (!response.ok) {
      throw new Error('Bad request, Try again later');
    }

    const responseBody = await response.json();
    if (responseBody.next) {
      await chrome.tabs.update({ url: responseBody.next });
    } else if (responseBody.error) {
      throw new Error(responseBody.error);
    }
  } catch (error) {
    console.error('Error in sendMessage:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function getStarted() {
  await chrome.tabs.create({ url: instructionsUrl });
}

export interface Questionwithlink {
  question: string;
  link: string;
}
