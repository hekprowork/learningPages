---
title: 電子學 Chapter 1/2 教材題卡完整盤點
description: 依 docs/electronics/課本.pdf 對照現有 practice 頁面完成的教材題號盤點與題卡索引
---

# 電子學 Chapter 1/2 題目盤點

> 來源：`docs/electronics/課本.pdf`。頁碼中的 `PDF p.` 是 PDF 實際頁序；括號內為教材印刷頁碼。此頁保留完整題號盤點與各批題卡索引。

<PracticeFilter prefix="elec-ch1-missing-" />
<PracticeProgress :total="11" prefix="elec-ch1-missing-" />

## 目前覆蓋結論

| 範圍 | 教材正文 Examples | 教材 Exercises | 章末 Problems | 目前已上網 | 尚未上網 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Chapter 1 | 5/5 | 24/24 | 83/83 | 112 張 | 0 題 |
| Chapter 2 | 9/9 | 26/26 | 127/127 | 162 張 | 0 題 |
| 合計 | 14/14 | 50/50 | 210/210 | 274 張 | 0 題 |

正文 Examples 已完整覆蓋：Chapter 1 為 Example 1.1–1.5；Chapter 2 為 Example 2.1–2.9。Exercises 與章末 Problems 也已完成目前網站 Chapter 1–2 教材範圍的逐題上網。

## 完整題號盤點

### Chapter 1

- 正文 Examples：`1.1, 1.2, 1.3, 1.4, 1.5`；現有頁面 **全部已上網**。
- Exercises：教材實際列出 `1.1–1.22, D1.23, D1.24`，共 24 題；目前已全部上網。
- Chapter 1 Problems：教材完整列出 `1.1–1.83`，共 83 題；目前已上網 `1.1–1.83`。

章末 Problems 的 PDF 起始頁盤點：`1.1–1.7` 在 PDF p.76（印刷 p.46）、`1.8–1.16` 在 p.77（p.47）、`1.17–1.21` 在 p.78（p.48）、`1.22–1.31` 在 p.79（p.49）、`1.32–1.42` 在 p.80（p.50）、`1.43–1.50` 在 p.81（p.51）、`1.51–1.57` 在 p.82（p.52）、`1.58–1.65` 在 p.83（p.53）、`1.66–1.69` 在 p.84（p.54）、`1.70–1.77` 在 p.85（p.55）、`1.78–1.81` 在 p.86（p.56）、`1.82–1.83` 在 p.87（p.57）。

### Chapter 2

- 正文 Examples：`2.1–2.9`；現有頁面 **全部已上網**。
- Exercises：教材實際列出 26 題；目前已上網 `2.1–2.28` 的全部 26 題。
- Chapter 2 Problems：教材完整列出 `2.1–2.127`，共 127 題；目前已全部上網。PDF 題號跨欄排列，已逐頁視覺核對 p.148–p.165（印刷 p.118–p.135），不能只靠單一文字 regex 判斷。

## 首批可可靠轉錄的缺漏題卡

以下題卡涵蓋首批補入題目；其餘已補入題卡分列於本頁末的批次索引。教材已印出的 Ans. 已逐項對帳；教材未提供標準答案者則明確標示待補解答。

<PracticeCard type="exercise" id="elec-ch1-missing-ex-1-3" title="戴維寧訊號源接不同負載時的輸出電壓" source="Exercise 1.3 · 教材 PDF p.39（印刷 p.9）" topic="訊號源模型">

某訊號源以戴維寧等效表示，$v_s=10\text{ mV}$、$R_s=1\text{ k}\Omega$，接上負載 $R_L$。求 $R_L=100\text{ k}\Omega,10\text{ k}\Omega,1\text{ k}\Omega,100\Omega$ 時的 $v_o$；並求使 $v_o\ge 0.8v_s$ 所需的最低 $R_L$。

<template #solution>

由分壓式

$$
v_o=v_s\frac{R_L}{R_s+R_L}.
$$

依序代入四個負載：

$$
v_o=9.90\text{ mV},\quad 9.09\text{ mV},\quad 5.00\text{ mV},\quad 0.909\text{ mV}.
$$

若 $v_o/v_s\ge0.8$，則

