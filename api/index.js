const   cors = require('cors'),
        express = require('express'),
        ws = require('ws'),
        http = require('http'),
        bodyParser = require('body-parser');

const PORT = 5000;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/games/create', async (req, res) => {
	const { hash, cmd } = req.body;
	const process = findProcess(pid);

	if (!process) {
		res.send(JSON.stringify({ error: true }));
	} else {
		process.stdin.write(`${cmd} && echo "\nDISPLAYNEWLINE"\n`);
		// process.stdin.write('echo ""\n');
		res.send(JSON.stringify({ error: false }));
	}
});

app.get('/test', (req, res) => {
    io.sockets.emit('addGame', ['1', '2', '2', '40']);
   return res.send('ok'); 
});


io.on('connection', client => {
    client.on('getGames', data => { 
        client.emit('gameList', [['1', '2', '2', '40' ],['2', '2', '2', '40' ]]);
    });

    client.on('disconnect', () => { console.log('disconected') });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
