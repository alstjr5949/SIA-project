import styled from "styled-components";

const StyledHeader = styled.header`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600&display=swap");
  font-family: "Noto Sans", sans-serif;
  border-bottom: 1px solid #ebedf2;
  background-color: #fcfcfc;
`;

const TopicTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  padding: 20px 50px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <TopicTitle>Dataset Label</TopicTitle>
    </StyledHeader>
  );
};

export default Header;
