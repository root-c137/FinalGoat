import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./Components/Header/Header";
import {Home} from "./Pages/Home/Home";
import {Register} from "./Pages/Register/Register";
import {Login} from "./Pages/Login/Login";
import {Reset} from "./Pages/Reset/Reset";
import {Footer} from "./Components/Footer/Footer";
import {Account} from "./Pages/Account/Account";
import {Page404} from "./Pages/404/Page404";
import {LegalNotice} from "./Pages/Legalnotice/LegalNotice";
import {PrivacyPolicy} from "./Pages/PrivacyPolicy/PrivacyPolicy";

if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
    console.error = () => {}
    console.debug = () => {}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
         <Header />
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/reset" element={<Reset/>}/>
              <Route path="/account" element={<Account/>}/>
              <Route path="/legal-notice" element={<LegalNotice />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<Page404 />}/>
          </Routes>
          <Footer />
      </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
