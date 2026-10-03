# Lesson 0003: 塊狀晶體生長與矽晶圓製備

> 從沙子（石英）到鏡面矽晶圓：柴氏長晶法 (CZ)、偏析效應 (Segregation) 與晶圓加工全解析

## 🎯 本單元核心學習目標

- 掌握矽原料提純路徑：**砂石 $\text{SiO}_2 \to$ 冶金級矽 (MGS) $\to$ 電子級矽 (EGS)** 及其關鍵化學反應式。
- 精通**柴氏長晶法 (Czochralski, CZ)** 與針對化合物半導體的**液封柴氏法 (Liquid-Encapsulated Czochralski, LEC)**。
- 推導**偏析/分佈係數 ($k_d = C_S/C_L$)**，理解常規凝固 (Normal Freezing) 下晶棒摻雜濃度的空間漸變。
- 熟練解答課本經典例題 **Example 1–4**（精確計算摻雜劑 As 所需添加之質量）。
- 了解晶圓加工切片與**化學機械研磨 (CMP)** 之作用機制。

---

## 一、 原料提純：從沙子到電子級矽 (EGS)

半導體元件對純度的要求極為苛刻（雜質含量低於百億分之一，即 $< 1\text{ ppb} \approx 5 \times 10^{13}\text{ cm}^{-3}$）。提純分成兩大階段：

### 1. 冶金級矽 (Metallurgical Grade Silicon, MGS)
以高純石英砂 ($\text{SiO}_2$) 與焦炭 (C) 在電弧爐中進行高溫 ($\sim 1800^\circ\text{C}$) 還原反應：

$$\text{SiO}_2 + 2\text{C} \xrightarrow{\sim 1800^\circ\text{C}} \text{Si} + 2\text{CO}\uparrow \quad (\text{Eq. 1–3})$$

*產物純度僅約 98%~99%，含有大量金屬雜質（Fe, Al, B 等），屬於多晶，無法直接用於半導體元件。*

### 2. 電子級矽 (Electronic Grade Silicon, EGS) — 西門子製程 (Siemens Process)
為徹底去除雜質，將 MGS 與乾燥氯化氫 ($\text{HCl}$) 在約 $300^\circ\text{C}$ 反應，轉化為易揮發液體**三氯氫矽 ($\text{SiHCl}_3$，沸點 $32^\circ\text{C}$)**：

$$\text{Si} + 3\text{HCl} \xrightarrow{\sim 300^\circ\text{C}} \text{SiHCl}_3 + \text{H}_2\uparrow \quad (\text{Eq. 1–4})$$

利用沸點差異進行**多道分餾 (Fractional Distillation)**，將沸點相近之金屬氯化物（如 $\text{FeCl}_3$）完全分離；最後在純氫氣流中於高溫還原沉積出極高純度之多晶 EGS：

$$2\text{SiHCl}_3 + 2\text{H}_2 \xrightarrow{\sim 1100^\circ\text{C}} 2\text{Si} + 6\text{HCl}\uparrow \quad (\text{Eq. 1–5})$$

純度達到 **9N~11N ($99.9999999\% \sim 99.999999999\%$)**。

---

## 二、 單晶晶棒生長 (Single-Crystal Ingot Growth)

### 1. 柴氏長晶法 (Czochralski Method, CZ 法)
目前超過 90% 的積體電路單晶矽晶圓皆由 CZ 法製造：
- **熔融**：高純 EGS 放入石英 ($\text{SiO}_2$) 內襯之石墨坩堝中，加熱至矽熔點 ($1412^\circ\text{C}$)。
- **晶種導入 (Seeding)**：將具有特定晶向（通常為 $\langle 100\rangle$ 或 $\langle 111\rangle$）的單晶晶種浸入熔湯表面。
- **縮頸 (Neck Growth / Dash Technique)**：先快速拉長縮小直徑至 2~4 mm，使晶種接觸產生的差排 (Dislocations) 藉由表面逸出消除。
- **放肩 (Crown) 與等徑生長 (Body)**：降溫擴大直徑至目標尺寸（如 300 mm），維持穩定提拉速度（約數 mm/min）與雙向反轉，凝固出巨大的單晶圓柱矽錠。

