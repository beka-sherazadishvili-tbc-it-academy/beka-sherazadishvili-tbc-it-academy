'use stict'

function greet({name = 'guest', lang = 'en'} = {}) {
    try {
        if(
            typeof name !== 'string' ||
            typeof lang !== 'string' || 
            !name.trim() || 
            !lang.trim()
        ) {
            throw new Error('please enter string values')
        }

        name = name.trim();
        lang = lang.trim();

        switch(lang) {
            case 'fr': return `Bonjour, ${name}`;
            case 'en': return `Hello, ${name}`;
            default: throw new Error('please enter correct lang')
        }
    }catch (err) {
        return err.message;
    }
}