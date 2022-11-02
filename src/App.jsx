import styled from "styled-components";

import Header from "./components/Header";
import Home from "./pages/Home";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Home />
    </Wrapper>
  );
}

export default App;
