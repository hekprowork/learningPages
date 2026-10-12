# 2.8 運算放大器的大訊號操作

前一節的頻寬分析仍屬線性模型：輸入正弦波的形狀不會因有限頻寬而改變，只會有幅度衰減與相位延遲。當輸出訊號很大時，真實運算放大器還會遇到三種不能由小訊號頻寬模型描述的限制：輸出電壓飽和、輸出電流極限，以及輸出電壓變化率的壓擺率（slew rate）。這些限制可能使波形削波或產生非線性失真。

## 學習目標

- 由電源電壓與規格判斷輸出電壓是否會飽和，並求最大無失真輸入振幅。
- 將負載電流與回授網路電流相加，檢查運算放大器的最大輸出電流。
- 用壓擺率判斷階躍與正弦波能否追上理想輸出，並求全功率頻寬。
- 分清楚有限頻寬（線性）與壓擺率限制（非線性）對波形的不同影響。

## 2.8.1 輸出電壓飽和

運算放大器的輸出端只能在有限範圍內線性工作。令正、負電源分別為 $+V_{\mathrm{CC}}$ 與 $-V_{\mathrm{EE}}$，輸出線性範圍的兩個極限記為 $L_+$ 與 $L_-$。一般元件的極限略小於電源軌；例如使用 $\pm15\ \mathrm{V}$ 電源時，輸出可能在約 $+13\ \mathrm{V}$ 與 $-13\ \mathrm{V}$ 飽和。達到極限後，理想線性輸出再增加也只會被截在該電位，形成 clipping。

若閉迴路低頻增益為 $G$，輸入為峰值 $V_p$ 的正弦波，避免電壓削波的必要條件是

$$
|G|V_p\le V_{o,\max},
\qquad
V_{o,\max}=\min\left(L_+,|L_-|\right)
$$

（若正、負極限不對稱，應分別檢查兩個半週期）。因此同相放大器的最大無失真輸入峰值可估為 $V_{o,\max}/(1+R_2/R_1)$。低電源電壓系統常選擇輸出可逼近兩個電源軌的 rail-to-rail output 元件，以保留最大的訊號擺幅。

## 2.8.2 輸出電流極限

輸出級能提供或吸收的電流也有額定上限 $I_{o,\max}$。這個電流不只流入外接負載，還必須供應回授電阻網路。因此在最壞情況（通常是輸出峰值）要檢查

$$
|i_o|=|i_L+i_F|\le I_{o,\max}.
$$

以圖 2.43(a) 的同相放大器為例，$R_1=1\ \mathrm{k}\Omega$ 接地、$R_2=9\ \mathrm{k}\Omega$ 回授，故標稱增益為 $1+R_2/R_1=10\ \mathrm{V/V}$。負載為 $R_L$ 時，輸出峰值 $V_{o,p}$ 所需的峰值電流為

$$
i_{L,p}=\frac{V_{o,p}}{R_L},
\qquad
i_{F,p}=\frac{V_{o,p}}{R_1+R_2},
$$

所以

$$
i_{o,p}=V_{o,p}\left(\frac{1}{R_L}+\frac{1}{R_1+R_2}\right).
$$

![同相增益 10、輸出飽和與輸出電流檢核的電路及削波波形](/electronics/assets/images/chapter2/ch2-fig-2-43.svg)

*圖 2.43　(a) 標稱增益 $10\ \mathrm{V/V}$、輸出飽和 $\pm13\ \mathrm{V}$、輸出電流極限 $\pm20\ \mathrm{mA}$ 的同相放大器；(b) 輸入峰值 $1.5\ \mathrm{V}$ 時，理想 $\pm15\ \mathrm{V}$ 輸出被削平在 $\pm13\ \mathrm{V}$。*

### Example 2.8：同時檢查電壓與電流

規格為輸出飽和 $\pm13\ \mathrm{V}$、最大輸出電流 $\pm20\ \mathrm{mA}$，輸入是低頻正弦波。

**(a) $V_p=1\ \mathrm{V}$、$R_L=1\ \mathrm{k}\Omega$。**

理想輸出峰值為

$$
V_{o,p}=10V_p=10\ \mathrm{V}<13\ \mathrm{V}.
$$

電流峰值為

$$
i_{L,p}=\frac{10\ \mathrm{V}}{1\ \mathrm{k}\Omega}=10\ \mathrm{mA},
\qquad
i_{F,p}=\frac{10\ \mathrm{V}}{9\ \mathrm{k}\Omega+1\ \mathrm{k}\Omega}=1\ \mathrm{mA},
$$
$$
i_{o,p}=11\ \mathrm{mA}<20\ \mathrm{mA}.
$$

故輸出是峰值 $10\ \mathrm{V}$ 的無失真正弦波。

