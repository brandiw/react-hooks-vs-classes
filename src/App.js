// Modules
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Styles
import './App.css'

// Constants
const API_URL = 'http://hn.algolia.com/api/v1/search?query='
const DEFAULT_QUERY = 'react'

function App() {
  // Declare and initialize state variables
  let [query, setQuery] = useState(DEFAULT_QUERY)
  let [data, setData] = useState({ hits: [] })
  let [tempQuery, setTempQuery] = useState(DEFAULT_QUERY)
  let [name, setName] = useState('Brandi')

  // API call via useEffect
  useEffect(() => {
    // Define a function to get the data
    const getData = async () => {
      let results = await axios(API_URL + query)
      console.log('RESULTS:', results)
      setData(results.data)
    }

    //  Call the function
    getData()
  }, [query]) // Onload only - just empty array

  useEffect(() => {
    console.log("You changed name or query?")
  }, [name, query])

  const search = e => {
    e.preventDefault()
    console.log('Searching for...', tempQuery)
    setQuery(tempQuery)
  }

  // Format the data for the results
  let items = data.hits.map((hit, i) => {
    return (
      <li key={i}>
        <a href={hit.url}>
          {hit.title}
        </a>
      </li>
    )
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>{name}'s Hacker News Feed</h1>
      </header>
      <main>
        <div className="search">
          <h1>Search:</h1>
          <form onSubmit={search}>
            <input
              type="text"
              onChange={ e => setTempQuery(e.target.value) }
              value={tempQuery}
              placeholder="New query"
            />
            <button type="submit">Search</button>
          </form>
          <p>Name:</p>
          <input
            type="text"
            onChange={ e => setName(e.target.value) }
            value={name}
            placeholder="New name"
          />
        </div>
        <hr />
        <div className="results">
          <h1>News about {query}:</h1>
          <ul>
            {items}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
