import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.sass';
import { Page404 } from './pages/404/Page404';
import { Authorization } from './pages/Authorization/Authorization';
import { Contacts } from './pages/Contacts/Contacts';
import { Main } from './pages/Main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="authorization" element={<Authorization />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
