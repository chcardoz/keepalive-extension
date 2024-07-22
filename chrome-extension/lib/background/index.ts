import 'webextension-polyfill';
import { createContextMenus, genericOnClick, handleQuestionAnswer } from './listeners';

chrome.contextMenus.onClicked.addListener(genericOnClick);
chrome.runtime.onMessage.addListener(handleQuestionAnswer);
chrome.runtime.onInstalled.addListener(createContextMenus);
