---
title: Chapter 2 互動式範例與練習題庫
description: 電路學第二章 基礎電路定律 (Basic Laws) 互動題庫、範例解說與詳細推導
---

# 互動式範例與練習題庫：Chapter 2 基礎電路定律 (Basic Laws)

> Alexander & Sadiku · Basic Laws 基礎電路定律與範例題解

::: details 核心電路定律與公式速記
- **歐姆定律與電導**：$v = i R$，$i = G v$，$G = 1/R$（單位：S），$p = v i = i^2 R = \frac{v^2}{R}$。
- **拓撲與克希荷夫定律**：拓撲定理 $b = l + n - 1$，KCL $\sum i_{\text{in}} = \sum i_{\text{out}}$，KVL $\sum v = 0$。
- **串並聯與分壓分流**：分壓 $v_1 = v \cdot \frac{R_1}{R_1 + R_2}$，分流 $i_1 = i \cdot \frac{R_2}{R_1 + R_2}$，並聯等效 $R_{eq} = \frac{R_1 R_2}{R_1 + R_2}$。
- **Δ-Y 互換法則**：$\Delta \to Y$ 為 $R_1 = \frac{R_b R_c}{\Sigma R_\Delta}$（相鄰積/總和），$Y \to \Delta$ 為 $R_a = \frac{\Sigma R_1 R_2}{R_1}$（兩兩積和/對面）。
:::

<PracticeProgress :total="18" prefix="ch2-" />

<PracticeCard id="ch2-ex-2-1" title="電熨斗等效電阻計算" source="Example 2.1 · Slide P17" topic="歐姆定律與電導">

某電熨斗在 $120\text{ V}$ 電壓下運作，消耗電流為 $2\text{ A}$。試計算其內部加熱元件之等效電阻值 $R$。

*An electric iron draws 2 A at 120 V. Find its resistance R.*

![Example 2.1 Circuit Diagram (Fig. from Slide P17)](../assets/images/ex_2_1.png)

*原教材電路圖 · Slide P17*

> **求解目標：求電阻 $R$**

<template #solution>

#### 逐步解析：

1. **歐姆定律基本關係式**：導體兩端電壓與流經電流成正比，即 $v = i R$。

2. **移項計算電阻值**：
 
   $$
   R = \frac{v}{i} = \frac{120\text{ V}}{2\text{ A}} = 60\ \Omega
   $$

::: tip 標準答案
$$R = 60\ \Omega$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-2" title="直流電阻電路之電流、電導與功率計算" source="Example 2.2 · Slide P18" topic="歐姆定律與電導">

在電路中，已知 $30\text{ V}$ 直流電壓源跨接於 $5\text{ k}\Omega$ 電阻兩端。試計算電路電流 $i$、電阻之電導 $G$ 以及電阻所消耗之電功率 $p$。

*In the circuit shown in Fig. 2.8, calculate the current i, the conductance G, and the power p. (v = 30 V, R = 5 kΩ)*

![Example 2.2 Circuit Diagram (Fig. 2.8 from Slide P18)](../assets/images/ex_2_2.png)

*原教材電路圖 · Slide P18*

> **求解目標：求電流 $i$、電導 $G$、功率 $p$**

<template #solution>

#### 逐步解析：

1. **計算電流 $i$**：應用歐姆定律：
   $$
   i = \frac{v}{R} = \frac{30\text{ V}}{5 \times 10^3\ \Omega} = 6 \times 10^{-3}\text{ A} = 6\text{ mA}
   $$

2. **計算電導 $G$**：電導為電阻之倒數：
   $$
   G = \frac{1}{R} = \frac{1}{5\text{ k}\Omega} = 0.2\text{ mS} = 200\ \mu\text{S}
   $$

3. **計算消耗功率 $p$**：
 
   $$
   p = v \cdot i = (30\text{ V})(6\text{ mA}) = 180\text{ mW}
   $$
   *（驗算：$p = i^2 R = (6\text{ mA})^2 \times 5000\ \Omega = 180\text{ mW}$，或 $p = \frac{v^2}{R} = \frac{30^2}{5000} = 180\text{ mW}$）*

::: tip 標準答案
$$i = 6\text{ mA},\quad G = 0.2\text{ mS} = 200\ \mu\text{S},\quad p = 180\text{ mW}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-3" title="正弦交流時變電壓源的電流與瞬時功率" source="Example 2.3 · Slide P20" topic="歐姆定律與電導">

時變交流電壓源 $v(t) = 20\sin(\pi t)\text{ V}$ 跨接於 $5\text{ k}\Omega$ 電阻兩端。試求解流經該電阻之瞬時電流函數 $i(t)$ 以及瞬時消耗功率函數 $p(t)$。

