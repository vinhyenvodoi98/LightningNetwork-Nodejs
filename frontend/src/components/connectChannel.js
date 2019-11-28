import React, { useState } from 'react';
import axios from 'axios';

export default function ConnectChannel(props) {
  const [pub_key, setPubkey] = useState('');
  const [local_fund, setLocalFund] = useState('');
  const [push_fund, setPushFund] = useState('');

  async function connect() {
    try {
      await axios.post(props.url, {
        pub_key,
        local_fund,
        push_fund
      });
    } catch (error) {
      console.error(error);
    }
  }

  function onChangeAddr(value) {
    setPubkey(value);
  }
  function onChangeLocal(value) {
    setLocalFund(value);
  }
  function onChangePush(value) {
    setPushFund(value);
  }

  return (
    <form className='box'>
      <div className='form-group'>
        <label>Enter address to Connect Channel</label>
        <input
          type='text'
          className='form-control'
          onChange={e => onChangeAddr(e.target.value)}
          placeholder='Enter 02x... 03x...'
        />
      </div>

      <div className='form-group'>
        <label>Enter local funding mount</label>
        <input
          type='text'
          className='form-control'
          onChange={e => onChangeLocal(e.target.value)}
          placeholder='100000'
        />
      </div>

      <div className='form-group'>
        <label>Enter the number of satoshis to push to the remote side</label>
        <input
          type='text'
          className='form-control'
          onChange={e => onChangePush(e.target.value)}
          placeholder='0'
        />
      </div>

      <button type='submit' className='btn btn-primary' onClick={connect}>
        Submit
      </button>
    </form>
  );
}
