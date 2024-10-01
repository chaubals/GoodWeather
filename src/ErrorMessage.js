import {useEffect} from "react";

function ErrorMessage ({message, onClose, setIsPressed}) {
  //Listen to the "Enter" and trigger close function
  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.key === "Enter") {
        e.preventDefault();
        onClose();
      }
    };
    //Attach the keydown event listener
    document.addEventListener("keydown", handleKeyDown);

    //Clean up the event listener when the component is unmounted
    return() => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-600 bg-opacity-30">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">{message}</h2>
        <div className="flex justify-center">
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 active:bg-red-800 active:transform active:scale-95 active:shadow-lg active:border active:border-red-900 transition-all duration-150"
        onClick={onClose}>
        Close
        </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;