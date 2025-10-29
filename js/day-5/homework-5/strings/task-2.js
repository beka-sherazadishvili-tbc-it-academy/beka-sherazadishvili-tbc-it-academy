'use strict'

function isPalindrome(str) {
    try {
        if (typeof str !== 'string') {
            throw new Error('please enter a string value');
        }

        str = str.toLocaleLowerCase().replace(/[^a-z0-9]/g, '');

        return str === str.split('').reverse().join('');
    } catch (err) {
        return err.message;
    }
}

function isPalindromeWithoutHelper(str) {
    try {
        if (typeof str !== 'string') {
            throw new Error('please enter a string value');
        }

        str = str.toLocaleLowerCase().replace(/[^a-z0-9]/g, '');
        let right = 0;
        let left = str.length - 1;
        while(right < left) {
            if(str[right] !== str[left]) { return false; }
            right++;
            left--;
        }

        return true
    } catch (err) {
        return err.message;
    }
}
