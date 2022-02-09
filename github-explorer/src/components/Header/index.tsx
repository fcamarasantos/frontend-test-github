import { Sidebar } from '../Sidebar'
import { Container, Content } from './styles'

export function Header(){
  return (
    <Container>
      <Content>
        <h1>Github Explorer</h1>
        <Sidebar />
      </Content>
    </Container>
  )
}