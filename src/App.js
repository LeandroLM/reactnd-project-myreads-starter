import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  moveBook = (book, prevShelf, shelf) => {
    BooksAPI.update(book, shelf).then((_books) => {
      this.setState(prevState => ({
        [prevShelf]: prevState[prevShelf].filter(b => (b.id !== book.id)),
        [shelf]: prevState[shelf].concat([book])
      }))
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
        wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
        read: books.filter((book) => book.shelf === 'read')
      });
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' component={SearchBooks}/>
        <Route exact path='/' render={() => (
          <ListBooks books={this.state} onMoveBook={this.moveBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
