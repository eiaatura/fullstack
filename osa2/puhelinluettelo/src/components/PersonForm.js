import React from 'react'

const PersonForm = (props) => (

    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.changeName} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
  
  export default PersonForm