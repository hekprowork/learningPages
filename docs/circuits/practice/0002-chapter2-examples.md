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

<PracticeFilter prefix="ch2-" />
<PracticeProgress :total="117" prefix="ch2-" />

<PracticeCard id="ch2-ex-2-1" type="example" title="電熨斗等效電阻計算" source="Example 2.1 · Slide P17" topic="歐姆定律與電導">

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

<PracticeCard id="ch2-ex-2-2" type="example" title="直流電阻電路之電流、電導與功率計算" source="Example 2.2 · Slide P18" topic="歐姆定律與電導">

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

<PracticeCard id="ch2-ex-2-3" type="example" title="正弦交流時變電壓源的電流與瞬時功率" source="Example 2.3 · Slide P20" topic="歐姆定律與電導">

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

<PracticeCard id="ch2-ex-2-4" type="example" title="網路分支數、節點數與串並聯拓撲判定" source="Example 2.4 · Slide P27" topic="拓撲、KCL 與 KVL">

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

<PracticeCard id="ch2-ex-2-5" type="example" title="單迴路克希荷夫電壓定律 (KVL) 求解端電壓" source="Example 2.5 · Slide P38" topic="拓撲、KCL 與 KVL">

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

<PracticeCard id="ch2-ex-2-6" type="example" title="含相依電壓源 (Dependent Source) 的單迴路分析" source="Example 2.6 · Slide P40" topic="拓撲、KCL 與 KVL">

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

<PracticeCard id="ch2-ex-2-7" type="example" title="並聯節點克希荷夫電流定律 (KCL) 與相依電流源分析" source="Example 2.7 · Slide P43" topic="拓撲、KCL 與 KVL">

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

<PracticeCard id="ch2-ex-2-8" type="example" title="串並聯結合 KCL/KVL 綜合多未知數求解" source="Example 2.8 · Slide P44" topic="拓撲、KCL 與 KVL">

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

<PracticeCard id="ch2-ex-2-9" type="example" title="階梯狀 (Ladder) 電阻網路等效電阻化簡" source="Example 2.9 · Slide P55" topic="串並聯化簡與分壓分流">

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

<PracticeCard id="ch2-ex-2-10" type="example" title="多節點交叉連接電阻網路等效電阻計算" source="Example 2.10 · Slide P56-57" topic="串並聯化簡與分壓分流">

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

<PracticeCard id="ch2-ex-2-11" type="example" title="純電導網路 (Conductance) 的等效電導計算" source="Example 2.11 · Slide P58" topic="串並聯化簡與分壓分流">

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

<PracticeCard id="ch2-ex-2-12" type="example" title="分壓、分流定律與特定電阻功率消耗分析" source="Example 2.12 · Slide P59-60" topic="串並聯化簡與分壓分流">

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

<PracticeCard id="ch2-ex-2-13" type="example" title="電流源並聯分流與全電路功率守恆平衡" source="Example 2.13 · Slide P61-64" topic="串並聯化簡與分壓分流">

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

<PracticeCard id="ch2-ex-2-14" type="example" title="三角形 (Δ) 網路至等效星形 (Y) 網路轉換" source="Example 2.14 · Slide P82-83" topic="Δ-Y 轉換">

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

<PracticeCard id="ch2-ex-2-15" type="example" title="利用 Δ-Y 轉換求解非對稱橋式電路等效電阻與電流" source="Example 2.15 · Slide P84-91" topic="Δ-Y 轉換">

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

<PracticeCard id="ch2-prac-2-14" type="practice" title="星形 (Y) 網路至等效三角形 (Δ) 網路轉換" source="Practice 2.14 · Slide P92" topic="課堂 Practice 測驗">

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

<PracticeCard id="ch2-prac-2-15" type="practice" title="含前級串聯電阻之非對稱橋式網路求解" source="Practice 2.15 · Slide P92" topic="課堂 Practice 測驗">

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

## 教材直接來源補齊

<PracticeCard id="ch2-pr1" type="practice" title="Practice Problem 2.1" source="課本 p.40" topic="歐姆定律與電阻功率">

電烤麵包機的核心元件是一個將電能轉換為熱能的電氣元件（電阻器）。一個電阻為 $15\ \Omega$、兩端電壓為 $120\ \mathrm{V}$ 的烤麵包機，所吸取的電流是多少？

<template #solution>

**教材答案：** $8\ \mathrm{A}$

</template>

</PracticeCard>

<PracticeCard id="ch2-pr2" type="practice" title="Practice Problem 2.2" source="課本 p.41" topic="歐姆定律與電阻功率">

對於圖 2.9 所示的電路，計算電壓 $v$、導納 $G$ 與功率 $p$。

![Figure 2.9](../assets/images/ch2-pr2_figure_2.9.png)

<template #solution>

**教材答案：** $v=30\ \mathrm{V}$、$G=100\ \mu\mathrm{S}$、$p=90\ \mathrm{mW}$

</template>

</PracticeCard>

<PracticeCard id="ch2-pr3" type="practice" title="Practice Problem 2.3" source="課本 p.41" topic="時變電壓與電阻功率">

某電阻器接於電壓源 $v=15\cos t\ \mathrm{V}$ 時，吸收的瞬時功率為 $30\cos^2 t\ \mathrm{mW}$。求電流 $i$ 與電阻 $R$。

<template #solution>

**教材答案：** $i=2\cos t\ \mathrm{mA}$、$R=7.5\ \mathrm{k}\Omega$

</template>

</PracticeCard>

<PracticeCard id="ch2-pr4" type="practice" title="Practice Problem 2.4" source="課本 p.43" topic="節點、分支與串並聯">

圖 2.14 所示的電路有多少個分支與節點？請辨識哪些元件串聯、哪些元件並聯。

![Figure 2.14](../assets/images/ch2-pr4_figure_2.14.png)

<template #solution>

![Figure 2.15](../assets/images/ch2-pr4_figure_2.15.png)

圖 2.15 顯示此電路有五個分支與三個節點。$1\ \Omega$ 與 $2\ \Omega$ 電阻並聯；$4\ \Omega$ 電阻與 $10\ \mathrm{V}$ 電壓源也並聯。沒有任何元件串聯。

</template>

</PracticeCard>

<PracticeCard id="ch2-pr5" type="practice" title="Practice Problem 2.5" source="課本 p.47" topic="基爾霍夫電壓定律">

求圖 2.22 電路中的電壓 $v_1$ 與 $v_2$。

![Figure 2.22](../assets/images/ch2-pr5_figure_2.22.png)

<template #solution>

**教材答案：** $v_1=16\ \mathrm{V}$、$v_2=-8\ \mathrm{V}$

</template>

</PracticeCard>

<PracticeCard id="ch2-pr6" type="practice" title="Practice Problem 2.6" source="課本 p.47" topic="基爾霍夫電壓定律與受控電壓源">

求圖 2.24 電路中的 $v_x$ 與 $v_o$。

![Figure 2.24](../assets/images/ch2-pr6_figure_2.24.png)

<template #solution>

**教材答案：** $v_x=20\ \mathrm{V}$、$v_o=-10\ \mathrm{V}$

</template>

</PracticeCard>

<PracticeCard id="ch2-pr7" type="practice" title="練習題 2.7：受控電流源電路" source="課本 p.48" topic="KCL 與歐姆定律">

如圖 2.26 所示，求 $v_o$ 與 $i_o$，並求出各支路的電流與電壓。

![Figure 2.26](../assets/images/ch2-pr7_figure_2.26.png)

<template #solution>

圖中的各支路都跨接在同一對節點，因此 2-$\Omega$ 與 8-$\Omega$ 電阻的端電壓相同。依圖示參考方向，

$$
v_o=2i_o.
$$

在上方節點套用 KCL。9 A 電流源注入節點，而離開節點的電流包括 $i_o$、受控電流源的 $0.25i_o$，以及 8-$\Omega$ 電阻中的電流：

$$
9=i_o+0.25i_o+\frac{v_o}{8}.
$$

代入 $v_o=2i_o$，得

$$
9=i_o+\frac14i_o+\frac{2i_o}{8}
=\frac32i_o,
$$

所以

$$
i_o=6\ \mathrm{A},
\qquad
v_o=2(6)=12\ \mathrm{V}.
$$

其他支路量為

$$
i_{0.25i_o}=0.25(6)=1.5\ \mathrm{A},
\qquad
i_{8\Omega}=\frac{v_o}{8}=1.5\ \mathrm{A}.
$$

驗算：離開上方節點的電流為 $6+1.5+1.5=9\ \mathrm{A}$，與 9 A 電流源注入的電流相等。

**課本答案：** $i_o=6\ \mathrm{A}$，$v_o=12\ \mathrm{V}$。

</template>

</PracticeCard>

<PracticeCard id="ch2-pr8" type="practice" title="練習題 2.8：含兩個電壓源的電阻電路" source="課本 p.49" topic="KCL、KVL 與歐姆定律">

求圖 2.28 電路中的所有電流與電壓。

![Figure 2.28](../assets/images/ch2-pr8_figure_2.28.png)

<template #solution>

令中間上方節點電壓為 $v_a$，下方導線為參考節點。依圖示極性，左側節點為 $10\ \mathrm{V}$，右側 6-V 電壓源的上端為 $-6\ \mathrm{V}$。由歐姆定律與圖示極性，

$$
i_1=\frac{10-v_a}{2},
\qquad
i_2=\frac{v_a}{8},
\qquad
i_3=\frac{v_a-(-6)}{4}.
$$

在節點 $a$ 套用 KCL：

