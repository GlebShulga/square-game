import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Head from '../Head'
import { createSquare, generate } from '../../redux/reducers/createSquare'

const CreateSquare = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const hardMode = useSelector((s) => s.create.hardMode)

  const [error, setError] = useState(false)
  console.log(error, 'error')

  const onChangeHorizontal = (e) => {
    console.log(e.target.value, 'e.target.value')
    if (e.target.value > 1 || e.target.value < 9) {
      setError(false)
      dispatch(createSquare(e.target.value, 'rows'))
    }
    if (e.target.value < 2 || e.target.value > 8) {
      setError(true)
    }
  }

  const onChangeVertical = (e) => {
    if (e.target.value > 1 || e.target.value < 9) {
      setError(false)
      dispatch(createSquare(e.target.value, 'cols'))
    }
    if (e.target.value < 2 || e.target.value > 8) {
      setError(true)
    }
  }

  const onClickStart = () => {
    if (!error) {
      dispatch(generate())
      history.push('/square')
    }
  }

  return (
    <div>
      <Head title="Square Game" />
      <div className="grid gap-4">
        <div className="col-span-2 md:col-span-1">
          <input
            className="inputClassName"
            type="number"
            min="2"
            max="8"
            placeholder="Write number of horizontal lines"
            onChange={onChangeHorizontal}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <input
            className="inputClassName"
            type="number"
            min="2"
            max="8"
            placeholder="Write number of vertical lines"
            onChange={onChangeVertical}
          />
        </div>
      </div>
      {error && (
        <div>
          <div className="text-red-500 font-semibold flex justify-center text-lg pt-1">
            The number of lines can be from 2 to 8.
          </div>
        </div>
      )}
      <div className="mt-4 grid justify-items-center">
        <button
          type="button"
          className="border rounded bg-teal-300 py-1 px-2 hover:text-red-200"
          onClick={onClickStart}
        >
          Start
        </button>
      </div>
      <div className="flex flex-col">
        <label htmlFor="toggleHardMode" className="mt-3 inline-flex items-center cursor-pointer">
          <span className="relative">
            <span className="nameToggle" />
            <span className={hardMode ? 'nameToggleChecked' : 'nameToggleUnchecked'}>
              <input
                id="toggleHardMode"
                type="checkbox"
                className="absolute opacity-0 w-0 h-0"
                onChange={() => dispatch(createSquare(!hardMode, 'hardMode'))}
                value={hardMode}
              />
            </span>
          </span>
          <span className="ml-3 text-sm">Hard mode</span>
        </label>
      </div>
    </div>
  )
}

export default React.memo(CreateSquare)
