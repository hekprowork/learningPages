# 工程數學教材補齊題庫：第一、二章

> 來源：`docs/engineering-math/工程數學（上）電子檔第一章.pdf`、`docs/engineering-math/工程數學（上）電子檔第二章.pdf`。頁碼採 PDF 內印刷頁碼，不是 PDF viewer 的索引頁碼。

<PracticeFilter prefix="math-" />
<PracticeProgress :total="20" prefix="math-ch1-missing-" />
<PracticeProgress :total="15" prefix="math-ch2-missing-" />

## 已完成盤點（第一章）

- `0001-chapter1-examples.md`：現有 56 題。
- `101工數 題目解答 第一章.pdf` 是「工程數學題庫／題目解答」彙整，屬於講義題庫與歷屆考題，不是正式教科書。其 1-2、1-3、1-4 與 95/96 考題共 54 個項目，現有卡片已逐題覆蓋；另外現有檔案前段 2 題是 repo 自行整理的 1.1 題。
- `工程數學（上）電子檔第一章.pdf` 是正式教材講義。可辨識的實質 Example 單元中，目前已由既有卡片等價覆蓋：P.12 的正合方程（現有 `math-ch1-prob-54`）與 P.18 的積分因子例（現有 `math-ch1-prob-56`）。下列 20 張卡片是其餘缺漏；P.7/P.8/P.9 同一族的 `y'+y=2` 例合併在一張卡，P.19/P.21 同一方程的兩種積分因子推導也合併在一張卡。
- P.7 的微分方程分類小例與第二章 P.29 的一般形式小例只有定義展示，沒有獨立題目與標準答案，未虛構成練習卡。

## 第一章正式教材缺漏卡片

<PracticeCard id="math-ch1-missing-01" type="example" title="一階線性方程、積分曲線與初值問題" source="正式教材第一章 P.7、P.8、P.9 · Example" topic="一階線性 ODE / 初值問題">

> 來源類型：正式教材 PDF；P.7 與 P.8 的一般解/積分曲線例，以及 P.9 的初值例是同一方程族。

**題目**：求解

$$y'(x)+y(x)=2$$

並說明一般解與 $y(1)=-5$ 時的特解。

<template #solution>

#### 逐步解析：

積分因子為 $\mu(x)=e^x$，因此

$$
\begin{aligned}
e^x y'+e^x y&=2e^x,\\
\frac{d}{dx}\left(e^x y\right)&=2e^x,\\
e^x y&=2e^x+C.
\end{aligned}
$$

所以一般解為 $y=2+Ce^{-x}$。代入 $y(1)=-5$：

$$-5=2+Ce^{-1}\implies C=-7e,$$

故初值特解為 $y(x)=2-7e^{-(x-1)}$。來源 P.7 另列 $C=1,-1$ 的兩條特解，P.8 用 $C$ 的不同取值畫積分曲線。

::: tip 標準答案
一般解：$y(x)=2+Ce^{-x}$；若 $y(1)=-5$，則
$$y(x)=2-7e^{-(x-1)}.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-02" type="example" title="積分曲線例：含 $1/x$ 的一階線性方程" source="正式教材第一章 P.8 · Example" topic="一階線性 ODE">

> 來源類型：正式教材 PDF。來源頁面以積分曲線圖搭配此方程展示。

**題目**：求解（取 $x>0$）

$$y'(x)+\frac{1}{x}y(x)=e^x.$$

<template #solution>

#### 逐步解析：

積分因子為 $\mu(x)=e^{\int dx/x}=x$。乘上 $x$ 後，

$$
\frac{d}{dx}(xy)=xe^x.
$$

積分得

$$xy=\int xe^x\,dx=e^x(x-1)+C.$$

因此

::: tip 標準答案
$$y(x)=\frac{e^x(x-1)+C}{x}=e^x\left(1-\frac{1}{x}\right)+\frac{C}{x},\qquad x>0.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-03" type="example" title="積分曲線例：$y'+xy=2$" source="正式教材第一章 P.9 · Example / Figure 1.3" topic="一階線性 ODE">

> 來源類型：正式教材 PDF。來源頁面主要提供積分曲線圖；下列積分形式是由來源方程精確推得的答案。

**題目**：求解

$$y'(x)+xy(x)=2.$$

