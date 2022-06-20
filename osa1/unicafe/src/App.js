import React, { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = (props.good - props.bad) / all
  const pos = props.good / all * 100

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={avg} />     
        <StatisticLine text='positive' value={pos} />
      </tbody>        
    </table>
  )
}

const StatisticLine = (props) => {
  if (props.text === 'positive') {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleGood}  text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App