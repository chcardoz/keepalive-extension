import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import {
  answerStorage,
  errorStringStorage,
  linkStorage,
  questionStorage,
  sectionIdStorage,
} from '@chrome-extension-boilerplate/storage';
import { Textarea } from './TextArea';
import { Button } from './Button';
import { useState } from 'react';
import { ErrorMessage, LoadingMessage, SuccessMessage } from './LogMessage';

const SidePanel = () => {
  const question = useStorageSuspense(questionStorage);
  const link = useStorageSuspense(linkStorage);
  const section = useStorageSuspense(sectionIdStorage);
  const errorMessage = useStorageSuspense(errorStringStorage);
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

  if (section === 'loading') {
    return <LoadingMessage />;
  }

  if (section === 'success') {
    return <SuccessMessage message="Your message has been sent successfully!" />;
  }

  if (section === 'error') {
    return <ErrorMessage message={errorMessage} />;
  }

  if (section === 'test') {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-around w-full p-10 gap-2">
        <p className="text-sm">
          Based on what you saved, we have generated a question for you. Feel free to answer or ignore it. Click Ctrl +
          B to close this panel
        </p>
        <p className="font-bold text-md">Question</p>
        <p className="text-sm overflow-y-scroll max-h-10">{question}</p>
        <p className="font-bold text-md">Link</p>
        <a href={link} target="_blank" rel="noreferrer">
          <p className="text-sm">{link}</p>
        </a>
        <p className="font-bold text-md">Answer</p>
        <Textarea value={_answer} onChange={handleChange} className="min-h-[50%]" />
        <Button onClick={handleSubmit} variant="default">
          Submit
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center w-full h-full p-10">
      <header className="h-full flex flex-col justify-around gap-2">
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

export default withErrorBoundary(
  withSuspense(SidePanel, <div> Loading ... </div>),
  <ErrorMessage message="Error Occur" />,
);