$$
\frac{10-v_a}{2}=\frac{v_a}{8}+\frac{v_a+6}{4}.
$$

乘以 8 並整理：

$$
4(10-v_a)=v_a+2(v_a+6)
\quad\Longrightarrow\quad
v_a=4\ \mathrm{V}.
$$

因此

$$
\begin{aligned}
v_1&=10-v_a=6\ \mathrm{V},
&i_1&=\frac{v_1}{2}=3\ \mathrm{A},\\
v_2&=v_a=4\ \mathrm{V},
&i_2&=\frac{v_2}{8}=0.5\ \mathrm{A}=500\ \mathrm{mA},\\
v_3&=v_a+6=10\ \mathrm{V},
&i_3&=\frac{v_3}{4}=2.5\ \mathrm{A}.
\end{aligned}
$$

驗算節點電流：

$$
i_1-i_2-i_3=3-0.5-2.5=0.
$$

**課本答案：** $v_1=6\ \mathrm{V}$、$v_2=4\ \mathrm{V}$、$v_3=10\ \mathrm{V}$、$i_1=3\ \mathrm{A}$、$i_2=500\ \mathrm{mA}$、$i_3=2.5\ \mathrm{A}$。

</template>

</PracticeCard>

<PracticeCard id="ch2-pr9" type="practice" title="練習題 2.9：串並聯等效電阻" source="課本 p.53" topic="串聯與並聯電阻化簡">

將圖 2.36 中的電阻組合化簡，求端點所見的等效電阻 $R_{\mathrm{eq}}$。

![Figure 2.36](../assets/images/ch2-pr9_figure_2.36.png)

<template #solution>

先由最右側的串聯支路開始。右側支路的 4-$\Omega$、5-$\Omega$ 與 3-$\Omega$ 電阻串聯，因此

$$
R_{\mathrm{right}}=4+5+3=12\ \Omega.
$$

它與中間的 4-$\Omega$ 電阻並聯：

$$
R_{m}=4\parallel12
=\frac{4\times12}{4+12}
=3\ \Omega.
$$

再與上方的 3-$\Omega$ 電阻串聯，得到

$$
R_{b}=3+R_{m}=3+3=6\ \Omega.
$$

這個 6-$\Omega$ 支路與中央的 6-$\Omega$ 電阻並聯，所以內部網路等效為

$$
R_{i}=6\parallel6=3\ \Omega.
$$

最後再加上端點左側的 4-$\Omega$ 與 3-$\Omega$ 串聯電阻：

$$
R_{\mathrm{eq}}=4+R_{\text{i}}+3
=4+3+3
=10\ \Omega.
$$

**課本答案：** $R_{\mathrm{eq}}=10\ \Omega$。

</template>

</PracticeCard>

<PracticeCard id="ch2-pr10" type="practice" title="練習題 2.10：橋式電阻網路的等效電阻" source="課本 p.54" topic="串並聯電阻化簡">

求圖 2.39 端點 $a$-$b$ 所見的等效電阻 $R_{ab}$。

![Figure 2.39](../assets/images/ch2-pr10_figure_2.39.png)

<template #solution>

先化簡右上方的並聯電阻：

$$
20\parallel5=\frac{20\times5}{20+5}=4\ \Omega.
$$

此結果與 1-$\Omega$ 電阻串聯，再與斜向的 20-$\Omega$ 電阻並聯：

$$
\begin{aligned}
R_1&=4+1=5\ \Omega,\\
R_2&=5\parallel20
=\frac{5\times20}{5+20}=4\ \Omega,\\
R_3&=R_2+2=4+2=6\ \Omega.
\end{aligned}
$$

另一條由中心節點連到 $b$ 的支路為 18-$\Omega$ 與 9-$\Omega$ 並聯：

$$
18\parallel9=\frac{18\times9}{18+9}=6\ \Omega.
$$

因此中心節點到 $b$ 的等效電阻為

$$
R_{\text{center}}=6\parallel6=3\ \Omega.
$$

最後與 $a$ 端的 16-$\Omega$ 電阻串聯：

$$
R_{ab}=16+3=19\ \Omega.
$$

**課本答案：** $R_{ab}=19\ \Omega$。

</template>

</PracticeCard>

<PracticeCard id="ch2-pr11" type="practice" title="練習題 2.11：等效電導" source="課本 p.55" topic="電導的串並聯化簡">

求圖 2.41 電路的等效電導 $G_{\mathrm{eq}}$。

![Figure 2.41](../assets/images/ch2-pr11_figure_2.41.png)

<template #solution>

先將兩組並聯電導相加：

$$
G_1=8+4=12\ \mathrm{S},
\qquad
G_2=2+4=6\ \mathrm{S}.
$$

兩組等效電導彼此串聯。串聯時應對電阻相加，換成電導表示為

$$
\frac{1}{G_{\mathrm{eq}}}
=\frac{1}{G_1}+\frac{1}{G_2}
=\frac{1}{12}+\frac{1}{6}
=\frac14.
$$

所以

$$
G_{\mathrm{eq}}=4\ \mathrm{S}.
$$

**課本答案：** $G_{\mathrm{eq}}=4\ \mathrm{S}$。

</template>

</PracticeCard>

<PracticeCard id="ch2-pr12" type="practice" title="練習題 2.12：並聯電阻與功率計算" source="課本 p.56" topic="並聯電阻、電流分配與功率">

求圖 2.43 中的 $v_1$、$v_2$、$i_1$ 與 $i_2$，並計算 12-$\Omega$ 與 40-$\Omega$ 電阻所消耗的功率。

![Figure 2.43](../assets/images/ch2-pr12_figure_2.43.png)

<template #solution>

圖中左側的 12-$\Omega$ 與 6-$\Omega$ 電阻並聯，右側的 10-$\Omega$ 與 40-$\Omega$ 電阻並聯。先求兩個並聯組合：

$$
R_L=12\parallel6
=\frac{12\times6}{12+6}=4\ \Omega,
$$

$$
R_R=10\parallel40
=\frac{10\times40}{10+40}=8\ \Omega.
$$

兩個等效電阻串聯，因此總電阻與總電流為

$$
R_{\mathrm{eq}}=R_L+R_R=4+8=12\ \Omega,
\qquad
I=\frac{30}{12}=2.5\ \mathrm{A}.
$$

左側並聯組合的端電壓為

$$
v_1=I R_L=2.5(4)=10\ \mathrm{V}.
$$

右側並聯組合的端電壓為

$$
v_2=I R_R=2.5(8)=20\ \mathrm{V}.
$$

由歐姆定律求指定支路電流：

$$
i_1=\frac{v_1}{12}=\frac{10}{12}=0.8333\ \mathrm{A}=833.3\ \mathrm{mA},
$$

$$
i_2=\frac{v_2}{40}=\frac{20}{40}=0.5\ \mathrm{A}=500\ \mathrm{mA}.
$$

兩個指定電阻的功率為

$$
p_1=v_1i_1=10\left(\frac{10}{12}\right)=8.333\ \mathrm{W},
$$

$$
p_2=v_2i_2=20(0.5)=10\ \mathrm{W}.
$$

驗算左側總電流：

$$
\frac{10}{12}+\frac{10}{6}=2.5\ \mathrm{A},
$$

右側總電流亦為

$$
\frac{20}{10}+\frac{20}{40}=2.5\ \mathrm{A}.
$$

**課本答案：** $v_1=10\ \mathrm{V}$、$i_1=833.3\ \mathrm{mA}$、$p_1=8.333\ \mathrm{W}$、$v_2=20\ \mathrm{V}$、$i_2=500\ \mathrm{mA}$、$p_2=10\ \mathrm{W}$。

</template>

</PracticeCard>

<PracticeCard id="ch2-pr13" type="practice" title="Practice Problem 2.13：並聯網路的電壓與功率" source="課本 p.57" topic="串並聯化簡與功率">

在圖 2.45 的電路中，$30\text{ mA}$ 電流源與三條並聯支路相接：左支路為 $3\text{ k}\Omega$ 與 $1\text{ k}\Omega$ 串聯，中支路為 $5\text{ k}\Omega$，右支路為 $20\text{ k}\Omega$。電壓 $v_1$ 標示在 $3\text{ k}\Omega$ 電阻兩端，$v_2$ 標示在 $20\text{ k}\Omega$ 電阻兩端。求：

1. $v_1$ 與 $v_2$。
2. $3\text{ k}\Omega$ 與 $20\text{ k}\Omega$ 電阻所消耗的功率。
3. 電流源所提供的功率。

![Figure 2.45](../assets/images/ch2-pr13_figure_2.45.png)

<template #solution>

#### 逐步解析

左支路的串聯等效電阻為

$$
R_L=3\text{ k}\Omega+1\text{ k}\Omega=4\text{ k}\Omega。
$$

三條支路皆跨接在電流源兩端，因此其端電壓相同。先以總電導求端電壓：

$$
G_{\text{eq}}=\frac{1}{4\text{ k}\Omega}+\frac{1}{5\text{ k}\Omega}+\frac{1}{20\text{ k}\Omega}
=0.5\text{ mS},
$$

$$
V=\frac{I_s}{G_{\text{eq}}}
=\frac{30\text{ mA}}{0.5\text{ mS}}
=60\text{ V}。
$$

左支路電流為

$$
I_L=\frac{60\text{ V}}{4\text{ k}\Omega}=15\text{ mA}。
$$

因此，$3\text{ k}\Omega$ 電阻上的電壓為

$$
v_1=I_L(3\text{ k}\Omega)=(15\text{ mA})(3\text{ k}\Omega)=45\text{ V}，
$$

