import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Roadmap from './roadmap';

const root = createRoot(document.getElementById('root'));
root.render(<Roadmap />); 