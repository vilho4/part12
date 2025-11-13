const Person = ({person}) => {
  // console.log("person says hi", {person})
    return (
      <div>
        {person.name}: {person.number}
      </div>
    )
  }

export default Person