而右側 $20\text{ k}\Omega$ 電阻直接跨接於並聯端點，所以

$$
v_2=60\text{ V}。
$$

$3\text{ k}\Omega$ 電阻的功率為

$$
P_{3\text{ k}\Omega}=I_L^2R=(15\text{ mA})^2(3\text{ k}\Omega)=675\text{ mW}。
$$

$20\text{ k}\Omega$ 電阻的電流為

$$
I_{20\text{ k}\Omega}=\frac{60\text{ V}}{20\text{ k}\Omega}=3\text{ mA},
$$

故其功率為

$$
P_{20\text{ k}\Omega}=v_2I_{20\text{ k}\Omega}=(60\text{ V})(3\text{ mA})=180\text{ mW}。
$$

電流源提供的功率為

$$
P_s=VI_s=(60\text{ V})(30\text{ mA})=1.8\text{ W}。
$$

功率對帳：其餘電阻的功率為 $1.8\text{ W}-0.675\text{ W}-0.180\text{ W}=0.945\text{ W}$，所以總吸收功率與電流源提供的 $1.8\text{ W}$ 相符。

::: tip 標準答案

$$v_1=45\text{ V},\quad v_2=60\text{ V},\quad P_{3\text{ k}\Omega}=675\text{ mW},\quad P_{20\text{ k}\Omega}=180\text{ mW},\quad P_s=1.8\text{ W}$$

:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex16" type="example" title="Example 2.16：三顆燈泡的電流與等效電阻" source="課本 p.64" topic="照明系統與功率">

三顆燈泡接在 $9\text{ V}$ 電池上：一顆額定功率為 $20\text{ W}$ 的燈泡單獨形成一條支路，另兩顆額定功率分別為 $15\text{ W}$ 與 $10\text{ W}$ 的燈泡串聯形成另一條支路。將每顆燈泡視為電阻，求：

1. 電池提供的總電流。
2. 流過每顆燈泡的電流。
3. 每顆燈泡的等效電阻。

![Figure 2.56](../assets/images/ch2-ex16_figure_2.56.png)

<template #solution>

#### 逐步解析

三顆燈泡吸收的總功率為

$$
P=15\text{ W}+10\text{ W}+20\text{ W}=45\text{ W}。
$$

由 $P=VI$，電池提供的總電流為

$$
I=\frac{P}{V}=\frac{45\text{ W}}{9\text{ V}}=5\text{ A}。
$$

令 $R_1$ 表示 $20\text{ W}$ 燈泡，$R_2$ 表示 $15\text{ W}$ 燈泡，$R_3$ 表示 $10\text{ W}$ 燈泡。$R_1$ 與電池並聯，也與 $R_2$、$R_3$ 的串聯組合並聯，因此

$$
V_1=V_2+V_3=9\text{ V}。
$$

$R_1$ 中的電流為

$$
I_1=\frac{P_1}{V_1}=\frac{20\text{ W}}{9\text{ V}}=2.222\text{ A}。
$$

由 KCL，流過串聯組合 $R_2$、$R_3$ 的電流為

$$
I_2=I-I_1=5-2.222=2.778\text{ A}。
$$

由於 $R_2$ 與 $R_3$ 串聯，兩者電流相同，故 $I_3=I_2=2.778\text{ A}$。使用 $P=I^2R$ 計算各燈泡電阻：

$$
R_1=\frac{P_1}{I_1^2}=\frac{20}{(2.222)^2}=4.05\ \Omega,
$$

$$
R_2=\frac{P_2}{I_2^2}=\frac{15}{(2.778)^2}=1.945\ \Omega,
$$

$$
R_3=\frac{P_3}{I_3^2}=\frac{10}{(2.778)^2}=1.297\ \Omega。
$$

::: tip 標準答案

$$I=5\text{ A},\quad I_1=2.222\text{ A},\quad I_2=I_3=2.778\text{ A}$$

$$R_1=4.05\ \Omega,\quad R_2=1.945\ \Omega,\quad R_3=1.297\ \Omega$$

:::

</template>
</PracticeCard>

<PracticeCard id="ch2-pr16" type="practice" title="Practice Problem 2.16：串聯與並聯燈泡的電流" source="課本 p.65" topic="照明系統與串並聯">

有兩組燈泡：一組有 $10$ 顆相同燈泡並聯，另一組有 $10$ 顆相同燈泡串聯。兩種接法中，每顆燈泡皆須在額定功率 $40\text{ W}$ 下運作；並聯接法與串聯接法的電源電壓皆為 $120\text{ V}$。求兩種接法中每顆燈泡的電流。

<template #solution>

#### 逐步解析

**並聯接法：** 每顆燈泡直接跨接於 $120\text{ V}$ 電源，因此每顆燈泡的電流為

$$
I_{\parallel}=\frac{P}{V}=\frac{40\text{ W}}{120\text{ V}}=0.333\text{ A}=333\text{ mA}。
$$

**串聯接法：** $10$ 顆相同燈泡分攤 $120\text{ V}$，所以每顆燈泡的電壓為

$$
V_{\text{lamp}}=\frac{120\text{ V}}{10}=12\text{ V}。
$$

串聯支路的電流相同，因此每顆燈泡的電流為

$$
I_{\text{series}}=\frac{P}{V_{\text{lamp}}}=\frac{40\text{ W}}{12\text{ V}}=3.33\text{ A}。
$$

::: tip 標準答案

$$I_{\parallel}=333\text{ mA},\quad I_{\text{series}}=3.33\text{ A}$$

:::

</template>
</PracticeCard>

<PracticeCard id="ch2-ex17" type="example" title="Example 2.17：多量程直流電壓表設計" source="課本 p.68" topic="直流電表設計">

設計一個多量程直流電壓表，量程為：

1. $0$–$1\text{ V}$。
2. $0$–$5\text{ V}$。
3. $0$–$50\text{ V}$。
4. $0$–$100\text{ V}$。

電表內部電阻為 $R_m=2\text{ k}\Omega$，滿刻度電流為 $I_{fs}=100\ \mu\text{A}$。求各量程所需的串聯倍增電阻 $R_1$、$R_2$、$R_3$、$R_4$。

<template #solution>

#### 逐步解析

電壓表的倍增電阻與內部電阻串聯。滿刻度時，整體電阻兩端的電壓為 $V_{fs}$，所以

$$
V_{fs}=I_{fs}(R_n+R_m),
$$

整理得

$$
R_n=\frac{V_{fs}}{I_{fs}}-R_m。
$$

代入 $R_m=2\text{ k}\Omega$ 與 $I_{fs}=100\ \mu\text{A}$：

$$
R_1=\frac{1\text{ V}}{100\ \mu\text{A}}-2\text{ k}\Omega
=10\text{ k}\Omega-2\text{ k}\Omega=8\text{ k}\Omega,
$$

$$
R_2=\frac{5\text{ V}}{100\ \mu\text{A}}-2\text{ k}\Omega
=50\text{ k}\Omega-2\text{ k}\Omega=48\text{ k}\Omega,
$$

$$
R_3=\frac{50\text{ V}}{100\ \mu\text{A}}-2\text{ k}\Omega
=500\text{ k}\Omega-2\text{ k}\Omega=498\text{ k}\Omega,
$$

$$
R_4=\frac{100\text{ V}}{100\ \mu\text{A}}-2\text{ k}\Omega
=1000\text{ k}\Omega-2\text{ k}\Omega=998\text{ k}\Omega。
$$

::: tip 標準答案

$$R_1=8\text{ k}\Omega,\quad R_2=48\text{ k}\Omega,\quad R_3=498\text{ k}\Omega,\quad R_4=998\text{ k}\Omega$$

:::

</template>
</PracticeCard>

<PracticeCard id="ch2-pr17" type="practice" title="Practice Problem 2.17：多量程直流電流表設計" source="課本 p.69" topic="直流電表設計">

設計一個多量程直流電流表，量程為 $0$–$1\text{ A}$、$0$–$100\text{ mA}$ 與 $0$–$10\text{ mA}$。電表機芯的滿刻度電流為 $I_m=1\text{ mA}$，內部電阻為 $R_m=50\ \Omega$。求各量程所需的並聯分流電阻。

<template #solution>

#### 逐步解析

在滿刻度時，總電流 $I_{fs}$ 分成流過電表機芯的 $I_m$ 與流過分流電阻的電流。由電流分配公式，分流電阻 $R_n$ 為

$$
R_n=\frac{I_m}{I_{fs}-I_m}R_m。
$$

**$0$–$1\text{ A}$ 量程：**

$$
R_1=\frac{1\text{ mA}}{1\text{ A}-1\text{ mA}}(50\ \Omega)
=0.05005\ \Omega\approx50\text{ m}\Omega。
$$

**$0$–$100\text{ mA}$ 量程：**

$$
R_2=\frac{1\text{ mA}}{100\text{ mA}-1\text{ mA}}(50\ \Omega)
=0.505\ \Omega=505\text{ m}\Omega。
$$

**$0$–$10\text{ mA}$ 量程：**

$$
R_3=\frac{1\text{ mA}}{10\text{ mA}-1\text{ mA}}(50\ \Omega)
=5.556\ \Omega。
$$

::: tip 標準答案

$$R_1\approx50\text{ m}\Omega,\quad R_2=505\text{ m}\Omega,\quad R_3=5.556\ \Omega$$

:::

</template>
</PracticeCard>



## 課本章末習題：Problems 2.1–2.83

以下依原書題號排列。每題保留原題敘述、電路圖與標示；需要自行設計題目的題型亦照原文呈現。來源為《Fundamentals of Electric Circuits》Chapter 2，印刷頁 65–78（PDF 第 71–84 頁）。

