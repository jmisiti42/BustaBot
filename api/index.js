const   cors = require('cors'),
        express = require('express'),
        http = require('http'),
        bodyParser = require('body-parser'),
        PORT = 5000,
        app = express(),
        server = http.createServer(app),
        io = require('socket.io')(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/game/add', async (req, res) => {
    let { number, crashedAt, payout, wager } = req.body;
    io.sockets.emit('addGame', [ number, crashedAt, payout, wager ]);
    //Add game in database
    return res.json({ status: 'ok' }); 
});

io.on('connection', client => {
    client.on('getGames', pageNumber => {
        //Get Games from DB and upload them (50 by 50)
        client.emit('gameList', [['1', '2.34x', '2x', '40 Bits' ],['2', '2.91x', '2x', '40 Bits' ]]);
    });

    client.on('disconnect', () => { console.log('disconected') });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
