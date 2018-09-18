import React from 'react';
import Header from './header';
import Gallery from './gallery';

const Home = ({ topics, images }) => {
  return ( 
    <React.Fragment>
      <Header topics={topics} search={false} />
      <Gallery images={images} />
    </React.Fragment>
   );
}
 
export default Home;