<!-- Chapter-end textbook problems 2.1–2.83 -->

<PracticeCard id="ch2-problem-2-1" type="exercise" title="課本習題 2.1" source="課本 Chapter 2 · Problems 2.1 · 印刷頁 65" topic="歐姆定律">

![課本 Chapter 2 習題 2.1 原題與電路圖](../assets/images/ch2_problem_2_01.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.1 標準答案原文](../assets/images/ch2_appendix_answer_2_01.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-2" type="exercise" title="課本習題 2.2" source="課本 Chapter 2 · Problems 2.2 · 印刷頁 65" topic="歐姆定律">

![課本 Chapter 2 習題 2.2 原題與電路圖](../assets/images/ch2_problem_2_02.png)

<template #solution>

**自行推導：** 由額定值 $P=V^2/R$，得 $R=120^2/60=240\ \Omega$。回代：$120^2/240=60\text{ W}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-3" type="exercise" title="課本習題 2.3" source="課本 Chapter 2 · Problems 2.3 · 印刷頁 65" topic="歐姆定律">

![課本 Chapter 2 習題 2.3 原題與電路圖](../assets/images/ch2_problem_2_03.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.3 標準答案原文](../assets/images/ch2_appendix_answer_2_03.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-4" type="exercise" title="課本習題 2.4" source="課本 Chapter 2 · Problems 2.4 · 印刷頁 66" topic="歐姆定律">

![課本 Chapter 2 習題 2.4 原題與電路圖](../assets/images/ch2_problem_2_04.png)

<template #solution>

**自行推導：** 開關接 1 時只有 $100\ \Omega$ 支路，$i=40/100=0.4\text{ A}$；接 2 時只有 $250\ \Omega$ 支路，$i=40/250=0.16\text{ A}$。兩者均符合 $40-iR=0$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-5" type="exercise" title="課本習題 2.5" source="課本 Chapter 2 · Problems 2.5 · 印刷頁 66" topic="節點、支路與迴路">

![課本 Chapter 2 習題 2.5 原題與電路圖](../assets/images/ch2_problem_2_05.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.5 標準答案原文](../assets/images/ch2_appendix_answer_2_05.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-6" type="exercise" title="課本習題 2.6" source="課本 Chapter 2 · Problems 2.6 · 印刷頁 66" topic="節點、支路與迴路">

![課本 Chapter 2 習題 2.6 原題與電路圖](../assets/images/ch2_problem_2_06.png)

<template #solution>

**自行推導：** 依圖中紅點辨識，共有 **8 個節點**；逐段數相鄰節點間的支路，共 **15 條支路**。作為拓撲檢查，獨立迴路數 $l=b-n+1=15-8+1=8$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-7" type="exercise" title="課本習題 2.7" source="課本 Chapter 2 · Problems 2.7 · 印刷頁 66" topic="節點、支路與迴路">

![課本 Chapter 2 習題 2.7 原題與電路圖](../assets/images/ch2_problem_2_07.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.7 標準答案原文](../assets/images/ch2_appendix_answer_2_07.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-8" type="exercise" title="課本習題 2.8" source="課本 Chapter 2 · Problems 2.8 · 印刷頁 66" topic="老師指定練習 · KCL 與 KVL">
> **老師指定練習**：此題列於課堂 Homework 清單（Slide P93–94）。


![課本 Chapter 2 習題 2.8 原題與電路圖](../assets/images/ch2_problem_2_08.png)

<template #solution>

**自行推導：** 本題為開放式設計題。一個有效例子：指定 $i_a=2\text{ A}$、$i_b=5\text{ A}$、$i_c=8\text{ A}$。由左上節點 KCL，$i_1=i_b-i_a=3\text{ A}$；由下方左節點，$i_2=i_c-i_b=3\text{ A}$；由中間節點，$i_3=i_1+i_2=6\text{ A}$。驗算右下節點：$i_a+i_3=2+6=8=i_c$，殘差為零。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-9" type="exercise" title="課本習題 2.9" source="課本 Chapter 2 · Problems 2.9 · 印刷頁 66" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.9 原題與電路圖](../assets/images/ch2_problem_2_09.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.9 標準答案原文](../assets/images/ch2_appendix_answer_2_09.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-10" type="exercise" title="課本習題 2.10" source="課本 Chapter 2 · Problems 2.10 · 印刷頁 66" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.10 原題與電路圖](../assets/images/ch2_problem_2_10.png)

<template #solution>

**自行推導：** 外左支路標示 $-8\text{ A}$，表示實際有 $8\text{ A}$ 從頂點往左下；底支路 $-6\text{ A}$ 表示實際有 $6\text{ A}$ 從右下往左下。左下 KCL：$-i_1=8+6$，故 $i_1=-14\text{ A}$。右下 KCL：$i_2=4+6=10\text{ A}$。頂點驗算：$-8+4=-14+10=-4\text{ A}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-11" type="exercise" title="課本習題 2.11" source="課本 Chapter 2 · Problems 2.11 · 印刷頁 66" topic="老師指定練習 · KCL 與 KVL">
> **老師指定練習**：此題列於課堂 Homework 清單（Slide P93–94）。


![課本 Chapter 2 習題 2.11 原題與電路圖](../assets/images/ch2_problem_2_11.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.11 標準答案原文](../assets/images/ch2_appendix_answer_2_11.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-12" type="exercise" title="課本習題 2.12" source="課本 Chapter 2 · Problems 2.12 · 印刷頁 67" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.12 原題與電路圖](../assets/images/ch2_problem_2_12.png)

<template #solution>

**自行推導：** 以下方導線為 $0\text{ V}$。左端上節點為 $40\text{ V}$；跨過標示 $-50\text{ V}+$ 的元件後為 $90\text{ V}$；再跨 $+20\text{ V}-$ 後為 $70\text{ V}$，故 $v_1=70\text{ V}$。上方 $+30\text{ V}-$ 元件使右端節點為 $90-30=60\text{ V}$，故 $v_3=60\text{ V}$、$v_2=70-60=10\text{ V}$。逐段電壓差回代均與圖示極性一致。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-13" type="exercise" title="課本習題 2.13" source="課本 Chapter 2 · Problems 2.13 · 印刷頁 67" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.13 原題與電路圖](../assets/images/ch2_problem_2_13.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.13 標準答案原文](../assets/images/ch2_appendix_answer_2_13.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-14" type="exercise" title="課本習題 2.14" source="課本 Chapter 2 · Problems 2.14 · 印刷頁 67" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.14 原題與電路圖](../assets/images/ch2_problem_2_14.png)

<template #solution>

**自行推導：** 以下方導線為 $0\text{ V}$。左中節點由 $4\text{ V}$ 的極性得 $-4\text{ V}$，上方節點為 $-1\text{ V}$；右中節點為 $5\text{ V}$；中央節點因 $+2\text{ V}-$ 為 $7\text{ V}$。故 $V_1=-1-7=-8\text{ V}$、$V_2=5-(-1)=6\text{ V}$、$V_3=-4-7=-11\text{ V}$、$V_4=7\text{ V}$。各支路電壓均由同一組節點電位回算，KVL 殘差為零。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-15" type="exercise" title="課本習題 2.15" source="課本 Chapter 2 · Problems 2.15 · 印刷頁 67" topic="老師指定練習 · KCL 與 KVL">
> **老師指定練習**：此題列於課堂 Homework 清單（Slide P93–94）。


![課本 Chapter 2 習題 2.15 原題與電路圖](../assets/images/ch2_problem_2_15.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.15 標準答案原文](../assets/images/ch2_appendix_answer_2_15.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-16" type="exercise" title="課本習題 2.16" source="課本 Chapter 2 · Problems 2.16 · 印刷頁 67" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.16 原題與電路圖](../assets/images/ch2_problem_2_16.png)

<template #solution>

**自行推導：** 兩電源上端分別為 $10\text{ V}$ 與 $25\text{ V}$。流經上方兩電阻的電流從右往左，大小 $(25-10)/(16+14)=0.5\text{ A}$；中點電壓 $V_o=10+(0.5)(16)=18\text{ V}$。驗算：$25-(0.5)(14)=18$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-17" type="exercise" title="課本習題 2.17" source="課本 Chapter 2 · Problems 2.17 · 印刷頁 67" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.17 原題與電路圖](../assets/images/ch2_problem_2_17.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.17 標準答案原文](../assets/images/ch2_appendix_answer_2_17.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-18" type="exercise" title="課本習題 2.18" source="課本 Chapter 2 · Problems 2.18 · 印刷頁 67" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.18 原題與電路圖](../assets/images/ch2_problem_2_18.png)

<template #solution>

**自行推導：** 沿圖示 $I$ 方向套 KVL：$30+10-8-(3+5)I=0$，故 $I=4\text{ A}$。由右端 $8\text{ V}$ 電源往左回推，$V_{ab}=8+5I=28\text{ V}$。驗算：$30+10-3(4)=28$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-19" type="exercise" title="課本習題 2.19" source="課本 Chapter 2 · Problems 2.19 · 印刷頁 67" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.19 原題與電路圖](../assets/images/ch2_problem_2_19.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.19 標準答案原文](../assets/images/ch2_appendix_answer_2_19.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-20" type="exercise" title="課本習題 2.20" source="課本 Chapter 2 · Problems 2.20 · 印刷頁 68" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.20 原題與電路圖](../assets/images/ch2_problem_2_20.png)

<template #solution>

**自行推導：** 沿圖示 $i_o$ 方向寫 KVL：$54-22i_o-5i_o=0$，故 $i_o=2\text{ A}$。回代 $54-44-10=0\text{ V}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-21" type="exercise" title="課本習題 2.21" source="課本 Chapter 2 · Problems 2.21 · 印刷頁 68" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.21 原題與電路圖](../assets/images/ch2_problem_2_21.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.21 標準答案原文](../assets/images/ch2_appendix_answer_2_21.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-22" type="exercise" title="課本習題 2.22" source="課本 Chapter 2 · Problems 2.22 · 印刷頁 68" topic="老師指定練習 · KCL 與 KVL">
> **老師指定練習**：此題列於課堂 Homework 清單（Slide P93–94）。


![課本 Chapter 2 習題 2.22 原題與電路圖](../assets/images/ch2_problem_2_22.png)

<template #solution>

**自行推導：** 設左側上節點為 $V_A$、右側上節點為 $V_B$，則 $V_o=V_A-V_B$。左節點 KCL：$V_A/10+(V_A-V_B)/10=0$，故 $V_B=2V_A$。右節點 KCL：$(V_B-V_A)/10-25-2V_o=0$，代入得 $V_A=250/21\approx11.905\text{ V}$、$V_B=500/21\approx23.810\text{ V}$，所以 $V_o=-250/21\approx-11.905\text{ V}$。受控源箭頭向上但 $2V_o=-500/21\text{ A}$，實際向下，吸收功率 $P=V_B(-2V_o)=250000/441\approx566.9\text{ W}$。回代左、右 KCL 殘差均為零，與老師簡報 CH002（PDF 第 94 頁）的 P22 提示一致。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-23" type="exercise" title="課本習題 2.23" source="課本 Chapter 2 · Problems 2.23 · 印刷頁 68" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.23 原題與電路圖](../assets/images/ch2_problem_2_23.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.23 標準答案原文](../assets/images/ch2_appendix_answer_2_23.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-24" type="exercise" title="課本習題 2.24" source="課本 Chapter 2 · Problems 2.24 · 印刷頁 68" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.24 原題與電路圖](../assets/images/ch2_problem_2_24.png)

<template #solution>

**自行推導：** 左側迴路 $I_o=V_s/(R_1+R_2)$。右側受控電流源使輸出節點電壓 $V_o=-\alpha I_o(R_3\parallel R_4)$，所以 $V_o/V_s=-\alpha(R_3\parallel R_4)/(R_1+R_2)$。若四個電阻皆為 $R$，則 $V_o/V_s=-\alpha/4$；欲使 $|V_o/V_s|=10$，需 $\alpha=40$。回代得 $-10$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-25" type="exercise" title="課本習題 2.25" source="課本 Chapter 2 · Problems 2.25 · 印刷頁 68" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.25 原題與電路圖](../assets/images/ch2_problem_2_25.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.25 標準答案原文](../assets/images/ch2_appendix_answer_2_25.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-26" type="exercise" title="課本習題 2.26" source="課本 Chapter 2 · Problems 2.26 · 印刷頁 68" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.26 原題與電路圖](../assets/images/ch2_problem_2_26.png)

