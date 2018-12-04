const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Serve static files from the React app
const staticFiles = express.static(path.join(__dirname, './../client/build'));

app.use('/*', staticFiles);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  });
});

// global error handler
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});