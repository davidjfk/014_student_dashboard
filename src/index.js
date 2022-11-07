import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import { Provider } from 'react-redux';
import App from './components/app/App';
import GlobalStyle from "./components/styles/GlobalCss.styled";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <GlobalStyle/>
        <App />
    </Provider>
  </React.StrictMode>
);

