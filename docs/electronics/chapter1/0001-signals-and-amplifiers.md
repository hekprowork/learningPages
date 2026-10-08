# Lesson 0001: 訊號、放大器模型與頻率響應 (Signals, Amplifiers & Frequency Response)

> 掌握電子學的核心支柱：受控源放大器模型、級聯負載效應與單時間常數 (STC) 頻率響應分析

## 🎯 本單元目標

讀完本課並完成隨堂概念檢測後，你將能夠：

- 建立各類訊號源的戴維寧與諾頓等效模型，精準計算輸入端與輸出端的阻抗分壓負載效應。
- 熟練推導四大二埠放大器組態（電壓、電流、轉導、轉阻）之增益、理想阻抗條件與參數互換關係。
- 逐步解析多級串接放大器（Cascaded Amplifiers）之級間負載效應與整體電壓/功率增益。
- 分析低通與高通單時間常數 (STC) 網路，計算 3-dB 截止頻率並繪製波德圖（Bode Plot）。

---

## 一、 訊號源模型與負載效應 (Signals & Transducers)

在真實物理世界中，資訊通常由**轉換器 (Transducers)**（如麥克風、光電二極體、熱敏電阻）將非電氣物理量轉化為電氣訊號。任何線性訊號源皆可用兩種標準電路等效：

1. **戴維寧等效 (Thévenin Equivalent)**：由開路電壓源 $v_s(t)$ 與串聯內阻 $R_s$ 組成。
2. **諾頓等效 (Norton Equivalent)**：由短路電流源 $i_s(t)$ 與並聯內阻 $R_s$ 組成，滿足 $v_s = R_s i_s$。

::: tip 💡 戴維寧與諾頓的工程選型直覺
- 當訊號源內阻極高時（例如壓電感測器、光電倍增管），視為**電流源（諾頓）**更為直觀。
- 當訊號源內阻極低時（例如電源穩壓器、動圈式麥克風），視為**電壓源（戴維寧）**更為直觀。
:::

### 負載分壓定理 (Voltage Divider Effect)
當戴維寧訊號源接上負載電阻 $R_L$ 時，由於源端內阻 $R_s$ 的存在，實際跨在負載兩端的電壓為：

$$v_L = v_s \left( \frac{R_L}{R_s + R_L} \right)$$

要使負載電壓接近理想源電壓（$v_L \approx v_s$），必須滿足：

$$R_L \gg R_s$$

---

## 二、 放大器的核心增益與功率平衡

訊號經過放大器放大時，我們定義三種核心增益（Gain）：

- **電壓增益 (Voltage Gain)**：
  $$A_v \equiv \frac{v_o}{v_i}, \quad \text{Gain (dB)} = 20\log_{10}|A_v|$$
- **電流增益 (Current Gain)**：
  $$A_i \equiv \frac{i_o}{i_i}, \quad \text{Gain (dB)} = 20\log_{10}|A_i|$$
- **功率增益 (Power Gain)**：
  $$A_p \equiv \frac{P_L}{P_I} = \frac{v_o i_o}{v_i i_i} = A_v A_i, \quad \text{Gain (dB)} = 10\log_{10} A_p$$

::: info 分貝 (dB) 常用速算心算法
- 電壓/電流比值（$20\log$）：$2\times \approx +6\text{ dB}$；$10\times = +20\text{ dB}$；$100\times = +40\text{ dB}$
- 功率比值（$10\log$）：$2\times \approx +3\text{ dB}$；$10\times = +10\text{ dB}$；$100\times = +20\text{ dB}$
:::

### 直流供電與功率守恆 (DC Power Balance)
放大器輸出給負載的訊號功率 $P_L$ 往往遠大於輸入訊號功率 $P_i$。能量由外部**直流電源供應器 (DC Supplies)** 提供：

$$P_{DC} = V_{CC} I_{CC} + V_{EE} I_{EE}$$
$$P_{DC} + P_i = P_L + P_{\text{dissipated}}$$

因輸入訊號功率通常極小（$P_i \ll P_L$），放大器的功率轉換效率定義為：

$$\eta \equiv \frac{P_L}{P_{DC}} \times 100\%$$

---

## 三、 四大基本放大器模型與二埠網路