<template #solution>

#### 逐步解析：

積分因子為

$$\mu(x)=e^{\int x\,dx}=e^{x^2/2}.$$

故

$$
\frac{d}{dx}\left(e^{x^2/2}y\right)=2e^{x^2/2}.
$$

以 $0$ 為積分下限吸收常數，得到

$$e^{x^2/2}y=C+2\int_0^x e^{s^2/2}\,ds.$$

::: tip 標準答案
$$y(x)=e^{-x^2/2}\left(C+2\int_0^x e^{s^2/2}\,ds\right).$$

此積分沒有初等函數形式；因此以定積分表示就是可對帳的閉式答案。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-04" type="example" title="可分離方程的一般解與初值版本" source="正式教材第一章 P.9、P.10 · 1.2 Example" topic="可分離變數">

> 來源類型：正式教材 PDF；P.9 是一般解，P.10 是同一方程的初值版本。

**題目**：先求解

$$y'=y^2e^{-x},$$

再求滿足 $y(1)=4$ 的特解。

<template #solution>

#### 逐步解析：

對 $y\neq0$ 分離變數：

$$\frac{dy}{y^2}=e^{-x}\,dx\implies -\frac{1}{y}=-e^{-x}+C.$$

改寫常數後，

$$\frac{1}{y}=e^{-x}+C_1.$$

此外，除以 $y^2$ 時排除的 $y\equiv0$ 也是原方程的奇異解。對初值 $y(1)=4$，

$$\frac14=e^{-1}+C_1\implies C_1=\frac14-e^{-1}.$$

::: tip 標準答案
一般解：
$$y(x)=\frac{1}{e^{-x}+C_1},\qquad y\equiv0\text{ 亦為解}.$$

初值特解：
$$y(x)=\frac{1}{e^{-x}+\frac14-e^{-1}}.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-05" type="example" title="一階線性方程：$y'+y=\sin x$" source="正式教材第一章 P.10、P.11 · 1.3 Example" topic="一階線性 ODE">

> 來源類型：正式教材 PDF。

**題目**：求解

$$y'+y=\sin x.$$

<template #solution>

#### 逐步解析：

取積分因子 $e^x$：

$$\frac{d}{dx}(e^xy)=e^x\sin x.$$

由分部積分或直接驗算，

$$\int e^x\sin x\,dx=\frac12e^x(\sin x-\cos x)+C.$$

除以 $e^x$ 得通解。

::: tip 標準答案
$$y(x)=\frac12(\sin x-\cos x)+Ce^{-x}.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-06" type="example" title="一階線性初值問題：$y'=3x^2-y/x$" source="正式教材第一章 P.11 · 1.3 Example" topic="一階線性 ODE / 初值問題">

> 來源類型：正式教材 PDF。

**題目**：求解（$x>0$）

$$y'=3x^2-\frac{y}{x},\qquad y(1)=5.$$

<template #solution>

#### 逐步解析：

先寫成標準式 $y'+\frac1x y=3x^2$。積分因子為 $\mu=x$，故

$$\frac{d}{dx}(xy)=3x^3.$$

積分得 $xy=\frac34x^4+C$，即

$$y=\frac34x^3+\frac{C}{x}.$$

由 $y(1)=5$ 得 $C=\frac{17}{4}$。

::: tip 標準答案
$$y(x)=\frac34x^3+\frac{17}{4x}.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-07" type="example" title="正合方程：三角函數勢函數" source="正式教材第一章 P.13 · 1.4 Example" topic="正合微分方程">

> 來源類型：正式教材 PDF。

**題目**：求解

$$
(\cos x\sin x-xy^2)\,dx+y(1-x^2)\,dy=0.
$$

<template #solution>

#### 逐步解析：

令 $M=\cos x\sin x-xy^2$、$N=y(1-x^2)$。有

$$M_y=-2xy=N_x,$$

所以方程正合。對 $M$ 對 $x$ 積分：

$$\phi(x,y)=\frac12\sin^2x-\frac12x^2y^2+g(y).$$

由 $\phi_y=y(1-x^2)$ 得 $g'(y)=y$，故 $g(y)=\frac12y^2$。

