function createGame(){

    const state = {
        players: {
            
        }, 
        fruits: {
            
        },
        screen: {
            width: 10, 
            height: 10
        }
    }

    const observers = []

    function start(){
        const frequency = 2000

        setInterval(addFruits, frequency)
    }

    function subscribe(observerFunction){
        observers.push(observerFunction)
    }

    function notifyAll(command){
        for(const observerFunction of observers){
            observerFunction(command)
        }
    }

    function setState(newState){
        Object.assign(state, newState)
    }

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

        state.players[playerId] ={
            x: playerX, 
            y: playerY,
        }

        notifyAll({
            type: 'add-player', 
            playerId: playerId, 
            playerX: playerX, 
            playerY: playerY
        })
    }

    function removePlayer(command){
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player', 
            playerId: playerId
        })
    }

    function addFruits(command){
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 100000000)
        const fruitX = command in command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
        const fruitY = command in command ? command.fruitY : Math.floor(Math.random() * state.screen.height)


        state.fruits[fruitId] ={
            x: fruitX, 
            y: fruitY,
        }

        notifyAll({
            type: 'add-fruit', 
            fruitId: fruitId, 
            fruitX: fruitX, 
            fruitY: fruitY
        })
    }

    function removeFruits(command){
        const fruitId = command.fruitId

        delete state.fruits[fruitId]

        notifyAll({
            type: 'remove-fruit', 
            fruitId: fruitId
        })
    }

    function movePlayer(command){

        notifyAll(command)

        const keyPressed = command.keyPressed
        const player = state.players[command.playerId]
        const playerId = command.playerId

        const acceptedMoves = {
            ArrowUp(player){
                if(player.y - 1 >= 0){
                    player.y = player.y - 1
                } 
                return
            },
            ArrowDown(player){
                if(player.y + 1 <= state.screen.height){
                    player.y = player.y + 1
                }
                return
                
            },
            ArrowLeft(player){
                if(player.x - 1 >= 0){
                    player.x = player.x - 1
                }
                return
            }, 
            ArrowRight(player){
                if(player.x + 1 <= state.screen.width){
                    player.x = player.x + 1
                }
                return
            }, 
            w(player){
                if(player.y - 1 >= 0){
                    player.y = player.y - 1
                }
                return
            },
            W(player){
                if(player.y - 1 >= 0){
                    player.y = player.y - 1
                }
                return
            },
            a(player){
                if(player.x - 1 >= 0){
                    player.x = player.x - 1
                }
                return
            },
            A(player){
                if(player.x - 1 >= 0){
                    player.x = player.x - 1
                }
                return
            },
            s(player){
                if(player.y + 1 <= state.screen.height){
                    player.y = player.y + 1
                }
                return
            }, 
            S(player){
                if(player.y + 1 <= state.screen.height){
                    player.y = player.y + 1
                }
                return
            }, 
            d(player){  
                if(player.x + 1 <= state.screen.width){
                    player.x = player.x + 1
                }
                return
            }, 
            D(player){
                if(player.x + 1 <= state.screen.width){
                    player.x = player.x + 1
                }
                return
            }
            
        }

        const moveFunction = acceptedMoves[keyPressed]
        
        if(player && moveFunction){
            moveFunction(player)
            checkForFruitCollision(playerId)
        }

    }

    function checkForFruitCollision(playerId){

            const player = state.players[playerId]

            for(const fruitId in state.fruits){
                const fruit = state.fruits[fruitId]
                
                if(player.x === fruit.x && player.y === fruit.y){
                    removeFruits({fruitId: fruitId})
                }
            }
        
    }

    return {
        addPlayer: addPlayer,
        removePlayer: removePlayer,
        addFruits: addFruits, 
        removeFruits: removeFruits,
        movePlayer: movePlayer, 
        state: state, 
        setState: setState, 
        subscribe: subscribe, 
        start
    }
}

module.exports = game = {
    createGame
}