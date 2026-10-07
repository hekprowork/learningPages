---
outline: deep
---

# Lesson 0005: 正合微分方程式與位勢函數

> 掌握一階常微分方程式正合性檢驗、位勢函數雙向偏積分求解演算法與分群湊全微分技巧。

## 🎯 單元學習目標

讀本單元並完成演練後，你將能夠：
1. 精確執行 Euler 正合性檢驗條件：$\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$。
2. 熟練掌握位勢函數 $\phi(x,y) = C$ 的雙向偏積分對帳求解演算法。
3. 靈活運用分群湊全微分法（如 $d(xy)$, $d(x/y)$, $d(x^2+y^2)$ 等），在免求積分因子下秒殺考題。

---

## 一、 核心數學定義與理論基礎

### 1. 微分形式與正合性條件
給定一階常微分方程式的標準微分形式：

$$M(x, y)\,dx + N(x, y)\,dy = 0$$

若存在一個纯量函數（位勢函數）$\phi(x, y)$，使得其全微分（Total Differential）恰好等於左側運算式：

$$d\phi(x, y) = \frac{\partial \phi}{\partial x}\,dx + \frac{\partial \phi}{\partial y}\,dy = M(x, y)\,dx + N(x, y)\,dy = 0$$

則稱此微分方程式為**正合微分方程式（Exact Differential Equation）**。此時其隱函數通解可直接寫為：

$$\phi(x, y) = C$$

### 2. Clairaut 定理與 Euler 正合性檢驗
根據微積分中的 Clairaut 定理（二階混合偏導數對調不影響其值）：

$$\frac{\partial^2 \phi}{\partial y \partial x} = \frac{\partial^2 \phi}{\partial x \partial y} \implies \frac{\partial}{\partial y}\left(\frac{\partial \phi}{\partial x}\right) = \frac{\partial}{\partial x}\left(\frac{\partial \phi}{\partial y}\right)$$

因此，方程式 $M(x, y)\,dx + N(x, y)\,dy = 0$ 為正合的**充要條件（Euler Test）**為：

$$\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$$

---

## 二、 位勢函數求解演算法（雙向偏積分法）

當檢驗確認 $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$ 時，可透過以下標準步驟構造位勢函數 $\phi(x, y)$：

### 方法 A：先對 $x$ 積分（Left-First Path）
1. **對 $M(x, y)$ 積分**：
   $$\phi(x, y) = \int M(x, y)\,dx + h(y)$$
   *(注意：積分常數在此處必須是一個僅與 $y$ 有關的函數 $h(y)$)*。
2. **利用 $N(x, y)$ 決定 $h(y)$**：
   對上式兩邊取 $y$ 的偏微分，並令其等於 $N(x, y)$：
   $$\frac{\partial \phi}{\partial y} = \frac{\partial}{\partial y}\left[ \int M(x, y)\,dx \right] + h'(y) = N(x, y)$$
   移項解出 $h'(y)$：
   $$h'(y) = N(x, y) - \frac{\partial}{\partial y}\left[ \int M(x, y)\,dx \right]$$
   *理論上，此時右側化簡後必會將所有的 $x$ 互相抵銷，僅留下純 $y$ 函數*。
3. **積分求出 $h(y)$ 並寫出通解**：
   $$h(y) = \int \left\{ N(x, y) - \frac{\partial}{\partial y}\left[ \int M(x, y)\,dx \right] \right\} dy$$
   最終通解為 $\phi(x, y) = C$。

### 方法 B：先對 $y$ 積分（Right-First Path）
對稱地，亦可選擇：
1. $\phi(x, y) = \int N(x, y)\,dy + k(x)$
2. 利用 $\frac{\partial \phi}{\partial x} = M(x, y)$ 求解 $k'(x)$。
3. 積分得 $k(x)$ 並組合成 $\phi(x, y) = C$。

---

## 三、 分群湊全微分法（Grouping Method）

在許多考題中，若能直接利用基本微分公式進行分群組合，往往能不經繁雜的正合檢驗與積分即迅速解出答案。以下為常用微商公式與湊全微分對應表：

| 基本微分組合 | 對應微分形式 |
| :--- | :--- |
| $d(xy) = x\,dy + y\,dx$ | $x\,dy + y\,dx = 0 \implies xy = C$ |
| $d\left(\frac{x}{y}\right) = \frac{y\,dx - x\,dy}{y^2}$ | $y\,dx - x\,dy = 0 \implies \frac{x}{y} = C$ |
| $d\left(\frac{y}{x}\right) = \frac{x\,dy - y\,dx}{x^2}$ | $x\,dy - y\,dx = 0 \implies \frac{y}{x} = C$ |
| $d(x^2 + y^2) = 2x\,dx + 2y\,dy$ | $x\,dx + y\,dy = 0 \implies x^2 + y^2 = C$ |
| $d(\ln(xy)) = \frac{1}{x}dx + \frac{1}{y}dy$ | $\frac{1}{x}dx + \frac{1}{y}dy = 0 \implies xy = C$ |
| $d\left(\arctan\left(\frac{y}{x}\right)\right) = \frac{x\,dy - y\,dx}{x^2 + y^2}$ | $\frac{x\,dy - y\,dx}{x^2 + y^2} = 0 \implies \frac{y}{x} = C$ |

