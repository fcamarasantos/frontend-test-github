import { Link } from 'react-router-dom';
import { Content } from './styles'

export function Sidebar(){
  return (
    <nav>
      <Content>
        <Link to="/commits">Commits</Link>
        <Link to="/pullrequests">Pull Requests</Link>
        <Link to="/issues">Issues</Link>
      </Content>
    </nav>
  )
}