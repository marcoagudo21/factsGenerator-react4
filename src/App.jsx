import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const factUrl = "https://catfact.ninja/fact";
  const imgUrl = "https://cataas.com";
  const [fact, setFact] = useState();
  const [img, setImg] = useState();
  const [reload, setReaload] = useState(true)
  const handleButton = () => {
    setReaload(!reload)
  }
  useEffect(() => {
    
      fetch(factUrl)
        .then((res) => res.json())
        .then((data) => {
          let { fact } = data;
          setFact(fact.split(" ").splice(0, 3).join(" "));
        });
    
  }, [reload]);

  useEffect(() => {
    if (!fact) {
      return
    }
    fetch(`https://cataas.com/cat/says/${fact}?json=true`)
        .then((res) => res.json())
        .then((data) => {
          let { url } = data;
          setImg(url);
        });
  }, [fact]);




  return (
    <>
      <main className="container">
        
        <section>
        {fact && <h1>{fact}</h1>}
        {img && <img src={`${imgUrl}${img}`} alt="" />}
      </section>
        
        <button onClick={handleButton}>New Fact</button>
        
      </main>
    </>
  );
}

export default App;
