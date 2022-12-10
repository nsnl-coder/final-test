import { FiTrash } from 'react-icons/fi'

const Task = (props) => {
  const { task, setTasks } = props

  const onChangeTaskStatus = (e) => {
    setTasks((tasks) => {
      const copyArr = [...tasks]
      const index = copyArr.findIndex((item) => item.id === task.id)
      copyArr[index].isActive = !e.target.checked
      return copyArr
    })
  }

  const onDeleteTaskHandler = () => {
    setTasks((tasks) => {
      const copyArr = [...tasks]
      const index = copyArr.findIndex((item) => item.id === task.id)
      console.log(index)
      copyArr.splice(index, 1)
      console.log(copyArr)
      return copyArr
    })
  }

  return (
    <div className="flex space-x-2">
      <input
        type="checkbox"
        name=""
        id=""
        checked={!task.isActive}
        onChange={onChangeTaskStatus}
      />
      <p
        className={`font-semibold flex-grow ${
          task.isActive ? '' : 'line-through text-gray-500'
        }`}
      >
        {task.title}
      </p>
      <button
        className="text-gray-500 hover:text-red-400"
        onClick={onDeleteTaskHandler}
      >
        <FiTrash />
      </button>
    </div>
  )
}

export default Task
