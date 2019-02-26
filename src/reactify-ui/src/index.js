import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

let myComponent = document.getElementById('reactify-django-ui')
if (myComponent !== null){
	ReactDOM.render(<App />, myComponent);
}


// let myComponent2 = document.getElementById('reactify-django-ui-2')

// if (myComponent2 !== null){
// 	ReactDom.render(<App />, myComponent2);
// }

