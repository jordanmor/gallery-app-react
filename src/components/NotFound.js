import React from 'react';
import Header from './Header';

const NotFound = props => (
  
  <React.Fragment>
    <Header 
      topics={props.topics} 
      searchDisplayed={false} 
    />
    <div className="not-found">
      <i className="material-icons icn-error">error_outline</i>
      <h2>Page Not Found</h2>
    </div>
  </React.Fragment>
);

export default NotFound;