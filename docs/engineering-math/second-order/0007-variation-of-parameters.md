---
outline: deep
---

# 0007: 參數變異法 (Method of Variation of Parameters)
> **Context Pointer**: 本文為工程數學第二章「二階常微分方程式」核心通用解法講義，對應 `docs/engineering-math/second-order/0007-variation-of-parameters.md`。

---

## 🎯 單元學習目標
1. **掌握參數變異法之歷史定位與通用性**：理解當非齊次項為 $\sec x, \tan x, \frac{1}{x}, \ln x$ 等無法使用待定係數法的函數時，參數變異法作為萬能通用解法的強大之處。
2. **理解 Lagrange 條件與嚴謹第一原理推導**：學會如何將齊次基底解的常數 $c_1, c_2$ 變易為函數 $u(x), v(x)$，並透過一階與二階導數的約束條件推導出 Wronskian 與特解公式。
3. **熟練課本範例詳細手算演練**：完整推導標準範例 $y'' + 4y = \sec x$ 的齊次解、Wronskian、積分運算與三角恆等式化簡。
4. **避開解題常見致命陷阱**：掌握首項係數標準化、Wronskian 運算與正負號記憶等關鍵細節。

---

## 1. 參數變異法之歷史定位與通用性

在求解二階線性非齊次常微分方程式：
$$y'' + p(x)y' + q(x)y = f(x)$$

我們常見的**待定係數法 (Method of Undetermined Coefficients)** 僅適用於非齊次項 $f(x)$ 屬於指數函數、多項式、正弦/餘弦函數或其有限線性組合。一旦 $f(x)$ 變為如 $\sec x, \tan x, \csc x, \frac{1}{x}, \ln x$ 等超出初等函數閉包的型態，待定係數法即告失效。

由數學家拉格朗日 (Joseph-Louis Lagrange) 所創立的**參數變異法 (Method of Variation of Parameters)**，正是為了解決此類一般性問題而生的萬能通用方法。它僅需已知對應齊次方程式的兩個獨立基底解，即可透過系統化的積分公式求得非齊次方程式的特解。

::: warning ⚠️ 適用前提
使用參數變異法前，**必須先將微分方程式化為標準型（即最高階導數 $y''$ 的係數必須為 1）**：
$$y'' + p(x)y' + q(x)y = f(x)$$
若原式為 $R(x)y'' + P(x)y' + Q(x)y = G(x)$，切記先同除以 $R(x)$ 取得正確的 $f(x) = \frac{G(x)}{R(x)}$。
:::

---

## 2. 嚴謹第一原理推導（Lagrange 條件）

### 第一步：尋找齊次基底解
首先求解對應的齊次方程式 $y'' + p(x)y' + q(x)y = 0$，得到兩個線性獨立的基底解 $y_1(x)$ 與 $y_2(x)$。
其齊次通解為：
$$y_h(x) = c_1 y_1(x) + c_2 y_2(x)$$

### 第二步：參數變異假設
參數變異法的核心思想，在於將常數 $c_1, c_2$ 「變易」為未知函數 $u(x)$ 與 $v(x)$，假設非齊次方程式的特解 $y_p(x)$ 形式為：
$$y_p(x) = u(x)y_1(x) + v(x)y_2(x)$$

### 第三步：一階導數與 Lagrange 約束條件
對 $y_p(x)$ 求一階導數：
$$y_p'(x) = [u'(x)y_1(x) + v'(x)y_2(x)] + [u(x)y_1'(x) + v(x)y_2'(x)]$$

為了簡化後續二階導數的繁雜計算，拉格朗日引入了第一個約束條件（假設一階導數中含 $u', v'$ 的括號項為 0）：
$$\text{Constraint 1: } u'(x)y_1(x) + v'(x)y_2(x) = 0$$

在此約束下，一階導數簡化為：
$$y_p'(x) = u(x)y_1'(x) + v(x)y_2'(x)$$

### 第四步：二階導數與代入原方程式
繼續對 $y_p'(x)$ 求二階導數：
$$y_p''(x) = [u'(x)y_1'(x) + v'(x)y_2'(x)] + [u(x)y_1''(x) + v(x)y_2''(x)]$$

將 $y_p, y_p', y_p''$ 代入標準型非齊次 ODE：$y'' + p(x)y' + q(x)y = f(x)$：
$$[u'y_1' + v'y_2' + u y_1'' + v y_2''] + p(x)[u y_1' + v y_2'] + q(x)[u y_1 + v y_2] = f(x)$$

重新整理，將含有 $u$ 與 $v$ 的項提出：
$$u \underbrace{[y_1'' + p y_1' + q y_1]}_{= 0 \text{ (因 } y_1 \text{ 為齊次解)}} + v \underbrace{[y_2'' + p y_2' + q y_2]}_{= 0 \text{ (因 } y_2 \text{ 為齊次解)}} + u'(x)y_1'(x) + v'(x)y_2'(x) = f(x)$$

由於 $y_1$ 與 $y_2$ 是齊次方程式的解，括號內皆為 0，因此得到第二個約束條件：
$$\text{Constraint 2: } u'(x)y_1'(x) + v'(x)y_2'(x) = f(x)$$

### 第五步：聯立方程組與 Cramer's Rule 求解
結合兩個約束條件，得到關於 $u'(x)$ 與 $v'(x)$ 的二元一次線性方程組：
$$\begin{cases} u'(x)y_1(x) + v'(x)y_2(x) = 0 \\ u'(x)y_1'(x) + v'(x)y_2'(x) = f(x) \end{cases}$$

