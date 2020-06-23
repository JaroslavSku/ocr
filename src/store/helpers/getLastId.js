function getLastElementId(drawedObjects) {
  const maxVal = Math.max(
    ...drawedObjects[0].shapes.map((shape) => {
      if (shape.id) {
        return shape.id
      }
      return 0
    })
  )
  return maxVal
}
export default getLastElementId
