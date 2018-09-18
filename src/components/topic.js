import React from 'react';
import Header from './header';
import Gallery from './gallery';

const Topic = ({ match, topics }) => {

  const { topic: currentTag } = match.params;
  const currentTopic = topics.find(topic => topic.tag === currentTag);
  const title = currentTopic.tag;

  return ( 
    <React.Fragment>
      <Header topics={topics} search={false} />
      <Gallery images={currentTopic.images} title={title} />
    </React.Fragment>
   );
}
 
export default Topic;