利用克拉瑪公式 (Cramer's Rule) 求解：
分母為朗斯基行列式 (Wronskian)：
$$W(y_1, y_2)(x) = \begin{vmatrix} y_1 & y_2 \\ y_1' & y_2' \end{vmatrix} = y_1 y_2' - y_1' y_2$$

則：
$$u'(x) = \frac{\begin{vmatrix} 0 & y_2 \\ f(x) & y_2' \end{vmatrix}}{W(y_1, y_2)} = -\frac{y_2(x) f(x)}{W(x)}$$

$$v'(x) = \frac{\begin{vmatrix} y_1 & 0 \\ y_1' & f(x) \end{vmatrix}}{W(y_1, y_2)} = \frac{y_1(x) f(x)}{W(x)}$$

### 第六步：積分得到特解公式
對 $u'(x)$ 與 $v'(x)$ 積分即可得到 $u(x)$ 與 $v(x)$，進而寫出特解公式：
$$y_p(x) = -y_1(x) \int \frac{y_2(x) f(x)}{W(x)} \, dx + y_2(x) \int \frac{y_1(x) f(x)}{W(x)} \, dx$$

---

## 3. 課本範例詳細手算演練

### 範例題目
求解下列二階常微分方程式：
$$y'' + 4y = \sec(x), \quad -\frac{\pi}{4} < x < \frac{\pi}{4}$$

---

### Step 1: 求解對應齊次方程
齊次方程式為：
$$y'' + 4y = 0$$
特徵方程式：$r^2 + 4 = 0 \implies r = \pm 2i$
故齊次通解為：
$$y_h(x) = c_1 \cos(2x) + c_2 \sin(2x)$$
我們選定基底解：
$$y_1(x) = \cos(2x), \quad y_2(x) = \sin(2x)$$

---

### Step 2: 計算 Wronskian (朗斯基行列式)
$$W(y_1, y_2)(x) = \begin{vmatrix} \cos(2x) & \sin(2x) \\ -2\sin(2x) & 2\cos(2x) \end{vmatrix}$$
$$W(x) = \cos(2x) \cdot [2\cos(2x)] - \sin(2x) \cdot [-2\sin(2x)]$$
$$W(x) = 2\cos^2(2x) + 2\sin^2(2x) = 2(\cos^2(2x) + \sin^2(2x)) = 2$$

---

### Step 3: 計算 $u'(x)$ 與 $v'(x)$
已知非齊次項 $f(x) = \sec x$：

1. 計算 $u'(x)$：
   $$u'(x) = -\frac{y_2(x) f(x)}{W(x)} = -\frac{\sin(2x)\sec x}{2}$$
   利用倍角公式 $\sin(2x) = 2\sin x \cos x$：
   $$u'(x) = -\frac{2\sin x \cos x \cdot \frac{1}{\cos x}}{2} = -\sin x$$

2. 計算 $v'(x)$：
   $$v'(x) = \frac{y_1(x) f(x)}{W(x)} = \frac{\cos(2x)\sec x}{2}$$
   利用倍角公式 $\cos(2x) = 2\cos^2 x - 1$：
   $$v'(x) = \frac{(2\cos^2 x - 1) \cdot \frac{1}{\cos x}}{2} = \frac{2\cos x - \sec x}{2} = \cos x - \frac{1}{2}\sec x$$

---

### Step 4: 積分求得 $u(x)$ 與 $v(x)$
1. 求 $u(x)$：
   $$u(x) = \int (-\sin x) \, dx = \cos x$$

2. 求 $v(x)$：
   $$v(x) = \int \left( \cos x - \frac{1}{2}\sec x \right) dx = \sin x - \frac{1}{2}\ln|\sec x + \tan x|$$

---

### Step 5: 組合特解 $y_p(x)$
$$y_p(x) = u(x)y_1(x) + v(x)y_2(x)$$
$$y_p(x) = (\cos x)\cos(2x) + \left(\sin x - \frac{1}{2}\ln|\sec x + \tan x|\right)\sin(2x)$$
展開並運用三角恆等式化簡：
$$y_p(x) = \cos(2x)\cos x + \sin(2x)\sin x - \frac{1}{2}\sin(2x)\ln|\sec x + \tan x|$$
由餘弦差角公式 $\cos(A-B) = \cos A \cos B + \sin A \sin B$（此處 $A = 2x, B = x$）：
$$\cos(2x)\cos x + \sin(2x)\sin x = \cos(2x - x) = \cos x$$
因此特解精簡為：
$$y_p(x) = \cos x - \frac{1}{2}\sin(2x)\ln|\sec x + \tan x|$$

---

### Step 6: 寫出完整通解
$$y(x) = y_h(x) + y_p(x)$$
$$y(x) = c_1 \cos(2x) + c_2 \sin(2x) + \cos x - \frac{1}{2}\sin(2x)\ln|\sec x + \tan x|$$

---

## 4. 解題常見致命陷阱

| 陷阱類型 | 錯誤描述 | 正確做法 |
| :--- | :--- | :--- |
| **陷阱 1：未做標準化** | 遇到 $R(x)y'' + P(x)y' + Q(x)y = G(x)$ 時，直接將 $G(x)$ 代入 $f(x)$ 積分。 | 務必先同除以 $R(x)$，確保 $y''$ 係數為 1，令 $f(x) = \frac{G(x)}{R(x)}$。 |
| **陷阱 2：正負號顛倒** | 計算 $u'(x)$ 時漏掉負號，寫成 $u'(x) = \frac{y_2 f}{W}$。 | 牢記公式：$u'(x) = -\frac{y_2 f}{W}$，推導時 $u'$ 項帶負號。 |
| **陷阱 3：積分與化簡失誤** | 積分 $\sec x$ 或三角函數倍角轉換錯誤，導致無法與齊次解合併。 | 熟練基本三角積分公式與和差/倍角恆等式。 |