根據輸入訊號（電壓或電流）與輸出受控源的類型，電子學將放大器抽象化為四種二埠 (Two-Port) 等效模型：

| 放大器類型 (Amplifier Type) | 增益參數與定義 | 測試條件 | 理想輸入電阻 $R_i$ | 理想輸出電阻 $R_o$ | 等效受控源形式 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **電壓放大器 (Voltage Amp)** | $A_{vo} \equiv \left.\frac{v_o}{v_i}\right\|_{i_o=0}$ (V/V) | 開路 ($i_o = 0$) | $\infty$ (不分走源電壓) | $0$ (負載變動不影響輸出) | 壓控電壓源 (VCVS): $A_{vo} v_i$ |
| **電流放大器 (Current Amp)** | $A_{is} \equiv \left.\frac{i_o}{i_i}\right\|_{v_o=0}$ (A/A) | 短路 ($v_o = 0$) | $0$ (完全吸納訊號電流) | $\infty$ (負載變動不影響輸出) | 流控電流源 (CCCS): $A_{is} i_i$ |
| **轉導放大器 (Transconductance Amp)** | $G_m \equiv \left.\frac{i_o}{v_i}\right\|_{v_o=0}$ (A/V 或 S) | 短路 ($v_o = 0$) | $\infty$ | $\infty$ | 壓控電流源 (VCCS): $G_m v_i$ |
| **轉阻放大器 (Transresistance Amp)** | $R_m \equiv \left.\frac{v_o}{i_i}\right\|_{i_o=0}$ (V/A 或 $\Omega$) | 開路 ($i_o = 0$) | $0$ | $0$ | 流控電壓源 (CCVS): $R_m i_i$ |

### 參數間的等效互換關係
$$A_{vo} = G_m R_o = \frac{R_m}{R_i} = A_{is} \frac{R_o}{R_i}$$

---

## 四、 多級串接放大器分析 (Cascaded Amplifiers)

單一放大級往往難以同時具備高輸入阻抗、高增益與低輸出阻抗。工程實務常將多級放大器**串接 (Cascade)**。

### 經典範例剖析 (Example 1.3 深度解析)
**題目情境**：
三級放大器連接訊號源（$v_s = 1\text{ mV}, R_s = 100\text{ k}\Omega$）與負載 $R_L = 100\ \Omega$：
- 第 1 級（高輸入阻抗前置級）：$R_{i1} = 1\text{ M}\Omega,\ A_{vo1} = 10\text{ V/V},\ R_{o1} = 1\text{ k}\Omega$
- 第 2 級（高增益中間級）：$R_{i2} = 10\text{ k}\Omega,\ A_{vo2} = 100\text{ V/V},\ R_{o2} = 1\text{ k}\Omega$
- 第 3 級（低輸出阻抗功率級）：$R_{i3} = 10\text{ k}\Omega,\ A_{vo3} = 1\text{ V/V},\ R_{o3} = 10\ \Omega$

**計算步驟**：
1. **源端分壓**：
   $$v_{i1} = v_s \frac{R_{i1}}{R_s + R_{i1}} = 1\text{ mV} \times \frac{1000}{100 + 1000} = 0.909\text{ mV}$$
2. **第 1 級增益（以第 2 級 $R_{i2}$ 為負載）**：
   $$v_{i2} = A_{vo1} v_{i1} \frac{R_{i2}}{R_{o1} + R_{i2}} = 10 \times 0.909 \times \frac{10}{1 + 10} = 8.26\text{ mV} \implies A_{v1} = 9.09\text{ V/V}$$
3. **第 2 級增益（以第 3 級 $R_{i3}$ 為負載）**：
   $$v_{i3} = A_{vo2} v_{i2} \frac{R_{i3}}{R_{o2} + R_{i3}} = 100 \times 8.26 \times \frac{10}{1 + 10} = 751\text{ mV} \implies A_{v2} = 90.9\text{ V/V}$$
4. **第 3 級增益（以真實負載 $R_L$ 為負載）**：
   $$v_o = A_{vo3} v_{i3} \frac{R_L}{R_{o3} + R_L} = 1 \times 751 \times \frac{100}{10 + 100} = 683\text{ mV} \implies A_{v3} = 0.909\text{ V/V}$$
