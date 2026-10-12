# 0005: 積分器與微分器 (Integrators and Differentiators)

將電阻換成電容，或讓電阻與電容同時出現在運算放大器的輸入、回授路徑，閉迴路增益就會依頻率改變。這一節從一般阻抗形式出發，建立積分器與微分器的時間域、頻率域模型，並說明實際電路的直流與高頻限制。

## 2.5.1 一般阻抗的反相組態

![圖 2.22：輸入與回授路徑以一般阻抗表示的反相架構](/electronics/assets/images/chapter2/ch2-fig-2-22.svg)

圖解：把反相器的輸入電阻 $R_1$ 換成 $Z_1(s)$、回授電阻 $R_2$ 換成 $Z_2(s)$，理想運算放大器仍由虛地與 KCL 決定閉迴路傳遞函數。

對理想運算放大器，反相端為虛地且輸入電流為零，故

$$
\boxed{\frac{V_o(s)}{V_i(s)}=-\frac{Z_2(s)}{Z_1(s)}}.
\tag{2.24}
$$

對實際正弦穩態，只要令 $s=j\omega$，即可得到增益大小與相位。

### 低通 STC 範例

### 2. 例題：回授 $R_2\parallel C_2$

![圖 2.23：$R_2$ 與 $C_2$ 並聯的反相低通電路（例題 2.4）](/electronics/assets/images/chapter2/ch2-fig-2-23.svg)

圖解：$C_2$ 在高頻時旁路 $R_2$，使回授阻抗下降；在直流時電容開路，增益回到 $-R_2/R_1$。

取 $Z_1=R_1$、$Z_2=R_2\parallel 1/(sC_2)$。用導納 $Y_2=1/R_2+sC_2$ 較容易整理：

$$
\frac{V_o(s)}{V_i(s)}=-\frac{1}{R_1Y_2}
=-\frac{R_2/R_1}{1+sC_2R_2}.
$$

這是低通單時間常數 (STC) 形式，因此

$$
K=-\frac{R_2}{R_1},
\qquad
\omega_0=\frac{1}{C_2R_2},
\qquad
f_0=\frac{1}{2\pi C_2R_2}.
$$

若要求直流增益 $40\,\mathrm{dB}=100\,\mathrm{V/V}$、輸入電阻 $1\,\mathrm{k}\Omega$、$f_0=1\,\mathrm{kHz}$，選

$$
R_1=1\,\mathrm{k}\Omega,
\quad R_2=100\,\mathrm{k}\Omega,
\quad C_2=\frac{1}{2\pi(1\,\mathrm{kHz})(100\,\mathrm{k}\Omega)}=1.59\,\mathrm{nF}.
$$

增益每十倍頻率下降 $20\,\mathrm{dB}$；從 $100\,\mathrm{V/V}$ 下降至 $1\,\mathrm{V/V}$ 要兩個 decade，因此 unity-gain 頻率為 $100\,\mathrm{kHz}$。該頻率遠高於 $f_0$，低通極點約帶來 $-90^\circ$，加上反相的 $180^\circ$ 後，總相位可寫成 $-270^\circ$ 或等價的 $+90^\circ$。

## 2.5.2 反相積分器

### 3. 時間域推導

![圖 2.24：Miller（反相）積分器及其頻率響應](/electronics/assets/images/chapter2/ch2-fig-2-24.svg)

圖解：輸入電阻 $R$ 送入電流，回授電容 $C$ 累積電荷；輸出是輸入的負比例積分，Bode 幅度斜率為 $-20\,\mathrm{dB/decade}$。

輸入 $v_i(t)$ 作用於虛地，故流入電容的電流為 $i_1(t)=v_i(t)/R$。若 $t=0$ 時電容電壓為 $V_C$，則

