import React, { useState, useEffect } from 'react';
import './app.css';
import ApiClient from './api_client';
import loadSettings from './load_settings';
import SubtotalValue from './subtotal_value';
import Loading from './loading';
import Prism from 'prismjs';
import PrismJsx from 'prismjs/components/prism-jsx.min';

import 'prismjs/themes/prism.css';

window.Prism = Prism;  Prism.highlightAll();

function App() {
  const promises = [];
  const settings = loadSettings();
  const apiClient = new ApiClient(settings);
  const [cart,setCart] = useState({});
    
  useEffect(() => {
    // Using an IIFE
    (async function anyNameFunction() {
      setCart(await apiClient.getCart(settings));
    })();
  }, []);
  
  if (Object.keys(cart).length === 0) {
    return <Loading />
  }
  
  setTimeout(()=> {
    Prism.highlightAll()
  }, 500);
  
  return (
    
    <div className="container">

      <div className="feature">
        <div className="code">
          <pre>
            <code className="language-jsx">
            {`<SubtotalValue cart={cart} />`}
            </code>
          </pre>
        </div>
        <div className="example">
          <SubtotalValue cart={cart} />
        </div>
      </div>
    </div>
    

  );
}

export default App;
