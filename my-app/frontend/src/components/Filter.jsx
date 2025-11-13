const Filter = ({handleSearchChange}) => {
  return (
    <div>Filter shown with: <input type="text" value={searchName} onChange={handleSearchChange}/></div>
  )
}

export default Filter