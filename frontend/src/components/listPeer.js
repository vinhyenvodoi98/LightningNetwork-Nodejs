import React from 'react';
import TablePeer from './tablePeer';
import ConnectPeer from './connectPeer';

export default function ListPeer() {
  return (
    <div className='col'>
      <div className='row'>
        <div className='col-4'>
          <ConnectPeer
            name='Enter address to connect Peer'
            url='http://localhost:4000/connectPeer'
          />
        </div>
        <div className='col-8'>
          <TablePeer
            listUrl='http://localhost:4000/listPeers'
            disconnectUrl='http://localhost:4000/disconnectPeer'
          />
        </div>
      </div>
    </div>
  );
}
