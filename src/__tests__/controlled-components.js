import React from 'react'
import {cleanup, fireEvent, render, renderIntoDocument, Simulate} from '../'

class SearchBox extends React.Component {
  state = {searchQuery: ''}

  onInputChange = ev => {
    this.setState({searchQuery: ev.target.value})
  }

  render() {
    return (
      <div>
        <label htmlFor="search">
          Search
          <input
            id="search"
            name="search"
            value={this.state.searchQuery}
            onChange={this.onInputChange}
          />
        </label>
        <div data-testid="query-value">
          Showing results for: {this.state.searchQuery}
        </div>
      </div>
    )
  }
}

afterEach(cleanup)

test('updating search query with fireEvent', () => {
  const {getByLabelText, getByTestId} = renderIntoDocument(<SearchBox />)

  const inputNode = getByLabelText('Search')
  const valueNode = getByTestId('query-value')

  inputNode.value = 'giraffe'
  fireEvent.change(inputNode)

  // Assert
  expect(valueNode.textContent).toMatch(/giraffe/)
})

test('updating search query with Simulate.change', () => {
  const {getByLabelText, getByTestId} = render(<SearchBox />)

  const inputNode = getByLabelText('Search')
  const valueNode = getByTestId('query-value')

  inputNode.value = 'giraffe'
  Simulate.change(inputNode)

  // Assert
  expect(valueNode.textContent).toMatch(/giraffe/)
})
