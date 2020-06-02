import React from "react"

export default function Shapes({ paint, node }) {
  let lastX = 0
  return (
    <div>
      <svg width='900' height='900'>
        {paint[node].shapes.map((shape, id) => {
          console.log("Loooping", id)
          if (shape.type === "line") {
            const length = shape.x2 - shape.x1
            console.log("seettting length", length)
            lastX = lastX + length
            const lastX2 = shape.x2 + lastX
            return (
              <line
                x1={shape.x1}
                y1={shape.y1}
                x2={shape.x2}
                y2={shape.y2}
                stroke={shape.stroke}
              />
            )
          }
          if (shape.type === "rect") {
            console.log("Last x", lastX)
            const length = shape.width
            lastX = lastX + length
            return (
              <rect
                x={shape.x}
                y={shape.y / 2.5}
                height={shape.height}
                width={shape.width}
              />
            )
          }
        })}
      </svg>
    </div>
  )
}
