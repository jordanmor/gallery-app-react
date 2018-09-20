import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Topic from './components/Topic';
import Search from './components/Search';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';
import apiKey from './config';

class App extends Component {
  state = {
      images: [],
      topics: [
        {tag: "pumpkins", images: []},
        {tag: "marigold", images: []},
        {tag: "persimmon", images: []},
        {tag: "oranges", images: []}
      ],
      loading: true
  }

  componentDidMount() {
    this.searchOnPageLoad();
    // Request and load the photos for the three default topics when the app first loads
    this.loadTopics();
  }

  searchOnPageLoad = (tag = 'orange') => {
    const regex = /^\/search\/(.+)/;
    const { pathname } = this.props.location;
    if (regex.test(pathname)) {
      tag = pathname.match(regex)[1];
    }

    this.performSearch(tag);
  }

  performSearch = (tag) => {

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
    const { images, loading, topics } = this.state;

    const tags = topics.map(topic => topic.tag);

    return (
        <div className="container">

          <Header 
            tags={tags}
            onSearch={this.performSearch}
          />

          <Switch>
            <Route 
              path="/topics/:topic"
              render={props => 
                <Topic 
                  {...props}
                  topics={topics}
                  loading={loading}
                />}
            />

            <Route 
              path="/search/:query" 
              render={props => 
                <Search 
                  {...props} 
                  images={images}
                  loading={loading}
                />}
            />

            <Route 
              exact path="/" 
              render={props => 
                <Gallery 
                  {...props} 
                  images={images}
                  loading={loading}
                />
              }
            />
            
            <Route component={NotFound} />
          </Switch>

        </div>
    );
  }
}

export default withRouter(App);
