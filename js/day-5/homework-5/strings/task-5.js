'use strict'

function isAnagram(str1, str2) {
    try {
        if(typeof str1 !== 'string' || typeof str2 !== 'string') {
            throw new Error('please enter string values');
        }

        if(str1.length !== str2.length) {
            throw new Error('those trings are not anagram')
        }

        let firstArr = str1.toLocaleLowerCase().split('').sort().join('');
        let secodnArr = str2.toLocaleLowerCase().split('').sort().join('');

        return firstArr === secodnArr;
    } catch (err) {
        return err.message;
    }
}
