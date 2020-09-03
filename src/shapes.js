export const arrowLine = (x1Value, x2Value, yValue, position) => {
  return {
    position,
    type: "line",
    x1: x1Value,
    y1: yValue,
    x2: x2Value,
    y2: yValue,
    stroke: "black",
  }
}

export const generateShapes = (
  position,
  type,
  xValue,
  yValue,
  text,
  fill,
  name,
  types,
  id,
  formData,
  formValues
) => {
  const newFormValues = { ...formValues }
  return {
    position,
    type,
    x: xValue,
    y: yValue,
    width: 100,
    height: 100,
    fill,
    text,
    name,
    types,
    id,
    formData,
    formValues: newFormValues,
  }
}
