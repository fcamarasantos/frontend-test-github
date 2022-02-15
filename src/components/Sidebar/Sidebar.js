import React, { useEffect } from 'react'
import './Sidebar.scss';

import M from 'materialize-css';
import { Link } from 'react-router-dom';

function Sidebar({triggerID, ...props}) {
    useEffect(() => {
        M.AutoInit();
    });
    

  return (
    <div className='sidebar-container'>
        <ul id={`${triggerID}`} className="sidenav">
            <a className='sidenav-close' href='#'><i className="material-icons">menu</i></a>
            <li>
                <div className="user-view">
                    <div className="background">
                        <img src="https://picsum.photos/200" />
                    </div>
                <a href="#user"><img className="circle" src="images/yuna.jpg" /></a>
                <a href="#name"><span className="white-text name">John Doe</span></a>
                <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
            </div>
            </li>
            <li>
                <Link className="waves-effect" to='/search'>
                    <i className="material-icons">search</i>
                    Pesquisar repositórios
                </Link>
                <Link className="waves-effect" to='/commits'>
                    <i className="material-icons">format_list_bulleted</i>
                    Commits 
                </Link>
                <Link className="waves-effect" to='/issues'>
                    <i className="material-icons">error</i>
                    Issues
                </Link>
                <Link className="waves-effect" to='/pullRequests'>
                    <i className="material-icons">move_to_inbox</i>
                    Pull requests
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar