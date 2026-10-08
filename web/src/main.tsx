import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/quicksand';
import './styles/global.css';
import App from './App';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// En producción el HTML viene pre-renderizado y React solo lo hidrata.
// En desarrollo (pnpm dev) el contenedor llega vacío y se renderiza desde cero.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
