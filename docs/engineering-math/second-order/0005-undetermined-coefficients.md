---
outline: deep
---

# 0005: 待定係數法與共振修正規則 (Method of Undetermined Coefficients)
> **Context Pointer**: 本文為工程數學第二章「二階常微分方程式」核心講義，對應 `docs/engineering-math/second-order/0005-undetermined-coefficients.md`。

---

## 🎯 單元學習目標
1. 掌握**待定係數法 (Method of Undetermined Coefficients)** 的核心原理與適用範圍（常係數線性 ODE 且非齊次項具有有限維導數閉包特徵）。
2. 熟悉課本歸納之 **9 大基本型態假設對照表**，並特別注意三角函數型態必須正弦與餘弦並存。
3. 深入理解 **共振修正規則 (Modification / Multiplication Rule)**：當假設項與齊次解重複時如何乘以 $x^k$ 修正。
4. 透過經典例題的逐步演練與防錯警示，建立嚴謹的解題 SOP。

---

## 1. 待定係數法核心理念

對於**常係數線性非齊次常微分方程式**：
$$y'' + p y' + q y = r(x)$$

其通解結構為：
$$y(x) = y_h(x) + y_p(x)$$
其中 $y_h(x)$ 為對應齊次方程式 ($r(x) = 0$) 的通解，而 $y_p(x)$ 為非齊次方程式的一個特解 (Particular Solution)。

* **適用範圍**：非齊次項 $r(x)$ 必須是**多項式、指數函數、正弦/餘弦函數，或其有限次和與乘積**。這些函數具有一個重要特徵：**經多次微分後，其導數仍然停留在相同的函數空間中（有限維導數閉包特徵）**。

---

## 2. 基本型態假設對照表

對應課本第 5 頁所列之 9 大基本型態，當 $r(x)$ 為特定函數時，$y_p(x)$ 的標準假設型態如下：

| 編號 | 非齊次項 $r(x)$ | 特解 $y_p(x)$ 假設型態 | 備註說明 |
| :---: | :--- | :--- | :--- |
| **1** | $e^{\beta x}$ | $k e^{\beta x}$ | 指數型 |
| **2** | $\cos(\beta x)$ | $k_1 \cos(\beta x) + k_2 \sin(\beta x)$ | **正弦與餘弦必須兩者並存！** |
| **3** | $\sin(\beta x)$ | $k_1 \cos(\beta x) + k_2 \sin(\beta x)$ | 同上 |
| **4** | $P_n(x) = a_n x^n + \dots + a_1 x + a_0$ | $K_n x^n + \dots + K_1 x + K_0$ | $n$ 次多項式 |
| **5** | $e^{\alpha x} \cos(\beta x)$ | $e^{\alpha x} [k_1 \cos(\beta x) + k_2 \sin(\beta x)]$ | 指數與三角相乘 |
| **6** | $e^{\alpha x} \sin(\beta x)$ | $e^{\alpha x} [k_1 \cos(\beta x) + k_2 \sin(\beta x)]$ | 同上 |
| **7** | $x^n e^{\alpha x} \cos(\beta x)$ | $(K_n x^n + \dots + K_0) e^{\alpha x} [k_1 \cos(\beta x) + k_2 \sin(\beta x)]$ | 多項式、指數與三角綜合 |
| **8** | $x^n e^{\alpha x} \sin(\beta x)$ | $(K_n x^n + \dots + K_0) e^{\alpha x} [k_1 \cos(\beta x) + k_2 \sin(\beta x)]$ | 同上 |
| **9** | $x^n e^{\alpha x}$ | $(K_n x^n + \dots + K_1 x + K_0) e^{\alpha x}$ | 多項式與指數相乘 |

> [!IMPORTANT]
> **為什麼純 $\cos(\beta x)$ 假設 $y_p$ 必須包含 $\sin(\beta x)$？**
> 因為三角函數經過微分後會在正弦與餘弦之間轉換（$\sin' = \cos$, $\cos' = -\sin$）。若只假設單一項，代入方程式後無法與 $r(x)$ 匹配消去。

---

## 3. 關鍵修正規則：共振修正法則 (Modification Rule)

* **核心法則**：
  > 「如果 $y_p$ 假設項中有任何一項與齊次解 $y_h$ 相同，則必須將該重複部分乘以 $x$（若仍重複則再乘以 $x$，即乘以 $x^k$，其中 $k$ 為該特徵根之重數），直到無任何重複項為止。」

