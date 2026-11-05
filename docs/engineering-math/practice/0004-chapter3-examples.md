---
title: Chapter 3 拉普拉斯轉換範例題庫
description: 工程數學第三章拉普拉斯轉換教材範例，含逐步解答與來源核對註記
---

# Chapter 3：拉普拉斯轉換範例題庫

> 來源：工程數學（上）電子檔第三章，PDF 印刷頁碼 46–57。這份講義列出的是已解範例，沒有獨立編號的 Exercise 題組。

<PracticeFilter prefix="math-ch3-" />
<PracticeProgress :total="18" prefix="math-ch3-" />

## 拉普拉斯轉換定理範例

<PracticeCard id="math-ch3-prob-1" type="example" title="線性定理：指數與多項式的和" source="正式教材第三章 P.46 · Example" topic="線性定理">

**題目**：求

$$\mathcal{L}\left[e^{3t}+2t\right].$$

<template #solution>

由線性定理及基本轉換式，

$$
\begin{aligned}
\mathcal{L}\left[e^{3t}+2t\right]
&=\mathcal{L}[e^{3t}]+2\mathcal{L}[t]\\
&=\frac{1}{s-3}+\frac{2}{s}.
\end{aligned}
$$

::: tip 標準答案
$$\frac{1}{s-3}+\frac{2}{s}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-2" type="example" title="第一移位與微乘定理" source="正式教材第三章 P.46–47 · Example" topic="第一移位 / 微乘">

**題目**：求

$$\mathcal{L}\left[te^{2t}\right].$$

<template #solution>

**第一移位定理**：先用 $\mathcal{L}[t]=1/s^2$，再將 $s$ 換成 $s-2$：

$$\mathcal{L}\left[te^{2t}\right]=\left.\frac{1}{s^2}\right|_{s\mapsto s-2}=\frac{1}{(s-2)^2}.$$

**微乘定理**也得到同一結果。因為 $\mathcal{L}[e^{2t}]=1/(s-2)$，

$$\mathcal{L}\left[te^{2t}\right]=-\frac{d}{ds}\left(\frac{1}{s-2}\right)=\frac{1}{(s-2)^2}.$$

::: tip 標準答案
$$\frac{1}{(s-2)^2}$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-3" type="example" title="第二移位定理：延遲指數函數" source="正式教材第三章 P.48 · Example" topic="第二移位">

**題目**：求

$$\mathcal{L}\left[e^{3(t-2)}H(t-2)\right].$$

<template #solution>

令 $f(t)=e^{3t}$，則 $F(s)=1/(s-3)$。套用
$\mathcal{L}[f(t-a)H(t-a)]=e^{-as}F(s)$：

::: tip 標準答案
$$\mathcal{L}\left[e^{3(t-2)}H(t-2)\right]=\frac{e^{-2s}}{s-3}.$$
:::

</template>
</PracticeCard>

## 正向拉普拉斯轉換

<PracticeCard id="math-ch3-prob-4" type="example" title="多項式乘指數函數" source="正式教材第三章 P.51 · Example" topic="第一移位 / 多項式">

**題目**：求

$$\mathcal{L}\left[e^{-2t}(t^3-3t+2)\right].$$

<template #solution>

先求未乘指數時的轉換：

$$\mathcal{L}[t^3-3t+2]=\frac{3!}{s^4}-\frac{3}{s^2}+\frac{2}{s}.$$

因乘上 $e^{-2t}$，依第一移位定理將 $s$ 換成 $s+2$：

::: tip 由定理直接計算
$$\mathcal{L}\left[e^{-2t}(t^3-3t+2)\right]
=\frac{3!}{(s+2)^4}-\frac{3}{(s+2)^2}+\frac{2}{s+2}.$$
:::

::: warning 來源答案疑誤
講義 P.51 最後一行把第二項印成 $-4/(s+2)^2$，但同頁前一行給出的基本轉換是 $-3/s^2$。按移位定理計算應為 $-3/(s+2)^2$；保留此來源差異供核對。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-5" type="example" title="分段函數：延遲後切換為餘弦函數" source="正式教材第三章 P.51 · Example" topic="分段函數 / 第二移位">

**題目**：若

$$
f(t)=
\begin{cases}
1,&0\le t<7,\\
\cos t,&t\ge 7,
\end{cases}
$$

求 $\mathcal{L}[f(t)]$。

<template #solution>

將函數改寫為

$$f(t)=1-H(t-7)+H(t-7)\cos t.$$

令 $u=t-7$，並用 $\cos(u+7)=\cos u\cos 7-\sin u\sin 7$，則

