import '@src/SidePanel.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import {
  answerStorage,
  exampleThemeStorage,
  linkStorage,
  questionStorage,
} from '@chrome-extension-boilerplate/storage';
import { Textarea } from './TextArea';
import { Button } from './Button';
import { useState } from 'react';

const SidePanel = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const question = useStorageSuspense(questionStorage);
  const link = useStorageSuspense(linkStorage);
  const [_answer, setAnswer] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    const message = {
      question: question,
      answer: _answer,
    };
    chrome.runtime.sendMessage(message);
    await answerStorage.set(_answer);
  };

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center w-full h-full p-10"
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#222',
      }}>
      <header
        className="h-full flex flex-col justify-around gap-2"
        style={{ color: theme === 'light' ? '#222' : '#eee' }}>
        <p className="font-bold text-lg">Question</p>

        <p className="text-sm">{question}</p>
        <a href={link} target="_blank" rel="noreferrer">
          <p className="text-sm">{link}</p>
        </a>
        <Textarea value={_answer} onChange={handleChange} className="h-1/2" placeholder="Answer" />
        <Button onClick={handleSubmit} variant="default">
          Submit
        </Button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