$$
v_C(t)=V_C+\frac{1}{C}\int_0^t i_1(t')\,dt'
=V_C+\frac{1}{CR}\int_0^t v_i(t')\,dt'.
$$

因為 $v_o(t)=-v_C(t)$，

$$
\boxed{v_o(t)=-\frac{1}{CR}\int_0^t v_i(t')\,dt'-V_C}.
\tag{2.25}
$$

這裡 $CR$ 是積分時間常數，$V_C$ 是初始條件；負號表示反相積分器，也稱 Miller integrator。

### 4. 頻率域與 Bode 圖

令 $Z_1=R$、$Z_2=1/(sC)$，由式 (2.24)

$$
\boxed{\frac{V_o(s)}{V_i(s)}=-\frac{1}{sCR}},
\tag{2.26}
$$

在 $s=j\omega$ 時

$$
\frac{V_o(j\omega)}{V_i(j\omega)}=-\frac{1}{j\omega CR},
\qquad
\left|\frac{V_o}{V_i}\right|=\frac{1}{\omega CR},
\tag{2.27--2.28}
$$

相位為

$$
\phi=+90^\circ.
\tag{2.29}
$$

頻率加倍時幅度減半，因此斜率為 $-6\,\mathrm{dB/octave}$（等價於 $-20\,\mathrm{dB/decade}$）。令幅度為 1 的積分器頻率為

$$
\boxed{\omega_{\mathrm{int}}=\frac{1}{CR}}.
\tag{2.30}
$$

理想積分器在 $\omega=0$ 的增益趨近無限大，實際上代表直流沒有負回授，任何微小直流成分都會讓輸出朝正或負電源軌漂移並飽和。

### 5. 例題：電流源驅動積分器

![圖 2.25：以光檢測器等效電流源驅動的積分器（例題 2.5）](/electronics/assets/images/chapter2/ch2-fig-2-25.svg)

圖解：$10\,\mu\mathrm{A}$、$10\,\mathrm{kHz}$ 的正弦電流源與 $5\,\mathrm{k}\Omega$ 源電阻可換成峰值 $50\,\mathrm{mV}$ 的 Thevenin 電壓源。

要求輸出峰值 $200\,\mathrm{mV}$。由式 (2.28)，

$$
\frac{200\,\mathrm{mV}}{50\,\mathrm{mV}}
=\frac{1}{(2\pi)(10\,\mathrm{kHz})C(5\,\mathrm{k}\Omega)},
$$

得到

$$
C=0.8\,\mathrm{nF},
\qquad
\omega_{\mathrm{int}}=\frac{1}{(0.8\,\mathrm{nF})(5\,\mathrm{k}\Omega)}
=2\pi(40\,\mathrm{krad/s}),
$$

亦即 $f_{\mathrm{int}}=40\,\mathrm{kHz}$。

### 6. 實用積分器：並聯 $R_F$

![圖 2.26：$R_F$ 與 $C$ 並聯的實用 Miller 積分器](/electronics/assets/images/chapter2/ch2-fig-2-26.svg)

圖解：$R_F$ 在直流提供負回授，讓直流增益有限；代價是低頻不再是理想積分。

在 $C$ 旁並聯大電阻 $R_F$，可得到

$$
\boxed{\frac{V_o(s)}{V_i(s)}=-\frac{R_F/R}{1+sCR_F}}.
$$

直流增益為 $-R_F/R$，轉折角頻率為 $1/(CR_F)$。$R_F$ 越小，直流偏移越容易受控，但轉折頻率越高、可用的理想積分頻帶越窄；選擇 $R_F$ 是直流穩定與積分品質之間的取捨。

### 7. 例題：脈波輸入與飽和檢查

![圖 2.27：理想積分器與並聯 $R_F$ 時的脈波輸出](/electronics/assets/images/chapter2/ch2-fig-2-27.svg)

圖解：$1\,\mathrm{V}$、$1\,\mathrm{ms}$ 脈波使理想積分器輸出線性下降；加入 $R_F=1\,\mathrm{M}\Omega$ 後，輸出改成朝 $-100\,\mathrm{V}$ 的指數曲線。

給定 $R=10\,\mathrm{k}\Omega$、$C=10\,\mathrm{nF}$，$CR=0.1\,\mathrm{ms}$。理想積分器在脈波期間

$$
v_o(t)=-\frac{1}{CR}\int_0^t1\,dt'=-10t,
\qquad 0\le t\le1\,\mathrm{ms},
$$

所以 $v_o(1\,\mathrm{ms})=-10\,\mathrm{V}$，之後保持不變。若 $R_F=1\,\mathrm{M}\Omega$，則 $CR_F=10\,\mathrm{ms}$，脈波期間

$$
v_o(t)=-100\left(1-e^{-t/(10\,\mathrm{ms})}\right),
$$

因此 $v_o(1\,\mathrm{ms})=-9.5\,\mathrm{V}$。脈波結束後，電容透過 $R_F$ 以 $10\,\mathrm{ms}$ 時間常數放電回零；若運算放大器飽和於 $\pm13\,\mathrm{V}$，上述波形不會飽和。

## 2.5.3 運算放大器微分器

### 8. 時間域與頻率域

![圖 2.28：微分器及其頻率響應](/electronics/assets/images/chapter2/ch2-fig-2-28.svg)

圖解：把積分器的 $R$、$C$ 位置互換，輸入電容電流與 $dv_i/dt$ 成正比，再經回授電阻轉成輸出；幅度斜率為 $+20\,\mathrm{dB/decade}$。

虛地使電容兩端等效承受 $v_i(t)$，故

$$
i(t)=C\frac{dv_i(t)}{dt},
\qquad
\boxed{v_o(t)=-CR\frac{dv_i(t)}{dt}}.
\tag{2.31}
$$

傳遞函數為

$$
\boxed{\frac{V_o(s)}{V_i(s)}=-sCR},
\tag{2.32}
$$

而在 $s=j\omega$ 時

$$
\frac{V_o(j\omega)}{V_i(j\omega)}=-j\omega CR,
\qquad
\left|\frac{V_o}{V_i}\right|=\omega CR.
\tag{2.33}
$$

因此增益以 $+6\,\mathrm{dB/octave}$（$+20\,\mathrm{dB/decade}$）上升，理想高頻增益無限大。實際微分器會放大高頻雜訊且可能不穩定，通常在輸入電容串聯小電阻，以限制高頻增益。

## 9. 檢核點與常見錯誤

**檢核點：**對稱 $5\,\mathrm{V_{p-p}}$、週期 $2\,\mu\mathrm{s}$ 的方波送入理想積分器，若輸出也要 $5\,\mathrm{V_{p-p}}$ 三角波，所需 $CR=0.5\,\mu\mathrm{s}$。對 $CR=10^{-3}\,\mathrm{s}$、$R=10\,\mathrm{k}\Omega$ 的積分器，$C=0.1\,\mu\mathrm{F}$、unity-gain 角頻率為 $1000\,\mathrm{rad/s}$。

**常見錯誤：**

- 忘記反相負號：積分器是 $-1/(sCR)$，微分器是 $-sCR$。
- 把 $\omega$ 與 $f$ 混用；$\omega=2\pi f$，而 $1/(CR)$ 是角頻率。
- 以理想積分器處理含直流的長時間訊號，忽略沒有直流負回授而導致的飽和。
- 認為並聯 $R_F$ 只是在輸出端加一個保護元件；它同時改變低頻極點與可用積分頻帶。
- 忽略微分器的高頻雜訊與穩定性，直接把理想 $+20\,\mathrm{dB/decade}$ 延伸到無限高頻。

## 10. 本節摘要

- 理想反相阻抗電路滿足 $V_o/V_i=-Z_2/Z_1$。
- 回授電容產生積分器：$v_o(t)=-(1/CR)\int v_i(t)dt$，$|V_o/V_i|=1/(\omega CR)$。
- 輸入電容產生微分器：$v_o(t)=-CR\,dv_i/dt$，$|V_o/V_i|=\omega CR$。
- $R_F$ 可讓積分器在直流有有限增益；微分器則需串聯電阻抑制高頻雜訊與不穩定。