*A voltage source of v = 20 sin(πt) V is connected across a 5-kΩ resistor. Find the current through the resistor and the power dissipated.*

![Example 2.3 Circuit Diagram (Slide P20)](../assets/images/ex_2_3.png)

*原教材電路圖 · Slide P20*

> **求解目標：求瞬時電流 $i(t)$ 與瞬時功率 $p(t)$**

<template #solution>

#### 逐步解析：

1. **求解瞬時電流 $i(t)$**：由歐姆定律：
   $$
   i(t) = \frac{v(t)}{R} = \frac{20\sin(\pi t)\text{ V}}{5000\ \Omega} = 4\sin(\pi t)\text{ mA}
   $$

2. **求解瞬時消耗功率 $p(t)$**：由功率定義 $p(t) = v(t) \cdot i(t)$：
   $$
   p(t) = [20\sin(\pi t)\text{ V}] \times [4\sin(\pi t)\text{ mA}] = 80\sin^2(\pi t)\text{ mW}
   $$

::: tip 標準答案
$$i(t) = 4\sin(\pi t)\text{ mA},\quad p(t) = 80\sin^2(\pi t)\text{ mW}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-4" title="網路分支數、節點數與串並聯拓撲判定" source="Example 2.4 · Slide P27" topic="拓撲、KCL 與 KVL">

分析如圖 2.12 所示電路：計算電路中的分支數（Branches）與節點數（Nodes），並指出哪些元件處於串聯（Series），哪些處於並聯（Parallel）。

*Determine the number of branches and nodes in the circuit shown in Fig. 2.12. Identify which elements are in series and which are in parallel.*

![Example 2.4 Circuit Diagram (Fig. 2.12 from Slide P27)](../assets/images/ex_2_4.png)

*原教材電路圖 · Slide P27*

> **求解目標：求分支數 $b$、節點數 $n$、串聯與並聯元件組合**

<template #solution>

#### 逐步解析：

1. **分支數（Branches, $b$）**：一個分支代表一個二端元件。電路包含 $10\text{ V}$ 電壓源、$5\ \Omega$ 電阻、$6\ \Omega$ 電阻、$2\text{ A}$ 電流源，共 4 個元件，因此
   $$
   b = 4
   $$

2. **節點數（Nodes, $n$）**：節點為兩條或多條分支之連接點。由電路圖標示可知共有 3 個獨立節點（頂部左、頂部右、底部整條連通之參考節點），因此
   $$
   n = 3
   $$

3. **串聯判定（Series）**：$10\text{ V}$ 電壓源與 $5\ \Omega$ 電阻串聯，因為兩者單端相接且無任何分支分流，流經完全相同之電流。

4. **並聯判定（Parallel）**：$6\ \Omega$ 電阻與 $2\text{ A}$ 電流源並聯，因為兩者的兩端皆跨接在相同的節點 2 與節點 3 之間（承受完全相同之端電壓）。

::: tip 標準答案
$$b = 4,\quad n = 3;\quad (10\text{V} \text{ 串聯 } 5\Omega),\quad (6\Omega \text{ 並聯 } 2\text{A})$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-5" title="單迴路克希荷夫電壓定律 (KVL) 求解端電壓" source="Example 2.5 · Slide P38" topic="拓撲、KCL 與 KVL">

在單迴路電路中，含 $20\text{ V}$ 獨立電壓源、頂部 $2\ \Omega$ 電阻（端電壓標示為 $+ v_1 -$，左正右負）及右側 $3\ \Omega$ 電阻（端電壓標示為 $- v_2 +$，上負下正）。試求解 $v_1$ 與 $v_2$。

*For the circuit in Fig. 2.21(a), find voltages v1 and v2. (20V source, 2Ω with + v1 -, 3Ω with - v2 +)*

![Example 2.5 Circuit Diagram (Fig. 2.21 from Slide P38)](../assets/images/ex_2_5.png)

*原教材電路圖 · Slide P38*

> **求解目標：求電壓 $v_1$ 與 $v_2$**

<template #solution>

#### 逐步解析：

1. **設定順時針迴路電流 $i$**：依被動元件符號約定（Passive Sign Convention）：
   • 對 $2\ \Omega$ 電阻：電流由正端流入，故 $v_1 = 2i$
   • 對 $3\ \Omega$ 電阻：電流由負端流入，故 $v_2 = -3i$

2. **沿順時針方向列寫 KVL**：
 
   $$
   -20 + v_1 - v_2 = 0
   $$

