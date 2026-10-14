# 0004：漂移、遷移率、電阻與霍爾效應

> 教材 Chapter 3，§3.4（PDF 閱讀頁 121–132）。本節是把濃度轉成可量測電流的核心。

## 1. 隨機熱運動與定向漂移

熱平衡中載子仍快速運動，但方向隨機，平均電流為零。沿 $+x$ 施加電場 $\mathcal E_x>0$，電子受力 $-q\mathcal E_x$，平均漂移往 $-x$；電洞漂移往 $+x$。電子電流方向卻是 $+x$，因其電荷為負。

低電場、散射平均時間為 $\tau$ 時，電子漂移速度

$$v_{n,x}=-\mu_n\mathcal E_x,\qquad
\mu_n=\frac{q\tau}{m_n^*}.$$

電洞的低電場漂移速度 $v_{p,x}=+\mu_p\mathcal E_x$。這裡的 $m_n^*$ 是**導電有效質量**；請勿直接代入[態密度公式](/solid-state/chapter3/0003-carrier-concentrations)所用的質量。

## 2. 電流、導電率與電阻

$$J_{n,x}=(-q)n_0v_{n,x}=qn_0\mu_n\mathcal E_x,\qquad
J_{p,x}=qp_0v_{p,x}=qp_0\mu_p\mathcal E_x.$$

因此低電場漂移導電率、電阻率與均勻長條電阻為

$$\sigma=q(n_0\mu_n+p_0\mu_p),\qquad
\rho=\frac1\sigma,\qquad
R=\rho\frac{L}{A}.$$

單位檢查：$q$ 用 C、$n,p$ 用 $\mathrm{cm}^{-3}$、$\mu$ 用 $\mathrm{cm^2/(V\,s)}$ 時，$\sigma$ 為 $(\Omega\cdot\mathrm{cm})^{-1}$。$L$ 用 cm、$A$ 用 $\mathrm{cm}^2$，$R$ 才是 $\Omega$。

### 數值例題與回代

若 n 型 Si 在 $300\ \mathrm K$ 有 $n_0=10^{16}\ \mathrm{cm}^{-3}$、$\mu_n=1000\ \mathrm{cm^2/(V\,s)}$，且電洞項可忽略，則

$$\sigma=(1.602\times10^{-19})(10^{16})(1000)=1.602\ (\Omega\cdot\mathrm{cm})^{-1},\qquad
\rho=0.624\ \Omega\cdot\mathrm{cm}.$$

若 $L=1\ \mathrm{cm}$、$A=0.01\ \mathrm{cm^2}$，$R=62.4\ \Omega$。回代 $V=1\ \mathrm V$ 時，$I=V/R\approx0.0160\ \mathrm A$；另一方面 $\mathcal E=1\ \mathrm{V/cm}$，$J=\sigma\mathcal E=1.602\ \mathrm{A/cm^2}$，$I=JA=0.0160\ \mathrm A$，兩路相符。

## 3. 散射、溫度與高電場

聲子（晶格振動）、游離雜質和缺陷都能散射載子。聲子散射通常隨溫度升高而增強；摻雜增加時游離雜質散射通常增強。總遷移率常用 Matthiessen 近似 $1/\mu\approx1/\mu_{\rm phonon}+1/\mu_{\rm impurity}$，只作機制近似，非對所有情況精確成立。

強電場時 $v_d$ 不再必然等於 $\mu\mathcal E$。Si 中漂移速度可趨近飽和，故先由題目電場和材料特性判斷能否用歐姆區公式；不可將低場遷移率無限外推。

## 4. 霍爾效應 (Hall effect)

電流與垂直磁場同時存在時，載子受 $q\,\mathbf v\times\mathbf B$ 偏折，兩側累積電荷並形成霍爾電場。單一主要載子、簡單帶模型且忽略霍爾因子修正時，

$$R_H\approx
\begin{cases}
-\dfrac{1}{qn_0},&\text{電子主導},\\
\dfrac{1}{qp_0},&\text{電洞主導}.
\end{cases}$$

霍爾係數符號可判多數載子型別，$|R_H|$ 可估濃度；再配合 $\sigma$ 才可估遷移率。混合載子或多能帶時，不能直接用單一載子公式。

若磁場垂直樣品平面、電流 $I$ 沿平面流、樣品沿磁場方向厚度為 $t$，霍爾電壓的**大小**為 $|V_H|=|R_H|IB/t$。代入時統一使用 SI 單位：$R_H$ 為 $\mathrm{m^3/C}$、$I$ 為 A、$B$ 為 T、$t$ 為 m；電壓正負還取決於量測端子的方向。

::: details 自我檢核：電子往 $-x$ 漂移時，電子造成的傳統電流往哪裡？
電子帶 $-q$，故 $J_n=(-q)nv_n$ 指向 $+x$，與外電場方向一致。
:::
