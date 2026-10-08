# 0007: 放大器的頻率響應 (Frequency Response of Amplifiers)

## 放大器頻寬 (Amplifier Bandwidth)

放大器的增益在一個很寬的頻率範圍內（大約在 $\omega_1$ 到 $\omega_2$ 之間）保持幾乎不變。低於 $\omega_1$ 或高於 $\omega_2$ 的信號會經歷較低的增益，且頻率越遠離 $\omega_1$ 和 $\omega_2$，增益下降越多。增益幾乎保持恆定（通常在 3 dB 變化範圍內）的頻率區間稱為**放大器頻寬 (Amplifier Bandwidth)**。通常放大器的設計會使其頻寬與所需放大的信號頻譜相符，否則會導致信號失真。不同頻率分量的信號會被放大不同的倍數。

## 評估放大器的頻率響應 (Evaluating the Frequency Response of Amplifiers)

為了評估放大器的頻率響應，我們必須分析包含所有電抗元件的放大器等效電路模型。在電路分析中，電感 $L$ 的阻抗 (impedance) 為 $j\omega L$，電容 $C$ 的阻抗為 $1/j\omega C$。

放大器的傳遞函數 (Transfer Function) 定義為：

$$ T(\omega) = \frac{V_o(\omega)}{V_i(\omega)} $$

其中 $V_i(\omega)$ 和 $V_o(\omega)$ 分別表示輸入和輸出信號。$T(\omega)$ 是一個複變函數，其大小 $\|T(\omega)\|$ 給出了放大器的大小響應 (Magnitude Response)，而它的相位則給出了相位響應 (Phase Response)。

### 複數頻率變數 $s$ (Complex Frequency Variable $s$)

使用複數頻率變數 $s$ 可以大大簡化電路分析中的代數運算。在此表示法中，電感 $L$ 的阻抗為 $sL$，電容 $C$ 的阻抗為 $1/sC$。將響應元件替換為其阻抗並進行標準電路分析後，傳遞函數可表示為：

$$ T(s) = \frac{V_o(s)}{V_i(s)} $$

隨後，將 $s$ 替換為 $j\omega$ 即可得到物理頻率下的傳遞函數 $T(j\omega)$。注意這與 $T(\omega)$ 是相同的函數，包含 $j$ 只是為了強調它是將 $s$ 替換為 $j\omega$ 得到的。

## 單時間常數網路 (Single-Time-Constant Networks, STC)

單時間常數 (STC) 網路是由一個電抗元件（電感或電容）和一個電阻所組成，或者可簡化為此形式。

- 如果是由電感 $L$ 和電阻 $R$ 組成，時間常數 $\tau = L/R$。
- 如果是由電容 $C$ 和電阻 $R$ 組成，時間常數 $\tau = CR$。

大多數 STC 網路可以分為兩類：**低通 (Low-Pass, LP)** 和 **高通 (High-Pass, HP)** 網路，它們對信號有截然不同的頻率響應。

- **低通濾波器 (Low-Pass Filter)**：讓低頻信號通過且幾乎沒有衰減（在 $\omega = 0$ 時，傳輸率為 1），但會衰減高頻輸入信號。
- **高通濾波器 (High-Pass Filter)**：在極高頻（$\omega = \infty$）處傳輸率為 1，並隨著頻率降低而衰減，在直流（$\omega = 0$）時衰減為 0。

### STC 網路的頻率響應摘要

| 參數 | 低通 (LP) | 高通 (HP) |
| :--- | :--- | :--- |
| **傳遞函數 $T(s)$** | $\frac{K}{1 + (s/\omega_0)}$ | $\frac{Ks}{s + \omega_0}$ |
| **頻率響應 $T(j\omega)$** | $\frac{K}{1 + j(\omega/\omega_0)}$ | $\frac{K}{1 - j(\omega_0/\omega)}$ |
| **大小響應 $\vert T(j\omega)\vert$** | $\frac{\vert K\vert}{\sqrt{1 + (\omega/\omega_0)^2}}$ | $\frac{\vert K\vert}{\sqrt{1 + (\omega_0/\omega)^2}}$ |
| **相位響應 $\angle T(j\omega)$** | $-\tan^{-1}\left(\frac{\omega}{\omega_0}\right)$ | $\tan^{-1}\left(\frac{\omega_0}{\omega}\right)$ |
| **在 $\omega = 0$ 時的傳輸率** | $K$ | $0$ |
| **在 $\omega = \infty$ 時的傳輸率** | $0$ | $K$ |

**3-dB 頻率 (3-dB Frequency) $\omega_0$**：

$$ \omega_0 = \frac{1}{\tau} $$

其中 $\tau$ 是網路的時間常數 ($\tau = CR$ 或 $\tau = L/R$)。$\omega_0$ 也被稱為轉折頻率 (corner frequency)、折角頻率 (break frequency) 或極點頻率 (pole frequency)。

計算時間常數的簡單方法：將獨立電壓或電流源設為零；從電抗元件（電容 $C$ 或電感 $L$）的兩個端點看進去，求出其等效電阻 $R$。時間常數即為 $CR$ 或 $L/R$。
