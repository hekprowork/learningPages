# 0007：一維無限深位能井

> 教材對照：Chapter 2 §2.4.3 Potential Well Problem（PDF 閱讀頁 66–69）

## 學習目標

- 由邊界條件推導位能井的允許波函數；
- 計算離散能階與躍遷能量；
- 解釋零點能、節點與侷限效應。

## 1. 模型設定

考慮寬度為 $L$ 的一維盒子：

$$
V(x)=
\begin{cases}
0, & 0<x<L \\
\infty, & x\leq0\ \text{或}\ x\geq L
\end{cases}
$$

粒子不可能存在於無限高位能區，因此

$$
\psi(0)=\psi(L)=0
$$

## 2. 井內的波動方程式

在井內 $V=0$：

$$
\frac{d^2\psi}{dx^2}+k^2\psi=0,
\qquad
k^2=\frac{2mE}{\hbar^2}
$$

一般解為

$$
\psi(x)=A\sin(kx)+B\cos(kx)
$$

$\psi(0)=0$ 使 $B=0$；$\psi(L)=0$ 則要求

$$
\sin(kL)=0
\quad\Rightarrow\quad
kL=n\pi
$$

其中 $n=1,2,3,\ldots$。

## 3. 本徵函數與能階

正規化後的波函數是

$$
\psi_n(x)=\sqrt{\frac{2}{L}}\sin\left(\frac{n\pi x}{L}\right)
$$

允許能量為

$$
E_n=\frac{n^2\pi^2\hbar^2}{2mL^2}
$$

這個結果揭示三件事：

- $n=0$ 只會得到處處為零的無效波函數，因此量子數從 1 開始；
- 基態能量 $E_1$ 不為零，稱為零點能；
- 能量與 $n^2$ 成正比、與 $L^2$ 成反比，侷限愈強，能階間距愈大。

## 4. 節點與機率分布

$\psi_n$ 在井內有 $n-1$ 個節點。節點處 $\lvert\psi_n\rvert^2=0$，因此找不到粒子。基態在中央的機率密度最大；高能態則有更多振盪。

注意：粒子不是沿正弦曲線移動。曲線表示機率振幅，而不是空間中的軌跡。

## 5. 例題：$1\ \mathrm{nm}$ 寬的電子井

令 $L=1.0\ \mathrm{nm}$，可得

$$
E_1\approx0.376\ \mathrm{eV}
$$

因此

$$
E_2=4E_1\approx1.50\ \mathrm{eV}
$$

從基態躍遷至第一激發態所需能量為

$$
\Delta E=E_2-E_1=3E_1\approx1.13\ \mathrm{eV}
$$

奈米尺度下，能階差可達電子伏特等級，這正是量子井與低維半導體元件的重要基礎。

## 自我檢核

1. 為什麼無限深位能井不存在 $n=0$ 狀態？
2. 若井寬縮小為一半，$E_1$ 變為幾倍？
3. $n=4$ 的井內波函數有幾個節點？

上一頁：[0006：薛丁格波動方程式](/solid-state/chapter2/0006-schrodinger-equation)｜下一頁：[0008：量子穿隧效應](/solid-state/chapter2/0008-quantum-tunneling)
