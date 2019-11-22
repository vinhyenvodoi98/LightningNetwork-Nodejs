import React, { useState, useEffect, initialState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import './wallet.css';

export default function Wallet() {
  const [balance, setBalance] = useState('');
  const [info, setInfo] = useState(initialState);

  var [copied, setCopied] = useState(false);

  function onCopy() {
    setCopied(true);
  }

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:4000/walletBalance');
      setBalance(response.data.balance.confirmed_balance);
      try {
        const response = await axios.get('http://localhost:4000/getInfo');
        setInfo(response.data.info);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='row justify-content-between'>
      <div className='col-2 box'>
        <div className='justify-content-center'>
          <p>BlockNumber</p>
        </div>
        <div>{info ? <div>{info.block_height}</div> : <></>}</div>
      </div>
      <div className='col-5 box'>
        <div className='justify-content-center'>
          <p>Balance</p>
        </div>
        <div className='row justify-content-between'>
          <div className='col-4'>{balance}</div>
          <div className='col-4'>Satoshi</div>
        </div>
      </div>
      <div className='col-4 box'>
        <div className='justify-content-center'>
          <p>Identity Pubkey:</p>
        </div>
        <div className='row'>
          {info ? (
            <>
              <input
                type='text'
                className='form-control col'
                disabled
                value={info.identity_pubkey}
              />

              <CopyToClipboard onCopy={onCopy} text={info.identity_pubkey}>
                <button className='btn btn-primary'>Copy</button>
              </CopyToClipboard>
            </>
          ) : (
            <>
              <input type='text' className='form-control col' disabled value={''} />
              <CopyToClipboard onCopy={onCopy} text={''}>
                <button className='btn btn-primary'>Copy</button>
              </CopyToClipboard>
            </>
          )}
        </div>
      </div>
      {/* <div className='col-2 box'>
        <div className='justify-content-center'>
          <p>Identity Pubkey:</p>
        </div>
        <div>
          <div>{info ? <div>{info.identity_pubkey}</div> : <></>}</div>
        </div>
      </div> */}
    </div>
  );
}