::: tip 標準答案
$$-\frac12x^2y^2+\frac12y^2+\frac12\sin^2x=C.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-08" type="example" title="正合方程：$x e^{xy}=C$" source="正式教材第一章 P.14 · 1.4 Example" topic="正合微分方程">

> 來源類型：正式教材 PDF。

**題目**：求解

$$
(e^{xy}+xy e^{xy})\,dx+x^2e^{xy}\,dy=0.
$$

<template #solution>

#### 逐步解析：

令 $\phi(x,y)=xe^{xy}$，則

$$\phi_x=e^{xy}+xye^{xy},\qquad \phi_y=x^2e^{xy}.$$

兩個係數正好是 $M,N$，所以原式就是 $d\phi=0$。

::: tip 標準答案
$$xe^{xy}=C.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-09" type="example" title="非正合方程判定" source="正式教材第一章 P.14 · 1.4 Example" topic="正合性判定">

> 來源類型：正式教材 PDF；來源只示範判定，沒有可由正合勢函數得到的通解。

**題目**：判定

$$
(x^2+3xy)\,dx+(4xy+2x)\,dy=0
$$

是否為正合方程。

<template #solution>

#### 逐步解析：

取 $M=x^2+3xy$、$N=4xy+2x$，則

$$M_y=3x,\qquad N_x=4y+2.$$

兩者一般不相等，因此不存在此形式下的勢函數 $\phi(x,y)=C$。

::: tip 標準答案
$$M_y\neq N_x,$$
故此方程**非正合**；來源未提供積分因子或進一步通解。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-10" type="example" title="正合方程：$e^x\sin y+y-x^2=C$" source="正式教材第一章 P.15 · 1.4 Example" topic="正合微分方程">

> 來源類型：正式教材 PDF。

**題目**：求解

$$
(e^x\sin y-2x)\,dx+(e^x\cos y+1)\,dy=0.
$$

<template #solution>

#### 逐步解析：

令 $M=e^x\sin y-2x$、$N=e^x\cos y+1$。有

$$M_y=e^x\cos y=N_x,$$

故方程正合。對 $M$ 對 $x$ 積分：

$$\phi=e^x\sin y-x^2+g(y).$$

再由 $\phi_y=e^x\cos y+g'(y)=N$ 得 $g'(y)=1$，即 $g(y)=y$。

::: tip 標準答案
$$e^x\sin y+y-x^2=C.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-11" type="example" title="積分因子：$y^2-6xy+(3xy-6x^2)y'=0$" source="正式教材第一章 P.17 · 1.5 Example" topic="積分因子">

> 來源類型：正式教材 PDF。

**題目**：求解

$$y^2-6xy+(3xy-6x^2)y'=0.$$

<template #solution>

#### 逐步解析：

寫成 $M\,dx+N\,dy=0$，其中 $M=y^2-6xy$、$N=3xy-6x^2$。計算

$$M_y-N_x=(2y-6x)-(3y-12x)=-y+6x.$$

來源的 case 1 比值為

$$\frac{M_y-N_x}{-M}=\frac{-y+6x}{-y^2+6xy}=\frac1y,$$

故積分因子取 $\mu(y)=e^{\int dy/y}=y$。相乘後

$$y^3-6xy^2+(3xy^2-6x^2y)y'=0.$$

其勢函數為 $\phi=x y^3-3x^2y^2$。

::: tip 標準答案
$$xy^3-3x^2y^2=C.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-12" type="example" title="積分因子：$(1-y)e^{x^2/2}=C$" source="正式教材第一章 P.18 · 1.5 Example" topic="積分因子">

> 來源類型：正式教材 PDF；此方程亦與現有 `math-ch1-prob-56` 的 96 考題相同，既有卡片用可分離法得到等價答案。

**題目**：求解

$$x-xy-y'=0.$$

<template #solution>

#### 逐步解析：

令 $M=x-xy$、$N=-1$。因 $M_y-N_x=-x$，且

$$\frac{M_y-N_x}{N}=x,$$

可取積分因子

$$\mu(x)=e^{\int x\,dx}=e^{x^2/2}.$$

相乘後為正合式：

$$\left[(x-xy)e^{x^2/2}\right]dx-e^{x^2/2}dy=0.$$

其勢函數可取 $\phi=(1-y)e^{x^2/2}$。

