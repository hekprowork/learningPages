# 0006: 放大器的電路模型 (Circuit Models for Amplifiers)

在電子系統設計中，感興趣的訊號（無論是在系統輸入端、中間級或輸出端）可以是電壓或電流。例如，某些感測器的輸出電阻遠大於放大器的輸入電阻，因此更適合使用電流源來建立模型。同樣地，在某些應用中，放大器的輸出電流比輸出電壓更為重要。

雖然電壓放大器是最常見的，但它只是四種可能放大器類型的其中一種。其餘三種分別為：電流放大器 (Current Amplifier)、轉導放大器 (Transconductance Amplifier) 與轉阻放大器 (Transresistance Amplifier)。

## 1. 四種放大器類型 (The Four Amplifier Types)

這四種放大器類型分別針對不同的輸入與輸出訊號組合而設計。以下為其定義與理想特性參數：

### (1) 電壓放大器 (Voltage Amplifier)
* **輸入 / 輸出訊號**：電壓 / 電壓
* **增益參數**：開路電壓增益 (Open-Circuit Voltage Gain)
  $$A_{vo} = \left. \frac{v_o}{v_i} \right|_{i_o=0} \quad (\text{V/V})$$
* **理想特性**：
  * 輸入電阻 $R_i = \infty$
  * 輸出電阻 $R_o = 0$

### (2) 電流放大器 (Current Amplifier)
* **輸入 / 輸出訊號**：電流 / 電流
* **增益參數**：短路電流增益 (Short-Circuit Current Gain)
  $$A_{is} = \left. \frac{i_o}{i_i} \right|_{v_o=0} \quad (\text{A/A})$$
* **理想特性**：
  * 輸入電阻 $R_i = 0$
  * 輸出電阻 $R_o = \infty$

### (3) 轉導放大器 (Transconductance Amplifier)
* **輸入 / 輸出訊號**：電壓 / 電流
* **增益參數**：短路轉導 (Short-Circuit Transconductance)
  $$G_m = \left. \frac{i_o}{v_i} \right|_{v_o=0} \quad (\text{A/V})$$
* **理想特性**：
  * 輸入電阻 $R_i = \infty$
  * 輸出電阻 $R_o = \infty$

### (4) 轉阻放大器 (Transresistance Amplifier)
* **輸入 / 輸出訊號**：電流 / 電壓
* **增益參數**：開路轉阻 (Open-Circuit Transresistance)
  $$R_m = \left. \frac{v_o}{i_i} \right|_{i_o=0} \quad (\text{V/A})$$
* **理想特性**：
  * 輸入電阻 $R_i = 0$
  * 輸出電阻 $R_o = 0$

---

## 2. 四種放大器模型之間的關係 (Relationships between the Four Amplifier Models)

雖然對於特定的放大器，通常會有一個最合適的模型，但**任何一種模型都能夠用來表示任何一個放大器**。透過電路等效原理，我們可以推導出各種模型參數之間的轉換關係。

例如，將電流放大器的諾頓等效輸出轉換為戴維寧等效輸出，可以得到開路電壓增益 $A_{vo}$ 與短路電流增益 $A_{is}$ 的關係：
$$A_{vo} = A_{is} \left( \frac{R_o}{R_i} \right)$$

同樣地，與轉導放大器、轉阻放大器的參數關係為：
$$A_{vo} = G_m R_o$$
$$A_{vo} = \frac{R_m}{R_i}$$

藉由這組關係式，只要已知其中一個增益參數及 $R_i$ 和 $R_o$，即可求得其他的增益參數。

---

## 3. 決定輸入與輸出電阻 (Determining $R_i$ and $R_o$)

從放大器電路模型中，我們可以透過以下測試方法來決定放大器的輸入電阻 $R_i$ 與輸出電阻 $R_o$：

* **決定輸入電阻 $R_i$**：
  在放大器輸入端施加一測試電壓 $v_i$，並量測（或計算）產生的輸入電流 $i_i$，則：
  $$R_i = \frac{v_i}{i_i}$$

* **決定輸出電阻 $R_o$**：
  輸出電阻可定義為開路輸出電壓除以短路輸出電流。另一種等效的求法是：將輸入訊號源關閉（使 $v_s = 0$ 或 $i_s = 0$），此時輸入端的相依電源將為零。接著在輸出端施加一測試電壓 $v_x$，並測量流入放大器輸出端的電流 $i_x$，則：
  $$R_o = \frac{v_x}{i_x}$$

---

## 4. 單向模型 (Unilateral Models)

上述探討的放大器模型均為**單向模型 (Unilateral Models)**，即訊號僅單向地從輸入端流向輸出端。單向模型假設放大器的輸入電壓與電流，完全不受輸出端連接負載的影響。

然而在實際電路中，這並非總是成立。例如，元件內部的寄生電容（如電晶體的極際電容）可能會造成非預期的耦合，使輸出端的部分訊號回饋到輸入端。當我們在後續章節探討雙埠網路 (two-port networks) 的完整模型，以及電晶體的高頻響應時，將會需要引入考慮非單向特性 (nonunilateral nature) 的電路模型。
