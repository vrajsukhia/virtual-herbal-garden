let next = document.getElementById('next');
let pre = document.getElementById('prev');
let car = document.querySelector('.car');
let list = document.querySelector('.car .list');
let th = document.querySelector('.car .th');

next.onclick = function(){
    ss('next')
}
pre.onclick = function(){
    ss('pre')
}
let tr =2000;
let tan =10000;
let rto;
let rao;

function ss(type){
    let its = document.querySelectorAll('.car .list .item');
    let itt = document.querySelectorAll('.car .th .item');

    if (type === 'next'){
        list.appendChild(its[0]);
        th.appendChild(itt[0]);
        car.classList.add('next');
    }else{
        let pli = its.length-1;
        list.prepend(its[pli]);
        th.prepend(itt[pli]) ;
        car.classList.add('pre'); 
    }


    clearTimeout(rto);
    rto = setTimeout( () =>{
        car.classList.remove('next');
        car.classList.remove('pre');
    },tr)

    clearTimeout(rao);
    startAutoRotate();
}
function startAutoRotate() {
    rao = setInterval(() => {
        ss('next');
    }, tan);
}

window.onload = function() {
    startAutoRotate();
}
document.getElementById('goTotulsi').addEventListener('click', function() {
    window.location.href = 'tulsi3d.html';
});
document.getElementById('goTomu').addEventListener('click', function() {
    window.location.href = 'mu3d.html';
});
document.getElementById('gotola').addEventListener('click', function() {
    window.location.href = 'lav3d.html';
});
document.getElementById('gotoec').addEventListener('click', function() {
    window.location.href = 'ec3d.html';
});

