let scene, camera, renderer;
let goraeni;

// 상태값
let hunger = 50;
let happiness = 50;
let energy = 50;

// 행동 상태
let state = "idle";

init();
animate();
setInterval(gameLoop, 1000);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 빛
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  // 바닥
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x228B22 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // 고라니 (임시 모델)
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x8B4513 })
  );
  head.position.set(1, 0.3, 0);

  goraeni = new THREE.Group();
  goraeni.add(body);
  goraeni.add(head);
  scene.add(goraeni);
}

function animate() {
  requestAnimationFrame(animate);

  // 상태별 애니메이션
  if (state === "idle") {
    goraeni.rotation.y += 0.005;
  }

  if (state === "play") {
    goraeni.position.x = Math.sin(Date.now() * 0.005) * 2;
  }

  if (state === "rest") {
    goraeni.rotation.z = 0.2;
  } else {
    goraeni.rotation.z = 0;
  }

  renderer.render(scene, camera);
}

// 게임 루프 (시간 흐름)
function gameLoop() {
  hunger += 2;
  happiness -= 1;
  energy -= 1;

  // 상태 영향
  if (hunger > 80) happiness -= 2;
  if (energy < 20) happiness -= 2;

  // 게임오버 느낌
  if (hunger >= 100) {
    alert("고라니가 배고파서 떠났어요 😢");
    resetGame();
  }

  updateUI();
}

// UI 업데이트
function updateUI() {
  document.getElementById("status").innerText =
    `배고픔: ${hunger} | 행복: ${happiness} | 에너지: ${energy}`;
}

// 행동
function feed() {
  hunger = Math.max(0, hunger - 15);
  state = "idle";
  updateUI();
}

function play() {
  happiness = Math.min(100, happiness + 15);
  energy -= 10;
  state = "play";
  updateUI();
}

function rest() {
  energy = Math.min(100, energy + 20);
  state = "rest";
  updateUI();
}

function resetGame() {
  hunger = 50;
  happiness = 50;
  energy = 50;
}
