import React, { useState } from 'react';
import TablePeer from './tablePeer';
import Connect from './connect';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ListChannel() {
  var [value, setValue] = useState('');
  var [copied, setCopied] = useState(false);

  function onChange(value) {
    setValue(value);
  }

  function onCopy() {
    setCopied(true);
  }

  return (
    <div className='col'>
      <div className='row'>
        <div className='col-4'>
          <div className='magin-bottom'>
            <Connect name='Enter address to Connect Channel' />
          </div>
          <div className='magin-bottom'>
            <Connect name='Enter address to Close Channel' />
          </div>
        </div>
        <div className='col-8'>
          <TablePeer />
        </div>
      </div>

      <div className='box col magin-bottom'>
        <div className='row  magin-bottom'>
          <div className='col-2'>
            <label>Create Invoice</label>
          </div>
          <div className='col-9'></div>
          <div className='col-1'>
            <div className='col'>
              <div className='row justify-content-end'>
                <button className='btn btn-primary'>Create</button>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='row'>
            <input
              type='text'
              className='form-control col'
              onChange={e => onChange(e.target.value)}
              value={value}
            />
            <CopyToClipboard onCopy={onCopy} text={value}>
              <button className='btn btn-primary'>Copy</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>

      <div className=''>
        <Connect name='Send Payment' />
      </div>
    </div>
  );
}
