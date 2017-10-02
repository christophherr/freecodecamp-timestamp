/* eslint import/unambiguous: 0 */
const express = require('express'),
    moment = require('moment'),
    path = require('path'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use('/assets', express.static(path.join(__dirname, '/public')));

// Not quite sure why... I'm not using it in index.html
// and haven't created a template for the json response...
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:timestamp', (req, res) => {
    // Convert user input into a natural date.
    let time = moment(req.params.timestamp, 'MMMM DD, YYYY', true);

    // If it's not a natural date, convert it to a unix date.
    if (!time.isValid()) {
        time = moment.unix(req.params.timestamp);
    }
    // If it's also not a unix date (still invalid), return null.
    if (!time.isValid()) {
        res.json({ natural: null, unix: null });
    }

    res.json({ natural: time.format('MMMM DD, YYYY'), unix: time.format('X') });
});

app.listen(app.get('port'), () => {
    console.log('Node.js Server is listening on port ' + app.get('port'));
});
