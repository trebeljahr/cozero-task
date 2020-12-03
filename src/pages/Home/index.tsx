import React, { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { Line } from 'react-chartjs-2'

function Home(): JSX.Element {
  return (
    <div>
      <MyForm />
    </div>
  )
}

const baseURL = 'https://api.coingecko.com/api/v3/coins/'

function MyForm(): JSX.Element {
  const [input, setInput] = useState('bitcoin')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(false)
  const [pastSearches, setPastSearches] = useState<string[]>([])
  const [graphData, setGraphData] = useState<any>(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  async function fetchCryptoInfo(id: string): Promise<any> {
    setLoading(true)
    const cryptoInfo = await fetch(`${baseURL}/${id}`, {
      headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
    })
    setLoading(false)
    return cryptoInfo
  }

  async function submit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    await searchAndSaveCrypto(input)
  }

  async function fetchMarketInfo(id: string): Promise<any> {
    const marketInfo = await fetch(`${baseURL}/${id}/market_chart?vs_currency=usd&days=7`, {
      headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
    })
    return marketInfo
  }

  async function searchAndSaveCrypto(id: string) {
    const cryptoResponse = await fetchCryptoInfo(id)
    const cryptoInfo = await cryptoResponse.json()
    saveCryptoInfo(cryptoInfo)

    const marketResponse = await fetchMarketInfo(id)
    const marketInfo = await marketResponse.json()
    saveMarketInfo(marketInfo)
  }

  function saveMarketInfo(marketInfo: any) {
    console.log(marketInfo)
    if ('error' in marketInfo) {
      alert('There was an error fetching the market info for the graph')
      return
    }
    setGraphData(marketInfo)
  }

  function saveCryptoInfo(cryptoInfo: any) {
    if ('error' in cryptoInfo) {
      alert('There was an error fetching the id - try using lower case')
      return
    }
    setPastSearches(Array.from(new Set([...pastSearches, input])))
    setResult(cryptoInfo)
  }

  return (
    <>
      {loading ? (
        <ClipLoader size={150} color={'#123abc'} loading={loading} />
      ) : (
        <form>
          <p>Please enter your CryptoID here!</p>
          <input type="text" onChange={handleChange} value={input} />
          <button type="submit" onClick={submit}>
            Submit
          </button>
          <PastSearches searches={pastSearches} searchAgain={searchAndSaveCrypto} />
        </form>
      )}
      {result && <Presentation crypto={result} />}
      {graphData && <ChartPresentation graphData={graphData} />}
    </>
  )
}

function ChartPresentation({ graphData }: any) {
  const prices = graphData.prices.map((dataPoint: [number, number]) => ({
    x: dataPoint[0],
    y: dataPoint[1],
  }))
  const data = {
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        label: 'Prices',
        data: prices,
      },
    ],
  }
  console.log(prices)
  return <Line data={data} />
}

interface PastSearchesProps {
  searches: string[]
  searchAgain: (id: string) => Promise<void>
}

function PastSearches({ searches, searchAgain }: PastSearchesProps) {
  return (
    <div>
      {searches.map((id) => (
        <div key={id}>
          {id} <button onClick={() => searchAgain(id)}>Search again!</button>
        </div>
      ))}
    </div>
  )
}

function Presentation({ crypto }: any): JSX.Element {
  console.log(crypto)
  const isBadCrypto = crypto.market_data.price_change_percentage_24h <= 0
  return (
    <div id="crypto-presentation">
      <h1 style={{ display: 'flex', alignItems: 'center' }}>
        {crypto.name} <img src={crypto.image.small} alt={`${crypto.name} logo`} />
      </h1>
      <h2>Market Cap Rank: {crypto.market_cap_rank}</h2>
      <h3>Symbol: {crypto.symbol}</h3>
      <p style={{ color: isBadCrypto ? 'red' : 'green' }}>
        Percentual 24h price change: {crypto.market_data.price_change_percentage_24h}
      </p>
      <p>Current price in USD: {crypto.market_data.current_price.usd}</p>
    </div>
  )
}

export default Home
