---
outline: deep
---

# 0006: 微分運算子法與逆運算子快速求特解 (Differential Operator Method)

> **Context Pointer**: 本文為工程數學第二章「二階常微分方程式」進階速算講義，對應 `docs/engineering-math/second-order/0006-differential-operators.md`。

---

## 🎯 單元學習目標

1. **掌握微分運算子 $D$ 的代數性質**：理解 $D \equiv \frac{d}{dx}$ 的運算規則，並能將高階線性常微分方程式表示為 $L(D)y = r(x)$ 的運算子多項式形式。
2. **熟練四大高效運算子速解定理**：
   - 定理 1（指數代入法則）：$\frac{1}{L(D)} e^{ax} = \frac{1}{L(a)} e^{ax}$（當 $L(a) \neq 0$）。
   - 定理 2（指數位移定理 Exponential Shift）：$\frac{1}{L(D)} [e^{ax} f(x)] = e^{ax} \frac{1}{L(D+a)} f(x)$。
   - 定理 3（三角函數代入法則）：$\frac{1}{L(D^2)} \cos(ax) = \frac{1}{L(-a^2)} \cos(ax)$ 與 $\sin(ax)$（當 $L(-a^2) \neq 0$）。
   - 定理 4（共振分母為零的處理技巧）：利用泰勒展開極限與標準共振公式處理分母為零的狀況。
3. **多項式與運算子逆運算子長除法**：學習利用二項式定理與級數展開（如 $\frac{1}{1-r} = 1 + r + r^2 + \dots$）快速求解多項式右側的特解。
4. **實戰驗證與效率對比**：對比微分運算子法與待定係數法、參數變異法之計算效率，提升工程數學考題的解題速度。

---

## 1. 微分運算子 $D$ 的定義與代數性質

在常微分方程式（ODE）中，為了簡化微商符號與微分方程式的代數運算，我們引入 **微分運算子（Differential Operator）** $D$：

$$\begin{aligned}
D \equiv \frac{d}{dx}, \quad D^2 \equiv \frac{d^2}{dx^2}, \quad \dots, \quad D^n \equiv \frac{d^n}{dx^n}
\end{aligned}$$

### 1.1 線性常微分方程式的運算子表示法
考慮 $n$ 階常係數線性常微分方程式：

$$\begin{aligned}
a_n y^{(n)} + a_{n-1} y^{(n-1)} + \dots + a_1 y' + a_0 y = r(x)
\end{aligned}$$

若利用運算子 $D$ 表示，可寫成：

$$\begin{aligned}
(a_n D^n + a_{n-1} D^{n-1} + \dots + a_1 D + a_0) y = r(x)
\end{aligned}$$

令 $L(D) = a_n D^n + a_{n-1} D^{n-1} + \dots + a_1 D + a_0$，則原方程式可簡潔地寫為：

$$\begin{aligned}
L(D) y = r(x)
\end{aligned}$$

### 1.2 逆運算子（Inverse Operator）定義
相對於微分運算子 $L(D)$，我們定義 **逆運算子** $\frac{1}{L(D)}$：

$$\begin{aligned}
y_p = \frac{1}{L(D)} r(x)
\end{aligned}$$

其物理意義為：尋找一個函數 $y_p$，當它作用了微分運算子 $L(D)$ 後，會還原成右側的激發函數 $r(x)$，即 $L(D) y_p = r(x)$。這提供了一種強大且系統化的代數捷徑來求取特解。

---

## 2. 四大高效運算子速解定理（含證明）

### 2.1 定理 1：指數代入法則 (Exponential Substitution Rule)

$$\begin{aligned}
\frac{1}{L(D)} e^{ax} = \frac{1}{L(a)} e^{ax} \quad (\text{若 } L(a) \neq 0)
\end{aligned}$$

#### 證明：
首先觀察微分運算子作用於指數函數 $e^{ax}$ 的結果：

$$\begin{aligned}
D(e^{ax}) &= a e^{ax} \\
D^2(e^{ax}) &= a^2 e^{ax} \\
&\;\;\vdots \\
D^n(e^{ax}) &= a^n e^{ax}
\end{aligned}$$

因此，當多項式運算子 $L(D) = a_n D^n + \dots + a_1 D + a_0$ 作用於 $e^{ax}$ 時：

$$\begin{aligned}
L(D) e^{ax} &= (a_n D^n + \dots + a_1 D + a_0) e^{ax} \\
&= a_n a^n e^{ax} + \dots + a_1 a e^{ax} + a_0 e^{ax} \\
&= (a_n a^n + \dots + a_1 a + a_0) e^{ax} \\
&= L(a) e^{ax}
\end{aligned}$$

若在兩側同時作用逆運算子 $\frac{1}{L(D)}$ 且假設 $L(a) \neq 0$，即證：

