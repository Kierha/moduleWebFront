import React, { useState, useEffect } from 'react';
import './App.css';

const ButtonGroup = ({ buttons, onButtonClick }) => {

  const handleClick = (color, index) => {
    onButtonClick(color, index);
  }

  return (
    <div className='button-group'>
      {buttons.map((button, index) => (
        <button key={index} style={{ backgroundColor: button.color }} onClick={() => handleClick(button.color, index)}></button>
      ))}
    </div>
  );
};

function App() {

  const [simonSequence, setSimonSequence] = useState([]);
  const [activeButton, setActiveButton] = useState(null);


  const generateRandomSequence = (buttons, length) => {
    const randomSequence = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * buttons.length);
      randomSequence.push(buttons[randomIndex]);
    }
    setSimonSequence(randomSequence);
  };

  const playSimonSequence = (sequence) => {
    sequence.forEach((button, index) => {
      setTimeout(() => {
        const buttonElement = document.querySelector(`button[style="background-color: ${button.color};"]`);
        buttonElement.click();
      }, (index + 1) * 1000);
    });
  };

  const simonButton = [
    { color: 'blue' },
    { color: 'red' },
    { color: 'yellow' },
    { color: 'green' },
  ];

  const handleButtonClick = (color, index) => {
    setActiveButton(index);
    console.log(`Boutton de couleur : ${color} cliqué, index = ${index}`);
  };

  useEffect(() => {
    playSimonSequence(simonSequence);
  }, [simonSequence]);

  return (
    <div className="App">
      <h1>Simon Game</h1>
      <button style={{ backgroundColor: 'white', color: 'black' }} onClick={() => {
        generateRandomSequence(simonButton, 4)
      }}> Start Sequence </button>
      <ButtonGroup buttons={simonButton} onButtonClick={handleButtonClick} />
      <p>Simon sequence: {simonSequence.map(button => button.color).join(', ')}</p>
    </div>
  );
}

export default App;
