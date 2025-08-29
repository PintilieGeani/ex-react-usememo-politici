import React, { useState, useEffect, useMemo } from "react"


const Card = React.memo(function Card({ politico, onOpenModal, isBroken, onBreak }) {



  const handleClick = () => {
    onBreak()
    setTimeout(() => {
      onOpenModal(); // <-- chiamiamo la funzione che imposta la modale
    }, 150); // aspettiamo un po' per simulare "vetro rotto"
  }

  return (<div className={`card ${isBroken ? "broken" : ""}`} onClick={handleClick} onOpenModal={onOpenModal}>
    <div className="card-text">
      <h3>{politico.name}</h3>
      <p><strong>Posizione: </strong>{politico.position}</p>
      <p><strong>Breve Biografia: </strong>{politico.biography}</p>
    </div>
    <div className="card-img">
      <img src={politico.image} alt={politico.name} />
    </div>
  </div>)
})

function Modal({ data, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{data.name}</h2>
        <div className="modal-img">
          <img src={data.image} alt={data.name} />
        </div>
        <div className="modal-text">
          <p><strong>Data di nascita: {data.dob}</strong></p>
          <p><strong>Paese di pascita:</strong> {data.country}</p>
          <p><strong>Partito di appartenenza:</strong> {data.party}</p>
          <p><strong>Carica:</strong> {data.position}</p>
          <p><strong>Periodo di attività:</strong> {data.years_in_office}</p>
          <p><strong>Biografia: </strong>{data.biography}</p>
        </div>
        <button onClick={onClose}>Chiudi</button>
      </div>
    </div>
  )
}

function App() {
  const apiUrl = "http://localhost:3333/politicians"

  const [brokenCardId, setBrokenCardId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null)

  // const [modalVisible, setModalVisible] = useState(false); // visibilità del modale
  // const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 }); // posizione per la modale

  const fetchJson = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

  const [politici, setPolitici] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJson(apiUrl)
      setPolitici(data)
    }
    fetchData()
  }, [])

  const [search, setSearch] = useState("")
  const filtrati = useMemo(() => {
    return politici.filter((pol) => pol.name.toLowerCase().includes(search.toLowerCase()) || pol.biography.toLowerCase().includes(search.toLowerCase()))
  }, [search, politici])

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
          {(filtrati.length > 0 ? filtrati : politici).map((politico, id) => (
            <Card
              key={id}
              politico={politico}
              isBroken={brokenCardId === id}
              onBreak={() => setBrokenCardId(id)}
              onOpenModal={() => setSelectedCard({ data: politico, id })}
            />
          ))
          }
          {selectedCard && (
            <Modal data={selectedCard.data} onClose={() => {
              setSelectedCard(null);
              setBrokenCardId(null); // <-- resetta la card
            }} />
          )}
        </div>
      </div>

    </>
  )
}

export default App
