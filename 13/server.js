const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

const PORT = 3000;

// Game state
let players = [];
let gameStarted = false;

io.on('connection', socket => {
  console.log('New player connected:', socket.id);

  players.push({ id: socket.id, name: `Player ${players.length+1}`, hand: [], isCPU: false });

  // CPU нэмэх
  if(players.length < 4){
    while(players.length < 4){
      players.push({ id: `CPU_${players.length+1}`, name: `CPU ${players.length}`, hand: [], isCPU: true });
    }
  }

  if(players.length === 4 && !gameStarted){
    startGame();
  }

  socket.on('play', cards => {
    // TODO: дүрэм шалгах, мөр шинэчлэх
    io.emit('update', { message: `${socket.id} played ${cards}` });
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    players = players.filter(p => p.id !== socket.id);
  });
});

function startGame(){
  gameStarted = true;
  // TODO: карт тараах, эхлэх тоглогч сонгох
  io.emit('start', { players });
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