$$
\frac{R_L}{R_s+R_L}\ge0.8
\Longrightarrow R_L\ge4R_s=4\text{ k}\Omega.
$$

::: tip 標準答案
$v_o=9.9\text{ mV},9.1\text{ mV},5\text{ mV},0.9\text{ mV}$；最低負載為 $R_L=4\text{ k}\Omega$。
:::

</template>
</PracticeCard>

<PracticeCard type="exercise" id="elec-ch1-missing-ex-1-4" title="諾頓訊號源接不同負載時的輸出電流" source="Exercise 1.4 · 教材 PDF p.39（印刷 p.9）" topic="訊號源模型">

某訊號源以諾頓等效表示，$i_s=10\,\mu\text{A}$、$R_s=100\text{ k}\Omega$，接上負載 $R_L$。求 $R_L=1\text{ k}\Omega,10\text{ k}\Omega,100\text{ k}\Omega,1\text{ M}\Omega$ 時的 $i_o$；並求使 $i_o\ge0.8i_s$ 所需的最大 $R_L$。

<template #solution>

由電流分配式

$$
i_o=i_s\frac{R_s}{R_s+R_L}.
$$

四個負載對應為

$$
i_o=9.90\,\mu\text{A},\quad9.09\,\mu\text{A},\quad5.00\,\mu\text{A},\quad0.909\,\mu\text{A}.
$$

由 $R_s/(R_s+R_L)\ge0.8$ 得

$$
R_L\le\frac{R_s}{4}=25\text{ k}\Omega.
$$

::: tip 標準答案
$i_o=9.9\,\mu\text{A},9.1\,\mu\text{A},5\,\mu\text{A},0.9\,\mu\text{A}$；最大負載為 $25\text{ k}\Omega$。
:::

</template>
</PracticeCard>

<PracticeCard type="exercise" id="elec-ch1-missing-ex-1-5" title="週期、頻率與角頻率換算" source="Exercise 1.5 · 教材 PDF p.42（印刷 p.12）" topic="頻率頻譜">

正弦波週期為 $T=1\text{ ms}$。求其頻率 $f$ 與角頻率 $\omega$。

<template #solution>

$$
f=\frac{1}{T}=\frac{1}{1\times10^{-3}}=1000\text{ Hz},
\qquad
\omega=2\pi f=2\pi\times10^3\text{ rad/s}.
$$

::: tip 標準答案
$f=1000\text{ Hz}$；$\omega=2\pi\times10^3\text{ rad/s}$。
:::

</template>
</PracticeCard>

<PracticeCard type="exercise" id="elec-ch1-missing-ex-1-7" title="UHF 電視頻道數量" source="Exercise 1.7 · 教材 PDF p.42（印刷 p.12）" topic="頻率頻譜">

UHF 電視廣播頻帶由 $470\text{ MHz}$ 延伸至 $608\text{ MHz}$，每個頻道配置 $6\text{ MHz}$。求可容納的頻道數與頻道編號範圍。

<template #solution>

頻寬為 $608-470=138\text{ MHz}$，所以

$$
N=\frac{138\text{ MHz}}{6\text{ MHz}}=23.
$$

從頻道 14 起算 23 個頻道，最後一個為 $14+23-1=36$。

::: tip 標準答案
共 **23 個頻道**，即頻道 **14 至 36**。
:::

</template>
</PracticeCard>

<PracticeCard type="exercise" id="elec-ch1-missing-ex-1-9" title="4-bit ADC 量化與位元權重" source="Exercise 1.9 · 教材 PDF p.45（印刷 p.15）" topic="類比與數位訊號">

4-bit 數位字 $D=b_3b_2b_1b_0$ 用來表示 $0$ 至 $3.75\text{ V}$ 的類比訊號 $v_A$。

1. 求 $v_A=0,0.25,1,3.75\text{ V}$ 時的 $D$。
2. 求 $b_0,b_1,b_2,b_3$ 由 0 變成 1 各需要多少 $v_A$ 變化量。
3. 若 $v_A=1.3\text{ V}$，求預期的 $D$ 與表示誤差。

<template #solution>

4-bit 全幅 3.75 V 對應 15 個量化間隔，因此 $1\text{ LSB}=3.75/15=0.25\text{ V}$。故四個數值的碼為

