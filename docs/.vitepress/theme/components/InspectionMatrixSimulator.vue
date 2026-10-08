<template>
  <div class="inspection-simulator bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden my-6">
    <div class="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-wrap gap-4 items-center justify-between">
      <h3 class="m-0 text-lg font-bold">觀察法矩陣生成器 (Inspection Matrix Simulator)</h3>
      <div class="flex gap-2">
        <button 
          @click="mode = 'nodal'" 
          :class="['px-3 py-1.5 rounded-md text-sm font-medium transition-colors', mode === 'nodal' ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700']"
        >
          節點觀察法
        </button>
        <button 
          @click="mode = 'mesh'" 
          :class="['px-3 py-1.5 rounded-md text-sm font-medium transition-colors', mode === 'mesh' ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700']"
        >
          網孔觀察法
        </button>
      </div>
    </div>

    <div class="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left: Circuit Configuration & Diagram -->
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            {{ mode === 'nodal' ? '2-Node Circuit Topology' : '2-Mesh Circuit Topology' }}
          </h4>
          
          <!-- Nodal Circuit SVG -->
          <svg v-if="mode === 'nodal'" viewBox="0 0 300 200" class="w-full h-auto bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <!-- Wires -->
            <path d="M 50 150 L 250 150" stroke="currentColor" class="text-zinc-400 dark:text-zinc-500" stroke-width="2" fill="none"/>
            <path d="M 50 50 L 250 50" stroke="currentColor" class="text-zinc-400 dark:text-zinc-500" stroke-width="2" fill="none"/>
            <path d="M 150 50 L 150 150" stroke="currentColor" class="text-zinc-400 dark:text-zinc-500" stroke-width="2" fill="none"/>
            
            <!-- Nodes -->
            <circle cx="50" cy="50" r="4" class="fill-blue-500"/>
            <text x="35" y="45" class="text-xs fill-zinc-700 dark:fill-zinc-300 font-mono">v1</text>
            <circle cx="250" cy="50" r="4" class="fill-blue-500"/>
            <text x="255" y="45" class="text-xs fill-zinc-700 dark:fill-zinc-300 font-mono">v2</text>
            <path d="M 140 150 L 160 150 M 145 155 L 155 155 M 148 160 L 152 160" stroke="currentColor" class="text-zinc-500" stroke-width="1.5" fill="none"/>
            
            <!-- Resistors / Conductances -->
            <!-- G1 (v1 to GND) -->
            <rect x="40" y="80" width="20" height="40" class="fill-white dark:fill-zinc-800 stroke-zinc-700 dark:stroke-zinc-300" stroke-width="2" :class="{'stroke-blue-500 dark:stroke-blue-400': highlightG === 'G11'}"/>
            <text x="70" y="105" class="text-xs fill-zinc-700 dark:fill-zinc-300 font-mono">G1={{ params.G1 }}S</text>
            
            <!-- G12 (v1 to v2) -->
            <rect x="130" y="40" width="40" height="20" class="fill-white dark:fill-zinc-800 stroke-zinc-700 dark:stroke-zinc-300" stroke-width="2" :class="{'stroke-blue-500 dark:stroke-blue-400': highlightG === 'G12' || highlightG === 'G11' || highlightG === 'G22'}"/>
            <text x="135" y="30" class="text-xs fill-zinc-700 dark:fill-zinc-300 font-mono">G12={{ params.G12 }}S</text>

            <!-- G2 (v2 to GND) -->
            <rect x="240" y="80" width="20" height="40" class="fill-white dark:fill-zinc-800 stroke-zinc-700 dark:stroke-zinc-300" stroke-width="2" :class="{'stroke-blue-500 dark:stroke-blue-400': highlightG === 'G22'}"/>
            <text x="195" y="105" class="text-xs fill-zinc-700 dark:fill-zinc-300 font-mono">G2={{ params.G2 }}S</text>

            <!-- Current Sources -->
            <circle cx="50" cy="100" r="12" class="fill-white dark:fill-zinc-800 stroke-red-500" stroke-width="1.5" :class="{'stroke-2 stroke-blue-500': highlightG === 'i1'}"/>
            <path d="M 50 106 L 50 94 M 46 98 L 50 94 L 54 98" stroke="currentColor" class="text-red-500" stroke-width="1.5" fill="none"/>
            <text x="15" y="104" class="text-xs fill-red-600 dark:fill-red-400 font-mono">i1={{ params.i1 }}A</text>

            <circle cx="250" cy="100" r="12" class="fill-white dark:fill-zinc-800 stroke-red-500" stroke-width="1.5" :class="{'stroke-2 stroke-blue-500': highlightG === 'i2'}"/>
            <path d="M 250 106 L 250 94 M 246 98 L 250 94 L 254 98" stroke="currentColor" class="text-red-500" stroke-width="1.5" fill="none"/>
            <text x="265" y="104" class="text-xs fill-red-600 dark:fill-red-400 font-mono">i2={{ params.i2 }}A</text>
          </svg>

          <!-- Mesh Circuit SVG -->
          <svg v-else viewBox="0 0 300 200" class="w-full h-auto bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <!-- Wires -->
            <rect x="40" y="40" width="220" height="120" stroke="currentColor" class="text-zinc-400 dark:text-zinc-500" stroke-width="2" fill="none"/>
            <line x1="150" y1="40" x2="150" y2="160" stroke="currentColor" class="text-zinc-400 dark:text-zinc-500" stroke-width="2"/>
            
            <!-- Meshes -->
            <path d="M 80 100 A 15 15 0 1 1 95 85 L 90 85 M 95 85 L 95 90" stroke="currentColor" class="text-blue-500" stroke-width="1.5" fill="none"/>
            <text x="85" y="105" class="text-xs fill-blue-600 dark:fill-blue-400 font-mono">i1</text>
            
            <path d="M 190 100 A 15 15 0 1 1 205 85 L 200 85 M 205 85 L 205 90" stroke="currentColor" class="text-blue-500" stroke-width="1.5" fill="none"/>
            <text x="195" y="105" class="text-xs fill-blue-600 dark:fill-blue-400 font-mono">i2</text>

            <!-- Resistors -->
            <!-- R1 (Mesh 1 top) -->
            <rect x="75" y="30" width="40" height="20" class="fill-white dark:fill-zinc-800 stroke-zinc-700 dark:stroke-zinc-300" stroke-width="2" :class="{'stroke-blue-500 dark:stroke-blue-400': highlightG === 'R11'}"/>
            <text x="80" y="22" class="text-xs fill-zinc-700 dark:fill-zinc-300 font-mono">R1={{ params.R1 }}Ω</text>
            
            <!-- R12 (Shared) -->
            <rect x="140" y="80" width="20" height="40" class="fill-white dark:fill-zinc-800 stroke-zinc-700 dark:stroke-zinc-300" stroke-width="2" :class="{'stroke-blue-500 dark:stroke-blue-400': highlightG === 'R12' || highlightG === 'R11' || highlightG === 'R22'}"/>
            <text x="165" y="105" class="text-xs fill-zinc-700 dark:fill-zinc-300 font-mono">R12={{ params.R12 }}Ω</text>

            <!-- R2 (Mesh 2 top) -->
            <rect x="185" y="30" width="40" height="20" class="fill-white dark:fill-zinc-800 stroke-zinc-700 dark:stroke-zinc-300" stroke-width="2" :class="{'stroke-blue-500 dark:stroke-blue-400': highlightG === 'R22'}"/>
            <text x="190" y="22" class="text-xs fill-zinc-700 dark:fill-zinc-300 font-mono">R2={{ params.R2 }}Ω</text>

            <!-- Voltage Sources -->
            <circle cx="40" cy="100" r="12" class="fill-white dark:fill-zinc-800 stroke-red-500" stroke-width="1.5" :class="{'stroke-2 stroke-blue-500': highlightG === 'v1'}"/>
            <text x="36" y="96" class="text-[10px] fill-red-600 dark:fill-red-400 font-mono">+</text>
            <text x="37" y="110" class="text-[10px] fill-red-600 dark:fill-red-400 font-mono">-</text>
            <text x="10" y="104" class="text-xs fill-red-600 dark:fill-red-400 font-mono">{{ params.v1 }}V</text>

            <circle cx="260" cy="100" r="12" class="fill-white dark:fill-zinc-800 stroke-red-500" stroke-width="1.5" :class="{'stroke-2 stroke-blue-500': highlightG === 'v2'}"/>
            <text x="256" y="96" class="text-[10px] fill-red-600 dark:fill-red-400 font-mono">+</text>
            <text x="257" y="110" class="text-[10px] fill-red-600 dark:fill-red-400 font-mono">-</text>
            <text x="275" y="104" class="text-xs fill-red-600 dark:fill-red-400 font-mono">{{ params.v2 }}V</text>
          </svg>
        </div>

        <!-- Controls -->
        <div class="grid grid-cols-2 gap-4">
          <template v-if="mode === 'nodal'">
            <label class="block text-sm"><span class="text-zinc-500">G1 (S):</span> <input type="number" v-model.number="params.G1" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
            <label class="block text-sm"><span class="text-zinc-500">G2 (S):</span> <input type="number" v-model.number="params.G2" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
            <label class="block text-sm"><span class="text-zinc-500">G12 (S):</span> <input type="number" v-model.number="params.G12" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
            <div class="col-span-2 grid grid-cols-2 gap-4">
              <label class="block text-sm"><span class="text-zinc-500">i1 (A):</span> <input type="number" v-model.number="params.i1" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
              <label class="block text-sm"><span class="text-zinc-500">i2 (A):</span> <input type="number" v-model.number="params.i2" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
            </div>
          </template>
          <template v-else>
            <label class="block text-sm"><span class="text-zinc-500">R1 (Ω):</span> <input type="number" v-model.number="params.R1" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
            <label class="block text-sm"><span class="text-zinc-500">R2 (Ω):</span> <input type="number" v-model.number="params.R2" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
            <label class="block text-sm"><span class="text-zinc-500">R12 (Ω):</span> <input type="number" v-model.number="params.R12" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
            <div class="col-span-2 grid grid-cols-2 gap-4">
              <label class="block text-sm"><span class="text-zinc-500">v1 (V):</span> <input type="number" v-model.number="params.v1" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
              <label class="block text-sm"><span class="text-zinc-500">v2 (V):</span> <input type="number" v-model.number="params.v2" class="mt-1 block w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm"></label>
            </div>
          </template>
        </div>
      </div>

      <!-- Right: Matrix & Solutions -->
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            {{ mode === 'nodal' ? 'Node-Voltage Equation (Gv = i)' : 'Mesh-Current Equation (Ri = v)' }}
          </h4>
          
          <div class="flex items-center justify-center space-x-2 font-mono text-lg p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
            <!-- Matrix -->
            <div class="relative px-2 py-1 border-l-2 border-r-2 border-zinc-800 dark:border-zinc-300 flex flex-col items-center gap-2">
              <div class="absolute top-0 left-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              <div class="absolute bottom-0 left-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              <div class="absolute top-0 right-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              <div class="absolute bottom-0 right-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              
              <div class="flex gap-4">
                <span 
                  @mouseenter="highlightG = mode === 'nodal' ? 'G11' : 'R11'" 
                  @mouseleave="highlightG = ''"
                  class="w-12 text-center cursor-help rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                  title="Sum of connected elements"
                >{{ matrix[0][0] }}</span>
                <span 
                  @mouseenter="highlightG = mode === 'nodal' ? 'G12' : 'R12'" 
                  @mouseleave="highlightG = ''"
                  class="w-12 text-center cursor-help rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-red-600 dark:text-red-400"
                  title="Negative of shared elements"
                >{{ matrix[0][1] }}</span>
              </div>
              <div class="flex gap-4">
                <span 
                  @mouseenter="highlightG = mode === 'nodal' ? 'G12' : 'R12'" 
                  @mouseleave="highlightG = ''"
                  class="w-12 text-center cursor-help rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-red-600 dark:text-red-400"
                  title="Negative of shared elements"
                >{{ matrix[1][0] }}</span>
                <span 
                  @mouseenter="highlightG = mode === 'nodal' ? 'G22' : 'R22'" 
                  @mouseleave="highlightG = ''"
                  class="w-12 text-center cursor-help rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                  title="Sum of connected elements"
                >{{ matrix[1][1] }}</span>
              </div>
            </div>
            
            <!-- Variables -->
            <div class="relative px-2 py-1 border-l-2 border-r-2 border-zinc-800 dark:border-zinc-300 flex flex-col items-center gap-2">
              <div class="absolute top-0 left-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              <div class="absolute bottom-0 left-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              <div class="absolute top-0 right-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              <div class="absolute bottom-0 right-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              
              <span>{{ mode === 'nodal' ? 'v1' : 'i1' }}</span>
              <span>{{ mode === 'nodal' ? 'v2' : 'i2' }}</span>
            </div>
            
            <span>=</span>
            
            <!-- RHS Vector -->
            <div class="relative px-2 py-1 border-l-2 border-r-2 border-zinc-800 dark:border-zinc-300 flex flex-col items-center gap-2">
              <div class="absolute top-0 left-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              <div class="absolute bottom-0 left-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              <div class="absolute top-0 right-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              <div class="absolute bottom-0 right-0 w-2 h-0.5 bg-zinc-800 dark:bg-zinc-300"></div>
              
              <span 
                @mouseenter="highlightG = mode === 'nodal' ? 'i1' : 'v1'" 
                @mouseleave="highlightG = ''"
                class="w-12 text-center cursor-help rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >{{ vector[0] }}</span>
              <span 
                @mouseenter="highlightG = mode === 'nodal' ? 'i2' : 'v2'" 
                @mouseleave="highlightG = ''"
                class="w-12 text-center cursor-help rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              >{{ vector[1] }}</span>
            </div>
          </div>
          
          <!-- Explanation box based on hover -->
          <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded text-sm text-blue-800 dark:text-blue-300 min-h-[60px] flex items-center">
            <p v-if="!highlightG" class="m-0 text-zinc-500 dark:text-zinc-400 italic text-center w-full">將游標懸停在矩陣元素上，查看電路圖對應關係與組裝規則。</p>
            <p v-else-if="mode === 'nodal' && highlightG === 'G11'" class="m-0"><strong>G11 = {{ params.G1 }} + {{ params.G12 }} = {{ matrix[0][0] }}</strong><br>主對角項：連接到節點 1 的所有電導總和。</p>
            <p v-else-if="mode === 'nodal' && highlightG === 'G22'" class="m-0"><strong>G22 = {{ params.G2 }} + {{ params.G12 }} = {{ matrix[1][1] }}</strong><br>主對角項：連接到節點 2 的所有電導總和。</p>
            <p v-else-if="mode === 'nodal' && highlightG === 'G12'" class="m-0"><strong>G12 = G21 = -({{ params.G12 }}) = {{ matrix[0][1] }}</strong><br>非對角項：節點 1 與 2 之間互電導的負值。</p>
            <p v-else-if="mode === 'nodal' && highlightG === 'i1'" class="m-0"><strong>i1 = {{ params.i1 }}</strong><br>常數向量：流入節點 1 的獨立電流源總和（流入為正）。</p>
            <p v-else-if="mode === 'nodal' && highlightG === 'i2'" class="m-0"><strong>i2 = {{ params.i2 }}</strong><br>常數向量：流入節點 2 的獨立電流源總和（流入為正）。</p>
            
            <p v-else-if="mode === 'mesh' && highlightG === 'R11'" class="m-0"><strong>R11 = {{ params.R1 }} + {{ params.R12 }} = {{ matrix[0][0] }}</strong><br>主對角項：環繞網孔 1 的所有電阻總和。</p>
            <p v-else-if="mode === 'mesh' && highlightG === 'R22'" class="m-0"><strong>R22 = {{ params.R2 }} + {{ params.R12 }} = {{ matrix[1][1] }}</strong><br>主對角項：環繞網孔 2 的所有電阻總和。</p>
            <p v-else-if="mode === 'mesh' && highlightG === 'R12'" class="m-0"><strong>R12 = R21 = -({{ params.R12 }}) = {{ matrix[0][1] }}</strong><br>非對角項：網孔 1 與 2 共用電阻的負值。</p>
            <p v-else-if="mode === 'mesh' && highlightG === 'v1'" class="m-0"><strong>v1 = {{ params.v1 }}</strong><br>常數向量：網孔 1 順時針繞行時遭遇的電壓升（由 - 到 +）總和。</p>
            <p v-else-if="mode === 'mesh' && highlightG === 'v2'" class="m-0"><strong>v2 = {{ -params.v2 }}</strong><br>常數向量：網孔 2 順時針繞行時遭遇的電壓升總和（此處 v2 電源由 + 到 -，為電壓降，故為負）。</p>
          </div>
        </div>

        <!-- Solutions -->
        <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-4">
          <h4 class="text-sm font-semibold text-green-800 dark:text-green-400 mb-2">即時運算解答 (Solutions)</h4>
          <div v-if="determinant === 0" class="text-red-600 dark:text-red-400 font-mono text-sm">
            行列式為 0，方程組無唯一解 (Singular Matrix)。
          </div>
          <div v-else class="font-mono text-lg text-green-900 dark:text-green-300">
            <div>{{ mode === 'nodal' ? 'v1' : 'i1' }} = {{ solution[0].toFixed(4) }} {{ mode === 'nodal' ? 'V' : 'A' }}</div>
            <div>{{ mode === 'nodal' ? 'v2' : 'i2' }} = {{ solution[1].toFixed(4) }} {{ mode === 'nodal' ? 'V' : 'A' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

const mode = ref<'nodal' | 'mesh'>('nodal')
const highlightG = ref('')

const params = reactive({
  // Nodal parameters
  G1: 2,
  G2: 3,
  G12: 1,
  i1: 5,
  i2: -2,
  
  // Mesh parameters
  R1: 4,
  R2: 6,
  R12: 2,
  v1: 10,
  v2: 5
})

const matrix = computed(() => {
  if (mode.value === 'nodal') {
    return [
      [params.G1 + params.G12, -params.G12],
      [-params.G12, params.G2 + params.G12]
    ]
  } else {
    return [
      [params.R1 + params.R12, -params.R12],
      [-params.R12, params.R2 + params.R12]
    ]
  }
})

const vector = computed(() => {
  if (mode.value === 'nodal') {
    return [params.i1, params.i2]
  } else {
    // For mesh 2, the source is shared on the right branch. Clockwise goes from + to - (voltage drop)
    return [params.v1, -params.v2]
  }
})

const determinant = computed(() => {
  const m = matrix.value
  return m[0][0] * m[1][1] - m[0][1] * m[1][0]
})

const solution = computed(() => {
  const det = determinant.value
  if (det === 0) return [0, 0]
  const m = matrix.value
  const v = vector.value
  
  // Inverse matrix calculation (2x2)
  const inv = [
    [m[1][1] / det, -m[0][1] / det],
    [-m[1][0] / det, m[0][0] / det]
  ]
  
  return [
    inv[0][0] * v[0] + inv[0][1] * v[1],
    inv[1][0] * v[0] + inv[1][1] * v[1]
  ]
})

onMounted(() => {
  // Ensure we are mounted safely for SSR
})
</script>

<style scoped>
/* Optional specific styles if Tailwind classes aren't sufficient */
</style>
