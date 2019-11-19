import React from 'react';
import TablePeer from './tablePeer';
import Connect from './connect';

export default function ListPeer() {
  return (
    <div className='col'>
      <div className='row'>
        <div className='col-4'>
          <Connect name='Enter address to connect Peer' />
        </div>
        <div className='col-8'>
          <TablePeer />
        </div>
      </div>
    </div>
  );
}
