'use strict'

function fastestServer() {
    const server1 = new Promise((res) => {
        const randomDelay = Math.floor(Math.random() * 901) + 100;
        setTimeout(() => {
            res('Server1 OK')
        }, randomDelay)
    })

    const server2 = new Promise((res) => {
        const randomDelay = Math.floor(Math.random() * 901) + 100;
        setTimeout(() => {
            res('Server2 OK')
        }, randomDelay)
    })

    const server3 = new Promise((res) => {
        const randomDelay = Math.floor(Math.random() * 901) + 100;
        setTimeout(() => {
            res('Server3 OK')
        }, randomDelay)
    })

    return Promise.race([server1, server2, server3])
        .then((fastestServer) => {
            console.log(`Fastest response: ${fastestServer}`);
            return fastestServer;
    })
}

fastestServer()