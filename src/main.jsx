import { createRoot } from 'react-dom/client'
// import './index.css'
//import App from './App.jsx'
import "./QrCode.css";
import { QrCode } from './QrCode.jsx'


createRoot(document.getElementById('root')).render(
    <QrCode />
)
