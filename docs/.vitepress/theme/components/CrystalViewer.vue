<template>
  <div class="crystal-viewer-container" ref="containerRef">
    <!-- UI Overlay Controls -->
    <div class="crystal-ui-overlay">
      <div class="crystal-controls-group">
        <!-- Structure Selector -->
        <select v-model="currentStructure" class="crystal-select" @change="onStructureChange">
          <option value="diamond">💎 鑽石結構 (Diamond / Si)</option>
          <option value="zincblende">🔴 閃鋅礦 (Zincblende / GaAs)</option>
          <option value="fcc">🔷 面心立方 (FCC)</option>
        </select>

        <!-- Miller Plane Selector -->
        <select v-model="activePlane" class="crystal-select" @change="onPlaneChange">
          <option value="none">晶面切面: 無</option>
          <option value="100">晶面 (100)</option>
          <option value="110">晶面 (110)</option>
          <option value="111">晶面 (111)</option>
        </select>

        <!-- Cell Count Toggle -->
        <button class="crystal-btn btn-cell" @click="toggleGridSize">
          {{ gridSize === 1 ? '📦 單一晶胞 (1 Cell)' : '🧱 超晶胞 (2x2x2)' }}
        </button>

        <!-- Bonds Toggle -->
        <button 
          class="crystal-btn" 
          :class="{ active: isShowBonds }" 
          @click="toggleBonds"
        >
          鍵結: {{ isShowBonds ? '開' : '關' }}
        </button>

        <!-- Auto Rotate Toggle -->
        <button 
          class="crystal-btn" 
          :class="{ active: isAutoRotate }" 
          @click="toggleRotate"
        >
          旋轉: {{ isAutoRotate ? '轉' : '停' }}
        </button>
      </div>

      <!-- Hint Badge -->
      <div class="crystal-hint-badge">
        🖱️ 拖曳旋轉 ｜ 滾輪縮放 ｜ 右鍵平移
      </div>
    </div>

    <!-- 3D Canvas Mount Point -->
    <div class="crystal-canvas" ref="canvasContainerRef"></div>

    <!-- Bottom Info Card -->
    <div class="crystal-info-card">
      <strong class="info-title">{{ structureInfo.title }}</strong>
      <div class="info-content" v-html="structureInfo.desc"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  defaultStructure?: 'diamond' | 'zincblende' | 'fcc'
  showBonds?: boolean
  autoRotate?: boolean
}>(), {
  defaultStructure: 'diamond',
  showBonds: true,
  autoRotate: false
})

const containerRef = ref<HTMLElement | null>(null)
const canvasContainerRef = ref<HTMLElement | null>(null)

const currentStructure = ref<'diamond' | 'zincblende' | 'fcc'>(props.defaultStructure)
const activePlane = ref<'none' | '100' | '110' | '111'>('none')
const gridSize = ref<1 | 2>(1)
const isShowBonds = ref<boolean>(props.showBonds)
const isAutoRotate = ref<boolean>(props.autoRotate)

const infoMap = {
  diamond: {
    title: '💎 鑽石晶格結構 (Diamond Structure - 矽 Si)',
    desc: `<strong>原子構成</strong>：<br>
    • <span style="color:#06b6d4; font-weight:600;">青色球</span>：第 1 套 FCC 晶格（8 個頂點 + 6 個面心，等效 4 個原子）。<br>
    • <span style="color:#f59e0b; font-weight:600;">金色球</span>：第 2 套穿插原子（4 個完全落在內部四面體空隙 1/4 體對角線處）。<br>
    • <strong>等效原子數</strong>：單一晶胞等效包含 <strong>8 個矽原子</strong>。體密度 \\(\\rho_V = 8 / a^3 \\approx 5.0 \\times 10^{22}\\text{ cm}^{-3}\\)。`
  },
  zincblende: {
    title: '🔴 閃鋅礦結構 (Zincblende Structure - GaAs)',
    desc: `<strong>原子構成</strong>：<br>
    • <span style="color:#94a3b8; font-weight:600;">金屬銀灰色球 (Ga)</span>：佔據原點 FCC 晶格格點。<br>
    • <span style="color:#ef4444; font-weight:600;">紅色球 (As)</span>：佔據體對角線 1/4 穿插四面體間隙。<br>
    • 單一晶胞等效包含 <strong>4 個 Ga + 4 個 As 原子</strong>（配位數 Z = 4，共價鍵結合）。`
  },
  fcc: {
    title: '🔷 面心立方晶格 (FCC - Face-Centered Cubic)',
    desc: `<strong>原子構成</strong>：<br>
    • 8 個頂點原子（各貢獻 1/8）+ 6 個面心原子（各貢獻 1/2）。<br>
    • 單一晶胞等效包含 <strong>4 個原子</strong>，最近鄰配位數 Z = 12。最密堆積面為 \\((111)\\)。`
  }
}

