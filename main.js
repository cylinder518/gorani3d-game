let scene, camera, renderer;
let hunger = 50;
let happiness = 50;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 바닥
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0x228B22 });
  const ground = new THREE.Mesh(geometry, material);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // 임시 고라니 (큐브로 대신)
  const boxGeo = new THREE.BoxGeometry();
  const boxMat = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
  window.goraeni = new THREE.Mesh(boxGeo, boxMat);
  scene.add(goraeni);

  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate);

  if (window.goraeni) {
    goraeni.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

// UI 기능
function updateStatus() {
  document.getElementById("status").innerText =
    `배고픔: ${hunger} | 행복: ${happiness}`;
}

function feed() {
  hunger = Math.max(0, hunger - 10);
  updateStatus();
}

function play() {
  happiness = Math.min(100, happiness + 10);
  updateStatus();
}
