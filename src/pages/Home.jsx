import { useEffect, useState } from 'react'
import Tab from '../components/Tab'
import Task from '../components/Task'
import { FiTrash } from 'react-icons/fi'

const Home = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [initialRender, setInitialRender] = useState(true)

  const submitHandler = (e) => {
    e.preventDefault()
    setTasks((prev) => [
      ...prev,
      { title: newTask, isActive: true, id: Date.now() },
    ])
    setNewTask('')
  }

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(savedTasks)
  }, [])

  useEffect(() => {
    if (!initialRender) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
      return
    }
    setInitialRender(false)
  }, [tasks])

  const filteredTasks = tasks.filter((task) => {
    const isValid =
      activeTab === 'all' ||
      (activeTab === 'active' && task.isActive) ||
      (activeTab === 'completed' && !task.isActive)
    return isValid
  })

  return (
    <div className=" max-w-md mx-auto h-screen space-y-3 flex flex-col">
      <div className="flex text-center px-6">
        <Tab text="all" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab text="active" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab
          text="completed"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <form onSubmit={submitHandler} className="flex space-x-2 px-6">
        <input
          type="text"
          className="border rounded-lg outline-none flex-grow px-4"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
          placeholder="add details"
        />
        <button className="bg-blue-500 text-white px-5 py-1 rounded-lg">
          Add
        </button>
      </form>
      <div className="space-y-3 flex-grow overflow-y-auto px-6">
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} setTasks={setTasks} />
        ))}
        <div className="flex justify-end py-4 sticky bottom-0 bg-white">
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-sm flex items-center space-x-2"
            onClick={() => setTasks([])}
          >
            <FiTrash />
            <span>Delete All</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