$$
\begin{aligned}
\mathcal{L}[f(t)]
&=\frac{1}{s}-\frac{e^{-7s}}{s}
+e^{-7s}\left(\frac{s\cos 7}{s^2+1}-\frac{\sin 7}{s^2+1}\right).
\end{aligned}
$$

::: warning 來源答案疑誤
講義 P.51 在改寫函數時寫出 $-\sin(t-7)\sin 7$，但最後轉換式把相應的 $\sin 7$ 項印成正號。依同頁的餘弦加法公式，該項應為負號；此處依公式列出結果並保留來源差異。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-6" type="example" title="分段函數：兩段常數與延遲指數" source="正式教材第三章 P.51 · Example" topic="分段函數 / 第二移位">

**題目**：若

$$
f(t)=
\begin{cases}
-4,&0\le t<1,\\
0,&1\le t<3,\\
e^{-t},&t\ge 3,
\end{cases}
$$

求 $\mathcal{L}[f(t)]$。

<template #solution>

用單位步階函數表示：

$$f(t)=-4[H(t)-H(t-1)]+H(t-3)e^{-t}.$$

最後一項改寫成 $e^{-3}e^{-(t-3)}H(t-3)$，因此

::: tip 標準答案
$$\mathcal{L}[f(t)]=-\frac{4}{s}+\frac{4e^{-s}}{s}+\frac{e^{-3}e^{-3s}}{s+1}.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-7" type="example" title="指數與雙曲餘弦函數的拉普拉斯轉換" source="正式教材第三章 P.52 · Example" topic="第一移位 / 雙曲函數">

**題目**：求

$$\mathcal{L}\left[e^t(1-\cosh t)\right].$$

<template #solution>

由 $\cosh t=(e^t+e^{-t})/2$，

$$e^t(1-\cosh t)=e^t-\frac{e^{2t}+1}{2}.$$

逐項轉換可得

::: tip 依題目直接展開
$$\mathcal{L}\left[e^t(1-\cosh t)\right]
=\frac{1}{s-1}-\frac{1}{2(s-2)}-\frac{1}{2s}.$$
:::

::: warning 來源答案疑誤
講義 P.52 的最後一行將 $1/[2(s-2)]$ 寫成正號；由題目展開成 $e^t-(e^{2t}+1)/2$ 可知該項應為負號。此處列出依原式直接計算的結果，並保留來源差異。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-8" type="example" title="多項式的平移與單位步階函數" source="正式教材第三章 P.52 · Example" topic="時間平移 / 第二移位">

**題目**：令 $f(t)=3t^2+2t+5$，求下列各式：

1. $\mathcal{L}[f(t)]$
2. $\mathcal{L}[f(t-1)]$
3. $\mathcal{L}[f(t)H(t-1)]$
4. $\mathcal{L}[f(t-1)H(t-1)]$

<template #solution>

前三小題的講義解答如下。

$$
\begin{aligned}
\mathcal{L}[f(t)]
&=\frac{6}{s^3}+\frac{2}{s^2}+\frac{5}{s},\\
\mathcal{L}[f(t-1)]
&=\mathcal{L}[3t^2-4t+6]
=\frac{6}{s^3}-\frac{4}{s^2}+\frac{6}{s},\\
\mathcal{L}[f(t)H(t-1)]
&=e^{-s}\left(\frac{6}{s^3}+\frac{8}{s^2}+\frac{10}{s}\right).
\end{aligned}
$$

::: warning 來源未提供第 4 小題解答
講義 P.52 列出 $\mathcal{L}[f(t-1)H(t-1)]$，但後續只解到第 3 小題。依來源規則，本卡保留題目並記錄缺少解答，不補寫該小題的答案。
:::

</template>
</PracticeCard>

## 反拉普拉斯轉換

<PracticeCard id="math-ch3-prob-9" type="example" title="簡單部分分式反轉換" source="正式教材第三章 P.52 · Example" topic="部分分式">

**題目**：求

$$\mathcal{L}^{-1}\left[\frac{1}{(s+1)(s+2)}\right].$$

<template #solution>

部分分式分解：

$$\frac{1}{(s+1)(s+2)}=\frac{1}{s+1}-\frac{1}{s+2}.$$

::: tip 標準答案
$$\mathcal{L}^{-1}\left[\frac{1}{(s+1)(s+2)}\right]=e^{-t}-e^{-2t}.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-10" type="example" title="三個相異一次因子的部分分式" source="正式教材第三章 P.52–53 · Example" topic="部分分式 / 反拉普拉斯">

**題目**：假設 $a,b,c$ 兩兩相異，將

$$\frac{1}{(s+a)(s+b)(s+c)}$$

