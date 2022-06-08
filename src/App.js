import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [quizData, setQuizData] = useState([])

  const URL =
    'https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple&token=cf674e7b487fe45308e56e61d1dd3bc0fec5435cfae268aa5f92496286ce27ff'

  const getQuizData = async () => {
    const response = await axios.get(URL)
    setQuizData(response.data.results[0])
  }

  function checkIfNewQuiz() {
    const mins = new Date().getMinutes()
    if (mins == '00') {
      getQuizData()
    }
    console.log('Tick ' + mins)
  }

  setInterval(checkIfNewQuiz, 1000 * 30)

  return (
    <div className="App">
      <h3>Question</h3>
      <p>{quizData.question}</p>

      <section className="options">
        {quizData.length !== 0 &&
          [quizData.correct_answer, ...quizData.incorrect_answers].map(
            (element, index) => {
              return <button key={index}>{element}</button>
            },
          )}
      </section>
    </div>
  )
}

export default App
