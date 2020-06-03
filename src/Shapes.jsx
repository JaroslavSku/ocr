import React from "react"

export default function Shapes({ paint, node }) {
  let lastX = 0
  return (
    <div>
      <svg width='100vw' height='100vh'>
        <defs>
          <marker
            id='arrow'
            markerWidth='10'
            markerHeight='10'
            refX='0'
            refY='3'
            orient='auto'
            markerUnits='strokeWidth'
          >
            <path d='M0,0 L0,6 L9,3 z' fill='#f00' />
          </marker>
        </defs>
        {paint[node].shapes.map((shape, id) => {
          console.log("Loooping", id)
          if (shape.type === "line") {
            return (
              <line
                x1={shape.x1}
                y1={shape.y1}
                x2={shape.x2 - 10}
                y2={shape.y2}
                stroke={shape.stroke}
                marker-end='url(#arrow)'
              />
            )
          }
          if (shape.type === "rect") {
            return (
              <g>
                <rect
                  x={shape.x}
                  y={shape.y - shape.width / 2}
                  height={shape.height}
                  width={shape.width}
                  fill={shape.fill}
                />
                <text
                  x={shape.x + 12}
                  y={shape.y}
                  font-size='12'
                  dominant-baseline='middle'
                  stroke='white'
                  ext-anchor='middle'
                >
                  {shape.text}
                </text>
              </g>
            )
          }
        })}
      </svg>
    </div>
  )
}