$$
0\to0000,\quad0.25\to0001,\quad1\to0100,\quad3.75\to1111.
$$

位元權重依序為 $b_0:0.25\text{ V}$、$b_1:0.50\text{ V}$、$b_2:1.00\text{ V}$、$b_3:2.00\text{ V}$。$1.3\text{ V}$ 量化到最近的 $1.25\text{ V}$，所以 $D=0101$，誤差為

$$
\frac{1.25-1.30}{1.30}\times100\%\approx-3.85\%\approx-4\%.
$$

::: tip 標準答案
$(a)$ `0000, 0001, 0100, 1111`；$(b)$ `$0.25,0.50,1,2\text{ V}$`；$(c)$ `$D=0101$`，誤差約 `$-4\%$`。
:::

</template>
</PracticeCard>

<PracticeCard type="exercise" id="elec-ch1-missing-ex-1-12" title="緩衝放大器改善高源阻抗負載驅動" source="Exercise 1.12 · 教材 PDF p.55（印刷 p.25）" topic="電壓放大器模型">

一個 $1\text{ V rms}$、$R_s=1\text{ M}\Omega$ 的感測器要驅動 $R_L=10\Omega$。先求直接連接時的負載電壓與功率；再插入 $A_{vo}=1$、$R_i=1\text{ M}\Omega$、$R_o=10\Omega$ 的單位增益緩衝器，求新的負載電壓、功率、源到負載電壓增益與緩衝器功率增益（dB）。

<template #solution>

直接連接時

$$
v_L=1\times\frac{10}{1\text{ M}\Omega+10\Omega}\approx10\,\mu\text{V rms},
\qquad P_L=\frac{v_L^2}{10\Omega}\approx10^{-11}\text{ W}.
$$

插入緩衝器後，輸入分壓得 $v_i=1/2=0.5\text{ V rms}$；輸出端再由 $R_o$ 與 $R_L$ 分壓：

$$
v_L=0.5\frac{10}{10+10}=0.25\text{ V rms},
\qquad P_L=\frac{0.25^2}{10}=6.25\text{ mW}.
$$

源到負載電壓增益為 $0.25$，即 $20\log_{10}(0.25)\approx-12\text{ dB}$。緩衝器輸入電流為 $0.5\,\mu\text{A}$，負載電流為 $25\text{ mA}$，因此

$$
A_i=\frac{25\text{ mA}}{0.5\,\mu\text{A}}=5.0\times10^4,
\qquad A_p\approx2.5\times10^4,
$$

其功率增益為 $10\log_{10}(2.5\times10^4)\approx44\text{ dB}$。

::: tip 標準答案
直接連接：$10\,\mu\text{V rms}$、$10^{-11}\text{ W}$；加入緩衝器：$0.25\text{ V rms}$、$6.25\text{ mW}$；源到負載電壓增益 $-12\text{ dB}$；功率增益 **44 dB**。
:::

</template>
</PracticeCard>

<PracticeCard type="exercise" id="elec-ch1-missing-ex-1-13" title="由負載效應反推放大器輸出電阻" source="Exercise 1.13 · 教材 PDF p.55（印刷 p.25）" topic="電壓放大器模型">

某電壓放大器接上 $R_L=1\text{ k}\Omega$ 後，輸出電壓比開路值下降 $20\%$。求放大器輸出電阻 $R_o$。

<template #solution>

輸出端分壓比為

$$
\frac{v_L}{v_{oc}}=\frac{R_L}{R_o+R_L}=0.8.
$$

因此

$$
R_o=R_L\left(\frac{1}{0.8}-1\right)=1\text{ k}\Omega\times0.25=250\Omega.
$$

::: tip 標準答案
$R_o=250\Omega$。
:::

</template>
</PracticeCard>

<PracticeCard type="exercise" id="elec-ch1-missing-ex-1-14" title="電壓放大器負載功率增益" source="Exercise 1.14 · 教材 PDF p.55（印刷 p.25）" topic="電壓放大器模型">

一個電壓放大器具有開路電壓增益 $+40\text{ dB}$、輸入電阻 $R_i=10\text{ k}\Omega$、輸出電阻 $R_o=1\text{ k}\Omega$，驅動 $R_L=1\text{ k}\Omega$。求 $A_{vo}$ 與負載功率增益（以 dB 表示）。

