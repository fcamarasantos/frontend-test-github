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
            <a className='sidenav-close' href='#'><i className="material-icons">menu</i></a>
            <li>
                <div className="user-view">
                    <div className="background">
                        <img src="https://picsum.photos/200" />
                    </div>
                    <a href="#"><img className="circle" src="images/yuna.jpg" /></a>
                    <a href="#"><span className="white-text name">John Doe</span></a>
                    <a href="#"><span className="white-text email">jdandturk@gmail.com</span></a>
                </div>
            </li>
            <li>
                <Link className="waves-effect" to={`${dashboardBaseUrl}/search`}>
                    <i className="material-icons">search</i>
                    Pesquisar repositórios
                </Link>
                {/* <Link className="waves-effect" to={`${dashboardBaseUrl}/commits`}>
                    <i className="material-icons">format_list_bulleted</i>
                    Commits 
                </Link>
                <Link className="waves-effect" to={`${dashboardBaseUrl}/issues`}>
                    <i className="material-icons">error</i>
                    Issues
                </Link>
                <Link className="waves-effect" to={`${dashboardBaseUrl}/pullRequests`}>
                    <i className="material-icons">move_to_inbox</i>
                    Pull requests
                </Link>
                <a className="waves-effect">
                    <i className="material-icons">move_to_inbox</i>
                    Pull requests
                </a> */}
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