::: tip 標準答案
$$ (1-y)e^{x^2/2}=C.$$

等價地，取對數可寫成 $\frac12x^2+\ln|1-y|=C'$。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-13" type="example" title="積分因子兩種判別：$y(1+x)dx+x(1+y)dy=0$" source="正式教材第一章 P.19、P.21 · 1.5 Example（case 3 / case 4）" topic="積分因子">

> 來源類型：正式教材 PDF；同一方程在 P.19 與 P.21 分別用 $I(x+y)$、$I(xy)$ 兩種形式示範。

**題目**：求解

$$y(1+x)\,dx+x(1+y)\,dy=0.$$

<template #solution>

#### 逐步解析：

令 $M=y(1+x)$、$N=x(1+y)$，則

$$M_y=1+x,\qquad N_x=1+y,$$

所以 $M_y-N_x=x-y$，原式非正合。

**Case 3：** 取 $I=I(x+y)$，來源比值為 $1$，故 $I=e^{x+y}$。乘上積分因子後，

$$d\left(xy e^{x+y}\right)=0.$$

**Case 4：** 取 $I=I(xy)$，來源比值為 $-1/(xy)$，故 $I=1/(xy)$。相乘後

$$\frac{1+x}{x}\,dx+\frac{1+y}{y}\,dy=0,$$

積分得 $x+\ln|x|+y+\ln|y|=C$，與前式等價。

::: tip 標準答案
$$xy e^{x+y}=C,$$

或在 $x,y\neq0$ 的區域寫成
$$x+y+\ln|x|+\ln|y|=C'.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-14" type="example" title="積分因子：$x^2-y+\ln|y|=C$" source="正式教材第一章 P.22、P.23 · 1.5 Example" topic="積分因子">

> 來源類型：正式教材 PDF。

**題目**：求解

$$2xy-(y-1)y'=0.$$

<template #solution>

#### 逐步解析：

寫成 $M=2xy$、$N=1-y$。則 $M_y-N_x=2x$，且

$$\frac{M_y-N_x}{-M}=\frac{2x}{-2xy}=-\frac1y.$$

因此 $I(y)=e^{\int-dy/y}=1/y$。乘上積分因子後，

$$2x-\frac{y-1}{y}y'=0,$$

是正合方程。勢函數滿足 $\phi_x=2x$、$\phi_y=(1-y)/y$，所以

$$\phi=x^2-y+\ln|y|.$$

::: tip 標準答案
$$x^2-y+\ln|y|=C,\qquad y\neq0.$$

原式另有被積分因子 $1/y$ 排除的常數解 $y\equiv0$。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-15" type="example" title="可分離方程：$y-3-xy'=0$" source="正式教材第一章 P.23、P.24 · Example" topic="可分離變數">

> 來源類型：正式教材 PDF。

**題目**：求解

$$y-3-xy'=0.$$

<template #solution>

#### 逐步解析：

整理為 $xy'=y-3$。對 $y\neq3$ 分離：

$$\frac{dy}{y-3}=\frac{dx}{x}.$$

積分後

$$\ln|y-3|=\ln|x|+C,$$

所以 $y-3=Cx$。常數解 $y=3$ 也包含在 $C=0$ 中。

::: tip 標準答案
$$y(x)=3+Cx.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-16" type="example" title="齊次型一階方程：$xy'=y^2/x+y$" source="正式教材第一章 P.24、P.25 · Homogeneous D.E. Example" topic="齊次型一階 ODE">

> 來源類型：正式教材 PDF。

**題目**：求解（$x\neq0$）

$$xy'=\frac{y^2}{x}+y.$$

<template #solution>

#### 逐步解析：

令 $u=y/x$，即 $y=ux$、$y'=u+xu'$。代入原式：

