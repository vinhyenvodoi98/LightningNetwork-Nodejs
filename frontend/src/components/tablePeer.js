import React, { useState, initialState, useEffect } from 'react';
import axios from 'axios';

export default function TablePeer() {
  const [listPeers, setlistPeers] = useState(initialState);

  async function disconnectPeer(pub_key) {
    try {
      await axios.post('http://localhost:4000/disconnectPeer', {
        pub_key
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:4000/listPeers');

      setlistPeers(response.data.listPeers);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <table className='table table-hover box'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Identity Pubkey</th>
          <th scope='col'>Address</th>
          <th scope='col'>Disconnect</th>
        </tr>
      </thead>

      {listPeers === undefined || Object.keys(listPeers).length === 0 ? (
        <tbody>
          <tr>
            <th scope='row'></th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {listPeers.peers.map((peer, index) => (
            <tr key={index}>
              <th scope='row'>1</th>
              <td>{peer.pub_key}</td>
              <td>{peer.address}</td>
              <td>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={e => disconnectPeer(peer.pub_key)}>
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}
