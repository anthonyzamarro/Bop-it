import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './scss/styles.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
