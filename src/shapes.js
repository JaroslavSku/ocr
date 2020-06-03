export const arrowLine = (x1Value, x2Value, id) => {
  return {
    id,
    type: "line",
    x1: x1Value,
    y1: 80,
    x2: x2Value,
    y2: 80,
    stroke: "black",
  }
}

export const unzip = (xValue, id) => {
  return { id, type: "rect", x: xValue, y: 80, width: 100, height: 100 }
}

export const rectAction = (xValue, text) => {
  return {
    id: 1,
    type: "rect",
    x: xValue,
    y: 80,
    width: 100,
    height: 100,
    text,
  }
}
