import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatePosition, openMenu, closeMenu } from "./store/actions/menuAction"
import { map, find, last } from "lodash"
import SideMenu from "./store/menu/SideMenu"
import getLastElementId from "./store/helpers/getLastId"
import { deleteLastObject } from "./store/actions/drawedObjectsActions"
import { disableButton } from "./store/actions/componentActions"

export default function Draw({ drawedObjects, node }) {
  const dispatch = useDispatch()
  const lastId = getLastElementId(drawedObjects)
  const beforeLastId = (lastId) => {
    if (lastId > 1) {
      return lastId - 1
    }
    return lastId
  }
  let clickTimeout = null
  const { name } = useSelector((state) =>
    find(state.draw[0].shapes, (shape) => shape.id === beforeLastId(lastId))
  )
  function openBubbleMenu(x, y, width) {
    const leftPosition = x - width / 2
    const topPosition = y - width / 1.5
    dispatch(updatePosition(leftPosition, topPosition))
  }

  function openNav(name, types, id) {
    const navWidth = 200
    dispatch(openMenu(name, navWidth, types, id))
  }

  function closeNav() {
    dispatch(closeMenu())
  }

  const handleClicks = () => {
    if (clickTimeout !== null) {
      deleteLast()
      clearTimeout(clickTimeout)
      closeNav()
      clickTimeout = null
    } else {
      clickTimeout = setTimeout(() => {
        clearTimeout(clickTimeout)
        clickTimeout = null
      }, 200)
    }
  }

  function deleteLast() {
    if (lastId > 0) {
      dispatch(deleteLastObject(lastId))
      dispatch(disableButton(lastId, name))
    }
  }

  function plusSign(shape) {
    if (lastId === shape.id) {
      return (
        <text
          onClick={() => openBubbleMenu(shape.x, shape.y, shape.width)}
          className='svg-text'
          x={shape.x + shape.width}
          y={shape.y - shape.width / 2.6}
          font-size='20'
          stroke='blue'
        >
          +
        </text>
      )
    }
  }
  return (
    <div>
      <SideMenu closeNav={closeNav} />
      <svg
        className='graph'
        onClick={handleClicks}
        width={drawedObjects[0].xValue + 200}
        height='80rem'
      >
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
        {map(drawedObjects[node].shapes, (shape, _id) => {
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
            const { title = "" } = shape.formValues || {}
            return (
              <g className="method__group">
                <rect
                  onClick={() => openNav(shape.name, shape.types, shape.id)}
                  className='method__item'
                  x={shape.x}
                  y={shape.y - shape.width / 2}
                  height={shape.height}
                  width={shape.width}
                  fill={shape.fill}
                />
                {plusSign(shape)}
                <text
                  x={shape.x + shape.width / 2}
                  y={shape.y}
                  className="method__title"
                  font-size='12'
                  dominant-baseline='middle'
                  text-anchor='middle'
                  font-family='sans-serif'
                  letter-spacing='1.5'
                >
                  {shape.text}
                </text>
                <text
                  x={shape.x + shape.width / 2}
                  y={shape.y + shape.height / 4}
                  font-size='12'
                  className="method__desc"
                  dominant-baseline='middle'
                  text-anchor='middle'
                  font-family='sans-serif'
                  letter-spacing='1.5'
                >
                  {title && title}
                </text>
              </g>
            )
          }
          if (shape.type === "circle") {
            const path = `M ${shape.x}, ${shape.y}
            a 25,25 0 1,1 ${shape.width},0
            a 25,25 0 1,1 -${shape.width},0`
            const circleText = shape.name === "GenerateOutput" ? "End" : "Start"
            return (
              <g className="start__group">
                <path className='start__item' d={path} />
                <text
                  onClick={() => openBubbleMenu(shape.x, shape.y, shape.width)}
                  className='svg-text'
                  x={shape.x + shape.width / 1.9}
                  y={shape.y - shape.width / 1.8}
                  font-size='20'
                  stroke='blue'
                >
                  +
                </text>
                <text
                  x={shape.x + shape.width / 2}
                  y={shape.y}
                  className="start__title"
                  font-size='12'
                  dominant-baseline='middle'
                  text-anchor='middle'
                  font-family='sans-serif'
                  letter-spacing='1.5'
                >
                  {circleText}
                </text>
              </g>
            )
          }
          if (shape.type === "IF") {
            const xValueBase = shape.x + shape.width / 2
            const xValueLeft = shape.x
            const xValueRight = shape.x + shape.width
            const polygonValues = `${xValueBase} 140, ${xValueRight} 200,${xValueBase} 260, ${xValueLeft} 200`

            return (
              <g className="graph__element">
                <polygon
                  className='graph__element__item'
                  points={polygonValues}
                  fill={shape.fill}
                />
                <text
                  onClick={() => openBubbleMenu(shape.x, shape.y, shape.width)}
                  className='svg-text'
                  x={shape.x + shape.width / 1.9}
                  y={shape.y - shape.width / 1.8}
                  font-size='20'
                  stroke='blue'
                >
                  +
                </text>
                <text
                  x={shape.x + shape.width / 2}
                  y={shape.y}
                  className="graph__element__title"
                  font-size='12'
                  dominant-baseline='middle'
                  text-anchor='middle'
                  font-family='sans-serif'
                  letter-spacing='1.5'
                >
                  Any error?
                </text>
                <line
                  x1={xValueBase}
                  y1={shape.y}
                  x2={xValueBase}
                  y2={shape.y + shape.width}
                  stroke={shape.fill}
                  marker-end='url(#arrow)'
                />
                <g>
                  <rect
                    id='rect1'
                    x={shape.x}
                    y={shape.y + shape.width + 10}
                    height={shape.height}
                    width={shape.width}
                    fill={shape.fill}
                  />
                  <text
                    x={shape.x + shape.width / 2}
                    y={shape.y + shape.width * 1.6}
                    font-size='12'
                    dominant-baseline='middle'
                    className="graph__element__title"
                    text-anchor='middle'
                    font-family='sans-serif'
                    letter-spacing='1.5'
                  >
                    Error message
                  </text>
                </g>
              </g>
            )
          }
        })}
      </svg>
    </div>
  )
}
