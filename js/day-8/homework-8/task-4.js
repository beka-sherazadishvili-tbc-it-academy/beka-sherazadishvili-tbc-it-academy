'use strict';

function summarize(promises) {
    if (!Array.isArray(promises)) {
        return Promise.reject(new Error("INVALID_INPUT"));
    }

    return Promise.allSettled(promises)
        .then((results) => {
            const summary = {
                total: results.length,
                fulfilled: 0,
                rejected: 0,
                values: [],
                reasons: []
            };

            results.forEach((result) => {
                if (result.status === 'fulfilled') {
                    summary.fulfilled++;
                    summary.values.push(result.value);
                } else if (result.status === 'rejected') {
                    summary.rejected++;
                    summary.reasons.push(result.reason);
                }
            });

            return summary;
        });
}
