import { useState, useEffect } from 'react'
import ModelModelWidget from 'modelmodel';

function App() {

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');

      modelmodel.query(inputValue).then(
        response => {
          setMessages([...messages, response["details"]] );
        }
      )
    }
  };
  
  return (
    <div className="flex flex-1 h-full flex-col">
      <span className='absolute float-right right-1 top-1'>
        <ModelModelWidget modelmodel={modelmodel}/>
      </span>
      <div className="flex flex-grow h-full overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="bg-gray-200 p-2 m-2 rounded-lg">
            {message}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <form className="flex flex-row w-full" onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow rounded-l-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            type="submit"
            className="flex-none float-right bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2 ml-2"
          >
            Send
          </button>
        </form>
      </div>
  </div>
  )
}

export default App
