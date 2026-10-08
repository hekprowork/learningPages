---
outline: deep
---

# 0004: 高階常係數齊次線性 ODE (Higher-Order Linear ODEs with Constant Coefficients)

> **Context Pointer**: 本文為工程數學第二章「二階常微分方程式」核心講義之延伸（高階推廣），對應 `docs/engineering-math/second-order/0004-higher-order-linear-odes.md`。

---

## 🎯 單元學習目標

1. 理解高階常係數齊次線性 ODE 的標準形式與代數基本定理在特徵方程上的應用。
2. 掌握四種特徵根情況（相異實根、多重實根、單一複數根對、多重複數根對）所對應的線性獨立基底解與通解結構。
3. 熟練因式分解技巧（綜合除法、一次因式檢驗法）以求解高階特徵多項式。
4. 透過四大經典範例（三階、四階）之完整手算與回代驗算，建立扎實的解題能力。

---

## 1. $n$ 階常係數齊次線性 ODE 標準形式

### 1.1 標準方程與特徵多項式
考慮 $n$ 階常係數齊次線性常微分方程式：
$$y^{(n)} + a_{n-1}y^{(n-1)} + \dots + a_1 y' + a_0 y = 0$$
其中係數 $a_0, a_1, \dots, a_{n-1}$ 為實數常數。

假設其解的形式為 $y = e^{\lambda x}$，代入方程式中可得其**特徵多項式 (Characteristic Polynomial)**：
$$P(\lambda) = \lambda^n + a_{n-1}\lambda^{n-1} + \dots + a_1 \lambda + a_0 = 0$$

### 1.2 代數基本定理與根的結構
根據**代數基本定理 (Fundamental Theorem of Algebra)**，任意 $n$ 次多項式方程在複數域中恰有 $n$ 個根（計入重數）。若特徵方程的根完全求出，即可建構出對應的 $n$ 個線性獨立基底解，從而寫出通解。

---

## 2. 四大特徵根情況與對應基底解規則

根據特徵方程式 $P(\lambda) = 0$ 的根之性質，可將解的型態分為四大類：

### Case 1: 相異實根 ($\lambda_1, \lambda_2, \dots, \lambda_n$)
若特徵方程有 $n$ 個相異實根，則對應的 $n$ 個線性獨立基底解為：
$$e^{\lambda_1 x}, e^{\lambda_2 x}, \dots, e^{\lambda_n x}$$
通解為：
$$y = c_1 e^{\lambda_1 x} + c_2 e^{\lambda_2 x} + \dots + c_n e^{\lambda_n x}$$

