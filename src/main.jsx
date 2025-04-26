import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { UserContextProvider } from './store/UserContextProvider.jsx';

createRoot(document.getElementById('root')).render(
    <HashRouter basename="/">
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </HashRouter>
);
