---
title: "0007: 特殊一階非線性 ODE（齊次、白努利與黎卡提）"
description: "介紹一階非線性常微分方程式的三大重要類型：齊次方程式、白努利方程式與黎卡提方程式，並透過適當的變數代換將其化為可分離變數或一階線性 ODE 進行求解。"
---

# 0007: 特殊一階非線性 ODE（齊次、白努利與黎卡提）

::: tip 🎯 單元學習目標
掌握一階非線性常微分方程式中三種最具工程實用價值的特殊形式：
1. **齊次方程式 (Homogeneous ODEs)**：利用 $y = vx$ 代換化為可分離變數 ODE。
2. **白努利方程式 (Bernoulli Equation)**：利用 $z = y^{1-n}$ 代換化為一階線性 ODE。
3. **黎卡提方程式 (Riccati Equation)**：已知特解時，利用降階代換 $y = s(x) + \frac{1}{z}$ 化為一階線性 ODE。
:::

---

## 一、 齊次方程式 (Homogeneous ODEs)

### 1. 核心數學定義
若一階常微分方程式可寫為如下形式：
$$y' = f\left(\frac{y}{x}\right) \quad \text{或} \quad M(x,y)dx + N(x,y)dy = 0$$
其中 $M$ 與 $N$ 為同次齊次函數，則稱為**齊次常微分方程式**。

### 2. 解題 SOP / 理論推導
1. **變數代換**：令 $y = vx$，其中 $v = v(x)$。根據微分鏈鎖律：
   $$y' = v + x \frac{dv}{dx}$$
2. **代入與分離變數**：將 $y$ 與 $y'$ 代入原方程，可將 $x$ 與 $v$ 分離：
   $$v + x \frac{dv}{dx} = f(v) \implies x \frac{dv}{dx} = f(v) - v \implies \frac{dv}{f(v) - v} = \frac{dx}{x}$$
3. **積分求解**：兩邊積分得到含 $v$ 與 $x$ 的隱函數解，最後再將 $v = \frac{y}{x}$ 代回。

### 3. 課本精選範例
**題目**：求解一階 ODE：$(x^2 + y^2)dx - xy dy = 0$。

**詳細解析**：
1. 改寫方程式：
   $$xy \frac{dy}{dx} = x^2 + y^2 \implies \frac{dy}{dx} = \frac{x^2 + y^2}{xy} = \frac{x}{y} + \frac{y}{x} = \frac{1}{y/x} + \frac{y}{x}$$
   此為齊次方程式。
2. 令 $y = vx$，則 $\frac{dy}{dx} = v + x \frac{dv}{dx}$：
   $$v + x \frac{dv}{dx} = \frac{1}{v} + v$$
3. 化簡並分離變數：
   $$x \frac{dv}{dx} = \frac{1}{v} \implies v \, dv = \frac{dx}{x}$$
4. 兩邊積分：
   $$\int v \, dv = \int \frac{dx}{x} \implies \frac{1}{2}v^2 = \ln|x| + C_1 \implies v^2 = 2\ln|x| + C$$
5. 代回 $v = \frac{y}{x}$：
   $$\left(\frac{y}{x}\right)^2 = 2\ln|x| + C \implies y^2 = x^2(2\ln|x| + C)$$

---

## 二、 白努利方程式 (Bernoulli Equation)

### 1. 核心數學定義
形如以下標準型式的一階 ODE 稱為**白努利方程式**：
$$y' + P(x)y = Q(x)y^n$$
- 當 $n = 0$ 時，為一階線性 ODE。
- 當 $n = 1$ 時，為可分離變數 ODE。
- 當 $n \neq 0, 1$ 時，為非線性 ODE。

### 2. 解題 SOP / 理論推導
1. **除以 $y^n$**：
   $$y^{-n}y' + P(x)y^{1-n} = Q(x)$$
2. **變數代換**：令 $z = y^{1-n}$，則其導數為：
   $$z' = (1-n)y^{-n}y' \implies y^{-n}y' = \frac{1}{1-n} z'$$
3. **化為一階線性 ODE**：
   $$\frac{1}{1-n} z' + P(x)z = Q(x) \implies z' + (1-n)P(x)z = (1-n)Q(x)$$
4. 利用積分因子法求解 $z(x)$，最後代回 $y = z^{\frac{1}{1-n}}$。