* **算錯警示與共振現象（課本 P7-8 實例）**：
  - **非共振對照**：考慮 $y'' - 2y' - 3y = 8e^x$，其特徵方程式為 $\lambda^2 - 2\lambda - 3 = (\lambda - 3)(\lambda + 1) = 0$，齊次解為：
    $$y_h = c_1 e^{3x} + c_2 e^{-x}$$
    此時非齊次項為 $8e^x$（指數根 $\beta = 1$），與 $y_h$ 無關。假設 $y_p = a e^x$ 代入可順利求得 $a = -2$。
  - **共振發生**：若方程式改為 $y'' - 2y' - 3y = 8e^{3x}$，其特徵根為 $\lambda = 3, -1$。
    若我們**錯誤地**假設 $y_p = a e^{3x}$，代入原式左邊會得到：
    $$(9a e^{3x}) - 2(3a e^{3x}) - 3(a e^{3x}) = (9 - 6 - 3) a e^{3x} = 0$$
    得到 $0 = 8e^{3x}$ 的矛盾！這就是**共振 (Resonance)** 現象。
  - **正確修正**：因為 $e^{3x}$ 已存在於 $y_h$ 中，必須乘以 $x$ 修正，改設：
    $$y_p = a x e^{3x}$$
    代入即可正確求出 $a$。

---

## 4. 課本範例詳細演練

### 範例 1：多項式非齊次項
**求解**：$y'' - 4y = 8x^2 - 2x$
1. **求齊次解 $y_h$**：
   特徵方程式：$\lambda^2 - 4 = 0 \implies \lambda = \pm 2$。
   $$y_h = c_1 e^{2x} + c_2 e^{-2x}$$
2. **設特解 $y_p$**：
   右側為二次多項式，設 $y_p = ax^2 + bx + c$。
   $$\begin{aligned}
   y_p' &= 2ax + b \\
   y_p'' &= 2a
   \end{aligned}$$
3. **代入原式**：
   $$(2a) - 4(ax^2 + bx + c) = 8x^2 - 2x$$
   $$-4ax^2 - 4bx + (2a - 4c) = 8x^2 - 2x$$
   比較係數：
   - $x^2$ 項：$-4a = 8 \implies a = -2$
   - $x$ 項：$-4b = -2 \implies b = \frac{1}{2}$
   - 常數項：$2a - 4c = 0 \implies 2(-2) - 4c = 0 \implies c = -1$
   $$y_p = -2x^2 + \frac{1}{2}x - 1$$
4. **寫出通解**：
   $$y = c_1 e^{2x} + c_2 e^{-2x} - 2x^2 + \frac{1}{2}x - 1$$

---

### 範例 2：指數型（非共振）
**求解**（對應課本 P6）：$y'' + 2y' - 3y = 4e^{2x}$
1. **求齊次解 $y_h$**：
   特徵方程式：$\lambda^2 + 2\lambda - 3 = (\lambda + 3)(\lambda - 1) = 0 \implies \lambda = 1, -3$。
   $$y_h = c_1 e^{3x} + c_2 e^{-x} \quad (\text{註：或寫成 } c_1 e^x + c_2 e^{-3x} \text{ 依特徵根而定})$$
   *(依課本 P6 範例：特徵根 $\lambda = 1, -3$，故 $y_h = c_1 e^x + c_2 e^{-3x}$)*
2. **設特解 $y_p$**：
   右側為 $4e^{2x}$，指數 $\beta = 2$ 非特徵根，設 $y_p = a e^{2x}$。
   $$\begin{aligned}
   y_p' &= 2a e^{2x} \\
   y_p'' &= 4a e^{2x}
   \end{aligned}$$
3. **代入原式**：
   $4a e^{2x} + 2(2a e^{2x}) - 3(a e^{2x}) = 4e^{2x}$
   $$(4 + 4 - 3)a e^{2x} = 5a e^{2x} = 4e^{2x} \implies a = \frac{4}{5}$$
   $$y_p = \frac{4}{5} e^{2x}$$

---

