/**
 * CrystalViewer - A reusable 3D Crystal Structure Visualization component using Three.js
 * Supports single unit cell (1x1x1) or multi-cell supercell (2x2x2)
 * Supports FCC, Diamond, Zincblende, and exact Miller planes ((100), (110), (111)).
 */
(function (global) {
  class CrystalViewer {
    constructor(containerOrId, options = {}) {
      this.container = typeof containerOrId === 'string' 
        ? document.getElementById(containerOrId) 
        : containerOrId;

      if (!this.container) {
        console.error('CrystalViewer: Container element not found.');
        return;
      }

      this.options = Object.assign({
        defaultStructure: 'diamond',
        autoRotate: false,
        showBonds: true,
        gridSize: 1 // Default to 1x1x1 single unit cell for crystal clarity!
      }, options);

      this.currentStructure = this.options.defaultStructure;
      this.gridSize = this.options.gridSize;
      this.activePlane = 'none';
      this.autoRotate = this.options.autoRotate;
      this.showBonds = this.options.showBonds;

      this.initDependencies().then(() => {
        this.init();
      });
    }

    async initDependencies() {
      if (typeof THREE === 'undefined') {
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
      }
      if (typeof THREE === 'undefined' || !THREE.OrbitControls) {
        await this.loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js');
      }
    }

    loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    }

    init() {
      if (getComputedStyle(this.container).position === 'static') {
        this.container.style.position = 'relative';
      }
      this.container.style.overflow = 'hidden';
      this.container.style.borderRadius = '12px';
      this.container.style.background = 'linear-gradient(135deg, #090d16 0%, #172033 100%)';
      this.container.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.4)';

      // Scene, Camera, Renderer
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x090d16, 0.02);

      const width = this.container.clientWidth || 600;
      const height = this.container.clientHeight || 500;

      this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
      this.updateCameraPosition();

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.container.appendChild(this.renderer.domElement);

      // Controls
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxDistance = 60;
      this.controls.minDistance = 2;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      this.scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
      dirLight1.position.set(15, 25, 20);
      this.scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 0.4);
      dirLight2.position.set(-15, -10, -15);
      this.scene.add(dirLight2);

      // Groups
      this.crystalGroup = new THREE.Group();
      this.scene.add(this.crystalGroup);

      this.planeGroup = new THREE.Group();
      this.scene.add(this.planeGroup);

      // UI
      this.createUI();

      // Build initial structure
      this.buildStructure(this.currentStructure);

      // Resize
      this.resizeHandler = () => {
        if (!this.container) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      };
      window.addEventListener('resize', this.resizeHandler);

      // Animation
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    updateCameraPosition() {
      if (this.gridSize === 1) {
        this.camera.position.set(8.5, 7.0, 9.5);
      } else {
        this.camera.position.set(14, 11, 16);
      }
      if (this.controls) this.controls.target.set(0, 0, 0);
    }

    createUI() {
      const uiDiv = document.createElement('div');
      uiDiv.className = 'crystal-ui-overlay';
      uiDiv.style.cssText = `
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
      `;

      const controlsBox = document.createElement('div');
      controlsBox.style.cssText = `
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
      `;

      // 1. Structure selector
      const structSelect = document.createElement('select');
      structSelect.style.cssText = `
        background: #1e293b; color: #fff; border: 1px solid #475569; padding: 4px 8px; border-radius: 6px; outline: none; cursor: pointer; font-size: 13px; font-weight: 500;
      `;
      [
        { val: 'diamond', label: '💎 鑽石結構 (Si / Diamond)' },
        { val: 'zincblende', label: '🔴 閃鋅礦 (GaAs / Zincblende)' },
        { val: 'fcc', label: '🔷 面心立方 (FCC)' }
      ].forEach(opt => {
        const el = document.createElement('option');
        el.value = opt.val;
        el.textContent = opt.label;
        if (opt.val === this.currentStructure) el.selected = true;
        structSelect.appendChild(el);
      });
      structSelect.addEventListener('change', (e) => {
        this.currentStructure = e.target.value;
        this.buildStructure(this.currentStructure);
        this.updateInfoCard();
      });
      controlsBox.appendChild(structSelect);

      // 2. Cell Count toggle (1x1x1 vs 2x2x2)
      const cellBtn = document.createElement('button');
      cellBtn.textContent = this.gridSize === 1 ? '📦 單一晶胞 (1 Cell)' : '🧱 超晶胞 (2x2x2)';
      cellBtn.style.cssText = `
        background: ${this.gridSize === 1 ? '#0ea5e9' : '#6366f1'}; color: #fff; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px; transition: all 0.2s;
      `;
      cellBtn.addEventListener('click', () => {
        this.gridSize = this.gridSize === 1 ? 2 : 1;
        cellBtn.textContent = this.gridSize === 1 ? '📦 單一晶胞 (1 Cell)' : '🧱 超晶胞 (2x2x2)';
        cellBtn.style.background = this.gridSize === 1 ? '#0ea5e9' : '#6366f1';
        this.updateCameraPosition();
        this.buildStructure(this.currentStructure);
        this.updateInfoCard();
      });
      controlsBox.appendChild(cellBtn);

      // 3. Plane selector
      const planeSelect = document.createElement('select');
      planeSelect.style.cssText = `
        background: #1e293b; color: #fff; border: 1px solid #475569; padding: 4px 8px; border-radius: 6px; outline: none; cursor: pointer; font-size: 13px;
      `;
      [
        { val: 'none', label: '晶面切面: 無' },
        { val: '100', label: '晶面 (100)' },
        { val: '110', label: '晶面 (110)' },
        { val: '111', label: '晶面 (111)' }
      ].forEach(opt => {
        const el = document.createElement('option');
        el.value = opt.val;
        el.textContent = opt.label;
        planeSelect.appendChild(el);
      });
      planeSelect.addEventListener('change', (e) => {
        this.activePlane = e.target.value;
        this.highlightPlane(this.activePlane);
      });
      controlsBox.appendChild(planeSelect);

      // 4. Toggle Bonds Button
      const bondBtn = document.createElement('button');
      bondBtn.textContent = '鍵結: 開';
      bondBtn.style.cssText = `
        background: #3b82f6; color: #fff; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px; transition: background 0.2s;
      `;
      bondBtn.addEventListener('click', () => {
        this.showBonds = !this.showBonds;
        bondBtn.textContent = `鍵結: ${this.showBonds ? '開' : '關'}`;
        bondBtn.style.background = this.showBonds ? '#3b82f6' : '#64748b';
        this.buildStructure(this.currentStructure);
      });
      controlsBox.appendChild(bondBtn);

      // 5. Toggle Rotate Button
      const rotBtn = document.createElement('button');
      rotBtn.textContent = '旋轉: 停';
      rotBtn.style.cssText = `
        background: #64748b; color: #fff; border: none; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px; transition: background 0.2s;
      `;
      rotBtn.addEventListener('click', () => {
        this.autoRotate = !this.autoRotate;
        rotBtn.textContent = `旋轉: ${this.autoRotate ? '轉' : '停'}`;
        rotBtn.style.background = this.autoRotate ? '#10b981' : '#64748b';
      });
      controlsBox.appendChild(rotBtn);

      uiDiv.appendChild(controlsBox);

      // Info card at bottom
      this.infoCard = document.createElement('div');
      this.infoCard.style.cssText = `
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
      `;
      this.container.appendChild(uiDiv);
      this.container.appendChild(this.infoCard);

      this.updateInfoCard();
    }

    updateInfoCard() {
      const isSingle = this.gridSize === 1;
      const countNote = isSingle 
        ? '<span style="color:#38bdf8; font-weight:600;">[當前模式：單一傳統晶胞 (Single Unit Cell)]</span>' 
        : '<span style="color:#a78bfa; font-weight:600;">[當前模式：2x2x2 週期晶格 (Supercell)]</span>';

      const infoMap = {
        diamond: {
          title: '💎 鑽石晶格結構 (Diamond Structure - 矽 Si)',
          desc: `${countNote}<br><strong>原子構成</strong>：
          • <strong>青色球</strong>：第 1 套 FCC 晶格（8 個頂點 + 6 個面心）。<br>
          • <strong>金色球</strong>：第 2 套穿插原子（4 個完全落在晶胞內部體對角線 1/4 處）。<br>
          • <strong>等效原子數</strong>：單一晶胞等效包含 <strong>8 個矽原子</strong>（8×1/8 + 6×1/2 + 4 = 8）。體密度 = 8 / a³ ≈ <strong>5.0 × 10²² cm⁻³</strong>。`
        },
        zincblende: {
          title: '🔴 閃鋅礦結構 (Zincblende Structure - GaAs)',
          desc: `${countNote}<br><strong>原子構成</strong>：
          • <strong>金屬灰色球 (Ga)</strong>：佔據原點 FCC 晶格。<br>
          • <strong>紅色球 (As)</strong>：佔據體對角線 1/4 穿插位置。<br>
          • 單一晶胞等效包含 <strong>4 個 Ga 原子 + 4 個 As 原子</strong>（配位數 Z = 4 四面體共價鍵）。`
        },
        fcc: {
          title: '🔷 面心立方晶格 (FCC - Face-Centered Cubic)',
          desc: `${countNote}<br><strong>原子構成</strong>：8 個角落原子（各貢獻 1/8）+ 6 個面心原子（各貢獻 1/2），單一晶胞等效包含 <strong>4 個原子</strong>。配位數 Z = 12。`
        }
      };

      const info = infoMap[this.currentStructure];
      this.infoCard.innerHTML = `<strong style="color: #60a5fa; display: block; margin-bottom: 3px; font-size: 13.5px;">${info.title}</strong>${info.desc}`;
    }

    clearGroup(group) {
      while (group.children.length > 0) {
        const obj = group.children[0];
        group.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      }
    }

    buildStructure(type) {
      this.clearGroup(this.crystalGroup);
      this.highlightPlane('none');
      const planeSelect = this.container.querySelector('select:nth-of-type(2)');
      if (planeSelect) planeSelect.value = 'none';
      this.activePlane = 'none';

      const a = 4.0;
      const nCells = this.gridSize;
      // Center the bounding box around (0,0,0)
      const offset = -(nCells * a) / 2;

      let atoms = [];
      let bonds = [];

      if (type === 'fcc') {
        atoms = this.generateFCCAtoms(nCells, a);
        if (this.showBonds) bonds = this.generateFCCBonds(atoms, a * 0.75);
      } else if (type === 'diamond') {
        atoms = this.generateDiamondAtoms(nCells, a);
        if (this.showBonds) bonds = this.generateDiamondBonds(atoms, a * 0.45);
      } else if (type === 'zincblende') {
        atoms = this.generateZincblendeAtoms(nCells, a);
        if (this.showBonds) bonds = this.generateDiamondBonds(atoms, a * 0.45);
      }

      // Render Atoms
      atoms.forEach(atom => {
        let radius = 0.38;
        if (type === 'diamond') {
          radius = atom.type === 2 ? 0.36 : 0.34;
        } else if (type === 'zincblende') {
          radius = atom.type === 1 ? 0.38 : 0.34;
        }

        const geom = new THREE.SphereGeometry(radius, 32, 32);
        const mat = new THREE.MeshStandardMaterial({
          color: atom.color,
          roughness: 0.25,
          metalness: 0.35,
          emissive: atom.emissive || 0x000000,
          emissiveIntensity: 0.15
        });
        const sphere = new THREE.Mesh(geom, mat);
        sphere.position.set(atom.x + offset, atom.y + offset, atom.z + offset);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        this.crystalGroup.add(sphere);
      });

      // Render Bonds
      if (this.showBonds) {
        bonds.forEach(bond => {
          const p1 = new THREE.Vector3(bond.x1 + offset, bond.y1 + offset, bond.z1 + offset);
          const p2 = new THREE.Vector3(bond.x2 + offset, bond.y2 + offset, bond.z2 + offset);
          const cylinder = this.createCylinderMesh(p1, p2, 0.07, bond.color || 0x94a3b8);
          this.crystalGroup.add(cylinder);
        });
      }

      // Add wireframe bounding box for unit cells
      this.addUnitCellWireframes(nCells, a, offset);
    }

    createCylinderMesh(p1, p2, radius, color) {
      const distance = p1.distanceTo(p2);
      const geom = new THREE.CylinderGeometry(radius, radius, distance, 14);
      const mat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.3, metalness: 0.2 });
      const cylinder = new THREE.Mesh(geom, mat);
      cylinder.castShadow = true;

      cylinder.position.copy(p1).add(p2).multiplyScalar(0.5);
      cylinder.lookAt(p2);
      cylinder.rotateX(Math.PI / 2);
      return cylinder;
    }

    generateFCCAtoms(nCells, a) {
      const atoms = [];
      const added = new Set();

      for (let cx = 0; cx < nCells; cx++) {
        for (let cy = 0; cy < nCells; cy++) {
          for (let cz = 0; cz < nCells; cz++) {
            // Corners
            for (let dx of [0, 1]) {
              for (let dy of [0, 1]) {
                for (let dz of [0, 1]) {
                  const px = (cx + dx) * a;
                  const py = (cy + dy) * a;
                  const pz = (cz + dz) * a;
                  const key = `${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`;
                  if (!added.has(key)) {
                    added.add(key);
                    atoms.push({ x: px, y: py, z: pz, color: 0x3b82f6 });
                  }
                }
              }
            }
            // 6 Face centers
            const faces = [
              [0.5, 0.5, 0], [0.5, 0.5, 1],
              [0.5, 0, 0.5], [0.5, 1, 0.5],
              [0, 0.5, 0.5], [1, 0.5, 0.5]
            ];
            faces.forEach(([dx, dy, dz]) => {
              const px = (cx + dx) * a;
              const py = (cy + dy) * a;
              const pz = (cz + dz) * a;
              const key = `${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`;
              if (!added.has(key)) {
                added.add(key);
                atoms.push({ x: px, y: py, z: pz, color: 0x60a5fa });
              }
            });
          }
        }
      }
      return atoms;
    }

    generateFCCBonds(atoms, maxDist) {
      const bonds = [];
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const dx = atoms[i].x - atoms[j].x;
          const dy = atoms[i].y - atoms[j].y;
          const dz = atoms[i].z - atoms[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist <= maxDist * 1.05) {
            bonds.push({
              x1: atoms[i].x, y1: atoms[i].y, z1: atoms[i].z,
              x2: atoms[j].x, y2: atoms[j].y, z2: atoms[j].z,
              color: 0x93c5fd
            });
          }
        }
      }
      return bonds;
    }

    generateDiamondAtoms(nCells, a) {
      const atoms = [];
      const added = new Set();

      for (let cx = 0; cx < nCells; cx++) {
        for (let cy = 0; cy < nCells; cy++) {
          for (let cz = 0; cz < nCells; cz++) {
            // 1. FCC lattice corners
            for (let dx of [0, 1]) {
              for (let dy of [0, 1]) {
                for (let dz of [0, 1]) {
                  const px = (cx + dx) * a;
                  const py = (cy + dy) * a;
                  const pz = (cz + dz) * a;
                  const key = `fcc_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`;
                  if (!added.has(key)) {
                    added.add(key);
                    atoms.push({ x: px, y: py, z: pz, type: 1, color: 0x06b6d4 });
                  }
                }
              }
            }
            // 2. FCC face centers
            const faces = [
              [0.5, 0.5, 0], [0.5, 0.5, 1],
              [0.5, 0, 0.5], [0.5, 1, 0.5],
              [0, 0.5, 0.5], [1, 0.5, 0.5]
            ];
            faces.forEach(([dx, dy, dz]) => {
              const px = (cx + dx) * a;
              const py = (cy + dy) * a;
              const pz = (cz + dz) * a;
              const key = `fcc_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`;
              if (!added.has(key)) {
                added.add(key);
                atoms.push({ x: px, y: py, z: pz, type: 1, color: 0x06b6d4 });
              }
            });

            // 3. Exactly 4 internal basis atoms in tetrahedral sites
            const internals = [
              [0.25, 0.25, 0.25],
              [0.75, 0.75, 0.25],
              [0.75, 0.25, 0.75],
              [0.25, 0.75, 0.75]
            ];
            internals.forEach(([dx, dy, dz]) => {
              const px = (cx + dx) * a;
              const py = (cy + dy) * a;
              const pz = (cz + dz) * a;
              const key = `int_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`;
              if (!added.has(key)) {
                added.add(key);
                atoms.push({ x: px, y: py, z: pz, type: 2, color: 0xf59e0b });
              }
            });
          }
        }
      }
      return atoms;
    }

    generateZincblendeAtoms(nCells, a) {
      const atoms = [];
      const added = new Set();

      for (let cx = 0; cx < nCells; cx++) {
        for (let cy = 0; cy < nCells; cy++) {
          for (let cz = 0; cz < nCells; cz++) {
            // Ga atoms at FCC sites
            for (let dx of [0, 1]) {
              for (let dy of [0, 1]) {
                for (let dz of [0, 1]) {
                  const px = (cx + dx) * a;
                  const py = (cy + dy) * a;
                  const pz = (cz + dz) * a;
                  const key = `ga_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`;
                  if (!added.has(key)) {
                    added.add(key);
                    atoms.push({ x: px, y: py, z: pz, type: 1, color: 0x94a3b8 });
                  }
                }
              }
            }
            const faces = [
              [0.5, 0.5, 0], [0.5, 0.5, 1],
              [0.5, 0, 0.5], [0.5, 1, 0.5],
              [0, 0.5, 0.5], [1, 0.5, 0.5]
            ];
            faces.forEach(([dx, dy, dz]) => {
              const px = (cx + dx) * a;
              const py = (cy + dy) * a;
              const pz = (cz + dz) * a;
              const key = `ga_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`;
              if (!added.has(key)) {
                added.add(key);
                atoms.push({ x: px, y: py, z: pz, type: 1, color: 0x94a3b8 });
              }
            });

            // As atoms at tetrahedral interstitial sites
            const internals = [
              [0.25, 0.25, 0.25],
              [0.75, 0.75, 0.25],
              [0.75, 0.25, 0.75],
              [0.25, 0.75, 0.75]
            ];
            internals.forEach(([dx, dy, dz]) => {
              const px = (cx + dx) * a;
              const py = (cy + dy) * a;
              const pz = (cz + dz) * a;
              const key = `as_${px.toFixed(2)},${py.toFixed(2)},${pz.toFixed(2)}`;
              if (!added.has(key)) {
                added.add(key);
                atoms.push({ x: px, y: py, z: pz, type: 2, color: 0xef4444 });
              }
            });
          }
        }
      }
      return atoms;
    }

    generateDiamondBonds(atoms, maxDist) {
      const bonds = [];
      const bondDistThreshold = 4.0 * 0.45 * 1.05;
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const dx = atoms[i].x - atoms[j].x;
          const dy = atoms[i].y - atoms[j].y;
          const dz = atoms[i].z - atoms[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist <= bondDistThreshold) {
            bonds.push({
              x1: atoms[i].x, y1: atoms[i].y, z1: atoms[i].z,
              x2: atoms[j].x, y2: atoms[j].y, z2: atoms[j].z,
              color: 0xe2e8f0
            });
          }
        }
      }
      return bonds;
    }

    addUnitCellWireframes(nCells, a, offset) {
      const boxSize = a;
      for (let x = 0; x < nCells; x++) {
        for (let y = 0; y < nCells; y++) {
          for (let z = 0; z < nCells; z++) {
            const boxGeom = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
            const edges = new THREE.EdgesGeometry(boxGeom);
            const lineMat = new THREE.LineBasicMaterial({ 
              color: nCells === 1 ? 0x60a5fa : 0x475569, 
              linewidth: 2 
            });
            const wireframe = new THREE.LineSegments(edges, lineMat);
            wireframe.position.set(
              (x + 0.5) * a + offset, 
              (y + 0.5) * a + offset, 
              (z + 0.5) * a + offset
            );
            this.crystalGroup.add(wireframe);
          }
        }
      }
    }

    highlightPlane(planeType) {
      this.clearGroup(this.planeGroup);
      if (planeType === 'none') return;

      const a = 4.0;
      const nCells = this.gridSize;
      const span = nCells * a;

      if (planeType === '100') {
        // (100) plane at x = 0 or centered
        const geom = new THREE.PlaneGeometry(span, span);
        const mat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.35,
          depthWrite: false
        });
        const planeMesh = new THREE.Mesh(geom, mat);
        planeMesh.rotation.y = Math.PI / 2;
        const edges = new THREE.EdgesGeometry(geom);
        planeMesh.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xd97706, linewidth: 2 })));
        this.planeGroup.add(planeMesh);
      } else if (planeType === '110') {
        // (110) diagonal plane
        const width = Math.sqrt(2) * span;
        const geom = new THREE.PlaneGeometry(width, span);
        const mat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.35,
          depthWrite: false
        });
        const planeMesh = new THREE.Mesh(geom, mat);
        planeMesh.rotation.y = Math.PI / 4;
        const edges = new THREE.EdgesGeometry(geom);
        planeMesh.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x059669, linewidth: 2 })));
        this.planeGroup.add(planeMesh);
      } else if (planeType === '111') {
        // (111) triangular plane inside single unit cell or supercell
        const geom = new THREE.BufferGeometry();
        const half = span / 2;
        // Vertices at top corners
        const vertices = new Float32Array([
          -half, -half, half,
          half, -half, -half,
          -half, half, -half
        ]);
        geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geom.computeVertexNormals();

        const mat = new THREE.MeshBasicMaterial({
          color: 0x8b5cf6,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.45,
          depthWrite: false
        });
        const triangleMesh = new THREE.Mesh(geom, mat);
        const edges = new THREE.EdgesGeometry(geom);
        triangleMesh.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x7c3aed, linewidth: 2 })));
        this.planeGroup.add(triangleMesh);
      }
    }

    animate() {
      if (!this.container) return;
      requestAnimationFrame(this.animate);

      if (this.autoRotate && this.crystalGroup) {
        this.crystalGroup.rotation.y += 0.005;
        this.planeGroup.rotation.y += 0.005;
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }

    destroy() {
      window.removeEventListener('resize', this.resizeHandler);
      if (this.renderer && this.renderer.domElement) {
        this.renderer.domElement.remove();
      }
    }
  }

  global.CrystalViewer = CrystalViewer;
})(window);
