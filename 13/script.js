const socket = io();

socket.on('start', data => {
  console.log('Game started:', data);
  renderGame(data.players);
});

socket.on('update', data => {
  console.log('Update:', data);
});

function renderGame(players){
  const gameDiv = document.getElementById('game');
  gameDiv.innerHTML = '';
  players.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${p.name}</strong>: ${p.hand.join(', ')}`;
    gameDiv.appendChild(div);
  });
}
