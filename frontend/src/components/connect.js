import React from 'react';

export default function Connect(props) {
  return (
    <form className='box'>
      <div className='form-group'>
        <label>{props.name}</label>
        <input
          type='text'
          className='form-control'
          id='address'
          placeholder='Enter 02x... 03x...'
        />
      </div>

      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
}
