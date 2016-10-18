var express = require('express');
var moment = require('moment');
var path = require('path');


var app = express();

app.set('port', process.env.PORT);

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
       res.render('index');
});

app.get('/:timestamp', function (req,res) {

    var time = moment(req.params.timestamp, 'MMMM DD, YYYY', true);
    
    if ( ! time.isValid() ) {
        time = moment.unix(req.params.timestamp);
    }
    
    if ( ! time.isValid() ) {
        res.json({'natural': null, 'unix': null});
    }

    
    res.json({'natural': time.format('MMMM DD, YYYY'), 'unix': time.format('X') });

});

app.listen(app.get('port'), function() {
  console.log('Node.js Server is listening on port ' + app.get('port'));
  });
    
    