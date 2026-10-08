#  電路學 (Electric Circuit Theory)

歡迎來到**電路學**課程知識庫。本模組以經典教材 Alexander & Sadiku《Fundamentals of Electric Circuits》為基礎，涵蓋電機工程核心之線性電路分析、外端等效化簡、星形-三角形 (Y-Δ) 轉換、節點電壓法之超節點 (Supernode) 技術、相量交流電路與雙埠網路分析。

---

##  課程結構與導航 (Curriculum Overview)

###  [Chapter 1: 基本概念 (Basic Concepts)](#)
*(目前暫無內容)*

###  [Chapter 2: 基本定律 (Basic Laws)](/circuits/chapter2/0001-wye-delta-transformation)
*歐姆定律、節點、支路與迴路、克希荷夫定律、串並聯與 Y-Δ 互換。*
- [0001: 星形 (Y) 與等效三角形 (Δ) 網路互換原理與推導 (Wye-Delta Transformation)](/circuits/chapter2/0001-wye-delta-transformation)

###  [Chapter 3: 分析方法 (Methods of Analysis)](/circuits/chapter3/0001-supernode-analysis)
*節點分析法、網孔分析法與觀察法。*
- [0001: 超節點分析法 (Supernode Analysis) 的原理與實戰破解 (Supernode Analysis)](/circuits/chapter3/0001-supernode-analysis)
- [0002: 網孔分析法 (Mesh Analysis) 與超網孔的原理與實戰破解 (Mesh Analysis)](/circuits/chapter3/0002-mesh-analysis)
- [0003: 觀察法分析 (Nodal and Mesh Analysis by Inspection) 的原理與實戰破解 (Inspection Analysis)](/circuits/chapter3/0003-inspection-analysis)

###  [觀念筆記與定理推導 (Learning Records)](/circuits/learning-records/0001-wye-delta-transformation-principle)
*深入探討開路測試合法性、雙埠阻抗矩陣、高斯面包絡守恆、平面圖論與歐拉公式推導。*
- [0001: 星形與三角形網路等效互換原理與幾何對偶 (Y-Delta Equivalence Principle)](/circuits/learning-records/0001-wye-delta-transformation-principle)
- [0002: 開路測試在三端網路等效推導中的數學與物理合法性 (Open-Circuit Equivalence)](/circuits/learning-records/0002-open-circuit-terminal-equivalence-validity)
- [0003: 超節點分析法的物理包絡原理與拘束方程式架構 (Supernode Envelope Framework)](/circuits/learning-records/0003-supernode-nodal-analysis-principle)
- [0004: 網孔電流法的平面拓撲本質與超網孔迴路獨立性推導 (Mesh & Supermesh Graph Topology)](/circuits/learning-records/0004-mesh-supermesh-principle)

###  [核心公式速查表 (Reference Cheatsheets)](/circuits/reference/001-wye-delta-reference)
*考試、複習與解題必備之高密度速查卡。*
- [001: 星形 (Y) 與三角形 (Δ) 網路等效互換速查手冊 (Wye-Delta Reference)](/circuits/reference/001-wye-delta-reference)
- [002: 超節點分析法 (Supernode Analysis) 核心速查手冊 (Supernode Reference)](/circuits/reference/002-supernode-reference)
- [003: 網孔分析法 (Mesh Analysis) 與超網孔核心速查手冊 (Mesh Reference)](/circuits/reference/003-mesh-reference)
- [004: 觀察法分析 (Inspection Analysis) 核心速查手冊 (Inspection Reference)](/circuits/reference/004-inspection-reference)

### [互動式題庫練習系統 (Interactive Practice Workbooks)](/circuits/practice/0001-chapter1-examples)
*搭載 Hallmark 互動設計、KaTeX 數學公式與詳細圖解之各章題庫與範例練習。*
- [Chapter 1: Basic Concepts 互動題庫](/circuits/practice/0001-chapter1-examples)
- [Chapter 2: Basic Laws 互動題庫](/circuits/practice/0002-chapter2-examples)
- [Chapter 3: Nodal & Mesh Analysis 互動題庫](/circuits/practice/0003-chapter3-examples)
- [Chapter 4: Circuit Theorems 互動題庫](/circuits/practice/0004-chapter4-examples)
- [Chapter 5: Operational Amplifiers 互動題庫](/circuits/practice/0005-chapter5-examples)
- [Chapter 6: Capacitors and Inductors 互動題庫](/circuits/practice/0006-chapter6-examples)

---

##  特色亮點

1. **外端等效性 (Terminal Equivalence) 第一原理**：
   - 從端點開路等效阻抗聯立消去推導出 $R_1 = \frac{R_b R_c}{\Sigma R_\Delta}$ 與 $R_a = \frac{\Sigma R_i R_j}{R_1}$，徹底告別死記硬背。
2. **對稱規律與電導對偶性 (Conductance Duality)**：
   - 對稱三相網路 $R_\Delta = 3 R_\text{Y}$ 之物理成因剖析；電導觀點下 Y-Δ 與阻抗觀點 Δ-Y 之完全對稱形式。
3. **超節點高斯包絡與拘束式 (Supernode & Constraints)**：
   - 封閉面邊界電荷守恆避開電壓源未知電流 $i_v$，搭配電壓拘束式 $v_{\text{pos}} - v_{\text{neg}} = V_s$，維度不變性保證方程組封閉可解。
4. **超網孔大迴路與拓撲歐拉定理 (Supermesh & Graph Topology)**：
   - 歐拉平面公式 $M = B - N + 1$ 證明基本網孔獨立性；繞過共用電流源的大迴路 KVL 結合電流源拘束式，完美消去未知端電壓 $v_s$。