3. **代入電流關係式**：
 
   $$
   -20 + (2i) - (-3i) = 0 \implies 5i = 20 \implies i = 4\text{ A}
   $$

4. **求解端電壓**：
 
   $$
   v_1 = 2(4) = 8\text{ V},\quad v_2 = -3(4) = -12\text{ V}
   $$

::: tip 標準答案
$$v_1 = 8\text{ V},\quad v_2 = -12\text{ V}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-6" title="含相依電壓源 (Dependent Source) 的單迴路分析" source="Example 2.6 · Slide P40" topic="拓撲、KCL 與 KVL">

如圖 2.23(a) 所示單迴路，左側 $12\text{ V}$ 電壓源，頂部有 $4\ \Omega$ 電阻與相依電壓源 $2v_o$（左正右負），右側為 $4\text{ V}$ 電壓源（上負下正），底部為 $6\ \Omega$ 電阻（端電壓標示 $+ v_o -$，左正右負）。求電流 $i$ 與電壓 $v_o$。

*Determine vo and i in the circuit shown in Fig. 2.23(a). (12V source, 4Ω, 2vo dep source, 4V source, 6Ω with + vo -)*

![Example 2.6 Circuit Diagram (Fig. 2.23 from Slide P40)](../assets/images/ex_2_6.png)

*原教材電路圖 · Slide P40*

> **求解目標：求電流 $i$ 與電壓 $v_o$**

<template #solution>

#### 逐步解析：

1. **找出受控變數 $v_o$ 與電流 $i$ 關係**：順時針電流 $i$ 流經底部 $6\ \Omega$ 電阻時，是由右向左（由負端流向正端），因此：
   $$
   v_o = -6i
   $$

2. **沿順時針方向列寫全迴路 KVL**：
 
   $$
   -12 + 4i + 2v_o - 4 + 6i = 0
   $$

3. **整理並將 $v_o = -6i$ 代入**：
 
   $$
   -16 + 10i + 2(-6i) = 0 \implies -16 - 2i = 0 \implies i = -8\text{ A}
   $$

4. **計算電壓 $v_o$**：
 
   $$
   v_o = -6(-8) = 48\text{ V}
   $$

::: tip 標準答案
$$i = -8\text{ A},\quad v_o = 48\text{ V}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-7" title="並聯節點克希荷夫電流定律 (KCL) 與相依電流源分析" source="Example 2.7 · Slide P43" topic="拓撲、KCL 與 KVL">

如圖 2.25 所示並聯節點電路，包含相依電流源 $0.5i_o$（方向向上）、$4\ \Omega$ 電阻（向下電流標示為 $i_o$，端電壓為 $v_o$）以及獨立電流源 $3\text{ A}$（方向向上）。試求電流 $i_o$ 與電壓 $v_o$。

*Find current io and voltage vo in the circuit shown in Fig. 2.25. (0.5io dep source ↑, 4Ω with io ↓ and vo, 3A source ↑)*

![Example 2.7 Circuit Diagram (Fig. 2.25 from Slide P43)](../assets/images/ex_2_7.png)

*原教材電路圖 · Slide P43*

> **求解目標：求電流 $i_o$ 與電壓 $v_o$**

<template #solution>

#### 逐步解析：

1. **對頂部節點 $a$ 應用 KCL（流入總和 = 流出總和）**：
 
   $$
   \sum i_{\text{in}} = \sum i_{\text{out}} \implies 0.5i_o + 3 = i_o
   $$

2. **移項求解電流 $i_o$**：
 
   $$
   i_o - 0.5i_o = 3 \implies 0.5i_o = 3 \implies i_o = \frac{3}{0.5} = 6\text{ A}
   $$

3. **應用歐姆定律求端電壓 $v_o$**：
 
   $$
   v_o = 4 \times i_o = 4 \times 6 = 24\text{ V}
   $$

::: tip 標準答案
$$i_o = 6\text{ A},\quad v_o = 24\text{ V}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-8" title="串並聯結合 KCL/KVL 綜合多未知數求解" source="Example 2.8 · Slide P44" topic="拓撲、KCL 與 KVL">

如圖 2.27(a) 所示電路，包含 $30\text{ V}$ 電壓源串聯 $8\ \Omega$（電流 $i_1$，電壓 $v_1$），後接並聯的 $3\ \Omega$（電流 $i_2$，電壓 $v_2$）與 $6\ \Omega$（電流 $i_3$，電壓 $v_3$）。試求各支路電流與各元件跨壓。

*Find currents (i1, i2, i3) and voltages (v1, v2, v3) in the circuit shown in Fig. 2.27(a). (30V source, 8Ω, 3Ω || 6Ω)*

