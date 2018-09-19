import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Gallery from './Gallery';
import NotFound from './NotFound';

const Topic = ({ match, topics }) => {

  const { topic: currentTag } = match.params; // Current topic tag taken from url parameter
  const currentTopic = topics.find(topic => topic.tag === currentTag);

  // 404-like error page displays when topics/:topic url does not match an existing route
  if(!currentTopic) return <Route render={ () => <NotFound topics={topics}/> } />

  const title = currentTopic.tag;

  return ( 
    <React.Fragment>
      <Header 
        topics={topics} 
        search={false} 
      />
      <Gallery 
        images={currentTopic.images} 
        title={title}
      />
    </React.Fragment>
   );
}
 
export default Topic;