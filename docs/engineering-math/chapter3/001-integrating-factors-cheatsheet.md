# 001: 一階 ODE 積分因子與正合法速查卡 (Integrating Factors Cheatsheet)

> 標準微分形式：$M(x, y)\,dx + N(x, y)\,dy = 0$ 核心公式與速查表

## 一、 正合性判定 (Euler Test)

$$\text{若 } \frac{\partial M}{\partial y} = \frac{\partial N}{\partial x} \implies \text{正合 (Exact)}$$

此時必存在勢函數 $\phi(x, y)$ 使得：

$$d\phi = \frac{\partial \phi}{\partial x}\,dx + \frac{\partial \phi}{\partial y}\,dy = M\,dx + N\,dy = 0 \implies \phi(x, y) = C$$

---

## 二、 單變數積分因子速查表

| 型態 | 檢驗條件 / 判別式 | 積分因子 $\mu$ 公式 | 記憶口訣 |
| :--- | :--- | :--- | :--- |
| **純 $x$ 函數 $\mu(x)$** | $\frac{1}{N}\left(\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x}\right) = f(x)$ | $\mu(x) = e^{\int f(x)\,dx}$ | 除以右項 $N$，分子左偏減右偏 ($M_y - N_x$)，消去後純為 $x$ |
| **純 $y$ 函數 $\mu(y)$** | $\frac{1}{M}\left(\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y}\right) = g(y)$ | $\mu(y) = e^{\int g(y)\,dy}$ | 除以左項 $M$，分子右偏減左偏 ($N_x - M_y$)，消去後純為 $y$ |
| **乘積函數 $\mu(u), u=xy$** | $\frac{M_y - N_x}{xN - yM} = h(u)$ | $\mu(u) = e^{\int h(u)\,du}$ | 交叉項組合判定，若僅為 $u = xy$ 函數即可套用 |

---

## 三、 高頻常見微分分組 (湊微分速解表)

在面對特定題目時，直接辨識以下微分全微分項可免去繁複的偏微分計算：

| 微分原形 | 展開式 | 常用積分因子 / 乘數 | 典型適用型態 |
| :--- | :--- | :--- | :--- |
| **$d(xy)$** | $x\,dy + y\,dx$ | $1$ (直接正合) | $x\,dy + y\,dx + \dots = 0$ |
| **$d\left(\frac{y}{x}\right)$** | $\frac{x\,dy - y\,dx}{x^2}$ | $\frac{1}{x^2}$ | $x\,dy - y\,dx = 0$ |
| **$d\left(\frac{x}{y}\right)$** | $\frac{y\,dx - x\,dy}{y^2}$ | $\frac{1}{y^2}$ | $y\,dx - x\,dy = 0$ |
| **$d\left(\arctan\frac{y}{x}\right)$** | $\frac{x\,dy - y\,dx}{x^2 + y^2}$ | $\frac{1}{x^2 + y^2}$ | $(x\,dy - y\,dx) + f(x^2+y^2)\dots$ |
| **$d\left(\frac{1}{2}\ln(x^2+y^2)\right)$** | $\frac{x\,dx + y\,dy}{x^2 + y^2}$ | $\frac{1}{x^2 + y^2}$ | $x\,dx + y\,dy = \frac{1}{2}d(x^2+y^2)$ |
| **$d(\ln(xy))$** | $\frac{dx}{x} + \frac{dy}{y} = \frac{y\,dx + x\,dy}{xy}$ | $\frac{1}{xy}$ | 對稱雙倒數結構 |

---

## 四、 待定係數型積分因子 $\mu = x^m y^n$

當方程式型如：

$$x^\alpha y^\beta (p y\,dx + q x\,dy) + x^\gamma y^\delta (r y\,dx + s x\,dy) = 0$$

解題 SOP：
1. **設定形式**：假設積分因子為 $\mu(x, y) = x^m y^n$。
2. **乘入原式**：全式同乘 $\mu$，將各項係數整理為新多項式。
3. **正合條件列式**：令 $\frac{\partial (\mu M)}{\partial y} = \frac{\partial (\mu N)}{\partial x}$。
4. **係數對照**：比較 $x$ 與 $y$ 的次方係數，建立 $m$ 與 $n$ 的二元一次聯立方程組並求解。
