import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-yz2jrTMK.js";var i=e(t(),1);function a(){return`<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowObj" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#e94560" />
      </marker>
      <style>
        .cls-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 10; }
        .cls-title { fill: #302b63; font-weight: 700; font-size: 14px; font-family: Segoe UI, sans-serif; }
        .cls-field { fill: #555; font-size: 12px; font-family: monospace; }
        .cls-method { fill: #1a1a2e; font-size: 12px; font-family: monospace; }
        .cls-divider { stroke: #ccc; stroke-width: 1; }
        .cls-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .cls-instance { fill: #1a1a2e; font-weight: 600; font-size: 13px; font-family: Segoe UI, sans-serif; }
      </style>
    </defs>
    <rect x="30" y="30" width="240" height="220" class="cls-box" />
    <text x="150" y="60" text-anchor="middle" class="cls-title">«class» Student</text>
    <line x1="40" y1="75" x2="260" y2="75" class="cls-divider" />
    <text x="50" y="100" class="cls-field">- name: String</text>
    <text x="50" y="122" class="cls-field">- rollNo: int</text>
    <text x="50" y="144" class="cls-field">- gpa: double</text>
    <line x1="40" y1="155" x2="260" y2="155" class="cls-divider" />
    <text x="50" y="178" class="cls-method">+ Student(name, roll, gpa)</text>
    <text x="50" y="200" class="cls-method">+ displayInfo(): void</text>
    <text x="50" y="222" class="cls-method">+ study(hours): void</text>
    <text x="50" y="244" class="cls-method">+ getName(): String</text>
    <text x="150" y="275" text-anchor="middle" class="cls-label">⬆ BLUEPRINT (Template)</text>
    <line x1="270" y1="130" x2="340" y2="130" stroke="#e94560" stroke-width="2" marker-end="url(#arrowObj)" stroke-dasharray="6,4" />
    <rect x="350" y="20" width="200" height="120" fill="#fff0f3" stroke="#e94560" stroke-width="2" rx="10" />
    <text x="450" y="48" text-anchor="middle" class="cls-instance">:Student</text>
    <text x="370" y="70" class="cls-field">name = "Alice"</text>
    <text x="370" y="92" class="cls-field">rollNo = 101</text>
    <text x="370" y="114" class="cls-field">gpa = 3.8</text>
    <rect x="350" y="155" width="200" height="120" fill="#f0f8ff" stroke="#302b63" stroke-width="2" rx="10" />
    <text x="450" y="183" text-anchor="middle" class="cls-instance">:Student</text>
    <text x="370" y="205" class="cls-field">name = "Bob"</text>
    <text x="370" y="227" class="cls-field">rollNo = 102</text>
    <text x="370" y="249" class="cls-field">gpa = 3.2</text>
    <rect x="350" y="290" width="200" height="120" fill="#f0fff0" stroke="#2e7d32" stroke-width="2" rx="10" />
    <text x="450" y="318" text-anchor="middle" class="cls-instance">:Student</text>
    <text x="370" y="340" class="cls-field">name = "Charlie"</text>
    <text x="370" y="362" class="cls-field">rollNo = 103</text>
    <text x="370" y="384" class="cls-field">gpa = 3.9</text>
    <text x="450" y="15" text-anchor="middle" class="cls-label" fill="#e94560">● OBJECTS (Instances)</text>
    <text x="450" y="145" text-anchor="middle" class="cls-label" fill="#302b63">● Each has its own state</text>
  </svg>`}function o(){return`<svg viewBox="0 0 600 350" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .enc-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 10; }
        .enc-title { fill: #302b63; font-weight: 700; font-size: 15px; font-family: Segoe UI, sans-serif; }
        .enc-private { fill: #d32f2f; font-size: 12px; font-family: monospace; }
        .enc-public { fill: #2e7d32; font-size: 12px; font-family: monospace; }
        .enc-divider { stroke: #ccc; stroke-width: 1; }
        .enc-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
      </style>
    </defs>
    <rect x="30" y="20" width="260" height="280" class="enc-box" />
    <text x="160" y="52" text-anchor="middle" class="enc-title">BankAccount</text>
    <line x1="40" y1="68" x2="280" y2="68" class="enc-divider" />
    <text x="50" y="96" class="enc-private">🔒 - accountHolder: String</text>
    <text x="50" y="120" class="enc-private">🔒 - balance: double</text>
    <text x="50" y="144" class="enc-private">🔒 - accountNumber: String</text>
    <line x1="40" y1="158" x2="280" y2="158" class="enc-divider" />
    <text x="50" y="182" class="enc-public">🔓 + BankAccount(...)</text>
    <text x="50" y="206" class="enc-public">🔓 + getAccountHolder(): String</text>
    <text x="50" y="230" class="enc-public">🔓 + getBalance(): double</text>
    <text x="50" y="254" class="enc-public">🔓 + deposit(amount): void</text>
    <text x="50" y="278" class="enc-public">🔓 + withdraw(amount): void</text>
    <text x="50" y="302" class="enc-public">🔓 + applyInterest(rate): void</text>
    <rect x="320" y="40" width="250" height="200" fill="#fff5f5" stroke="#e94560" stroke-width="1.5" rx="8" stroke-dasharray="4,4" />
    <text x="445" y="70" text-anchor="middle" class="enc-label">🔐 ENCAPSULATION</text>
    <text x="340" y="100" class="enc-public" font-size="11">Private fields = Hidden</text>
    <text x="340" y="125" class="enc-public" font-size="11">Public methods = Controlled</text>
    <text x="340" y="150" class="enc-public" font-size="11">access to data</text>
    <text x="340" y="185" class="enc-public" font-size="11">✅ Data integrity</text>
    <text x="340" y="210" class="enc-public" font-size="11">✅ Loose coupling</text>
    <line x1="290" y1="150" x2="320" y2="150" stroke="#e94560" stroke-width="2" stroke-dasharray="4,4" />
  </svg>`}function s(){return`<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowInh" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#302b63" />
      </marker>
      <style>
        .inh-parent { fill: #e8eaf6; stroke: #302b63; stroke-width: 2; rx: 10; }
        .inh-child { fill: #f3e5f5; stroke: #7b1fa2; stroke-width: 2; rx: 10; }
        .inh-title { font-weight: 700; font-size: 14px; font-family: Segoe UI, sans-serif; }
        .inh-field { font-size: 11px; font-family: monospace; fill: #444; }
        .inh-method { font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .inh-divider { stroke: #ccc; stroke-width: 1; }
        .inh-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .inh-arrow-label { fill: #7b1fa2; font-size: 12px; font-weight: 600; font-family: Segoe UI, sans-serif; }
      </style>
    </defs>
    <rect x="30" y="20" width="220" height="200" class="inh-parent" />
    <text x="140" y="50" text-anchor="middle" class="inh-title" fill="#302b63">Employee</text>
    <line x1="40" y1="65" x2="240" y2="65" class="inh-divider" />
    <text x="50" y="88" class="inh-field"># name: String</text>
    <text x="50" y="108" class="inh-field"># id: int</text>
    <text x="50" y="128" class="inh-field"># baseSalary: double</text>
    <line x1="40" y1="142" x2="240" y2="142" class="inh-divider" />
    <text x="50" y="165" class="inh-method">+ Employee(...)</text>
    <text x="50" y="185" class="inh-method">+ calculateSalary(): double</text>
    <text x="50" y="205" class="inh-method">+ displayInfo(): void</text>
    <rect x="320" y="120" width="220" height="180" class="inh-child" />
    <text x="430" y="150" text-anchor="middle" class="inh-title" fill="#7b1fa2">Manager</text>
    <line x1="330" y1="165" x2="530" y2="165" class="inh-divider" />
    <text x="340" y="188" class="inh-field">- bonus: double</text>
    <line x1="330" y1="202" x2="530" y2="202" class="inh-divider" />
    <text x="340" y="225" class="inh-method">+ Manager(...)</text>
    <text x="340" y="245" class="inh-method" fill="#d32f2f">+ calculateSalary(): double</text>
    <text x="340" y="265" class="inh-method">+ conductMeeting(): void</text>
    <rect x="320" y="20" width="220" height="180" class="inh-child" />
    <text x="430" y="50" text-anchor="middle" class="inh-title" fill="#7b1fa2">Developer</text>
    <line x1="330" y1="65" x2="530" y2="65" class="inh-divider" />
    <text x="340" y="88" class="inh-field">- programmingLanguage: String</text>
    <line x1="330" y1="102" x2="530" y2="102" class="inh-divider" />
    <text x="340" y="125" class="inh-method">+ Developer(...)</text>
    <text x="340" y="145" class="inh-method" fill="#d32f2f">+ calculateSalary(): double</text>
    <text x="340" y="165" class="inh-method">+ writeCode(): void</text>
    <line x1="250" y1="70" x2="320" y2="70" stroke="#302b63" stroke-width="2.5" marker-end="url(#arrowInh)" />
    <line x1="250" y1="120" x2="320" y2="170" stroke="#302b63" stroke-width="2.5" marker-end="url(#arrowInh)" />
    <text x="285" y="55" class="inh-arrow-label">extends</text>
    <text x="285" y="155" class="inh-arrow-label">extends</text>
    <rect x="560" y="80" width="130" height="100" fill="#fff8e1" stroke="#f9a825" stroke-width="1.5" rx="6" />
    <text x="625" y="108" text-anchor="middle" class="inh-label">🔄 Inheritance</text>
    <text x="575" y="132" class="inh-field" font-size="10">✅ Code Reuse</text>
    <text x="575" y="152" class="inh-field" font-size="10">✅ Override</text>
    <text x="575" y="172" class="inh-field" font-size="10">✅ IS-A</text>
  </svg>`}function c(){return`<svg viewBox="0 0 750 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowPoly" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#302b63" />
      </marker>
      <style>
        .poly-parent { fill: #e8eaf6; stroke: #302b63; stroke-width: 2; rx: 10; }
        .poly-child { fill: #e0f7fa; stroke: #00695c; stroke-width: 2; rx: 10; }
        .poly-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; }
        .poly-method { font-size: 11px; font-family: monospace; }
        .poly-divider { stroke: #ccc; stroke-width: 1; }
        .poly-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .poly-overload { fill: #e65100; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
      </style>
    </defs>
    <rect x="30" y="20" width="190" height="130" class="poly-parent" />
    <text x="125" y="48" text-anchor="middle" class="poly-title" fill="#302b63">Shape</text>
    <line x1="40" y1="62" x2="210" y2="62" class="poly-divider" />
    <text x="50" y="85" class="poly-method">+ draw(): void</text>
    <rect x="280" y="20" width="180" height="130" class="poly-child" />
    <text x="370" y="48" text-anchor="middle" class="poly-title" fill="#00695c">Circle</text>
    <line x1="290" y1="62" x2="450" y2="62" class="poly-divider" />
    <text x="300" y="85" class="poly-method" fill="#d32f2f">+ draw(): void</text>
    <text x="300" y="108" class="poly-method" fill="#666" font-size="10">// draws circle</text>
    <rect x="280" y="160" width="180" height="130" class="poly-child" />
    <text x="370" y="188" text-anchor="middle" class="poly-title" fill="#00695c">Rectangle</text>
    <line x1="290" y1="202" x2="450" y2="202" class="poly-divider" />
    <text x="300" y="225" class="poly-method" fill="#d32f2f">+ draw(): void</text>
    <text x="300" y="248" class="poly-method" fill="#666" font-size="10">// draws rect</text>
    <rect x="280" y="300" width="180" height="130" class="poly-child" />
    <text x="370" y="328" text-anchor="middle" class="poly-title" fill="#00695c">Triangle</text>
    <line x1="290" y1="342" x2="450" y2="342" class="poly-divider" />
    <text x="300" y="365" class="poly-method" fill="#d32f2f">+ draw(): void</text>
    <text x="300" y="388" class="poly-method" fill="#666" font-size="10">// draws triangle</text>
    <line x1="220" y1="60" x2="280" y2="60" stroke="#302b63" stroke-width="2" marker-end="url(#arrowPoly)" />
    <line x1="220" y1="80" x2="280" y2="210" stroke="#302b63" stroke-width="2" marker-end="url(#arrowPoly)" />
    <line x1="220" y1="100" x2="280" y2="350" stroke="#302b63" stroke-width="2" marker-end="url(#arrowPoly)" />
    <text x="250" y="55" fill="#00695c" font-size="10" font-weight="600">extends</text>
    <text x="250" y="145" fill="#00695c" font-size="10" font-weight="600">extends</text>
    <text x="250" y="230" fill="#00695c" font-size="10" font-weight="600">extends</text>
    <rect x="490" y="20" width="240" height="160" fill="#fff3e0" stroke="#e65100" stroke-width="1.5" rx="8" />
    <text x="610" y="48" text-anchor="middle" class="poly-overload">📚 Overloading</text>
    <text x="510" y="75" class="poly-method" font-size="11">add(int a, int b)</text>
    <text x="510" y="98" class="poly-method" font-size="11">add(double a, double b)</text>
    <text x="510" y="121" class="poly-method" font-size="11">add(int a, int b, int c)</text>
    <text x="510" y="144" class="poly-method" font-size="11">add(String a, String b)</text>
    <text x="510" y="167" class="poly-method" fill="#666" font-size="10">✅ Same name, different params</text>
    <rect x="490" y="200" width="240" height="100" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" rx="8" />
    <text x="610" y="228" text-anchor="middle" class="poly-label" fill="#2e7d32">🔄 Runtime Polymorphism</text>
    <text x="510" y="255" class="poly-method" font-size="11">Shape s = new Circle();</text>
    <text x="510" y="278" class="poly-method" font-size="11">s.draw(); // Circle's draw</text>
  </svg>`}function l(){return`<svg viewBox="0 0 750 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowAbs" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#302b63" />
      </marker>
      <style>
        .abs-abstract { fill: #f3e5f5; stroke: #6a1b9a; stroke-width: 2; rx: 10; }
        .abs-concrete { fill: #e8f5e9; stroke: #2e7d32; stroke-width: 2; rx: 10; }
        .abs-interface { fill: #fff3e0; stroke: #e65100; stroke-width: 2; rx: 10; }
        .abs-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; }
        .abs-method { font-size: 11px; font-family: monospace; }
        .abs-divider { stroke: #ccc; stroke-width: 1; }
        .abs-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
      </style>
    </defs>
    <rect x="20" y="20" width="220" height="210" class="abs-abstract" />
    <text x="130" y="48" text-anchor="middle" class="abs-title" fill="#6a1b9a">«abstract»</text>
    <text x="130" y="68" text-anchor="middle" class="abs-title" fill="#6a1b9a">PaymentProcessor</text>
    <line x1="30" y1="82" x2="230" y2="82" class="abs-divider" />
    <text x="40" y="105" class="abs-method" font-style="italic" fill="#d32f2f">+ processPayment(amt): void</text>
    <text x="40" y="128" class="abs-method" fill="#1a1a2e">+ logTransaction(type): void</text>
    <text x="40" y="151" class="abs-method" fill="#1a1a2e">+ executePayment(amt): void</text>
    <text x="40" y="174" class="abs-method" fill="#666" font-size="10">// template method</text>
    <rect x="290" y="20" width="210" height="140" class="abs-concrete" />
    <text x="395" y="48" text-anchor="middle" class="abs-title" fill="#2e7d32">CreditCardProcessor</text>
    <line x1="300" y1="62" x2="490" y2="62" class="abs-divider" />
    <text x="310" y="85" class="abs-method">- cardNumber: String</text>
    <line x1="300" y1="100" x2="490" y2="100" class="abs-divider" />
    <text x="310" y="123" class="abs-method" fill="#d32f2f">+ processPayment(amt): void</text>
    <rect x="290" y="180" width="210" height="140" class="abs-concrete" />
    <text x="395" y="208" text-anchor="middle" class="abs-title" fill="#2e7d32">PayPalProcessor</text>
    <line x1="300" y1="222" x2="490" y2="222" class="abs-divider" />
    <text x="310" y="245" class="abs-method">- email: String</text>
    <line x1="300" y1="260" x2="490" y2="260" class="abs-divider" />
    <text x="310" y="283" class="abs-method" fill="#d32f2f">+ processPayment(amt): void</text>
    <rect x="540" y="20" width="190" height="110" class="abs-interface" />
    <text x="635" y="48" text-anchor="middle" class="abs-title" fill="#e65100">«interface»</text>
    <text x="635" y="68" text-anchor="middle" class="abs-title" fill="#e65100">Notifiable</text>
    <line x1="550" y1="82" x2="720" y2="82" class="abs-divider" />
    <text x="560" y="105" class="abs-method" font-style="italic" fill="#d32f2f">+ sendNotification(msg): void</text>
    <rect x="540" y="150" width="190" height="90" class="abs-concrete" />
    <text x="635" y="178" text-anchor="middle" class="abs-title" fill="#2e7d32">EmailNotifier</text>
    <line x1="550" y1="192" x2="720" y2="192" class="abs-divider" />
    <text x="560" y="215" class="abs-method" fill="#d32f2f">+ sendNotification(msg): void</text>
    <rect x="540" y="260" width="190" height="90" class="abs-concrete" />
    <text x="635" y="288" text-anchor="middle" class="abs-title" fill="#2e7d32">SMSNotifier</text>
    <line x1="550" y1="302" x2="720" y2="302" class="abs-divider" />
    <text x="560" y="325" class="abs-method" fill="#d32f2f">+ sendNotification(msg): void</text>
    <line x1="240" y1="60" x2="290" y2="60" stroke="#6a1b9a" stroke-width="2" marker-end="url(#arrowAbs)" stroke-dasharray="6,3" />
    <line x1="240" y1="80" x2="290" y2="230" stroke="#6a1b9a" stroke-width="2" marker-end="url(#arrowAbs)" stroke-dasharray="6,3" />
    <line x1="540" y1="75" x2="540" y2="150" stroke="#e65100" stroke-width="2" stroke-dasharray="6,3" />
    <line x1="540" y1="75" x2="540" y2="260" stroke="#e65100" stroke-width="2" stroke-dasharray="6,3" />
  </svg>`}function u(){return`<svg viewBox="0 0 750 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .assoc-class { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 10; }
        .assoc-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .assoc-field { font-size: 11px; font-family: monospace; fill: #444; }
        .assoc-divider { stroke: #ccc; stroke-width: 1; }
        .assoc-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .assoc-diamond { fill: #fff; stroke: #302b63; stroke-width: 2; }
        .assoc-diamond-fill { fill: #302b63; stroke: #302b63; stroke-width: 2; }
      </style>
    </defs>
    <rect x="20" y="20" width="140" height="100" class="assoc-class" />
    <text x="90" y="48" text-anchor="middle" class="assoc-title">Employee</text>
    <line x1="30" y1="62" x2="150" y2="62" class="assoc-divider" />
    <text x="35" y="85" class="assoc-field">- name: String</text>
    <text x="35" y="105" class="assoc-field">- dept: Department</text>
    <rect x="200" y="30" width="130" height="80" class="assoc-class" />
    <text x="265" y="58" text-anchor="middle" class="assoc-title">Department</text>
    <line x1="210" y1="72" x2="320" y2="72" class="assoc-divider" />
    <text x="215" y="95" class="assoc-field">- name: String</text>
    <rect x="20" y="160" width="140" height="100" class="assoc-class" />
    <text x="90" y="188" text-anchor="middle" class="assoc-title">Car</text>
    <line x1="30" y1="202" x2="150" y2="202" class="assoc-divider" />
    <text x="35" y="225" class="assoc-field">- model: String</text>
    <text x="35" y="245" class="assoc-field">- wheels: List&lt;Wheel&gt;</text>
    <polygon points="175,200 195,210 175,220 155,210" class="assoc-diamond" />
    <rect x="200" y="170" width="130" height="80" class="assoc-class" />
    <text x="265" y="198" text-anchor="middle" class="assoc-title">Wheel</text>
    <line x1="210" y1="212" x2="320" y2="212" class="assoc-divider" />
    <text x="215" y="235" class="assoc-field">- type: String</text>
    <rect x="20" y="310" width="140" height="100" class="assoc-class" />
    <text x="90" y="338" text-anchor="middle" class="assoc-title">House</text>
    <line x1="30" y1="352" x2="150" y2="352" class="assoc-divider" />
    <text x="35" y="375" class="assoc-field">- address: String</text>
    <text x="35" y="395" class="assoc-field">- rooms: List&lt;Room&gt;</text>
    <polygon points="175,350 195,360 175,370 155,360" class="assoc-diamond-fill" />
    <rect x="200" y="320" width="130" height="80" class="assoc-class" />
    <text x="265" y="348" text-anchor="middle" class="assoc-title">Room</text>
    <line x1="210" y1="362" x2="320" y2="362" class="assoc-divider" />
    <text x="215" y="385" class="assoc-field">- name: String</text>
    <rect x="400" y="30" width="320" height="200" fill="#fafafa" stroke="#ddd" stroke-width="1" rx="8" />
    <text x="420" y="60" class="assoc-label">📌 Relationship Types</text>
    <text x="420" y="90" class="assoc-field">Association:  Employee ── Department</text>
    <text x="420" y="120" class="assoc-field">Aggregation:  Car ◇── Wheel  (weak)</text>
    <text x="420" y="150" class="assoc-field">Composition:  House ●── Room  (strong)</text>
    <text x="420" y="185" class="assoc-field" fill="#666" font-size="10">◇ = parts can exist independently</text>
    <text x="420" y="210" class="assoc-field" fill="#666" font-size="10">● = parts are owned, destroyed with whole</text>
  </svg>`}function d(){return`<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowDep" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#e94560" />
      </marker>
      <style>
        .dep-class { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 10; }
        .dep-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .dep-field { font-size: 11px; font-family: monospace; fill: #444; }
        .dep-method { font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .dep-divider { stroke: #ccc; stroke-width: 1; }
        .dep-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .dep-dashed { stroke: #e94560; stroke-width: 2; stroke-dasharray: 8,5; }
      </style>
    </defs>
    <rect x="30" y="30" width="170" height="160" class="dep-class" />
    <text x="115" y="58" text-anchor="middle" class="dep-title">Order</text>
    <line x1="40" y1="72" x2="190" y2="72" class="dep-divider" />
    <text x="45" y="95" class="dep-field">- orderId: int</text>
    <text x="45" y="115" class="dep-field">- amount: double</text>
    <line x1="40" y1="128" x2="190" y2="128" class="dep-divider" />
    <text x="45" y="150" class="dep-method">+ process(Logger): void</text>
    <text x="45" y="175" class="dep-method">+ saveToDatabase(): void</text>
    <line x1="200" y1="110" x2="260" y2="110" class="dep-dashed" marker-end="url(#arrowDep)" />
    <rect x="270" y="80" width="130" height="60" class="dep-class" />
    <text x="335" y="108" text-anchor="middle" class="dep-title">Logger</text>
    <line x1="280" y1="120" x2="390" y2="120" class="dep-divider" />
    <text x="285" y="135" class="dep-method">+ log(msg): void</text>
    <line x1="200" y1="170" x2="310" y2="220" class="dep-dashed" marker-end="url(#arrowDep)" />
    <rect x="320" y="200" width="160" height="60" class="dep-class" />
    <text x="400" y="228" text-anchor="middle" class="dep-title">DatabaseConnector</text>
    <line x1="330" y1="240" x2="470" y2="240" class="dep-divider" />
    <text x="335" y="255" class="dep-method">+ saveOrder(Order): void</text>
    <line x1="200" y1="140" x2="310" y2="300" class="dep-dashed" marker-end="url(#arrowDep)" />
    <rect x="320" y="280" width="130" height="60" class="dep-class" />
    <text x="385" y="308" text-anchor="middle" class="dep-title">Report</text>
    <line x1="330" y1="320" x2="440" y2="320" class="dep-divider" />
    <text x="335" y="335" class="dep-method">+ print(): void</text>
    <rect x="500" y="30" width="180" height="80" class="dep-class" />
    <text x="590" y="58" text-anchor="middle" class="dep-title">CheckoutService</text>
    <line x1="510" y1="72" x2="670" y2="72" class="dep-divider" />
    <text x="515" y="95" class="dep-method">+ checkout(Order, Gateway)</text>
    <line x1="590" y1="110" x2="590" y2="150" class="dep-dashed" marker-end="url(#arrowDep)" />
    <rect x="500" y="160" width="180" height="60" class="dep-class" style="stroke:#e65100;" />
    <text x="590" y="188" text-anchor="middle" class="dep-title" fill="#e65100">«interface»</text>
    <text x="590" y="208" text-anchor="middle" class="dep-title" fill="#e65100">PaymentGateway</text>
    <text x="235" y="55" class="dep-label" font-size="10">method param</text>
    <text x="235" y="180" class="dep-label" font-size="10">local var</text>
    <text x="235" y="280" class="dep-label" font-size="10">return type</text>
  </svg>`}var f=`https://www.youtube.com/playlist?list=UUTirDqmh7EyUCB8661XdwYw`,p=[{id:`class-object`,icon:`fa-object-group`,category:`foundation`,title:`Class & Object`,sub:`Blueprint & Instance`,desc:`A Class is a template/blueprint. An Object is an instance of a class with actual values.`,definition:`Class defines structure (fields + methods). Object is a concrete entity created from the class using the "new" keyword. Objects hold state (field values) and behavior (methods).`,videoLink:f,code:`// ========== CLASS & OBJECT ==========

// 1. Define a Class (Blueprint)
class Student {
    // Fields (state)
    private String name;
    private int rollNo;
    private double gpa;

    // Constructor
    public Student(String name, int rollNo, double gpa) {
        this.name = name;
        this.rollNo = rollNo;
        this.gpa = gpa;
    }

    // Methods (behavior)
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Roll No: " + rollNo);
        System.out.println("GPA: " + gpa);
    }

    public void study(int hours) {
        System.out.println(name + " studied for " + hours + " hours.");
    }

    // Getters
    public String getName() { return name; }
    public double getGpa() { return gpa; }
}

// 2. Create Objects (Instances)
public class Main {
    public static void main(String[] args) {
        // Object 1
        Student s1 = new Student("Alice", 101, 3.8);
        s1.displayInfo();
        s1.study(4);

        // Object 2
        Student s2 = new Student("Bob", 102, 3.2);
        s2.displayInfo();
        s2.study(2);

        // Object 3
        Student s3 = new Student("Charlie", 103, 3.9);
        s3.displayInfo();
    }
}`,diagram:a,relation:`📦 Class = Blueprint | Object = Instance with state`,points:[`One class → many objects`,`Objects hold unique state`,`Objects share behavior (methods)`]},{id:`encapsulation`,icon:`fa-shield-halved`,category:`pillar`,title:`Encapsulation`,sub:`Data Hiding + Access Control`,desc:`Bundling data with methods that operate on it, hiding internal state via private fields.`,definition:`Encapsulation protects data integrity by making fields private and exposing controlled access via public getters/setters. It reduces complexity and prevents unwanted interference.`,videoLink:f,code:`// ========== ENCAPSULATION ==========

class BankAccount {
    // Private fields — hidden from outside
    private String accountHolder;
    private double balance;
    private String accountNumber;

    // Constructor
    public BankAccount(String holder, String accNo, double initial) {
        this.accountHolder = holder;
        this.accountNumber = accNo;
        this.balance = initial;
    }

    // Public getters (read-only access)
    public String getAccountHolder() {
        return accountHolder;
    }

    public double getBalance() {
        return balance;
    }

    // Controlled setter with validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount);
        } else {
            System.out.println("Insufficient balance or invalid amount");
        }
    }

    // Business logic method
    public void applyInterest(double rate) {
        double interest = balance * rate / 100;
        balance += interest;
        System.out.println("Interest applied: " + interest);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Alice", "SB-12345", 5000);

        // Cannot directly access balance
        // acc.balance = 99999;  // ❌ Compile error (private)

        // Use public methods
        acc.deposit(2000);
        acc.withdraw(500);
        acc.applyInterest(4.5);
        System.out.println("Final Balance: " + acc.getBalance());
    }
}`,diagram:o,relation:`🔒 Private fields + Public methods = Controlled access`,points:[`Fields are private (hidden)`,`Getters/Setters provide controlled access`,`Validation in setters`,`Reduces complexity`]},{id:`inheritance`,icon:`fa-sitemap`,category:`pillar`,title:`Inheritance`,sub:`IS-A Relationship`,desc:`A child class inherits fields and methods from a parent class, enabling code reuse and hierarchy.`,definition:`Inheritance creates a parent-child relationship using "extends". Child inherits all public/protected members and can override methods. Promotes reusability and polymorphism.`,videoLink:f,code:`// ========== INHERITANCE ==========

// Parent class (Superclass)
class Employee {
    protected String name;
    protected int id;
    protected double baseSalary;

    public Employee(String name, int id, double baseSalary) {
        this.name = name;
        this.id = id;
        this.baseSalary = baseSalary;
    }

    public double calculateSalary() {
        return baseSalary;
    }

    public void displayInfo() {
        System.out.println("ID: " + id + ", Name: " + name);
        System.out.println("Salary: " + calculateSalary());
    }
}

// Child class 1
class Manager extends Employee {
    private double bonus;

    public Manager(String name, int id, double baseSalary, double bonus) {
        super(name, id, baseSalary);  // call parent constructor
        this.bonus = bonus;
    }

    @Override
    public double calculateSalary() {
        return super.calculateSalary() + bonus;
    }

    public void conductMeeting() {
        System.out.println(name + " is conducting a meeting.");
    }
}

// Child class 2
class Developer extends Employee {
    private String programmingLanguage;

    public Developer(String name, int id, double baseSalary, String lang) {
        super(name, id, baseSalary);
        this.programmingLanguage = lang;
    }

    @Override
    public double calculateSalary() {
        return super.calculateSalary() * 1.1;  // 10% hike
    }

    public void writeCode() {
        System.out.println(name + " is writing " + programmingLanguage + " code.");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Manager mgr = new Manager("Alice", 101, 80000, 20000);
        Developer dev = new Developer("Bob", 102, 60000, "Java");

        mgr.displayInfo();    // Inherited
        mgr.conductMeeting(); // Own method

        dev.displayInfo();    // Inherited
        dev.writeCode();      // Own method
    }
}`,diagram:s,relation:`🔄 Child extends Parent — IS-A relationship`,points:[`extends keyword`,`super() calls parent constructor`,`@Override for method overriding`,`Promotes code reuse`]},{id:`polymorphism`,icon:`fa-shapes`,category:`pillar`,title:`Polymorphism`,sub:`Many Forms — Override + Overload`,desc:`Objects of different types respond to the same method call in their own way. Compile-time (overloading) + Runtime (overriding).`,definition:`Polymorphism means "many forms". Runtime polymorphism: parent reference, child object. Compile-time polymorphism: method overloading (same name, different params).`,videoLink:f,code:`// ========== POLYMORPHISM ==========

// ===== 1. Runtime Polymorphism (Overriding) =====
class Shape {
    public void draw() {
        System.out.println("Drawing a generic shape");
    }
}

class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("⭕ Drawing a Circle");
    }
}

class Rectangle extends Shape {
    @Override
    public void draw() {
        System.out.println("▭ Drawing a Rectangle");
    }
}

class Triangle extends Shape {
    @Override
    public void draw() {
        System.out.println("△ Drawing a Triangle");
    }
}

// ===== 2. Compile-time Polymorphism (Overloading) =====
class MathOperations {
    // Same name, different parameters
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }

    public String add(String a, String b) {
        return a + b;
    }
}

// ===== Usage =====
public class Main {
    public static void main(String[] args) {
        // Runtime Polymorphism
        Shape s1 = new Circle();
        Shape s2 = new Rectangle();
        Shape s3 = new Triangle();

        s1.draw();  // ⭕ Drawing a Circle
        s2.draw();  // ▭ Drawing a Rectangle
        s3.draw();  // △ Drawing a Triangle

        // Compile-time Polymorphism (Overloading)
        MathOperations math = new MathOperations();
        System.out.println(math.add(5, 10));            // 15
        System.out.println(math.add(2.5, 3.7));         // 6.2
        System.out.println(math.add(1, 2, 3));          // 6
        System.out.println(math.add("Hello", "World")); // HelloWorld
    }
}`,diagram:c,relation:`🔄 Override (runtime) + Overload (compile-time)`,points:[`Method Overriding (runtime)`,`Method Overloading (compile-time)`,`Parent reference, child object`,`Dynamic method dispatch`]},{id:`abstraction`,icon:`fa-layer-group`,category:`pillar`,title:`Abstraction`,sub:`Hide Implementation, Show Interface`,desc:`Exposing only essential features while hiding internal details using abstract classes and interfaces.`,definition:`Abstraction focuses on what an object does instead of how. Abstract classes (partial implementation) and Interfaces (full abstraction) achieve this.`,videoLink:f,code:`// ========== ABSTRACTION ==========

// 1. Abstract Class (Partial Abstraction)
abstract class PaymentProcessor {
    // Abstract method — must be implemented by child
    public abstract void processPayment(double amount);

    // Concrete method — shared by all children
    public void logTransaction(String type) {
        System.out.println("📝 [LOG] " + type + " payment initiated");
    }

    // Template method pattern
    public final void executePayment(double amount) {
        logTransaction("Payment");
        processPayment(amount);
        System.out.println("✅ Payment completed");
    }
}

// Concrete implementation 1
class CreditCardProcessor extends PaymentProcessor {
    private String cardNumber;

    public CreditCardProcessor(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public void processPayment(double amount) {
        System.out.println("💳 Charging " + amount + " to card: " + cardNumber);
    }
}

// Concrete implementation 2
class PayPalProcessor extends PaymentProcessor {
    private String email;

    public PayPalProcessor(String email) {
        this.email = email;
    }

    @Override
    public void processPayment(double amount) {
        System.out.println("🌐 Processing PayPal payment of " + amount + " for " + email);
    }
}

// 2. Interface (Full Abstraction)
interface Notifiable {
    void sendNotification(String message);
}

class EmailNotifier implements Notifiable {
    @Override
    public void sendNotification(String message) {
        System.out.println("📧 Email sent: " + message);
    }
}

class SMSNotifier implements Notifiable {
    @Override
    public void sendNotification(String message) {
        System.out.println("📱 SMS sent: " + message);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        PaymentProcessor p1 = new CreditCardProcessor("****1234");
        p1.executePayment(150.00);

        PaymentProcessor p2 = new PayPalProcessor("user@example.com");
        p2.executePayment(75.50);

        Notifiable n1 = new EmailNotifier();
        n1.sendNotification("Order confirmed");
    }
}`,diagram:l,relation:`🎯 Abstract classes (partial) + Interfaces (full) = Abstraction`,points:[`Abstract classes = partial implementation`,`Interfaces = full abstraction`,`Hides implementation details`,`Promotes loose coupling`]},{id:`association`,icon:`fa-link`,category:`relation`,title:`Association`,sub:`Has-A: Aggregation + Composition`,desc:`Association defines relationships between classes. Aggregation (weak, shared) and Composition (strong, owned).`,definition:`Association is a relationship where one object uses another. Aggregation: parts can exist independently (empty diamond). Composition: parts are owned and destroyed with the whole (filled diamond).`,videoLink:f,code:`// ========== ASSOCIATION ==========

import java.util.*;

// ===== 1. Simple Association =====
class Department {
    private String name;
    public Department(String name) { this.name = name; }
    public String getName() { return name; }
}

class Employee {
    private String name;
    private Department dept;  // Association

    public Employee(String name, Department dept) {
        this.name = name;
        this.dept = dept;
    }
    public void work() {
        System.out.println(name + " works in " + dept.getName());
    }
}

// ===== 2. Aggregation (Weak Has-A) =====
class Wheel {
    private String type;
    private double pressure;

    public Wheel(String type, double pressure) {
        this.type = type;
        this.pressure = pressure;
    }
    public void rotate() {
        System.out.println(type + " wheel rotating at " + pressure + " PSI");
    }
}

class Car {
    private String model;
    private List<Wheel> wheels;  // Aggregation

    public Car(String model, List<Wheel> wheels) {
        this.model = model;
        this.wheels = wheels;  // Wheels are passed from outside
    }

    public void drive() {
        System.out.println("🚗 " + model + " is driving on " + wheels.size() + " wheels");
        for (Wheel w : wheels) {
            w.rotate();
        }
    }
}

// ===== 3. Composition (Strong Has-A) =====
class Room {
    private String name;
    private double area;

    public Room(String name, double area) {
        this.name = name;
        this.area = area;
    }
    public void describe() {
        System.out.println("   🏠 " + name + " (" + area + " sq ft)");
    }
}

class House {
    private String address;
    private List<Room> rooms;  // Composition

    public House(String address) {
        this.address = address;
        // Rooms are CREATED INSIDE — owned by House
        rooms = new ArrayList<>();
        rooms.add(new Room("Living Room", 250));
        rooms.add(new Room("Kitchen", 150));
        rooms.add(new Room("Bedroom", 180));
        rooms.add(new Room("Bathroom", 80));
    }

    public void showHouse() {
        System.out.println("🏠 House at " + address);
        System.out.println("Rooms:");
        for (Room r : rooms) {
            r.describe();
        }
    }
}

// ===== Usage =====
public class Main {
    public static void main(String[] args) {
        // Association
        Department it = new Department("IT");
        Employee e = new Employee("Alice", it);
        e.work();

        // Aggregation
        List<Wheel> wheelSet = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            wheelSet.add(new Wheel("All-Season", 32.5));
        }
        Car car = new Car("Tesla", wheelSet);
        car.drive();

        // Composition
        House house = new House("123 Main St");
        house.showHouse();
    }
}`,diagram:u,relation:`🔗 Association (simple) | ◇ Aggregation (weak) | ● Composition (strong)`,points:[`Association = general relationship`,`Aggregation = shared parts (empty diamond)`,`Composition = owned parts (filled diamond)`,`Multiplicity defines cardinality`]},{id:`dependency`,icon:`fa-arrow-right-arrow-left`,category:`relation`,title:`Dependency`,sub:`Uses-A (Temporary)`,desc:`One class depends on another when it uses it as a method parameter, local variable, or return type. Weakest coupling.`,definition:`Dependency is a temporary relationship where a class "uses" another class briefly. It's the loosest form of coupling. Shown as a dashed arrow in UML.`,videoLink:f,code:`// ========== DEPENDENCY ==========

class Logger {
    public void log(String message) {
        System.out.println("📋 [LOG] " + message);
    }
}

class Order {
    private int orderId;
    private double amount;

    public Order(int orderId, double amount) {
        this.orderId = orderId;
        this.amount = amount;
    }

    // 1. Dependency as method parameter
    public void process(Logger logger) {
        logger.log("Processing order #" + orderId + " for $" + amount);
        logger.log("Order #" + orderId + " completed");
    }

    // 2. Dependency as local variable
    public void saveToDatabase() {
        DatabaseConnector connector = new DatabaseConnector();
        connector.saveOrder(this);
    }

    public int getOrderId() { return orderId; }
    public double getAmount() { return amount; }
}

class DatabaseConnector {
    public void saveOrder(Order order) {
        System.out.println("💾 Saving order #" + order.getOrderId() + " to DB");
    }
}

// 3. Dependency as return type
class ReportGenerator {
    public Report generateReport(Order order) {
        return new Report(order);
    }
}

class Report {
    private Order order;
    public Report(Order order) { this.order = order; }
    public void print() {
        System.out.println("📊 Report for Order #" + order.getOrderId());
        System.out.println("   Amount: $" + order.getAmount());
    }
}

// 4. Dependency on interface
interface PaymentGateway {
    void charge(double amount);
}

class StripeGateway implements PaymentGateway {
    @Override
    public void charge(double amount) {
        System.out.println("💳 Stripe: Charged $" + amount);
    }
}

class CheckoutService {
    public void checkout(Order order, PaymentGateway gateway) {
        System.out.println("🛒 Checking out order #" + order.getOrderId());
        gateway.charge(order.getAmount());
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Order order = new Order(1001, 250.50);
        Logger logger = new Logger();
        order.process(logger);

        CheckoutService service = new CheckoutService();
        service.checkout(order, new StripeGateway());
    }
}`,diagram:d,relation:`➡️ Dependency = temporary usage (method param / local var / return type)`,points:[`Method parameter dependency`,`Local variable dependency`,`Return type dependency`,`Weakest coupling`,`Dashed arrow in UML`]}],m=n();function h({topic:e,isActive:t,onClick:n}){return(0,m.jsxs)(`div`,{className:`oops-topic-card ${t?`active`:``}`,onClick:()=>n(e.id),children:[(0,m.jsx)(`div`,{className:`oops-card-icon`,children:(0,m.jsx)(`i`,{className:`fas ${e.icon}`})}),(0,m.jsx)(`h3`,{children:e.title}),(0,m.jsx)(`span`,{className:`oops-card-sub`,children:e.sub}),(0,m.jsx)(`p`,{children:e.desc}),(0,m.jsxs)(`a`,{className:`oops-video-link`,href:e.videoLink,onClick:e=>e.stopPropagation(),title:`Watch video`,children:[(0,m.jsx)(`i`,{className:`fas fa-play-circle`}),` Video`]}),(0,m.jsxs)(`span`,{className:`oops-card-tag`,children:[(0,m.jsx)(`i`,{className:`fas fa-code`}),` Java + UML`]}),t&&(0,m.jsx)(`span`,{className:`oops-active-indicator`,children:(0,m.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function g({topic:e,onClose:t}){if(!e)return null;let n=e.diagram();return(0,m.jsx)(`div`,{className:`oops-modal-backdrop`,onClick:t,children:(0,m.jsxs)(`div`,{className:`oops-detail-panel modal-visible`,onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(`div`,{className:`oops-detail-header`,children:[(0,m.jsxs)(`h2`,{children:[(0,m.jsx)(`i`,{className:`fas ${e.icon}`}),(0,m.jsx)(`span`,{className:`oops-title-text`,children:e.title}),(0,m.jsxs)(`span`,{className:`oops-detail-sub`,children:[`— `,e.sub]})]}),(0,m.jsx)(`button`,{className:`oops-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,m.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,m.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,m.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,m.jsxs)(`div`,{className:`oops-modal-scroll-content`,children:[(0,m.jsxs)(`div`,{className:`oops-definition-box`,children:[(0,m.jsx)(`strong`,{children:`📘 Definition: `}),e.definition]}),(0,m.jsxs)(`div`,{className:`oops-detail-grid`,children:[(0,m.jsx)(`div`,{children:(0,m.jsxs)(`div`,{className:`oops-code-section`,children:[(0,m.jsxs)(`div`,{className:`oops-code-header`,children:[(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fab fa-java`}),` Java Code`]}),(0,m.jsx)(`span`,{className:`oops-lang-badge`,children:`Java 17+`})]}),(0,m.jsx)(`pre`,{children:e.code})]})}),(0,m.jsxs)(`div`,{className:`oops-diagram-section`,children:[(0,m.jsxs)(`div`,{className:`oops-diagram-title`,children:[(0,m.jsx)(`i`,{className:`fas fa-diagram-project`}),` UML Class Diagram`]}),(0,m.jsx)(`div`,{dangerouslySetInnerHTML:{__html:n}}),(0,m.jsxs)(`div`,{className:`oops-diagram-caption`,children:[(0,m.jsx)(`i`,{className:`fas fa-info-circle`}),(0,m.jsx)(`span`,{className:`oops-rel-tag`,children:e.relation}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-arrow-right`}),` `,e.points.join(` • `)]})]})]})]}),(0,m.jsx)(`div`,{className:`oops-key-points`,children:e.points.map((e,t)=>(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),` `,e]},t))})]})]})})}function _(){let[e,t]=(0,i.useState)(null),n=n=>{t(e===n?null:n)},a=()=>t(null),o=p.find(t=>t.id===e);return(0,m.jsxs)(`div`,{className:`oops-app-wrapper`,children:[(0,m.jsx)(r,{to:`/maang/system-design-basics`,className:`oops-back`,children:`← Back to System Design Basics`}),(0,m.jsxs)(`header`,{className:`oops-main-header`,children:[(0,m.jsxs)(`h1`,{children:[(0,m.jsx)(`i`,{className:`fas fa-cubes`}),` OOP System Design`,(0,m.jsxs)(`span`,{className:`oops-java-badge`,children:[(0,m.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,m.jsxs)(`div`,{className:`oops-sub-info`,children:[(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-gem`}),` OOP Foundations`]}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-crown`}),` 4 Pillars`]}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-project-diagram`}),` Core Relationships`]}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-code`}),` Real Java Examples`]}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-eye`}),` Visual Class Diagrams`]}),(0,m.jsxs)(`span`,{className:`oops-badge`,children:[(0,m.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Click any card`]})]})]}),(0,m.jsxs)(`section`,{className:`oops-why-box`,children:[(0,m.jsxs)(`div`,{className:`oops-why-header`,children:[(0,m.jsx)(`i`,{className:`fas fa-lightbulb`}),` Why do we need OOP?`]}),(0,m.jsxs)(`div`,{className:`oops-why-content`,children:[(0,m.jsxs)(`p`,{children:[`As software grows, plain functions and global variables become a tangled mess. `,(0,m.jsx)(`b`,{children:`Object-Oriented Programming`}),` models real-world entities as `,(0,m.jsx)(`b`,{children:`objects`}),` that bundle `,(0,m.jsx)(`i`,{children:`data`}),` and`,(0,m.jsx)(`i`,{children:` behavior`}),` together — making large codebases`,(0,m.jsx)(`b`,{children:` organized, reusable, and easier to change`}),`.`]}),(0,m.jsxs)(`ul`,{className:`oops-why-list`,children:[(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Modularity`}),` — each object is a self-contained unit`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Reusability`}),` — inherit and extend existing classes`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Security`}),` — encapsulation hides internal state`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Flexibility`}),` — polymorphism lets one interface, many behaviors`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Real-world mapping`}),` — BankAccount, Order, User, Product → all objects`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Interview essential`}),` — foundation for LLD / System Design`]})]})]}),(0,m.jsxs)(`p`,{className:`oops-why-foot`,children:[`👉 OOP is the `,(0,m.jsx)(`b`,{children:`foundation`}),` of frameworks like Spring, Hibernate, and the entire Java ecosystem. Master it once, use it everywhere.`]})]})]}),(0,m.jsxs)(`div`,{className:`oops-foundation-section`,children:[(0,m.jsxs)(`div`,{className:`oops-section-header oops-foundation-header`,children:[(0,m.jsx)(`i`,{className:`fas fa-gem`}),` Foundation of OOP`,(0,m.jsx)(`span`,{className:`oops-section-sub`,children:`The starting point — without this, no other OOP concept exists`})]}),(0,m.jsx)(`div`,{className:`oops-topic-grid`,children:p.filter(e=>e.category===`foundation`).map(t=>(0,m.jsx)(h,{topic:t,isActive:t.id===e,onClick:n},t.id))})]}),(0,m.jsxs)(`div`,{className:`oops-pillars-section`,children:[(0,m.jsxs)(`div`,{className:`oops-section-header oops-pillars-header`,children:[(0,m.jsx)(`i`,{className:`fas fa-crown`}),` The 4 Pillars of OOP`,(0,m.jsx)(`span`,{className:`oops-section-sub`,children:`The core building blocks of Object-Oriented Programming`})]}),(0,m.jsx)(`div`,{className:`oops-topic-grid`,children:p.filter(e=>e.category===`pillar`).map(t=>(0,m.jsx)(h,{topic:t,isActive:t.id===e,onClick:n},t.id))})]}),(0,m.jsxs)(`div`,{className:`oops-relations-section`,children:[(0,m.jsxs)(`div`,{className:`oops-section-header oops-relations-header`,children:[(0,m.jsx)(`i`,{className:`fas fa-project-diagram`}),` Class Relationships`,(0,m.jsx)(`span`,{className:`oops-section-sub`,children:`How classes connect, own, and use each other`})]}),(0,m.jsx)(`div`,{className:`oops-topic-grid`,children:p.filter(e=>e.category===`relation`).map(t=>(0,m.jsx)(h,{topic:t,isActive:t.id===e,onClick:n},t.id))})]}),(0,m.jsx)(g,{topic:o,onClose:a}),(0,m.jsxs)(`div`,{className:`oops-footer-note`,children:[(0,m.jsx)(`i`,{className:`fas fa-graduation-cap`}),` Master the Foundation + 4 Pillars + Class Relationships of OOP for System Design — Each concept includes Java code + visual diagram`]})]})}export{g as DetailPanel,h as TopicCard,_ as default};