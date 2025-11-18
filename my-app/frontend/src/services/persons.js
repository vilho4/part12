import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error("Error fetching data:", error)
      throw error
    })
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then((result) => {
  return result.data
  })
}

const update = (id, personObject) => {
  // console.log('id =',id, ' persoona', personObject)
  const request = axios.put(`${baseUrl}/${id}`, personObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((result) => {
  return result.data
  })
  
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deletePerson: deletePerson,
}