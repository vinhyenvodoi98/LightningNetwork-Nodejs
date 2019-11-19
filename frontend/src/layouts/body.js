import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Sidebar from '../components/sidebar';
import Wallet from '../components/wallet';
import ListPeer from '../components/listPeer';
import ListChannel from '../components/listChannel';

import './body.css';

export default function Body() {
  return (
    <div className='body-layout'>
      <div className='row'>
        <BrowserRouter>
          <div className='col-2'>
            <Switch>
              <Sidebar className='col-2' />
            </Switch>
          </div>
          <div className='col-10 box'>
            <Switch>
              <Route exact path='/' component={Wallet} />
              <Route exact path='/listPeer' component={ListPeer} />
              <Route exact path='/listChannel' component={ListChannel} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}
