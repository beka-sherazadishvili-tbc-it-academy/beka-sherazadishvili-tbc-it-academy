'use strict'

function createCache(ttl) {
    try {
        ttl = Number(ttl);

        if(isNaN(ttl)) {
            throw new Error('Please enter an number');
        }

        if(!isFinite(ttl)) {
            throw new Error('please dont enter infinite number');
        }

        if(!Number.isInteger(ttl)) {
            throw new Error('Please enter integer number');
        }

        const newMap = new Map();
    
        return {
            set(key, value) {
                const expire = Date.now() + ttl;
                newMap.set(key, {value, expire});
            },

            get(key) {
                const mapValue = newMap.get(key);
                if(!mapValue) {
                    return 'EXPIRED';
                }

                const { value, expire } = mapValue;

                if(Date.now() > expire) {
                    newMap.delete(key);
                    return 'EXPIRED'; 
                }

                return value;
            }
        }
    } catch (err) {
        return err.message;
    }
}
