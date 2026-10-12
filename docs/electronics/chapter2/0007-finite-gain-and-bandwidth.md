# 2.7 有限開路增益與頻寬對電路性能的影響

本節把「理想運算放大器的無限增益」改成更接近實際元件的單極點模型，並追蹤有限開路增益與有限頻寬如何改變閉迴路增益。核心結論是：閉迴路增益越高，可用頻寬越窄；對內部補償的單極點運算放大器，增益與頻寬的乘積在主要滾降區近似固定。

## 學習目標

- 由 $A_0$ 與 $\omega_b$ 建立運算放大器的單時間常數（STC）開路增益模型。
- 由單極點模型推導單位增益角頻率 $\omega_t$ 與增益頻寬積 $f_t$。
- 推導反相與同相閉迴路放大器的 3-dB 頻率，並解讀增益–頻寬取捨。
- 能區分反相放大器的「訊號增益」與決定頻寬的「雜訊增益」$1+R_2/R_1$。

## 2.7.1 開路增益的頻率依賴性

運算放大器的差模開路增益記為 $A(s)$。它在直流附近雖很大，卻不是無限大，而且會隨頻率增加而下降。內部補償通常在晶片內加入一個主導電容，使增益呈單一時間常數低通響應。這種頻率補償的目的，是讓含負回授的電路保持穩定，而非在高頻振盪。

![典型內部補償運算放大器的開路增益波德圖，顯示 $A_0$、$\omega_b$ 與 $\omega_t$ 的關係](/electronics/assets/images/chapter2/ch2-fig-2-40.svg)

*圖 2.40　典型一般用途、內部補償運算放大器的開路增益；低於 $\omega_b$ 時增益近似平坦，高於 $\omega_b$ 後以 $-20\ \mathrm{dB/decade}$ 滾降。*

### 單極點（STC）模型

令 $A_0$ 為直流開路增益、$\omega_b$ 為開路增益下降 3 dB 的轉折角頻率（break/corner frequency），則

$$
A(s)=\frac{A_0}{1+s/\omega_b}.
\tag{2.40}
$$

置 $s=j\omega$ 得

$$
A(j\omega)=\frac{A_0}{1+j\omega/\omega_b},
\qquad
\left|A(j\omega)\right|=\frac{A_0}{\sqrt{1+(\omega/\omega_b)^2}}.
\tag{2.41}
$$

在 $\omega\gg\omega_b$ 的滾降區，分母可用 $j\omega/\omega_b$ 近似，因此

$$
A(j\omega)\simeq\frac{A_0\omega_b}{j\omega},
\qquad
\left|A(j\omega)\right|\simeq\frac{A_0\omega_b}{\omega}.
\tag{2.42–2.43}
$$

這代表頻率加倍，增益約減半（$-6\ \mathrm{dB/octave}$）；頻率增加十倍，增益約減為十分之一（$-20\ \mathrm{dB/decade}$）。因此，這個模型又稱 single-pole model，$\omega_b$ 所對應的極點則稱 dominant pole。

### 單位增益頻率與增益頻寬積

令開路增益的大小降到 1（0 dB）時的角頻率為 $\omega_t$。由上式直接得到

$$
\omega_t=A_0\omega_b.
\tag{2.44}
$$

在高於轉折頻率的範圍，開路增益可寫成

$$
A(j\omega)\simeq\frac{\omega_t}{j\omega},
\qquad
A(s)\simeq\frac{\omega_t}{s},
\tag{2.45–2.46}
$$

故若用週率 $f=\omega/(2\pi)$ 表示，單位增益頻寬（unity-gain bandwidth）為

$$
f_t=\frac{\omega_t}{2\pi},
\qquad
\left|A(j\omega)\right|\simeq\frac{\omega_t}{\omega}=\frac{f_t}{f}.
\tag{2.47}
$$

對 STC 運算放大器，還可寫成

$$
f_t=A_0f_b,
\qquad f_b=\frac{\omega_b}{2\pi}.
$$

這個 $f_t$ 也常稱 gain-bandwidth product（GBW）。嚴格來說，只有在單極點／STC 響應時，資料表的 unity-gain frequency 與 GBW 才可視為相同；多極點放大器不一定成立。

