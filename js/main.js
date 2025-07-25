var menuIcon = document.querySelector('.menu-icon');
var link = document.querySelector('#link');
var linkTwo = document.querySelector('#link-two');
var three = document.querySelector('#link-three');
var four = document.querySelector('#link-four');
var five = document.querySelector('#link-five');
var ul = document.querySelector('.ul');
var scrollMouse = document.querySelector('.body');

menuIcon.addEventListener('click', ()=> {
    if (ul.classList.contains('ativo')) {
        ul.classList.remove('ativo');
        document.querySelector('.menu-icon img').src = 'img/menu.png';
    } else {
        ul.classList.add('ativo');
        document.querySelector('.menu-icon img').src = 'img/close.png';
    }
})

menuIcon.addEventListener('click', ()=> {
    if (scrollMouse.classList.contains('ativo')) {
        scrollMouse.classList.remove('ativo');
    } else {
        scrollMouse.classList.add('ativo');
    }
})

link.addEventListener('click', ()=> {
    if (ul.classList.contains('ativo')) {
        ul.classList.remove('ativo');
        document.querySelector('.menu-icon img').src = 'img/menu.png'
    } else {
        ul.classList.add('ativo');
    }
})

linkTwo.addEventListener('click', ()=> {
    if (ul.classList.contains('ativo')) {
        ul.classList.remove('ativo');
        scrollMouse.classList.remove('ativo');
        document.querySelector('.menu-icon img').src = 'img/menu.png'
    } else {
        ul.classList.add('ativo');
    }
})

three.addEventListener('click', ()=> {
    if (ul.classList.contains('ativo')) {
        ul.classList.remove('ativo');
        scrollMouse.classList.remove('ativo');
        document.querySelector('.menu-icon img').src = 'img/menu.png'
    } else {
        ul.classList.add('ativo');
    }
})

four.addEventListener('click', ()=> {
    if (ul.classList.contains('ativo')) {
        ul.classList.remove('ativo');
        scrollMouse.classList.remove('ativo');
        document.querySelector('.menu-icon img').src = 'img/menu.png'
    } else {
        ul.classList.add('ativo');
    }
})

five.addEventListener('click', ()=> {
    if (ul.classList.contains('ativo')) {
        ul.classList.remove('ativo');
        scrollMouse.classList.remove('ativo');
        document.querySelector('.menu-icon img').src = 'img/menu.png'
    } else {
        ul.classList.add('ativo');
    }
})