<template #solution>

$$
A_{vo}=10^{40/20}=100\text{ V/V}.
$$

接上負載後的電壓增益為

$$
A_v=A_{vo}\frac{R_L}{R_o+R_L}=100\frac{1}{2}=50.
$$

輸入電流為 $v_i/R_i$，負載電流為 $v_o/R_L$，故

$$
A_i=A_v\frac{R_i}{R_L}=50\times10=500,
\qquad A_p=A_vA_i=25{,}000.
$$

$$
A_p(\text{dB})=10\log_{10}(25{,}000)\approx44\text{ dB}.
$$

::: tip 標準答案
$A_{vo}=100\text{ V/V}$；負載功率增益約 **44 dB**。
:::

</template>
</PracticeCard>

<PracticeCard type="practice" id="elec-ch1-missing-problem-1-1" title="歐姆定律：由兩個電路量求第三量" source="Chapter 1 Problem 1.1 · 教材 PDF p.76（印刷 p.46）" topic="電路基礎">

對下列電阻情況，依歐姆定律求缺少的電壓或電流：

1. $R=1\text{ k}\Omega,\ V=0.5\text{ V}$。
2. $V=2\text{ V},\ I=1\text{ mA}$。
3. $R=20\text{ k}\Omega,\ I=0.1\text{ mA}$。
4. $R=100\Omega,\ V=5\text{ V}$。

<template #solution>

使用 $V=IR$：

$$
I_1=\frac{0.5}{1\text{ k}\Omega}=0.5\text{ mA},\quad
R_2=\frac{2}{1\text{ mA}}=2\text{ k}\Omega,
$$

$$
V_3=(0.1\text{ mA})(20\text{ k}\Omega)=2\text{ V},\quad
I_4=\frac{5}{100\Omega}=50\text{ mA}.
$$

::: tip 標準答案
$(a)$ $I=0.5\text{ mA}$；$(b)$ $R=2\text{ k}\Omega$；$(c)$ $V=2\text{ V}$；$(d)$ $I=50\text{ mA}$。
:::

</template>
</PracticeCard>

<PracticeCard type="practice" id="elec-ch1-missing-problem-1-2" title="電阻功率與安全額定值" source="Chapter 1 Problem 1.2 · 教材 PDF p.76（印刷 p.46）" topic="電路基礎">

對教材列出的各個電阻工作情況，求耗散功率，並從 $1/8\text{ W},1/4\text{ W},1/2\text{ W},1\text{ W},2\text{ W}$ 中選擇足以安全工作的標準額定值：

$(a)$ $1\text{ k}\Omega$、$20\text{ mA}$；$(b)$ $1\text{ k}\Omega$、$40\text{ mA}$；$(c)$ $100\text{ k}\Omega$、$1\text{ mA}$；$(d)$ $10\text{ k}\Omega$、$4\text{ mA}$；$(e)$ $1\text{ k}\Omega$、$20\text{ V}$；$(f)$ $1\text{ k}\Omega$、$11\text{ V}$。

<template #solution>

用 $P=I^2R$ 或 $P=V^2/R$：

$$
\begin{array}{c|c|c}
\text{項目}&P&\text{安全額定值}\\\hline
(a)&(20\text{ mA})^2(1\text{ k}\Omega)=0.40\text{ W}&1/2\text{ W}\\
(b)&(40\text{ mA})^2(1\text{ k}\Omega)=1.60\text{ W}&2\text{ W}\\
(c)&(1\text{ mA})^2(100\text{ k}\Omega)=0.10\text{ W}&1/8\text{ W}\\
(d)&(4\text{ mA})^2(10\text{ k}\Omega)=0.16\text{ W}&1/4\text{ W}\\
(e)&(20\text{ V})^2/(1\text{ k}\Omega)=0.40\text{ W}&1/2\text{ W}\\
(f)&(11\text{ V})^2/(1\text{ k}\Omega)=0.121\text{ W}&1/4\text{ W}
\end{array}
$$

::: tip 標準答案
依序為 $0.40\text{ W}$、$1.60\text{ W}$、$0.10\text{ W}$、$0.16\text{ W}$、$0.40\text{ W}$、$0.121\text{ W}$；安全額定值依序為 $1/2\text{ W}$、$2\text{ W}$、$1/8\text{ W}$、$1/4\text{ W}$、$1/2\text{ W}$、$1/4\text{ W}$。
:::

