import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import App from './App.tsx'
import './index.css'

// Initialize Google Analytics 4
const gaMeasurementId = import.meta.env.REACT_APP_GA_MEASUREMENT_ID
if (gaMeasurementId) {
  ReactGA.initialize(gaMeasurementId)
}

createRoot(document.getElementById("root")!).render(<App />);
