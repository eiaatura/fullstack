import React from 'react'

const Course = ({ course }) => {

    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total totalParts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return <h1>{course}</h1>
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
            <Part
              key={part.id}
              name={part.name}
              exercises={part.exercises}
            />
        )}
      </div>
    )
  }
  
  
  const Part = ({ name, exercises }) => {
    return (
      <div>
        <p>{name} {exercises}</p>
      </div>
    )
  }
  
  const Total = ({ totalParts }) => {
    let exerciseArray = totalParts.map(totalParts => totalParts.exercises)
    const total = exerciseArray.reduce((s, p) => {
      return s + p
    })
    return (
      <div>
        <p>
          <strong>Number of exercises {total}</strong>
        </p>
      </div>
    )
  }

export default Course