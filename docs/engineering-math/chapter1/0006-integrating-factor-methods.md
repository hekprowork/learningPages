---
outline: deep
---

# Lesson 0006: 積分因子法（非正合轉正合方程式）

> 深入解析一階常微分方程式非正合轉正合的四大 Case 判定準則、待定係數交叉型 $\mu(x,y) = x^m y^n$ 與經典考題剖析。

::: info 📌 編輯導航說明
本單元由原 `0001-integrating-factor-method.md` 全面擴充與重編整併而成，涵蓋更完整的四大 Case 判定、推導及交叉型積分因子。
:::

## 🎯 單元學習目標

讀完本單元並完成演練後，你將能夠：
1. 牢記並推導單變數積分因子 $\mu(x)$ 與 $\mu(y)$ 的標準判定公式與防呆口訣。
2. 熟練掌握雙變數交叉型積分因子 $\mu(x,y) = x^m y^n$ 的待定係數法。
3. 輕鬆應對各類研究所與國家考試中的非正合轉正合經典考古題。

---

## 一、 核心原理：非正合轉正合機制

給定一階常微分方程式的標準微分形式：

$$M(x, y)\,dx + N(x, y)\,dy = 0$$

若經 Euler 檢驗發現 $\frac{\partial M}{\partial y} \neq \frac{\partial N}{\partial x}$（非正合），我們尋找一個乘數 $\mu(x, y)$，使全式同乘後滿足正合條件：

$$\frac{\partial (\mu M)}{\partial y} = \frac{\partial (\mu N)}{\partial x}$$

---

## 二、 四大標準積分因子判定準則

### Case 1：積分因子僅為 $x$ 的函數 $\mu(x)$
- **判定條件**：
  $$f(x) = \frac{1}{N} \left( \frac{\partial M}{\partial y} - \frac{\partial N}{\partial x} \right) \quad \text{僅為 } x \text{ 的函數}$$
- **公式**：
  $$\mu(x) = e^{\int f(x)\,dx}$$
- **口訣**：分母放 $N$，分子為「左偏減右偏」($M_y - N_x$)，結果必須純 $x$。

### Case 2：積分因子僅為 $y$ 的函數 $\mu(y)$
- **判定條件**：
  $$g(y) = \frac{1}{M} \left( \frac{\partial N}{\partial x} - \frac{\partial M}{\partial y} \right) \quad \text{僅為 } y \text{ 的函數}$$
- **公式**：
  $$\mu(y) = e^{\int g(y)\,dy}$$
- **口訣**：分母放 $M$，分子為「右偏減左偏」($N_x - M_y$)，結果必須純 $y$。

### Case 3：對稱型與和差型積分因子
若原方程式具備特定齊次或可因式分解結構，常可湊出：
- $\mu(xy) = (xy)^n$
- $\mu(x \pm y)$

### Case 4：雙變數交叉型（待定係數法） $\mu(x, y) = x^m y^n$
當單變數 $\mu(x)$ 或 $\mu(y)$ 皆失效時，常假設積分因子形式為：
$$\mu(x, y) = x^m y^n$$
代入正合化條件並比較左右各項之 $x, y$ 次方係數，解出 $m$ 與 $n$。

---

## 三、 課本精選範例與經典考古題

### 範例 1：單變數 $\mu(x)$ 求解
**題目**：求解 $(3xy + y^2)\,dx + (x^2 + xy)\,dy = 0$。

#### 逐步解析：
1. **Euler 檢驗**：
   $$M_y = 3x + 2y, \quad N_x = 2x + y \implies M_y \neq N_x \text{ (非正合)}$$
2. **測試 $\mu(x)$**：
   $$f(x) = \frac{M_y - N_x}{N} = \frac{(3x+2y) - (2x+y)}{x^2 + xy} = \frac{x+y}{x(x+y)} = \frac{1}{x} \quad (\text{純 } x)$$
   故 $\mu(x) = e^{\int \frac{1}{x}dx} = x$。
3. **同乘 $\mu(x) = x$ 並求解**：
   $$(3x^2 y + xy^2)dx + (x^3 + x^2 y)dy = 0$$
   求得位勢函數 $\phi(x, y) = x^3 y + \frac{1}{2}x^2 y^2 = C$。

---

### 範例 2：交叉型積分因子 $\mu(x,y) = x^m y^n$
**題目**：求解 $(y^2 + 2xy)dx + (2xy + x^2)dy = 0$。（*註：此題亦可直接看出為 $d(xy^2 + x^2 y)$ 或類似結構，此處示範待定係數法*）

#### 逐步解析：
假設 $\mu(x, y) = x^m y^n$，同乘後要求：
$$\frac{\partial}{\partial y}[x^m y^n (y^2 + 2xy)] = \frac{\partial}{\partial x}[x^m y^n (2xy + x^2)]$$
展開並比較係數可解得對應的 $m$ 與 $n$，進而求出隱函數通解。

---

## 四、 考點防呆指南

::: warning ⚠️ 考試防呆注意事項
1. **分母絕對不能放錯**：計算 $\mu(x)$ 時分母為 $N$；計算 $\mu(y)$ 時分母為 $M$。記錯分母會導致結果含有另一個變數，無法積分。
2. **消去後必須完全純化**：若代入後發現化簡結果仍殘留變數（例如含有 $y$），代表該單變數積分因子假設不成立，應改試其他 Case 或交叉型 $\mu(x,y) = x^m y^n$。
:::
