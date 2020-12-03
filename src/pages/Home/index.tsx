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
  const [result, setResult] = useState({})
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  async function fetchCryptoInfo(): Promise<any> {
    const id = input
    console.log(id)
    setLoading(true);
    const cryptoInfo = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
      // mode: 'no-cors',
      headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
    })
    return cryptoInfo
  }

  async function submit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log('Hi')
    const response = await fetchCryptoInfo()
    const cryptoInfo = await response.json()
    console.log(cryptoInfo)
    setResult(cryptoInfo)
    setLoading(false);
  }

  return (
    <>
      <form>
        {loading ? <ClipLoader
          size={150}
          color={"#123abc"}
          loading={loading}
        /> : <><div>Please enter your CryptoID here!</div>
        <input type="text" onChange={handleChange} value={input} />
        <button type="submit" onClick={submit}>
          Submit
        </button> 
        </>
}
      </form>
    </>
  )
}

export default Home
