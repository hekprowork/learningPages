# Lesson 0001: 積分因子法（非正合轉正合方程式）

> 掌握一階常微分方程非正合轉正合的核心機制與實戰解題防呆法

## 🎯 本單元目標

讀完本單元並完成演練後，你將能夠：

- 在 30 秒內完成一階方程 $M(x, y)\,dx + N(x, y)\,dy = 0$ 的正合性檢驗（Euler Test）。
- 自主推導並精確選用單變數積分因子判別式（$\mu(x)$ 與 $\mu(y)$），正負號絕不混淆。
- 熟練掌握從乘回積分因子到構造全微分勢函數 $\phi(x, y) = C$ 的完整運算流程。

---

## 一、 核心原理：積分因子是怎麼來的？

給定一階常微分方程式的標準微分形式：

$$M(x, y)\,dx + N(x, y)\,dy = 0$$

若檢驗偏導數發現 $\frac{\partial M}{\partial y} \neq \frac{\partial N}{\partial x}$，則該方程式為**非正合（Non-Exact）**。我們希望尋找一個非零連續乘數 $\mu(x, y)$，使全式同乘 $\mu$ 後滿足正合條件：

$$\frac{\partial (\mu M)}{\partial y} = \frac{\partial (\mu N)}{\partial x}$$

根據偏微分乘積法則展開：

$$\mu \frac{\partial M}{\partial y} + M \frac{\partial \mu}{\partial y} = \mu \frac{\partial N}{\partial x} + N \frac{\partial \mu}{\partial x}$$

移項整理得：

$$\mu \left( \frac{\partial M}{\partial y} - \frac{\partial N}{\partial x} \right) = N \frac{\partial \mu}{\partial x} - M \frac{\partial \mu}{\partial y}$$

::: warning 為什麼一般情況不直接解 $\mu(x,y)$？
上述關於 $\mu(x,y)$ 的式子本身是一個二元一階偏微分方程式（PDE），難度遠高於原本欲解的 ODE。因此，工程數學聚焦於尋找**單變數積分因子** $\mu(x)$ 或 $\mu(y)$！
:::

---

## 二、 兩大標準判別式與公式

### 1. 情形一：$\mu$ 僅為 $x$ 的單變數函數 $\mu(x)$

若 $\mu = \mu(x)$，則 $\frac{\partial \mu}{\partial y} = 0$，且偏微分可化為常微分 $\frac{\partial \mu}{\partial x} = \frac{d\mu}{dx}$：

$$\mu \left( \frac{\partial M}{\partial y} - \frac{\partial N}{\partial x} \right) = N \frac{d\mu}{dx} \implies \frac{1}{\mu} \frac{d\mu}{dx} = \frac{1}{N} \left( \frac{\partial M}{\partial y} - \frac{\partial N}{\partial x} \right)$$

若右式**僅為 $x$ 的函數**，記為 $f(x)$：

$$\frac{1}{N} \left( \frac{\partial M}{\partial y} - \frac{\partial N}{\partial x} \right) = f(x) \implies \mu(x) = e^{\int f(x)\,dx}$$

::: tip 💡 記憶防呆口訣
分母為 **$N$**（方程式右側 $dy$ 的係數），分子順序為**「左偏減右偏」**（$M_y - N_x$）。消去後必須**純粹只剩 $x$**，不能含有任何 $y$！
:::

---

### 2. 情形二：$\mu$ 僅為 $y$ 的單變數函數 $\mu(y)$

若 $\mu = \mu(y)$，則 $\frac{\partial \mu}{\partial x} = 0$，且 $\frac{\partial \mu}{\partial y} = \frac{d\mu}{dy}$：

$$\mu \left( \frac{\partial M}{\partial y} - \frac{\partial N}{\partial x} \right) = -M \frac{d\mu}{dy} \implies \frac{1}{\mu} \frac{d\mu}{dy} = \frac{1}{M} \left( \frac{\partial N}{\partial x} - \frac{\partial M}{\partial y} \right)$$

若右式**僅為 $y$ 的函數**，記為 $g(y)$：

$$\frac{1}{M} \left( \frac{\partial N}{\partial x} - \frac{\partial M}{\partial y} \right) = g(y) \implies \mu(y) = e^{\int g(y)\,dy}$$

