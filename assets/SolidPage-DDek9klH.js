import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-BjSszV1C.js";var i=e(t(),1);function a(){return`<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .srp-box   { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .srp-bad   { fill: #fff5f5; stroke: #d32f2f; stroke-width: 2; rx: 12; }
        .srp-title { font-weight: 700; font-size: 14px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .srp-method{ font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .srp-divider { stroke: #ccc; stroke-width: 1; }
        .srp-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .srp-good-label { fill: #2e7d32; font-weight: 700; font-size: 12px; font-family: Segoe UI, sans-serif; }
      </style>
    </defs>

    <!-- ❌ BAD: One class doing 3 jobs -->
    <rect x="20" y="20" width="240" height="160" class="srp-bad" />
    <text x="140" y="42" text-anchor="middle" class="srp-title" fill="#d32f2f">❌ SalaryManager (3 jobs)</text>
    <line x1="30" y1="54" x2="250" y2="54" class="srp-divider" />
    <text x="36" y="76" class="srp-method" fill="#d32f2f">+ calculateSalary()</text>
    <text x="36" y="98" class="srp-method" fill="#d32f2f">+ saveSalary()</text>
    <text x="36" y="120" class="srp-method" fill="#d32f2f">+ generateReport()</text>
    <text x="140" y="148" text-anchor="middle" class="srp-label">3 reasons to change!</text>

    <!-- ✅ GOOD: 3 single-responsibility classes -->
    <rect x="320" y="20"  width="170" height="110" class="srp-box" />
    <text x="405" y="42" text-anchor="middle" class="srp-title">SalaryService</text>
    <line x1="330" y1="54" x2="480" y2="54" class="srp-divider" />
    <text x="336" y="76" class="srp-method">+ calculateSalary()</text>
    <text x="405" y="100" text-anchor="middle" class="srp-label">→ 1 job</text>

    <rect x="510" y="20"  width="170" height="110" class="srp-box" />
    <text x="595" y="42" text-anchor="middle" class="srp-title">SalaryRepository</text>
    <line x1="520" y1="54" x2="670" y2="54" class="srp-divider" />
    <text x="526" y="76" class="srp-method">+ saveSalary()</text>
    <text x="595" y="100" text-anchor="middle" class="srp-label">→ 1 job</text>

    <rect x="415" y="160" width="170" height="110" class="srp-box" />
    <text x="500" y="182" text-anchor="middle" class="srp-title">SalaryReport</text>
    <line x1="425" y1="194" x2="575" y2="194" class="srp-divider" />
    <text x="431" y="216" class="srp-method">+ generateReport()</text>
    <text x="500" y="240" text-anchor="middle" class="srp-label">→ 1 job</text>

    <rect x="240" y="310" width="440" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" rx="10" />
    <text x="460" y="334" text-anchor="middle" class="srp-good-label">✅ One class = one responsibility → one reason to change</text>
    <text x="460" y="354" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#2e7d32">Each class does ONE job. Easy to test, maintain, and reuse.</text>
  </svg>`}function o(){return`<svg viewBox="0 0 760 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .ocp-box   { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .ocp-iface { fill: #fff8e1; stroke: #f57c00; stroke-width: 2; rx: 12; }
        .ocp-conc  { fill: #e3f2fd; stroke: #1565c0; stroke-width: 2; rx: 12; }
        .ocp-new   { fill: #e8f5e9; stroke: #2e7d32; stroke-width: 2.5; rx: 12; stroke-dasharray: 4,3; }
        .ocp-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .ocp-iface-title { font-style: italic; fill: #e65100; }
        .ocp-method{ font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .ocp-divider { stroke: #ccc; stroke-width: 1; }
        .ocp-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .ocp-arrow { stroke: #00695c; stroke-width: 2.5; marker-end: url(#arrowOCP); }
        .ocp-arrow-new { stroke: #2e7d32; stroke-width: 2.5; marker-end: url(#arrowOCP); stroke-dasharray: 4,3; }
      </style>
      <marker id="arrowOCP" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
      </marker>
    </defs>

    <!-- Payment interface (abstraction) -->
    <rect x="290" y="20" width="170" height="100" class="ocp-iface" />
    <text x="375" y="44" text-anchor="middle" class="ocp-title ocp-iface-title">«interface» Payment</text>
    <line x1="300" y1="56" x2="450" y2="56" class="ocp-divider" />
    <text x="305" y="80" class="ocp-method" font-style="italic">+ pay()</text>
    <text x="305" y="100" class="ocp-label">⬅ abstraction</text>

    <!-- Existing payment types -->
    <rect x="40"  y="170" width="170" height="80" class="ocp-conc" />
    <text x="125" y="192" text-anchor="middle" class="ocp-title">PaypalPayment</text>
    <line x1="50" y1="204" x2="200" y2="204" class="ocp-divider" />
    <text x="60" y="226" class="ocp-method">+ pay() → "PayPal"</text>

    <rect x="290" y="170" width="170" height="80" class="ocp-conc" />
    <text x="375" y="192" text-anchor="middle" class="ocp-title">UPIPayment</text>
    <line x1="300" y1="204" x2="450" y2="204" class="ocp-divider" />
    <text x="310" y="226" class="ocp-method">+ pay() → "UPI"</text>

    <rect x="540" y="170" width="170" height="80" class="ocp-conc" />
    <text x="625" y="192" text-anchor="middle" class="ocp-title">CreditCardPayment</text>
    <line x1="550" y1="204" x2="700" y2="204" class="ocp-divider" />
    <text x="560" y="226" class="ocp-method">+ pay() → "Credit Card"</text>

    <!-- NEW payment (added without modifying existing) -->
    <rect x="290" y="290" width="170" height="80" class="ocp-new" />
    <text x="375" y="312" text-anchor="middle" class="ocp-title" fill="#2e7d32">CryptoPayment (NEW)</text>
    <line x1="300" y1="324" x2="450" y2="324" class="ocp-divider" />
    <text x="310" y="346" class="ocp-method">+ pay() → "Crypto"</text>

    <!-- Arrows: existing classes implement Payment -->
    <line x1="125" y1="170" x2="320" y2="120" class="ocp-arrow" />
    <line x1="375" y1="170" x2="375" y2="120" class="ocp-arrow" />
    <line x1="625" y1="170" x2="430" y2="120" class="ocp-arrow" />
    <text x="190" y="148" class="ocp-label" fill="#00695c">implements</text>
    <text x="385" y="148" class="ocp-label" fill="#00695c">implements</text>
    <text x="560" y="148" class="ocp-label" fill="#00695c">implements</text>

    <!-- Arrow: NEW class also implements Payment (no modification of existing) -->
    <line x1="375" y1="290" x2="375" y2="120" class="ocp-arrow-new" />
    <text x="385" y="270" class="ocp-label" fill="#2e7d32">implements (new)</text>

    <rect x="60" y="380" width="640" height="24" fill="#e8f5e9" />
    <text x="380" y="398" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">
      ✅ Add CryptoPayment → no existing class modified (open for extension, closed for modification)
    </text>
  </svg>`}function s(){return`<svg viewBox="0 0 760 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .lsp-iface  { fill: #fff8e1; stroke: #f57c00; stroke-width: 2; rx: 12; }
        .lsp-box    { fill: #e3f2fd; stroke: #1565c0; stroke-width: 2; rx: 12; }
        .lsp-title  { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .lsp-iface-title { font-style: italic; fill: #e65100; }
        .lsp-method { font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .lsp-divider{ stroke: #ccc; stroke-width: 1; }
        .lsp-arrow  { stroke: #00695c; stroke-width: 2.5; marker-end: url(#arrowLSP); fill: none; }
        .lsp-label  { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .lsp-good   { font-weight: 700; font-size: 12px; font-family: Segoe UI, sans-serif; }
      </style>
      <marker id="arrowLSP" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
      </marker>
    </defs>

    <!-- Parent: Payment interface -->
    <rect x="290" y="20" width="180" height="90" class="lsp-iface" />
    <text x="380" y="44" text-anchor="middle" class="lsp-title lsp-iface-title">«interface» Payment</text>
    <line x1="300" y1="56" x2="460" y2="56" class="lsp-divider" />
    <text x="305" y="78" class="lsp-method" font-style="italic">+ pay()</text>
    <text x="305" y="96" class="lsp-label">parent contract</text>

    <!-- Child: PaypalPayment -->
    <rect x="40" y="170" width="200" height="100" class="lsp-box" />
    <text x="140" y="192" text-anchor="middle" class="lsp-title">PaypalPayment</text>
    <line x1="50" y1="204" x2="230" y2="204" class="lsp-divider" />
    <text x="60" y="226" class="lsp-method">public void pay() {</text>
    <text x="60" y="244" class="lsp-method">  println("PayPal");</text>
    <text x="60" y="262" class="lsp-method">}</text>

    <!-- Child: UPIPayment -->
    <rect x="280" y="170" width="200" height="100" class="lsp-box" />
    <text x="380" y="192" text-anchor="middle" class="lsp-title">UPIPayment</text>
    <line x1="290" y1="204" x2="470" y2="204" class="lsp-divider" />
    <text x="300" y="226" class="lsp-method">public void pay() {</text>
    <text x="300" y="244" class="lsp-method">  println("UPI");</text>
    <text x="300" y="262" class="lsp-method">}</text>

    <!-- Child: CreditCardPayment -->
    <rect x="520" y="170" width="200" height="100" class="lsp-box" />
    <text x="620" y="192" text-anchor="middle" class="lsp-title">CreditCardPayment</text>
    <line x1="530" y1="204" x2="710" y2="204" class="lsp-divider" />
    <text x="540" y="226" class="lsp-method">public void pay() {</text>
    <text x="540" y="244" class="lsp-method">  println("Credit Card");</text>
    <text x="540" y="262" class="lsp-method">}</text>

    <!-- Inheritance arrows -->
    <line x1="140" y1="170" x2="335" y2="110" class="lsp-arrow" />
    <line x1="380" y1="170" x2="380" y2="110" class="lsp-arrow" />
    <line x1="620" y1="170" x2="425" y2="110" class="lsp-arrow" />
    <text x="200" y="148" class="lsp-label" fill="#00695c">implements</text>
    <text x="540" y="148" class="lsp-label" fill="#00695c">implements</text>

    <!-- Substitutability demo -->
    <rect x="40" y="295" width="680" height="95" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="1.5" rx="10" />
    <text x="60" y="320" font-size="12" font-weight="700" fill="#6a1b9a" font-family="Segoe UI,sans-serif">
      Payment payment;     ← same parent type, different children
    </text>
    <text x="60" y="345" font-size="11" font-family="monospace" fill="#1a1a2e">
      payment = new PaypalPayment();      payment.pay();   // ✓
    </text>
    <text x="60" y="364" font-size="11" font-family="monospace" fill="#1a1a2e">
      payment = new UPIPayment();         payment.pay();   // ✓
    </text>
    <text x="60" y="383" font-size="11" font-family="monospace" fill="#1a1a2e">
      payment = new CreditCardPayment();  payment.pay();   // ✓
    </text>

    <text x="380" y="406" text-anchor="middle" class="lsp-good" fill="#2e7d32">
      ✅ Any child can substitute the parent — no broken behavior
    </text>
  </svg>`}function c(){return`<svg viewBox="0 0 800 430" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .isp-fat   { fill: #fff3e0; stroke: #e65100; stroke-width: 2; rx: 12; }
        .isp-slim  { fill: #e8f5e9; stroke: #2e7d32; stroke-width: 2; rx: 12; }
        .isp-cust  { fill: #e3f2fd; stroke: #1565c0; stroke-width: 2; rx: 12; }
        .isp-admin { fill: #f3e5f5; stroke: #6a1b9a; stroke-width: 2; rx: 12; }
        .isp-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .isp-iface { font-style: italic; fill: #e65100; }
        .isp-method{ font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .isp-divider { stroke: #ccc; stroke-width: 1; }
        .isp-arrow { stroke: #e94560; stroke-width: 2; marker-end: url(#arrowISP); fill: none; }
        .isp-arrow-ok { stroke: #2e7d32; stroke-width: 2; marker-end: url(#arrowISPok); fill: none; }
        .isp-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .isp-good-label { fill: #2e7d32; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
      </style>
      <marker id="arrowISP" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#e94560" />
      </marker>
      <marker id="arrowISPok" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#2e7d32" />
      </marker>
    </defs>

    <!-- ❌ BAD: One fat interface (what we DON'T want) -->
    <rect x="20" y="20" width="200" height="170" class="isp-fat" />
    <text x="120" y="42" text-anchor="middle" class="isp-title isp-iface">❌ LoanAllInOne (Fat)</text>
    <line x1="30" y1="56" x2="210" y2="56" class="isp-divider" />
    <text x="40" y="78"  class="isp-method" font-style="italic">+ applyLoan()</text>
    <text x="40" y="100" class="isp-method" font-style="italic">+ checkLoanStatus()</text>
    <text x="40" y="122" class="isp-method" font-style="italic">+ cancelLoan()</text>
    <text x="40" y="144" class="isp-method" font-style="italic">+ repayLoan()</text>
    <text x="40" y="166" class="isp-method" font-style="italic">+ forecloseLoan()</text>
    <text x="120" y="186" text-anchor="middle" class="isp-label">5 methods in one</text>

    <!-- ✅ GOOD: 3 slim interfaces -->
    <rect x="270" y="20"  width="160" height="70" class="isp-slim" />
    <text x="350" y="42" text-anchor="middle" class="isp-title isp-iface" fill="#2e7d32">ApplyLoan</text>
    <line x1="280" y1="54" x2="420" y2="54" class="isp-divider" />
    <text x="285" y="76" class="isp-method" font-style="italic">+ applyLoan()</text>

    <rect x="450" y="20"  width="160" height="70" class="isp-slim" />
    <text x="530" y="42" text-anchor="middle" class="isp-title isp-iface" fill="#2e7d32">CheckLoanStatus</text>
    <line x1="460" y1="54" x2="600" y2="54" class="isp-divider" />
    <text x="465" y="76" class="isp-method" font-style="italic">+ checkLoanStatus()</text>

    <rect x="630" y="20"  width="160" height="70" class="isp-slim" />
    <text x="710" y="42" text-anchor="middle" class="isp-title isp-iface" fill="#2e7d32">CancelLoan</text>
    <line x1="640" y1="54" x2="780" y2="54" class="isp-divider" />
    <text x="645" y="76" class="isp-method" font-style="italic">+ cancelLoan()</text>

    <!-- ❌ Customer forced to implement fat interface -->
    <rect x="40" y="220" width="180" height="80" class="isp-cust" />
    <text x="130" y="242" text-anchor="middle" class="isp-title">Customer</text>
    <line x1="50" y1="254" x2="210" y2="254" class="isp-divider" />
    <text x="60" y="274" class="isp-method" fill="#d32f2f" font-size="10">cancelLoan() {}  // empty!</text>
    <text x="60" y="290" class="isp-method" fill="#d32f2f" font-size="10">repayLoan() {}   // empty!</text>
    <line x1="120" y1="190" x2="120" y2="220" class="isp-arrow" />

    <!-- ❌ Admin also forced -->
    <rect x="240" y="220" width="180" height="80" class="isp-cust" style="stroke:#6a1b9a;" />
    <text x="330" y="242" text-anchor="middle" class="isp-title" fill="#6a1b9a">Admin</text>
    <line x1="250" y1="254" x2="410" y2="254" class="isp-divider" />
    <text x="260" y="274" class="isp-method" fill="#d32f2f" font-size="10">forecloseLoan(){}  // empty!</text>
    <line x1="330" y1="190" x2="330" y2="220" class="isp-arrow" />

    <!-- ✅ Customer with slim interfaces (no empty methods) -->
    <rect x="450" y="220" width="160" height="80" class="isp-slim" style="fill:#e3f2fd;stroke:#1565c0;" />
    <text x="530" y="242" text-anchor="middle" class="isp-title">Customer</text>
    <line x1="460" y1="254" x2="600" y2="254" class="isp-divider" />
    <text x="465" y="274" class="isp-method">applyLoan()</text>
    <text x="465" y="290" class="isp-method">checkLoanStatus()</text>
    <line x1="350" y1="90" x2="510" y2="220" class="isp-arrow-ok" />
    <line x1="530" y1="90" x2="545" y2="220" class="isp-arrow-ok" />

    <!-- ✅ Admin with all 3 slim interfaces -->
    <rect x="630" y="220" width="160" height="80" class="isp-slim" style="fill:#f3e5f5;stroke:#6a1b9a;" />
    <text x="710" y="242" text-anchor="middle" class="isp-title" fill="#6a1b9a">Admin</text>
    <line x1="640" y1="254" x2="780" y2="254" class="isp-divider" />
    <text x="645" y="274" class="isp-method">applyLoan()</text>
    <text x="645" y="290" class="isp-method">checkLoanStatus()</text>
    <text x="710" y="306" text-anchor="middle" class="isp-method">+ cancelLoan()</text>
    <line x1="350" y1="90" x2="530" y2="220" class="isp-arrow-ok" />
    <line x1="530" y1="90" x2="565" y2="220" class="isp-arrow-ok" />
    <line x1="710" y1="90" x2="710" y2="220" class="isp-arrow-ok" />

    <rect x="20" y="330" width="770" height="80" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" rx="10" />
    <text x="405" y="356" text-anchor="middle" font-size="13" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">
      ✅ Slim, role-based interfaces — no empty method implementations
    </text>
    <text x="405" y="378" text-anchor="middle" font-size="12" fill="#2e7d32" font-family="Segoe UI,sans-serif">
      Customer implements only what it needs (apply + check). Admin gets all 3 powers.
    </text>
    <text x="405" y="400" text-anchor="middle" font-size="11" fill="#d32f2f" font-family="Segoe UI,sans-serif">
      ❌ With the fat LoanAllInOne, both were forced to write empty methods.
    </text>
  </svg>`}function l(){return`<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .dip-high     { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .dip-abstr    { fill: #fff8e1; stroke: #f57c00; stroke-width: 2.5; rx: 12; }
        .dip-low      { fill: #e3f2fd; stroke: #1565c0; stroke-width: 2; rx: 12; }
        .dip-bad      { fill: #fff5f5; stroke: #d32f2f; stroke-width: 2; rx: 12; }
        .dip-title    { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .dip-iface    { font-style: italic; fill: #e65100; }
        .dip-method   { font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .dip-divider  { stroke: #ccc; stroke-width: 1; }
        .dip-label    { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .dip-good     { fill: #2e7d32; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .dip-arrow    { stroke: #00695c; stroke-width: 2.5; fill: none; marker-end: url(#arrowDIP); }
        .dip-arrow-bad{ stroke: #d32f2f; stroke-width: 2.5; fill: none; marker-end: url(#arrowDIPbad); stroke-dasharray: 5,3; }
        .dip-arrow-ok { stroke: #2e7d32; stroke-width: 2.5; fill: none; marker-end: url(#arrowDIPok); }
      </style>
      <marker id="arrowDIP" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
      </marker>
      <marker id="arrowDIPbad" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#d32f2f" />
      </marker>
      <marker id="arrowDIPok" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#2e7d32" />
      </marker>
    </defs>

    <!-- High-level service (top) -->
    <rect x="290" y="20" width="180" height="100" class="dip-high" />
    <text x="380" y="44" text-anchor="middle" class="dip-title">PaymentService (High-level)</text>
    <line x1="300" y1="56" x2="460" y2="56" class="dip-divider" />
    <text x="305" y="76" class="dip-method">private final Payment payment;</text>
    <text x="305" y="96" class="dip-method">PaymentService(Payment p) { this.payment = p; }</text>
    <text x="305" y="114" class="dip-method">public void makePayment() { payment.pay(); }</text>

    <!-- Abstraction (middle) -->
    <rect x="290" y="170" width="180" height="80" class="dip-abstr" />
    <text x="380" y="194" text-anchor="middle" class="dip-title dip-iface">«interface» Payment</text>
    <line x1="300" y1="206" x2="460" y2="206" class="dip-divider" />
    <text x="305" y="226" class="dip-method" font-style="italic">+ pay()</text>
    <text x="305" y="242" class="dip-good">⬅ ABSTRACTION</text>

    <!-- Low-level implementations (bottom) -->
    <rect x="120" y="300" width="180" height="80" class="dip-low" />
    <text x="210" y="322" text-anchor="middle" class="dip-title">PaypalPayment</text>
    <line x1="130" y1="334" x2="290" y2="334" class="dip-divider" />
    <text x="140" y="356" class="dip-method">public void pay() {</text>
    <text x="140" y="372" class="dip-method">  println("PayPal");</text>

    <rect x="320" y="300" width="180" height="80" class="dip-low" />
    <text x="410" y="322" text-anchor="middle" class="dip-title">UPIPayment</text>
    <line x1="330" y1="334" x2="490" y2="334" class="dip-divider" />
    <text x="340" y="356" class="dip-method">public void pay() {</text>
    <text x="340" y="372" class="dip-method">  println("UPI");</text>

    <rect x="520" y="300" width="180" height="80" class="dip-low" />
    <text x="610" y="322" text-anchor="middle" class="dip-title">CryptoPayment</text>
    <line x1="530" y1="334" x2="690" y2="334" class="dip-divider" />
    <text x="540" y="356" class="dip-method">public void pay() {</text>
    <text x="540" y="372" class="dip-method">  println("Crypto");</text>

    <!-- ❌ Bad: high-level depends on low-level DIRECTLY (dashed red) -->
    <line x1="380" y1="120" x2="210" y2="300" class="dip-arrow-bad" />
    <text x="195" y="220" class="dip-label" fill="#d32f2f">❌ direct = new PayPalPayment()</text>

    <!-- ✅ Good: high-level depends on abstraction -->
    <line x1="380" y1="120" x2="380" y2="170" class="dip-arrow-ok" />
    <text x="385" y="150" class="dip-good">depends on</text>

    <!-- Low-levels implement abstraction -->
    <line x1="210" y1="300" x2="335" y2="250" class="dip-arrow" />
    <line x1="410" y1="300" x2="380" y2="250" class="dip-arrow" />
    <line x1="610" y1="300" x2="425" y2="250" class="dip-arrow" />
    <text x="240" y="280" class="dip-good">implements</text>
    <text x="430" y="280" class="dip-good">implements</text>
    <text x="600" y="280" class="dip-good">implements</text>

    <rect x="20" y="395" width="720" height="22" fill="#e8f5e9" />
    <text x="380" y="412" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">
      ✅ High-level depends on abstraction (Payment), NOT on concrete PayPal/UPI/Crypto — inject via constructor.
    </text>
  </svg>`}var u=[{id:`srp`,icon:`fa-gem`,title:`S — Single Responsibility (SRP)`,sub:`One reason to change`,desc:`A class should have only one reason to change, i.e., only one responsibility.`,definition:`SRP states that a class should have only one reason to change — one responsibility. High cohesion within a module and loose coupling between modules. Split large classes into focused, single-purpose ones.`,videoLink:`https://www.youtube.com/watch?v=EMbCnn01rxc`,code:`// ===== SINGLE RESPONSIBILITY PRINCIPLE (SRP) =====
// One class → ONE responsibility (one reason to change).
//
// Salary domain — split into 3 SEPARATE classes (one file each):
//
//   SalaryService.java     → calculate salary (business logic)
//   SalaryRepository.java  → save salary to DB  (persistence)
//   SalaryReport.java      → generate payslip   (reporting)
//
// Each class has exactly ONE reason to change.

// ---------- File 1: SalaryService.java ----------
public class SalaryService {
    public void calculateSalary() {
        System.out.println("SalaryService  → Calculate the employee salary");
    }
}

// ---------- File 2: SalaryRepository.java ----------
public class SalaryRepository {
    public void saveSalary() {
        System.out.println("SalaryRepository → Save the salary record to DB");
    }
}

// ---------- File 3: SalaryReport.java ----------
public class SalaryReport {
    public void generateReport() {
        System.out.println("SalaryReport    → Generate the monthly payslip");
    }
}

// ---------- File 4: Main.java ----------
public class Main {
    public static void main(String[] args) {

        // Each class handles its OWN responsibility
        SalaryService    salaryService = new SalaryService();
        SalaryRepository repository    = new SalaryRepository();
        SalaryReport     report        = new SalaryReport();

        salaryService.calculateSalary();   // job 1 — calculation
        repository.saveSalary();           // job 2 — persistence
        report.generateReport();           // job 3 — reporting
    }
}`,diagram:a,relation:`🎯 One class = one job → one reason to change`,points:[`One class → one responsibility`,`3 separate files, 3 separate jobs`,`Change payslip format? → only SalaryReport changes`,`Change DB? → only SalaryRepository changes`]},{id:`ocp`,icon:`fa-lock-open`,title:`O — Open/Closed (OCP)`,sub:`Open for extension, closed for modification`,desc:`Software entities should be open for extension but closed for modification.`,definition:`Classes should be open for extension (you can add new behavior) but closed for modification (you don't change existing code). Achieve this with abstractions and dependency injection.`,videoLink:`https://www.youtube.com/watch?v=j1ZxAKLonl4`,code:`// ===== OPEN/CLOSED PRINCIPLE (OCP) =====
// Open for EXTENSION (add new payment type)
// Closed for MODIFICATION (don't touch existing code)
//
// Payment domain — each type lives in its OWN file:
//
//   Payment.java            → the abstraction (interface)
//   PaypalPayment.java      → PayPal implementation
//   UPIPayment.java         → UPI implementation
//   CreditCardPayment.java  → Card implementation
//   Main.java               → runs the demo
//
// To add a NEW payment method (e.g. Crypto) you only ADD a
// new file — no existing file is ever modified.

// ---------- File 1: Payment.java ----------
public interface Payment {
    void pay();
}

// ---------- File 2: PaypalPayment.java ----------
public class PaypalPayment implements Payment {
    public void pay() {
        System.out.println("Payment using PayPal");
    }
}

// ---------- File 3: UPIPayment.java ----------
public class UPIPayment implements Payment {
    public void pay() {
        System.out.println("Payment using UPI");
    }
}

// ---------- File 4: CreditCardPayment.java ----------
public class CreditCardPayment implements Payment {
    public void pay() {
        System.out.println("Payment using Credit Card");
    }
}

// ---------- File 5 (NEW later): CryptoPayment.java ----------
// Added LATER without touching any existing file → that is OCP.
// public class CryptoPayment implements Payment {
//     public void pay() {
//         System.out.println("Payment using Crypto");
//     }
// }

// ---------- File 6: Main.java ----------
public class Main {
    public static void main(String[] args) {

        // Same reference type (Payment), different implementations
        Payment payment1 = new PaypalPayment();
        payment1.pay();                       // → PayPal

        Payment payment2 = new UPIPayment();
        payment2.pay();                       // → UPI

        Payment payment3 = new CreditCardPayment();
        payment3.pay();                       // → Credit Card

        // New payment method? → just add a new file/class.
        // No existing code (PaypalPayment, UPIPayment...) is modified.
    }
}`,diagram:o,relation:`🔓 Extend behavior via new classes/interfaces — don't edit existing code`,points:[`Abstraction over implementation`,`Strategy pattern fits OCP`,`Add new behavior without modifying`,`Dependency injection for flexibility`]},{id:`lsp`,icon:`fa-object-extend`,title:`L — Liskov Substitution (LSP)`,sub:`Subtypes must be substitutable`,desc:`Objects of a superclass should be replaceable with objects of its subclasses without breaking.`,definition:`LSP: if S is a subtype of T, objects of T may be replaced with objects of type S without altering desirable properties of the program. In practice, subclasses must honor the contract/promises of their parent.`,videoLink:`https://www.youtube.com/watch?v=irHHnn7CZAA`,code:`// ===== LISKOV SUBSTITUTION PRINCIPLE (LSP) =====
// Any child implementation must be replaceable with the parent
// type WITHOUT breaking the program.
//
// Payment domain — each class in its OWN file:
//
//   Payment.java            → the abstraction (interface)
//   PaypalPayment.java      → PayPal implementation
//   UPIPayment.java         → UPI implementation
//   CreditCardPayment.java  → Card implementation
//   Main.java               → runs the demo
//
// The SAME parent reference (Payment) can be swapped between
// PayPal, UPI, Credit Card — the program still works 100%.

// ---------- File 1: Payment.java ----------
public interface Payment {
    void pay();
}

// ---------- File 2: PaypalPayment.java ----------
public class PaypalPayment implements Payment {
    public void pay() {
        System.out.println("Payment using PayPal");
    }
}

// ---------- File 3: UPIPayment.java ----------
public class UPIPayment implements Payment {
    public void pay() {
        System.out.println("Payment using UPI");
    }
}

// ---------- File 4: CreditCardPayment.java ----------
public class CreditCardPayment implements Payment {
    public void pay() {
        System.out.println("Payment using Credit Card");
    }
}

// ---------- File 5: Main.java ----------
public class Main {
    public static void main(String[] args) {

        // ONE parent reference (Payment) holds DIFFERENT children.
        // This is substitutability — the LSP contract.
        Payment payment;

        payment = new PaypalPayment();
        payment.pay();     // works for PayPal

        payment = new UPIPayment();
        payment.pay();     // works for UPI

        payment = new CreditCardPayment();
        payment.pay();     // works for Credit Card

        // Every child can replace the parent type — nothing breaks.
    }
}`,diagram:s,relation:`↪️ Subtypes must honor the parent's contract — substitutability`,points:[`Subclasses must preserve invariants`,`Any child can replace the parent safely`,`Same reference, different behavior`,`Behavior preserved → no broken program`]},{id:`isp`,icon:`fa-plug`,title:`I — Interface Segregation (ISP)`,sub:`Many slim clients over one fat interface`,desc:`Clients should not be forced to depend on interfaces they don't use.`,definition:`ISP: many client-specific interfaces are better than one general-purpose "fat" interface. Each interface should have only the methods a particular client cares about.`,videoLink:`https://www.youtube.com/watch?v=4ZdsinALUX8`,code:`// ===== INTERFACE SEGREGATION PRINCIPLE (ISP) =====
// Don't force a class to implement methods it doesn't need.
// Use small, role-based interfaces instead of one "fat" interface.
//
// Loan domain — split into small interfaces, one file each:
//
//   ApplyLoan.java        → who can APPLY for a loan
//   CheckLoanStatus.java  → who can CHECK loan status
//   CancelLoan.java       → who can CANCEL a loan
//   Customer.java         → needs only ApplyLoan + CheckLoanStatus
//   Admin.java            → needs all three
//   Main.java             → runs the demo
//
// Customer is never forced to implement cancelLoan() it doesn't need.

// ---------- File 1: ApplyLoan.java ----------
public interface ApplyLoan {
    void applyLoan();
}

// ---------- File 2: CheckLoanStatus.java ----------
public interface CheckLoanStatus {
    void checkLoanStatus();
}

// ---------- File 3: CancelLoan.java ----------
public interface CancelLoan {
    void cancelLoan();
}

// ---------- File 4: Customer.java ----------
// Customer applies for loan and checks status — but cannot cancel.
public class Customer implements ApplyLoan, CheckLoanStatus {

    public void applyLoan() {
        System.out.println("Customer applied for loan");
    }

    public void checkLoanStatus() {
        System.out.println("Checking loan status");
    }
}

// ---------- File 5: Admin.java ----------
// Admin has all 3 powers including cancelling the loan.
public class Admin implements ApplyLoan, CheckLoanStatus, CancelLoan {

    public void applyLoan() {
        System.out.println("Admin applied loan");
    }

    public void checkLoanStatus() {
        System.out.println("Admin checking loan status");
    }

    public void cancelLoan() {
        System.out.println("Admin cancelled loan");
    }
}

// ---------- File 6: Main.java ----------
public class Main {
    public static void main(String[] args) {

        Customer customer = new Customer();
        customer.applyLoan();          // → Customer applied for loan
        customer.checkLoanStatus();    // → Checking loan status

        Admin admin = new Admin();
        admin.applyLoan();             // → Admin applied loan
        admin.checkLoanStatus();       // → Admin checking loan status
        admin.cancelLoan();            // → Admin cancelled loan
    }
}`,diagram:c,relation:`✂️ Slim interfaces — clients implement only what they need`,points:[`No empty method implementations`,`Role-based interfaces`,`Reduce coupling between modules`,`Single-responsibility for interfaces too`]},{id:`dip`,icon:`fa-plug-circle-plus`,title:`D — Dependency Inversion (DIP)`,sub:`Depend on abstractions, not concretions`,desc:`High-level modules should not depend on low-level modules. Both should depend on abstractions.`,definition:`DIP: depend on abstractions (interfaces/abstract classes), not concrete implementations. Inject the concrete dependency from outside (constructor/ method injection).`,videoLink:`https://www.youtube.com/watch?v=XDRSpWS8urM`,code:`// ===== DEPENDENCY INVERSION PRINCIPLE (DIP) =====
// High-level modules must NOT depend on low-level modules.
// Both must depend on an ABSTRACTION (interface).
//
// Payment domain — one file per class:
//
//   Payment.java           → the abstraction (interface)
//   PaypalPayment.java     → low-level PayPal implementation
//   UPIPayment.java        → low-level UPI implementation
//   PaymentService.java    → high-level service (depends on Payment only)
//   Main.java              → injects implementations & runs the demo
//
// PaymentService never knows WHICH payment it uses — the concrete
// implementation is INJECTED from outside via the constructor.

// ---------- File 1: Payment.java ----------
public interface Payment {
    void pay();
}

// ---------- File 2: PaypalPayment.java ----------
public class PaypalPayment implements Payment {
    public void pay() {
        System.out.println("Payment using PayPal");
    }
}

// ---------- File 3: UPIPayment.java ----------
public class UPIPayment implements Payment {
    public void pay() {
        System.out.println("Payment using UPI");
    }
}

// ---------- File 4: PaymentService.java ----------
// High-level service depends on the interface, NOT on concrete classes.
public class PaymentService {

    private final Payment payment;   // ← abstraction

    // Constructor injection: concrete impl comes from outside
    public PaymentService(Payment payment) {
        this.payment = payment;
    }

    public void makePayment() {
        payment.pay();   // delegate to the injected implementation
    }
}

// ---------- File 5: Main.java ----------
public class Main {
    public static void main(String[] args) {

        // Inject PayPal
        Payment paypal = new PaypalPayment();
        PaymentService service1 = new PaymentService(paypal);
        service1.makePayment();        // → Payment using PayPal

        // Inject UPI — same PaymentService, different behavior
        Payment upi = new UPIPayment();
        PaymentService service2 = new PaymentService(upi);
        service2.makePayment();        // → Payment using UPI
    }
}`,diagram:l,relation:`🔄 High-level ↔ Abstraction ← Low-level (inject the impl)`,points:[`Depend on abstractions, not concretions`,`Constructor / setter / method injection`,`Enables testability (easily mocked)`,`Swappable implementations`]}],d=n();function f({topic:e,isActive:t,onClick:n}){return(0,d.jsxs)(`div`,{className:`oops-topic-card ${t?`active`:``}`,onClick:()=>n(e.id),children:[(0,d.jsx)(`div`,{className:`oops-card-icon`,children:(0,d.jsx)(`i`,{className:`fas ${e.icon}`})}),(0,d.jsx)(`h3`,{children:e.title}),(0,d.jsx)(`span`,{className:`oops-card-sub`,children:e.sub}),(0,d.jsx)(`p`,{children:e.desc}),(0,d.jsxs)(`a`,{className:`oops-video-link`,href:e.videoLink,onClick:e=>e.stopPropagation(),title:`Watch video`,children:[(0,d.jsx)(`i`,{className:`fas fa-play-circle`}),` Video`]}),(0,d.jsxs)(`span`,{className:`oops-card-tag`,children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Java + UML`]}),t&&(0,d.jsx)(`span`,{className:`oops-active-indicator`,children:(0,d.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function p({topic:e,onClose:t}){if(!e)return null;let n=e.diagram();return(0,d.jsx)(`div`,{className:`oops-modal-backdrop`,onClick:t,children:(0,d.jsxs)(`div`,{className:`oops-detail-panel modal-visible`,onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(`div`,{className:`oops-detail-header`,children:[(0,d.jsxs)(`h2`,{children:[(0,d.jsx)(`i`,{className:`fas ${e.icon}`}),(0,d.jsx)(`span`,{className:`oops-title-text`,children:e.title}),(0,d.jsxs)(`span`,{className:`oops-detail-sub`,children:[`— `,e.sub]})]}),(0,d.jsx)(`button`,{className:`oops-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,d.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,d.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,d.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,d.jsxs)(`div`,{className:`oops-modal-scroll-content`,children:[(0,d.jsxs)(`div`,{className:`oops-definition-box`,children:[(0,d.jsx)(`strong`,{children:`📘 Definition: `}),e.definition]}),(0,d.jsxs)(`div`,{className:`oops-detail-grid`,children:[(0,d.jsx)(`div`,{children:(0,d.jsxs)(`div`,{className:`oops-code-section`,children:[(0,d.jsxs)(`div`,{className:`oops-code-header`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java Code`]}),(0,d.jsx)(`span`,{className:`oops-lang-badge`,children:`Java 17+`})]}),(0,d.jsx)(`pre`,{children:e.code})]})}),(0,d.jsxs)(`div`,{className:`oops-diagram-section`,children:[(0,d.jsxs)(`div`,{className:`oops-diagram-title`,children:[(0,d.jsx)(`i`,{className:`fas fa-diagram-project`}),` UML Class Diagram`]}),(0,d.jsx)(`div`,{dangerouslySetInnerHTML:{__html:n}}),(0,d.jsxs)(`div`,{className:`oops-diagram-caption`,children:[(0,d.jsx)(`i`,{className:`fas fa-info-circle`}),(0,d.jsx)(`span`,{className:`oops-rel-tag`,children:e.relation}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-arrow-right`}),` `,e.points.join(` • `)]})]})]})]}),(0,d.jsx)(`div`,{className:`oops-key-points`,children:e.points.map((e,t)=>(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-check-circle`}),` `,e]},t))})]})]})})}function m(){let[e,t]=(0,i.useState)(null),n=n=>{t(e===n?null:n)},a=()=>t(null),o=u.find(t=>t.id===e);return(0,d.jsxs)(`div`,{className:`oops-app-wrapper`,children:[(0,d.jsx)(r,{to:`/maang/system-design-basics`,className:`oops-back`,children:`← Back to System Design Basics`}),(0,d.jsxs)(`header`,{className:`oops-main-header`,children:[(0,d.jsxs)(`h1`,{children:[(0,d.jsx)(`i`,{className:`fas fa-gem`}),` SOLID Principles`,(0,d.jsxs)(`span`,{className:`oops-java-badge`,children:[(0,d.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,d.jsxs)(`div`,{className:`oops-sub-info`,children:[(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-diagram-project`}),` 5 SOLID Principles`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-code`}),` Real Java Examples`]}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`i`,{className:`fas fa-eye`}),` Visual Diagrams`]}),(0,d.jsxs)(`span`,{className:`oops-badge`,children:[(0,d.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Click any card`]})]}),(0,d.jsxs)(`a`,{className:`oops-series-link`,href:`https://www.youtube.com/watch?v=-itY-xe2x1s`,target:`_blank`,rel:`noopener noreferrer`,onClick:e=>e.stopPropagation(),title:`Watch the full SOLID series (Telugu)`,children:[(0,d.jsx)(`i`,{className:`fab fa-youtube`}),` Watch Full SOLID Series (Telugu)`]})]}),(0,d.jsxs)(`section`,{className:`oops-why-box`,children:[(0,d.jsxs)(`div`,{className:`oops-why-header`,children:[(0,d.jsx)(`i`,{className:`fas fa-lightbulb`}),` Why do we need SOLID Principles?`]}),(0,d.jsxs)(`div`,{className:`oops-why-content`,children:[(0,d.jsxs)(`p`,{children:[`As your codebase grows, classes become tightly coupled, changes break unrelated features, and testing becomes a nightmare. SOLID gives you `,(0,d.jsx)(`b`,{children:`5 proven rules`}),` to write code that is:`]}),(0,d.jsxs)(`ul`,{className:`oops-why-list`,children:[(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`i`,{className:`fas fa-check-circle`}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`b`,{children:`Easy to maintain`}),` — small focused classes, one reason to change`]})]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`i`,{className:`fas fa-check-circle`}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`b`,{children:`Easy to extend`}),` — add new features without touching old code`]})]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`i`,{className:`fas fa-check-circle`}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`b`,{children:`Easy to test`}),` — depend on abstractions, mock anything`]})]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`i`,{className:`fas fa-check-circle`}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`b`,{children:`Reusable`}),` — small interfaces, swappable implementations`]})]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`i`,{className:`fas fa-check-circle`}),(0,d.jsxs)(`span`,{children:[(0,d.jsx)(`b`,{children:`Interview-ready`}),` — asked in every LLD / Senior dev round`]})]})]}),(0,d.jsxs)(`p`,{className:`oops-why-foot`,children:[`👉 In real projects: SRP keeps controllers thin, OCP avoids`,(0,d.jsx)(`code`,{children:`if-else`}),` hell, LSP prevents subtle bugs in inheritance, ISP stops “fat-interface” pain, and DIP makes your code testable with mocks.`]})]})]}),(0,d.jsx)(`div`,{className:`oops-topic-grid`,children:u.map(t=>(0,d.jsx)(f,{topic:t,isActive:t.id===e,onClick:n},t.id))}),(0,d.jsx)(p,{topic:o,onClose:a}),(0,d.jsxs)(`div`,{className:`oops-footer-note`,children:[(0,d.jsx)(`i`,{className:`fas fa-graduation-cap`}),` Master SOLID for System Design — Each principle includes Java code + visual diagram`]})]})}export{p as DetailPanel,f as TopicCard,m as default};