::: tip 符號與量綱
- $A_0$：直流開路電壓增益，單位 V/V（無量綱）。
- $\omega_b$、$f_b$：開路增益的 3-dB 轉折角頻率與頻率。
- $\omega_t$、$f_t$：開路增益為 1 的單位增益角頻率與頻率。
- $s$：拉氏變數；穩態正弦分析時 $s=j\omega$。
:::

::: warning 物理直覺檢查
若題目給的是 $A_0=10^5$、$f_b=10\ \mathrm{Hz}$，則 $f_t=A_0f_b=1\ \mathrm{MHz}$。在 $f=100\ \mathrm{kHz}$（遠高於 $f_b$）時，開路增益應約為 $f_t/f=10$，而非仍保持 $10^5$。
:::

## 2.7.2 閉迴路放大器的頻率響應

以下推導假設運算放大器符合單極點模型，且 $A_0$ 足夠大，使 $A_0\gg 1+R_2/R_1$。若只需直流附近的精確增益，則保留有限 $A$ 的式子；若需要頻率響應，則代入 $A(s)$。

### 反相放大器

對阻值 $R_1$（輸入電阻）與 $R_2$（回授電阻）的反相組態，有限開路增益下的精確閉迴路增益為

$$
\frac{V_o}{V_i}
=-\frac{R_2/R_1}{1+\left(1+R_2/R_1\right)/A}.
\tag{2.48}
$$

將 $A(s)=A_0/(1+s/\omega_b)$ 與 $\omega_t=A_0\omega_b$ 代入，可整理成

$$
\frac{V_o(s)}{V_i(s)}
=\frac{-R_2/R_1}
{1+\dfrac{1+R_2/R_1}{A_0}
 +\dfrac{s}{\omega_t/(1+R_2/R_1)}}.
\tag{2.49}
$$

在 $A_0\gg1+R_2/R_1$ 時，直流誤差項可忽略，得到 STC 低通形式

$$
\frac{V_o(s)}{V_i(s)}
\simeq
\frac{-R_2/R_1}
{1+s/\left[\omega_t/(1+R_2/R_1)\right]}.
\tag{2.50}
$$

因此

$$
\omega_{3\mathrm{dB}}=\frac{\omega_t}{1+R_2/R_1},
\qquad
f_{3\mathrm{dB}}=\frac{f_t}{1+R_2/R_1}.
\tag{2.51}
$$
$$
|G_{\mathrm{CL}}(0)|\,f_{3\mathrm{dB}}
\simeq\frac{R_2}{R_1}\frac{f_t}{1+R_2/R_1}.
$$

注意：反相放大器的頻寬分母是 $1+R_2/R_1$，不是訊號增益大小 $R_2/R_1$。這個分母就是反相組態的雜訊增益（noise gain）。

### 同相放大器

同相組態的有限增益精確式為

$$
\frac{V_o}{V_i}
=\frac{1+R_2/R_1}
{1+(1+R_2/R_1)/A}.
\tag{2.52}
$$

相同近似下，代入單極點模型得到

$$
\frac{V_o(s)}{V_i(s)}
\simeq
\frac{1+R_2/R_1}
{1+s/\left[\omega_t/(1+R_2/R_1)\right]}.
\tag{2.53}
$$

故同相放大器的直流閉迴路增益為 $1+R_2/R_1$，而 3-dB 頻率仍由式（2.51）給出。對同相組態，$G_{\mathrm{CL}}=1+R_2/R_1$ 恰好等於雜訊增益，因此

$$
G_{\mathrm{CL}}f_{3\mathrm{dB}}\simeq f_t.
$$

### Example 2.7：$f_t=1\ \mathrm{MHz}$ 的頻寬分配

對同一顆內部補償運算放大器，將各組態的 $1+R_2/R_1$ 代入式（2.51），得到下表。反相增益的符號只代表相位反轉；頻寬計算使用 $R_2/R_1=|G|$。

| 標稱閉迴路增益 | $R_2/R_1$ | $f_{3\mathrm{dB}}=f_t/(1+R_2/R_1)$ |
| ---: | ---: | ---: |
| $+1000$ | $999$ | $1\ \mathrm{kHz}$ |
| $+100$ | $99$ | $10\ \mathrm{kHz}$ |
| $+10$ | $9$ | $100\ \mathrm{kHz}$ |
| $+1$（電壓隨耦器） | $0$ | $1\ \mathrm{MHz}$ |
| $-1$ | $1$ | $0.5\ \mathrm{MHz}$ |
| $-10$ | $10$ | $90.9\ \mathrm{kHz}$ |
| $-100$ | $100$ | $9.9\ \mathrm{kHz}$ |
| $-1000$ | $1000$ | 約 $1\ \mathrm{kHz}$ |