const structureInfo = computed(() => {
  const info = infoMap[currentStructure.value] || infoMap.diamond
  const modeTag = gridSize.value === 1 
    ? '<span style="color:#38bdf8; font-weight:600;">[當前模式：單一晶胞 (1 Cell)]</span><br>'
    : '<span style="color:#a78bfa; font-weight:600;">[當前模式：2x2x2 週期晶格 (Supercell)]</span><br>'
  return {
    title: info.title,
    desc: modeTag + info.desc
  }
})

let scene: any = null
let camera: any = null
let renderer: any = null
let controls: any = null
let crystalGroup: any = null
let planeGroup: any = null
let animFrameId: number | null = null
let THREE: any = null

function updateCameraPosition() {
  if (!camera) return
  if (gridSize.value === 1) {
    camera.position.set(8.5, 7.0, 9.5)
  } else {
    camera.position.set(14, 11, 16)
  }
  if (controls) controls.target.set(0, 0, 0)
}

function clearGroup(group: any) {
  if (!group) return
  while (group.children.length > 0) {
    const obj = group.children[0]
    group.remove(obj)
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose())
      else obj.material.dispose()
    }
  }
}

function createCylinderMesh(p1: any, p2: any, radius: number, color: number) {
  const distance = p1.distanceTo(p2)
  const geom = new THREE.CylinderGeometry(radius, radius, distance, 14)
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.2 })
  const cylinder = new THREE.Mesh(geom, mat)
  cylinder.castShadow = true

  cylinder.position.copy(p1).add(p2).multiplyScalar(0.5)
  cylinder.lookAt(p2)
  cylinder.rotateX(Math.PI / 2)
  return cylinder
}

function generateFCCAtoms(nCells: number, a: number) {
  const atoms: any[] = []
  const added = new Set<string>()

  for (let cx = 0; cx < nCells; cx++) {
    for (let cy = 0; cy < nCells; cy++) {
      for (let cz = 0; cz < nCells; cz++) {
        for (const dx of [0, 1]) {
          for (const dy of [0, 1]) {
            for (const dz of [0, 1]) {
              const px = (cx + dx) * a
              const py = (cy + dy) * a
              const pz = (cz + dz) * a
              const key = `${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`
              if (!added.has(key)) {
                added.add(key)
                atoms.push({ x: px, y: py, z: pz, color: 0x3b82f6 })
              }
            }
          }
        }
        const faces = [
          [0.5, 0.5, 0], [0.5, 0.5, 1],
          [0.5, 0, 0.5], [0.5, 1, 0.5],
          [0, 0.5, 0.5], [1, 0.5, 0.5]
        ]
        faces.forEach(([dx, dy, dz]) => {
          const px = (cx + dx) * a
          const py = (cy + dy) * a
          const pz = (cz + dz) * a
          const key = `${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`
          if (!added.has(key)) {
            added.add(key)
            atoms.push({ x: px, y: py, z: pz, color: 0x60a5fa })
          }
        })
      }
    }
  }
  return atoms
}

function generateFCCBonds(atoms: any[], maxDist: number) {
  const bonds: any[] = []
  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const dx = atoms[i].x - atoms[j].x
      const dy = atoms[i].y - atoms[j].y
      const dz = atoms[i].z - atoms[j].z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist <= maxDist * 1.05) {
        bonds.push({
          x1: atoms[i].x, y1: atoms[i].y, z1: atoms[i].z,
          x2: atoms[j].x, y2: atoms[j].y, z2: atoms[j].z,
          color: 0x93c5fd
        })
      }
    }
  }
  return bonds
}