![Example 2.8 Circuit Diagram (Fig. 2.27 from Slide P44)](../assets/images/ex_2_8.png)

*原教材電路圖 · Slide P44*

> **求解目標：求 $i_1, i_2, i_3$ 與 $v_1, v_2, v_3$**

<template #solution>

#### 逐步解析：

1. **計算並聯部分等效電阻**：
 
   $$
   R_p = 3\ \Omega \parallel 6\ \Omega = \frac{3 \times 6}{3 + 6} = 2\ \Omega
   $$

2. **計算全電路總等效電阻**：
 
   $$
   R_{eq} = 8 + R_p = 8 + 2 = 10\ \Omega
   $$

3. **求解總電流 $i_1$**：
 
   $$
   i_1 = \frac{30\text{ V}}{10\ \Omega} = 3\text{ A}
   $$

4. **求解各電阻端電壓**：• $v_1 = 8 \times i_1 = 8 \times 3 = 24\text{ V}$
   • $v_2 = v_3 = 30 - v_1 = 30 - 24 = 6\text{ V}$

5. **求解各支路分流**：• $i_2 = \frac{v_2}{3\ \Omega} = \frac{6}{3} = 2\text{ A}$
   • $i_3 = \frac{v_3}{6\ \Omega} = \frac{6}{6} = 1\text{ A}$ *（驗證 KCL：$i_1 = i_2 + i_3 = 2 + 1 = 3\text{ A}$）*

::: tip 標準答案
$$i_1 = 3\text{ A},\ i_2 = 2\text{ A},\ i_3 = 1\text{ A};\quad v_1 = 24\text{ V},\ v_2 = 6\text{ V},\ v_3 = 6\text{ V}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-9" title="階梯狀 (Ladder) 電阻網路等效電阻化簡" source="Example 2.9 · Slide P55" topic="串並聯化簡與分壓分流">

如圖 2.34 所示梯形電阻網路，輸入端包含 $4\ \Omega$ 與 $8\ \Omega$，中間支路為 $2\ \Omega$ 串聯 $(6\ \Omega \parallel 3\ \Omega)$，最右側支路為 $1\ \Omega + 5\ \Omega$。試由電路最遠端向輸入端逐步簡化，求解等效電阻 $R_{eq}$。

*Find Req for the circuit shown in Fig. 2.34.*

![Example 2.9 Circuit Diagram (Fig. 2.34 from Slide P55)](../assets/images/ex_2_9_circuit.png)

*原教材電路圖 · Slide P55*

> **求解目標：求等效電阻 $R_{eq}$**

<template #solution>

#### 逐步解析：

1. **最右側支路串聯**：$1\ \Omega + 5\ \Omega = 6\ \Omega$

2. **中間下方兩電阻並聯**：$6\ \Omega \parallel 3\ \Omega = \frac{6 \times 3}{6 + 3} = 2\ \Omega$

3. **中間垂直支路串聯總和**：$2\ \Omega + 2\ \Omega = 4\ \Omega$

4. **中間支路與右側支路並聯**：$4\ \Omega \parallel 6\ \Omega = \frac{4 \times 6}{4 + 6} = 2.4\ \Omega$

5. **與輸入端上下兩電阻串聯相加**：
 
   $$
   R_{eq} = 4 + 2.4 + 8 = 14.4\ \Omega
   $$

**講義完整解答圖示：**

![Slide Solution](../assets/images/ex_2_9.png)

::: tip 標準答案
$$R_{eq} = 14.4\ \Omega$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-10" title="多節點交叉連接電阻網路等效電阻計算" source="Example 2.10 · Slide P56-57" topic="串並聯化簡與分壓分流">

計算端點 $a-b$ 間的等效電阻 $R_{ab}$。電路如圖 2.37 所示，包含輸入端 $10\ \Omega$、節點 $c-b$ 間並聯之 $3\ \Omega$ 與 $6\ \Omega$、節點 $d-b$ 間之 $12\ \Omega$ 與 $4\ \Omega$、跨接 $c-d$ 之 $1\ \Omega$ 以及最右端 $(1\ \Omega + 5\ \Omega)$。

*Calculate the equivalent resistance Rab in the circuit in Fig. 2.37.*

![Example 2.10 Circuit Diagram (Fig. 2.37 from Slide P56-57)](../assets/images/ex_2_10.png)

*原教材電路圖 · Slide P56-57*

> **求解目標：求等效電阻 $R_{ab}$**

<template #solution>

#### 逐步解析：

