import { Content } from './styles'

export function Sidebar(){
  return (
    <nav>
      <Content>
        <a href="/">Commits</a>
        <a href="/">Pull Requests</a>
        <a href="/">Issues</a>
      </Content>
    </nav>
  )
}