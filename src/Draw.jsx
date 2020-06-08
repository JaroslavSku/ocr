import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updatePosition } from "./store/actions/menuAction"

export default function Draw({ paint, node }) {
  const [leftPosition, setLeftPosition] = useState(10)
  const [topPosition, setTopPosition] = useState(10)
  const dispatch = useDispatch()

  function handleClick(x, y, width) {
    console.log("clicked ", x)

    const leftPosition = x - width / 2
    const topPosition = y - width / 1.5
    dispatch(updatePosition(leftPosition, topPosition))
    setLeftPosition(leftPosition)
    setTopPosition(topPosition)
  }
  let lastX = 0
  return (
    <div className='svg-container'>
      <svg width='100rem' height='80rem'>
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
            <path d='M0,0 L0,6 L9,3 z' fill='red' />
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
                  id='rect1'
                  x={shape.x}
                  y={shape.y - shape.width / 2}
                  height={shape.height}
                  width={shape.width}
                  fill={shape.fill}
                />
                <text
                  onClick={() => handleClick(shape.x, shape.y, shape.width)}
                  className='svg-text'
                  x={shape.x + shape.width}
                  y={shape.y - shape.width / 2.6}
                  font-size='20'
                  stroke='blue'
                >
                  +
                </text>
                <text
                  x={shape.x + shape.width / 2}
                  y={shape.y}
                  font-size='12'
                  dominant-baseline='middle'
                  stroke='white'
                  text-anchor='middle'
                >
                  {shape.text}
                </text>
              </g>
            )
          }
          if (shape.type === "circle") {
            return (
              <rect
                id='rect1'
                x={shape.x}
                y={shape.y - shape.width / 2}
                height={shape.height}
                width={shape.width}
                fill={shape.fill}
              />
            )
          }
        })}
      </svg>
      {/* <div
        className='svg-plus'
        style={{ position: "fixed", top: shape.x, left: shape.y }}
      >
        +
      </div> */}
    </div>
  )
}
