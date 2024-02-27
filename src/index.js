import { createRoot } from 'react-dom/client';

import './index.scss';
import { App } from './components/app';

const root = createRoot(document.getElementById('app'));
root.render(<App />);