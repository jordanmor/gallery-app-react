import React, { Component } from 'react';
import Gallery from './components/gallery';
import Header from './components/header';
import Loader from './components/loader';
import apiKey from './.config';

class App extends Component {
  state = {
      images: [],
      loading: true
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (tag = 'orange leaves') => {
    this.setState({ loading: true });
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          images: data.photos.photo,
          loading: false
        });
      });
  }

  render() {
    const { images } = this.state;

    return (
      <div className="container">
        <Header onSearch={this.performSearch} />
        {
          this.state.loading
          ? <Loader />
          : <Gallery images={images} />
        }
      </div>
    );
  }
}

export default App;
