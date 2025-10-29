const inputValue = document.querySelector('.listName');
const addBtn = document.querySelector('.addBtn');
const clearBtn = document.querySelector('.clearBtn');
let list = document.querySelector('ul');

addBtn.addEventListener('click', () => {
    const innerText = inputValue.value.trim();
    if(!innerText) { return };
    let liElement = document.createElement('li');
    liElement.textContent = innerText;
    list.prepend(liElement);
    inputValue.value = '';
});

list.addEventListener('click', (e) => {
    const listElement = e.target.closest('li');
    if(!listElement) { return };

    if(listElement) {
       listElement.style.textDecoration = 'line-through';
    }
});

clearBtn.addEventListener('click', () => {
    list.innerHTML = '';
})