# 0006：薛丁格波動方程式

> 教材對照：Chapter 2 §2.4.2 Schrödinger Wave Equation（PDF 閱讀頁 64–66）

## 學習目標

- 認識能量與動量在量子力學中的運算子；
- 區分含時與定態薛丁格方程式；
- 解釋本徵函數、本徵值與邊界條件。

## 1. 從物質波到波動方程式

de Broglie 關係 $p=\hbar k$ 與光子關係 $E=\hbar\omega$ 暗示：動量與能量可由波的空間、時間變化提取。在位置表象中，對應運算子為

$$
\hat p_x=-i\hbar\frac{\partial}{\partial x},
\qquad
\hat E=i\hbar\frac{\partial}{\partial t}
$$

運算子不是普通數字，而是「作用在波函數上的操作規則」。

## 2. 含時薛丁格方程式

對質量 $m$、位能 $V(x,t)$ 的非相對論粒子，一維方程式為

$$
i\hbar\frac{\partial\Psi(x,t)}{\partial t}
=\left[
-\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2}
+V(x,t)
\right]\Psi(x,t)
$$

方括號中的總能量運算子稱為 Hamiltonian：

$$
\hat H=-\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2}+V
$$

第一項代表動能，第二項代表位能。

## 3. 定態薛丁格方程式

若位能不隨時間改變，可令

$$
\Psi(x,t)=\psi(x)e^{-iEt/\hbar}
$$

代回含時方程式後得到

$$
\left[
-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}
+V(x)
\right]\psi(x)=E\psi(x)
$$

簡寫為

$$
\hat H\psi=E\psi
$$

若某個波函數經 $\hat H$ 作用後只差一個常數倍，該波函數稱為**能量本徵函數**，常數 $E$ 稱為**能量本徵值**。

## 4. 邊界條件產生量子化

微分方程式本身常容許許多數學解；物理邊界條件與正規化要求會排除不合理的解。在束縛系統中，通常只剩離散的 $E$ 值，這就是量子化的數學來源。

求解流程可整理為：

1. 寫出位能 $V(x)$；
2. 在各區域解定態方程式；
3. 套用波函數與導數的邊界條件；
4. 正規化波函數；
5. 由 $\lvert\psi\rvert^2$ 計算機率與期望值。

## 5. 例子：自由粒子

在 $V=0$ 的區域，平面波解可寫成

$$
\psi(x)=Ae^{ikx}
$$

代入定態方程式得到

$$
E=\frac{\hbar^2k^2}{2m}=\frac{p^2}{2m}
$$

這與古典非相對論動能相同，但量子狀態以波函數表示。

## 自我檢核

1. Hamiltonian 的兩項各代表什麼？
2. 何時可以將含時波函數分離成空間與時間部分？
3. 能量量子化主要來自方程式本身，還是物理邊界條件？

上一頁：[0005：機率詮釋與不確定原理](/solid-state/chapter2/0005-probability-and-uncertainty)｜下一頁：[0007：一維無限深位能井](/solid-state/chapter2/0007-potential-well)
