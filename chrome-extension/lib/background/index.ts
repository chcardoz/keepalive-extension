import 'webextension-polyfill';
import { sendQuestionAnswer } from './queries';
import { genericOnClick } from './listeners';
chrome.contextMenus.onClicked.addListener(genericOnClick);
chrome.runtime.onMessage.addListener(async request => {
  if (request.answer) {
    console.log('Question: ' + request.question);
    console.log('Answer: ' + request.answer);
    await sendQuestionAnswer(request.question, request.answer);
  }
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Remember text snippet',
    id: 'remember-text-snippet',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    title: 'Generate question',
    id: 'generate-question-from-tab',
    contexts: ['all'],
  });
});