1. **化簡節點 c 與 b 之間並聯**：$3\ \Omega \parallel 6\ \Omega = \frac{3 \times 6}{3 + 6} = 2\ \Omega$

2. **化簡節點 d 與 b 之間並聯**：$12\ \Omega \parallel 4\ \Omega = \frac{12 \times 4}{12 + 4} = 3\ \Omega$

3. **化簡最右側支路並與 d-b 並聯**：右側 $1 + 5 = 6\ \Omega$，與 $3\ \Omega$ 並聯得 $6\ \Omega \parallel 3\ \Omega = 2\ \Omega$

4. **計算路徑 c-d-b 串聯值**：$1\ \Omega + 2\ \Omega = 3\ \Omega$

5. **節點 c 與 b 間總並聯**：$3\ \Omega \parallel 2\ \Omega = \frac{3 \times 2}{3 + 2} = 1.2\ \Omega$

6. **加上前級串聯電阻**：
 
   $$
   R_{ab} = 10\ \Omega + 1.2\ \Omega = 11.2\ \Omega
   $$

::: tip 標準答案
$$R_{ab} = 11.2\ \Omega$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-11" title="純電導網路 (Conductance) 的等效電導計算" source="Example 2.11 · Slide P58" topic="串並聯化簡與分壓分流">

如圖 2.40(a) 所示電導網路（單位為 Siemens, S），最右端為並聯的 $8\text{ S}$ 與 $12\text{ S}$，上方串聯 $5\text{ S}$，左端並聯 $6\text{ S}$。試求總等效電導 $G_{eq}$。

*Find equivalent conductance Geq for the circuit shown in Fig. 2.40(a). (Conductances: 6S, 5S, 8S, 12S)*

![Example 2.11 Circuit Diagram (Fig. 2.40(a) from Slide P58)](../assets/images/ex_2_11_circuit.png)

*原教材電路圖 · Slide P58*

> **求解目標：求等效電導 $G_{eq}$**

<template #solution>

#### 逐步解析：

1. **右側兩並聯電導直接相加**：
 
   $$
   G_{p1} = 8\text{ S} + 12\text{ S} = 20\text{ S}
   $$

2. **與頂部 $5\text{ S}$ 電導串聯計算**：
 
   $$
   G_{s} = \frac{20 \times 5}{20 + 5} = \frac{100}{25} = 4\text{ S}
   $$

3. **與最左側 $6\text{ S}$ 電導並聯相加**：
 
   $$
   G_{eq} = 6\text{ S} + G_s = 6\text{ S} + 4\text{ S} = 10\text{ S}
   $$

**講義完整解答圖示：**

![Slide Solution](../assets/images/ex_2_11.png)

::: tip 標準答案
$$G_{eq} = 10\text{ S}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-12" title="分壓、分流定律與特定電阻功率消耗分析" source="Example 2.12 · Slide P59-60" topic="串並聯化簡與分壓分流">

如圖 2.42(a) 所示，包含 $12\text{ V}$ 電壓源串聯 $4\ \Omega$ 電阻後，並聯 $6\ \Omega$ 與 $3\ \Omega$ 電阻（$3\ \Omega$ 上之電流為 $i_o$，端電壓為 $v_o$）。求 $i_o, v_o$ 及 $3\ \Omega$ 消耗的功率 $P_{3\Omega}$。

*Find io, vo, and the power P3Ω dissipated by the 3 Ω resistor in the circuit shown in Fig. 2.42(a).*

![Example 2.12 Circuit Diagram (Fig. 2.42(a) from Slide P59)](../assets/images/ex_2_12_circuit.png)

*原教材電路圖 · Slide P59-60*

> **求解目標：求 $i_o$、電壓 $v_o$ 與消耗功率 $P_{3\Omega}$**

<template #solution>

#### 逐步解析：

1. **計算全電路總等效電阻**：
 
   $$
   R_{eq} = 4 + (6 \parallel 3) = 4 + 2 = 6\ \Omega
   $$

2. **計算電源總電流 $i$**：
 
   $$
   i = \frac{12\text{ V}}{6\ \Omega} = 2\text{ A}
   $$

3. **應用分流公式求 $i_o$**：
 
   $$
   i_o = i \times \frac{6}{6 + 3} = 2 \times \frac{2}{3} = \frac{4}{3}\text{ A} \approx 1.333\text{ A}
   $$

4. **計算 $3\ \Omega$ 端電壓 $v_o$**：
 
   $$
   v_o = i_o \times 3\ \Omega = \frac{4}{3} \times 3 = 4\text{ V}
   $$

