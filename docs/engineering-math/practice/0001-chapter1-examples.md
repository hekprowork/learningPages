---
title: Chapter 1 互動式範例與精選題庫
description: 工程數學第一章 一階常微分方程式 (First-Order ODEs) 互動題庫、範例解說與詳細推導
---

# 互動式範例與精選題庫：Chapter 1 一階常微分方程式 (First-Order ODEs)

> 常微分方程式基礎、可分離變數法、一階線性微分方程、正合判定與歷屆考古精選題解

::: details 核心解題觀念與公式速記
- **可分離變數法 (Separable ODEs)**：方程式能化為 $g(y)\,dy = f(x)\,dx$ 時，兩端直接積分 $\int g(y)\,dy = \int f(x)\,dx + C$。注意除式 $g(y) = 0$ 可能遺漏奇異解。
- **一階線性微分方程標準式 (Linear ODEs)**：$y' + P(x)y = Q(x)$，積分因子為 $\mu(x) = e^{\int P(x)\,dx}$，通解為 $y(x) = \frac{1}{\mu(x)}\left[\int \mu(x)Q(x)\,dx + C\right]$。
- **正合微分方程 (Exact ODEs)**：$M(x,y)\,dx + N(x,y)\,dy = 0$。Euler 正合判定為 $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$。勢函數滿足 $\phi(x,y) = \int M\,dx + h(y) = C$。
- **積分因子法 (Integrating Factors)**：若非正合且 $\frac{M_y - N_x}{N} = f(x)$，則 $\mu(x) = e^{\int f(x)\,dx}$；若 $\frac{N_x - M_y}{M} = g(y)$，則 $\mu(y) = e^{\int g(y)\,dy}$。
:::

<PracticeProgress :total="56" prefix="math-ch1-" />

## 1.1 基本觀念與初值問題 (Basic Concepts & IVP)

<PracticeCard id="math-ch1-prob-1" title="1.1 範例 1 (初值問題 (IVP))" source="1.1 · 1.1 範例 1" topic="初值問題 (IVP)">

**題目**：

給定 $y' + 2xy = 0$，試求其一般解，以及滿足初始條件 $y(0) = 1$ 的特解。

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

**步驟：** $\frac{dy}{y} = -2x\,dx \implies \ln|y| = -x^2 + C_1 \implies y = Ce^{-x^2}$。代入 $y(0)=1 \implies C=1$。

::: tip 標準答案
一般解：$y = Ce^{-x^2}$

                特解：$y = e^{-x^2}$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-2" title="1.1 範例 2 (初值問題 (IVP))" source="1.1 · 1.1 範例 2" topic="初值問題 (IVP)">

**題目**：

求解初值問題：

              $$y' + 2y = 0, \quad y(0) = -7$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

**步驟：** $\frac{dy}{y} = -2\,dx \implies \ln|y| = -2x + c \implies y = Ce^{-2x}$。代入 $y(0) = -7 \implies C = -7$。

::: tip 標準答案
$$y(x) = -7e^{-2x}$$
:::

</template>
</PracticeCard>

## 1.2 可分離變數微分方程式 (Separable Equations)

<PracticeCard id="math-ch1-prob-3" title="1.2 題 1 (Separable)" source="1.2 · 1.2 題 1" topic="Separable">

**題目**：

$$3y' = \frac{4x}{y^2}$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

交叉相乘：$3y^2\,dy = 4x\,dx \implies \int 3y^2\,dy = \int 4x\,dx \implies y^3 = 2x^2 + k$。

::: tip 標準答案
$$y^3 = 2x^2 + k$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-4" title="1.2 題 2 (Separable)" source="1.2 · 1.2 題 2" topic="Separable">

**題目**：

$$y + xy' = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\frac{dy}{y} = -\frac{dx}{x} \implies \ln|y| + \ln|x| = C \implies xy = k$（或湊微分 $d(xy)=0$）。

::: tip 標準答案
$$xy = k$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-5" title="1.2 題 3 (Separable)" source="1.2 · 1.2 題 3" topic="Separable">

**題目**：

$$e^{x+y}y' = 3x$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$e^y\,dy = 3xe^{-x}\,dx$。分部積分右端：$\int 3xe^{-x}\,dx = -3xe^{-x} - 3e^{-x} + C$。

