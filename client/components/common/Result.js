import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Head from '../Head'
import { NUMBERS, WIN } from '../../constants/constants'
import { gameResultToNull } from '../../redux/reducers/createSquare'

const Result = () => {
  const { gameResult, countObj } = useSelector((s) => s.create)
  const dispatch = useDispatch()

  return (
    <div>
      <Head title="Result" />
      <div className="bg-blue-900 text-white font-bold rounded-lg border shadow-lg p-10 grid grid-rows-2 opacity-100">
        <div className="flex justify-center text-3xl pb-1">{gameResult}</div>
        <div>
          {gameResult === WIN
            ? `Red: ${countObj.red} Green: ${countObj.green + NUMBERS.ONE}`
            : `Red: ${countObj.red + NUMBERS.ONE} Green: ${countObj.green}`}
        </div>
        <Link
          to="/"
          onClick={() => {
            dispatch(gameResultToNull())
          }}
          className="border rounded bg-teal-300 p-2 mt-3 hover:text-pink-500 text-center"
        >
          Play again
        </Link>
      </div>
    </div>
  )
}

export default React.memo(Result)