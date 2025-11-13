const PersonForm = ({onSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
      <h3>Add a new</h3>
        Name:<input type="text" value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        Number:<input type="tel" value={newNumber} onChange={handleNumberChange}/>
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default PersonForm