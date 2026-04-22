import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Timeline from './pages/Timeline';
import Hub from './pages/Hub';
import { ProgressProvider } from './context/ProgressContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="journey" element={<Journey />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="hub" element={<Hub />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  </StrictMode>
);
