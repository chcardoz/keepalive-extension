import { createRoot } from 'react-dom/client';
import App from '@src/app';
// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';
root.className = 'relative';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';
rootIntoShadow.className = 'fixed bottom-0 left-0 bg-white rounded-lg shadow-lg z-50 m-10';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = tailwindcssOutput;
shadowRoot.appendChild(styleElement);

createRoot(rootIntoShadow).render(<App />);
