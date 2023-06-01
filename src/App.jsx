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
    <>
      <div>
        <div className="flex flex-col h-screen">
        <div className='align-right float-right bg-slate-300'>
          <span className='absolute float-right right-1 top-1'>
            <ModelModelWidget modelmodel={modelmodel}/>
          </span>
        </div>
 
        <div className="flex-auto overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="bg-gray-200 p-2 m-2 rounded-lg">
              {message}
            </div>
          ))}
        </div>
        <form onSubmit={handleFormSubmit} className="flex p-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 rounded-l-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2 ml-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default App