### Case 2: 多重實根（重數為 $k$ 之實根 $\lambda\））
若實根 \(\lambda$的重數為$k$，則它對應的$k$ 個線性獨立基底解為：
$$e^{\lambda x}, x e^{\lambda x}, x^2 e^{\lambda x}, \dots, x^{k-1} e^{\lambda x}$$

### Case 3: 單一對共軛複數根 ($\lambda = \alpha \pm i\beta$)
若特徵方程有一對共軛複數根 $\alpha \pm i\beta$（$\beta > 0$），則對應的 2 個線性獨立基底解為：
$$e^{\alpha x}\cos(\beta x), \quad e^{\alpha x}\sin(\beta x)$$

### Case 4: 多重共軛複數根（重數為 $k$ 之複數根 $\lambda = \alpha \pm i\beta\））
若共軛複數根對 \(\alpha \pm i\beta$的重數為$k$，則對應的$2k$ 個線性獨立解為：
$$e^{\alpha x}\cos\beta x, \; e^{\alpha x}\sin\beta x, \; x e^{\alpha x}\cos\beta x, \; x e^{\alpha x}\sin\beta x, \; \dots, \; x^{k-1}e^{\alpha x}\cos\beta x, \; x^{k-1}e^{\alpha x}\sin\beta x$$

---

## 3. 課本經典範例完整手算（逐題解析）

### 範例 1：三階相異實根
**題目**：求解 $y''' + 6y'' + 11y' + 6y = 0$

**解析**：
1. 寫出特徵方程式：
   $$\lambda^3 + 6\lambda^2 + 11\lambda + 6 = 0$$
2. 利用因式分解（一次因式檢驗法，常數項 6 的因式為 $\pm 1, \pm 2, \pm 3$，代入 $\lambda = -1$ 得 $-1 + 6 - 11 + 6 = 0$，故 $(\lambda+1)$ 為因式）：
   $$(\lambda + 1)(\lambda + 2)(\lambda + 3) = 0$$
3. 特徵根為 $\lambda_1 = -1, \lambda_2 = -2, \lambda_3 = -3$（均為相異實根）。
4. 故通解為：
   $$y = c_1 e^{-x} + c_2 e^{-2x} + c_3 e^{-3x}$$

---

### 範例 2：三階三重實根
**題目**：求解 $y''' + 3y'' + 3y' + y = 0$

**解析**：
1. 寫出特徵方程式：
   $$\lambda^3 + 3\lambda^2 + 3\lambda + 1 = 0$$
2. 注意到左式為完全立方公式：
   $$(\lambda + 1)^3 = 0$$
3. 特徵根為 $\lambda = -1$（重數 $k = 3$）。
4. 根據多重根規則，對應的三個基底解為 $e^{-x}, x e^{-x}, x^2 e^{-x}$。
5. 故通解為：
   $$y = (c_1 + c_2 x + c_3 x^2)e^{-x}$$

---

### 範例 3：四階混合根（含重根與相異根）
**題目**：求解 $y^{(4)} + 7y''' + 17y'' + 17y' + 6y = 0$

**解析**：
1. 寫出特徵方程式：
   $$\lambda^4 + 7\lambda^3 + 17\lambda^2 + 17\lambda + 6 = 0$$
2. 進行因式分解：
   試根 $\lambda = -1$: $(-1)^4 + 7(-1)^3 + 17(-1)^2 + 17(-1) + 6 = 1 - 7 + 17 - 17 + 6 = 0$（根成立）。
   使用綜合除法降冪後，可分解為：
   $$(\lambda + 1)^2 (\lambda + 2)(\lambda + 3) = 0$$
3. 特徵根分析：
   - $\lambda = -1$（重數 $k = 2$）
   - $\lambda = -2$（單根）
   - $\lambda = -3$（單根）
4. 故通解為：
   $$y = (c_1 + c_2 x)e^{-x} + c_3 e^{-2x} + c_4 e^{-3x}$$

---

### 範例 4：四階重共軛複根
**題目**：求解 $y^{(4)} + 4y''' + 8y'' + 8y' + 4y = 0$

**解析**：
1. 寫出特徵方程式：
   $$\lambda^4 + 4\lambda^3 + 8\lambda^2 + 8\lambda + 4 = 0$$
2. 觀察係數對稱與多項式結構，可配方分解為：
   $$(\lambda^2 + 2\lambda + 2)^2 = 0$$
3. 求解內層二次方程式 $\lambda^2 + 2\lambda + 2 = 0$，由公式解得：
   $$\lambda = \frac{-2 \pm \sqrt{4 - 8}}{2} = -1 \pm i$$
   因此，特徵根為 $\lambda = -1 \pm i$，其重數均為 $k = 2$（即複數根對的重數為 2）。
4. 根據多重共軛複根規則（$\alpha = -1, \beta = 1, k = 2$），對應的 4 個基底解為：
   $$e^{-x}\cos x, \quad e^{-x}\sin x, \quad x e^{-x}\cos x, \quad x e^{-x}\sin x$$
5. 故通解為：
   $$y = e^{-x} \left[ (c_1 + c_2 x)\cos x + (c_3 + c_4 x)\sin x \right]$$

---

## 4. 因式分解技巧與防呆檢驗

在處理高階常係數 ODE 時，特徵多項式的因式分解是成敗關鍵：
1. **一次因式檢驗法 (Rational Root Theorem)**：若整係數多項式 $a_n \lambda^n + \dots + a_0 = 0$ 有有理根 $p/q$，則 $p$ 必為常數項 $a_0$ 之因式，$q$ 必為主係數 $a_n$ 之因式。
2. **綜合除法 (Synthetic Division)**：一旦找到根 $\lambda = r$，應立即使用綜合除法將多項式降冪，避免計算錯誤。
3. **回代驗算檢查**：求出通解後，可隨機選取特徵項代回原微分方程式，或檢查獨立基底數是否與方程式階數 $n$ 嚴格相符，確保無漏根或重數計算錯誤。