</template>
</PracticeCard>

<PracticeCard type="practice" id="elec-ch1-missing-problem-1-3" title="歐姆定律與功率定律聯立求解" source="Chapter 1 Problem 1.3 · 教材 PDF p.76（印刷 p.46）" topic="電路基礎">

對每組已知量求出其餘兩個量：

$(a)$ $R=1\text{ k}\Omega, I=2\text{ mA}$；$(b)$ $V=1\text{ V}, I=20\text{ mA}$；$(c)$ $V=1\text{ V}, P=100\text{ mW}$；$(d)$ $I=0.1\text{ mA}, P=2\text{ mW}$；$(e)$ $R=1\text{ k}\Omega, P=0.1\text{ W}$。

<template #solution>

使用 $V=IR$、$P=VI$：

$$
\begin{array}{c|c|c}
\text{項目}&\text{第一未知量}&\text{第二未知量}\\\hline
(a)&V=2\text{ V}&P=4\text{ mW}\\
(b)&R=50\Omega&P=20\text{ mW}\\
(c)&R=10\Omega&I=0.1\text{ A}\\
(d)&V=20\text{ V}&R=200\text{ k}\Omega\\
(e)&V=10\text{ V}&I=10\text{ mA}
\end{array}
$$

每列答案代回 $P=VI$ 與 $V=IR$ 均得到原已知量，故殘差為零。

::: tip 標準答案
$(a)$ $V=2\text{ V},P=4\text{ mW}$；$(b)$ $R=50\Omega,P=20\text{ mW}$；$(c)$ $R=10\Omega,I=0.1\text{ A}$；$(d)$ $V=20\text{ V},R=200\text{ k}\Omega$；$(e)$ $V=10\text{ V},I=10\text{ mA}$。
:::

</template>
</PracticeCard>

## 後續補入批次索引

- Chapter 1 Problems `1.4–1.20`：[`0004-chapter1-problems-1-4-1-20`](/electronics/practice/0004-chapter1-problems-1-4-1-20)
- Chapter 1 Exercises：[`0005-chapter1-exercises-missing`](/electronics/practice/0005-chapter1-exercises-missing)
- Chapter 2 Exercises 與 Problems `2.1–2.8`：[`0006-chapter2-missing-partial`](/electronics/practice/0006-chapter2-missing-partial)
- Chapter 2 Problems `2.9–2.24`：[`0009-chapter2-problems-2-9-2-24`](/electronics/practice/0009-chapter2-problems-2-9-2-24)
- Chapter 2 Problems `2.25–2.60`：[`0010-chapter2-problems-2-25-2-60`](/electronics/practice/0010-chapter2-problems-2-25-2-60)
- Chapter 2 Problems `2.61–2.80`：[`0008-chapter2-problems-2-61-2-80`](/electronics/practice/0008-chapter2-problems-2-61-2-80)
- Chapter 2 Problems `2.81–2.107`：[`0011-chapter2-problems-2-81-2-107`](/electronics/practice/0011-chapter2-problems-2-81-2-107)
- Chapter 2 Problems `2.108–2.127`：[`0012-chapter2-problems-2-108-2-127`](/electronics/practice/0012-chapter2-problems-2-108-2-127)
- Chapter 2 Exercises `2.23, 2.28`：[`0013-chapter2-exercises-2-23-2-28`](/electronics/practice/0013-chapter2-exercises-2-23-2-28)
- Chapter 1 Problems `1.43–1.65`：[`0014-chapter1-problems-1-43-1-65`](/electronics/practice/0014-chapter1-problems-1-43-1-65)
- Chapter 1 Problems `1.66–1.83`：[`0015-chapter1-problems-1-66-1-83`](/electronics/practice/0015-chapter1-problems-1-66-1-83)
- Chapter 1 Problems `1.21–1.42`：[`0016-chapter1-problems-1-21-1-42`](/electronics/practice/0016-chapter1-problems-1-21-1-42)

目前本頁列出的 Chapter 1–2 教材題號已全部上網；「尚未上網」欄為 0，並不表示 PDF 其他尚未納入網站範圍的章節已完成。
