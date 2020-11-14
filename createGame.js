function createGame(){

    const state = {
        players: {
            
        }, 
        fruits: {
            
        },
        screen: {
            width: 9, 
            height: 9
        }
    }

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] ={
            x: playerX, 
            y: playerY,
        }
    }

    function removePlayer(command){
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruits(command){
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] ={
            x: fruitX, 
            y: fruitY,
        }
    }

    function removeFruits(command){
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command){

        const keyPressed = command.keyPressed
        const player = state.players[command.playerId]
        const playerId = command.playerId
        
        console.log(player)

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
        state: state
    }
}

module.exports = game = {
    createGame
}