'use strict'

async function runQueue(tasks, delay) {
    if (!Array.isArray(tasks)) {
        throw new Error('please enter an array');
    }
    
    if (delay === null || delay === undefined) {
        throw new Error('delay can not be null or undefined');
    }
    
    delay = Number(delay);
    
    if (isNaN(delay)) {
        throw new Error('please enter number value');
    }
    
    if (!isFinite(delay)) {
        throw new Error('please enter finite value');
    }
    
    if (delay < 0) {
        throw new Error('please enter positive number');
    }
    
    const results = [];
    
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        
        const result = await task();
        results.push(result);
        
        if (i < tasks.length - 1) {
            await new Promise((res) => {
                setTimeout(res, delay);
            });
        }
    }
    
    return results;
}
    