$$x(u+xu')=u^2x+ux\implies xu'=u^2.$$

對 $u\neq0$ 分離：

$$\frac{du}{u^2}=\frac{dx}{x}implies -\frac1u=\ln|x|+C.$$

因此 $u=-1/(\ln|x|+C)$，回代 $y=ux$。

::: tip 標準答案
$$y(x)=-\frac{x}{\ln|x|+C}.$$

另外 $u=0$ 對應原方程的解 $y\equiv0$。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-17" type="example" title="Bernoulli 方程：$y'+y/x=3x^2y^3$" source="正式教材第一章 P.25 · Bernoulli Example" topic="Bernoulli 方程">

> 來源類型：正式教材 PDF；屬正式教材中的方法示範。

**題目**：求解

$$y'+\frac1x y=3x^2y^3.$$

<template #solution>

#### 逐步解析：

對非零解令 $v=y^{-2}$。因 $v'=-2y^{-3}y'$，原式化為

$$v'-\frac2xv=-6x^2.$$

積分因子為 $x^{-2}$，因此

$$\left(x^{-2}v\right)'=-6.$$

積分得 $x^{-2}v=-6x+C$，即 $v=Cx^2-6x^3$。回代 $v=y^{-2}$。

::: tip 標準答案
$$y(x)=\pm\frac{1}{\sqrt{Cx^2-6x^3}}.$$

另有 $y\equiv0$ 解；來源採其中一個平方根分支表示。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-18" type="example" title="Riccati 方程：已知特解 $y_s=1$" source="正式教材第一章 P.25、P.26 · Riccati Example" topic="Riccati 方程">

> 來源類型：正式教材 PDF；屬講義中的方法示範，不是 101 題庫題。

**題目**：求解

$$y'=\frac1x y^2+\frac1x y-\frac2x.$$

<template #solution>

#### 逐步解析：

觀察得 $y_s=1$ 是一個特解。令

$$y=1+\frac1z,$$

則 $y'=-z'/z^2$。代入並整理：

$$\frac{dz}{dx}+\frac3x z=-\frac1x.$$

積分因子為 $x^3$，故

$$\left(x^3z\right)'=-x^2\implies x^3z=-\frac13x^3+C.$$

所以 $z=-\frac13+C/x^3$，回代得解。

::: tip 標準答案
$$y(x)=1+\frac{1}{-\frac13+\frac{C}{x^3}}.$$

已知特解 $y\equiv1$ 另行保留。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-19" type="example" title="RL 電路：電流建立響應" source="正式教材第一章 P.27 · Application / Example" topic="一階線性 ODE / 電路應用">

> 來源類型：正式教材 PDF 的應用例；非題庫題。來源圖為串聯 $R$-$L$ 電路，以下文字已將圖中條件自包含化。

**題目**：串聯電阻 $R$、電感 $L$ 與直流電壓源 $E$，電流初值為 $i(0)=0$。依 Kirchhoff 電壓定律求 $i(t)$。

<template #solution>

#### 逐步解析：

電阻與電感壓降給出

$$E-Ri-Li'=0,$$

即

$$i'+\frac RL i=\frac EL.$$

積分因子為 $e^{Rt/L}$，所以

$$i(t)=\frac ER+Ke^{-Rt/L}.$$

由 $i(0)=0$ 得 $K=-E/R$。

::: tip 標準答案
$$i(t)=\frac ER\left(1-e^{-Rt/L}\right).$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch1-missing-20" type="example" title="RC 電路：電荷與電流響應" source="正式教材第一章 P.27、P.28 · Application / Example" topic="一階線性 ODE / 電路應用">

> 來源類型：正式教材 PDF 的應用例；非題庫題。來源圖為串聯 $R$-$C$ 電路，以下文字已將圖中條件自包含化。

**題目**：串聯電阻 $R$、電容 $C$ 與直流電壓源 $E$，電荷初值為 $q(0)=0$，且 $i=dq/dt$。求 $q(t)$ 與 $i(t)$。

<template #solution>

#### 逐步解析：

Kirchhoff 電壓定律為

$$Ri+\frac qC=E.$$

代入 $i=q'$：

$$q'+\frac{1}{RC}q=\frac ER.$$

積分因子為 $e^{t/(RC)}$，所以

$$q(t)=CE+Ke^{-t/(RC)}.$$

由 $q(0)=0$ 得 $K=-CE$。再微分即可得到電流。

::: tip 標準答案
$$q(t)=CE\left(1-e^{-t/(RC)}\right),$$
$$i(t)=\frac{dq}{dt}=\frac ER e^{-t/(RC)}.$$
:::

</template>
</PracticeCard>

## 已完成盤點（第二章）

- 目前第二章 PracticeCard 共 15 題。
- 其中前 10 題標示為 `題庫 2.4/2.6`；它們屬於課堂講義／題庫題，不是本次提供的正式教材第二章 PDF 內可逐題對應的 Example，因此保留在現有頁面，但不能宣稱已由該正式教材覆蓋。
- 現有第 11–15 題可分別對應正式教材第二章 P.35、P.36–P.37、P.39–P.40、P.40–P.41、P.42–P.43。
- 正式教材第二章可辨識的獨立解題例題共 20 組（重複刊載的同一方程式合併計算）；現有卡片覆蓋 5 組，以下補入其餘 15 組。P.29 的一般 Wronskian 判別與其後例題合併成第 1 題，避免把同一個解題流程重複計數。

<PracticeCard id="math-ch2-missing-01" type="example" title="Wronskian 判別與二階齊次方程通解" source="正式教材第二章 P.29 · Example" topic="Wronskian">

> 來源類型：正式教材（課本）

已知 $y_1=\cos x$、$y_2=\sin x$ 都是 $y''+y=0$ 的解。判斷兩解是否線性獨立，並寫出通解。

Wronskian 為

$$
W(y_1,y_2)=
\begin{vmatrix}
\cos x & \sin x\\
-\sin x & \cos x
\end{vmatrix}
=\cos^2x+\sin^2x=1\ne0.
$$

因此 $y_1,y_2$ 線性獨立，方程式的通解為

$$y=C_1\cos x+C_2\sin x.$$

**答案：** $W=1\ne0$；兩解線性獨立，$y=C_1\cos x+C_2\sin x$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-02" type="example" title="二階齊次方程：兩相異實根" source="正式教材第二章 P.31 · Example" topic="二階常係數齊次微分方程">

> 來源類型：正式教材（課本）

求解

$$y''+3y'+2y=0.$$

令 $y=e^{\lambda x}$，得特徵方程

$$\lambda^2+3\lambda+2=(\lambda+1)(\lambda+2)=0,$$

所以 $\lambda_1=-1$、$\lambda_2=-2$。兩根相異，故

$$y=C_1e^{-x}+C_2e^{-2x}.$$

**答案：** $y=C_1e^{-x}+C_2e^{-2x}$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-03" type="example" title="二階齊次方程：共軛複根" source="正式教材第二章 P.31 · Example" topic="二階常係數齊次微分方程">

> 來源類型：正式教材（課本）

求解

$$y''+y'+2y=0.$$

特徵方程為

$$\lambda^2+\lambda+2=0,$$

其根為

$$\lambda=\frac{-1\pm\sqrt{1-8}}{2}= -\frac12\pm\frac{\sqrt7}{2}i.$$

因此實數通解為

$$y=e^{-x/2}\left(C_1\cos\frac{\sqrt7}{2}x+C_2\sin\frac{\sqrt7}{2}x\right).$$

**答案：** $y=e^{-x/2}\left(C_1\cos(\sqrt7x/2)+C_2\sin(\sqrt7x/2)\right)$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-04" type="example" title="二階齊次方程：重根" source="正式教材第二章 P.31 · Example" topic="二階常係數齊次微分方程">

> 來源類型：正式教材（課本）

求解

$$y''+2y'+y=0.$$

特徵方程為

$$\lambda^2+2\lambda+1=(\lambda+1)^2=0.$$

因為 $\lambda=-1$ 為二重根，兩個獨立解為 $e^{-x}$ 與 $xe^{-x}$，所以

$$y=e^{-x}(C_1+C_2x).$$

**答案：** $y=e^{-x}(C_1+C_2x)$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-05" type="example" title="三階齊次方程：三個相異實根" source="正式教材第二章 P.32 · Example" topic="高階常係數齊次微分方程">

> 來源類型：正式教材（課本）

求解

$$y'''+6y''+11y'+6y=0.$$

特徵方程可分解為

$$\lambda^3+6\lambda^2+11\lambda+6=(\lambda+1)(\lambda+2)(\lambda+3)=0.$$

因此根為 $-1,-2,-3$，通解為

$$y=C_1e^{-x}+C_2e^{-2x}+C_3e^{-3x}.$$

**答案：** $y=C_1e^{-x}+C_2e^{-2x}+C_3e^{-3x}$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-06" type="example" title="三階齊次方程：三重根" source="正式教材第二章 P.32 · Example" topic="高階常係數齊次微分方程">

> 來源類型：正式教材（課本）

求解

$$y'''+3y''+3y'+y=0.$$

特徵方程為

$$\lambda^3+3\lambda^2+3\lambda+1=(\lambda+1)^3=0.$$

根 $\lambda=-1$ 為三重根，因此

$$y=e^{-x}(C_1+C_2x+C_3x^2).$$

**答案：** $y=e^{-x}(C_1+C_2x+C_3x^2)$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-07" type="example" title="四階齊次方程：實根含重根" source="正式教材第二章 P.32 · Example" topic="高階常係數齊次微分方程">

> 來源類型：正式教材（課本）

求解

$$y^{(4)}+7y'''+17y''+17y'+6y=0.$$

特徵多項式分解為

$$\lambda^4+7\lambda^3+17\lambda^2+17\lambda+6=(\lambda+1)^2(\lambda+2)(\lambda+3).$$

根 $-1$ 為二重根，另有 $-2,-3$，故

$$y=C_1e^{-x}+C_2xe^{-x}+C_3e^{-2x}+C_4e^{-3x}.$$

**答案：** $y=C_1e^{-x}+C_2xe^{-x}+C_3e^{-2x}+C_4e^{-3x}$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-08" type="example" title="四階齊次方程：複根含重根" source="正式教材第二章 P.33 · Example" topic="高階常係數齊次微分方程">

> 來源類型：正式教材（課本）

求解

$$y^{(4)}+4y'''+8y''+8y'+4y=0.$$

特徵多項式為

$$\lambda^4+4\lambda^3+8\lambda^2+8\lambda+4=(\lambda^2+2\lambda+2)^2.$$

而 $\lambda^2+2\lambda+2=0$ 的根為 $-1\pm i$，且各為二重根。因此

$$y=e^{-x}\left[(C_1+C_3x)\cos x+(C_2+C_4x)\sin x\right].$$

**答案：** $y=e^{-x}\left[(C_1+C_3x)\cos x+(C_2+C_4x)\sin x\right]$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-09" type="example" title="未定係數法：多項式外力" source="正式教材第二章 P.34 · Example" topic="非齊次常係數微分方程">

> 來源類型：正式教材（課本）

求解

$$y''-4y=8x^2-2x.$$

齊次解由 $\lambda^2-4=0$ 得

$$y_h=C_1e^{2x}+C_2e^{-2x}.$$

令特解為 $y_p=Ax^2+Bx+C$，則 $y_p''-4y_p$ 的係數比較給出

$$-4A=8,\qquad -4B=-2,\qquad 2A-4C=0,$$

所以 $A=-2$、$B=1/2$、$C=-1$。因此

$$y=C_1e^{2x}+C_2e^{-2x}-2x^2+\frac12x-1.$$

**答案：** $y=C_1e^{2x}+C_2e^{-2x}-2x^2+\frac12x-1$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-10" type="example" title="未定係數法：指數外力" source="正式教材第二章 P.34–P.35 · Example" topic="非齊次常係數微分方程">

> 來源類型：正式教材（課本）

求解

$$y''+2y'-3y=4e^{2x}.$$

齊次特徵方程為

$$\lambda^2+2\lambda-3=(\lambda-1)(\lambda+3)=0,$$

故 $y_h=C_1e^x+C_2e^{-3x}$。令 $y_p=Ae^{2x}$，代回左側得

$$\left(2^2+2\cdot2-3\right)Ae^{2x}=5Ae^{2x}=4e^{2x},$$

所以 $A=4/5$。總解為

$$y=C_1e^x+C_2e^{-3x}+\frac45e^{2x}.$$

**答案：** $y=C_1e^x+C_2e^{-3x}+\frac45e^{2x}$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-11" type="example" title="未定係數法：正弦外力" source="正式教材第二章 P.35、P.37–P.39 · Example（同題重現）" topic="非齊次常係數微分方程">

> 來源類型：正式教材（課本；P.37–P.39 為同一題的再次呈現）

求解

$$y''-5y'+6y=-3\sin 2x.$$

齊次特徵方程為 $(\lambda-2)(\lambda-3)=0$，所以

$$y_h=C_1e^{2x}+C_2e^{3x}.$$

令 $y_p=A\cos2x+B\sin2x$，代回並比較 $\cos2x$、$\sin2x$ 係數，得

$$A=-\frac{15}{52},\qquad B=-\frac{3}{52}.$$

因此

$$y=C_1e^{2x}+C_2e^{3x}-\frac{15}{52}\cos2x-\frac{3}{52}\sin2x.$$

**答案：** $y=C_1e^{2x}+C_2e^{3x}-\frac{15}{52}\cos2x-\frac{3}{52}\sin2x$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-12" type="example" title="運算子法：指數乘多項式外力" source="正式教材第二章 P.37 · Example" topic="運算子法">

> 來源類型：正式教材（課本）

求解

$$y''+3y'+2y=xe^{-x}.$$

齊次解為

$$y_h=C_1e^{-x}+C_2e^{-2x}.$$

令 $y=e^{-x}u$。因為 $D+1$ 作用在 $e^{-x}u$ 上可化為 $e^{-x}D$，故

$$y''+3y'+2y=e^{-x}(u''+u').$$

