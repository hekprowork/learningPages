# 0004: 網孔電流法的平面拓撲本質與超網孔迴路獨立性推導

> 深入圖論歐拉公式、基底迴路向量空間、未知電流源端電壓消去與阻抗矩陣對稱性

## 🎯 學習紀錄核心重點

本單元從電路圖論 (Graph Theory) 與拓撲學的第一原理出發，嚴格推導**網孔電流法 (Mesh Analysis)** 與**超網孔 (Supermesh)** 的數學與物理基礎。

透過歐拉平面多面體公式，建立平面電路中支路數、節點數與基本網孔數的精確拓撲關係；並從向量空間的角度證明「網孔電流」構成基底迴路矩陣的完備基底。

進一步分析當相鄰兩網孔共用理想電流源時，端電壓 $v_s$ 缺失所導致的代數困境，嚴格證明「超網孔大迴路 KVL」與「電流源拘束式」的結合如何完美維持系統方程式的秩 (Rank) 與可解性。

---

## 一、 圖論與平面拓撲：為什麼只有平面電路能用網孔法？

### 1. 電路圖的拓撲定義
將電路簡化為拓撲圖 $G = (V, E)$，其中：
- 節點集 $V$ 的元素數量為 $N$（頂點數）。
- 支路集 $E$ 的元素數量為 $B$（邊數）。

### 2. 歐拉平面公式與獨立網孔數定理
對於可以在二維平面上繪製且導線無交叉的**平面圖 (Planar Graph)**，平面被劃分為若干個有界幾何區域（網孔）與一個無界外部區域。根據歐拉平面幾何定理：
$$V - E + F = 2$$
其中 $F$ 為總面數（包含內部網孔面 $M$ 與 1 個無界外平面）：$F = M + 1$。

代入整理可得：
$$N - B + (M + 1) = 2 \implies M = B - N + 1$$

::: tip 💡 拓撲意涵
在任何連通平面電路中，**互不重疊的基本網孔數量 $M$ 恆等於 $B - (N - 1)$**！
- $(N - 1)$ 正好是電路生成樹 (Spanning Tree) 的樹枝 (Tree Branches) 數量。
- $M$ 正好是電路補樹 (Co-tree) 的連支 (Links/Chords) 數量。
- 每個連支與樹枝構成唯一的**基本迴路 (Fundamental Loop)**，在平面電路中，這組基本迴路正好可以選取為**幾何網孔 (Meshes)**！
:::

若電路為非平面電路（如著名的 $K_5$ 完全圖或 $K_{3,3}$ 完全二部圖），無法定義平面的「窗格」，網孔分析法便失效，必須退回使用基於選樹的通用迴路分析法 (General Loop Analysis)。

---

## 二、 網孔電流作為基底迴路電流向量空間

設支路電流向量為 $\mathbf{i}_b \in \mathbb{R}^B$，網孔電流向量為 $\mathbf{i}_m \in \mathbb{R}^M$。

兩者之間存在線性映射：
$$\mathbf{i}_b = \mathbf{C}^T \mathbf{i}_m$$
其中 $\mathbf{C} \in \mathbb{R}^{M \times B}$ 為**網孔支路關聯矩陣 (Mesh-Branch Incidence Matrix)**：
$$C_{kj} = \begin{cases} +1, & \text{若支路 } j \text{ 屬於網孔 } k \text{ 且方向相同} \\ -1, & \text{若支路 } j \text{ 屬於網孔 } k \text{ 且方向相反} \\ 0, & \text{若支路 } j \text{ 不屬於網孔 } k \end{cases}$$

### KCL 的自然滿足性
由圖論基礎定理，關聯矩陣滿足：
$$\mathbf{A} \mathbf{C}^T = \mathbf{0}$$
（其中 $\mathbf{A}$ 為節點支路關聯矩陣）。

因此，流入所有節點的支路電流為：
$$\mathbf{A} \mathbf{i}_b = \mathbf{A} (\mathbf{C}^T \mathbf{i}_m) = (\mathbf{A} \mathbf{C}^T) \mathbf{i}_m = \mathbf{0}$$
**數學證明了：只要採用網孔電流表色，無論 $\mathbf{i}_m$ 取何值，全電路的所有節點 KCL 均恆等成立！**

---

## 三、 理想共用電流源的物理困境

在網孔分析中，我們對 $M$ 個網孔分別列寫 KVL：
$$\mathbf{C} \mathbf{v}_b = \mathbf{0}$$

當支路 $j$ 包含線性電阻時，支路電壓由歐姆定律確定：$v_j = R_j i_j$。

### 為什麼共用電流源使標準 KVL 崩潰？
當支路 $j$ 是一個連接在網孔 $a$ 與網孔 $b$ 之間的理想電流源 $I_s$ 時：
1. **理想電流源的內部電導為零（內阻無窮大）**：其端電壓 $v_s$ 完全由外部網絡決定，**不存在本構關係 $v_s = f(i_s)$**。
2. 若對網孔 $a$ 與網孔 $b$ 分別列寫 KVL，方程式中將同時出現未知變數 $v_s$：
   $$\text{網孔 } a: \sum R i + v_s = \dots$$
   $$\text{網孔 } b: \sum R i - v_s = \dots$$
