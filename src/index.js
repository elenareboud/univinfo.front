import { createRoot } from 'react-dom/client';

import './index.scss';
import { App } from './components/app';

// const rootDOMElement = document.getElementById('app');
// const root = createRoot(rootDOMElement);
const root = createRoot(document.getElementById('root'));
root.render(<App />);