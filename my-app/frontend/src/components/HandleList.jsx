const HandleList = ({ persons, deletePerson }) => {
      return (
        <div>
          {persons.map((person) => (
            <div className='persoonat' key={person.id}>
              {person.name} {person.number} <button onClick={() => deletePerson(person)}>Delete</button>
            </div>
          ))}
        </div>
      )
  }
  
  export default HandleList