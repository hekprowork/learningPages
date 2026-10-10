# 0005：機率詮釋與不確定原理

> 教材對照：Chapter 2 §2.4.1 Probability and Uncertainty Principle（PDF 閱讀頁 62–64）

## 學習目標

- 解釋波函數與機率密度的差異；
- 使用正規化與期望值描述量子狀態；
- 正確解讀位置－動量不確定原理。

## 1. 波函數不直接等於機率

量子狀態以複數波函數 $\psi$ 描述。可觀測的是其絕對值平方：

$$
P(x)=\psi^*(x)\psi(x)=\lvert\psi(x)\rvert^2
$$

$P(x)\,dx$ 表示在 $x$ 到 $x+dx$ 之間找到粒子的機率。波函數本身可為正、負或複數；機率密度則必須是非負實數。

## 2. 正規化

粒子必須出現在所有空間中的某處，因此

$$
\int_{-\infty}^{\infty}\lvert\psi(x)\rvert^2\,dx=1
$$

若原始函數 $f(x)$ 尚未正規化，可令 $\psi(x)=Af(x)$，再由上式求出常數 $A$。

## 3. 期望值與展布

位置的期望值是大量相同量測的平均：

$$
\langle x\rangle
=\int_{-\infty}^{\infty}\psi^*(x)x\psi(x)\,dx
$$

位置不確定度由標準差表示：

$$
\Delta x
=\sqrt{\langle x^2\rangle-\langle x\rangle^2}
$$

它描述機率分布的寬度，不是儀器粗糙造成的普通誤差。

## 4. Heisenberg 不確定原理

位置與動量的展布滿足

$$
\Delta x\,\Delta p_x\geq\frac{\hbar}{2}
$$

另一個常見關係是

$$
\Delta E\,\Delta t\gtrsim\frac{\hbar}{2}
$$

把粒子限制得愈精確，所需的動量範圍就愈廣。這是量子狀態的本質，不是單純因為量測「干擾」了粒子。

## 5. 尺度估算

若電子被限制在約 $1.0\ \mathrm{\mathring{A}}=10^{-10}\ \mathrm{m}$ 的區域，則至少有

$$
\Delta p_x\geq\frac{\hbar}{2\Delta x}
\approx5.3\times10^{-25}\ \mathrm{kg\,m/s}
$$

因此速度展布約為

$$
\Delta v_x\approx\frac{\Delta p_x}{m_e}
\approx5.8\times10^5\ \mathrm{m/s}
$$

原子尺度的空間侷限，自然伴隨非常顯著的動量與動能。

## 6. 合理波函數的基本條件

一般而言，物理解必須：

- 單值且有限；
- 可正規化；
- 在有限位能處連續；
- 一階導數在有限位能邊界通常也連續。

這些條件會在位能井問題中篩選出允許的離散能量。

## 自我檢核

1. 為何 $\psi$ 可能是複數，但 $\lvert\psi\rvert^2$ 必須為實數？
2. 不確定原理是否代表位置與動量都完全不能知道？
3. 若 $\Delta x$ 縮小為原來的一半，$\Delta p_x$ 的最低界線如何改變？

上一頁：[0004：波耳氫原子模型](/solid-state/chapter2/0004-bohr-model)｜下一頁：[0006：薛丁格波動方程式](/solid-state/chapter2/0006-schrodinger-equation)
