import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { randomSquare, changeGreen } from '../../redux/reducers/createSquare'
import Result from './result'

import Head from '../head'
import { YELLOW_SQUARE, GREEN_SQUARE, RED_SQUARE } from '../../constants/constants'

const Square = () => {
  const dispatch = useDispatch()

  const {
    list: generatedSquare,
    rows: rowsNumber,
    cols: colsNumber,
    activeTimer,
    activeIndex,
    gameResult
  } = useSelector((s) => s.create)

  useEffect(() => {
    dispatch(randomSquare())
    return () => clearTimeout(activeTimer)
  }, [])

  return (
    <div>
      <Head title="Game" />
      <div className="mx-auto flex flex-wrap justify-center">
        <div className={`grid grid-rows-${rowsNumber} grid-cols-${colsNumber} gap-10`} id="square">
          {generatedSquare.map((it, index) => {
            let color = 'bg-gray-500'
            if (it === YELLOW_SQUARE) {
              color = 'bg-yellow-500'
            }
            if (it === GREEN_SQUARE) {
              color = 'bg-green-500'
            }
            if (it === RED_SQUARE) {
              color = 'bg-red-500'
            }
            return (
              <button
                type="button"
                className={`w-20 h-20 ${color} my-5`}
                key={index}
                onClick={() => dispatch(changeGreen())}
                disabled={activeIndex !== index}
              />
            )
          })}
        </div>
        {gameResult && (
          <div className="absolute w-screen h-screen bg-gray-700 opacity-80 top-0 left-0 flex items-center justify-center">
            <Result />
          </div>
        )}
      </div>
    </div>
  )
}

Square.propTypes = {}

export default React.memo(Square)