作部分分式分解，並求其反拉普拉斯轉換。

<template #solution>

設

$$\frac{1}{(s+a)(s+b)(s+c)}
=\frac{A}{s+a}+\frac{B}{s+b}+\frac{C}{s+c}.$$

分別代入 $s=-a,-b,-c$：

$$
\begin{aligned}
A&=\frac{1}{(b-a)(c-a)},\\
B&=\frac{1}{(a-b)(c-b)},\\
C&=\frac{1}{(a-c)(b-c)}.
\end{aligned}
$$

::: tip 標準答案
$$\mathcal{L}^{-1}\left[\frac{1}{(s+a)(s+b)(s+c)}\right]
=Ae^{-at}+Be^{-bt}+Ce^{-ct}.$$
:::

::: warning 來源符號不一致
講義 P.52 的部分分式第一行將第三項係數寫成 $D$，但下一行與後續解答均使用 $C$。本卡依後續表示統一為 $C$。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-11" type="example" title="反轉換與第二移位：延遲餘弦函數" source="正式教材第三章 P.53 · Example" topic="第二移位 / 反拉普拉斯">

**題目**：求

$$\mathcal{L}^{-1}\left[\frac{s e^{-2s}}{s^2+9}\right].$$

<template #solution>

先辨認基本式

$$\mathcal{L}^{-1}\left[\frac{s}{s^2+9}\right]=\cos 3t.$$

再用第二移位定理：

::: tip 依基本式與移位定理
$$\mathcal{L}^{-1}\left[\frac{s e^{-2s}}{s^2+9}\right]
=\cos\left(3(t-2)\right)H(t-2).$$
:::

::: warning 來源推導前後不一致
講義 P.53 前段先把含 $s$ 的分子誤化為 $1/(s^2+9)$ 並寫出 $\sin 3t$；後段改用正確基本式 $s/(s^2+9)\leftrightarrow\cos 3t$，最後答案也寫成 $\cos(3(t-2))H(t-2)$。本卡依題目與後段修正式列答。
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-12" type="example" title="完成平方與第一移位" source="正式教材第三章 P.53 · Example" topic="第一移位 / 反拉普拉斯">

**題目**：求

$$\mathcal{L}^{-1}\left[\frac{1}{s^2-4s+5}\right].$$

<template #solution>

完成平方：

$$s^2-4s+5=(s-2)^2+1.$$

由 $\mathcal{L}[\sin t]=1/(s^2+1)$ 及第一移位定理，

::: tip 標準答案
$$\mathcal{L}^{-1}\left[\frac{1}{(s-2)^2+1}\right]=e^{2t}\sin t.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-13" type="example" title="部分分式與延遲 21 單位" source="正式教材第三章 P.53–54 · Example" topic="部分分式 / 第二移位">

**題目**：求

$$\mathcal{L}^{-1}\left[\frac{e^{-21s}}{s(s^2+16)}\right].$$

<template #solution>

先部分分式分解：

$$\frac{1}{s(s^2+16)}=\frac{1}{16s}-\frac{s}{16(s^2+16)}.$$

因此未平移的反轉換為

$$f(t)=\frac{1}{16}-\frac{1}{16}\cos 4t.$$

再用第二移位定理：

::: tip 標準答案
$$\mathcal{L}^{-1}\left[\frac{e^{-21s}}{s(s^2+16)}\right]
=\frac{1}{16}\left[1-\cos\left(4(t-21)\right)\right]H(t-21).$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-14" type="example" title="指數平移與單位步階函數" source="正式教材第三章 P.54 · Example" topic="第一移位 / 第二移位">

**題目**：求

$$\mathcal{L}^{-1}\left[\frac{e^{-s}}{(s-5)^3}\right].$$

<template #solution>

先由

$$\mathcal{L}^{-1}\left[\frac{1}{(s-5)^3}\right]
=\frac{1}{2}t^2e^{5t}$$

得到未延遲函數，再套用第二移位定理。

::: tip 標準答案
$$\mathcal{L}^{-1}\left[\frac{e^{-s}}{(s-5)^3}\right]
=\frac{1}{2}e^{5(t-1)}(t-1)^2H(t-1).$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-15" type="example" title="微乘定理與延遲正弦函數" source="正式教材第三章 P.54 · Example" topic="微乘 / 第二移位">

**題目**：求

$$\mathcal{L}^{-1}\left[\frac{s e^{-10s}}{(s^2+4)^2}\right].$$

<template #solution>

由 $\mathcal{L}[\frac12\sin 2t]=1/(s^2+4)$，利用
$\mathcal{L}[t f(t)]=-F'(s)$：

