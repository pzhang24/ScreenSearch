require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
const apiKey = process.env.API_KEY || "";

const path = require('path');
const axios = require('axios');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/search/:type', (req, res) => {
    console.log("Executing a search!")
    const query = req.query;

    const urlTMDB = `https://api.themoviedb.org/3/search/${req.params.type}` +
    `?api_key=${apiKey}` +
    `${query.language ? `&language=${query.language}` : ``}` + 
    `&query=${query.query}` + 
    `${query.page ? `&page=${query.page}` : ``}` + 
    `${(query.include_adult !== undefined) ? `&include_adult=${query.include_adult}` : ``}` + 
    `${(query.region ? `&region=${query.region}` : ``)}`;

    console.log(urlTMDB);

    axios.get(urlTMDB)
        .then(
            (response) => {console.log(response.data);
            res.json(response.data);
        })
        .catch(
            (error) => {console.log(error);
            res.status(400).json(error);
        });
    
});

//Rename path to '/api/:mediaType/:id/primary_info' (and change this in the front end too!)
app.get('/api/primary_info/:type/:id', (req, res) => {
    console.log(`Getting ${req.params.type} info!`);

    const query = req.query;
    const urlTMDB = `https://api.themoviedb.org/3/${req.params.type}/${req.params.id}` + 
    `?api_key=${apiKey}` +
    `${query.language ? `&language=${query.language}` : ``}` + 
    `${query.append_to_response ? `&append_to_response=${query.append_to_response}` : ``}`;

    console.log(urlTMDB);

    axios.get(urlTMDB)
        .then(
            (response) => {console.log(response.data);
            res.json(response.data);
        })
        .catch(
            (error) => {console.log(error);
            res.status(400).json(error);
        });
})

//can merge this with the other movie and tv deets
app.get('/api/:type/:id/credits', (req, res) => {
    console.log(`Getting ${req.params.type} credits!`);

    const urlTMDB = `https://api.themoviedb.org/3/${req.params.type}/${req.params.id}/credits` + 
    `?api_key=${apiKey}`;

    console.log(urlTMDB);

    axios.get(urlTMDB)
        .then(
            (response) => {console.log(response.data);
            res.json(response.data);
        })
        .catch(
            (error) => {console.log(error);
            res.status(400).json(error);
        });
})

app.get('/api/person/:id/:path_params', (req, res) => {
    console.log(`Getting person combined credits!`);

    const urlTMDB = `https://api.themoviedb.org/3/person/${req.params.id}/${req.params.path_params}` + 
    `?api_key=${apiKey}`;

    console.log(urlTMDB);

    axios.get(urlTMDB)
        .then(
            (response) => {console.log(response.data);
            res.json(response.data);
        })
        .catch(
            (error) => {console.log(error);
            res.status(400).json(error);
        });
})

// https://daveceddia.com/deploy-react-express-app-heroku/
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//https://sheltered-citadel-85061.herokuapp.com/ 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));