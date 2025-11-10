'use strict'

function parseCSV(lines) {
    try {
        if(!Array.isArray(lines) || !lines.every(line => typeof line === 'string')) {
            throw new Error('please neter array with string values');
        }

        const newLine = lines.map(line => {
            const lineArr = line.split(',');
            let [id, name, gpa, active] = lineArr;

            id = Number(id);
            gpa = Number(gpa);
            switch(active.toLowerCase()) {
                case 'true': active = true; break;
                case 'false': active = false; break;
                default: null;
            }

            if(isNaN(id) || isNaN(gpa)) {
                throw new Error('Please enter an number');
            }

            if(!isFinite(id) || !isFinite(gpa)) {
                throw new Error('please dont enter infinite number');
            }

            if(!Number.isInteger(id)) {
                throw new Error('Please enter integer number');
            }

            if(typeof active !== 'boolean') {
                throw new Error('please enter boolean value')
            }

            return { id, name, gpa, active };
        });

        return newLine;
    }catch(err) {
        return err.message;
    }
}
