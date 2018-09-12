import React, { Component } from 'react';
import Gallery from './components/gallery';
import Header from './components/header';
import apiKey from './.config';

class App extends Component {
  state = {
      images: []
  }

  componentDidMount() {
    this.search();
  }

  search = (tag = 'leaves') => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          images: data.photos.photo
        });
      });
  }

  render() {
    const { images } = this.state;
    return (
      <div className="container">
        <Header />
        <Gallery images={images} />
      </div>
    );
  }
}

export default App;