### 範例 3：三角函數型
**求解**：$y'' + 5y' + 6y = -3\sin(2x)$
1. **求齊次解 $y_h$**：
   特徵方程式：$\lambda^2 + 5\lambda + 6 = (\lambda + 2)(\lambda + 3) = 0 \implies \lambda = -2, -3$。
   $$y_h = c_1 e^{-2x} + c_2 e^{-3x}$$
2. **設特解 $y_p$**：
   設 $y_p = k_1 \cos(2x) + k_2 \sin(2x)$。
   $$\begin{aligned}
   y_p' &= -2k_1 \sin(2x) + 2k_2 \cos(2x) \\
   y_p'' &= -4k_1 \cos(2x) - 4k_2 \sin(2x)
   \end{aligned}$$
3. **代入原式並比較係數**：
   $$\begin{aligned}
   [-4k_1 \cos(2x) - 4k_2 \sin(2x)] &+ 5[-2k_1 \sin(2x) + 2k_2 \cos(2x)] \\
   &+ 6[k_1 \cos(2x) + k_2 \sin(2x)] = -3\sin(2x)
   \end{aligned}$$
   整理 $\cos(2x)$ 與 $\sin(2x)$ 係數：
   - $\cos(2x)$：$-4k_1 + 10k_2 + 6k_1 = 2k_1 + 10k_2 = 0 \implies k_1 = -5k_2$
   - $\sin(2x)$：$-4k_2 - 10k_1 + 6k_2 = 2k_2 - 10k_1 = -3$
   代入 $k_1 = -5k_2$：
   $$2k_2 - 10(-5k_2) = 52k_2 = -3 \implies k_2 = -\frac{3}{52}, \quad k_1 = \frac{15}{52}$$
   $$y_p = \frac{15}{52}\cos(2x) - \frac{3}{52}\sin(2x)$$

---

### 範例 4：共振型（乘 $x$ 修正）
**求解**（對應課本 P7）：$y'' - 2y' - 3y = 8e^x$
1. **求齊次解 $y_h$**：
   特徵根 $\lambda = 3, -1 \implies y_h = c_1 e^{3x} + c_2 e^{-x}$。
   *(註：若原題為 $y'' + 2y' - 3y = 8e^x$，特徵根為 $\lambda = 1, -3$，非齊次項 $8e^x$ 中的 $e^x$ 與 $y_h$ 中的 $e^x$ 重複，發生共振！)*
2. **修正假設**：
   原應設 $y_p = a e^x$，因與 $y_h$ 重複，改設：
   $$y_p = a x e^x$$
   $$\begin{aligned}
   y_p' &= a e^x + a x e^x = (a + ax)e^x \\
   y_p'' &= a e^x + (a + ax)e^x = (2a + ax)e^x
   \end{aligned}$$
3. **代入原式**：
   若方程式為 $y'' - 2y' - 3y = 8e^x$（此處以課本 P7 為準）：
   課本算式：$y'' + 2y' - 3y = 8e^x$，特徵根 $\lambda = 1, -3$。
   代入 $y_p = a x e^x$：
   $[(2a + ax)e^x] + 2[(a + ax)e^x] - 3[ax e^x] = 8e^x$
   $(2a + 2a)e^x + (a + 2a - 3a)x e^x = 4a e^x = 8e^x \implies a = 2$
   $$y_p = 2x e^x$$

---

## 5. 解題 SOP、小結與極限思考

### 💡 解題標準作業流程 (SOP)
1. **Step 1**：求解對應之齊次方程式 $y_h(x)$，列出所有特徵根。
2. **Step 2**：觀察非齊次項 $r(x)$，對照 **9 大基本型態表** 初步假設 $y_p(x)$。
3. **Step 3**（關鍵）：比對 $y_p$ 各項與 $y_h$ 是否有重複？若有，套用**共振修正規則**乘以 $x^k$。
4. **Step 4**：將修正後的 $y_p$ 微分並代回原 ODE，利用係數比較法求解未知常數。
5. **Step 5**：組合總通解 $y = y_h + y_p$。

> [!TIP]
> **為什麼待定係數法容易算錯？**
> 待定係數法雖然直觀，但在處理高階或複雜乘積型態時，微分計算繁瑣且容易因代數展開失誤而算錯。因此，進階方法如**微分運算子法 (Differential Operator)** 或**參數變異法 (Variation of Parameters)** 是強而有力的驗證工具與替代方案。