function generateDiamondAtoms(nCells: number, a: number) {
  const atoms: any[] = []
  const added = new Set<string>()

  for (let cx = 0; cx < nCells; cx++) {
    for (let cy = 0; cy < nCells; cy++) {
      for (let cz = 0; cz < nCells; cz++) {
        for (const dx of [0, 1]) {
          for (const dy of [0, 1]) {
            for (const dz of [0, 1]) {
              const px = (cx + dx) * a
              const py = (cy + dy) * a
              const pz = (cz + dz) * a
              const key = `fcc_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`
              if (!added.has(key)) {
                added.add(key)
                atoms.push({ x: px, y: py, z: pz, type: 1, color: 0x06b6d4 })
              }
            }
          }
        }
        const faces = [
          [0.5, 0.5, 0], [0.5, 0.5, 1],
          [0.5, 0, 0.5], [0.5, 1, 0.5],
          [0, 0.5, 0.5], [1, 0.5, 0.5]
        ]
        faces.forEach(([dx, dy, dz]) => {
          const px = (cx + dx) * a
          const py = (cy + dy) * a
          const pz = (cz + dz) * a
          const key = `fcc_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`
          if (!added.has(key)) {
            added.add(key)
            atoms.push({ x: px, y: py, z: pz, type: 1, color: 0x06b6d4 })
          }
        })
        const internals = [
          [0.25, 0.25, 0.25],
          [0.75, 0.75, 0.25],
          [0.75, 0.25, 0.75],
          [0.25, 0.75, 0.75]
        ]
        internals.forEach(([dx, dy, dz]) => {
          const px = (cx + dx) * a
          const py = (cy + dy) * a
          const pz = (cz + dz) * a
          const key = `int_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`
          if (!added.has(key)) {
            added.add(key)
            atoms.push({ x: px, y: py, z: pz, type: 2, color: 0xf59e0b })
          }
        })
      }
    }
  }
  return atoms
}

function generateZincblendeAtoms(nCells: number, a: number) {
  const atoms: any[] = []
  const added = new Set<string>()

  for (let cx = 0; cx < nCells; cx++) {
    for (let cy = 0; cy < nCells; cy++) {
      for (let cz = 0; cz < nCells; cz++) {
        for (const dx of [0, 1]) {
          for (const dy of [0, 1]) {
            for (const dz of [0, 1]) {
              const px = (cx + dx) * a
              const py = (cy + dy) * a
              const pz = (cz + dz) * a
              const key = `ga_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`
              if (!added.has(key)) {
                added.add(key)
                atoms.push({ x: px, y: py, z: pz, type: 1, color: 0x94a3b8 })
              }
            }
          }
        }
        const faces = [
          [0.5, 0.5, 0], [0.5, 0.5, 1],
          [0.5, 0, 0.5], [0.5, 1, 0.5],
          [0, 0.5, 0.5], [1, 0.5, 0.5]
        ]
        faces.forEach(([dx, dy, dz]) => {
          const px = (cx + dx) * a
          const py = (cy + dy) * a
          const pz = (cz + dz) * a
          const key = `ga_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`
          if (!added.has(key)) {
            added.add(key)
            atoms.push({ x: px, y: py, z: pz, type: 1, color: 0x94a3b8 })
          }
        })
        const internals = [
          [0.25, 0.25, 0.25],
          [0.75, 0.75, 0.25],
          [0.75, 0.25, 0.75],
          [0.25, 0.75, 0.75]
        ]
        internals.forEach(([dx, dy, dz]) => {
          const px = (cx + dx) * a
          const py = (cy + dy) * a
          const pz = (cz + dz) * a
          const key = `as_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`
          if (!added.has(key)) {
            added.add(key)
            atoms.push({ x: px, y: py, z: pz, type: 2, color: 0xef4444 })
          }
        })
      }
    }
  }
  return atoms
}

function generateDiamondBonds(atoms: any[]) {
  const bonds: any[] = []
  const threshold = 4.0 * 0.45 * 1.05
  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const dx = atoms[i].x - atoms[j].x
      const dy = atoms[i].y - atoms[j].y
      const dz = atoms[i].z - atoms[j].z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist <= threshold) {
        bonds.push({
          x1: atoms[i].x, y1: atoms[i].y, z1: atoms[i].z,
          x2: atoms[j].x, y2: atoms[j].y, z2: atoms[j].z,
          color: 0xe2e8f0
        })
      }
    }
  }
  return bonds
}