**(b) $V_p=1.5\ \mathrm{V}$、$R_L=1\ \mathrm{k}\Omega$。**

理想輸出峰值會是 $15\ \mathrm{V}$，超過 $13\ \mathrm{V}$，故輸出在 $\pm13\ \mathrm{V}$ 削波。削波瞬間的輸出電流為

$$
i_{o,p}=\frac{13\ \mathrm{V}}{1\ \mathrm{k}\Omega}
+\frac{13\ \mathrm{V}}{10\ \mathrm{k}\Omega}
=14.3\ \mathrm{mA}<20\ \mathrm{mA}.
$$

所以此例的主導限制是電壓飽和，不是電流極限。

**(c) $R_L=1\ \mathrm{k}\Omega$ 時的最大無失真輸入。**

電壓限制給出 $V_{p,\max}=13/10=1.3\ \mathrm{V}$；此時 $i_{o,p}=14.3\ \mathrm{mA}$，仍低於額定值，因此

$$
\boxed{V_{p,\max}=1.3\ \mathrm{V}}.
$$

**(d) $V_p=1\ \mathrm{V}$ 時的最小負載電阻。**

輸出需維持 $10\ \mathrm{V}$ 峰值，回授網路先占用 $1\ \mathrm{mA}$，因此負載最多可取 $19\ \mathrm{mA}$。直接由總電流拘束式解 $R_L$：

$$
20\ \mathrm{mA}
=\frac{10\ \mathrm{V}}{R_{L,\min}}
+\frac{10\ \mathrm{V}}{10\ \mathrm{k}\Omega},
$$
$$
R_{L,\min}=\frac{10\ \mathrm{V}}{20\ \mathrm{mA}-1\ \mathrm{mA}}
\simeq526\ \Omega.
$$

::: tip 大訊號設計順序
先由增益得到理想輸出峰值，再分別檢查「輸出電壓不超過 $L_\pm$」與「總輸出電流不超過 $I_{o,\max}$」。只檢查負載電流而漏掉回授電流，會高估可驅動的負載能力。
:::

## 2.8.3 壓擺率（Slew Rate）

壓擺率是輸出電壓可達到的最大瞬時變化率：

$$
\mathrm{SR}=\left|\frac{dv_o}{dt}\right|_{\max},
\tag{2.54}
$$

常用單位為 $\mathrm{V}/\mu\mathrm{s}$。若理想閉迴路響應要求的 $|dv_o/dt|$ 超過 SR，輸出只能以 $\pm\mathrm{SR}$ 的斜率前進，這個狀態稱為 slewing。

![單位增益隨耦器對階躍輸入的壓擺率限制與小訊號指數響應](/electronics/assets/images/chapter2/ch2-fig-2-44.svg)

*圖 2.44　(a) 單位增益隨耦器；(b) 階躍輸入；(c) 觸發壓擺率限制時，輸出先以斜率 SR 線性上升；(d) 輸入夠小時，輸出呈有限頻寬所預測的指數上升。*

### 階躍輸入：線性壓擺與 STC 指數響應

對單位增益隨耦器，若施加幅度為 $V$ 的階躍，理想輸出需要瞬間跳到 $V$；實際上在壓擺率限制下，輸出以斜率 SR 線性上升，至少需

$$
t_{\mathrm{slew}}\simeq\frac{V}{\mathrm{SR}}
$$

才能完成主要電壓變化。這是非線性大訊號效應。

若輸入夠小，使有限頻寬造成的初始斜率不超過 SR，則應使用前一節的 STC 模型。對隨耦器，令 $R_1\to\infty$、$R_2=0$，式（2.53）化為

$$
\frac{V_o(s)}{V_i(s)}=\frac{1}{1+s/\omega_t}.
\tag{2.55}
$$

其時間常數為 $1/\omega_t$，階躍響應為

$$
v_o(t)=V\left(1-e^{-\omega_t t}\right).
\tag{2.56}
$$

初始斜率為 $\omega_tV$，故不觸發壓擺率限制的條件是

$$
\omega_tV\le\mathrm{SR}.
$$

對一階低通，$10\%$–$90\%$ 上升時間為 $t_r\simeq2.2/\omega_t$。若進入壓擺率限制，輸出不再遵循單一指數，實際上升時間應由受限斜率與剩餘線性響應共同決定。

### 有限頻寬與壓擺率的差異

| 特性 | 有限頻寬 | 壓擺率限制 |
| --- | --- | --- |
| 模型 | 線性 STC 低通 | $\vert dv_o/dt\vert\le\mathrm{SR}$ 的非線性限制 |
| 正弦波影響 | 幅度衰減、相位延遲，形狀仍為正弦 | 斜率不足，波峰附近可能呈三角／斜邊波形 |
| 階躍輸出 | 指數上升 | 先以固定最大斜率線性爬升 |
| 是否產生非線性失真 | 不會（在線性工作範圍內） | 會 |

