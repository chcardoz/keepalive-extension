import {
  errorStringStorage,
  linkStorage,
  questionStorage,
  sectionIdStorage,
  textSnippetStorage,
} from '@chrome-extension-boilerplate/storage';
import { getQuestion, getStarted, Questionwithlink, sendMessage, sendQuestionAnswer } from './queries';

export async function handleQuestionAnswer(request: { question: string; answer: string }) {
  if (request.answer) {
    await sectionIdStorage.set('loading');
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]?.id) chrome.sidePanel.open({ tabId: tabs[0].id });
    });
    try {
      await sendQuestionAnswer(request.question, request.answer);
    } catch (error) {
      console.error('Error in background.js:', error);
      await sectionIdStorage.set('error');
      await errorStringStorage.set(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}

// Generic onclick callback function
export async function genericOnClick(info: chrome.contextMenus.OnClickData, tabs: chrome.tabs.Tab | undefined) {
  let q: Questionwithlink;

  switch (info.menuItemId) {
    case 'remember-text-snippet':
      if (!info.selectionText) break;

      if (tabs?.windowId) chrome.sidePanel.open({ windowId: tabs.windowId });
      await sectionIdStorage.set('loading');
      await textSnippetStorage.set(info.selectionText);

      try {
        await sendMessage(info?.selectionText, tabs);
        await sectionIdStorage.set('success');
        await errorStringStorage.set('');
      } catch (error) {
        console.error('Error in background.js:', error);
        await sectionIdStorage.set('test');
        await errorStringStorage.set(error instanceof Error ? error.message : 'Unknown error');
      }

      break;
    case 'generate-question-from-tab':
      await questionStorage.set('Generating question...');
      await linkStorage.set('Loading...');
      q = await getQuestion();
      await questionStorage.set(q.question);
      await linkStorage.set(q.link);
      if (tabs?.id) chrome.sidePanel.open({ tabId: tabs.id });
      break;
    case 'keepalive-get-started':
      getStarted().then(() => {
        console.log('Started');
      });
      break;
    default:
      break;
  }
}

/**
 * Creates context menu items for a Chrome extension.
 *
 * This function sets up three context menu items:
 * 1. "Remember text snippet" - Available when text is selected.
 * 2. "Generate question" - Available in various contexts.
 * 3. "Get started / instructions" - Available in various contexts.
 *
 * @function
 * @name createContextMenus
 * @returns {void}
 *
 * @requires chrome.contextMenus
 *
 * @example
 * createContextMenus();
 */
export function createContextMenus() {
  chrome.contextMenus.create({
    title: 'Remember text snippet',
    id: 'remember-text-snippet',
    contexts: ['selection', 'action'],
  });

  chrome.contextMenus.create({
    title: 'Generate question',
    id: 'generate-question-from-tab',
    contexts: [
      'page',
      'frame',
      'link',
      'editable',
      'image',
      'video',
      'audio',
      'browser_action',
      'page_action',
      'action',
    ],
  });

  chrome.contextMenus.create({
    title: 'Get started / instructions',
    id: 'keepalive-get-started',
    contexts: [
      'page',
      'frame',
      'link',
      'editable',
      'image',
      'video',
      'audio',
      'browser_action',
      'page_action',
      'action',
    ],
  });
}