function addUnitCellWireframes(nCells: number, a: number, offset: number) {
  const boxSize = a
  for (let x = 0; x < nCells; x++) {
    for (let y = 0; y < nCells; y++) {
      for (let z = 0; z < nCells; z++) {
        const boxGeom = new THREE.BoxGeometry(boxSize, boxSize, boxSize)
        const edges = new THREE.EdgesGeometry(boxGeom)
        const lineMat = new THREE.LineBasicMaterial({ 
          color: nCells === 1 ? 0x60a5fa : 0x475569, 
          linewidth: 2 
        })
        const wireframe = new THREE.LineSegments(edges, lineMat)
        wireframe.position.set(
          (x + 0.5) * a + offset, 
          (y + 0.5) * a + offset, 
          (z + 0.5) * a + offset
        )
        crystalGroup.add(wireframe)
      }
    }
  }
}

function highlightPlane(planeType: string) {
  if (!planeGroup || !THREE) return
  clearGroup(planeGroup)
  if (planeType === 'none') return

  const a = 4.0
  const nCells = gridSize.value
  const span = nCells * a

  if (planeType === '100') {
    const geom = new THREE.PlaneGeometry(span, span)
    const mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    })
    const planeMesh = new THREE.Mesh(geom, mat)
    planeMesh.rotation.y = Math.PI / 2
    const edges = new THREE.EdgesGeometry(geom)
    planeMesh.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xd97706, linewidth: 2 })))
    planeGroup.add(planeMesh)
  } else if (planeType === '110') {
    const width = Math.sqrt(2) * span
    const geom = new THREE.PlaneGeometry(width, span)
    const mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    })
    const planeMesh = new THREE.Mesh(geom, mat)
    planeMesh.rotation.y = Math.PI / 4
    const edges = new THREE.EdgesGeometry(geom)
    planeMesh.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x059669, linewidth: 2 })))
    planeGroup.add(planeMesh)
  } else if (planeType === '111') {
    const geom = new THREE.BufferGeometry()
    const half = span / 2
    const vertices = new Float32Array([
      -half, -half, half,
      half, -half, -half,
      -half, half, -half
    ])
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geom.computeVertexNormals()

    const mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    })
    const triangleMesh = new THREE.Mesh(geom, mat)
    const edges = new THREE.EdgesGeometry(geom)
    triangleMesh.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x7c3aed, linewidth: 2 })))
    planeGroup.add(triangleMesh)
  }
}

function buildStructure(type: 'diamond' | 'zincblende' | 'fcc') {
  if (!crystalGroup || !THREE) return
  clearGroup(crystalGroup)
  highlightPlane('none')
  activePlane.value = 'none'

  const a = 4.0
  const nCells = gridSize.value
  const offset = -(nCells * a) / 2

  let atoms: any[] = []
  let bonds: any[] = []

  if (type === 'fcc') {
    atoms = generateFCCAtoms(nCells, a)
    if (isShowBonds.value) bonds = generateFCCBonds(atoms, a * 0.75)
  } else if (type === 'diamond') {
    atoms = generateDiamondAtoms(nCells, a)
    if (isShowBonds.value) bonds = generateDiamondBonds(atoms)
  } else if (type === 'zincblende') {
    atoms = generateZincblendeAtoms(nCells, a)
    if (isShowBonds.value) bonds = generateDiamondBonds(atoms)
  }

  atoms.forEach(atom => {
    let radius = 0.38
    if (type === 'diamond') {
      radius = atom.type === 2 ? 0.36 : 0.34
    } else if (type === 'zincblende') {
      radius = atom.type === 1 ? 0.38 : 0.34
    }

    const geom = new THREE.SphereGeometry(radius, 24, 24)
    const mat = new THREE.MeshStandardMaterial({
      color: atom.color,
      roughness: 0.25,
      metalness: 0.35,
      emissive: atom.emissive || 0x000000,
      emissiveIntensity: 0.15
    })
    const sphere = new THREE.Mesh(geom, mat)
    sphere.position.set(atom.x + offset, atom.y + offset, atom.z + offset)
    sphere.castShadow = true
    sphere.receiveShadow = true
    crystalGroup.add(sphere)
  })

  if (isShowBonds.value) {
    bonds.forEach(bond => {
      const p1 = new THREE.Vector3(bond.x1 + offset, bond.y1 + offset, bond.z1 + offset)
      const p2 = new THREE.Vector3(bond.x2 + offset, bond.y2 + offset, bond.z2 + offset)
      const cylinder = createCylinderMesh(p1, p2, 0.07, bond.color || 0x94a3b8)
      crystalGroup.add(cylinder)
    })
  }

  addUnitCellWireframes(nCells, a, offset)
}