$$\begin{aligned}
\frac{1}{L(D)} e^{ax} = \frac{1}{L(a)} e^{ax}
\end{aligned}$$

---

### 2.2 定理 2：指數位移定理 (Exponential Shift Theorem)

$$\begin{aligned}
\frac{1}{L(D)} [e^{ax} f(x)] = e^{ax} \frac{1}{L(D+a)} f(x)
\end{aligned}$$

#### 證明思路：
利用 Leibniz 產生物則，當 $D$ 作用於乘積 $e^{ax} f(x)$ 時：

$$\begin{aligned}
D[e^{ax} f(x)] = a e^{ax} f(x) + e^{ax} f'(x) = e^{ax}(D + a)f(x)
\end{aligned}$$

推廣至 $D^n$：

$$\begin{aligned}
D^n[e^{ax} f(x)] = e^{ax}(D + a)^n f(x)
\end{aligned}$$

因此任意多項式運算子 $L(D)$ 滿足 $L(D)[e^{ax} f(x)] = e^{ax} L(D+a) f(x)$。左右同乘逆運算子即得位移定理。

---

### 2.3 定理 3：三角函數代入法則 (Trigonometric Substitution Rule)

$$\begin{aligned}
\frac{1}{L(D^2)} \cos(ax) &= \frac{1}{L(-a^2)} \cos(ax) \quad (\text{若 } L(-a^2) \neq 0) \\
\frac{1}{L(D^2)} \sin(ax) &= \frac{1}{L(-a^2)} \sin(ax) \quad (\text{若 } L(-a^2) \neq 0)
\end{aligned}$$

#### 證明思路：
以正弦函數為例，觀察二次微分：

$$\begin{aligned}
D(\sin(ax)) &= a \cos(ax) \\
D^2(\sin(ax)) &= -a^2 \sin(ax) \\
D^4(\sin(ax)) &= (-a^2)^2 \sin(ax)
\end{aligned}$$

因此，若運算子 $L$ 僅包含 $D$ 的偶數次方（即可寫為 $L(D^2)$），作用於 $\sin(ax)$ 或 $\cos(ax)$ 時，可將 $D^2$ 直接代換為 $-a^2$。

---

### 2.4 定理 4：共振分母為零的處理技巧 (Resonance & Taylor Expansion)

當代入數值時導致分母 $L(a) = 0$ 或 $L(-a^2) = 0$（即發生共振現象），運算子公式失效。此時可透過 **極限泰勒展開推導法** 或 **多項式逆運算子長除法** 處理。

#### 1. 泰勒展開極限定理推導：
考慮分母含有因式 $(D^2 + a^2)$ 且右側為 $\cos(ax)$ 的共振情況：

$$\begin{aligned}
y_p = \frac{1}{D^2 + a^2} \cos(ax)
\end{aligned}$$

我們考慮極限與增量 $\Delta$，利用三角恆等式與泰勒展開：

$$\begin{aligned}
y_p &= \lim_{\Delta \to 0} \frac{1}{(D^2 + a^2 + \Delta)} \cos(ax) \\
&= \frac{x}{2a} \sin(ax)
\end{aligned}$$

#### 標準共振公式：
- 若激發函數含於齊次解中（共振），則：
  $$\begin{aligned}
  \frac{1}{D^2 + a^2} \cos(ax) &= \frac{x}{2a} \sin(ax) \\
  \frac{1}{D^2 + a^2} \sin(ax) &= -\frac{x}{2a} \cos(ax)
  \end{aligned}$$

#### 2. 多項式逆運算子長除法 / 二項式展開：
當右側為多項式 $P(x)$ 時，利用二項式定理將 $\frac{1}{L(D)}$ 展開為升冪級數：

$$\begin{aligned}
\frac{1}{1 - r} = 1 + r + r^2 + r^3 + \dots
\end{aligned}$$

由於多項式經過足夠次數的微分後會歸零，因此級數展開僅需保留至對應次數即可。

---

## 3. 課本範例詳細演練（手算對照）

### 3.1 範例 1：共振三角項
求 ODE 之特解：

$$\begin{aligned}
y'' + 9y = \cos(3x)
\end{aligned}$$

#### 解法：
寫成運算子形式：

$$\begin{aligned}
(D^2 + 9) y = \cos(3x) \implies y_p = \frac{1}{D^2 + 9} \cos(3x)
\end{aligned}$$

此時 $a = 3$，代入分母 $L(-a^2) = -3^2 + 9 = 0$，發生共振！應用標準共振公式：

$$\begin{aligned}
y_p = \frac{x}{2(3)} \sin(3x) = \frac{x}{6} \sin(3x)
\end{aligned}$$

---

### 3.2 範例 2：指數與多項式混合
求 ODE 之特解（對應課本第 10 頁）：

