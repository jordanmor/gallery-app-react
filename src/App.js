import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Topic from './components/topic';
import Home from './components/home';
import Search from './components/search';
import apiKey from './.config';

class App extends Component {
  state = {
      images: [],
      topics: [
        {tag: "pumpkins", images: []},
        {tag: "marigold", images: []},
        {tag: "persimmon", images: []},
        {tag: "oranges", images: []}
      ],
      defaultTag: 'orange leaves',
      loading: true
  }

  componentDidMount() {
    this.performSearch();
    this.loadTopics();
  }

  performSearch = (tag = this.state.defaultTag) => {
    this.setState({ loading: true });
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(data => {
        if (!data.photos.photo.length) tag = 'orange leaves';
        this.setState({
          images: data.photos.photo,
          loading: false,
          defaultTag: tag
        });
      });
  }

  loadTopics() {
    const tags = this.state.topics.map(async topic => {
      const { tag } = topic;
      const photos = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
        .then(res => res.json())
        .then(data => data.photos.photo);
      return {tag, images: photos};
    });
    Promise.all(tags).then(tags => this.setState({topics: tags}));
  }

  render() {
    const { images, topics, defaultTag, loading } = this.state;

    return (
      <BrowserRouter>
        <div className="container">
          <Switch>

            <Route 
              exact path="/search" 
              render={props => 
                <Search {...props} 
                  topics={topics} 
                  onSearch={this.performSearch}
                  loading={loading}
                />
              } 
            />

            <Route 
              path="/search/:query" 
              render={props => 
                <Search {...props} 
                  topics={topics} images={images} 
                  onSearch={this.performSearch}
                  loading={loading}
                /> 
              } 
            />

            <Route 
              path="/:topic" 
              render={props => 
                <Topic {...props} 
                  topics={topics} 
                />
              } 
            />

            <Route 
              exact path="/" 
              render={props => 
                <Home {...props} 
                  topics={topics} 
                  images={images}
                  title={defaultTag}
                  loading={loading}
                /> 
              } 
            />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
