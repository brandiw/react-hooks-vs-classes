// Modules
import React from 'react'
import axios from 'axios'

// Styles
import './App.css'

// Constants
const API_URL = 'http://hn.algolia.com/api/v1/search?query='
const DEFAULT_QUERY = 'react'

class AppClass extends React.Component {
  state = {
    query: DEFAULT_QUERY,
    tempQuery: DEFAULT_QUERY,
    data: {
      hits: []
    },
    name: 'Brandi'
  }

  componentDidMount() {
    console.log('Component did mount!')
    this.callApi()
  }

  callApi = () => {
    // Define a function to get the data
    const getData = async () => {
      let results = await axios(API_URL + this.state.query)
      console.log('RESULTS:', results)
      this.setState({ data: results.data })
    }

    //  Call the function
    getData()
  }

  search = e => {
    e.preventDefault()
    console.log('Hello!', this.state.tempQuery)
    this.setState({ query: this.state.tempQuery }, () => {
      this.callApi()
    })

    // Uh-Oh this is a race condition!
    // this.setState({ query: this.state.tempQuery })
    // this.callApi()
  }

  render() {
    console.log('Render')
    // Format the data for the results
    let items = this.state.data.hits.map((hit, i) => {
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
          {this.state.name}'s Hacker News Feed - but with classes!
        </header>
        <main>
          <div className="search">
            <h1>Search:</h1>
            <form onSubmit={this.search}>
              <input
                type="text"
                value={this.state.tempQuery}
                onChange={ e => this.setState({ tempQuery: e.target.value }) }
              />
              <button type="submit">Submit</button>
            </form>
            <p>Name:</p>
            <input
              type="text"
              onChange={ e => this.setState({ name: e.target.value}) }
              value={this.state.name}
              placeholder="New name"
            />
          </div>
          <div className="results">
            <h1>News about {this.state.query}</h1>
            <ul>
              {items}
            </ul>
          </div>
        </main>
      </div>
    )
  }
}

export default AppClass