$$\begin{aligned}
y'' + 3y' + 2y = e^{-x} (2 - x)
\end{aligned}$$

#### 解法：
運算子形式：

$$\begin{aligned}
(D^2 + 3D + 2) y = e^{-x}(2 - x) \implies (D+1)(D+2)y = e^{-x}(2-x)
\end{aligned}$$

運用指數位移定理（將 $e^{-x}$ 移至前方，$D \to D - 1$）：

$$\begin{aligned}
y_p &= \frac{1}{(D+1)(D+2)} \left[ e^{-x} (2-x) \right] \\
&= e^{-x} \frac{1}{(D-1+1)(D-1+2)} (2-x) \\
&= e^{-x} \frac{1}{D(D+1)} (2-x)
\end{aligned}$$

將分母展開為二項式級數：

$$\begin{aligned}
\frac{1}{D(D+1)} &= \frac{1}{D} (1 + D)^{-1} = \frac{1}{D} (1 - D + D^2 - \dots)
\end{aligned}$$

作用於 $(2 - x)$：

$$\begin{aligned}
y_p &= e^{-x} \frac{1}{D} \left[ (2-x) - (-1) \right] = e^{-x} \frac{1}{D} (3 - x) \\
&= e^{-x} \int (3 - x) dx \\
&= e^{-x} \left( 3x - \frac{1}{2}x^2 \right)
\end{aligned}$$

---

### 3.3 範例 3：指數非共振快速驗證
求 ODE 之特解：

$$\begin{aligned}
y'' + 2y' - 3y = 4e^{2x}
\end{aligned}$$

#### 解法：
運用指數代入法則（$a = 2$）：

$$\begin{aligned}
y_p &= \frac{1}{D^2 + 2D - 3} 4e^{2x} \\
&= \frac{4}{(2)^2 + 2(2) - 3} e^{2x} \\
&= \frac{4}{4 + 4 - 3} e^{2x} \\
&= \frac{4}{5} e^{2x}
\end{aligned}$$

僅需 10 秒即可得出答案，完美驗證待定係數法的計算結果！

---

### 3.4 範例 4：三角非共振
求 ODE 之特解：

$$\begin{aligned}
y'' - 5y' + 6y = -3\sin(2x)
\end{aligned}$$

#### 解法：
運算子形式：

$$\begin{aligned}
y_p = \frac{1}{D^2 - 5D + 6} (-3\sin 2x)
\end{aligned}$$

代入 $D^2 \to -a^2 = -4$：

$$\begin{aligned}
y_p &= \frac{1}{-4 - 5D + 6} (-3\sin 2x) = \frac{1}{2 - 5D} (-3\sin 2x)
\end{aligned}$$

分子分母同乘以 $(2 + 5D)$ 以消去一次微分 $D$：

$$\begin{aligned}
y_p &= \frac{2 + 5D}{(2 - 5D)(2 + 5D)} (-3\sin 2x) \\
&= \frac{2 + 5D}{4 - 25D^2} (-3\sin 2x)
\end{aligned}$$

再次代入 $D^2 \to -4$：

$$\begin{aligned}
4 - 25(-4) = 4 + 100 = 104
\end{aligned}$$

因此：

$$\begin{aligned}
y_p &= \frac{2 + 5D}{104} (-3\sin 2x) = -\frac{3}{104} \left( 2\sin 2x + 5 \cdot 2\cos 2x \right) \\
&= -\frac{3}{104} (2\sin 2x + 10\cos 2x) \\
&= -\frac{15}{52}\cos(2x) - \frac{3}{52}\sin(2x)
\end{aligned}$$

運算過程嚴謹且計算量大幅降低！

---

## 4. 運算子法 vs 待定係數法之效率對比與實戰建議

| 比較維度 | 待定係數法 (Method of Undetermined Coefficients) | 微分運算子法 (Differential Operator Method) |
| :--- | :--- | :--- |
| **核心原理** | 根據激發函數 $r(x)$ 型態猜測特解形式（含待定係數），代回微分方程式求解。 | 將微分方程式轉為代數多項式運算，直接運用逆運算子公式求解。 |
| **優點** | 觀念直觀，適用於標準多項式、指數與三角函數組合。 | 計算極為高效，能將微分運算轉化為代數代入與有理化，特別擅長處理複雜指數與三角組合。 |
| **缺點** | 若激發函數複雜（如多項式乘三角函數），待定係數設值繁瑣，容易因代數聯立方程式算錯。 | 需要熟練四大運算子定理與共振處理技巧，初學者需記憶公式與級數展開。 |
| **實戰建議** | 適用於簡單、低階的常係數 ODE 特解求解。 | **強烈建議在研究所考試與高階工程數學計算中全面採用**，配合指數位移與共振公式可省下 70% 的手算時間。 |
