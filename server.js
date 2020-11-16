const express = require('express')
const http = require('http')
const createGame = require('./public/game')
const socketIo = require('socket.io')


const app = express()
const server = http.createServer(app)
const sockets = socketIo(server)

const game = createGame.createGame()

game.subscribe((command) => {
    console.log(command)
    sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {

    const playerId = socket.id
    console.log('Player connect with id: ' + playerId )


    game.addPlayer({playerId: playerId})

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId})
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'
        game.movePlayer(command)
    })

})




app.use(express.static('public'))

server.listen(3000, () => {
    console.log('Sever is listening at port: 3000')
})