$$\mathcal{L}\left[\frac14 t\sin 2t\right]
=\frac{s}{(s^2+4)^2}.$$

再將 $e^{-10s}$ 對應的第二移位套用到此結果。

::: tip 依微乘與第二移位定理
$$\mathcal{L}^{-1}\left[\frac{s e^{-10s}}{(s^2+4)^2}\right]
=\frac14(t-10)\sin\left(2(t-10)\right)H(t-10).$$
:::

::: warning 來源答案疑似漏寫因子 2
講義 P.54 的推導使用 $\sin 2t$，但最後答案將正弦函數印成 $\sin(t-10)$。依同頁微乘推導，平移後應為 $\sin(2(t-10))$；保留來源差異供核對。
:::

</template>
</PracticeCard>

## 初值問題與電路應用

<PracticeCard id="math-ch3-prob-16" type="example" title="一階初值問題：常數外力" source="正式教材第三章 P.55 · Example" topic="初值問題 / 拉普拉斯轉換">

**題目**：使用拉普拉斯轉換求解

$$y'(t)-4y(t)=1,\qquad y(0)=1.$$

<template #solution>

令 $Y(s)=\mathcal{L}[y(t)]$。利用 $\mathcal{L}[y']=sY-y(0)$：

$$sY(s)-1-4Y(s)=\frac{1}{s},$$

所以

$$Y(s)=\frac{1}{s-4}+\frac{1}{s(s-4)}
=\frac{5}{4}\frac{1}{s-4}-\frac{1}{4}\frac{1}{s}.$$

::: tip 標準答案
$$y(t)=\frac54e^{4t}-\frac14.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-17" type="example" title="二階初值問題：指數外力" source="正式教材第三章 P.55–56 · Example" topic="初值問題 / 拉普拉斯轉換">

**題目**：使用拉普拉斯轉換求解

$$y''(t)+4y'(t)+3y(t)=e^t,\qquad y(0)=0,\quad y'(0)=2.$$

<template #solution>

令 $Y(s)=\mathcal{L}[y(t)]$。代入初值：

$$s^2Y(s)-2+4sY(s)+3Y(s)=\frac{1}{s-1}.$$

因此

$$Y(s)=\frac{2s-1}{(s-1)(s+1)(s+3)}
=\frac{1}{8(s-1)}+\frac{3}{4(s+1)}-\frac{7}{8(s+3)}.$$

::: tip 標準答案
$$y(t)=\frac18e^t+\frac34e^{-t}-\frac78e^{-3t}.$$
:::

</template>
</PracticeCard>

<PracticeCard id="math-ch3-prob-18" type="example" title="二迴路 RC 電路的暫態電流" source="正式教材第三章 P.56–57 · Example" topic="電路模型 / 拉普拉斯轉換">

**題目**：依下圖電路與電流方向，使用拉普拉斯轉換求網孔電流 $I_1(t)$、$I_2(t)$。電源為 $10\text{ V}$，$R_1=40\,\Omega$、$R_2=60\,\Omega$，兩個電容皆為 $1/120\text{ F}$，且 $q_1(0)=q_2(0)=0$。

![工程數學第三章 P.56 二迴路 RC 電路原圖](../assets/images/ch3-laplace-circuit-example.png)

<template #solution>

依圖中電流方向，講義列出的 KVL 方程為

$$
\begin{aligned}
40I_1+120(q_1-q_2)&=10,\\
60I_2+120q_2&=120(q_1-q_2),\\
\frac{dq_1}{dt}&=I_1,\qquad \frac{dq_2}{dt}=I_2.
\end{aligned}
$$

由 $q_1(0)=q_2(0)=0$，對方程作拉普拉斯轉換並整理：

$$
\begin{aligned}
(s+3)I_1(s)-3I_2(s)&=\frac14,\\
2I_1(s)-(s+4)I_2(s)&=0.
\end{aligned}
$$

解得

$$
\begin{aligned}
I_1(s)&=\frac{s+4}{4(s+1)(s+6)}
=\frac{3}{20}\frac{1}{s+1}+\frac{1}{10}\frac{1}{s+6},\\
I_2(s)&=\frac{1}{2(s+1)(s+6)}
=\frac{1}{10}\frac{1}{s+1}-\frac{1}{10}\frac{1}{s+6}.
\end{aligned}
$$

::: tip 標準答案
$$
\begin{aligned}
I_1(t)&=\frac{3}{20}e^{-t}+\frac{1}{10}e^{-6t},\\
I_2(t)&=\frac{1}{10}e^{-t}-\frac{1}{10}e^{-6t}.
\end{aligned}
$$
:::

</template>
</PracticeCard>