5. **總體電壓增益 $G_v$**：
   $$G_v = \frac{v_o}{v_s} = \frac{v_{i1}}{v_s} \times A_{v1} \times A_{v2} \times A_{v3} \approx 683\text{ V/V} \approx 56.7\text{ dB}$$

---

## 五、 放大器頻率響應與單時間常數 (STC) 電路

由於電晶體內部存在寄生電容，外圍亦有耦合電容，放大器的轉移函數為頻率的複變數函數：$T(\omega) = |T(\omega)|e^{j\phi(\omega)}$。大部分的高低頻滾降區皆可簡化為**單時間常數 (STC) 網路**：

### 低通 vs 高通 STC 核心對比
$$T_{LP}(s) = \frac{K}{1 + s/\omega_0} \qquad T_{HP}(s) = \frac{K}{1 + \omega_0/s}$$

其中 3-dB 截止頻率為：
$$\omega_0 = \frac{1}{\tau} = \frac{1}{RC} \quad \left(f_0 = \frac{1}{2\pi RC}\right)$$

在 $\omega = \omega_0$ 處：
- 增益振幅恰好下降至直流最大值的 $\frac{1}{\sqrt{2}}$（即衰減 $3\text{ dB}$）。
- 低通網路產生 $-45^\circ$ 相位落後；高通網路產生 $+45^\circ$ 相位超前。
- 進入漸近滾降區後，每經過 10 倍頻率（Decade），增益衰減 $20\text{ dB}$（即 $-6\text{ dB/octave}$）。

---

## 六、 即時隨堂概念檢測 (Retrieval Practice)

::: details 📝 題目 1：理想電壓放大器的阻抗條件
**問題**：為了使電壓放大器在連接任意訊號源與負載時，皆能達到最大的電壓傳遞效率，其理想的輸入電阻 $R_i$ 與輸出電阻 $R_o$ 應為？

**答案與解析**：
應為 **$R_i = \infty,\ R_o = 0$**。
- 輸入端為開路等效，需 $R_i \to \infty$ 方能避免分走訊號源內阻 $R_s$ 上的電壓（$v_i \approx v_s$）。
- 輸出端為戴維寧等效，需 $R_o \to 0$ 方能確保所有受控電壓完全降落在負載 $R_L$ 上（$v_o \approx A_{vo} v_i$）。
:::

::: details 📝 題目 2：功率增益的分貝換算
**問題**：若某放大器的電壓增益為 $100\text{ V/V}$，電流增益為 $1000\text{ A/A}$，則其功率增益 $A_p$ 以分貝 (dB) 表示應為多少？

**答案與解析**：
功率增益 $A_p = A_v \cdot A_i = 100 \times 1000 = 100,000$。
以分貝表示（功率係數為 10）：
$$\text{Gain (dB)} = 10 \log_{10}(100,000) = 10 \times 5 = 50\text{ dB}$$
（注意：電壓增益為 $20\log_{10}(100) = 40\text{ dB}$；電流增益為 $20\log_{10}(1000) = 60\text{ dB}$，功率增益剛好為兩者之平均值 $\frac{40+60}{2} = 50\text{ dB}$）。
:::

::: details 📝 題目 3：高頻極點滾降計算
**問題**：一低通放大器具有單一極點，3-dB 截止頻率為 $100\text{ kHz}$，直流增益為 $60\text{ dB}$。在頻率 $f = 10\text{ MHz}$ 處，其增益大小約為？

**答案與解析**：
高頻區滾降斜率為 $-20\text{ dB/decade}$。
頻率由 $100\text{ kHz} = 10^5\text{ Hz}$ 增加到 $10\text{ MHz} = 10^7\text{ Hz}$，跨越了 2 個數量級（2 Decades）：
$$\text{總衰減量} = 2 \times 20\text{ dB} = 40\text{ dB}$$
因此高頻增益約為：
$$60\text{ dB} - 40\text{ dB} = 20\text{ dB}$$
:::

---

## 七、 相關學習資源

- [0001: 建立訊號模型與四大放大器等效電路核心思維 (Learning Record)](/electronics/learning-records/0001-signals-and-amplifiers-foundations)
- [001: 放大器模型、增益計算與頻率響應速查手冊 (Reference Cheatsheet)](/electronics/reference/001-amplifier-models-and-frequency-response)
