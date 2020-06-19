require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
const apiKey = process.env.API_KEY || "";

const path = require('path');
const axios = require('axios');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

//Should intercept everything under /api
app.get('/api(/*)', (req, res) => {
    console.log("Testing!");
    const url = req.originalUrl.substring(5); //remove '/api/'
    const routeEnd = (url.indexOf('?') == -1) ? url.length : url.indexOf('?');
    const route = url.substring(0, routeEnd);
    const query = (routeEnd == url.length) ? '' : `&${url.substring(routeEnd + 1)}`;
    console.log(route);
    console.log(query);

    const urlTMDB = `https://api.themoviedb.org/3/${route}?api_key=${apiKey}${query}`;
    console.log("urlTMDB is: " + urlTMDB);

    axios.get(urlTMDB)
        .then(
            (response) => {
            res.json(response.data);
        })
        .catch(
            (error) => {console.log(error);
            res.status(400).json(error);
    });

});


// https://daveceddia.com/deploy-react-express-app-heroku/
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//https://sheltered-citadel-85061.herokuapp.com/ 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));