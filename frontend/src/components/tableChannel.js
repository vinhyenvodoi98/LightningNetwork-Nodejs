import React, { useState, initialState, useEffect } from 'react';
import axios from 'axios';

export default function TableChannel(props) {
  const [listChannels, setListChannel] = useState(initialState);

  async function disconnectPeer(pub_key) {
    try {
      await axios.post(props.disconnectUrl, {
        pub_key
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchData() {
    try {
      const response = await axios.get(props.listUrl);

      setListChannel(response.data.channels);
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
          <th scope='col'>Channel Point</th>
          <th scope='col'>Local Balance</th>
          <th scope='col'>Remove Balance</th>
          <th scope='col'>Fee</th>
          <th scope='col'>Disconnect</th>
        </tr>
      </thead>

      {listChannels === undefined || Object.keys(listChannels).length === 0 ? (
        <tbody>
          <tr>
            <th scope='row'></th>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {listChannels.map((channel, index) => (
            <tr key={index}>
              <th scope='row'>1</th>
              <td>{channel.channel_point}</td>
              {channel.local_balance ? (
                <>
                  <td>{channel.local_balance}</td>
                  <td>{channel.capacity - channel.local_balance - channel.commit_fee}</td>
                </>
              ) : (
                <>
                  <td>{channel.capacity - channel.remote_balance - channel.commit_fee}</td>
                  <td>{channel.remote_balance}</td>
                </>
              )}
              <td>{channel.commit_fee}</td>
              <td>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={e => disconnectPeer(channel.channel_point)}>
                  Disconnect
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}
