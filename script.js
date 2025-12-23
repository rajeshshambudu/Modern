let scene, camera, renderer, cube;

// Initialize 3D Scene
function init3D() {
    const container = document.getElementById('canvas-container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / 300, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, 300);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 5;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
}

function updatePreview(x, y, z) {
    cube.scale.set(x, y, z);
}

// BEAM CALCULATION
function calculateBeam() {
    const L = parseFloat(document.getElementById('beamSpan').value);
    const b = parseFloat(document.getElementById('beamWidth').value);
    const d = parseFloat(document.getElementById('beamDepth').value);
    const fck = parseInt(document.getElementById('concreteGrade').value);
    const fy = parseInt(document.getElementById('steelGrade').value);
    
    // Moment Calculation (wL^2/8) assuming 25kN/m
    const Mu = (25 * L * L) / 8;
    const Mu_lim = (0.138 * fck * b * d * d) / 10**6;
    
    const isSafe = Mu_lim >= Mu;
    const status = isSafe ? "<b style='color:green'>SAFE</b>" : "<b style='color:red'>UNSAFE - Increase Depth</b>";

    document.getElementById('beamOutput').innerHTML = `
        Design Moment: ${Mu.toFixed(2)} kNm<br>
        Moment Capacity: ${Mu_lim.toFixed(2)} kNm<br>
        Status: ${status}
    `;
    updatePreview(L/2, d/200, b/200);
}

// COLUMN CALCULATION
function calculateColumn() {
    const b = parseFloat(document.getElementById('colWidth').value);
    const D = parseFloat(document.getElementById('colDepth').value);
    const bars = parseInt(document.getElementById('colBars').value);
    const dia = parseInt(document.getElementById('colBarSize').value);
    
    const Asc = bars * (Math.PI / 4) * (dia**2);
    const Pu = (0.4 * 20 * (b * D - Asc) + 0.67 * 415 * Asc) / 1000;

    document.getElementById('columnOutput').innerHTML = `
        Steel Area: ${Asc.toFixed(0)} mm²<br>
        Axial Capacity: ${Pu.toFixed(2)} kN
    `;
    updatePreview(b/100, 4, D/100);
}

// FOUNDATION CALCULATION
function updateSBC() {
    document.getElementById('soilBearingCapacity').value = document.getElementById('soilType').value;
}

function calculateFoundation() {
    const W = parseFloat(document.getElementById('foundationWidth').value);
    const L = parseFloat(document.getElementById('foundationLength').value);
    const load = parseFloat(document.getElementById('columnLoad').value);
    const sbc = parseFloat(document.getElementById('soilBearingCapacity').value);

    const pressure = load / (W * L);
    const status = pressure <= sbc ? "<span style='color:green'>SAFE</span>" : "<span style='color:red'>UNSAFE</span>";

    document.getElementById('foundationOutput').innerHTML = `
        Actual Pressure: ${pressure.toFixed(2)} kN/m²<br>
        Soil Capacity: ${sbc} kN/m²<br>
        Status: ${status}
    `;
    updatePreview(W, 0.5, L);
}

function downloadReport() {
    let content = "STRUCTURAL REPORT\n" + document.body.innerText;
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'report.txt'; a.click();
}

function clearAllFields() {
    location.reload();
}

window.onload = init3D;
