function createKeyboardListener(){

    const state = {
        observers: []
    }

    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }

    function notifyAll(command){
        console.log(`Notifying ${state.observers.length} observers`)

        for(const observerFunction of state.observers){
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeyDown)

    function handleKeyDown(event) {
        const keyPressed = event.key
        const player = game.state.players[currentPlyerId]

        const command = {
            playerId: 'player1',
            keyPressed: keyPressed
        }

        // game.movePlayer(command)
        notifyAll(command)

    }

    return {
        subscribe: subscribe
    }
}