function onStructureChange() {
  buildStructure(currentStructure.value)
}

function onPlaneChange() {
  highlightPlane(activePlane.value)
}

function toggleGridSize() {
  gridSize.value = gridSize.value === 1 ? 2 : 1
  updateCameraPosition()
  buildStructure(currentStructure.value)
}

function toggleBonds() {
  isShowBonds.value = !isShowBonds.value
  buildStructure(currentStructure.value)
}

function toggleRotate() {
  isAutoRotate.value = !isAutoRotate.value
}

function onWindowResize() {
  if (!canvasContainerRef.value || !camera || !renderer) return
  const w = canvasContainerRef.value.clientWidth
  const h = canvasContainerRef.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

function animate() {
  animFrameId = requestAnimationFrame(animate)
  if (isAutoRotate.value && crystalGroup && planeGroup) {
    crystalGroup.rotation.y += 0.005
    planeGroup.rotation.y += 0.005
  }
  if (controls) controls.update()
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

onMounted(async () => {
  if (typeof window === 'undefined') return

  await nextTick()
  const ThreeModule = await import('three')
  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')
  THREE = ThreeModule

  const container = canvasContainerRef.value
  if (!container) return

  const width = container.clientWidth || 600
  const height = container.clientHeight || 500

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x090d16, 0.02)

  camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000)
  updateCameraPosition()

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  container.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.maxDistance = 60
  controls.minDistance = 2

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)
  scene.add(ambientLight)

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9)
  dirLight1.position.set(15, 25, 20)
  scene.add(dirLight1)

  const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 0.4)
  dirLight2.position.set(-15, -10, -15)
  scene.add(dirLight2)

  crystalGroup = new THREE.Group()
  scene.add(crystalGroup)

  planeGroup = new THREE.Group()
  scene.add(planeGroup)

  buildStructure(currentStructure.value)
  window.addEventListener('resize', onWindowResize)
  animate()
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', onWindowResize)
  }
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId)
  }
  if (renderer && renderer.domElement) {
    renderer.domElement.remove()
    renderer.dispose()
  }
})
</script>

<style scoped>
.crystal-viewer-container {
  position: relative;
  width: 100%;
  height: 540px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #090d16 0%, #172033 100%);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  margin: 24px 0;
}

.crystal-canvas {
  width: 100%;
  height: 100%;
}

.crystal-ui-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13px;
  color: #f8fafc;
  z-index: 10;
  pointer-events: none;
}

.crystal-controls-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  pointer-events: auto;
  background: rgba(15, 23, 42, 0.85);
  padding: 6px 10px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.crystal-select {
  background: #1e293b;
  color: #fff;
  border: 1px solid #475569;
  padding: 4px 8px;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}

.crystal-btn {
  background: #64748b;
  color: #fff;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.2s;
}

.crystal-btn.btn-cell {
  background: #0ea5e9;
  font-weight: 600;
}

.crystal-btn.active {
  background: #10b981;
}

.crystal-hint-badge {
  pointer-events: auto;
  background: rgba(15, 23, 42, 0.75);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.crystal-info-card {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background: rgba(15, 23, 42, 0.9);
  padding: 10px 14px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12.5px;
  line-height: 1.5;
  color: #cbd5e1;
  pointer-events: auto;
  z-index: 10;
}

.info-title {
  color: #60a5fa;
  display: block;
  margin-bottom: 3px;
  font-size: 13.5px;
}
</style>
