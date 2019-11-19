import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';

export default function Sidebar() {
  return (
    <div className='box' id='sidebar'>
      <ul className='nav navbar-nav side-bar'>
        <li className='side-bar active'>
          <Link to='/'>
            <span className='glyphicon glyphicon-list'>&nbsp;</span>Dashboard
          </Link>
        </li>
        <li className='side-bar'>
          <Link to='/listPeer'>
            <span className='glyphicon glyphicon-flag'>&nbsp;</span>List Peer
          </Link>
        </li>
        <li className='side-bar'>
          <Link to='/listChannel'>
            <span className='glyphicon glyphicon-star'>&nbsp;</span>List Channel
          </Link>
        </li>
        <li className='side-bar'>
          <Link to='/'>
            <span className='glyphicon glyphicon-certificate'>&nbsp;</span>Officials
          </Link>
        </li>
        <li className='side-bar'>
          <Link to='/'>
            <span className='glyphicon glyphicon-signal'>&nbsp;</span>Statistics
          </Link>
        </li>
        {/* <li className='side-bar'>
          <Link to='#'>
            <span className='glyphicon glyphicon-cog'>&nbsp;</span>Settings
          </Link>
        </li> */}
      </ul>
    </div>
  );
}
