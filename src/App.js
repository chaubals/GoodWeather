import React, {useState, useRef} from "react";
import axios from "axios";
import './App.css';
import ErrorMessage from "./ErrorMessage";
import matchers from "@testing-library/jest-dom/matchers";

function App() {
  const [city, setCity] = useState(''); //initial value of city will be blank
  const [weather, setWeather] = useState(null); //initial value of weather will be blank
  const [error, setError] = useState(null); //state for error message
  const [isPressed, setIsPressed] = useState(false); //state to track if the button is pressed
  //const API_KEY = '1b2eee374bad025e74aeef6b3b6f5cab';
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  //Create a reference for the "Get Weather" button
  const buttonRef = useRef(null);

  const getWeather = async () => {
    try{
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
      //alert('Invalid city name entered.')
      setError('Invalid city name entered');
    }
  };

  //Function to handle "Enter" key press
  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      if(error){
        //SImulating actually pressing the Close button
        setIsPressed(true);
        setTimeout(() => {
          closeError(); //Calling the close error function
          setIsPressed(false); //Reset the button press effect
        }, 200); //200 ms delay for the visual effect
        closeError();
      }
      else{
        //If there is no error
        setIsPressed(true); //Simulate button pressing virtually
        setTimeout(() => {
          setIsPressed(false);
          buttonRef.current.click(); //Trigger the Get Weather button
        }, 200); //200 ms delay for the visual effect
        buttonRef.current.click();
      }
    }
  }
  //Function to close the error
  const closeError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <h1 className="text-4xl sm:text-3xl font-bold mb-4 text-blue-800 -m-10">Welcome to GoodWeather!!</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown} //Add onKeyDown event listener here
        placeholder="Enter City Name"
        className="border border-gray-300 p-2 rounded-lg w-full max-w-xs mb-4"
      />
      <button
        ref={buttonRef} //Attach the ref to the button
        onClick={getWeather}
        className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 ${
          isPressed ? 'bg-blue-700' : ''
        }`} // Apply a "pressed" style when Enter is pressed
      >
        Get Weather
      </button>
      {weather && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Weather in {weather.name}</h2>
          <p className="text-lg">Temperature: {weather.main.temp} °C</p>
          <p className="text-lg">Condition: {weather.weather[0].description}</p>
        </div>
      )}

      {/*Show error message box if there's an error*/}
      {error && <ErrorMessage message={error} onClose={closeError}/>}
    </div>
  );
}

export default App;