### 2. 化合物半導體之液封柴氏法 (LEC 法)

::: warning 為什麼化合物半導體 (GaAs, InP) 不能用傳統 CZ 法？
在高溫熔點（如 GaAs 之 $1238^\circ\text{C}$）下，V 族元素（As 或 P）具有極高的飽和蒸氣壓，極易劇烈揮發逸出，破壞化學計量比 (Stoichiometry)。
:::

**LEC 解決方案**：
在熔湯上方覆蓋一層約 1 cm 厚、高密度且在高溫下呈黏稠液態的**三氧化二硼 ($\text{B}_2\text{O}_3$)**，並在爐內充入數十個大氣壓的惰性氣體（如 $\text{Ar}$ 或 $\text{N}_2$），形成嚴密的液相物理封印，成功抑制 As 蒸發。

---

## 三、 摻雜與分佈/偏析係數 (Doping & Segregation Coefficient)

在 CZ 提拉長晶時，常在熔湯中主動加入微量雜質（如 As, P, B）以調整電阻率。在固液交界面達成熱力學平衡時，**固相雜質濃度 $C_S$** 與**液相雜質濃度 $C_L$** 之比值定義為：

$$k_d = \frac{C_S}{C_L} \quad (\text{分佈係數 / 偏析係數, Distribution/Segregation Coefficient})$$

| 元素 | 類型 | 分佈係數 $k_d$ | 物理行為 |
| :--- | :--- | :--- | :--- |
| **硼 (B)** | p-type (III 族) | **0.80** | 偏析程度低，整根晶棒濃度相對均勻 |
| **磷 (P)** | n-type (V 族) | **0.35** | 中度偏析，晶棒後端濃度逐漸增高 |
| **砷 (As)** | n-type (V 族) | **0.30** | 常規 CZ 摻雜元素，晶棒後端富集 |
| **銻 (Sb)** | n-type (V 族) | **0.023** | 劇烈偏析，絕大部分留在熔湯中 |

### 常規凝固方程式 (Normal Freezing Equation)
設初始熔湯濃度為 $C_0$，當已固化比例為 $g = M_{\text{solid}} / M_{\text{total}}$ 時，固相濃度為：

$$C_S(g) = k_d C_0 (1 - g)^{k_d - 1}$$

*因為 $k_d < 1$，$(k_d - 1) < 0$，隨著 $g \to 1$（晶棒生長尾聲），$(1-g)^{k_d - 1}$ 迅速放大，導致晶棒尾端的摻雜濃度顯著高於頭部。*

---

## 四、 課本經典例題 Example 1–4 深度推導

::: info 【課本 Example 1–4 原題】
在 CZ 長晶爐中，有 $1\text{ kg}$ 矽熔湯。欲使剛開始結晶之固相具有 $C_S = 10^{15}\text{ atoms/cm}^3$ 的 As 摻雜濃度，已知 As 在 Si 中的 $k_d = 0.3$，As 原子量為 $74.9\text{ g/mol}$，矽密度為 $2.33\text{ g/cm}^3$。請問初始熔湯中需添加多少質量的砷 (As)？
:::

### 推導 SOP 四步驟：

1. **求初始熔湯所需之雜質體積濃度 $C_L$：**
   $$C_L = \frac{C_S}{k_d} = \frac{10^{15}\text{ cm}^{-3}}{0.3} \approx 3.33 \times 10^{15}\text{ atoms/cm}^3$$

2. **求 $1\text{ kg}$ 矽熔湯之總體積 $V_{\text{Si}}$：**
   $$V_{\text{Si}} = \frac{\text{質量}}{\text{密度}} = \frac{1000\text{ g}}{2.33\text{ g/cm}^3} \approx 429.2\text{ cm}^3$$

3. **計算熔湯中需含之 As 總原子數 $N_{\text{As}}$：**
   $$N_{\text{As}} = C_L \times V_{\text{Si}} = (3.333 \times 10^{15}\text{ atoms/cm}^3) \times (429.2\text{ cm}^3) \approx 1.43 \times 10^{18}\text{ atoms}$$

