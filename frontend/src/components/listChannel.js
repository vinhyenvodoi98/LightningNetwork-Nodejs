import React, { useState } from 'react';
import TableChannel from './tableChannel';
import ConnectChannel from './connectChannel';
import ConnectPeer from './connectPeer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';

export default function ListChannel() {
  const [paymentReq, setPaymentReq] = useState('');
  const [copied, setCopied] = useState(false);
  const [invoice, setInvoice] = useState('');

  function onCopy() {
    setCopied(true);
  }

  async function createInvoice() {
    try {
      var pay_req = await axios.post('http://localhost:4000/addInvoice', {
        amt_paid: invoice
      });
      setPaymentReq(pay_req.data.payment_request);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='col'>
      <div className='row'>
        <div className='col-4'>
          <div className='magin-bottom'>
            <ConnectChannel url='http://localhost:4000/openChannel' />
          </div>
        </div>
        <div className='col-8'>
          <TableChannel
            listUrl='http://localhost:4000/listChannels'
            disconnectUrl='http://localhost:4000/closeChannel'
          />
        </div>
      </div>

      <div className='box col magin-bottom'>
        <div className='magin-bottom'>
          <div className='col-2'>
            <label>Create Invoice</label>
          </div>
          <div className='row'>
            <div className='magin-bottom col-6'>
              <label>Enter number of satoshis to invoice</label>
              <div className='col'>
                <div className='row'>
                  <input
                    type='text'
                    className='form-control col'
                    onChange={e => setInvoice(e.target.value)}
                    value={invoice}
                  />
                  <div className='col-2'>
                    <div className='row justify-content-end'>
                      <button className='btn btn-primary' onClick={createInvoice}>
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='row'>
            <input
              type='text'
              className='form-control col'
              onChange={e => setPaymentReq(e.target.value)}
              value={paymentReq}
            />
            <CopyToClipboard onCopy={onCopy} text={paymentReq}>
              <button className='btn btn-primary'>Copy</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>

      <div className='magin-bottom'>
        <ConnectPeer name='Send Payment' url='http://localhost:4000/sendPayment' />
      </div>

      <div className=''>
        <ConnectPeer name='Close Channel' url='http://localhost:4000/closeChannel' />
      </div>
    </div>
  );
}
