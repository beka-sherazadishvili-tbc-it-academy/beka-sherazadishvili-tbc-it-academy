const imgs = document.querySelectorAll('.gallery img')
const mainBody = document.body;

const modal = document.createElement('div');
modal.className = 'modal';

const closeBtn = document.createElement('span');
closeBtn.className = 'closeBtn';
closeBtn.textContent = 'X';

const modalImg = document.createElement('img');
modalImg.src = ' ';

modal.appendChild(closeBtn);
modal.appendChild(modalImg);

imgs.forEach(img => {
    img.addEventListener('click', (e) => {
        mainBody.appendChild(modal);
        
        const src = e.target.src;

        modalImg.src = src;
    })
})

modal.addEventListener('click', (e) => {
    if(e.target.closest('img')) { return; }

    modal.remove();
})

mainBody.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && mainBody.contains(modal)) {
        modal.remove();
    }
})