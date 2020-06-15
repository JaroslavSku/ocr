function getLastElementId(drawedObjects) {
  const maxVal = Math.max(
    ...drawedObjects[0].shapes.map((shape) => {
      if (shape.id) {
        return shape.id
      }
      return 0
    })
  )
  console.log("max element id", maxVal)
  return maxVal
}
export default getLastElementId
