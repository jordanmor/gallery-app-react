import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Topic from './components/Topic';
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
      title: '',
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
        this.setState({
          images: data.photos.photo,
          title: tag,
          loading: false
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

  setTitle = title =>
    this.setState({title});

  render() {
    const { images, title, loading, topics } = this.state;

    const galleryData = {images, title, loading};
    const tags = topics.map(topic => topic.tag);

    return (
      <BrowserRouter>
        <div className="container">

          <Header 
            tags={tags}
            onSearch={this.performSearch}
            setTitle={this.setTitle}
          />

          <Switch>
            <Route 
              exact path="/topics/:topic"
              render={props => 
                <Topic 
                  {...props}
                  topics={topics}
                  loading={loading}
                />}
            />

            <Route 
              exact path="/search/:query" 
              render={props => <Gallery {...props} {...galleryData} />}
            />

            <Route 
              exact path="/" 
              render={() => <Gallery {...galleryData} />
              }
            />
            
            <Route component={NotFound} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
