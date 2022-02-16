import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

function Header({sidebarTriggerID, ...props}) {
  return (
    <div className='main-header'>
      {/* <a href="#" data-target={sidebarTriggerID} className="sidenav-trigger"><i className="material-icons menu-icon">menu</i></a>
      <h1 className='main-title'>Gerenciador de repositórios</h1> */}
      <div className='navbar-fixed'>
        <nav>
          <div className="nav-wrapper">
            <a href="#" data-target={sidebarTriggerID} className="sidenav-trigger"><i className="material-icons menu-icon">menu</i></a>
            <a href="#" className="brand-logo center">Gerenciador de repositórios</a>

            <ul className="right hide-on-med-and-down">
              <li>
                <Link className="waves-effect search-nav-link" to='/'>
                    <i className="material-icons">search</i>
                    Pesquisar repositórios
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header