<template #solution>

**自行推導：** $16\ \Omega$ 支路電流 $i_o=3\text{ A}$，故並聯部分電壓 $V=16(3)=48\text{ V}$。其餘支路電流依次為 $48/8=6$、$48/4=12$、$48/2=24\text{ A}$，所以 $i_x=6+12+24+3=45\text{ A}$。全電路電阻吸收功率 $10(45)^2+48(45)=22{,}410\text{ W}$。驗算：各並聯支路壓降皆為 $48\text{ V}$，KCL 殘差為零。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-27" type="exercise" title="課本習題 2.27" source="課本 Chapter 2 · Problems 2.27 · 印刷頁 68" topic="KCL 與 KVL">

![課本 Chapter 2 習題 2.27 原題與電路圖](../assets/images/ch2_problem_2_27.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.27 標準答案原文](../assets/images/ch2_appendix_answer_2_27.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-28" type="exercise" title="課本習題 2.28" source="課本 Chapter 2 · Problems 2.28 · 印刷頁 69" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.28 原題與電路圖](../assets/images/ch2_problem_2_28.png)

<template #solution>

**自行推導：** 本題為開放式設計題。一個有效例子：設定 $V_s=12\text{ V}$、$R_1=2\ \Omega$、$R_2=6\ \Omega$、$R_3=3\ \Omega$。並聯等效 $R_2\parallel R_3=2\ \Omega$，總電阻 $4\ \Omega$，源電流 $3\text{ A}$。因此 $v_1=6\text{ V}$，$v_2=v_3=6\text{ V}$；支路電流為 $1\text{ A}$ 與 $2\text{ A}$。驗算：$3=1+2\text{ A}$，$12=6+6\text{ V}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-29" type="exercise" title="課本習題 2.29" source="課本 Chapter 2 · Problems 2.29 · 印刷頁 69" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.29 原題與電路圖](../assets/images/ch2_problem_2_29.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 931 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.29 標準答案原文](../assets/images/ch2_appendix_answer_2_29.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-30" type="exercise" title="課本習題 2.30" source="課本 Chapter 2 · Problems 2.30 · 印刷頁 69" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.30 原題與電路圖](../assets/images/ch2_problem_2_30.png)

<template #solution>

**自行推導：** 由圖，$180\ \Omega$ 與中間 $60\ \Omega$ 串聯成 $240\ \Omega$；此路與右側 $60\ \Omega$ 並聯，得 $240\parallel60=48\ \Omega$；再與左側 $25\ \Omega$ 串聯，故 $R_{eq}=73\ \Omega$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-31" type="exercise" title="課本習題 2.31" source="課本 Chapter 2 · Problems 2.31 · 印刷頁 69" topic="老師指定練習 · 串並聯與等效電阻">
> **老師指定練習**：此題列於課堂 Homework 清單（Slide P93–94）。


![課本 Chapter 2 習題 2.31 原題與電路圖](../assets/images/ch2_problem_2_31.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.31 標準答案原文](../assets/images/ch2_appendix_answer_2_31.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-32" type="exercise" title="課本習題 2.32" source="課本 Chapter 2 · Problems 2.32 · 印刷頁 69" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.32 原題與電路圖](../assets/images/ch2_problem_2_32.png)

<template #solution>

**自行推導：** 左右兩組分別為 $60\parallel40=24\ \Omega$ 與 $200\parallel50=40\ \Omega$，都接在中央節點與下方節點之間。設中央節點電壓為 $V$，KCL：$V/24+V/40+16=0$，得 $V=-240\text{ V}$。依圖示箭頭，$i_1=V/50=-4.8\text{ A}$、$i_2=V/200=-1.2\text{ A}$、$i_3=V/40=-6\text{ A}$、$i_4=V/60=-4\text{ A}$。回代 $-4.8-1.2-6-4+16=0$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-33" type="exercise" title="課本習題 2.33" source="課本 Chapter 2 · Problems 2.33 · 印刷頁 69" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.33 原題與電路圖](../assets/images/ch2_problem_2_33.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.33 標準答案原文](../assets/images/ch2_appendix_answer_2_33.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-34" type="exercise" title="課本習題 2.34" source="課本 Chapter 2 · Problems 2.34 · 印刷頁 69" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.34 原題與電路圖](../assets/images/ch2_problem_2_34.png)

<template #solution>

**自行推導：** 取電源負端為 $0\text{ V}$，正端為 $200\text{ V}$。按圖中接點列 KCL，依序求得上方 $20,28,60\ \Omega$ 後的節點電位為 $160,132,102\text{ V}$，下方兩內部節點為 $52,62\text{ V}$。電源電流 $(200-160)/20=2\text{ A}$，故 $R_{eq}=200/2=100\ \Omega$；總電阻吸收功率 $P=200(2)=400\text{ W}$。以此節點電位回代各節點 KCL，殘差均為零。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-35" type="exercise" title="課本習題 2.35" source="課本 Chapter 2 · Problems 2.35 · 印刷頁 69" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.35 原題與電路圖](../assets/images/ch2_problem_2_35.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.35 標準答案原文](../assets/images/ch2_appendix_answer_2_35.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-36" type="exercise" title="課本習題 2.36" source="課本 Chapter 2 · Problems 2.36 · 印刷頁 70" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.36 原題與電路圖](../assets/images/ch2_problem_2_36.png)

<template #solution>

**自行推導：** 取電源負端為 $0\text{ V}$，正端為 $20\text{ V}$。由右往左化簡：$50+30=80\ \Omega$，與直下 $20\ \Omega$ 並聯為 $16\ \Omega$，再加 $24\ \Omega$ 為 $40\ \Omega$；另一支路為 $25+(60\parallel20)=25+15=40\ \Omega$。兩支路並聯為 $20\ \Omega$，再加左端 $80\ \Omega$，全電路 $100\ \Omega$，故 $i=20/100=0.2\text{ A}$。左端 $80\ \Omega$ 後節點為 $4\text{ V}$，經右側 $40\ \Omega$ 支路電流 $0.1\text{ A}$，再經 $24\ \Omega$ 後為 $1.6\text{ V}$；$50+30$ 支路電流 $1.6/80=0.02\text{ A}$，所以 $V_o=0.02(30)=0.6\text{ V}$。回代入口 KCL：$0.2=0.1+0.1$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-37" type="exercise" title="課本習題 2.37" source="課本 Chapter 2 · Problems 2.37 · 印刷頁 70" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.37 原題與電路圖](../assets/images/ch2_problem_2_37.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.37 標準答案原文](../assets/images/ch2_appendix_answer_2_37.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-38" type="exercise" title="課本習題 2.38" source="課本 Chapter 2 · Problems 2.38 · 印刷頁 70" topic="老師指定練習 · 串並聯與等效電阻">
> **老師指定練習**：此題列於課堂 Homework 清單（Slide P93–94）。


