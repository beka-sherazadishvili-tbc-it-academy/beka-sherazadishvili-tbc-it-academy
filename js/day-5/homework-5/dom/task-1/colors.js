const buttons = document.querySelectorAll('.button');
const textTag = document.getElementById('textColor');

buttons.forEach(element => {
    element.addEventListener('click', () => {
        const buttonColor = element.dataset.color;
        textTag.style.color = buttonColor;
    })
})