::: tip 標準答案
$$e^y = -3e^{-x}(x+1) + C$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-6" title="1.2 題 4 (Separable)" source="1.2 · 1.2 題 4" topic="Separable">

**題目**：

$$xy' + y = y^2$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$x\frac{dy}{dx} = y(y-1) \implies \frac{dy}{y(y-1)} = \frac{dx}{x} \implies \ln\left|\frac{y-1}{y}\right| = \ln|x| + c$。

::: tip 標準答案
$$y = \frac{1}{1 - Ax} \quad (\text{含奇異解 } y=0)$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-7" title="1.2 題 5 (Separable 判別)" source="1.2 · 1.2 題 5" topic="Separable 判別">

**題目**：

$$y' = \frac{(x+1)^2 - 2y}{2y}$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

右側為 $\frac{(x+1)^2}{2y} - 1$，無法拆寫為 $f(x)g(y)$ 乘積形式。

::: tip 標準答案
**不可分離變數 (Not Separable)**
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-8" title="1.2 題 6 (Separable)" source="1.2 · 1.2 題 6" topic="Separable">

**題目**：

$$x\sin(y)y' = \cos(y)$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\tan(y)\,dy = \frac{dx}{x} \implies \ln|\sec(y)| = \ln|x| + C \implies \sec(y) = Ax$。

::: tip 標準答案
$$\sec(y) = Ax$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-9" title="1.2 題 7 (Separable)" source="1.2 · 1.2 題 7" topic="Separable">

**題目**：

$$\frac{x}{y}y' = \frac{2y^2 + 1}{x+1}$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\frac{y}{2y^2+1}\,dy = \frac{dx}{x(x+1)} = \left(\frac{1}{x} - \frac{1}{x+1}\right)dx$ 兩邊分別積分。

::: tip 標準答案
$$\frac{y^2}{y^2+1} = A\left(\frac{x}{x+1}\right)^2$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-10" title="1.2 題 8 (Separable 判別)" source="1.2 · 1.2 題 8" topic="Separable 判別">

**題目**：

$$y + y' = e^x - \sin(y)$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$y' = e^x - y - \sin(y)$，存在 $x$ 與 $y$ 之相加混合項，無法分離。

::: tip 標準答案
**不可分離變數 (Not Separable)**
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-11" title="1.2 題 9 (Separable / 三角和差)" source="1.2 · 1.2 題 9" topic="Separable / 三角和差">

**題目**：

$$[\cos(x+y) + \sin(x-y)]y' = \cos(2x)$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

利用積化和差展開後可分離為 $(\cos y + \sin y)\,dy = (\cos x + \sin x)\,dx$ 兩端積分。

::: tip 標準答案
$$\cos(y) + \sin(y) = \cos(x) + \sin(x) + C$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-12" title="1.2 題 10 (Separable + IVP)" source="1.2 · 1.2 題 10" topic="Separable + IVP">

**題目**：

$$xy^2 y' = y + 1, \quad y(3e^2) = 2$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\frac{y^2}{y+1}\,dy = \frac{dx}{x} \implies \int \left(y - 1 + \frac{1}{y+1}\right)dy = \ln x + C$。代入初值求 $C$。

::: tip 標準答案
$$\frac{y^2}{2} - y + \ln(y+1) = \ln(x) - 2$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-13" title="1.2 題 11 (Separable + IVP)" source="1.2 · 1.2 題 11" topic="Separable + IVP">

**題目**：

$$y' = 3x^2 y, \quad y(2) = 1$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\frac{dy}{y} = 3x^2\,dx \implies \ln|y| = x^3 + C$。代入 $x=2, y=1 \implies 0 = 8 + C \implies C = -8$。

::: tip 標準答案
$$\ln(y) = x^3 - 8 \implies y(x) = e^{x^3 - 8}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-14" title="1.2 題 12 (Separable + IVP)" source="1.2 · 1.2 題 12" topic="Separable + IVP">

**題目**：

$$\ln(y^x)y' = 3x^2 y, \quad y(2) = e^3$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\ln(y^x) = x\ln y$。式子化為 $x\ln y\,y' = 3x^2 y \implies \frac{\ln y}{y}\,dy = 3x\,dx \implies \frac{1}{2}(\ln y)^2 = \frac{3}{2}x^2 + C$。