取 $u=ax^2+bx$，比較 $u''+u'=x$ 的係數：

$$2a=1,\qquad 2a+b=0,$$

得到 $a=1/2$、$b=-1$。所以

$$y=C_1e^{-x}+C_2e^{-2x}+e^{-x}\left(\frac{x^2}{2}-x\right).$$

**答案：** $y=C_1e^{-x}+C_2e^{-2x}+e^{-x}(x^2/2-x)$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-13" type="example" title="Euler–Cauchy 方程：複根" source="正式教材第二章 P.41 · Example" topic="Euler–Cauchy 方程">

> 來源類型：正式教材（課本）

求解

$$x^2y''+3xy'+10y=0,\qquad x>0.$$

令 $t=\ln x$、$y(x)=Y(t)$，則 $xy'=Y'$ 且 $x^2y''=Y''-Y'$，方程式化為

$$Y''+2Y'+10Y=0.$$

特徵根為 $-1\pm3i$，因此

$$Y=e^{-t}(C_1\cos3t+C_2\sin3t).$$

換回 $t=\ln x$，得到

$$y=x^{-1}\left[C_1\cos(3\ln x)+C_2\sin(3\ln x)\right].$$

**答案：** $y=x^{-1}[C_1\cos(3\ln x)+C_2\sin(3\ln x)]$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-14" type="example" title="Euler–Cauchy 初值問題" source="正式教材第二章 P.41 · Example" topic="Euler–Cauchy 方程">

