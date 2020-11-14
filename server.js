const express = require('express')
const http = require('http')
const createGame = require('./createGame')
const socketIo = require('socket.io')


const app = express()
const server = http.createServer(app)
const sockets = socketIo(server)

const game = createGame.createGame()

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})


console.log(game.state)

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log('Player connect with id: ' + playerId )

    socket.emit('setup', game.state)
})


app.use(express.static('public'))

server.listen(3000, () => {
    console.log('Sever is listening at port: 3000')
})