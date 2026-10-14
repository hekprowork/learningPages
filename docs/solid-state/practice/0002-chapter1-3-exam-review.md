# 第 1–3 章考前概念總檢核

> 依本地 Streetman & Banerjee 教材 Chapter 1–3 整理。先遮住答案獨立作答；算式題務必回代原始關係式。教材原題請見[Chapter 1](/solid-state/practice/0001-textbook-problems)、[Chapter 2](/solid-state/practice/0003-chapter2-problems) 與 [Chapter 3](/solid-state/practice/0004-chapter3-problems) 題庫。

## A. 十個最容易失分的判斷

| 題目出現的說法 | 正確判斷與複習入口 |
| :--- | :--- |
| 「晶面間距小，面密度一定大」<br><span lang="en">Smaller interplanar spacing always means higher planar atomic density.</span> | 錯。面內原子數與面積須另外算；見[晶面](/solid-state/chapter1/0001-miller-indices)。 |
| 「矽晶胞只有 4 個原子，因為是 FCC」<br><span lang="en">A silicon unit cell contains only four atoms because it is fcc.</span> | 錯。FCC 傳統晶胞 4 個晶格點，鑽石結構有兩原子基底，共 8 個；見[晶胞](/solid-state/chapter1/0004-materials-and-lattices)。 |
| 「CVD 一定長出單晶磊晶」<br><span lang="en">CVD always produces single-crystal epitaxy.</span> | 錯。CVD 可產生單晶、多晶或非晶；見[磊晶](/solid-state/chapter1/0005-epitaxial-growth)。 |
| 「$E_F$ 在禁帶內，所以一定有電子位於該能量」<br><span lang="en">If $E_F$ lies in the band gap, an electron must occupy that energy.</span> | 錯。$f(E_F)=1/2$ 是若有量子態時的占據機率；見[費米分布](/solid-state/chapter3/0003-carrier-concentrations)。 |
| 「n 型材料整體帶負電」<br><span lang="en">An n-type material has a net negative charge.</span> | 錯。游離施體的正電與電子等共同符合電荷中性；見[摻雜](/solid-state/chapter3/0002-carriers-and-effective-mass)。 |
| 「有 $10^{16}$ 個施體就一定有 $10^{16}$ 個自由電子」<br><span lang="en">$10^{16}$ donors always yield $10^{16}$ free electrons.</span> | 只在適當溫度、近乎完全游離、補償與本質載子可忽略等條件下近似成立；見[濃度](/solid-state/chapter3/0003-carrier-concentrations)。 |
| 「電子沿 $-x$ 移動，所以電子電流沿 $-x$」<br><span lang="en">An electron moving along $-x$ produces electron current along $-x$.</span> | 錯。電子負電，傳統電流反向；見[漂移](/solid-state/chapter3/0004-drift-and-hall)。 |
| 「$J=\sigma\mathcal E$ 在任何電場都成立」<br><span lang="en">$J=\sigma\mathcal E$ holds at every electric field.</span> | 低場歐姆區才可用常數遷移率；高場可能速度飽和；見[高場](/solid-state/chapter3/0004-drift-and-hall)。 |
| 「熱平衡能帶圖的所有線都水平」<br><span lang="en">Every line in an equilibrium band diagram is horizontal.</span> | 錯。熱平衡時 $E_F$ 水平；帶邊可彎曲；見[平衡能階](/solid-state/chapter3/0005-equilibrium-fermi-level)。 |
| 「間接能隙材料完全不能放光」<br><span lang="en">Indirect-band-gap materials cannot emit light at all.</span> | 錯。間接躍遷需兼顧動量守恆，常需聲子協助，輻射效率通常較低；見[能隙](/solid-state/chapter3/0001-energy-bands)。 |

## B. 五道跨章計算

### 題 1：晶格幾何與密度

矽為鑽石結構，$a=5.43\,\text{\AA}$。求傳統立方晶胞原子數、體密度、$(111)$ 面密度，並與 $(110)$ 比較。只考慮本教材所用的理想未重構晶面。

**English:** Silicon has the diamond structure with $a=5.43\,\text{\AA}$. Find the number of atoms in a conventional cubic cell, the volume density, and the $(111)$ planar density; compare the latter with the $(110)$ planar density. Use the ideal unreconstructed surfaces described in this textbook.

::: details 解答與回代
傳統晶胞有 $8$ 個原子。$a=5.43\times10^{-8}\ \mathrm{cm}$，所以

$$N_V=\frac8{a^3}=5.00\times10^{22}\ \mathrm{cm}^{-3}.$$

$(111)$ 截面等效有 2 個原子、面積為 $\sqrt3 a^2/2$，故

$$N_{A,111}=\frac4{\sqrt3a^2}=7.83\times10^{14}\ \mathrm{cm}^{-2}.$$

$(110)$ 為 $4/(\sqrt2a^2)=9.59\times10^{14}\ \mathrm{cm}^{-2}$，較大。回代檢查：$N_{A,111}(\sqrt3a^2/2)=2$ 個原子。
:::

### 題 2：光子與能隙

某**直接能隙**材料 $E_g=1.55\ \mathrm{eV}$，若電子在導帶底與價帶頂間輻射復合，忽略其他能量損失，估計光子波長。取 $hc\approx1240\ \mathrm{eV\,nm}$。