5. **計算 $3\ \Omega$ 電阻消耗功率 $P_{3\Omega}$**：
 
   $$
   P_{3\Omega} = v_o \cdot i_o = (4\text{ V}) \times \left(\frac{4}{3}\text{ A}\right) = \frac{16}{3}\text{ W} \approx 5.333\text{ W}
   $$

**講義完整解答圖示：**

![Slide Solution](../assets/images/ex_2_12.png)

::: tip 標準答案
$$i_o = \frac{4}{3}\text{ A} \approx 1.333\text{ A},\quad v_o = 4\text{ V},\quad P_{3\Omega} = \frac{16}{3}\text{ W} \approx 5.333\text{ W}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-13" title="電流源並聯分流與全電路功率守恆平衡" source="Example 2.13 · Slide P61-64" topic="串並聯化簡與分壓分流">

在圖 2.44(a) 電路中，包含 $30\text{ mA}$ 獨立電流源，並聯 $9\text{ k}\Omega$ 電阻（端電壓 $v_o$）以及 $(6\text{ k}\Omega + 12\text{ k}\Omega)$ 串聯支路。求：(a) 電壓 $v_o$；(b) 電流源提供的功率；(c) 各電阻消耗功率。

*In Fig. 2.44(a), determine: (a) the voltage vo, (b) the power supplied by the current source, (c) the power absorbed by each resistor. (30mA source, 9kΩ, 6kΩ, 12kΩ)*

![Example 2.13 Circuit Diagram (Fig. 2.44 from Slide P61)](../assets/images/ex_2_13.png)

*原教材電路圖 · Slide P61-64*

> **求解目標：求 $v_o$、電源供電功率 $p_{\text{src}}$、各電阻吸收功率**

<template #solution>

#### 逐步解析：

1. **計算電壓 $v_o$**：右側支路總電阻 $= 6\text{ k}\Omega + 12\text{ k}\Omega = 18\text{ k}\Omega$
   並聯等效電阻 $R_{eq} = 9\text{ k}\Omega \parallel 18\text{ k}\Omega = \frac{9 \times 18}{27} = 6\text{ k}\Omega$
   $$
   v_o = 30\text{ mA} \times 6\text{ k}\Omega = 180\text{ V}
   $$

2. **計算電流源供電功率**：
 
   $$
   p_{\text{src}} = v_o \times i_s = 180\text{ V} \times 30\text{ mA} = 5400\text{ mW} = 5.4\text{ W}
   $$

3. **計算各電阻吸收功率**：• $9\text{ k}\Omega$ 電阻電流 $i_1 = \frac{180}{9\text{ k}} = 20\text{ mA} \implies p_{9k} = 180\text{ V} \times 20\text{ mA} = 3.6\text{ W}$
   • 右側支路電流 $i_2 = 30\text{ mA} - 20\text{ mA} = 10\text{ mA}$
   • $6\text{ k}\Omega$ 電阻功率：$p_{6k} = (10\text{ mA})^2 \times 6\text{ k}\Omega = 0.6\text{ W}$
   • $12\text{ k}\Omega$ 電阻功率：$p_{12k} = (10\text{ mA})^2 \times 12\text{ k}\Omega = 1.2\text{ W}$
   • **功率守恆驗證：** $3.6 + 0.6 + 1.2 = 5.4\text{ W}$（總吸收功率 = 總提供功率）

::: tip 標準答案
$$v_o = 180\text{ V},\quad p_{\text{src}} = 5.4\text{ W},\quad p_{9k} = 3.6\text{ W},\ p_{6k} = 0.6\text{ W},\ p_{12k} = 1.2\text{ W}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-14" title="三角形 (Δ) 網路至等效星形 (Y) 網路轉換" source="Example 2.14 · Slide P82-83" topic="Δ-Y 轉換">

將三頂點為 $a, b, c$ 的三角形（$\Delta$）網路轉換為等效星形（$Y$）網路（$R_1, R_2, R_3$）。已知如圖 2.50(a)：$R_c = 25\ \Omega$（連接於 $a-b$）、$R_a = 15\ \Omega$（連接於 $b-c$）、$R_b = 10\ \Omega$（連接於 $c-a$）。

*Convert the Δ network in Fig. 2.50(a) to an equivalent Y network. (Rc = 25 Ω at a-b, Ra = 15 Ω at b-c, Rb = 10 Ω at c-a)*

![Example 2.14 Circuit Diagram (Fig. 2.50 from Slide P82)](../assets/images/ex_2_14.png)

*原教材電路圖 · Slide P82-83*

> **求解目標：求星形各臂電阻 $R_1, R_2, R_3$**

<template #solution>

#### 逐步解析：

