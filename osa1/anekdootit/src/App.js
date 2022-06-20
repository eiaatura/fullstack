import React, { useState } from 'react'

const Header =({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const MostVotes = ({ anecdotes, votes }) => {
  const index = votes.indexOf(Math.max(...votes))

  return (
    <p>{anecdotes[index]} <br /> has {votes[index]} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])

  const handleVoting = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <br />
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVoting} text='Vote' />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote'/>
      <Header text='Anecdote with most votes'/>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App