### 3. 課本精選範例
**題目**：求解白努利方程式 $y' + \frac{1}{x}y = x y^2$ ($x > 0$)。

**詳細解析**：
1. 此處 $P(x) = \frac{1}{x}$，$Q(x) = x$，$n = 2$。
2. 兩邊同除以 $y^2$：
   $$y^{-2}y' + \frac{1}{x}y^{-1} = x$$
3. 令 $z = y^{1-2} = y^{-1}$，則 $z' = -y^{-2}y'$，即 $-z' + \frac{1}{x}z = x$，整理得：
   $$z' - \frac{1}{x}z = -x$$
4. 求積分因子 $I(x)$：
   $$I(x) = e^{\int -\frac{1}{x} dx} = e^{-\ln x} = \frac{1}{x}$$
5. 代入線性解答公式：
   $$z \cdot \frac{1}{x} = \int (-x) \cdot \frac{1}{x} dx = \int -1 \, dx = -x + C$$
   $$z = -x^2 + Cx$$
6. 因為 $z = \frac{1}{y}$，故通解為：
   $$\frac{1}{y} = -x^2 + Cx \implies y = \frac{1}{Cx - x^2}$$

---

## 三、 黎卡提方程式 (Riccati Equation)

### 1. 核心數學定義
形如以下形式的一階非線性 ODE 稱為**黎卡提方程式**：
$$y' = P(x)y^2 + Q(x)y + R(x)$$

### 2. 解題 SOP / 理論推導
若透過觀察或題目給定，已知該方程式的一個特解 $s(x)$：
1. **代換降階**：令 $y = s(x) + \frac{1}{z}$，其中 $z = z(x)$。
2. **代入微分**：
   $$y' = s'(x) - \frac{1}{z^2}z'$$
3. 代入原方程展開並化簡，可將黎卡提方程式化為關於 $z$ 的**一階線性 ODE**，求解 $z$ 後即可得 $y$。

### 3. 課本精選範例
**題目**：已知 $y' = -y^2 + \frac{1}{x}y + \frac{1}{x^2}$ 的一個特解為 $s(x) = \frac{1}{x}$，求其通解。

**詳細解析**：
1. 令 $y = \frac{1}{x} + \frac{1}{z}$，則 $y' = -\frac{1}{x^2} - \frac{1}{z^2}z'$。
2. 代入原方程式左邊：
   $$-\frac{1}{x^2} - \frac{1}{z^2}z' = -\left(\frac{1}{x} + \frac{1}{z}\right)^2 + \frac{1}{x}\left(\frac{1}{x} + \frac{1}{z}\right) + \frac{1}{x^2}$$
3. 展開右邊各項：
   $$-\left(\frac{1}{x^2} + \frac{2}{xz} + \frac{1}{z^2}\right) + \left(\frac{1}{x^2} + \frac{1}{xz}\right) + \frac{1}{x^2} = \frac{1}{x^2} - \frac{1}{xz} - \frac{1}{z^2}$$
4. 兩邊消去 $-\frac{1}{x^2} - \frac{1}{z^2}$：
   $$-\frac{1}{z^2}z' = -\frac{1}{xz} - \frac{1}{z^2} \implies \frac{1}{z^2}z' = \frac{1}{xz} + \frac{1}{z^2}$$
5. 兩邊同乘以 $z^2$，化為線性形式：
   $$z' = \frac{z}{x} + 1 \implies z' - \frac{1}{x}z = 1$$
6. 求積分因子 $I(x) = \frac{1}{x}$：
   $$\left(\frac{z}{x}\right)' = \frac{1}{x} \implies \frac{z}{x} = \ln|x| + C \implies z = x(\ln|x| + C)$$
7. 故通解為：
   $$y = \frac{1}{x} + \frac{1}{x(\ln|x| + C)}$$

---

::: warning 💡 考點防呆指南
1. **齊次判別**：代換 $x \to tx, y \to ty$ 檢查是否能提出 $t^n$，確認次數一致再進行 $y = vx$ 代換。
2. **白努利指數辨識**：看到 $y^n$ 項不要慌張，標準步驟永遠是「除以 $y^n$ $\to$ 令 $z = y^{1-n}$ $\to$ 變為線性」。
3. **黎卡提特解依賴**：黎卡提方程式通常無法直接求解，題目必定會給出一個特解 $s(x)$，若無特解則需透過觀察法猜測（常數或簡單冪函數）。
:::
