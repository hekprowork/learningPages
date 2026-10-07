---
outline: deep
---

# 0002: 線性獨立、朗斯基行列式與齊次通解結構 (Linear Independence & Wronskian)
> **Context Pointer**: 本文為工程數學第二章「二階常微分方程式」核心講義，對應 `docs/engineering-math/second-order/0002-linear-independence-wronskian.md`。

---

## 🎯 單元學習目標
1. 掌握函數與微分方程解之**線性相關 (Linearly Dependent)** 與 **線性獨立 (Linearly Independent)** 之嚴格定義。
2. 理解 **朗斯基行列式 (Wronskian)** 的數學定義及其在判定二階齊次線性 ODE 解之獨立性上的核心應用。
3. 深入理解 **Abel 恆等式 (Abel's Formula)** 與 Wronskian 處處為零或處處不為零的內在幾何與物理意涵。
4. 學習 **基本解系 (Fundamental System of Solutions)** 定理及其透過 Cramer's Rule 的代數推導與完整證明。
5. 掌握非齊次線性 ODE 的通解結構定理：$y(x) = y_h(x) + y_p(x)$。

---

## 1. 函數的線性相關與線性獨立定義

考慮定義在區間 \(I\) 上的兩個函數 \(y_1(x)\) 與 \(y_2(x)\)。

### 1.1 線性相關 (Linearly Dependent)
若存在不全為零的常數 \(k_1\) 與 \(k_2\)（即 \(k_1^2 + k_2^2 \neq 0\)），使得對區間 \(I\) 上的所有 \(x\)，恆有：
$$k_1 y_1(x) + k_2 y_2(x) = 0$$
則稱函數 \(y_1\) 與 \(y_2\) 在區間 \(I\) 上是**線性相關 (Linearly Dependent)**。

> **幾何與代數直觀**：
> 若 \(k_1 \neq 0\)，則可寫為 \(y_1 = -\frac{k_2}{k_1} y_2 = c y_2\)。這意味著兩函數成正比，其圖形在幾何上是線性相依的（例如一維子空間）。

### 1.2 線性獨立 (Linearly Independent)
若函數 \(y_1\) 與 \(y_2\) 在區間 \(I\) 上**不是**線性相關，則稱其為**線性獨立 (Linearly Independent)**。
換句話說：方程式 \(k_1 y_1(x) + k_2 y_2(x) = 0\) 僅在 \(k_1 = 0\) 且 \(k_2 = 0\) 時才對所有 \(x \in I\) 成立。

---

## 2. 朗斯基行列式 (Wronskian Test) 判定定理

為了方便在實際應用中檢驗一組解是否線性獨立，我們引入由數學家 Józef Hoene-Wronski 提出的 **朗斯基行列式 (Wronskian)**。

### 2.1 定義
設 \(y_1(x)\) 與 \(y_2(x)\) 在區間 \(I\) 上具備一階導函數，則其 **Wronskian** 定義為二階行列式：
$$W(y_1, y_2)(x) = \begin{vmatrix} y_1 & y_2 \\ y_1' & y_2' \end{vmatrix} = y_1 y_2' - y_1' y_2$$

### 2.2 Wronskian 判定定理
考慮二階齊次線性常微分方程式：
$$y'' + p(x)y' + q(x)y = 0$$
若 \(y_1(x)\) 與 \(y_2(x)\) 為此方程式在區間 \(I\) 上的兩個解，則：
* \(y_1\) 與 \(y_2\) 在區間 \(I\) 上**線性獨立** \(\iff W(y_1, y_2)(x) \neq 0\)（對所有 \(x \in I\) 成立，或在區間內任一點不為零）。
* 若 \(W(y_1, y_2)(x) = 0\)（對所有 \(x \in I\)），則 \(y_1\) 與 \(y_2\) 在區間 \(I\) 上**線性相關**。

### 2.3 Abel 恆等式 (Abel's Formula)
為什麼 Wronskian 要麼處處為 0，要麼處處不為 0？這可以透過 **Abel 恆等式** 來解釋：
$$W(x) = W(x_0) \exp\left( -\int_{x_0}^x p(t) dt \right)$$
由於指數函數 \(\exp(\cdot)\) 永遠大於 0，因此 \(W(x)\) 的正負號或是否為零完全由初始點 \(W(x_0)\) 決定。這說明了若在某點 \(x_0\) 處 \(W(x_0) \neq 0\)，則在整個區間 \(I\) 上皆有 \(W(x) \neq 0\)。

---

## 3. 齊次通解與基本解系定理 (Fundamental System of Solutions)

### 3.1 基本解系定理
若 \(y_1(x)\) 與 \(y_2(x)\) 是二階齊次線性 ODE \(y'' + p(x)y' + q(x)y = 0\) 的兩個**線性獨立解**，則：
$$y(x) = c_1 y_1(x) + c_2 y_2(x)$$
為該微分方程式的 **通解 (General Solution)**，其中 \(c_1, c_2\) 為任意常數。任何滿足給定初始條件的特解皆可由此表達。

### 3.2 初始條件與 Cramer's Rule 完整推導
給定初始條件：
$$y(x_0) = y_0, \quad y'(x_0) = y_0'$$
我們希望尋找常數 \(c_1\) 與 \(c_2\) 使得：
$$\begin{cases} c_1 y_1(x_0) + c_2 y_2(x_0) = y_0 \\ c_1 y_1'(x_0) + c_2 y_2'(x_0) = y_0' \end{cases}$$

將其寫成矩陣形式：
$$\begin{pmatrix} y_1(x_0) & y_2(x_0) \\ y_1'(x_0) & y_2'(x_0) \end{pmatrix} \begin{pmatrix} c_1 \\ c_2 \end{pmatrix} = \begin{pmatrix} y_0 \\ y_0' \end{pmatrix}$$

利用 **Cramer's Rule（克拉瑪公式）** 求解 \(c_1\) 與 \(c_2\)：
* 分母即為該點的 Wronskian：
  $$D = \begin{vmatrix} y_1(x_0) & y_2(x_0) \\ y_1'(x_0) & y_2'(x_0) \end{vmatrix} = W(y_1, y_2)(x_0)$$
* 根據前提，\(y_1\) 與 \(y_2\) 線性獨立，故 \(W(x_0) \neq 0\)。因此分母不為零，保證了 \(c_1\) 與 \(c_2\) 具有唯一解：
  $$c_1 = \frac{\begin{vmatrix} y_0 & y_2(x_0) \\ y_0' & y_2'(x_0) \end{vmatrix}}{W(x_0)}, \quad c_2 = \frac{\begin{vmatrix} y_1(x_0) & y_0 \\ y_1'(x_0) & y_0' \end{vmatrix}}{W(x_0)}$$

此代數推導完美說明了為什麼兩個線性獨立的解足以構成二階 ODE 的通解核心。

---

## 4. 非齊次通解結構定理

考慮非齊次線性常微分方程式：
$$y'' + p(x)y' + q(x)y = r(x) \quad (r(x) \neq 0)$$

### 4.1 定理：通解結構
非齊次方程式的通解 \(y(x)\) 可表示為 **齊次通解 \(y_h(x)\)** 與 **任意一特定解 \(y_p(x)\)** 之和：
$$y(x) = y_h(x) + y_p(x) = c_1 y_1(x) + c_2 y_2(x) + y_p(x)$$

### 4.2 減法差值證明
設 \(\phi(x)\) 與 \(y_p(x)\) 皆為該非齊次方程式的解，即：
$$\phi'' + p\phi' + q\phi = r(x)$$
$$y_p'' + py_p' + qy_p = r(x)$$

兩式相減，令 \(Y = \phi - y_p\)：
$$( \phi'' - y_p'' ) + p( \phi' - y_p' ) + q( \phi - y_p ) = 0 \implies Y'' + pY' + qY = 0$$

這證明了 \(\phi - y_p\) 滿足對應的 **齊次方程式**，因此 \(\phi - y_p = y_h = c_1 y_1 + c_2 y_2\)，故：
$$\phi(x) = y_h(x) + y_p(x)$$
證畢。

---

## 5. 課本範例演練

### 範例 1：三角函數的 Wronskian 檢驗
檢驗 \(y_1 = \cos x\) 與 \(y_2 = \sin x\) 在 \(\mathbb{R}\) 上的線性獨立性。
* 計算導數：\(y_1' = -\sin x\)，\(y_2' = \cos x\)。
* 代入 Wronskian 公式：
  $$W(\cos x, \sin x) = \begin{vmatrix} \cos x & \sin x \\ -\sin x & \cos x \end{vmatrix} = (\cos x)(\cos x) - (\sin x)(-\sin x) = \cos^2 x + \sin^2 x = 1$$
* 結論：因為 \(W = 1 \neq 0\) 處處成立，故 \(\cos x\) 與 \(\sin x\) **線性獨立**，可構成常係數齊次 ODE（如 \(y'' + y = 0\)）的基本解系。

### 範例 2：指數函數的 Wronskian 檢驗
檢驗 \(y_1 = e^{\lambda_1 x}\) 與 \(y_2 = e^{\lambda_2 x}\)（其中 \(\lambda_1 \neq \lambda_2\)）的線性獨立性。
* 計算導數：\(y_1' = \lambda_1 e^{\lambda_1 x}\)，\(y_2' = \lambda_2 e^{\lambda_2 x}\)。
* 代入 Wronskian 公式：
  $$W = \begin{vmatrix} e^{\lambda_1 x} & e^{\lambda_2 x} \\ \lambda_1 e^{\lambda_1 x} & \lambda_2 e^{\lambda_2 x} \end{vmatrix} = \lambda_2 e^{\lambda_1 x} e^{\lambda_2 x} - \lambda_1 e^{\lambda_1 x} e^{\lambda_2 x} = (\lambda_2 - \lambda_1) e^{(\lambda_1 + \lambda_2)x}$$
* 結論：當 \(\lambda_1 \neq \lambda_2\) 時，\(W \neq 0\) 處處成立，故兩指數函數**線性獨立**。

---

## 6. 核心總結與速查卡

| 概念項目 | 數學表達式 / 核心判定 | 關鍵性質 |
| :--- | :--- | :--- |
| **線性相關** | \(k_1 y_1 + k_2 y_2 = 0\) （\(k_1, k_2\) 不全為 0） | 函數成正比或線性相依 |
| **線性獨立** | \(k_1 y_1 + k_2 y_2 = 0 \implies k_1=k_2=0\) | 無法互相線性表示 |
| **朗斯基行列式** | \(W = y_1 y_2' - y_1' y_2\) | \(W \neq 0 \iff\) 線性獨立 |
| **Abel 恆等式** | \(W(x) = W(x_0) e^{-\int p(t)dt}\) | Wronskian 決定性不變號 |
| **齊次通解** | \(y_h = c_1 y_1 + c_2 y_2\) | 依賴基本解系與初始條件 |
| **非齊次通解** | \(y = y_h + y_p\) | 齊次通解加上任意特解 |
