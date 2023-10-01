import styled from "styled-components";
import Router from "./Router";

const Container = styled.div`
  background-color:${props => props.theme.bgColor};
`
const H1 = styled.h1`
color:${props => props.theme.textColor};
`

function App() {
  return (
    <Container>
      <H1>hello</H1>
      <Router/>
    </Container>
  );
}

export default App;
