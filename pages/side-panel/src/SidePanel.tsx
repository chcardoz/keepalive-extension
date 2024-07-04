import '@src/SidePanel.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { exampleThemeStorage, textSnippetStorage } from '@chrome-extension-boilerplate/storage';
import { ComponentPropsWithoutRef } from 'react';

const SidePanel = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const textSnippet = useStorageSuspense(textSnippetStorage);

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === 'light' ? '#eee' : '#222',
      }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#222' : '#eee' }}>
        <img src={chrome.runtime.getURL('side-panel/logo.svg')} className="App-logo" alt="logo" />
        <p>{textSnippet}</p>
        <ToggleButton>Toggle theme</ToggleButton>
      </header>
    </div>
  );
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  const theme = useStorageSuspense(exampleThemeStorage);
  return (
    <button
      className={
        props.className +
        ' ' +
        'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
        (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
      }
      onClick={exampleThemeStorage.toggle}>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
