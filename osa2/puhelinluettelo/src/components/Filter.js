import React from "react"

const Filter = ({filter, onFilterChange}) => {
    return (<p>filter shown with <input value={filter} onChange={onFilterChange}/></p>)
}

export default Filter