import 'webextension-polyfill';
import { exampleThemeStorage } from '@chrome-extension-boilerplate/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

exampleThemeStorage.subscribe(() => {
  console.log('theme changed');
  exampleThemeStorage.get().then(theme => {
    console.log('theme', theme);
  });
});

// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function.
function genericOnClick(info: chrome.contextMenus.OnClickData, tabs: chrome.tabs.Tab | undefined) {
  console.log('genericOnClick', info, tabs);
  switch (info.menuItemId) {
    case 'remember-text-snippet':
      // Remember text snippet
      console.log('Remember text snippet' + info.selectionText);
      break;
    case 'generate-question':
      // Generate question
      console.log('Generate question' + info.selectionText);
      break;
    default:
      // Standard context menu item function
      console.log('Standard context menu item clicked.' + info.selectionText);
  }
}

chrome.runtime.onInstalled.addListener(function () {
  // Create a parent item and two children.
  const parent = chrome.contextMenus.create({
    title: 'Keep alive actions',
    id: 'parent',
  });
  chrome.contextMenus.create({
    title: 'Remember text snippet',
    parentId: parent,
    id: 'child1',
  });
  chrome.contextMenus.create({
    title: 'Generate question',
    parentId: parent,
    id: 'child2',
  });
});
