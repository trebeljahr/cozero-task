import React, { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

function Home(): JSX.Element {
  return (
    <div>
      <MyForm />
    </div>
  )
}

function MyForm(): JSX.Element {
  const [input, setInput] = useState('bitcoin')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(false)
  const [pastSearches, setPastSearches] = useState<string[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  async function fetchCryptoInfo(id: string): Promise<any> {
    setLoading(true);
    const cryptoInfo = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
      headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
    })
    setLoading(false);
    return cryptoInfo
  }

  async function submit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const response = await fetchCryptoInfo(input)
    const cryptoInfo = await response.json()

    if ("error" in cryptoInfo) {
      alert("There was an error fetching the id - try using lower case");
      return 
    }
    setPastSearches(Array.from(new Set([...pastSearches, input])));
    setResult(cryptoInfo)
  }

  return (
    <>
        {loading ? <ClipLoader
          size={150}
          color={"#123abc"}
          loading={loading}
        /> :       
        <form>
          <p>Please enter your CryptoID here!</p>
          <input type="text" onChange={handleChange} value={input} />
          <button type="submit" onClick={submit}>
            Submit
          </button> 
          {pastSearches.map((id)=>(<li key={id}>{id}</li>))}
        </form>
        }
      {result && <Presentation crypto={result} />}
    </>
  )
}

function Presentation({crypto}:any):JSX.Element{
  const isBadCrypto = crypto.market_data.price_change_percentage_24h <= 0
  return <div id="crypto-presentation">
    <img src={crypto.image.thumb} alt={`${crypto.name} logo`}/> 
    <h1>{crypto.name}</h1>
    <h2>Market Cap Rank: {crypto.market_cap_rank}</h2>
    <h3>Symbol: {crypto.symbol}</h3>
    <p style={{color: isBadCrypto ? "red": "green"}}>Percentual 24h price change: {crypto.market_data.price_change_percentage_24h}</p>
    <p>Current price in USD: {crypto.market_data.current_price.usd}</p>
  </div>
}

export default Home