1. **計算 $\Delta$ 網路三電阻總和**：
 
   $$
   \Sigma R_{\Delta} = R_a + R_b + R_c = 15 + 10 + 25 = 50\ \Omega
   $$

2. **求 $R_1$（連接端點 a）**：相鄰兩臂乘積除以總和：
   $$
   R_1 = \frac{R_b R_c}{\Sigma R_{\Delta}} = \frac{10 \times 25}{50} = 5\ \Omega
   $$

3. **求 $R_2$（連接端點 b）**：
 
   $$
   R_2 = \frac{R_a R_c}{\Sigma R_{\Delta}} = \frac{15 \times 25}{50} = 7.5\ \Omega
   $$

4. **求 $R_3$（連接端點 c）**：
 
   $$
   R_3 = \frac{R_a R_b}{\Sigma R_{\Delta}} = \frac{15 \times 10}{50} = 3\ \Omega
   $$

::: tip 標準答案
$$R_1 = 5\ \Omega,\quad R_2 = 7.5\ \Omega,\quad R_3 = 3\ \Omega$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex-2-15" title="利用 Δ-Y 轉換求解非對稱橋式電路等效電阻與電流" source="Example 2.15 · Slide P84-91" topic="Δ-Y 轉換">

如圖 2.52 所示橋式電路連接至 $120\text{ V}$ 電壓源。頂部節點 $a$ 接 $12.5\ \Omega$（至 $c$）、$10\ \Omega$（至 $n$）及旁路 $30\ \Omega$（至 $b$）；中間跨接 $5\ \Omega$（$c-n$ 間）；底部節點 $c$ 接 $15\ \Omega$（至 $b$），$n$ 接 $20\ \Omega$（至 $b$）。求等效電阻 $R_{ab}$ 與總電流 $i$。

*Obtain the equivalent resistance Rab for the circuit in Fig. 2.52 and use it to find current i. (120V source, bridge with 12.5Ω, 10Ω, 5Ω, 15Ω, 20Ω, 30Ω)*

![Example 2.15 Circuit Diagram (Fig. 2.52 from Slide P84)](../assets/images/ex_2_15.png)

*原教材電路圖 · Slide P84-91*

> **求解目標：求等效電阻 $R_{ab}$ 與總電流 $i$**

<template #solution>

#### 逐步解析：

1. **將上半部 $\Delta(a-c-n)$ 轉為星形 $Y$**：三臂電阻為 $10\ \Omega, 12.5\ \Omega, 5\ \Omega$，總和 $\Sigma = 10 + 12.5 + 5 = 27.5\ \Omega$
   • $R_1 (\text{接 } a) = \frac{10 \times 12.5}{27.5} = 4.545\ \Omega$
   • $R_2 (\text{接 } c) = \frac{5 \times 12.5}{27.5} = 2.273\ \Omega$
   • $R_3 (\text{接 } n) = \frac{5 \times 10}{27.5} = 1.818\ \Omega$

2. **下半部串並聯化簡**：• 左臂：$R_2 + 15\ \Omega = 2.273 + 15 = 17.273\ \Omega$
   • 右臂：$R_3 + 20\ \Omega = 1.818 + 20 = 21.818\ \Omega$
   • 兩臂並聯：$R_{db} = 17.273 \parallel 21.818 = \frac{17.273 \times 21.818}{17.273 + 21.818} = 9.641\ \Omega$

3. **計算橋路等效電阻**：
 
   $$
   R_{ab}' = R_1 + R_{db} = 4.545 + 9.641 = 14.186\ \Omega
   $$

4. **與最外側 $30\ \Omega$ 旁路電阻並聯**：
 
   $$
   R_{ab} = 14.186 \parallel 30 = \frac{14.186 \times 30}{14.186 + 30} \approx 9.632\ \Omega
   $$

5. **計算電源總電流 $i$**：
 
   $$
   i = \frac{V_s}{R_{ab}} = \frac{120\text{ V}}{9.632\ \Omega} \approx 12.458\text{ A}
   $$

::: tip 標準答案
$$R_{ab} \approx 9.632\ \Omega,\quad i \approx 12.458\text{ A}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-prac-2-14" title="星形 (Y) 網路至等效三角形 (Δ) 網路轉換" source="Practice 2.14 · Slide P92" topic="課堂 Practice 測驗">

將星形（$Y$）網路（如圖 2.51：$R_1 = 10\ \Omega, R_2 = 20\ \Omega, R_3 = 40\ \Omega$）轉換為等效三角形（$\Delta$）網路（$R_a, R_b, R_c$）。