![標稱增益 $+10\ \mathrm{V/V}$ 放大器的閉迴路頻率響應](/electronics/assets/images/chapter2/ch2-fig-2-41.svg)

*圖 2.41　$+10\ \mathrm{V/V}$ 閉迴路放大器：低頻增益為 20 dB，約在 $100\ \mathrm{kHz}$ 開始以 $-20\ \mathrm{dB/decade}$ 滾降。*

![標稱增益 $-10\ \mathrm{V/V}$ 放大器的閉迴路頻率響應](/electronics/assets/images/chapter2/ch2-fig-2-42.svg)

*圖 2.42　$-10\ \mathrm{V/V}$ 閉迴路放大器：低頻增益同為 20 dB，但 3-dB 頻率為 $f_t/(1+10)=90.9\ \mathrm{kHz}$。*

表格呈現兩個重要觀察：

1. 同相組態的增益–頻寬積近似固定為 $f_t$。
2. 單位增益反相器的頻寬是 $f_t/2$，而單位增益同相隨耦器的頻寬是 $f_t$；兩者訊號增益大小雖皆為 1，雜訊增益卻分別是 2 與 1。

### 小型檢核：從資料表反推頻率參數

若 $A_0=10^6$，且量得 $10\ \mathrm{kHz}$ 時開路增益為 $40\ \mathrm{dB}=100\ \mathrm{V/V}$，則在單極點滾降區

$$
f_t=|A|f=(100)(10\ \mathrm{kHz})=1\ \mathrm{MHz},
\qquad
f_b=\frac{f_t}{A_0}=1\ \mathrm{Hz}.
$$

在 $1\ \mathrm{kHz}$ 時，$|A|\simeq f_t/f=1000$，即 $60\ \mathrm{dB}$。若以 $f_t=2\ \mathrm{MHz}$ 的運算放大器做同相增益 100，則 $f_{3\mathrm{dB}}\simeq2\ \mathrm{MHz}/100=20\ \mathrm{kHz}$。

## 常見錯誤與除錯清單

- 把 $A_0$ 當成所有頻率都不變的增益；在 $f\gg f_b$ 必須使用 $|A|\simeq f_t/f$。
- 把 $f_t$ 與 $f_b$ 混用；$f_b$ 是開路增益的轉折頻率，$f_t$ 是增益降到 1 的頻率。
- 反相放大器直接寫 $f_{3\mathrm{dB}}=f_t/|G|$；正確分母是 $1+|G|$，因為頻寬由雜訊增益決定。
- 將 $-20\ \mathrm{dB/decade}$ 誤寫成 $-20\ \mathrm{dB/octave}$；後者應為約 $-6\ \mathrm{dB/octave}$。
- 看到低頻閉迴路增益與理想式相同，就忽略有限 $A_0$ 的直流誤差；精密增益分析應先用式（2.48）或（2.52）估算。
- 把有限頻寬造成的線性幅相變化，誤稱為壓擺率造成的非線性失真；壓擺率屬於下一節的大訊號限制。

## 本節摘要

- 內部補償運算放大器可用 $A(s)=A_0/(1+s/\omega_b)$ 描述；在高頻滾降區，$A(s)\simeq\omega_t/s$。
- $\omega_t=A_0\omega_b$，$f_t=A_0f_b$，且 $|A|\simeq f_t/f$。
- 反相與同相閉迴路響應都近似 STC 低通，且共同的 3-dB 頻率為
  $$
  f_{3\mathrm{dB}}=\frac{f_t}{1+R_2/R_1}.
  $$
- 同相增益的訊號增益等於雜訊增益；反相增益則比雜訊增益少 1，因此同樣的 $|G|$ 下反相頻寬略窄。
- 降低閉迴路增益可以換取較寬頻寬；這是實際運算放大器設計的基本增益–頻寬取捨。

下一節將處理頻寬模型以外的大訊號限制：輸出電壓飽和、輸出電流極限與壓擺率。
