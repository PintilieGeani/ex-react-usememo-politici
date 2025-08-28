import { useState, useEffect , useMemo} from "react"

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

  const[search, setSearch] = useState("")
  const filtrati = useMemo(() =>{
    return politici.filter((pol) => pol.name.toLowerCase().includes(search.toLowerCase()) || pol.biography.toLowerCase().includes(search.toLowerCase()))
  },[search, politici])

  console.log(filtrati)

  return (
    <>
    <div className="impaginazione">
      <div className="ricerca">
        <h3>Cerca il tuo Politico</h3>
        <input 
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
         />
      </div>
      <div className="card-container">
        {filtrati.length > 0 ? 
          filtrati.map((politico, id) => (
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
          : politici.map((politico, id) => (
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