**English:** A direct-band-gap material has $E_g=1.55\ \mathrm{eV}$. Estimate the photon wavelength from radiative recombination between the conduction-band minimum and valence-band maximum, neglecting other energy losses. Use $hc\approx1240\ \mathrm{eV\,nm}$.

::: details 解答與回代
$\lambda=hc/E_g=1240/1.55=800\ \mathrm{nm}$。回代 $hc/\lambda=1240/800=1.55\ \mathrm{eV}$。這是題設的理想帶邊躍遷；實際光譜還受溫度、材料及復合機制影響。
:::

### 題 3：補償摻雜

同溫熱平衡、非簡併、完全游離時，$N_D=5\times10^{15}$、$N_A=1\times10^{15}$、$n_i=10^{10}\ \mathrm{cm}^{-3}$。估算 $n_0,p_0$。

**English:** At one temperature, assume thermal equilibrium, nondegenerate statistics, and complete ionization. Given $N_D=5\times10^{15}$, $N_A=1\times10^{15}$, and $n_i=10^{10}\ \mathrm{cm}^{-3}$, estimate $n_0$ and $p_0$.

::: details 解答與回代
淨施體 $D=N_D-N_A=4\times10^{15}\ \mathrm{cm}^{-3}\gg n_i$，故 $n_0\approx4\times10^{15}\ \mathrm{cm}^{-3}$，$p_0=n_i^2/n_0=2.5\times10^4\ \mathrm{cm}^{-3}$。回代：$n_0p_0=10^{20}\ \mathrm{cm}^{-6}$。電荷中性式的近似殘差為少數載子量級；精確零殘差須用[二次方程正根](/solid-state/chapter3/0003-carrier-concentrations)。
:::

### 題 4：漂移電流

均勻 n 型材料，$n_0=2.0\times10^{16}\ \mathrm{cm}^{-3}$、$\mu_n=800\ \mathrm{cm^2/(V\,s)}$，電洞電流可忽略。樣品 $L=0.20\ \mathrm{cm}$、$A=0.010\ \mathrm{cm^2}$，兩端施加 $0.50\ \mathrm V$，並假設仍在低場區。求 $\sigma,R,I$，取 $q=1.60\times10^{-19}\ \mathrm C$。

**English:** A uniform n-type sample has $n_0=2.0\times10^{16}\ \mathrm{cm}^{-3}$ and $\mu_n=800\ \mathrm{cm^2/(V\,s)}$; neglect hole current. Its length is $L=0.20\ \mathrm{cm}$, area is $A=0.010\ \mathrm{cm^2}$, and applied voltage is $0.50\ \mathrm V$. Assuming low-field operation, find $\sigma$, $R$, and $I$. Use $q=1.60\times10^{-19}\ \mathrm C$.

::: details 解答與兩路回代
$$\sigma=qn_0\mu_n=(1.60\times10^{-19})(2.0\times10^{16})(800)=2.56\ (\Omega\cdot\mathrm{cm})^{-1}.$$

$R=L/(\sigma A)=0.20/(2.56\times0.010)=7.8125\ \Omega$，$I=V/R=0.064\ \mathrm A$。另算 $\mathcal E=V/L=2.5\ \mathrm{V/cm}$、$J=\sigma\mathcal E=6.4\ \mathrm{A/cm^2}$、$I=JA=0.064\ \mathrm A$，兩路一致。
:::

### 題 5：霍爾電壓與載子型別

假設單一電子載子主導，$n=10^{22}\ \mathrm{m}^{-3}$、$I=0.010\ \mathrm A$、$B=0.50\ \mathrm T$、樣品沿磁場方向厚度 $t=1.0\ \mathrm{mm}$，取 $q=1.60\times10^{-19}\ \mathrm C$。求霍爾係數的符號與電壓大小。

**English:** Assume conduction is dominated by electrons, with $n=10^{22}\ \mathrm{m}^{-3}$, $I=0.010\ \mathrm A$, $B=0.50\ \mathrm T$, and sample thickness along the magnetic field of $t=1.0\ \mathrm{mm}$. Using $q=1.60\times10^{-19}\ \mathrm C$, determine the sign of the Hall coefficient and the magnitude of the Hall voltage.

::: details 解答與單位檢查
$R_H=-1/(qn)=-6.25\times10^{-4}\ \mathrm{m^3/C}$，負號表明電子主導。$t=10^{-3}\ \mathrm m$，所以

$$|V_H|=\frac{|R_H|IB}{t}
=\frac{(6.25\times10^{-4})(0.010)(0.50)}{10^{-3}}
=3.125\times10^{-3}\ \mathrm V.$$

回代 $|V_H|t/(IB)=6.25\times10^{-4}\ \mathrm{m^3/C}=|R_H|$。電壓哪一端為正，還需題目給出磁場、電流與端子方向。
:::

## C. 如果還不穩，依這個順序補

先複習[晶格與晶胞](/solid-state/chapter1/0004-materials-and-lattices)和[第 2 章量子工具](/solid-state/chapter2/)，再讀[第 3 章能帶](/solid-state/chapter3/0001-energy-bands) → [載子](/solid-state/chapter3/0002-carriers-and-effective-mass) → [濃度](/solid-state/chapter3/0003-carrier-concentrations) → [漂移](/solid-state/chapter3/0004-drift-and-hall)。每節的「自我檢核」答不出來時，回到公式的**物理假設**，不要先背答案。