![課本 Chapter 2 習題 2.38 原題與電路圖](../assets/images/ch2_problem_2_38.png)

<template #solution>

**自行推導：** 在 $2.5\ \Omega$ 後的節點，$6\parallel12=4\ \Omega$，右側 $20\parallel80=16\ \Omega$，該路總共 $4+16=20\ \Omega$。此路與 $15\ \Omega$、上方 $60\ \Omega$ 三路並聯，得 $R_{\text{後段}}=15\parallel20\parallel60=7.5\ \Omega$；與入口 $2.5\ \Omega$ 串聯，故 $R_{eq}=10\ \Omega$，$i_o=35/10=3.5\text{ A}$。回代入口壓降 $2.5(3.5)=8.75\text{ V}$、後段 $7.5(3.5)=26.25\text{ V}$，兩者和 $35\text{ V}$，與老師簡報 CH002（PDF 第 94 頁）的 P38 提示一致。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-39" type="exercise" title="課本習題 2.39" source="課本 Chapter 2 · Problems 2.39 · 印刷頁 70" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.39 原題與電路圖](../assets/images/ch2_problem_2_39.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.39 標準答案原文](../assets/images/ch2_appendix_answer_2_39.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-40" type="exercise" title="課本習題 2.40" source="課本 Chapter 2 · Problems 2.40 · 印刷頁 70" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.40 原題與電路圖](../assets/images/ch2_problem_2_40.png)

<template #solution>

**自行推導：** 由最右端回推：$1+2=3\ \Omega$，與 $6\ \Omega$ 並聯得 $2\ \Omega$；加上前方 $2\ \Omega$ 為 $4\ \Omega$，與 $4\ \Omega$ 並聯得 $2\ \Omega$；再加 $8\ \Omega$，故 $R_{eq}=10\ \Omega$，$I=15/10=1.5\text{ A}$。回代 $IR_{eq}=15\text{ V}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-41" type="exercise" title="課本習題 2.41" source="課本 Chapter 2 · Problems 2.41 · 印刷頁 70" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.41 原題與電路圖](../assets/images/ch2_problem_2_41.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.41 標準答案原文](../assets/images/ch2_appendix_answer_2_41.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-42" type="exercise" title="課本習題 2.42" source="課本 Chapter 2 · Problems 2.42 · 印刷頁 70" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.42(a) 原題與電路圖](../assets/images/ch2_problem_2_42.png)

![課本 Chapter 2 習題 2.42(b) 電路圖](../assets/images/ch2_problem_2_42_b.png)

![課本 Chapter 2 習題 2.42 原題與電路圖（續 2）](../assets/images/ch2_problem_2_42_continued.png)

<template #solution>

**自行推導：** 圖 (a)：$20\parallel30=12\ \Omega$，與 $8\ \Omega$ 串聯為 $20\ \Omega$，再與上方 $5\ \Omega$ 並聯，$R_{ab}=4\ \Omega$。圖 (b)：中間三路 $4\parallel(5+3)\parallel8=2\ \Omega$；右邊三路 $5\parallel10\parallel4=20/11\ \Omega$，加左端 $2\ \Omega$，得 $R_{ab}=2+2+20/11=64/11\approx5.818\ \Omega$。兩圖的每一步均按共端節點判斷串並聯。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-43" type="exercise" title="課本習題 2.43" source="課本 Chapter 2 · Problems 2.43 · 印刷頁 71" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.43 原題與電路圖](../assets/images/ch2_problem_2_43.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.43 標準答案原文](../assets/images/ch2_appendix_answer_2_43.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-44" type="exercise" title="課本習題 2.44" source="課本 Chapter 2 · Problems 2.44 · 印刷頁 71" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.44 原題與電路圖](../assets/images/ch2_problem_2_44.png)

<template #solution>

**自行推導：** 上方導線把 $5\ \Omega$ 左端與 $20\ \Omega$ 右端短接，因此兩者並聯：$5\parallel20=4\ \Omega$。再加 $2\ \Omega$ 為 $6\ \Omega$，與右端 $3\ \Omega$ 並聯，故 $R_{ab}=6\parallel3=2\ \Omega$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-45" type="exercise" title="課本習題 2.45" source="課本 Chapter 2 · Problems 2.45 · 印刷頁 71" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.45 原題與電路圖](../assets/images/ch2_problem_2_45.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.45 標準答案原文](../assets/images/ch2_appendix_answer_2_45.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-46" type="exercise" title="課本習題 2.46" source="課本 Chapter 2 · Problems 2.46 · 印刷頁 71" topic="串並聯與等效電阻">

![課本 Chapter 2 習題 2.46 原題與電路圖](../assets/images/ch2_problem_2_46.png)

<template #solution>

**自行推導：** 依圖，$(20\parallel5)=4\ \Omega$，$(24\parallel8)=6\ \Omega$，三個 $15\ \Omega$ 並聯為 $5\ \Omega$。整個單迴路等效 $R=4+6+5+5+12=32\ \Omega$，故 $I=80/32=2.5\text{ A}$；回代 $2.5(32)=80\text{ V}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-47" type="exercise" title="課本習題 2.47" source="課本 Chapter 2 · Problems 2.47 · 印刷頁 72" topic="老師指定練習 · 串並聯與等效電阻">
> **老師指定練習**：此題列於課堂 Homework 清單（Slide P93–94）。


