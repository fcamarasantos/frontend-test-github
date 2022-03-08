import React, { useEffect } from 'react'
import './Sidebar.scss';

import M from 'materialize-css';
import { Link } from 'react-router-dom';

function Sidebar({triggerID, ...props}) {
    useEffect(() => {
        M.AutoInit();
    });
    
    const dashboardBaseUrl = `/Dashboard`;
  return (
    <div className='sidebar-container'>
        <ul id={`${triggerID}`} className="sidenav">
            <li className='sidenav-close' href='#'><p>Fechar</p></li>
            <li>
                <div className="user-view">
                    <div className="background">
                        <img src="https://picsum.photos/300" />
                    </div>
                </div>
            </li>
            <li>
                <Link className="waves-effect" to={`${dashboardBaseUrl}/search`}>
                    <i className="material-icons">search</i>
                    Pesquisar repositórios
                </Link>
                {props.tabs.map((item) => (
                    <a className="waves-effect" key={item.title} onClick={() => {props.navItemClicked(item)}}>
                        <i className="material-icons">{item.icon}</i>
                        {item.title}
                    </a>
                ))}
            </li>
        </ul>
    </div>
  )
}

export default Sidebar