> 來源類型：正式教材（課本）

求解初值問題

$$x^2y''-5xy'+10y=0,\qquad y(1)=4,\quad y'(1)=-6.$$

令 $t=\ln x$、$y(x)=Y(t)$，得

$$Y''-6Y'+10Y=0,$$

其特徵根為 $3\pm i$，所以

$$y=x^3(C_1\cos\ln x+C_2\sin\ln x).$$

由 $y(1)=4$ 得 $C_1=4$。微分後在 $x=1$ 代入 $y'(1)=-6$，得 $12+C_2=-6$，故 $C_2=-18$。因此

$$y=4x^3\cos(\ln x)-18x^3\sin(\ln x).$$

**答案：** $y=4x^3\cos(\ln x)-18x^3\sin(\ln x)$。

</PracticeCard>

<PracticeCard id="math-ch2-missing-15" type="example" title="降階法：已知一個解求第二個解" source="正式教材第二章 P.42 · Example" topic="降階法">

> 來源類型：正式教材（課本）

已知 $y_1=e^{-2x}$ 是

$$y''+4y'+4y=0$$

的一個解，求另一個線性獨立解與通解。

令 $y=u(x)e^{-2x}$。代入原方程式後，含 $u$ 與 $u'$ 的項抵消，得到

$$u''=0.$$

因此 $u=C_1x+C_2$。取不與 $y_1$ 重複的部分 $u=x$，可得

$$y_2=xe^{-2x}.$$

故通解為

$$y=C_1e^{-2x}+C_2xe^{-2x}.$$

**答案：** $y_2=xe^{-2x}$；$y=C_1e^{-2x}+C_2xe^{-2x}$。

</PracticeCard>