::: tip 標準答案
$$(\ln y)^2 = 3x^2 - 3$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-15" title="1.2 題 13 (Separable + IVP)" source="1.2 · 1.2 題 13" topic="Separable + IVP">

**題目**：

$$2yy' = e^{x-y^2}, \quad y(4) = -2$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$2y e^{y^2}\,dy = e^x\,dx \implies e^{y^2} = e^x + C$。代入 $x=4, y=-2 \implies e^4 = e^4 + C \implies C=0$。

::: tip 標準答案
$$e^{y^2} = e^x \implies y(x) = -\sqrt{x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-16" title="1.2 題 14 (Separable + IVP)" source="1.2 · 1.2 題 14" topic="Separable + IVP">

**題目**：

$$yy' = 2x\sec(3y), \quad y(2/3) = \pi/3$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$y\cos(3y)\,dy = 2x\,dx$。左邊分部積分：$\frac{y}{3}\sin(3y) + \frac{1}{9}\cos(3y) = x^2 + C$。同乘 9 並代入初值。

::: tip 標準答案
$$3y\sin(3y) + \cos(3y) = 9x^2 - 5$$
:::

</template>
</PracticeCard>

## 1.3 一階線性微分方程式 (First-Order Linear ODEs)

<PracticeCard id="math-ch1-prob-17" title="1.3 題 1 (Linear ODE)" source="1.3 · 1.3 題 1" topic="Linear ODE">

**題目**：

$$y' - \frac{3}{x}y = 2x^2$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

積分因子 $I = e^{\int -3/x dx} = x^{-3}$。$\frac{d}{dx}(x^{-3}y) = 2x^{-1} \implies x^{-3}y = 2\ln x + c$。

::: tip 標準答案
$$y = cx^3 + 2x^3\ln(x)$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-18" title="1.3 題 2 (Linear ODE)" source="1.3 · 1.3 題 2" topic="Linear ODE">

**題目**：

$$y' - y = \sinh(x)$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\sinh x = \frac{e^x - e^{-x}}{2}$，$I(x) = e^{-x}$。$\frac{d}{dx}(e^{-x}y) = \frac{1 - e^{-2x}}{2}$。

::: tip 標準答案
$$y = ce^x + \frac{1}{4}e^{-x} + \frac{1}{2}xe^x$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-19" title="1.3 題 3 (Linear ODE)" source="1.3 · 1.3 題 3" topic="Linear ODE">

**題目**：

$$y' + 2y = x$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = e^{2x}$。$e^{2x}y = \int xe^{2x}dx = \frac{1}{2}xe^{2x} - \frac{1}{4}e^{2x} + c$。

::: tip 標準答案
$$y = ce^{-2x} + \frac{1}{2}x - \frac{1}{4}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-20" title="1.3 題 4 (Linear ODE)" source="1.3 · 1.3 題 4" topic="Linear ODE">

**題目**：

$$\sin(2x)y' + 2y\sin^2(x) = 2\sin(x)$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

除以 $\sin(2x) = 2\sin x \cos x \implies y' + \tan(x)y = \sec(x)$。$I = \sec x \implies \frac{d}{dx}(y\sec x) = \sec^2 x$。

::: tip 標準答案
$$y = \sin(x) + C\cos(x)$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-21" title="1.3 題 5 (Linear ODE)" source="1.3 · 1.3 題 5" topic="Linear ODE">

**題目**：

$$y' - 2y = -8x^2$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = e^{-2x}$。$\int -8x^2 e^{-2x}dx$ 連續兩次分部積分得 $(4x^2+4x+2)e^{-2x} + c$。

::: tip 標準答案
$$y = 4x^2 + 4x + 2 + ce^{2x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-22" title="1.3 題 6 (Linear ODE)" source="1.3 · 1.3 題 6" topic="Linear ODE">

**題目**：

$$(x^2 - x - 2)y' + 3xy = x^2 - 4x + 4$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

部分分式求積分因子 $I(x) = (x+1)(x-2)^4$ 後全式求解。

::: tip 標準答案
$$y = \frac{(x-2)^2}{4(x-1)} + \frac{c}{(x+1)(x-2)^4}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-23" title="1.3 題 7 (Linear ODE)" source="1.3 · 1.3 題 7" topic="Linear ODE">

**題目**：

$$y' + y = \frac{x-1}{x^2}$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = e^x \implies e^x y = \int \left(\frac{1}{x} - \frac{1}{x^2}\right)e^x dx = \frac{e^x}{x} + c \implies y = \frac{1}{x} + ce^{-x}$。

::: tip 標準答案
$$y = e^{-x}\int \left(\frac{x-1}{x^2}\right)e^x dx + ce^{-x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-24" title="1.3 題 8 (Linear ODE)" source="1.3 · 1.3 題 8" topic="Linear ODE">

**題目**：

$$y' + \sec(x)y = \cos(x)$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = \sec x + \tan x$。代入線性通解積分公式推導。

::: tip 標準答案
$$y = \frac{x\cos(x) - \cos^2(x)}{1 + \sin(x)} + \frac{c\cos(x)}{1 + \sin(x)}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-25" title="1.3 題 9 (Linear ODE)" source="1.3 · 1.3 題 9" topic="Linear ODE">

**題目**：

$$y' + \frac{1}{x}y = x^2 + 2$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = x \implies \frac{d}{dx}(xy) = x^3 + 2x \implies xy = \frac{1}{4}x^4 + x^2 + c$。

::: tip 標準答案
$$y = \frac{1}{4}x^3 + x + \frac{c}{x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-26" title="1.3 題 10 (Linear ODE)" source="1.3 · 1.3 題 10" topic="Linear ODE">

**題目**：

$$2y' + 3y = e^{2x}$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$y' + \frac{3}{2}y = \frac{1}{2}e^{2x} \implies I = e^{3x/2}$。$\int \frac{1}{2}e^{7x/2}dx = \frac{1}{7}e^{7x/2} + c$。

::: tip 標準答案
$$y = \frac{1}{7}e^{2x} + ce^{-3x/2}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-27" title="1.3 題 11 (Linear ODE)" source="1.3 · 1.3 題 11" topic="Linear ODE">

**題目**：

$$y' + \frac{1}{x}y = 3e^{-x^2}$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = x \implies xy = \int 3xe^{-x^2}dx = -\frac{3}{2}e^{-x^2} + c$。

::: tip 標準答案
$$y = -\frac{3}{2x}e^{-x^2} + \frac{c}{x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-28" title="1.3 題 12 (Linear ODE)" source="1.3 · 1.3 題 12" topic="Linear ODE">

**題目**：

$$xy' + \frac{2}{x}y = 4 \implies y' + \frac{2}{x^2}y = \frac{4}{x}$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

標準線性解法求解。

::: tip 標準答案
$$y = \frac{4}{3}x + cx^{-2}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-29" title="1.3 題 13 (Linear + IVP)" source="1.3 · 1.3 題 13" topic="Linear + IVP">

**題目**：

$$y' + \frac{1}{x-2}y = 3x, \quad y(3) = 4$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = x-2 \implies (x-2)y = \int (3x^2 - 6x)dx = x^3 - 3x^2 + c$。$y(3)=4 \implies c=4$。

::: tip 標準答案
$$y = x^2 - x - 2$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-30" title="1.3 題 14 (Linear + IVP)" source="1.3 · 1.3 題 14" topic="Linear + IVP">

**題目**：

$$y' + 3y = 5e^{2x} - 6, \quad y(0) = 2$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = e^{3x} \implies e^{3x}y = e^{5x} - 2e^{3x} + c$。$y(0)=2 \implies 2 = 1 - 2 + c \implies c = 3$。

::: tip 標準答案
$$y = e^{2x} - 2 + 3e^{-3x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-31" title="1.3 題 15 (Linear + IVP)" source="1.3 · 1.3 題 15" topic="Linear + IVP">

**題目**：

$$y' + \frac{2}{x+1}y = 3, \quad y(0) = 5$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = (x+1)^2 \implies (x+1)^2 y = (x+1)^3 + c$。$y(0)=5 \implies 5 = 1 + c \implies c = 4$。

::: tip 標準答案
$$y = x + 1 + \frac{4}{(x+1)^2}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-32" title="1.3 題 16 (Linear + IVP)" source="1.3 · 1.3 題 16" topic="Linear + IVP">

**題目**：

$$(x^2 - 2x)y' + (x^2 - 5x + 4)y = (x^4 - 2x^3)e^{-x}, \quad y(3) = 18e^{-3}$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

同除以 $x(x-2)$ 後標準求解。

::: tip 標準答案
$$y = x^2(x-2)\ln(x-2)e^{-x} + 2x^2\ln(x-2)e^{-x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-33" title="1.3 題 17 (Linear + IVP)" source="1.3 · 1.3 題 17" topic="Linear + IVP">

**題目**：

$$y' - y = 2e^{4x}, \quad y(0) = -3$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = e^{-x} \implies e^{-x}y = \frac{2}{3}e^{3x} + c \implies y = \frac{2}{3}e^{4x} + ce^x$。$y(0)=-3 \implies c = -11/3$。

::: tip 標準答案
$$y = \frac{2}{3}e^{4x} - \frac{11}{3}e^x$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-34" title="1.3 題 18 (Linear + IVP)" source="1.3 · 1.3 題 18" topic="Linear + IVP">

**題目**：

$$y' + \frac{5y}{9x} = 3x^3 + x, \quad y(-1) = 4$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I(x) = x^{5/9}$。分項積分後代入 $y(-1)=4$ 確定常數。

::: tip 標準答案
$$y = \frac{27}{41}x^4 + \frac{9}{23}x^2 - \frac{2782}{943}x^{-5/9}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-35" title="1.3 題 19 (Linear + IVP)" source="1.3 · 1.3 題 19" topic="Linear + IVP">

**題目**：

$$y' + \frac{4}{x}y = 2, \quad y(1) = -4$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = x^4 \implies x^4 y = \int 2x^4 dx = \frac{2}{5}x^5 + c$。$y(1)=-4 \implies -4 = 2/5 + c \implies c = -22/5$。

::: tip 標準答案
$$y = \frac{2}{5}x - \frac{22}{5}x^{-4}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-36" title="1.3 題 20 (Linear + IVP)" source="1.3 · 1.3 題 20" topic="Linear + IVP">

**題目**：

$$y' - 4y = x + \sin(x), \quad y(0) = 3$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = e^{-4x}$。利用未定係數法或分部積分求特積分後代入初值。

::: tip 標準答案
$$y = -\frac{1}{4}x - \frac{1}{16} - \frac{4}{17}\sin x - \frac{1}{17}\cos x + \frac{849}{272}e^{4x}$$
:::

</template>
</PracticeCard>

## 1.4 正合微分方程式 (Exact Differential Equations)

<PracticeCard id="math-ch1-prob-37" title="1.4 題 1 (Exact ODE)" source="1.4 · 1.4 題 1" topic="Exact ODE">

**題目**：

$$(2y^2 + ye^{xy})\,dx + (4xy + xe^{xy} + 2y)\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = 4y + e^{xy} + xye^{xy} = N_x$（正合）。$\phi = \int (2y^2+ye^{xy})dx = 2xy^2 + e^{xy} + g(y) \implies g(y)=y^2$。

::: tip 標準答案
$$2xy^2 + e^{xy} + y^2 = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-38" title="1.4 題 2 (Exact ODE)" source="1.4 · 1.4 題 2" topic="Exact ODE">

**題目**：

$$(4xy + 2x)\,dx + (2x^2 + 3y^2)\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = 4x = N_x$（正合）。$\phi = \int (4xy+2x)dx = 2x^2 y + x^2 + g(y) \implies g'(y) = 3y^2 \implies g(y) = y^3$。

::: tip 標準答案
$$2x^2 y + x^2 + y^3 = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-39" title="1.4 題 3 (正合檢驗)" source="1.4 · 1.4 題 3" topic="正合檢驗">

**題目**：

$$(4xy + 2x^2 y)\,dx + (2x^2 + 3y^2)\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = 4x + 2x^2 \neq N_x = 4x$。

::: tip 標準答案
**非正合方程式 (Not Exact)**
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-40" title="1.4 題 4 (Exact ODE)" source="1.4 · 1.4 題 4" topic="Exact ODE">

**題目**：

$$[2\cos(x+y) - 2x\sin(x+y)]dx - [2x\sin(x+y)]dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = -2\sin(x+y) - 2x\cos(x+y) = N_x$（正合）。$d[2x\cos(x+y)] = 0$。

::: tip 標準答案
$$2x\cos(x+y) = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-41" title="1.4 題 5 (Exact ODE)" source="1.4 · 1.4 題 5" topic="Exact ODE">

**題目**：

$$\left(\frac{1}{x} + y\right)dx + (3y^2 + x)\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = 1 = N_x$。$\phi = \int (1/x + y)dx = \ln|x| + xy + g(y) \implies g'(y) = 3y^2 \implies g(y) = y^3$。

::: tip 標準答案
$$\ln|x| + xy + y^3 = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-42" title="1.4 題 6 (正合檢驗)" source="1.4 · 1.4 題 6" topic="正合檢驗">

**題目**：

$$[e^x\sin(y^2) + xe^x\sin(y^2)]dx + [2xye^x\sin(y^2) + e^y]dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = 2ye^x\cos(y^2)(1+x) \neq N_x = 2ye^x\sin(y^2)(1+x)$。

::: tip 標準答案
**非正合方程式 (Not Exact)**
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-43" title="1.4 題 7 (Exact ODE)" source="1.4 · 1.4 題 7" topic="Exact ODE">

**題目**：

$$\sinh(x)\sinh(y)\,dx + \cosh(x)\cosh(y)\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = \sinh x \cosh y = N_x$。$\phi = \int \sinh x \sinh y dx = \cosh x \sinh y = c$。

::: tip 標準答案
$$\cosh(x)\sinh(y) = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-44" title="1.4 題 8 (Exact ODE)" source="1.4 · 1.4 題 8" topic="Exact ODE">

**題目**：

$$(4y^4 + 3\cos x)\,dx + (16y^3 x - 3\cos y)\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = 16y^3 = N_x$。$\phi = \int (4y^4 + 3\cos x)dx = 4xy^4 + 3\sin x + g(y) \implies g(y) = -3\sin y$。

::: tip 標準答案
$$4xy^4 + 3\sin(x) - 3\sin(y) = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-45" title="1.4 題 9 (Exact ODE)" source="1.4 · 1.4 題 9" topic="Exact ODE">

**題目**：

$$y x^{y-1}\,dx + x^y\ln(x)\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

直接觀察全微分：$d(x^y) = yx^{y-1}dx + x^y\ln x\,dy = 0 \implies x^y = c$。

::: tip 標準答案
$$x^y = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-46" title="1.4 題 10 (Exact ODE)" source="1.4 · 1.4 題 10" topic="Exact ODE">

**題目**：

$$\left(\frac{2x^3 + 2xy^2 - y}{x^2 + y^2}\right)dx + \left(\frac{x}{x^2 + y^2}\right)dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

拆為 $2x\,dx + \frac{x\,dy - y\,dx}{x^2+y^2} = d(x^2) + d(\arctan(y/x)) = 0$。

::: tip 標準答案
$$x^2 + \arctan\left(\frac{x}{y}\right) = c \quad \left(\text{或 } x^2 - \arctan\left(\frac{y}{x}\right) = c'\right)$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-47" title="1.4 題 11 (Exact ODE)" source="1.4 · 1.4 題 11" topic="Exact ODE">

**題目**：

$$(y + e^x)\,dx + x\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = 1 = N_x$。湊微分：$(y\,dx + x\,dy) + e^x\,dx = d(xy + e^x) = 0$。

::: tip 標準答案
$$xy + e^x = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-48" title="1.4 題 12 (Exact ODE)" source="1.4 · 1.4 題 12" topic="Exact ODE">

**題目**：

$$(6x - ye^{xy})\,dx + (e^y - xe^{xy})\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$6x\,dx - (ye^{xy}dx + xe^{xy}dy) + e^y\,dy = d(3x^2 - e^{xy} + e^y) = 0$。

::: tip 標準答案
$$3x^2 - e^{xy} + e^y = c$$
:::

</template>
</PracticeCard>

## 歷屆期中考古精選 (Past Exams 95 & 96)

<PracticeCard id="math-ch1-prob-49" title="95 考題 1 (積分因子法)" source="歷屆期中考古精選 · 95 考題 1" topic="積分因子法">

**題目**：

$$(4xy + 6y^2)\,dx + (2x^2 + 6xy)\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\frac{M_y - N_x}{N} = \frac{(4x+12y) - (4x+6y)}{2x(x+3y)} = \frac{6y}{2x(x+3y)}$ 不純，求待定係數 $\mu = x^2 y$ 轉正合。

::: tip 標準答案
$$x^4 y^2 + 2x^3 y^3 = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-50" title="95 考題 2 (一階線性 IVP)" source="歷屆期中考古精選 · 95 考題 2" topic="一階線性 IVP">

**題目**：

$$xy' + 4y = 2x, \quad y(1) = -4$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$y' + \frac{4}{x}y = 2 \implies I(x) = x^4$。$x^4 y = \frac{2}{5}x^5 + C$。$y(1)=-4 \implies C = -22/5$。

::: tip 標準答案
$$y = \frac{2}{5}x - \frac{22}{5}x^{-4}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-51" title="95 考題 3 (可分離變數)" source="歷屆期中考古精選 · 95 考題 3" topic="可分離變數">

**題目**：

$$x\sin(y)y' = \cos(y)$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\tan y\,dy = \frac{dx}{x} \implies \ln|\sec y| = \ln|x| + c \implies \sec y = Ax$。

::: tip 標準答案
$$\sec(y) = Ax$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-52" title="96 考題 1 (可分離變數 IVP)" source="歷屆期中考古精選 · 96 考題 1" topic="可分離變數 IVP">

**題目**：

$$e^x y' = y^2, \quad y(2) = 5$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$y^{-2}\,dy = e^{-x}\,dx \implies -y^{-1} = -e^{-x} + C \implies \frac{1}{y} = e^{-x} + C'$。代入 $x=2, y=5$。

::: tip 標準答案
$$y(x) = \frac{1}{\frac{1}{5} - e^{-2} + e^{-x}}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-53" title="96 考題 2 (一階線性)" source="歷屆期中考古精選 · 96 考題 2" topic="一階線性">

**題目**：

$$y' - 2y = -8x$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$I = e^{-2x} \implies e^{-2x}y = \int -8xe^{-2x}dx = 4xe^{-2x} + 2e^{-2x} + c$。

::: tip 標準答案
$$y(x) = 4x + 2 + ce^{2x}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-54" title="96 考題 3 (正合方程式)" source="歷屆期中考古精選 · 96 考題 3" topic="正合方程式">

**題目**：

$$(2xy^3 + 2)\,dx + (3x^2 y^2 + 8e^{4y})\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = 6xy^2 = N_x$。$\phi = \int (2xy^3+2)dx = x^2 y^3 + 2x + g(y) \implies g'(y) = 8e^{4y} \implies g(y) = 2e^{4y}$。

::: tip 標準答案
$$x^2 y^3 + 2x + 2e^{4y} = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-55" title="96 考題 4 (正合方程式)" source="歷屆期中考古精選 · 96 考題 4" topic="正合方程式">

**題目**：

$$\left(\frac{1}{x} + y\right)dx + (3y^2 + x)\,dy = 0$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$M_y = 1 = N_x$。通解為 $\ln|x| + xy + y^3 = c$。

::: tip 標準答案
$$\ln|x| + xy + y^3 = c$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-prob-56" title="96 考題 5 (可分離變數)" source="歷屆期中考古精選 · 96 考題 5" topic="可分離變數">

**題目**：

$$x - xy - y' = 0 \implies y' = x(1-y)$$

> **求解目標**：求微分方程式之通解或滿足初始條件之特解。

<template #solution>

#### 逐步解析：

$\frac{dy}{1-y} = x\,dx \implies -\ln|1-y| = \frac{1}{2}x^2 + C \implies 1-y = Ae^{-x^2/2}$。

::: tip 標準答案
$$\frac{1}{2}x^2 + \ln|1-y| = c \quad \left(\text{或 } y = 1 - Ae^{-x^2/2}\right)$$
:::

</template>
</PracticeCard>
