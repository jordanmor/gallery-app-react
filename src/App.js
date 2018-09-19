import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Topic from './components/Topic';
import Home from './components/Home';
import Search from './components/Search';
import NotFound from './components/NotFound';
import apiKey from './config';

class App extends Component {
  state = {
      images: [],
      topics: [
        {tag: "pumpkins", images: []},
        {tag: "marigold", images: []},
        {tag: "oranges", images: []}
      ],
      defaultTag: 'orange leaves',
      loading: true
  }

  componentDidMount() {
    this.performSearch();
    // Request and load the photos for the three default topics when the app first loads
    this.loadTopics();
  }

  performSearch = (tag = this.state.defaultTag) => {
    this.setState({ loading: true });
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(data => {
        // If search has no results, revert to defaultTag
        if (!data.photos.photo.length || !data.photos.photo) tag = 'orange leaves';
        this.setState({
          images: data.photos.photo,
          loading: false,
          defaultTag: tag // Update defaultTag to current search text
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
              // History, match and location Route props passed on to component
              render={props => 
                <Search {...props}
                  topics={topics} 
                  onSearch={this.performSearch}
                  loading={loading}
                />
              } 
            />

            <Route 
              exact path="/search/:query" 
              render={props => 
                <Search {...props} 
                  topics={topics} 
                  images={images} 
                  onSearch={this.performSearch}
                  loading={loading}
                /> 
              } 
            />

            <Route 
              exact path="/topics/:topic"
              render={props => 
                <Topic {...props} 
                  topics={topics} 
                />
              } 
            />

            <Route 
              exact path="/" 
              render={() => 
                <Home
                  topics={topics} 
                  images={images}
                  title={defaultTag}
                  loading={loading}
                /> 
              } 
            />

            <Route render={ () => <NotFound topics={topics}/> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
