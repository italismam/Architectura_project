import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Root } from './components/views/Root/Root';
import './App.css';
import "./styles/calendar.scss"
import "./styles/day-schedule.scss"
import "./styles/schedule-editor.scss"
import "./styles/time-input.scss"
import "./styles/text-input.scss"
import "./styles/button.scss"
import "./styles/cinema-schedule.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Root/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
