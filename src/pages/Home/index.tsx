import React, { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { CryptoInfo, GraphData } from './types'
import { CryptoInfoComponent } from './CryptoInfo'
import { ChartPresentation } from './Chart'
import { PastSearchesComponent } from './PastSearches'

const defaultCrypto = 'bitcoin'
const baseURL = 'https://api.coingecko.com/api/v3/coins/'

function Main(): JSX.Element {
  const [input, setInput] = useState(defaultCrypto)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CryptoInfo | false>(false)
  const [pastSearches, setPastSearches] = useState<string[]>([])
  const [graphData, setGraphData] = useState<GraphData | false>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  async function fetchCryptoInfo(id: string): Promise<Response> {
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

  async function fetchMarketInfo(id: string): Promise<Response> {
    const marketInfo = await fetch(`${baseURL}/${id}/market_chart?vs_currency=usd&days=7`, {
      headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
    })
    return marketInfo
  }

  async function searchAndSaveCrypto(id: string) {
    try {
      const cryptoResponse = await fetchCryptoInfo(id)
      const cryptoInfo = await cryptoResponse.json()
      saveCryptoInfo(cryptoInfo)

      const marketResponse = await fetchMarketInfo(id)
      const marketInfo = await marketResponse.json()
      saveGraphData(marketInfo)
    } catch (error) {
      alert(error)
    }
  }

  function saveGraphData(marketInfo: GraphData) {
    if ('error' in marketInfo)
      throw new Error('There was an error fetching the data to form the graph...')
    setGraphData(marketInfo)
  }

  function saveCryptoInfo(cryptoInfo: CryptoInfo) {
    if ('error' in cryptoInfo)
      throw new Error('Error fetching the id. Probably it does not  exist... Try using lower case!')
    setPastSearches(Array.from(new Set([...pastSearches, input])))
    setResult(cryptoInfo)
  }

  return (
    <>
      {loading ? (
        <ClipLoader size={150} color={'#123abc'} loading={loading} />
      ) : (
        <div>
          <form>
            <p>Please enter your CryptoID here!</p>
            <input type="text" onChange={handleChange} value={input} />
            <button type="submit" onClick={submit}>
              Submit
            </button>
          </form>
          {result && (
            <PastSearchesComponent
              current={result.id}
              searches={pastSearches}
              searchAgain={searchAndSaveCrypto}
            />
          )}
        </div>
      )}
      {result && <CryptoInfoComponent crypto={result} />}
      {graphData && <ChartPresentation graphData={graphData} />}
    </>
  )
}

export default Main