3. 引入了 1 個新的未知電壓 $v_s$，未知數變成 $M + 1$ 個，必須額外尋求一條約束條件。

---

## 四、 超網孔 (Supermesh) 的拓撲實質

### 1. 代數相加消去未知電壓 $v_s$
在代數層面上，將網孔 $a$ 的 KVL 與網孔 $b$ 的 KVL 直接相加：
$$(\text{網孔 } a \text{ KVL}) + (\text{網孔 } b \text{ KVL}) = 0$$
由於電流源在兩網孔中繞行方向相反，其未知的端電壓 $+v_s$ 與 $-v_s$ **恰好精確抵消**！

### 2. 幾何實質：邊界合併大迴路
代數相加在幾何上的對應操作，正好是**「移除該共用支路（將該支路開路），並將網孔 $a$ 與網孔 $b$ 合併為一個外圍大迴路」**——這正是**超網孔 (Supermesh)**！

```
     網孔 a (順時針繞行)              網孔 b (順時針繞行)
     共用邊上有 +vs                   共用邊上有 -vs
          └───► 相加抵消 (+vs - vs = 0) ◄───┘
                         │
                         ▼
        形成避開未知端電壓 vs 的外圍超網孔 KVL
```

---

## 五、 方程式維度不變性定理證明 (Dimensional Invariance)

設平面電路含有 $M$ 個網孔，其中包含 $k$ 個由兩網孔共用的電流源：

| 方程式類別 | 提供條數 | 線性獨立性來源 |
| :--- | :--- | :--- |
| **超網孔大迴路 KVL** | $k$ 個合併超網孔提供 $k$ 條大迴路 | 由相鄰網孔相加產生之獨立迴路 |
| **未受影響之普通網孔 KVL** | $M - 2k$ 個獨立網孔 | 互不相交之基本網孔幾何面 |
| **電流源拘束方程式** | $k$ 條 | 支路電流源定義：$i_{\text{同向}} - i_{\text{反向}} = I_s$ |
| **總計線性獨立方程式** | **$M$ 條** | **嚴格等於 $M$ 個未知網孔電流數量** |

此定理嚴謹保證了：透過超網孔技術，**方程組的自由度 (Degrees of Freedom) 始終維持為 $M$**，其係數矩陣滿秩且必定有唯一確定解。

---

## 六、 觀察法電阻矩陣 $[R]$ 的對稱性與能量守恆

對於僅含線性電阻與獨立電源的電路，網孔方程組可寫為：
$$[R] \mathbf{i}_m = \mathbf{v}_s$$

### 對稱性證明：$R_{jk} = R_{kj}$
根據網孔支路關聯矩陣 $\mathbf{C}$ 與對角支路電阻矩陣 $\mathbf{R}_b = \operatorname{diag}(R_1, R_2, \dots, R_B)$：
$$[R] = \mathbf{C} \mathbf{R}_b \mathbf{C}^T$$

轉置該矩陣：
$$[R]^T = (\mathbf{C} \mathbf{R}_b \mathbf{C}^T)^T = (\mathbf{C}^T)^T \mathbf{R}_b^T \mathbf{C}^T = \mathbf{C} \mathbf{R}_b \mathbf{C}^T = [R]$$
由於 $\mathbf{R}_b$ 為純對角矩陣（$\mathbf{R}_b^T = \mathbf{R}_b$），**阻抗矩陣 $[R]$ 必定對稱**！

### 正定性與熱能耗散
電路中的總電阻瞬時耗散功率為：
$$P = \mathbf{i}_b^T \mathbf{R}_b \mathbf{i}_b = (\mathbf{C}^T \mathbf{i}_m)^T \mathbf{R}_b (\mathbf{C}^T \mathbf{i}_m) = \mathbf{i}_m^T (\mathbf{C} \mathbf{R}_b \mathbf{C}^T) \mathbf{i}_m = \mathbf{i}_m^T [R] \mathbf{i}_m$$
由於被動電阻 $R_j > 0$，只要存在非零電流，消耗功率恆為正（$P > 0$）。因此 $[R]$ 不僅對稱，而且是**正定矩陣 (Positive-Definite Matrix)**，其行列式 $\det([R]) > 0$，反矩陣 $[R]^{-1}$ 恆存在，方程組必有良態唯一解。

---

## 七、 相關學習資源

- [Lesson 0003: 網孔分析法與超網孔的原理與實戰破解 (Tutorial Page)](/circuits/chapter3/0002-mesh-analysis)
- [003: 網孔分析法與超網孔核心速查手冊 (Reference Cheatsheet)](/circuits/reference/003-mesh-reference)
- [0003: 超節點分析法的物理包絡原理與拘束方程式架構 (Duality Learning Record)](/circuits/learning-records/0003-supernode-nodal-analysis-principle)
