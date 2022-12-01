import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css'
import './styles/index.css';
import MemoryGame from './components/memoryGame';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
  <div>
  <div className='logo'>
  <h1 className='logoTitle'>Memory Test</h1>
  <p className='logoDescription'>with fruits and veggies</p>
  </div>
<MemoryGame></MemoryGame>
  </div>
  );
