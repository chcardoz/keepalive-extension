import 'webextension-polyfill';
import { exampleThemeStorage, textSnippetStorage } from '@chrome-extension-boilerplate/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

exampleThemeStorage.subscribe(() => {
  console.log('theme changed');
  exampleThemeStorage.get().then(theme => {
    console.log('theme', theme);
  });
});

textSnippetStorage.subscribe(() => {
  console.log('text snippet changed');
  textSnippetStorage.get().then(text => {
    console.log('text', text);
  });
});

chrome.contextMenus.onClicked.addListener(genericOnClick);

// Generic onclick callback function
async function genericOnClick(info: chrome.contextMenus.OnClickData, tabs: chrome.tabs.Tab | undefined) {
  switch (info.menuItemId) {
    case 'remember-text-snippet':
      if (info.selectionText) {
        textSnippetStorage
          .set(info.selectionText)
          .then(() => {
            console.log('Text snippet stored: ' + info.selectionText);
          })
          .catch(err => {
            console.error('Failed to store text snippet', err);
          });
      }
      break;
    case 'generate-question':
      console.log('Generate question: ' + info.selectionText + ' from tab: ' + tabs?.url);
      try {
        if (tabs?.id) {
          await chrome.sidePanel.open({ tabId: tabs.id });
        }
      } catch (err) {
        console.error('Failed to open side panel', err);
      }
      break;
    default:
      break;
  }
}

chrome.runtime.onInstalled.addListener(function () {
  // Create a parent item and two children.
  chrome.contextMenus.create({
    title: 'Keep alive actions',
    id: 'parent',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    title: 'Remember text snippet',
    parentId: 'parent',
    id: 'remember-text-snippet',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    title: 'Generate question from text snippet',
    parentId: 'parent',
    id: 'generate-question',
    contexts: ['selection', 'page'],
  });
});