![壓擺率限制造成的輸出正弦波失真](/electronics/assets/images/chapter2/ch2-fig-2-45.svg)

*圖 2.45　黑線為理想理論輸出，藍線為壓擺率不足時的輸出；在零交越附近所需斜率最大，因此波形逐漸偏離理想正弦。*

### Example 2.9：全功率頻寬（full-power bandwidth）

考慮單位增益隨耦器，其滿擺幅輸出為

$$
v_o(t)=V_{o,\max}\sin\omega t.
$$

微分得

$$
\frac{dv_o}{dt}=\omega V_{o,\max}\cos\omega t,
$$

最大斜率出現在正弦波零交越，大小為 $\omega V_{o,\max}$。令此斜率恰等於 SR：

$$
\omega_MV_{o,\max}=\mathrm{SR},
\qquad
\omega_M=\frac{\mathrm{SR}}{V_{o,\max}},
$$
$$
\boxed{f_M=\frac{\mathrm{SR}}{2\pi V_{o,\max}}}.
\tag{2.57}
$$

$f_M$ 稱為全功率頻寬：以額定滿擺幅輸出運作時，頻率不超過此值才不會因壓擺率而失真。若工作頻率為任意 $\omega$，不失真的最大輸出峰值為

$$
V_{o,\max}(\omega)=\frac{\mathrm{SR}}{\omega}
=V_{o,\max}\frac{\omega_M}{\omega}.
\tag{2.58}
$$

### 數值檢核

- 若 $\mathrm{SR}=1\ \mathrm{V}/\mu\mathrm{s}$、$f_t=1\ \mathrm{MHz}$，則 $\omega_t=2\pi\times10^6\ \mathrm{rad/s}$。臨界階躍為
  $$
  V_{\max}=\frac{\mathrm{SR}}{\omega_t}\simeq0.16\ \mathrm{V}.
  $$
  此時 $t_r\simeq0.35\ \mu\mathrm{s}$；若階躍增大十倍，壓擺率主導且上升時間約 $1.28\ \mu\mathrm{s}$。
- 若額定輸出為 $\pm5\ \mathrm{V}$、$\mathrm{SR}=10\ \mathrm{V}/\mu\mathrm{s}$，則
  $$
  f_M=\frac{10\times10^6}{2\pi(5)}\simeq318\ \mathrm{kHz}.
  $$
  若 $f=5f_M$，最大無失真輸出峰值為 $5/5=1\ \mathrm{V}$。

## 常見錯誤與除錯清單

- 只以電源電壓判斷輸出可達範圍；應使用資料表給的 $L_+$、$L_-$ 或額定輸出擺幅。
- 只算 $i_L$ 而忘記回授網路中的 $i_F$；輸出級供應的是兩者的總和。
- 把輸入峰值、輸出峰值與峰對峰值混用；本節的 $V_p$、$V_{o,\max}$ 都是峰值，不是 $V_{pp}$。
- 看到輸出振幅變小就一律稱為飽和；有限頻寬會造成線性衰減，飽和則在極限附近削平波形。
- 以 $V/\mathrm{SR}$ 解讀任何階躍的上升時間；只有在壓擺率主導時才可用，未受限時要使用 $2.2/\omega_t$。
- 對正弦波只檢查峰值電壓，卻不檢查零交越的最大斜率；全功率頻寬由 $\max|dv_o/dt|=\omega V_{o,\max}$ 決定。
- 忽略單位換算：$1\ \mathrm{V}/\mu\mathrm{s}=10^6\ \mathrm{V/s}$。

## 本節摘要

- 輸出電壓必須同時滿足 $L_-\le v_o\le L_+$；超過極限會飽和並削波。Rail-to-rail 輸出元件可讓 $L_\pm$ 更接近電源軌。
- 輸出電流限制需把負載與回授網路電流相加：$|i_o|=|i_L+i_F|\le I_{o,\max}$。
- 壓擺率定義為 $\mathrm{SR}=|dv_o/dt|_{\max}$。階躍輸入在大訊號時產生固定斜率的線性爬升；小訊號時則由有限頻寬產生指數響應。
- 滿擺幅正弦波不失真的最高頻率（全功率頻寬）為 $f_M=\mathrm{SR}/(2\pi V_{o,\max})$；頻率越高，可用的無失真輸出振幅越小。
- 設計大訊號運算放大器時，要依序檢查電壓擺幅、總輸出電流、壓擺率三個獨立拘束，最嚴格者決定可用工作範圍。

可接續閱讀：[2.7 有限開路增益與頻寬](/electronics/chapter2/0007-finite-gain-and-bandwidth)；題目核對可參考[電子學 Chapter 2 題庫](/electronics/practice/0002-chapter2-workbook)。
