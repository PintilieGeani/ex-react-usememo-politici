import { useState, useEffect} from "react"

function App() {
  const apiUrl = "http://localhost:3333/politicians"

  const fetchJson = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  const [politici, setPolitici] = useState([])
  useEffect(() => {
    const fetchData = async () =>{
      const data = await fetchJson(apiUrl)
      setPolitici(data)
    }
    fetchData()
  }, [])

  return (
    <>
    <div className="impaginazione">
      <div className="card-container">
        {
          politici.map((politico, id) => (
            <div key={id} className="card">
              <div className="card-text">
              <h3>{politico.name}</h3>
              <p><strong>Posizione:</strong>{politico.position}</p>
              <p><strong>Breve Biografia:</strong>{politico.biography}</p>
              </div>
              <div className="card-img">
                <img src={politico.image} alt={politico.name} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
      
    </>
  )
}

export default App
