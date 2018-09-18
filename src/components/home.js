import React from 'react';
import Header from './header';
import Gallery from './gallery';

const Home = ({ topics, images, title }) => {
  return ( 
    <React.Fragment>
      <Header topics={topics} search={false} />
      <Gallery images={images} title={title} />
    </React.Fragment>
   );
}
 
export default Home;