4. **透過莫耳數與原子量換算所需質量 $m_{\text{As}}$：**
   $$m_{\text{As}} = \frac{N_{\text{As}}}{N_A} \times M_{\text{As}} = \frac{1.43 \times 10^{18}\text{ atoms}}{6.022 \times 10^{23}\text{ atoms/mol}} \times 74.9\text{ g/mol}$$
   $$\mathbf{m_{\text{As}} \approx 1.8 \times 10^{-4}\text{ g} = 0.18\text{ mg}}$$

> 💡 **結論**：在一公斤的矽熔湯中，僅需投入不到 0.2 毫克的砷微粒，即可達成百億分之一等級的精準半導體摻雜！

---

## 五、 晶圓成型加工與 CMP 奈米級平坦化

生長完成的巨型單晶錠必須經過一系列高精密機械與化學加工：

1. **晶棒修整與滾圓 (Ingot Trimming & Cylinder Grinding)**：切除頭尾錐形端，透過外圓研磨機將單晶錠精準研磨為標準直徑（如 200 mm 或 300 mm）。
2. **晶向標記**：研磨定位槽 (**Notch**) 或定位平面 (**Flat**)，以指示 $\{110\}$ 劈裂面晶向。
3. **線鋸切割 (Wire Sawing)**：使用高速往復運轉之鑽石線鋸同步切片成約 $775\ \mu\text{m}$ 厚度之晶圓。
4. **雙面研磨與邊緣倒角 (Lapping & Edge Profiling)**：去除微裂紋損傷層，防止邊緣碎裂。
5. **化學機械研磨 (Chemical-Mechanical Polishing, CMP)**：
   - **化學反應**：弱鹼性研磨液 ($\text{NaOH}$ 或 $\text{KOH}$ 水溶液) 軟化矽表面生成薄水合氧化層。
   - **機械摩擦**：奈米級膠體石英 ($\text{SiO}_2$ 微粒) 在旋轉拋光墊下平坦切除凸起處，提供無應力、原子級平整的鏡面 (Roughness $< 0.1\text{ nm}$)。

---

## ⚔️ 隨堂實戰測驗

::: details 問題 1：在利用液封柴氏法 (LEC) 生長 GaAs 等化合物半導體單晶時，覆蓋於熔湯表面的黏稠液封材料為何？
- **選項**：
  - **A. 熔融之三氧化二硼 ($\text{B}_2\text{O}_3$) (正確)**
  - B. 高純度之二氧化矽 ($\text{SiO}_2$)
  - C. 液態碳化矽 ($\text{SiC}$)
  - D. 濃氯化鈉水溶液 ($\text{NaCl}$)
- **解析**：
  液封柴氏法 (LEC) 使用熔融的三氧化二硼 $\text{B}_2\text{O}_3$ 作為高黏度液相封印層，防止 As 或 P 等揮發。
:::

::: details 問題 2：已知雜質在矽中的分佈係數 $k_d < 1$（如 As 的 $k_d = 0.3$）。在柴氏法長晶過程中，晶棒從頭部生長到尾部時，其摻雜濃度分佈趨勢為何？
- **選項**：
  - A. 頭部濃度最高，尾部逐漸遞減
  - **B. 頭部濃度較低，尾部顯著富集 (正確)**
  - C. 全程濃度恆定，完全均勻分佈
  - D. 呈現週期震盪
- **解析**：
  因為 $k_d < 1$，固相對雜質產生排斥作用，使得雜質在剩餘熔湯中累積富集，故晶棒尾部濃度依 $C_S(g) = k_d C_0 (1-g)^{k_d - 1}$ 顯著升高。
:::

::: details 問題 3：在西門子法 (Siemens Process) 中，將冶金級矽 (MGS) 轉化為電子級矽 (EGS) 時所使用的關鍵易揮發中介化學液體為何？
- **選項**：
  - A. 四氟化矽氣體 ($\text{SiF}_4$)
  - B. 二氧化矽膠體 ($\text{SiO}_2$)
  - **C. 三氯氫矽液體 ($\text{SiHCl}_3$) (正確)**
  - D. 碳化矽固體結晶 ($\text{SiC}$)
- **解析**：
  三氯氫矽 ($\text{SiHCl}_3$) 沸點僅 $32^\circ\text{C}$，能輕易透過多道分餾與金屬氯化物分離，為西門子提純製程之核心。
:::
