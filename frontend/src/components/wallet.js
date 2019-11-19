import React from 'react';

import './wallet.css';

export default function Wallet() {
  return (
    <div className='row justify-content-end'>
      <div className='col-5 box'>
        <div className='justify-content-center'>
          <p>Balance</p>
        </div>
        <div className='row justify-content-between'>
          <div className='col-4'>100000</div>
          <div className='col-4'>Satoshi</div>
        </div>
      </div>
    </div>
  );
}