*Transform the wye ($Y$) network in Fig. 2.51 to a delta ($\Delta$) network. ($R_1 = 10\ \Omega, R_2 = 20\ \Omega, R_3 = 40\ \Omega$)*

![Practice 2.14 Circuit Diagram (Fig. 2.51 from Slide P92)](../assets/images/prac_2_14.png)

*原教材電路圖 · Slide P92*

> **求解目標：求 $\Delta$ 型各邊電阻 $R_a, R_b, R_c$**

<template #solution>

#### 逐步解析：

1. **計算分子（所有兩兩乘積總和）**：
 
   $$
   N = R_1 R_2 + R_2 R_3 + R_3 R_1 = (10)(20) + (20)(40) + (40)(10) = 200 + 800 + 400 = 1400\ \Omega^2
   $$

2. **應用 $Y \to \Delta$ 公式（除以對面之電阻）**：• $R_a = \frac{N}{R_1} = \frac{1400}{10} = 140\ \Omega$
   • $R_b = \frac{N}{R_2} = \frac{1400}{20} = 70\ \Omega$
   • $R_c = \frac{N}{R_3} = \frac{1400}{40} = 35\ \Omega$

::: tip 標準答案
$$R_a = 140\ \Omega,\quad R_b = 70\ \Omega,\quad R_c = 35\ \Omega$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-prac-2-15" title="含前級串聯電阻之非對稱橋式網路求解" source="Practice 2.15 · Slide P92" topic="課堂 Practice 測驗">

如圖 2.54 所示電路，$240\text{ V}$ 電源接端點 $a$，先經 $13\ \Omega$ 電阻後進入橋路（包含 $24\ \Omega, 10\ \Omega, 20\ \Omega, 30\ \Omega, 50\ \Omega$）。試求端點 $a-b$ 間等效電阻 $R_{ab}$ 以及電源總電流 $i$。

*For the bridge network in Fig. 2.54, find $R_{ab}$ and $i$. ($V_s = 240\text{V}$, top resistor $13\Omega$, bridge resistors $24\Omega, 10\Omega, 20\Omega, 30\Omega, 50\Omega$)*

![Practice 2.15 Circuit Diagram (Fig. 2.54 from Slide P92)](../assets/images/prac_2_15.png)

*原教材電路圖 · Slide P92*

> **求解目標：求等效電阻 $R_{ab}$ 與電流 $i$**

<template #solution>

#### 逐步解析：

1. **化簡內部橋路**：對橋路內部之三角形網路（$24\ \Omega, 10\ \Omega, 20\ \Omega$）進行 $\Delta \to Y$ 轉換。

2. **計算橋路等效電阻**：化簡串並聯後得橋路部分之等效電阻為 $R_{\text{bridge}} = 27\ \Omega$。

3. **加上前級串聯之 $13\ \Omega$**：
 
   $$
   R_{ab} = 13\ \Omega + 27\ \Omega = 40\ \Omega
   $$

4. **計算總電流 $i$**：
 
   $$
   i = \frac{V_s}{R_{ab}} = \frac{240\text{ V}}{40\ \Omega} = 6\text{ A}
   $$

::: tip 標準答案
$$R_{ab} = 40\ \Omega,\quad i = 6\text{ A}$$
:::

</template>
</PracticeCard>

<PracticeCard id="ch2-hw-section" title="第二章 課堂指定作業習題與重點解答提示" source="Homework 清單 · Slide P93-94" topic="課後作業清單">

課堂指定之課後作業題號清單，包含簡報所提供之解答提示（P22: $V_o = -11.905\text{ V}, P_{\text{dep}} = 566.9\text{ W}$；P38: $R_{eq} = 10\ \Omega, i_o = 3.5\text{ A}$）。

*Chapter 2 Textbook Homework Problems: #8, 11, 15, 22, 31, 38, 47, 55.*

- Prob #8
- Prob #11
- Prob #15
- Prob #22 
- Prob #31
- Prob #38 
- Prob #47
- Prob #55

> **求解目標：課本課後習題自主演練**

<template #solution>

#### 逐步解析：

- **Prob #22 簡報提示**：$V_o = -11.905\text{ V},\quad P_{\text{dependent source}} = 566.9\text{ W}$

- **Prob #38 簡報提示**：$R_{eq} = 10\ \Omega,\quad i_o = 3.5\text{ A}$

- 其餘指定題號（#8, #11, #15, #31, #47, #55）請參考課本對應習題，循序應用歐姆定律、KCL、KVL 與串並聯公式練習。

::: tip 標準答案
$$\text{指定題號：\#8, \#11, \#15, \#22, \#31, \#38, \#47, \#55}$$
:::

</template>
</PracticeCard>
