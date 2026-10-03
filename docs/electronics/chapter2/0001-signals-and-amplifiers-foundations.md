# 0001: 建立訊號模型與四大放大器等效電路核心思維

> 深入探討戴維寧/諾頓訊號源、二埠阻抗匹配極限、多級放大器負載效應推導與工作點物理意涵

## 🎯 學習紀錄核心重點

Chapter 1 奠定了電子學全書的基石：訊號並非抽象電壓，而是由「訊號源電壓/電流」與「內阻 $R_s$」組成的戴維寧/諾頓實體。放大器的四種組態（電壓、電流、轉導、轉阻）在本質上是由「輸入受控源」與「輸出負載」的阻抗比所決定的。

---

## 一、 戴維寧與諾頓等效模型之物理實體

真實世界轉換器（Transducer）皆有其物理限制：
- **電壓訊號源（低阻抗）**：
  $$v_s(t) = \text{開路端電壓}, \quad R_s = \text{內部化學/導線阻抗}$$
  當外接負載 $R_L$ 時，根據分壓原理：
  $$v_i = v_s \frac{R_i}{R_s + R_i}$$
  若 $R_i \to \infty$，則 $v_i \to v_s$，此為電壓放大的理想邊界。
- **電流訊號源（高阻抗）**：
  $$i_s(t) = \text{短路端電流}, \quad R_s = \text{內部高阻抗}$$
  當外接負載 $R_L$ 時，根據分流原理：
  $$i_i = i_s \frac{R_s}{R_s + R_i}$$
  若 $R_i \to 0$，則 $i_i \to i_s$，此為電流放大的理想邊界。

---

## 二、 四大放大器組態的二埠網路分類論證

| 組態名稱 | 輸入量 | 輸出量 | 轉移參數 | 理想阻抗推論 |
| :--- | :--- | :--- | :--- | :--- |
| **電壓放大器** | 電壓 $v_i$ | 電壓 $v_o$ | $A_{vo} = v_o/v_i$ | $R_i = \infty$ (不抽訊號源電流)<br>$R_o = 0$ (負載不分走電壓) |
| **電流放大器** | 電流 $i_i$ | 電流 $i_o$ | $A_{is} = i_o/i_i$ | $R_i = 0$ (完全吸收源電流)<br>$R_o = \infty$ (輸出為理想電流源) |
| **轉導放大器** | 電壓 $v_i$ | 電流 $i_o$ | $G_m = i_o/v_i$ | $R_i = \infty$<br>$R_o = \infty$ (MOSFET 小訊號核心) |
| **轉阻放大器** | 電流 $i_i$ | 電流 $v_o$ | $R_m = v_o/i_i$ | $R_i = 0$<br>$R_o = 0$ (光感測 TIA 核心) |

### 阻抗邊界的物理洞察
1. **MOSFET 與 BJT 的微觀投影**：
   - 絕緣閘極場效電晶體（MOSFET）本質即為轉導元件：閘極絕緣（$R_{in} \approx \infty$），汲極輸出受控電流（$i_d = g_m v_{gs}$，高輸出阻抗）。
2. **跨阻放大器 (TIA) 的工程價值**：
   - 光纖通訊中，PIN 光電二極體產生微弱電流訊號（$\mu\text{A}$ 級），需透過 $R_i \approx 0$ 的轉阻放大器轉換為標準邏輯電壓。

---

## 三、 多級級聯放大器的負載效應演算法

在分析多級放大器時，切忌「直接將各級開路增益相乘」：

$$G_v \neq \frac{v_i}{v_s} \times A_{vo1} \times A_{vo2} \times \dots$$

**正確標準解題路徑（由後往前求負載，由前往後求增益）**：
1. **標定每級之有效負載**：
   - 最後一級之負載為外部負載：$R_{L,n} = R_L$。
   - 第 $k$ 級之負載為第 $k+1$ 級之輸入阻抗：$R_{L,k} = R_{i,k+1}$。
2. **計算各級實際增益**：
   $$A_{v,k} = A_{vo,k} \left(\frac{R_{L,k}}{R_{o,k} + R_{L,k}}\right)$$
3. **計算源端分壓比**：
   $$\frac{v_{i1}}{v_s} = \frac{R_{i1}}{R_s + R_{i1}}$$
4. **連乘總體電壓增益**：
   $$G_v = \frac{v_{i1}}{v_s} \cdot \prod_{k=1}^n A_{v,k}$$

---

## 四、 單時間常數 (STC) 網路與波德圖漸近線推導

低通 STC 網路轉移函數：

$$T(s) = \frac{K}{1 + s/\omega_0} \implies T(j\omega) = \frac{K}{1 + j(\omega/\omega_0)}$$

振幅響應與分貝形式：

$$|T(j\omega)| = \frac{|K|}{\sqrt{1 + (\omega/\omega_0)^2}}$$
$$20\log_{10}|T(j\omega)| = 20\log_{10}|K| - 10\log_{10}\left[1 + \left(\frac{\omega}{\omega_0}\right)^2\right]$$

### 漸近線分析 (Asymptotic Behavior)
- **低頻極限 ($\omega \ll \omega_0$)**：
  $$1 + (\omega/\omega_0)^2 \approx 1 \implies 20\log|T| \approx 20\log|K| \quad (\text{水平平坦區})$$
- **截止頻率處 ($\omega = \omega_0$)**：
  $$|T(j\omega_0)| = \frac{|K|}{\sqrt{2}} \implies 20\log|T| = 20\log|K| - 3.01\text{ dB} \quad (\text{3-dB 轉折點})$$
- **高頻極限 ($\omega \gg \omega_0$)**：
  $$1 + (\omega/\omega_0)^2 \approx (\omega/\omega_0)^2 \implies 20\log|T| \approx 20\log|K| - 20\log\left(\frac{\omega}{\omega_0}\right)$$
  當頻率增加 10 倍（$\omega \to 10\omega$），增益下降 $20\text{ dB}$，此即 $-20\text{ dB/decade}$ 漸近線。

---

## 💡 對後續章節之啟示 (Implications)

- **Chapter 2 (Op-Amp)**：理想運算放大器即為 $A_{vo} \to \infty, R_i \to \infty, R_o \to 0$ 的極限電壓放大器，其虛擬短路（Virtual Short）特性由此衍生。
- **Chapter 4 (BJT) & Chapter 5 (MOSFET)**：高頻小訊號模型中，$C_\pi, C_\mu$（或 $C_{gs}, C_{gd}$）將形成極點，可用 STC 網路或開路時間常數法（OCTC）快速估算 $-3\text{ dB}$ 上限頻率 $f_H$。
