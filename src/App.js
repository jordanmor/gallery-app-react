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

  /* The purpose of this method is to allow a page refresh after a search has been completed. 
  If the page is refreshed after a search, it uses the search parameter as the tag for the 
  initial fetch of images. When the page loads on the home path, the default tag is used. */
  searchOnPageLoad = (tag = 'orange') => {
    const regex = /^\/search\/(.+)/;

    // Current pathname retrieved using the withRouter higher order component
    const { pathname } = this.props.location;

    /* If the pathname begins with a /search route, the search parameter is extracted from 
    the pathname using a regular expression and assigned to the tag variable */
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
              // History, match and location Route props passed on to component
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

/* withRouter will pass updated match, location, and history props 
to the wrapped component whenever it renders. It gives access to the 
history object’s properties and the closest <Route>'s match. This is necessary
because this component is not nested inside a <Route />, which can pass the 
match, location, and history props to it's nested child component */
export default withRouter(App);
