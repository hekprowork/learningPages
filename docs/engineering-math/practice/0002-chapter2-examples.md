---
title: Chapter 2 互動式範例與精選題庫
description: 工程數學第二章 二階與高階常微分方程式 (Second-Order & Higher ODEs) 互動題庫、範例解說與詳細推導
---

# 互動式範例與精選題庫：Chapter 2 二階與高階常微分方程式 (Second-Order & Higher ODEs)

> 常係數齊次線性 ODE、待定係數法、微分運算子、參數變異法、柯西－尤拉方程與降階法經典題解

::: details 核心解題觀念與公式速記
- **二階常係數齊次 ODE**：$y'' + a y' + b y = 0$，特徵方程 $\lambda^2 + a\lambda + b = 0$：
  - 相異實根 $\lambda_1 \neq \lambda_2$：$y = C_1 e^{\lambda_1 x} + C_2 e^{\lambda_2 x}$
  - 實數重根 $\lambda_1 = \lambda_2 = \lambda$：$y = e^{\lambda x}(C_1 + C_2 x)$
  - 共軛複數根 $\lambda = \alpha \pm i\beta$：$y = e^{\alpha x}[C_1 \cos(\beta x) + C_2 \sin(\beta x)]$
- **待定係數法 (Undetermined Coefficients)**：針對多項式、指數、正餘弦非齊次項設定特解型態。若非齊次項與齊次解同頻（共振），需乘上 $x^k$ 修正。
- **參數變異法 (Variation of Parameters)**：對任意非齊次項 $r(x)$，特解為 $y_p = -y_1 \int \frac{y_2 r}{W}\,dx + y_2 \int \frac{y_1 r}{W}\,dx$。
- **柯西－尤拉方程式 (Euler-Cauchy Equation)**：$x^2 y'' + A x y' + B y = 0$，透過令 $x = e^t$ 化為常係數微分方程求解。
- **降階法 (Reduction of Order)**：已知齊次解 $y_1(x)$，設 $y_2 = u(x) y_1(x)$，代入原式即可降階為一階 ODE 求解 $u'(x)$。
:::

<PracticeProgress :total="15" prefix="math-ch2-" />

## 2.4 常係數齊次線性微分方程式 (Characteristic Equations)

<PracticeCard id="math-ch2-prob-1" title="二階常係數齊次 ODE（相異實根）" source="題庫 2.4 (1)" topic="常係數齊次 ODE">

**題目**：

求解下列二階常係數齊次微分方程式之通解：

$$y'' - y' - 6y = 0$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **建立特徵方程式 (Characteristic Equation)**：
   設 $y = e^{\lambda x}$，代入微分方程得：
   $$\lambda^2 - \lambda - 6 = 0$$

2. **因式分解求特徵根**：
   $$(\lambda - 3)(\lambda + 2) = 0 \implies \lambda_1 = 3, \quad \lambda_2 = -2$$
   特徵根為相異實根（Distinct Real Roots）。

3. **寫出齊次通解**：
   $$y(x) = C_1 e^{-2x} + C_2 e^{3x}$$

