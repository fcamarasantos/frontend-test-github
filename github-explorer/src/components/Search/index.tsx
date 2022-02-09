import { Container } from './styles';

export function Search(){
  return (
    <Container>
      <input type="text" placeholder="Digite o nome de um repositorio" />
      <button>Pesquisar</button>
    </Container>
  )
}