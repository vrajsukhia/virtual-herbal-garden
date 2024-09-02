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
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const container = document.querySelector('.image-container');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
container.style.touchAction = 'none';
const loader = new THREE.TextureLoader();
loader.load('image1.jpeg', function(texture) {
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.set(0, 0, 500);
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    const rotationSpeed = 0.005;
    const minZoom = 200;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += (targetRotationX - sphere.rotation.y) * rotationSpeed;
        sphere.rotation.x += (targetRotationY - sphere.rotation.x) * rotationSpeed;
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaX = (event.clientX - previousMousePosition.x) * rotationSpeed;
            const deltaY = (event.clientY - previousMousePosition.y) * rotationSpeed;
            targetRotationX -= deltaX;
            targetRotationY += deltaY;
        }
        previousMousePosition = { x: event.clientX, y: event.clientY };
    });window.addEventListener('mousedown', (event) => {
        isDragging = true;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
        function isMouseOverContainer(event) {
        const rect = container.getBoundingClientRect();
        return (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
        );
    }

    window.addEventListener('wheel', (event) => {
        if (isMouseOverContainer(event)) {
            event.preventDefault();
            if (event.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        }
    }, { passive: false });
    function zoomIn() {
       camera.position.z -= zoomSpeed;
    camera.position.z = Math.max(minZoom, camera.position.z);
    }
        function zoomOut() {
      camera.position.z += zoomSpeed;
    }
    const fullscreenButton = document.getElementById('fullscreen');
     fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => console.log(`Error attempting to enable fullscreen mode: ${err.message}`));
        } else {
            document.exitFullscreen();
        }
    });
    

    window.addEventListener('resize', () => {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        renderer.setSize(containerWidth, containerHeight);
        camera.aspect = containerWidth / containerHeight;
        camera.updateProjectionMatrix();
    });

});
window.addEventListener('wheel', (event) => {
    if (isMouseOverContainer(event)) {
        event.preventDefault();
    }
}, { passive: false });
