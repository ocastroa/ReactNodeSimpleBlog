import React from 'react';

const App = ({ children }) => {
  return (
    <div>
      <div id="content">{children}</div>
    </div>
  );
};

export default App;
