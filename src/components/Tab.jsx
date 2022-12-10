const Tab = (props) => {
  const { text, activeTab, setActiveTab } = props
  const isActive = text === activeTab

  return (
    <div
      className={`w-1/3 py-2 px-6 border-b-2 capitalize cursor-pointer ${
        isActive ? 'border-blue-500' : ''
      }`}
      onClick={() => setActiveTab(text)}
    >
      {text}
    </div>
  )
}

export default Tab
