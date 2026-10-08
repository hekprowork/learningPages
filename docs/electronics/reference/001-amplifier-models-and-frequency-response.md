# 001: 放大器模型、增益計算與頻率響應速查手冊 (Amplifier Models Cheatsheet)

> 彙整電子學第 1 章核心公式、四種受控源等效電路、分貝換算與單時間常數 (STC) 電路特性

## 一、 四大基本放大器模型比較 (The Four Amplifier Types)

| 放大器類型 (Type) | 輸入/輸出訊號 | 開路/短路增益定義 | 理想輸入電阻 $R_i$ | 理想輸出電阻 $R_o$ | 等效受控源形式 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **電壓放大器 (Voltage Amp)** | 輸入 $v_i$ / 輸出 $v_o$ | $A_{vo} = \left.\frac{v_o}{v_i}\right\vert_{i_o=0}$ (V/V) | $R_i = \infty$ | $R_o = 0$ | 壓控電壓源 (VCVS): $A_{vo} v_i$ |
| **電流放大器 (Current Amp)** | 輸入 $i_i$ / 輸出 $i_o$ | $A_{is} = \left.\frac{i_o}{i_i}\right\vert_{v_o=0}$ (A/A) | $R_i = 0$ | $R_o = \infty$ | 流控電流源 (CCCS): $A_{is} i_i$ |
| **轉導放大器 (Transconductance)** | 輸入 $v_i$ / 輸出 $i_o$ | $G_m = \left.\frac{i_o}{v_i}\right\vert_{v_o=0}$ (A/V 或 S) | $R_i = \infty$ | $R_o = \infty$ | 壓控電流源 (VCCS): $G_m v_i$ |
| **轉阻放大器 (Transresistance)** | 輸入 $i_i$ / 輸出 $v_o$ | $R_m = \left.\frac{v_o}{i_i}\right\vert_{i_o=0}$ (V/A 或 $\Omega$) | $R_i = 0$ | $R_o = 0$ | 流控電壓源 (CCVS): $R_m i_i$ |

::: tip 參數等效互換關係式
$$A_{vo} = G_m R_o = \frac{R_m}{R_i} = A_{is} \frac{R_o}{R_i}$$
:::

---

## 二、 負載效應與總體增益計算 (Loading Effects & Overall Gain)

### 電壓放大器標準計算公式
- **源端分壓比**：
  $$v_i = v_s \left( \frac{R_i}{R_s + R_i} \right)$$
- **負載分壓比**：
  $$v_o = A_{vo} v_i \left( \frac{R_L}{R_o + R_L} \right)$$
- **總體電壓增益**：
  $$G_v \equiv \frac{v_o}{v_s} = \left( \frac{R_i}{R_s + R_i} \right) A_{vo} \left( \frac{R_L}{R_o + R_L} \right)$$

### 多級串接放大器 (Cascaded Amplifiers)
當 $n$ 個放大級串接時，每一級的輸入電阻即為前一級的負載電阻（$R_{L,k} = R_{i,k+1}$）：
$$A_v = \frac{v_o}{v_{i1}} = A_{v1} \cdot A_{v2} \cdots A_{vn}$$
$$A_p = \frac{P_L}{P_I} = A_v \cdot A_i = A_v^2 \left( \frac{R_{i1}}{R_L} \right)$$

---

## 三、 分貝 (dB) 換算與直流電源功率守恆

| 物理量 | 線性比例 (Linear Ratio) | 分貝表示法 (Decibels) | 常用記憶倍率 |
| :--- | :--- | :--- | :--- |
| **電壓增益 (Voltage Gain)** | $A_v = v_o / v_i$ | $\text{Gain (dB)} = 20 \log_{10} \vert A_v\vert$ | $6\text{ dB} \approx 2\times$；$20\text{ dB} = 10\times$；$40\text{ dB} = 100\times$ |
| **電流增益 (Current Gain)** | $A_i = i_o / i_i$ | $\text{Gain (dB)} = 20 \log_{10} \vert A_i\vert$ | 同電壓增益以 $20\log$ 計算 |
| **功率增益 (Power Gain)** | $A_p = P_L / P_i$ | $\text{Gain (dB)} = 10 \log_{10} A_p$ | $3\text{ dB} \approx 2\times$；$10\text{ dB} = 10\times$；$20\text{ dB} = 100\times$ |

### 直流供電功率平衡方程式
$$P_{DC} = V_{CC} I_{CC} + V_{EE} I_{EE}$$
$$P_{DC} + P_i = P_L + P_{\text{dissipated}} \implies P_{DC} \approx P_L + P_{\text{dissipated}} \quad (\text{因 } P_i \ll P_L)$$
$$\text{放大器效率 } \eta = \frac{P_L}{P_{DC}} \times 100\%$$

---

## 四、 單時間常數 (STC) 網路頻率響應速查

| 特性項目 | 低通網路 (Low-Pass, LP) | 高通網路 (High-Pass, HP) |
| :--- | :--- | :--- |
| **轉移函數 $T(s)$** | $T(s) = \frac{K}{1 + s/\omega_0}$ | $T(s) = \frac{K}{1 + \omega_0/s}$ |
| **頻率響應 $T(j\omega)$** | $T(j\omega) = \frac{K}{1 + j(\omega/\omega_0)}$ | $T(j\omega) = \frac{K}{1 - j(\omega_0/\omega)}$ |
| **3-dB 截止頻率 $\omega_0$** | $\omega_0 = \frac{1}{\tau} = \frac{1}{RC} \quad (f_0 = \frac{1}{2\pi RC})$ | $\omega_0 = \frac{1}{\tau} = \frac{1}{RC} \quad (f_0 = \frac{1}{2\pi RC})$ |
| **在 $\omega = \omega_0$ 處振幅** | $\vert T(j\omega_0)\vert = \frac{\vert K\vert}{\sqrt{2}} = \vert K\vert - 3\text{ dB}$ | $\vert T(j\omega_0)\vert = \frac{\vert K\vert}{\sqrt{2}} = \vert K\vert - 3\text{ dB}$ |
| **在 $\omega = \omega_0$ 處相位** | $\angle T(j\omega_0) = -45^\circ$ | $\angle T(j\omega_0) = +45^\circ$ |
| **波德圖漸近線斜率** | 高頻區 ($\omega \gg \omega_0$)：$-20\text{ dB/decade}$ ($-6\text{ dB/octave}$) | 低頻區 ($\omega \ll \omega_0$)：$+20\text{ dB/decade}$ ($+6\text{ dB/octave}$) |

---

## 五、 Sedra & Smith 符號與命名慣例 (Symbol Conventions)

| 物理意義 | 字母與下標格式 | 範例 | 說明 |
| :--- | :--- | :--- | :--- |
| **總瞬時量 (Total Instantaneous)** | 小寫字母 + 大寫下標 | $v_A(t), i_C(t)$ | 包含直流與交流訊號：$v_A = V_A + v_a$ |
| **直流靜態值 (DC Component)** | 大寫字母 + 大寫下標 | $V_A, I_C, V_{CC}$ | 工作點 (Q-point) 偏壓值 |
| **交流小訊號量 (AC Signal)** | 小寫字母 + 小寫下標 | $v_a(t), i_c(t)$ | 微小擾動量 |
| **相量振幅 (Phasor Amplitude)** | 大寫字母 + 小寫下標 | $V_a, I_c$ | 弦波相量振幅 |
