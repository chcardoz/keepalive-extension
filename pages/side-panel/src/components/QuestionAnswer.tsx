import {
  answerStorage,
  correctAnswerStorage,
  linkStorage,
  questionStorage,
} from '@chrome-extension-boilerplate/storage';
import { useState } from 'react';
import { Textarea } from './TextArea';
import { Button } from './Button';
import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';

export const QuestionAnswer = () => {
  const question = useStorageSuspense(questionStorage);
  const link = useStorageSuspense(linkStorage);
  const [_answer, setAnswer] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
      if (!tabs[0]) return;
      if (!tabs[0].url) return;
      const url = new URL(tabs[0].url);
      const message = {
        question: question,
        answer: _answer,
        host: url.host,
        path: url.pathname,
      };
      chrome.runtime.sendMessage(message);
      await answerStorage.set(_answer);
    });
  };
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col w-full p-5 gap-2">
      <p className="font-bold text-lg">Question</p>
      <p className="text-sm text-gray-600">Question generated based on what you saved on this page.</p>
      <p className="text-sm overflow-y-scroll h-[30%] rounded-lg bg-red-50 p-2">{question}</p>
      <a href={link} className="flex flex-row gap-1" target="_blank" rel="noreferrer">
        <p className="text-sm">Source: </p>
        <p className="text-sm underline overflow-ellipsis">{link}</p>
      </a>
      <Textarea value={_answer} onChange={handleChange} className="min-h-[40%]" placeholder="Answer" />
      <Button onClick={handleSubmit} className="max-w-lg" variant="default">
        Submit
      </Button>
      <p className="text-sm text-gray-600">Click Ctrl + B to close this panel</p>
    </div>
  );
};

export const ShowAnswer = () => {
  const question = useStorageSuspense(questionStorage);
  const answer = useStorageSuspense(answerStorage);
  const correctAnswer = useStorageSuspense(correctAnswerStorage);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col w-full p-5 gap-2">
      <p className="font-bold text-lg">Question</p>
      <p className="text-sm overflow-y-scroll h-[30%] rounded-lg bg-red-50 p-2">{question}</p>
      <p className="font-bold text-lg">You answered:</p>
      <p className="text-sm overflow-y-scroll h-[30%] rounded-lg bg-gray-50 p-2">{answer}</p>
      <p className="font-bold text-lg">What you saved:</p>
      <p className="text-sm overflow-y-scroll h-[30%] rounded-lg bg-green-50 p-2">{correctAnswer}</p>
      <p className="text-sm text-gray-600">Click Ctrl + B to close this panel</p>
    </div>
  );
};
