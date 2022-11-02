import styled from "styled-components";
import SelectIconImg from "../assets/select-icon.svg";
import GenerateIconImg from "../assets/generate-icon.svg";
import { useState } from "react";

const ToolBarWrapper = styled.div`
  width: 50px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  border-right: 1px solid #ebedf2;
  background-color: #fcfcfc;
`;

const SelectButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${(props) =>
    props.isSelectMode ? "#D5D9E2" : "transparent"};
  border-radius: 5px;
`;

const SelectIcon = styled.img``;

const BoxGenerateButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${(props) =>
    !props.isSelectMode ? "#D5D9E2" : "transparent"};
  border-radius: 5px;
`;

const GenerateIcon = styled.img``;

const ToolBar = () => {
  const [isSelectMode, setIsSelectMode] = useState(true);

  const selectButtonClick = () => {
    setIsSelectMode(true);
  };

  const generateButtonClick = () => {
    setIsSelectMode(false);
  };

  return (
    <ToolBarWrapper>
      <SelectButton
        type="button"
        onClick={selectButtonClick}
        isSelectMode={isSelectMode}
      >
        <SelectIcon src={SelectIconImg} alt="선택 버튼" />
      </SelectButton>
      <BoxGenerateButton
        type="button"
        onClick={generateButtonClick}
        isSelectMode={isSelectMode}
      >
        <GenerateIcon src={GenerateIconImg} alt="생성 버튼" />
      </BoxGenerateButton>
    </ToolBarWrapper>
  );
};

export default ToolBar;
