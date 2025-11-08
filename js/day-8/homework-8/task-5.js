'use strict'

async function fetchWithRetry(fn, retries) {
    let totalAtempt = 0;
    let lastError;

    while (totalAtempt <= retries) {
        try {
            const result = await fn();
            return result;
        } catch (error) {
            lastError = error;
            totalAtempt++;
            
            if (totalAtempt > retries) {
                throw new Error(`FAILED_AFTER_${totalAtempt}_TRIES`);
            }
        }
    }
}
