import { linkStorage, questionStorage, textSnippetStorage } from '@chrome-extension-boilerplate/storage';
import { getQuestion, sendMessage } from './queries';

// Generic onclick callback function
export async function genericOnClick(info: chrome.contextMenus.OnClickData, tabs: chrome.tabs.Tab | undefined) {
  switch (info.menuItemId) {
    case 'remember-text-snippet':
      if (info.selectionText) {
        textSnippetStorage
          .set(info.selectionText)
          .then(() => {
            console.log('Text snippet stored: ' + info.selectionText);
            sendMessage(info?.selectionText, tabs);
          })
          .catch(err => {
            console.error('Failed to store text snippet', err);
          });
      }
      break;
    case 'generate-question-from-tab':
      questionStorage.set('Generating question...');
      linkStorage.set('Loading...');
      getQuestion().then(q => {
        questionStorage.set(q.question);
        linkStorage.set(q.link);
      });
      if (tabs?.id) await chrome.sidePanel.open({ tabId: tabs.id });
      break;
    default:
      break;
  }
}
