const inputValue = document.getElementsByClassName('textInput')[0];
const submitBtn = document.querySelector('.btn');
const textCounter = document.querySelector('span');


inputValue.addEventListener('input', (e) => {
    let inputLength = e.target.value.trim().length;
    textCounter.innerHTML = inputLength;

    if(inputLength > 100) {
        inputValue.style.color = 'red';
        submitBtn.disabled = true;
    } else {
        inputValue.style.color = 'initial';
        submitBtn.disabled = false;
    }
})