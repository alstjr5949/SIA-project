import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isSelectModeAtom } from "../atom";
import RefreshImgIcon from "../assets/icon-upload.png";

const CanvasWrapper = styled.div`
  position: relative;
  height: 1080px;
`;

const ImgRefreshButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background-color: #d5d9e2;
  border-radius: 5px;
  z-index: 10;
  margin: 5px;
`;

const ImgRefreshIcon = styled.img``;

const ImgCanvas = styled.canvas`
  &.selectMode {
    position: absolute;
    top: 0;
    left: 0;
  }
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const DragCanvas = styled.canvas`
  &.selectMode {
    position: absolute;
    top: 0;
    left: 0;
  }
  background-color: transparent;
`;

const Canvas = () => {
  const dragCanvasRef = useRef(null);
  const imgCanvasRef = useRef(null);

  const isSelectMode = useRecoilValue(isSelectModeAtom);
  const [bgImg, setBgImg] = useState("");
  const [dragCtx, setDragCtx] = useState();
  const [imgCtx, setImgCtx] = useState();
  const [isDraw, setIsDraw] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [currentSquareIndex, setCurrentSquareIndex] = useState();
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  const [curPos, setCurPos] = useState({
    x: 0,
    y: 0,
  });
  const [dragPos, setDragPos] = useState({
    x: 0,
    y: 0,
  });
  const [squareArr, setSquareArr] = useState([]);

  // DragCanvas drag draw function
  const drawStart = (e) => {
    setIsDraw(true);
    setPos({
      x: e.pageX - 50 - dragCanvasRef.current.offsetLeft,
      y: e.pageY - 60 - dragCanvasRef.current.offsetTop,
    });
  };

  const drawSquare = (e) => {
    if (!isDraw) return;
    dragCtx.clearRect(
      0,
      0,
      dragCanvasRef.current.width,
      dragCanvasRef.current.height
    );
    dragCtx.strokeStyle = "#5668D9";
    dragCtx.lineWidth = 2;
    dragCtx.fillStyle = "rgb(221,225,247, 0.5)";
    let currentX = e.pageX - 50 - dragCanvasRef.current.offsetLeft;
    let currentY = e.pageY - 60 - dragCanvasRef.current.offsetTop;
    setCurPos({
      x: currentX,
      y: currentY,
    });
    dragCtx.strokeRect(pos.x, pos.y, currentX - pos.x, currentY - pos.y);
    dragCtx.fillRect(pos.x, pos.y, currentX - pos.x, currentY - pos.y);
  };

  const drawEnd = () => {
    dragCtx.clearRect(
      0,
      0,
      dragCanvasRef.current.width,
      dragCanvasRef.current.height
    );
    const newSquareArr = [
      ...squareArr,
      {
        x: pos.x,
        y: pos.y,
        w: curPos.x - pos.x,
        h: curPos.y - pos.y,
        clicked: false,
      },
    ];
    setSquareArr(newSquareArr);
    imgCtx.strokeStyle = "#5668D9";
    imgCtx.lineWidth = 2;
    imgCtx.fillStyle = "rgb(221,225,247, 0.5)";
    imgCtx.strokeRect(pos.x, pos.y, curPos.x - pos.x, curPos.y - pos.y);
    imgCtx.fillRect(pos.x, pos.y, curPos.x - pos.x, curPos.y - pos.y);
    setIsDraw(false);
  };

  // drag function
  const dragStart = (e) => {
    let startX = e.pageX;
    let startY = e.pageY;

    setDragPos({
      x: startX,
      y: startY,
    });

    let index = 0;
    for (let square of squareArr) {
      if (isMouseInSquare(startX, startY, square)) {
        setCurrentSquareIndex(index);
        setIsDrag(true);
        return;
      }
      index++;
    }
  };

  const dragSqaure = (e) => {
    if (!isDrag) {
      return;
    } else {
      let mouseX = e.pageX;
      let mouseY = e.pageY;

      let dx = mouseX - dragPos.x;
      let dy = mouseY - dragPos.y;

      let currentSquare = squareArr[currentSquareIndex];
      currentSquare.x += dx;
      currentSquare.y += dy;

      requestAnimationFrame(drawSquareImgCanvas);

      setDragPos({
        x: mouseX,
        y: mouseY,
      });
    }
  };

  const dragEnd = (e) => {
    if (!isDrag) {
      return;
    }
    setIsDrag(false);
  };

  // click function
  const boxClick = (e) => {
    let startX = e.pageX;
    let startY = e.pageY;

    setDragPos({
      x: startX,
      y: startY,
    });

    for (let square of squareArr) {
      if (isMouseInSquare(startX, startY, square)) {
        let currentSquare = squareArr[currentSquareIndex];
        currentSquare.clicked = !currentSquare.clicked;
        drawAnchor(currentSquare);
        return;
      } else {
        let currentSquare = squareArr[currentSquareIndex];
        currentSquare.clicked = false;
      }
    }
  };

  // util
  const isMouseInSquare = (x, y, square) => {
    let squareLeft = square.x;
    let squareRight = square.x + square.w;
    let squareTop = square.y;
    let squareBottom = square.y + square.h;

    if (
      x > squareLeft &&
      x < squareRight &&
      y > squareTop &&
      y < squareBottom
    ) {
      return true;
    }
    return false;
  };

  const drawAnchor = (square) => {
    let anchorWH = 10;
    if (square.clicked) {
      imgCtx.strokeStyle = "#5668D9";
      imgCtx.lineWidth = 2;
      imgCtx.fillStyle = "white";
      // line && rotate anchor
      // line
      imgCtx.beginPath();
      imgCtx.moveTo(
        square.x - anchorWH / 2 + square.w / 2 + anchorWH / 2,
        square.y - anchorWH / 2
      );
      imgCtx.lineTo(
        square.x - anchorWH / 2 + square.w / 2 + anchorWH / 2,
        square.y - anchorWH / 2 - 20
      );
      imgCtx.stroke();
      // rotate anchor
      imgCtx.beginPath();
      imgCtx.arc(
        square.x - anchorWH / 2 + square.w / 2 + 5,
        square.y - anchorWH / 2 - 20,
        5,
        0,
        Math.PI * 2,
        true
      );
      imgCtx.stroke();
      imgCtx.fill();
      // anchor NW
      imgCtx.strokeRect(
        square.x - anchorWH / 2,
        square.y - anchorWH / 2,
        anchorWH,
        anchorWH
      );
      imgCtx.fillRect(
        square.x - anchorWH / 2,
        square.y - anchorWH / 2,
        anchorWH,
        anchorWH
      );
      // anchor NE
      imgCtx.strokeRect(
        square.x - anchorWH / 2 + square.w,
        square.y - anchorWH / 2,
        anchorWH,
        anchorWH
      );
      imgCtx.fillRect(
        square.x - anchorWH / 2 + square.w,
        square.y - anchorWH / 2,
        anchorWH,
        anchorWH
      );
      // anchor N
      imgCtx.strokeRect(
        square.x - anchorWH / 2 + square.w / 2,
        square.y - anchorWH / 2,
        anchorWH,
        anchorWH
      );
      imgCtx.fillRect(
        square.x - anchorWH / 2 + square.w / 2,
        square.y - anchorWH / 2,
        anchorWH,
        anchorWH
      );
      // anchor E
      imgCtx.strokeRect(
        square.x - anchorWH / 2 + square.w,
        square.y - anchorWH / 2 + square.h / 2,
        anchorWH,
        anchorWH
      );
      imgCtx.fillRect(
        square.x - anchorWH / 2 + square.w,
        square.y - anchorWH / 2 + square.h / 2,
        anchorWH,
        anchorWH
      );
      // anchor ES
      imgCtx.strokeRect(
        square.x - anchorWH / 2 + square.w,
        square.y - anchorWH / 2 + square.h,
        anchorWH,
        anchorWH
      );
      imgCtx.fillRect(
        square.x - anchorWH / 2 + square.w,
        square.y - anchorWH / 2 + square.h,
        anchorWH,
        anchorWH
      );
      // anchor S
      imgCtx.strokeRect(
        square.x - anchorWH / 2 + square.w / 2,
        square.y - anchorWH / 2 + square.h,
        anchorWH,
        anchorWH
      );
      imgCtx.fillRect(
        square.x - anchorWH / 2 + square.w / 2,
        square.y - anchorWH / 2 + square.h,
        anchorWH,
        anchorWH
      );
      // anchor SW
      imgCtx.strokeRect(
        square.x - anchorWH / 2,
        square.y - anchorWH / 2 + square.h,
        anchorWH,
        anchorWH
      );
      imgCtx.fillRect(
        square.x - anchorWH / 2,
        square.y - anchorWH / 2 + square.h,
        anchorWH,
        anchorWH
      );
      // anchor W
      imgCtx.strokeRect(
        square.x - anchorWH / 2,
        square.y - anchorWH / 2 + square.h / 2,
        anchorWH,
        anchorWH
      );
      imgCtx.fillRect(
        square.x - anchorWH / 2,
        square.y - anchorWH / 2 + square.h / 2,
        anchorWH,
        anchorWH
      );
    } else {
      drawSquareImgCanvas();
    }
  };

  const drawSquareImgCanvas = () => {
    imgCtx.clearRect(
      0,
      0,
      imgCanvasRef.current.width,
      imgCanvasRef.current.height
    );
    for (let square of squareArr) {
      imgCtx.strokeStyle = "#5668D9";
      imgCtx.lineWidth = 2;
      imgCtx.fillStyle = "rgb(221,225,247, 0.5)";
      imgCtx.strokeRect(square.x, square.y, square.w, square.h);
      imgCtx.fillRect(square.x, square.y, square.w, square.h);
    }
  };

  // img random generate function
  const imgRefrechButtonOnclick = () => {
    const randomIndex = Math.floor(Math.random() * 50);
    fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
      .then((response) => response.json())
      .then((data) => setBgImg(data[randomIndex].url));
  };

  // first setting
  useEffect(() => {
    const dragCanvas = dragCanvasRef.current;
    const imgCanvas = imgCanvasRef.current;

    setDragCtx(dragCanvas.getContext("2d"));
    setImgCtx(imgCanvas.getContext("2d"));
  }, []);

  return (
    <CanvasWrapper>
      <ImgRefreshButton type="button" onClick={imgRefrechButtonOnclick}>
        <ImgRefreshIcon src={RefreshImgIcon} />
      </ImgRefreshButton>
      <ImgCanvas
        ref={imgCanvasRef}
        width={1870}
        height={1080}
        bgImg={bgImg}
        onClick={boxClick}
        onMouseDown={dragStart}
        onMouseMove={dragSqaure}
        onMouseUp={dragEnd}
        className={isSelectMode ? "selectMode" : ""}
      />
      <DragCanvas
        ref={dragCanvasRef}
        width={1870}
        height={1080}
        onMouseDown={drawStart}
        onMouseMove={drawSquare}
        onMouseUp={drawEnd}
        className={!isSelectMode ? "selectMode" : ""}
      />
    </CanvasWrapper>
  );
};

export default Canvas;