![課本 Chapter 2 習題 2.47 原題與電路圖](../assets/images/ch2_problem_2_47.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.47 標準答案原文](../assets/images/ch2_appendix_answer_2_47.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-48" type="exercise" title="課本習題 2.48" source="課本 Chapter 2 · Problems 2.48 · 印刷頁 72" topic="Y–Δ 轉換與電阻網路">

![課本 Chapter 2 習題 2.48 原題與電路圖](../assets/images/ch2_problem_2_48.png)

<template #solution>

**自行推導：** Y 轉 Δ 使用各對應兩臂電阻之和再加兩臂乘積除以對面臂。圖 (a) 三臂均 $10\ \Omega$，故 Δ 三邊各 $30\ \Omega$。圖 (b) 以左、右、下三端 $a,b,c$ 表示：$R_{ab}=30+20+(30)(20)/50=62\ \Omega$；$R_{bc}=20+50+(20)(50)/30=103.333\ \Omega$；$R_{ac}=30+50+(30)(50)/20=155\ \Omega$。逐對端點代回兩端等效阻值，與原 Y 網路相同。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-49" type="exercise" title="課本習題 2.49" source="課本 Chapter 2 · Problems 2.49 · 印刷頁 72" topic="Y–Δ 轉換與電阻網路">

![課本 Chapter 2 習題 2.49 原題與電路圖](../assets/images/ch2_problem_2_49.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.49 標準答案原文](../assets/images/ch2_appendix_answer_2_49.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-50" type="exercise" title="課本習題 2.50" source="課本 Chapter 2 · Problems 2.50 · 印刷頁 72" topic="Y–Δ 轉換與電阻網路">

![課本 Chapter 2 習題 2.50 原題與電路圖](../assets/images/ch2_problem_2_50.png)

<template #solution>

**自行推導：** 本題為開放式設計題。一個使用 Y–Δ 轉換的例子：指定圖中每個 $R=1\text{ k}\Omega$、電流源 $9\text{ mA}$，求電流源端電壓與中間橋臂電流。將「上端、左中點、右中點」形成的三個 $R$ Δ 網路轉為 Y，各臂皆 $R^2/(3R)=R/3$。從 Y 中心到下端，左右各有 $R/3+R=4R/3$，兩路並聯為 $2R/3$；再與上端到 Y 中心的 $R/3$ 串聯，總等效 $R$。源端電壓 $V=(9\text{ mA})(1\text{ k}\Omega)=9\text{ V}$。原圖左右對稱，因此兩柱各 $4.5\text{ mA}$、中間橋臂電流為 $0$；回代 $4.5+4.5=9\text{ mA}$，橋臂兩端均為 $4.5\text{ V}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-51" type="exercise" title="課本習題 2.51" source="課本 Chapter 2 · Problems 2.51 · 印刷頁 72" topic="Y–Δ 轉換與電阻網路">

![課本 Chapter 2 習題 2.51 原題與電路圖](../assets/images/ch2_problem_2_51.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.51 標準答案原文](../assets/images/ch2_appendix_answer_2_51.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-52" type="exercise" title="課本習題 2.52" source="課本 Chapter 2 · Problems 2.52 · 印刷頁 72" topic="Y–Δ 轉換與電阻網路">

![課本 Chapter 2 習題 2.52 原題與電路圖](../assets/images/ch2_problem_2_52.png)

<template #solution>

**自行推導：** 把左側上下兩個入口 $3\ \Omega$ 電阻分別提出。對其間六個內部節點施加 $1\text{ V}$ 測試電壓，按各條 $3\ \Omega$ 支路列 KCL，可得內部等效 $177/55\ \Omega$。因此 $R_{eq}=3+177/55+3=507/55\approx9.218\ \Omega$。以 $1\text{ V}$ 回代內部網路，從上端流入的測試電流為 $55/177\text{ A}$，與下端流出相等。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-53" type="exercise" title="課本習題 2.53" source="課本 Chapter 2 · Problems 2.53 · 印刷頁 73" topic="Y–Δ 轉換與電阻網路">

![課本 Chapter 2 習題 2.53 原題與電路圖](../assets/images/ch2_problem_2_53.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.53 標準答案原文](../assets/images/ch2_appendix_answer_2_53.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-54" type="exercise" title="課本習題 2.54" source="課本 Chapter 2 · Problems 2.54 · 印刷頁 73" topic="Y–Δ 轉換與電阻網路">

![課本 Chapter 2 習題 2.54 原題與電路圖](../assets/images/ch2_problem_2_54.png)

<template #solution>

**自行推導：** 依圖中節點連接關係，以測試源法求兩組端口。對 (a) $a-b$ 施加 $1\text{ V}$，其餘端口開路，流入電流為 $1/130\text{ A}$，故 $R_{ab}=130\ \Omega$。對 (b) $c-d$ 施加 $1\text{ V}$，其餘端口開路，流入電流為 $1/140\text{ A}$，故 $R_{cd}=140\ \Omega$。測試解回代各內部節點 KCL 的殘差均為零。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-55" type="exercise" title="課本習題 2.55" source="課本 Chapter 2 · Problems 2.55 · 印刷頁 73" topic="老師指定練習 · Y–Δ 轉換與電阻網路">
> **老師指定練習**：此題列於課堂 Homework 清單（Slide P93–94）。


![課本 Chapter 2 習題 2.55 原題與電路圖](../assets/images/ch2_problem_2_55.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.55 標準答案原文](../assets/images/ch2_appendix_answer_2_55.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-56" type="exercise" title="課本習題 2.56" source="課本 Chapter 2 · Problems 2.56 · 印刷頁 73" topic="Y–Δ 轉換與電阻網路">

![課本 Chapter 2 習題 2.56 原題與電路圖](../assets/images/ch2_problem_2_56.png)

<template #solution>

**自行推導：** 以下方導線為 $0\text{ V}$，令 $16\ \Omega$ 後節點為 $V$。對 $V$ 及右側兩節點列 KCL，可得三節點依序為 $1354500/32113\approx42.18\text{ V}$、$588000/32113\approx18.31\text{ V}$、$567000/32113\approx17.66\text{ V}$。因此題求 $V\approx42.18\text{ V}$。回代入口：$(100-V)/16=V/35+(V-18.31)/15+(V-17.66)/30$（四捨五入前殘差為零）。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-57" type="exercise" title="課本習題 2.57" source="課本 Chapter 2 · Problems 2.57 · 印刷頁 73" topic="Y–Δ 轉換與電阻網路">

![課本 Chapter 2 習題 2.57 原題與電路圖](../assets/images/ch2_problem_2_57.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.57 標準答案原文](../assets/images/ch2_appendix_answer_2_57.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-58" type="exercise" title="課本習題 2.58" source="課本 Chapter 2 · Problems 2.58 · 印刷頁 73" topic="實際應用與量測">

![課本 Chapter 2 習題 2.58 原題與電路圖](../assets/images/ch2_problem_2_58.png)

<template #solution>

**自行推導：** 額定燈泡阻值 $R_L=120^2/60=240\ \Omega$；與 $80\ \Omega$ 並聯為 $60\ \Omega$。要使燈泡兩端為額定 $120\text{ V}$，並聯部分電流 $120/60=2\text{ A}$，串聯 $40\ \Omega$ 壓降 $80\text{ V}$，故 $V_s=120+80=200\text{ V}$。回代燈泡功率 $120^2/240=60\text{ W}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-59" type="exercise" title="課本習題 2.59" source="課本 Chapter 2 · Problems 2.59 · 印刷頁 73" topic="實際應用與量測">

![課本 Chapter 2 習題 2.59 原題開頭](../assets/images/ch2_problem_2_59.png)

![課本 Chapter 2 習題 2.59 題幹續頁與圖 2.123](../assets/images/ch2_problem_2_59_continuation.png)

![課本 Chapter 2 習題 2.59 原題與電路圖（續 2）](../assets/images/ch2_problem_2_59_continued.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.59 標準答案原文](../assets/images/ch2_appendix_answer_2_59.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-60" type="exercise" title="課本習題 2.60" source="課本 Chapter 2 · Problems 2.60 · 印刷頁 74" topic="實際應用與量測">

![課本 Chapter 2 習題 2.60 原題與電路圖](../assets/images/ch2_problem_2_60.png)

參照題 2.59 的燈泡額定值及圖示：

![課本 Chapter 2 習題 2.59 圖 2.123](../assets/images/ch2_problem_2_59_continuation.png)

![習題 2.60 所引用的習題 2.59 三燈泡電路（Figure 2.123）](../assets/images/ch2_problem_2_60_reference.png)

<template #solution>

**自行推導：** 由題 2.59 的圖 2.123，三燈泡額定為 $30\text{ W}$、$40\text{ W}$、$50\text{ W}$，且都額定 $120\text{ V}$。並聯在 $120\text{ V}$ 電源時，每顆都承受額定電壓，因此電流依序為 $30/120=0.25\text{ A}$、$40/120=0.3333\text{ A}$、$50/120=0.4167\text{ A}$。總電流 $1\text{ A}$，回代總功率 $120(1)=120\text{ W}=30+40+50\text{ W}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-61" type="exercise" title="課本習題 2.61" source="課本 Chapter 2 · Problems 2.61 · 印刷頁 74" topic="實際應用與量測">

![課本 Chapter 2 習題 2.61 原題與電路圖](../assets/images/ch2_problem_2_61.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.61 標準答案原文](../assets/images/ch2_appendix_answer_2_61.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-62" type="exercise" title="課本習題 2.62" source="課本 Chapter 2 · Problems 2.62 · 印刷頁 74" topic="實際應用與量測">

![課本 Chapter 2 習題 2.62 原題開頭](../assets/images/ch2_problem_2_62.png)

![課本 Chapter 2 習題 2.62 題幹續頁與圖 2.125](../assets/images/ch2_problem_2_62_continuation.png)

<template #solution>

**自行推導：** 圖示兩負載分別接於 $110\text{ V}$，總功率 $P=110(8+2)=1100\text{ W}=1.1\text{ kW}$。一年運轉 $10(365)=3650\text{ h}$，耗電 $1.1(3650)=4015\text{ kWh}$。每度 $0.06$ 美元，年費為 **240.90 美元**。檢查：電流 $8+2=10\text{ A}$，$110(10)=1100\text{ W}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-63" type="exercise" title="課本習題 2.63" source="課本 Chapter 2 · Problems 2.63 · 印刷頁 74" topic="實際應用與量測">

![課本 Chapter 2 習題 2.63 原題與電路圖](../assets/images/ch2_problem_2_63.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.63 標準答案原文](../assets/images/ch2_appendix_answer_2_63.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-64" type="exercise" title="課本習題 2.64" source="課本 Chapter 2 · Problems 2.64 · 印刷頁 74" topic="實際應用與量測">

![課本 Chapter 2 習題 2.64 原題與電路圖](../assets/images/ch2_problem_2_64.png)

<template #solution>

**自行推導：** 當電位器有效阻值為 $0$ 時達最大電流 $10\text{ A}$，故固定 $R=110/10=11\ \Omega$。當有效阻值最大時電流 $1\text{ A}$，總阻值 $110\ \Omega$，故 $R_x=110-11=99\ \Omega$。回代兩端：$110/11=10\text{ A}$、$110/(11+99)=1\text{ A}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-65" type="exercise" title="課本習題 2.65" source="課本 Chapter 2 · Problems 2.65 · 印刷頁 74" topic="實際應用與量測">

![課本 Chapter 2 習題 2.65 原題與電路圖](../assets/images/ch2_problem_2_65.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.65 標準答案原文](../assets/images/ch2_appendix_answer_2_65.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-66" type="exercise" title="課本習題 2.66" source="課本 Chapter 2 · Problems 2.66 · 印刷頁 74" topic="實際應用與量測">

![課本 Chapter 2 習題 2.66 原題與電路圖](../assets/images/ch2_problem_2_66.png)

<template #solution>

**自行推導：** $20\text{ k}\Omega/\text{V}$ 的表在 $10\text{ V}$ 滿刻度時內阻 $R_m=20\text{ k}\Omega/\text{V}\times10\text{ V}=200\text{ k}\Omega$，滿刻度電流 $I=10/200{,}000=50\ \mu\text{A}$。改量 $50\text{ V}$ 時總阻值 $50/I=1\text{ M}\Omega$，故串聯電阻 $R_s=800\text{ k}\Omega$。其滿刻度耗功率 $I^2R_s=0.002\text{ W}=2\text{ mW}$。驗算：$I(200+800)\text{ k}\Omega=50\text{ V}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-67" type="exercise" title="課本習題 2.67" source="課本 Chapter 2 · Problems 2.67 · 印刷頁 74" topic="實際應用與量測">

![課本 Chapter 2 習題 2.67 原題與電路圖](../assets/images/ch2_problem_2_67.png)

![課本 Chapter 2 習題 2.67 原題與電路圖（續 2）](../assets/images/ch2_problem_2_67_continued.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.67 標準答案原文](../assets/images/ch2_appendix_answer_2_67.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-68" type="exercise" title="課本習題 2.68" source="課本 Chapter 2 · Problems 2.68 · 印刷頁 75" topic="實際應用與量測">

![課本 Chapter 2 習題 2.68 原題與電路圖](../assets/images/ch2_problem_2_68.png)

<template #solution>

**自行推導：** 原電路的並聯阻值 $40\parallel60=24\ \Omega$，總阻值 $16+24=40\ \Omega$，故 $I=4/40=0.1\text{ A}$。串入 $1\ \Omega$ 電流表後，$I^\prime=4/(16+1+24)=4/41\approx0.09756\text{ A}$。百分誤差 $|I-I^\prime|/I\times100\%=100/41\approx2.439\%$。回代各情況的電阻壓降總和均為 $4\text{ V}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-69" type="exercise" title="課本習題 2.69" source="課本 Chapter 2 · Problems 2.69 · 印刷頁 75" topic="實際應用與量測">

![課本 Chapter 2 習題 2.69 原題與電路圖](../assets/images/ch2_problem_2_69.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.69 標準答案原文](../assets/images/ch2_appendix_answer_2_69.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-70" type="exercise" title="課本習題 2.70" source="課本 Chapter 2 · Problems 2.70 · 印刷頁 75" topic="實際應用與量測">

![課本 Chapter 2 習題 2.70 原題與電路圖](../assets/images/ch2_problem_2_70.png)

<template #solution>

**自行推導：** 以 $o$ 為接地點，下端 $0\text{ V}$、上端 $25\text{ V}$。左分壓得 $v_a=25(12)/(8+12)=15\text{ V}$；右分壓得 $v_b=25(10)/(15+10)=10\text{ V}$；因此 $v_{ab}=5\text{ V}$。若改以 $a$ 接地，兩側電位整體減 $15\text{ V}$：$v_a=0$、$v_b=-5\text{ V}$、$v_{ab}=5\text{ V}$，而 $o=-15\text{ V}$。分壓回代左右各支路總壓均 $25\text{ V}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-71" type="exercise" title="課本習題 2.71" source="課本 Chapter 2 · Problems 2.71 · 印刷頁 75" topic="實際應用與量測">

![課本 Chapter 2 習題 2.71 原題與電路圖](../assets/images/ch2_problem_2_71.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.71 標準答案原文](../assets/images/ch2_appendix_answer_2_71.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-72" type="exercise" title="課本習題 2.72" source="課本 Chapter 2 · Problems 2.72 · 印刷頁 76" topic="實際應用與量測">

![課本 Chapter 2 習題 2.72 原題與電路圖](../assets/images/ch2_problem_2_72.png)

<template #solution>

**自行推導：** 上下兩路完全對稱，因此中央 $2\ \Omega$ 橋臂兩端同電位，無電流。每路各有兩個 $1\ \Omega$ 串聯成 $2\ \Omega$；兩路並聯為 $1\ \Omega$，再與入口 $1\ \Omega$ 串聯，總電阻 $2\ \Omega$。電源電流 $10/2=5\text{ A}$，入口電阻降 $5\text{ V}$，故圖示 $V_o=5\text{ V}$。兩路各 $2.5\text{ A}$，橋臂兩端電位均 $2.5\text{ V}$，KCL/KVL 殘差為零。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-73" type="exercise" title="課本習題 2.73" source="課本 Chapter 2 · Problems 2.73 · 印刷頁 76" topic="實際應用與量測">

![課本 Chapter 2 習題 2.73 原題與電路圖](../assets/images/ch2_problem_2_73.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.73 標準答案原文](../assets/images/ch2_appendix_answer_2_73.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-74" type="exercise" title="課本習題 2.74" source="課本 Chapter 2 · Problems 2.74 · 印刷頁 76" topic="實際應用與量測">

![課本 Chapter 2 習題 2.74 原題與電路圖](../assets/images/ch2_problem_2_74.png)

<template #solution>

**自行推導：** 電動機阻值 $0.02\ \Omega$，圖中保險絲另有 $0.01\ \Omega$，固定串聯部分共 $0.03\ \Omega$。高速 $5\text{ A}$ 時僅 $R_3$ 串聯，$R_3=6/5-0.03=1.17\ \Omega$；中速 $3\text{ A}$ 時 $R_2+R_3=6/3-0.03=1.97\ \Omega$，所以 $R_2=0.80\ \Omega$；低速 $1\text{ A}$ 時 $R_1+R_2+R_3=6/1-0.03=5.97\ \Omega$，所以 $R_1=4.00\ \Omega$。回代三檔總阻值 $1.2,2.0,6.0\ \Omega$，電流恰為 $5,3,1\text{ A}$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-75" type="exercise" title="課本習題 2.75" source="課本 Chapter 2 · Problems 2.75 · 印刷頁 76" topic="實際應用與量測">

![課本 Chapter 2 習題 2.75 原題與電路圖](../assets/images/ch2_problem_2_75.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.75 標準答案原文](../assets/images/ch2_appendix_answer_2_75.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-76" type="exercise" title="課本習題 2.76" source="課本 Chapter 2 · Problems 2.76 · 印刷頁 77" topic="實際應用與量測">

本題沿用 2.75 的電阻分配概念；以下同時附上前題圖，供完整對照。

![課本 Chapter 2 習題 2.75 原題與電路圖](../assets/images/ch2_problem_2_75.png)

![課本 Chapter 2 習題 2.76 原題與電路圖](../assets/images/ch2_problem_2_76.png)

<template #solution>

**自行推導：** 圖中的各級上下對稱，所有橫向橋接的 $1\ \Omega$ 電阻兩端等電位，故無電流。每個最右側方塊由兩條 $2\ \Omega$ 路並聯，等效 $1\ \Omega$；往左每上一級都是兩條「$1\ \Omega$ 加下級 $1\ \Omega$」路並聯，仍為 $1\ \Omega$。入口另有 $1\ \Omega$ 串聯，故 $R_{ab}=2\ \Omega$。回代：若在 $a-b$ 加 $2\text{ V}$，入口電流為 $1\text{ A}$，各級依對稱性等分，所有橋臂電流為零。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-77" type="exercise" title="課本習題 2.77" source="課本 Chapter 2 · Problems 2.77 · 印刷頁 77" topic="實際應用與量測">

![課本 Chapter 2 習題 2.77 原題與電路圖](../assets/images/ch2_problem_2_77.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.77 標準答案原文](../assets/images/ch2_appendix_answer_2_77.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-78" type="exercise" title="課本習題 2.78" source="課本 Chapter 2 · Problems 2.78 · 印刷頁 77" topic="實際應用與量測">

![課本 Chapter 2 習題 2.78 原題與電路圖](../assets/images/ch2_problem_2_78.png)

<template #solution>

**自行推導：** 電位器滑臂與下端相接，故下段 $\alpha R$ 被短路；從上端到滑臂的有效阻值為 $(1-\alpha)R$。與左上方固定 $R$ 串聯分壓，得 $v_o/v_s=(1-\alpha)R/[R+(1-\alpha)R]=(1-\alpha)/(2-\alpha)$。邊界回代：$\alpha=0$ 得 $1/2$，$\alpha=1$ 得 $0$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-79" type="exercise" title="課本習題 2.79" source="課本 Chapter 2 · Problems 2.79 · 印刷頁 77" topic="實際應用與量測">

![課本 Chapter 2 習題 2.79 原題與電路圖](../assets/images/ch2_problem_2_79.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.79 標準答案原文](../assets/images/ch2_appendix_answer_2_79.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-80" type="exercise" title="課本習題 2.80" source="課本 Chapter 2 · Problems 2.80 · 印刷頁 77" topic="實際應用與量測">

![課本 Chapter 2 習題 2.80 原題與電路圖](../assets/images/ch2_problem_2_80.png)

<template #solution>

**自行推導：** 以放大器輸出電壓不隨負載改變的理想模型，$10\ \Omega$ 喇叭在最大功率 $12\text{ W}$ 時有 $V_{\rm rms}^2=PR=120\text{ V}^2$。改接 $4\ \Omega$ 喇叭，最大功率 $P=V_{\rm rms}^2/R=120/4=30\text{ W}$。回代 $P(4)=120\text{ V}^2$。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-81" type="exercise" title="課本習題 2.81" source="課本 Chapter 2 · Problems 2.81 · 印刷頁 77" topic="實際應用與量測">

![課本 Chapter 2 習題 2.81 原題與電路圖](../assets/images/ch2_problem_2_81.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.81 標準答案原文](../assets/images/ch2_appendix_answer_2_81.png)

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-82" type="exercise" title="課本習題 2.82" source="課本 Chapter 2 · Problems 2.82 · 印刷頁 78" topic="實際應用與量測">

![課本 Chapter 2 習題 2.82 原題與電路圖](../assets/images/ch2_problem_2_82.png)

<template #solution>

**自行推導：** 圖中的矩形外框是電阻陣列外形，端子間只依內部六個電阻連接。以端口加 $1\text{ V}$ 測試源並列各內部節點 KCL，求得：(a) 端子 $1$–$2$，$R_{12}=265/3\approx88.33\ \Omega$；(b) $1$–$3$，$R_{13}=325/3\approx108.33\ \Omega$；(c) $1$–$4$，$R_{14}=100\ \Omega$。對應測試電流依序為 $3/265,3/325,1/100\text{ A}$；各節點回代 KCL 殘差為零。

</template>
</PracticeCard>

<PracticeCard id="ch2-problem-2-83" type="exercise" title="課本習題 2.83" source="課本 Chapter 2 · Problems 2.83 · 印刷頁 78" topic="實際應用與量測">

![課本 Chapter 2 習題 2.83 原題與電路圖](../assets/images/ch2_problem_2_83.png)

<template #solution>

**課本附錄 D 標準答案**（PDF 第 932 頁，Answers to Odd-Numbered Problems）：

![課本附錄 D 習題 2.83 標準答案原文](../assets/images/ch2_appendix_answer_2_83.png)

</template>
</PracticeCard>
