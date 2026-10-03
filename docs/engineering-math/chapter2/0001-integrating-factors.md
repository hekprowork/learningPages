# 0001: 建立積分因子法學習基線與核心架構

> 深入探討一階常微分方程之非正合轉正合機制、勢函數構造與全微分幾何意涵

## 🎯 學習紀錄核心重點

使用者已掌握一階常微分方程式基本分類（可分離變數法、一階線性微分方程、正合微分方程），本單元啟動專題學習：**積分因子法（非正合轉正合機制）**。核心在於理解積分因子 $\mu(x,y)$ 乘入原方程式後使微積分混合偏導數對稱性 $\frac{\partial (\mu M)}{\partial y} = \frac{\partial (\mu N)}{\partial x}$ 成立的物理與幾何機制，並熟練掌握單變數積分因子的判別與分組湊微分技巧。

---

## 一、 全微分與勢函數的幾何物理意義

在平面向量場 $\vec{F}(x, y) = M(x, y)\hat{i} + N(x, y)\hat{j}$ 中，微分形式：

$$M(x, y)\,dx + N(x, y)\,dy = 0$$

表示曲線切向量與向量場 $\vec{F}$ 處處正交。若該向量場為**保守場 (Conservative Field)**，則存在純量勢函數 (Potential Function) $\phi(x, y)$ 使得：

$$\nabla \phi = \frac{\partial \phi}{\partial x}\hat{i} + \frac{\partial \phi}{\partial y}\hat{j} = M\hat{i} + N\hat{j}$$

此時原微分方程可直接表示為全微分：

$$d\phi = \frac{\partial \phi}{\partial x}\,dx + \frac{\partial \phi}{\partial y}\,dy = M\,dx + N\,dy = 0 \implies \phi(x, y) = C$$

### Euler 正合條件之本質
根據微積分 Schwarz 定理（混合偏導數相等定理），若二階偏導數連續：

$$\frac{\partial^2 \phi}{\partial y \partial x} = \frac{\partial^2 \phi}{\partial x \partial y} \iff \frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$$

若此等式不成立，表示該向量場具備旋度（$\text{curl}\,\vec{F} \neq 0$），無法直接由單一勢函數生成。

---

## 二、 積分因子 $\mu(x, y)$ 的作用機制

積分因子 $\mu(x, y)$ 的本質是**旋度消除乘數 (Integrating Factor)**。當原本的向量場 $\vec{F} = (M, N)$ 具有旋度時，透過標量場 $\mu$ 的重新加權，使新向量場 $\mu\vec{F} = (\mu M, \mu N)$ 成為無旋場：

$$\text{curl}(\mu \vec{F}) = \left[ \frac{\partial (\mu N)}{\partial x} - \frac{\partial (\mu M)}{\partial y} \right] \hat{k} = 0$$

### 單變數假設的降維思考
由於全尺寸求解 $\mu(x,y)$ 會導致二元偏微分方程：

$$\mu(M_y - N_x) = N \mu_x - M \mu_y$$

工程數學採用「降維假設」：
1. **假設 $\mu = \mu(x)$**：則 $\mu_y = 0$，得到 $\frac{d\ln\mu}{dx} = \frac{M_y - N_x}{N}$。若右式與 $y$ 無關，即可積分求出 $\mu(x)$。
2. **假設 $\mu = \mu(y)$**：則 $\mu_x = 0$，得到 $\frac{d\ln\mu}{dy} = \frac{N_x - M_y}{M}$。若右式與 $x$ 無關，即可積分求出 $\mu(y)$。

---

## 三、 湊微分法（常見微分分組）之思維模型

除了套用判別式積分外，高等工程數學中極為強調「分組湊微分」的直觀能力：

| 微分原形 | 展開形式 | 幾何與運算直覺 |
| :--- | :--- | :--- |
| **$d(xy)$** | $x\,dy + y\,dx$ | 矩形面積微元 |
| **$d\left(\frac{y}{x}\right)$** | $\frac{x\,dy - y\,dx}{x^2}$ | 斜率微元（注意分母平方） |
| **$d\left(\frac{x}{y}\right)$** | $\frac{y\,dx - x\,dy}{y^2}$ | 倒數斜率微元 |
| **$d\left(\arctan\frac{y}{x}\right)$** | $\frac{x\,dy - y\,dx}{x^2 + y^2}$ | 極座標角度微元 $d\theta$ |
| **$d\left(\frac{1}{2}\ln(x^2+y^2)\right)$** | $\frac{x\,dx + y\,dy}{x^2 + y^2}$ | 極座標半徑對數微元 $d(\ln r)$ |

---

## 💡 解題決策樹與推論 (Implications)

1. **優先順序**：
   - 看到方程式先觀察是否能直接**分離變數**。
   - 若不能，檢驗是否為一階線性（$y' + P(x)y = Q(x)$）或伯努利方程。
   - 若為對稱微分形式 $M\,dx + N\,dy = 0$，計算 $M_y$ 與 $N_x$。
   - 若 $M_y = N_x$，直接積分找勢函數；若否，計算 $M_y - N_x$，除以 $N$ 測純 $x$，或除以 $M$ 測純 $y$。
2. **防呆關鍵**：
   - 分母除 $N$ 時，分子為 $(M_y - N_x)$。
   - 分母除 $M$ 時，分子為 $(N_x - M_y)$（帶有負號）。