::: tip 💡 記憶防呆口訣
分母換為 **$M$**（方程式左側 $dx$ 的係數），分子順序反轉為**「右偏減左偏」**（$N_x - M_y$）。消去後必須**純粹只剩 $y$**！
:::

---

## 三、 經典範例逐步拆解

### 題目：求解 $(3xy + y^2)\,dx + (x^2 + xy)\,dy = 0$

#### 步驟 1：正合性檢驗 (Euler Test)
令：
$$M(x, y) = 3xy + y^2, \quad N(x, y) = x^2 + xy$$

計算一階偏導數：
$$\frac{\partial M}{\partial y} = 3x + 2y, \quad \frac{\partial N}{\partial x} = 2x + y$$

因 $\frac{\partial M}{\partial y} \neq \frac{\partial N}{\partial x}$，原式非正合。計算兩者之差：
$$M_y - N_x = (3x + 2y) - (2x + y) = x + y$$

#### 步驟 2：測試單變數判別式
測試除以 $N(x, y)$：
$$\frac{M_y - N_x}{N} = \frac{x + y}{x^2 + xy} = \frac{x + y}{x(x + y)} = \frac{1}{x} = f(x)$$

恰好為純 $x$ 的函數！因此積分因子為：
$$\mu(x) = e^{\int \frac{1}{x}\,dx} = e^{\ln|x|} = x$$

#### 步驟 3：全式同乘 $\mu(x) = x$ 並求解勢函數
原方程式同乘 $x$ 得：
$$(3x^2 y + xy^2)\,dx + (x^3 + x^2 y)\,dy = 0$$

驗證新方程式之正合性：
$$\frac{\partial}{\partial y}(3x^2 y + xy^2) = 3x^2 + 2xy$$
$$\frac{\partial}{\partial x}(x^3 + x^2 y) = 3x^2 + 2xy$$
兩者完全相等，已成功轉換為正合方程式！

對 $dx$ 項積分求勢函數 $\phi(x, y)$：
$$\phi(x, y) = \int (3x^2 y + xy^2)\,dx = x^3 y + \frac{1}{2}x^2 y^2 + h(y)$$

對 $y$ 偏微分並對照 $dy$ 項：
$$\frac{\partial \phi}{\partial y} = x^3 + x^2 y + h'(y) = x^3 + x^2 y \implies h'(y) = 0 \implies h(y) = C_1$$

因此方程式的通解為：
$$x^3 y + \frac{1}{2} x^2 y^2 = C$$

---

## 四、 實戰自我檢核 (Retrieval Practice)

::: details 📝 題目 1：方程式 $(2y)\,dx + (x)\,dy = 0$ 的積分因子選型
**問題**：方程式中 $M_y = 2$，$N_x = 1$。若要尋找單變數積分因子，應該使用哪一個判別式？

**答案與解析**：
應計算：
$$\frac{M_y - N_x}{N} = \frac{2 - 1}{x} = \frac{1}{x} = f(x)$$
為純 $x$ 函數，故積分因子為：
$$\mu(x) = e^{\int \frac{1}{x}\,dx} = x$$
全式同乘 $x$ 後變為 $2xy\,dx + x^2\,dy = d(x^2 y) = 0$，通解立即得 $x^2 y = C$。
:::

::: details 📝 題目 2：已知判別式為負號形式的積分因子計算
**問題**：若計算得 $\frac{1}{M}\left(\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y}\right) = -\frac{2}{y}$，則對應的積分因子 $\mu(y)$ 為何？

**答案與解析**：
$$\mu(y) = e^{\int -\frac{2}{y}\,dy} = e^{-2\ln|y|} = e^{\ln(y^{-2})} = \frac{1}{y^2}$$
注意負號在積分後會成為對數的次方項，化簡為倒數平方。
:::

---

## 五、 相關學習資源

- [0001: 建立積分因子法學習基線與核心架構 (Learning Record)](/engineering-math/chapter2/0001-integrating-factors)
- [001: 一階 ODE 積分因子與正合法速查卡 (Reference Cheatsheet)](/engineering-math/chapter3/001-integrating-factors-cheatsheet)
