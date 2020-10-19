const express = require('express');

const app = express();

app.listen('3333', () => {
    console.log('back-end started on port 3333 🚀')
});

app.get('/movies', (request, response) => {
    response.send('Hellooo');
})