::: tip 標準答案
$$y(x) = C_1 e^{-2x} + C_2 e^{3x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-2" title="二階常係數齊次 ODE（實數重根）" source="題庫 2.4 (3)" topic="常係數齊次 ODE">

**題目**：

求解下列二階常係數齊次微分方程式之通解：

$$y'' + 6y' + 9y = 0$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **建立特徵方程式**：
   設 $y = e^{\lambda x}$ 代入得：
   $$\lambda^2 + 6\lambda + 9 = 0$$

2. **求解特徵根**：
   $$(\lambda + 3)^2 = 0 \implies \lambda_1 = \lambda_2 = -3 \quad (\text{重根})$$

3. **構造線性獨立解與通解**：
   因特徵根重合，第二個線性獨立解需乘上 $x$（即 $y_1 = e^{-3x}$, $y_2 = x e^{-3x}$）：
   $$y(x) = e^{-3x}(C_1 + C_2 x)$$

::: tip 標準答案
$$y(x) = e^{-3x}(C_1 + C_2 x)$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-3" title="二階常係數齊次 ODE（共軛複數根）" source="題庫 2.4 (5)" topic="常係數齊次 ODE">

**題目**：

求解下列二階常係數齊次微分方程式之通解：

$$y'' + 10y' + 26y = 0$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **建立特徵方程式**：
   $$\lambda^2 + 10\lambda + 26 = 0$$

2. **配方法求解特徵根**：
   $$(\lambda + 5)^2 + 1 = 0 \implies \lambda = -5 \pm i$$
   實部 $\alpha = -5$，虛部 $\beta = 1$。

3. **應用歐拉公式寫出實數通解**：
   $$y(x) = e^{\alpha x}[C_1 \cos(\beta x) + C_2 \sin(\beta x)] = e^{-5x}[C_1 \cos(x) + C_2 \sin(x)]$$

::: tip 標準答案
$$y(x) = e^{-5x}[C_1 \cos(x) + C_2 \sin(x)]$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-4" title="二階常係數齊次 ODE（根號共軛複數根）" source="題庫 2.4 (7)" topic="常係數齊次 ODE">

**題目**：

求解下列二階常係數齊次微分方程式之通解：

$$y'' + 3y' + 18y = 0$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **建立特徵方程式**：
   $$\lambda^2 + 3\lambda + 18 = 0$$

2. **利用二次公式求解**：
   $$\lambda = \frac{-3 \pm \sqrt{3^2 - 4(1)(18)}}{2} = \frac{-3 \pm \sqrt{9 - 72}}{2} = -\frac{3}{2} \pm i\frac{3\sqrt{7}}{2}$$
   此處實部 $\alpha = -\frac{3}{2}$，虛部 $\beta = \frac{3\sqrt{7}}{2}$。

3. **寫出實數形式通解**：
   $$y(x) = e^{-\frac{3}{2}x}\left[ C_1 \cos\left(\frac{3\sqrt{7}}{2}x\right) + C_2 \sin\left(\frac{3\sqrt{7}}{2}x\right) \right]$$

::: tip 標準答案
$$y(x) = e^{-\frac{3}{2}x}\left[ C_1 \cos\left(\frac{3\sqrt{7}}{2}x\right) + C_2 \sin\left(\frac{3\sqrt{7}}{2}x\right) \right]$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-5" title="二階常係數齊次 ODE（重根情況）" source="題庫 2.4 (9)" topic="常係數齊次 ODE">

**題目**：

求解下列二階常係數齊次微分方程式之通解：

$$y'' - 14y' + 49y = 0$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **建立特徵方程式**：
   $$\lambda^2 - 14\lambda + 49 = 0$$

2. **求解特徵根**：
   $$(\lambda - 7)^2 = 0 \implies \lambda_1 = \lambda_2 = 7 \quad (\text{重根})$$

3. **寫出通解**：
   $$y(x) = e^{7x}(C_1 + C_2 x)$$

::: tip 標準答案
$$y(x) = e^{7x}(C_1 + C_2 x)$$
:::

</template>
</PracticeCard>

## 2.6 待定係數法與非齊次方程 (Undetermined Coefficients)

<PracticeCard id="math-ch2-prob-6" title="非齊次 ODE 待定係數法（多項式非齊次項）" source="題庫 2.6 (7)" topic="待定係數法">

**題目**：

求解下列二階非齊次常微分方程式之通解：

$$y'' - y' - 2y = 2x^2 + 5$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **求齊次通解 $y_h$**：
   特徵方程式為 $\lambda^2 - \lambda - 2 = 0 \implies (\lambda-2)(\lambda+1) = 0$。
   $$y_h(x) = C_1 e^{2x} + C_2 e^{-x}$$

2. **假設特解 $y_p$（待定係數法）**：
   因右側為二次多項式 $2x^2 + 5$，設 $y_p = A x^2 + B x + C$。
   $$y_p' = 2Ax + B, \quad y_p'' = 2A$$

3. **代入原微分方程並比較係數**：
   $$(2A) - (2Ax + B) - 2(Ax^2 + Bx + C) = 2x^2 + 5$$
   $$-2A x^2 + (-2A - 2B)x + (2A - B - 2C) = 2x^2 + 5$$
   - $x^2$ 項係數：$-2A = 2 \implies A = -1$
   - $x^1$ 項係數：$-2(-1) - 2B = 0 \implies B = 1$
   - 常數項係數：$2(-1) - (1) - 2C = 5 \implies -3 - 2C = 5 \implies C = -4$
   特解為 $y_p = -x^2 + x - 4$。

4. **組合完整通解 $y = y_h + y_p$**：
   $$y(x) = C_1 e^{2x} + C_2 e^{-x} - x^2 + x - 4$$

::: tip 標準答案
$$y(x) = C_1 e^{2x} + C_2 e^{-x} - x^2 + x - 4$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-7" title="非齊次 ODE 待定係數法（指數非齊次項）" source="題庫 2.6 (8)" topic="待定係數法">

**題目**：

求解下列二階非齊次常微分方程式之通解：

$$y'' - y' - 6y = 8e^{2x}$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **求齊次通解 $y_h$**：
   特徵方程式 $\lambda^2 - \lambda - 6 = 0 \implies (\lambda-3)(\lambda+2) = 0$。
   $$y_h(x) = C_1 e^{3x} + C_2 e^{-2x}$$

2. **假設特解 $y_p$**：
   右端項為 $8e^{2x}$，其指數 $\lambda = 2$ 並非特徵根，無共振現象。設：
   $$y_p = A e^{2x} \implies y_p' = 2A e^{2x}, \quad y_p'' = 4A e^{2x}$$

3. **代入原式求待定常數 $A$**：
   $$(4A - 2A - 6A)e^{2x} = -4A e^{2x} = 8e^{2x} \implies A = -2$$
   故特解 $y_p = -2e^{2x}$。

4. **組合完整通解**：
   $$y(x) = C_1 e^{3x} + C_2 e^{-2x} - 2e^{2x}$$

::: tip 標準答案
$$y(x) = C_1 e^{3x} + C_2 e^{-2x} - 2e^{2x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-8" title="非齊次 ODE 待定係數法（三角函數非齊次項）" source="題庫 2.6 (12)" topic="待定係數法">

**題目**：

求解下列二階非齊次常微分方程式之通解：

$$y'' + 6y' + 9y = 9\cos(3x)$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **求齊次通解 $y_h$**：
   特徵方程式 $(\lambda+3)^2 = 0 \implies \lambda = -3$（重根）。
   $$y_h(x) = e^{-3x}(C_1 + C_2 x)$$

2. **假設特解 $y_p$**：
   設 $y_p = A \cos(3x) + B \sin(3x)$。
   $$y_p' = -3A \sin(3x) + 3B \cos(3x)$$
   $$y_p'' = -9A \cos(3x) - 9B \sin(3x)$$

3. **代入原式整理**：
   $$[-9A\cos(3x) - 9B\sin(3x)] + 6[-3A\sin(3x) + 3B\cos(3x)] + 9[A\cos(3x) + B\sin(3x)] = 9\cos(3x)$$
   $$18B \cos(3x) - 18A \sin(3x) = 9\cos(3x)$$
   比較係數：
   - $\cos(3x)$ 項：$18B = 9 \implies B = \frac{1}{2}$
   - $\sin(3x)$ 項：$-18A = 0 \implies A = 0$
   特解為 $y_p = \frac{1}{2}\sin(3x)$。

4. **組合完整通解**：
   $$y(x) = e^{-3x}(C_1 + C_2 x) + \frac{1}{2}\sin(3x)$$

::: tip 標準答案
$$y(x) = e^{-3x}(C_1 + C_2 x) + \frac{1}{2}\sin(3x)$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-9" title="非齊次 ODE 待定係數法（含零特徵根升冪與指數混合項）" source="題庫 2.6 (14)" topic="待定係數法">

**題目**：

求解下列二階非齊次常微分方程式之通解：

$$y'' - 4y' = 8x^2 + 2e^{3x}$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **求齊次通解 $y_h$**：
   特徵方程式 $\lambda^2 - 4\lambda = 0 \implies \lambda(\lambda - 4) = 0 \implies \lambda_1 = 0, \lambda_2 = 4$。
   $$y_h(x) = C_1 + C_2 e^{4x}$$

2. **求多項式部分特解 $y_{p1}$（零特徵根升次）**：
   因原式不含零階 $y$ 項（即 $\lambda = 0$ 為特徵根），一般二次多項式需乘上 $x$ 升階：
   $$y_{p1} = x(A x^2 + B x + C) = A x^3 + B x^2 + C x$$
   $$y_{p1}' = 3Ax^2 + 2Bx + C, \quad y_{p1}'' = 6Ax + 2B$$
   代入 $y'' - 4y'$：
   $$(6Ax + 2B) - 4(3Ax^2 + 2Bx + C) = -12A x^2 + (6A - 8B)x + (2B - 4C) = 8x^2$$
   比較係數：
   - $-12A = 8 \implies A = -\frac{2}{3}$
   - $6A - 8B = 0 \implies 6\left(-\frac{2}{3}\right) - 8B = 0 \implies B = -\frac{1}{2}$
   - $2B - 4C = 0 \implies 2\left(-\frac{1}{2}\right) - 4C = 0 \implies C = -\frac{1}{4}$
   $$y_{p1} = -\frac{2}{3}x^3 - \frac{1}{2}x^2 - \frac{1}{4}x$$

3. **求指數部分特解 $y_{p2}$**：
   設 $y_{p2} = D e^{3x}$。
   $$y_{p2}'' - 4y_{p2}' = (9 - 12)D e^{3x} = -3D e^{3x} = 2e^{3x} \implies D = -\frac{2}{3}$$
   $$y_{p2} = -\frac{2}{3}e^{3x}$$

4. **組合完整通解**：
   $$y(x) = C_1 + C_2 e^{4x} - \frac{2}{3}x^3 - \frac{1}{2}x^2 - \frac{1}{4}x - \frac{2}{3}e^{3x}$$

::: tip 標準答案
$$y(x) = C_1 + C_2 e^{4x} - \frac{2}{3}x^3 - \frac{1}{2}x^2 - \frac{1}{4}x - \frac{2}{3}e^{3x}$$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-10" title="非齊次 ODE 待定係數法（多項式與指數乘積型）" source="題庫 2.6 (18)" topic="待定係數法">

**題目**：

求解下列二階非齊次常微分方程式之通解：

$$y'' - y' - 6y = 12x e^x$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **求齊次通解 $y_h$**：
   特徵方程式 $\lambda^2 - \lambda - 6 = 0 \implies (\lambda-3)(\lambda+2) = 0$。
   $$y_h(x) = C_1 e^{3x} + C_2 e^{-2x}$$

2. **假設特解 $y_p$**：
   右端為 $12x e^x$，指數 $\lambda = 1$ 不是特徵根。設：
   $$y_p = (Ax + B)e^x$$
   微分導函數：
   $$y_p' = A e^x + (Ax + B)e^x = (Ax + A + B)e^x$$
   $$y_p'' = A e^x + (Ax + A + B)e^x = (Ax + 2A + B)e^x$$

3. **代入原式求待定係數**：
   $$y_p'' - y_p' - 6y_p = [(Ax + 2A + B) - (Ax + A + B) - 6(Ax + B)]e^x = 12x e^x$$
   $$[-6Ax + (A - 6B)]e^x = 12x e^x$$
   比較係數：
   - $x e^x$ 項：$-6A = 12 \implies A = -2$
   - $e^x$ 項：$A - 6B = 0 \implies -2 - 6B = 0 \implies B = -\frac{1}{3}$
   特解為：
   $$y_p = \left(-2x - \frac{1}{3}\right)e^x = -2x e^x - \frac{1}{3}e^x$$

4. **組合完整通解**：
   $$y(x) = C_1 e^{3x} + C_2 e^{-2x} - 2x e^x - \frac{1}{3}e^x$$

::: tip 標準答案
$$y(x) = C_1 e^{3x} + C_2 e^{-2x} - 2x e^x - \frac{1}{3}e^x$$
:::

</template>
</PracticeCard>

## 課堂精選範例與進階解法 (Lectures & Advanced Methods)

<PracticeCard id="math-ch2-prob-11" title="二階常係數共振現象（特解共振乘 $x$）" source="Slide P7-P8 精選範例" topic="待定係數共振型">

**題目**：

求解下列二階常微分方程式之通解（注意非齊次項與齊次解同頻共振）：

$$y'' + 2y' - 3y = 8e^x$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **求齊次通解 $y_h$**：
   特徵方程式 $\lambda^2 + 2\lambda - 3 = 0 \implies (\lambda+3)(\lambda-1) = 0$。
   $$y_h(x) = C_1 e^x + C_2 e^{-3x}$$

2. **特解假設與共振修正**：
   右端項為 $8e^x$，但齊次解中已包含 $e^x$（即 $\lambda = 1$ 為特徵根）。若設 $y_p = A e^x$，代入左端將直接為 $0$。因此必須乘以 $x$ 修正：
   $$y_p = A x e^x$$

3. **代入微分方程求解係數**：
   $$y_p' = A e^x + A x e^x = A(1+x)e^x$$
   $$y_p'' = A e^x + A(1+x)e^x = A(2+x)e^x$$
   代入左式：
   $$[A(2+x) + 2A(1+x) - 3A x]e^x = 4A e^x = 8e^x \implies A = 2$$
   故特解為 $y_p = 2x e^x$。

4. **組合完整通解**：
   $$y(x) = C_1 e^x + C_2 e^{-3x} + 2x e^x$$

::: tip 標準答案
$$y(x) = C_1 e^x + C_2 e^{-3x} + 2x e^x$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-12" title="簡諧振動與外力共振（微分運算子極限推導）" source="Slide P9-P10 精選範例" topic="運算子共振型">

**題目**：

求解未阻尼簡諧外力共振方程式之通解：

$$y'' + 9y = \cos(3x)$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **求齊次通解 $y_h$**：
   特徵方程式 $\lambda^2 + 9 = 0 \implies \lambda = \pm 3i$。
   $$y_h(x) = C_1 \cos(3x) + C_2 \sin(3x)$$

2. **運算子法或待定係數共振求解**：
   右式 $\cos(3x)$ 與固有頻率 $\omega = 3$ 發生完全共振。設特解為：
   $$y_p = x[A\cos(3x) + B\sin(3x)]$$
   利用微分運算子公式 $\frac{1}{D^2 + a^2}\cos(ax) = \frac{x}{2a}\sin(ax)$（取 $a = 3$）：
   $$y_p = \frac{1}{D^2 + 9}\cos(3x) = \frac{x}{2(3)}\sin(3x) = \frac{1}{6}x\sin(3x)$$

3. **組合完整通解**：
   $$y(x) = C_1 \cos(3x) + C_2 \sin(3x) + \frac{1}{6}x\sin(3x)$$

::: tip 標準答案
$$y(x) = C_1 \cos(3x) + C_2 \sin(3x) + \frac{1}{6}x\sin(3x)$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-13" title="參數變異法 (Variation of Parameters)" source="Slide P11-P12 精選範例" topic="參數變異法">

**題目**：

求解二階非齊次常微分方程式之通解（非齊次項非標準初等型）：

$$y'' + 4y = \sec(x), \quad -\frac{\pi}{4} < x < \frac{\pi}{4}$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **求齊次通解與基底解**：
   $\lambda^2 + 4 = 0 \implies \lambda = \pm 2i$。
   $$y_1(x) = \cos(2x), \quad y_2(x) = \sin(2x)$$

2. **計算朗斯基行列式 (Wronskian)**：
   $$W(y_1, y_2) = \begin{vmatrix} \cos(2x) & \sin(2x) \\ -2\sin(2x) & 2\cos(2x) \end{vmatrix} = 2\cos^2(2x) + 2\sin^2(2x) = 2$$

3. **計算變異係數 $u(x)$ 與 $v(x)$**：
   $$u'(x) = -\frac{y_2(x) r(x)}{W} = -\frac{\sin(2x)\sec(x)}{2} = -\frac{2\sin(x)\cos(x)\frac{1}{\cos(x)}}{2} = -\sin(x)$$
   $$\implies u(x) = \cos(x)$$
   $$v'(x) = \frac{y_1(x) r(x)}{W} = \frac{\cos(2x)\sec(x)}{2} = \frac{2\cos^2(x)-1}{2\cos(x)} = \cos(x) - \frac{1}{2}\sec(x)$$
   $$\implies v(x) = \sin(x) - \frac{1}{2}\ln|\sec(x) + \tan(x)|$$

4. **組合特解 $y_p$ 與通解**：
   $$y_p = u(x)y_1(x) + v(x)y_2(x) = \cos(x)\cos(2x) + \left[\sin(x) - \frac{1}{2}\ln|\sec(x) + \tan(x)|\right]\sin(2x)$$
   $$y_p = \cos(2x-x) - \frac{1}{2}\sin(2x)\ln|\sec(x) + \tan(x)| = \cos(x) - \frac{1}{2}\sin(2x)\ln|\sec(x) + \tan(x)|$$
   通解為：
   $$y(x) = C_1 \cos(2x) + C_2 \sin(2x) + \cos(x) - \frac{1}{2}\sin(2x)\ln|\sec(x) + \tan(x)|$$

::: tip 標準答案
$$y(x) = C_1 \cos(2x) + C_2 \sin(2x) + \cos(x) - \frac{1}{2}\sin(2x)\ln|\sec(x) + \tan(x)|$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-14" title="柯西－尤拉方程式 (Euler-Cauchy Equation)" source="Slide P12-P13 精選範例" topic="柯西－尤拉方程式">

**題目**：

求解下列二階柯西－尤拉方程式之通解：

$$x^2 y'' - 5x y' + 9y = 0 \quad (x > 0)$$

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **變數變換化為常係數 ODE**：
   令 $x = e^t$（即 $t = \ln x$），則：
   $$x y' = \frac{dy}{dt}, \quad x^2 y'' = \frac{d^2 y}{dt^2} - \frac{dy}{dt}$$

2. **代入原式整理**：
   $$\left(\frac{d^2 y}{dt^2} - \frac{dy}{dt}\right) - 5\frac{dy}{dt} + 9y = 0 \implies \frac{d^2 y}{dt^2} - 6\frac{dy}{dt} + 9y = 0$$

3. **求 $t$ 的特徵根與解**：
   $$r^2 - 6r + 9 = 0 \implies (r - 3)^2 = 0 \implies r = 3 \quad (\text{重根})$$
   $$y(t) = (C_1 + C_2 t) e^{3t}$$

4. **回代 $t = \ln x$ 與 $e^{3t} = x^3$**：
   $$y(x) = x^3 (C_1 + C_2 \ln x)$$

::: tip 標準答案
$$y(x) = x^3 (C_1 + C_2 \ln x)$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch2-prob-15" title="降階法求第二個線性獨立解 (Reduction of Order)" source="Slide P14-P15 精選範例" topic="降階法">

**題目**：

已知 $y_1(x) = x^2$ 為方程式 $x^2 y'' - 3x y' + 4y = 0$（$x > 0$）之一解，試利用降階法求出其第二個線性獨立解 $y_2(x)$ 及齊次通解。

> **求解目標**：求微分方程式之通解或特定獨立解。

<template #solution>

#### 逐步解析：

1. **設定解的形式**：
   設 $y(x) = u(x) y_1(x) = u(x) x^2$。

2. **計算各階導函數**：
   $$y' = u' x^2 + 2x u$$
   $$y'' = u'' x^2 + 4x u' + 2u$$

3. **代入原微分方程式**：
   $$x^2(u'' x^2 + 4x u' + 2u) - 3x(u' x^2 + 2x u) + 4(u x^2) = 0$$
   $$x^4 u'' + (4x^3 - 3x^3)u' + (2x^2 - 6x^2 + 4x^2)u = 0$$
   注意 $u$ 的常數係數項完全相消為 $0$（降階成功的標誌）：
   $$x^4 u'' + x^3 u' = 0 \implies x u'' + u' = 0$$

4. **一階降階變數分離**：
   令 $v = u'$，則 $x v' + v = 0 \implies \frac{dv}{v} = -\frac{dx}{x}$。
   $$v(x) = \frac{1}{x} \implies u'(x) = \frac{1}{x} \implies u(x) = \ln x$$

5. **寫出第二解與齊次通解**：
   $$y_2(x) = u(x) y_1(x) = x^2 \ln x$$
   驗證朗斯基值 $W(x^2, x^2\ln x) = x^3 \neq 0$，互為線性獨立。
   通解為：
   $$y(x) = C_1 x^2 + C_2 x^2 \ln x$$

::: tip 標準答案
$$y_2(x) = x^2 \ln x, \quad y(x) = C_1 x^2 + C_2 x^2 \ln x$$
:::

</template>
</PracticeCard>
