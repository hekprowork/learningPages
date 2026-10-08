# 003: 塊狀晶體生長與晶圓製程核心速查表

> 涵蓋原料提純化學式、三大長晶技術 (CZ / LEC / FZ)、偏析係數 $k_d$ 與 Example 1–4 標準計算 SOP

## 一、 矽原料提純核心化學反應式 (Chemical Reactions)

| 階段 | 反應溫度 | 化學反應方程式 | 特點與純度 |
| :--- | :--- | :--- | :--- |
| **1. 冶金級矽 (MGS)** | $\sim 1800^\circ\text{C}$ (電弧爐) | $\text{SiO}_2 + 2\text{C} \rightarrow \text{Si} + 2\text{CO}\uparrow$ | 純度 98~99%，多晶，含大量金屬雜質 |
| **2. 三氯氫矽生成** | $\sim 300^\circ\text{C}$ | $\text{Si} + 3\text{HCl} \rightarrow \text{SiHCl}_3 + \text{H}_2\uparrow$ | $\text{SiHCl}_3$ 沸點僅 $32^\circ\text{C}$，極易透過**分餾**純化 |
| **3. 電子級矽 (EGS)** | $\sim 1100^\circ\text{C}$ (西門子法) | $2\text{SiHCl}_3 + 2\text{H}_2 \rightarrow 2\text{Si} + 6\text{HCl}\uparrow$ | 純度達 $99.9999999\%$ (9N~11N，雜質 $< 1\text{ ppb}$) |

---

## 二、 三大塊狀單晶長晶技術比較 (Crystal Growth Methods)

| 長晶方法 | 原理與關鍵特徵 | 主要適用材料 | 優勢與限制 |
| :--- | :--- | :--- | :--- |
| **柴氏長晶法 (CZ)** | 石英坩堝熔融 EGS ($1412^\circ\text{C}$)，浸入晶種緩慢提拉並雙向旋轉 | 單晶矽 ($\text{Si}$)、鍺 ($\text{Ge}$) | 晶棒直徑大 ($300\text{ mm}$)、產能高；石英坩堝會溶入微量氧與碳 |
| **液封柴氏法 (LEC)** | 熔湯表面覆蓋黏稠之 $\text{B}_2\text{O}_3$ 液封層，配合數十 atm 高壓惰性氣體 | 化合物半導體 ($\text{GaAs}, \text{InP}$) | 有效抑制高溫下 V 族元素 ($\text{As}, \text{P}$) 劇烈揮發，維持化學計量比 |
| **浮動帶區法 (FZ)** | 高頻 RF 線圈局部熔融多晶棒，熔融區在表面張力下懸浮並向下移動 | 高純度單晶矽 ($\text{Si}$) | **無坩堝接觸**，氧/碳極低，電阻率極高；直徑難以做大 (成本高) |

---

## 三、 偏析效應與摻雜計算 (Segregation & Doping)

### 1. 分佈 / 偏析係數定義：
$$k_d = \frac{C_S}{C_L}$$

### 2. 常規凝固方程式 (Normal Freezing Equation)：
$$C_S(g) = k_d C_0 (1 - g)^{k_d - 1}$$
*($C_0$: 初始熔湯均勻濃度；$g$: 已結晶固化之質量比例 $0 \le g < 1$)*

| 摻雜元素 | 導電型態 | 矽中平衡偏析係數 $k_d$ | 晶棒軸向分佈特性 |
| :--- | :--- | :--- | :--- |
| **硼 (B)** | p-type (III 族) | **0.80** | 最均勻，頭尾濃度差異小 |
| **磷 (P)** | n-type (V 族) | **0.35** | 中度偏析，尾端濃度漸增 |
| **砷 (As)** | n-type (V 族) | **0.30** | 標準 CZ 摻雜元素 |
| **銻 (Sb)** | n-type (V 族) | **0.023** | 極度富集於熔湯中，晶棒尾部劇烈陡升 |

---

## 四、 課本 Example 1–4 摻雜劑添加量標準解題 SOP

::: tip 標準解題 SOP
求在質量為 $M_{\text{Si}}$ 的矽熔湯中，欲達成剛開始生長之固相摻雜濃度 $C_S$，需添加之摻雜劑質量 $m_{\text{dopant}}$：

1. **求熔湯初始濃度**：
   $$C_L = \frac{C_S}{k_d}$$
2. **求矽熔湯體積**：
   $$V_{\text{Si}} = \frac{M_{\text{Si}}}{\rho_{\text{Si}}} \quad (\rho_{\text{Si}} = 2.33\text{ g/cm}^3)$$
3. **求雜質總原子數**：
   $$N = C_L \times V_{\text{Si}}$$
4. **換算莫耳質量**：
   $$m_{\text{dopant}} = \frac{N}{N_A} \times \text{Atomic Weight} \quad (N_A = 6.022 \times 10^{23}\text{ mol}^{-1})$$
:::

---

## 五、 晶圓製造關鍵工序 (Wafer Fabrication Pipeline)

1. **外圓滾磨 (Cylinder Grinding)**：磨成標準直徑 ($200\text{ mm} / 300\text{ mm}$)，並研磨 $\{110\}$ 定位槽 (Notch) 或平邊 (Flat)。
2. **線鋸切片 (Wire Sawing)**：多線鑽石鋸切割為約 $775\ \mu\text{m}$ 生晶圓。
3. **倒角與雙面研磨 (Edge Profiling & Lapping)**：消除切割微裂紋，防止邊緣碎裂。
4. **化學機械研磨 (CMP)**：鹼性水溶液 ($\text{NaOH}$) 化學水解軟化 + 奈米級 $\text{SiO}_2$ 膠體機械拋光，達成表面粗糙度 $< 0.1\text{ nm}$ 鏡面。
