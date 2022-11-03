import styled from "styled-components";
import Canvas from "../components/Canvas";
import ToolBar from "../components/ToolBar";

const HomeWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-grow: 1;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <ToolBar />
      <Canvas />
    </HomeWrapper>
  );
};

export default Home;
