import {useState} from 'react'
import {v4} from 'uuid'

import './index.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// initial value is first object of list
const initialsValue = tagsList[0].optionId

const Home = () => {
  const [data, setData] = useState([])
  const [tagOption, setTagOption] = useState(initialsValue)
  const [userTask, setUserTask] = useState('')
  const [btnCategory, setBtnCategory] = useState(null)

  // input add
  const handelInput = e => {
    setUserTask(e.target.value)
  }

  // category add
  const handelCategory = e => {
    setTagOption(e.target.value)
  }

  // create task with id
  const handelSubmit = e => {
    e.preventDefault()
    const newTask = {
      id: v4(),
      task: userTask,
      category: tagOption,
    }

    setData([...data, newTask])

    setUserTask('')
    setTagOption(initialsValue)
  }

  // condition to render data
  const condition = data.length === 0

  const handleCategoryClick = category => {
    setBtnCategory(prevCategory =>
      prevCategory === category ? null : category,
    )
  }

  const filterItems = category => {
    if (!category) {
      return data // Show all items when no category is selected
    }
    return data.filter(item => item.category === category)
  }

  // render list of task
  const renderListOfCategory = () => (
    <>
      <ol className="ul-task-display">
        {filterItems(btnCategory).map(item => (
          <li key={item.id}>
            <div className="task-container">
              <h1>{item.task}</h1>
              <p className="tags-paragraph">{item.category}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  )

  return (
    <>
      <div className="app-page">
        {/* input container */}
        <div className="input-container">
          <h1 className="main-heading">Create a task!</h1>
          {/* from element */}
          <form onSubmit={handelSubmit}>
            <div className="input-box">
              <label htmlFor="task">Task</label>
              <br />
              <input
                type="text"
                id="task"
                value={userTask}
                onChange={handelInput}
                placeholder="Enter the task here"
              />
            </div>
            <div className="input-box">
              <label htmlFor="tags">Tags</label>
              <br />
              <select
                id="tags"
                name="tags"
                value={tagOption}
                onChange={handelCategory}
              >
                {tagsList.map(e => (
                  <option value={e.optionId} key={e.optionId}>
                    {e.optionId}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </form>
        </div>
        {/* display task */}
        <div className="display-task">
          {/* category buttons */}
          <div>
            <h1 className="heading-second">Tags</h1>
            <ul className="ul-btn-list">
              {tagsList.map(eBtn => (
                <li key={eBtn.optionId}>
                  <button
                    className="tag-btn"
                    type="button"
                    value={eBtn.optionId}
                    onClick={e => handleCategoryClick(e.target.value)}
                  >
                    {eBtn.displayText}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="heading-second">Tasks</h1>
          <div className="d-b">
            {condition ? (
              <p className="no-task">No Tasks Added Yet!</p>
            ) : (
              renderListOfCategory()
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
