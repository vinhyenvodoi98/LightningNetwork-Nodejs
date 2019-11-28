import React, { useState } from 'react';
import axios from 'axios';

export default function ConnectPeer(props) {
  const [value, setValue] = useState('');

  async function connect() {
    try {
      await axios.post(props.url, {
        pub_key: value
      });
    } catch (error) {
      console.error(error);
    }
  }

  function onChange(value) {
    setValue(value);
  }

  return (
    <form className='box'>
      <div className='form-group'>
        <label>{props.name}</label>
        <input
          type='text'
          className='form-control'
          id='address'
          onChange={e => onChange(e.target.value)}
          placeholder='Enter 02x... 03x...'
        />
      </div>

      <button type='submit' className='btn btn-primary' onClick={connect}>
        Submit
      </button>
    </form>
  );
}