---

## 四、 課本精選範例逐步推導

### 範例 1：標準正合方程式求解
**題目**：求解一階微分方程式 $(2x + 3y^2)dx + (6xy + 4y^3)dy = 0$。

#### 逐步解析：
1. **Euler 正合性檢驗**：
   $$M(x, y) = 2x + 3y^2 \implies \frac{\partial M}{\partial y} = 6y$$
   $$N(x, y) = 6xy + 4y^3 \implies \frac{\partial N}{\partial x} = 6y$$
   因 $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x} = 6y$，確為正合微分方程式。
2. **建構位勢函數 $\phi(x, y)$**：
   對 $M(x, y)$ 對 $x$ 積分：
   $$\phi(x, y) = \int (2x + 3y^2)\,dx + h(y) = x^2 + 3xy^2 + h(y)$$
   對上式取 $y$ 偏微分並令其等於 $N(x, y)$：
   $$\frac{\partial \phi}{\partial y} = 6xy + h'(y) = 6xy + 4y^3$$
   因此：
   $$h'(y) = 4y^3 \implies h(y) = y^4$$
3. **寫出通解**：
   $$\phi(x, y) = x^2 + 3xy^2 + y^4 = C$$

---

### 範例 2：含超越函數與變數係數之正合方程式
**題目**：求解 $(\cos x \cos y - 2x)dx - (\sin x \sin y + y)dy = 0$。

#### 逐步解析：
1. **整理並檢驗正合性**：
   令 $M(x, y) = \cos x \cos y - 2x$，$N(x, y) = -(\sin x \sin y + y) = -\sin x \sin y - y$。
   $$\frac{\partial M}{\partial y} = -\cos x \sin y$$
   $$\frac{\partial N}{\partial x} = -\cos x \sin y$$
   兩者相等，為正合方程式。
2. **求解位勢函數**：
   選擇先對 $y$ 積分：
   $$\phi(x, y) = \int (-\sin x \sin y - y)\,dy + k(x) = \sin x \cos y - \frac{1}{2}y^2 + k(x)$$
   對 $x$ 取偏微分並令其等於 $M(x, y)$：
   $$\frac{\partial \phi}{\partial x} = \cos x \cos y + k'(x) = \cos x \cos y - 2x$$
   因此：
   $$k'(x) = -2x \implies k(x) = -x^2$$
3. **寫出通解**：
   $$\sin x \cos y - \frac{1}{2}y^2 - x^2 = C \implies 2\sin x \cos y - y^2 - 2x^2 = C'$$

---

### 範例 3：巧妙運用分群法求解
**題目**：求解 $(x^2 + y^2 + x)dx + y\,dy = 0$。

#### 逐步解析：
1. **拆項與分群重組**：
   原方程式可改寫為：
   $$(x^2 + x)dx + (y\,dx + y\,dy) \quad \text{...不對，重新配對}$$
   整理為：
   $$(x^2 + x)dx + y\,dy = 0$$
   這直接就是一個分離變數形式！各項對 $x$ 與 $y$ 獨立：
   $$\int (x^2 + x)\,dx + \int y\,dy = C$$
   積分得：
   $$\frac{1}{3}x^3 + \frac{1}{2}x^2 + \frac{1}{2}y^2 = C \implies 2x^3 + 3x^2 + 3y^2 = C'$$

---

## 五、 考點防呆指南與常見失誤

::: warning ⚠️ 考試三大失誤黑洞
1. **忘記驗證正合性直接積分**：若未先檢查 $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$ 就盲目積分，遇到非正合方程式會導致答案完全錯誤。
2. **積分常數寫成常數 $C$ 而非 $h(y)$**：對 $M$ 積分時，常數項必須是 $h(y)$ 而非法定常數 $C$，否則在對 $y$ 微分時會將該項直接消去，導致漏掉與 $y$ 相關的項次。
3. **正負號與三角函數微分誤判**：對 $\sin x, \cos x$ 進行偏積分或微分時，務必牢記 $\frac{d}{dx}(\sin x) = \cos x$，$\frac{d}{dx}(\cos x) = -\sin x$。
:::
