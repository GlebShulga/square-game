import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { randomSquare, changeGreen } from '../../redux/reducers/createSquare'
import Result from './Result'

import Head from '../Head'
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
      <div className="mx-auto my-10 md:my-5 flex flex-wrap justify-center items-center">
        <div
          className={`grid grid-rows-${rowsNumber} grid-cols-${colsNumber} gap-5 md:gap-10`}
          id="square"
        >
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
                aria-label="Select square"
                className={`md:w-20 md:h-20 w-10 h-10 ${color} md:my-5 my-2`}
                key={color && index}
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

export default React.memo(Square)
