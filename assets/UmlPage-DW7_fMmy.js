import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-yz2jrTMK.js";var i=e(t(),1);function a(){return`<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="umlArrInh" markerWidth="12" markerHeight="12" refX="2" refY="6" orient="auto">
        <polygon points="0 0, 12 6, 0 12" fill="white" stroke="#1565c0" stroke-width="1.5" />
      </marker>
      <marker id="umlArrComp" markerWidth="14" markerHeight="12" refX="2" refY="6" orient="auto">
        <polygon points="0 0, 10 0, 10 12, 0 12" fill="#2e7d32" />
      </marker>
    </defs>
    <rect x="40" y="40" width="200" height="140" fill="#fff8e1" stroke="#f57c00" stroke-width="2" rx="10" />
    <text x="140" y="60" text-anchor="middle" font-weight="700" font-size="13" font-family="Segoe UI,sans-serif">Employee</text>
    <line x1="50" y1="72" x2="230" y2="72" stroke="#ccc" />
    <text x="55" y="92" font-size="11" font-family="monospace">- name : String</text>
    <text x="55" y="110" font-size="11" font-family="monospace">- id : int</text>
    <text x="55" y="128" font-size="11" font-family="monospace">- salary : double</text>
    <line x1="50" y1="140" x2="230" y2="140" stroke="#ccc" />
    <text x="55" y="158" font-size="11" font-family="monospace">+ getSalary() : double</text>
    <text x="55" y="174" font-size="11" font-family="monospace">+ setName(n: String)</text>
    <rect x="340" y="40" width="200" height="140" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="10" />
    <text x="440" y="60" text-anchor="middle" font-weight="700" font-size="13" font-family="Segoe UI,sans-serif" fill="#1565c0">Manager</text>
    <line x1="350" y1="72" x2="530" y2="72" stroke="#ccc" />
    <text x="355" y="92" font-size="11" font-family="monospace">- team : List&lt;Employee&gt;</text>
    <text x="355" y="110" font-size="11" font-family="monospace">- bonus : double</text>
    <line x1="350" y1="122" x2="530" y2="122" stroke="#ccc" />
    <text x="355" y="140" font-size="11" font-family="monospace">+ manageTeam()</text>
    <text x="355" y="158" font-size="11" font-family="monospace">+ approveLeave()</text>
    <line x1="340" y1="110" x2="240" y2="110" stroke="#1565c0" stroke-width="2" marker-end="url(#umlArrInh)" />
    <text x="248" y="100" font-size="11" font-weight="600" fill="#1565c0" font-family="Segoe UI,sans-serif">extends</text>
    <rect x="40" y="240" width="220" height="120" fill="#f8f9fc" stroke="#302b63" stroke-width="2" rx="10" />
    <text x="150" y="260" text-anchor="middle" font-weight="700" font-size="13" font-family="Segoe UI,sans-serif">Department</text>
    <line x1="50" y1="272" x2="250" y2="272" stroke="#ccc" />
    <text x="55" y="292" font-size="11" font-family="monospace">- name : String</text>
    <text x="55" y="310" font-size="11" font-family="monospace">- employees : List&lt;Employee&gt;</text>
    <line x1="50" y1="322" x2="250" y2="322" stroke="#ccc" />
    <text x="55" y="342" font-size="11" font-family="monospace">+ addEmployee(e)</text>
    <text x="55" y="358" font-size="11" font-family="monospace">+ listEmployees()</text>
    <line x1="150" y1="240" x2="140" y2="180" stroke="#2e7d32" stroke-width="2" marker-end="url(#umlArrComp)" />
    <text x="60" y="220" font-size="11" font-weight="600" fill="#2e7d32" font-family="Segoe UI,sans-serif">contains 1..*</text>
    <rect x="320" y="240" width="400" height="130" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5" rx="8" />
    <text x="335" y="262" font-size="12" font-weight="700" fill="#1565c0" font-family="Segoe UI,sans-serif">CLASS DIAGRAM NOTATION</text>
    <text x="335" y="285" font-size="11" font-family="monospace">+ public      - private      # protected</text>
    <text x="335" y="305" font-size="11" font-family="monospace">----   association</text>
    <text x="335" y="323" font-size="11" font-family="monospace">---->  directed association</text>
    <text x="335" y="341" font-size="11" font-family="monospace">--|>  inheritance (is-a)</text>
    <text x="335" y="359" font-size="11" font-family="monospace">--*  composition   --o  aggregation</text>
    <text x="335" y="377" font-size="11" font-family="monospace">..>   dependency   ..|> realization</text>
    <rect x="40" y="390" width="680" height="22" fill="#e8f5e9" />
    <text x="380" y="406" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">Static view: classes + attributes + methods + relationships</text>
  </svg>`}function o(){return`<svg viewBox="0 0 780 460" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="seqArr" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
        <polygon points="0 0, 10 4, 0 8" fill="#1565c0" />
      </marker>
      <marker id="seqArrRet" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto">
        <polygon points="0 0, 10 4, 0 8" fill="#2e7d32" />
      </marker>
    </defs>
    <rect x="40"  y="20" width="120" height="36" fill="#f8f9fc" stroke="#302b63" stroke-width="2" rx="10" />
    <text x="100" y="42" text-anchor="middle" font-weight="700" font-size="12" font-family="Segoe UI,sans-serif">:User</text>
    <line x1="100" y1="56" x2="100" y2="440" stroke="#aaa" stroke-width="1" stroke-dasharray="4,4" />
    <rect x="220" y="20" width="140" height="36" fill="#f8f9fc" stroke="#302b63" stroke-width="2" rx="10" />
    <text x="290" y="42" text-anchor="middle" font-weight="700" font-size="12" font-family="Segoe UI,sans-serif">:OrderService</text>
    <line x1="290" y1="56" x2="290" y2="440" stroke="#aaa" stroke-width="1" stroke-dasharray="4,4" />
    <rect x="420" y="20" width="150" height="36" fill="#f8f9fc" stroke="#302b63" stroke-width="2" rx="10" />
    <text x="495" y="42" text-anchor="middle" font-weight="700" font-size="12" font-family="Segoe UI,sans-serif">:PaymentGateway</text>
    <line x1="495" y1="56" x2="495" y2="440" stroke="#aaa" stroke-width="1" stroke-dasharray="4,4" />
    <rect x="620" y="20" width="140" height="36" fill="#f8f9fc" stroke="#302b63" stroke-width="2" rx="10" />
    <text x="690" y="42" text-anchor="middle" font-weight="700" font-size="12" font-family="Segoe UI,sans-serif">:OrderRepo</text>
    <line x1="690" y1="56" x2="690" y2="440" stroke="#aaa" stroke-width="1" stroke-dasharray="4,4" />
    <rect x="285" y="80"  width="10" height="160" fill="#fff3e0" stroke="#e65100" stroke-width="1" />
    <rect x="490" y="120" width="10" height="80"  fill="#fff3e0" stroke="#e65100" stroke-width="1" />
    <rect x="685" y="220" width="10" height="60"  fill="#fff3e0" stroke="#e65100" stroke-width="1" />
    <line x1="100" y1="80" x2="285" y2="80" stroke="#1565c0" stroke-width="2" marker-end="url(#seqArr)" />
    <text x="110" y="74" font-size="10" font-family="monospace">1: placeOrder(order)</text>
    <line x1="290" y1="120" x2="490" y2="120" stroke="#1565c0" stroke-width="2" marker-end="url(#seqArr)" />
    <text x="295" y="114" font-size="10" font-family="monospace">2: processPayment(amount)</text>
    <line x1="495" y1="170" x2="290" y2="170" stroke="#2e7d32" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#seqArrRet)" />
    <text x="305" y="164" font-size="10" font-family="monospace">3: paymentOk</text>
    <line x1="290" y1="220" x2="685" y2="220" stroke="#1565c0" stroke-width="2" marker-end="url(#seqArr)" />
    <text x="300" y="214" font-size="10" font-family="monospace">4: save(order)</text>
    <line x1="690" y1="260" x2="290" y2="260" stroke="#2e7d32" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#seqArrRet)" />
    <text x="300" y="254" font-size="10" font-family="monospace">5: orderSaved</text>
    <line x1="290" y1="300" x2="100" y2="300" stroke="#1565c0" stroke-width="2" marker-end="url(#seqArr)" />
    <text x="110" y="294" font-size="10" font-family="monospace">6: confirm()</text>
    <rect x="40" y="350" width="720" height="80" fill="#fff8e1" stroke="#f57c00" stroke-width="1.5" rx="8" />
    <text x="60" y="372" font-size="12" font-weight="700" fill="#e65100" font-family="Segoe UI,sans-serif">SEQUENCE DIAGRAM - how to read</text>
    <text x="60" y="392" font-size="11" font-family="monospace">- top-to-bottom = time order    - - - - lifelines (dashed)</text>
    <text x="60" y="408" font-size="11" font-family="monospace">|  activations (focus of control)   --->  call   - - ->  return (dashed)</text>
    <text x="60" y="424" font-size="11" font-family="monospace">numbers (1,2,3...) indicate message ordering</text>
  </svg>`}function s(){return`<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">
    <rect x="200" y="40" width="500" height="340" fill="#f8f9fc" stroke="#302b63" stroke-width="2" rx="14" />
    <text x="450" y="62" text-anchor="middle" font-size="14" font-weight="700" fill="#302b63" font-family="Segoe UI,sans-serif">Online Shopping System</text>
    <circle cx="80" cy="170" r="14" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" />
    <line x1="80" y1="184" x2="80" y2="220" stroke="#1565c0" stroke-width="2" />
    <line x1="64" y1="198" x2="96" y2="198" stroke="#1565c0" stroke-width="2" />
    <line x1="80" y1="220" x2="64" y2="248" stroke="#1565c0" stroke-width="2" />
    <line x1="80" y1="220" x2="96" y2="248" stroke="#1565c0" stroke-width="2" />
    <text x="80" y="270" text-anchor="middle" font-size="11" font-weight="600" font-family="Segoe UI,sans-serif">Customer</text>
    <circle cx="700" cy="170" r="14" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" />
    <line x1="700" y1="184" x2="700" y2="220" stroke="#6a1b9a" stroke-width="2" />
    <line x1="684" y1="198" x2="716" y2="198" stroke="#6a1b9a" stroke-width="2" />
    <line x1="700" y1="220" x2="684" y2="248" stroke="#6a1b9a" stroke-width="2" />
    <line x1="700" y1="220" x2="716" y2="248" stroke="#6a1b9a" stroke-width="2" />
    <text x="700" y="270" text-anchor="middle" font-size="11" font-weight="600" font-family="Segoe UI,sans-serif">Admin</text>
    <ellipse cx="320" cy="120" rx="80" ry="22" fill="#fff3e0" stroke="#e65100" stroke-width="2" />
    <text x="320" y="125" text-anchor="middle" font-size="12" font-weight="600" font-family="Segoe UI,sans-serif">Browse Products</text>
    <ellipse cx="320" cy="190" rx="80" ry="22" fill="#fff3e0" stroke="#e65100" stroke-width="2" />
    <text x="320" y="195" text-anchor="middle" font-size="12" font-weight="600" font-family="Segoe UI,sans-serif">Place Order</text>
    <ellipse cx="320" cy="260" rx="80" ry="22" fill="#fff3e0" stroke="#e65100" stroke-width="2" />
    <text x="320" y="265" text-anchor="middle" font-size="12" font-weight="600" font-family="Segoe UI,sans-serif">Make Payment</text>
    <ellipse cx="320" cy="330" rx="80" ry="22" fill="#fff3e0" stroke="#e65100" stroke-width="2" />
    <text x="320" y="335" text-anchor="middle" font-size="12" font-weight="600" font-family="Segoe UI,sans-serif">Track Order</text>
    <ellipse cx="560" cy="150" rx="80" ry="22" fill="#fff3e0" stroke="#e65100" stroke-width="2" />
    <text x="560" y="155" text-anchor="middle" font-size="12" font-weight="600" font-family="Segoe UI,sans-serif">Manage Products</text>
    <ellipse cx="560" cy="240" rx="80" ry="22" fill="#fff3e0" stroke="#e65100" stroke-width="2" />
    <text x="560" y="245" text-anchor="middle" font-size="12" font-weight="600" font-family="Segoe UI,sans-serif">View Reports</text>
    <ellipse cx="560" cy="330" rx="80" ry="22" fill="#fff3e0" stroke="#e65100" stroke-width="2" />
    <text x="560" y="335" text-anchor="middle" font-size="12" font-weight="600" font-family="Segoe UI,sans-serif">Manage Users</text>
    <line x1="98" y1="180" x2="240" y2="120" stroke="#302b63" stroke-width="1.5" />
    <line x1="98" y1="190" x2="240" y2="190" stroke="#302b63" stroke-width="1.5" />
    <line x1="98" y1="195" x2="240" y2="260" stroke="#302b63" stroke-width="1.5" />
    <line x1="98" y1="200" x2="240" y2="330" stroke="#302b63" stroke-width="1.5" />
    <line x1="685" y1="180" x2="640" y2="150" stroke="#302b63" stroke-width="1.5" />
    <line x1="685" y1="190" x2="640" y2="240" stroke="#302b63" stroke-width="1.5" />
    <line x1="685" y1="200" x2="640" y2="330" stroke="#302b63" stroke-width="1.5" />
    <rect x="320" y="395" width="260" height="20" fill="#e8f5e9" />
    <text x="450" y="410" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">Actors connect to Use Cases inside the System boundary</text>
  </svg>`}function c(){return`<svg viewBox="0 0 760 480" xmlns="http://www.w3.org/2000/svg">
    <text x="380" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="#302b63" font-family="Segoe UI,sans-serif">Activity Diagram - Order Processing</text>
    <circle cx="100" cy="80" r="14" fill="#1b5e20" />
    <rect x="160" y="60"  width="160" height="40" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="14" />
    <text x="240" y="86" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="600" fill="#1a1a2e">Receive Order</text>
    <rect x="160" y="130" width="160" height="40" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="14" />
    <text x="240" y="156" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="600" fill="#1a1a2e">Validate Order</text>
    <rect x="160" y="200" width="160" height="40" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="14" />
    <text x="240" y="226" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="600" fill="#1a1a2e">Process Payment</text>
    <polygon points="430,80 480,30 530,80 480,130" fill="#fff3e0" stroke="#e65100" stroke-width="2" />
    <text x="480" y="86" text-anchor="middle" font-size="10" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Payment OK?</text>
    <rect x="600" y="60" width="140" height="40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="14" />
    <text x="670" y="86" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="600" fill="#1a1a2e">Ship Order</text>
    <line x1="120" y1="80"  x2="160" y2="80"  stroke="#302b63" stroke-width="2" marker-end="url(#arrowAD)" />
    <line x1="240" y1="100" x2="240" y2="130" stroke="#302b63" stroke-width="2" marker-end="url(#arrowAD)" />
    <line x1="240" y1="170" x2="240" y2="200" stroke="#302b63" stroke-width="2" marker-end="url(#arrowAD)" />
    <line x1="320" y1="80"  x2="430" y2="80"  stroke="#302b63" stroke-width="2" marker-end="url(#arrowAD)" />
    <line x1="530" y1="80"  x2="600" y2="80"  stroke="#302b63" stroke-width="2" marker-end="url(#arrowAD)" />
    <line x1="480" y1="130" x2="480" y2="200" stroke="#b71c1c" stroke-width="2" marker-end="url(#arrowAD)" stroke-dasharray="4,3" />
    <text x="490" y="170" font-size="11" font-family="Segoe UI,sans-serif" font-weight="700" fill="#b71c1c">[no] - fail</text>
    <defs><marker id="arrowAD" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto"><polygon points="0 0, 12 4, 0 8" fill="#302b63" /></marker></defs>
    <text x="380" y="160" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">Workflow: start - actions - decision - branches - end</text>
  </svg>`}function l(){return`<svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg">
    <text x="380" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="#302b63" font-family="Segoe UI,sans-serif">State Machine - Order Lifecycle</text>
    <circle cx="60" cy="200" r="14" fill="#1b5e20" />
    <rect x="120" y="180" width="110" height="44" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="22" />
    <text x="175" y="207" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Placed</text>
    <rect x="280" y="100" width="110" height="44" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="22" />
    <text x="335" y="127" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Paid</text>
    <rect x="280" y="180" width="110" height="44" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="22" />
    <text x="335" y="207" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Packed</text>
    <rect x="280" y="260" width="110" height="44" fill="#fff3e0" stroke="#e65100" stroke-width="2" rx="22" />
    <text x="335" y="287" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Cancelled</text>
    <rect x="440" y="180" width="110" height="44" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="22" />
    <text x="495" y="207" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Shipped</text>
    <rect x="600" y="180" width="110" height="44" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="22" />
    <text x="655" y="207" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Delivered</text>
    <defs>
      <marker id="arrowSM" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#302b63" />
      </marker>
    </defs>
    <line x1="74" y1="200" x2="120" y2="202" stroke="#302b63" stroke-width="2" marker-end="url(#arrowSM)" />
    <line x1="230" y1="195" x2="280" y2="125" stroke="#302b63" stroke-width="2" marker-end="url(#arrowSM)" />
    <text x="245" y="160" font-size="10" font-family="Segoe UI,sans-serif" font-weight="600" fill="#b71c1c">pay()</text>
    <line x1="335" y1="144" x2="335" y2="180" stroke="#302b63" stroke-width="2" marker-end="url(#arrowSM)" />
    <text x="345" y="166" font-size="10" font-family="Segoe UI,sans-serif" font-weight="600" fill="#b71c1c">pack()</text>
    <line x1="390" y1="202" x2="440" y2="202" stroke="#302b63" stroke-width="2" marker-end="url(#arrowSM)" />
    <text x="402" y="196" font-size="10" font-family="Segoe UI,sans-serif" font-weight="600" fill="#b71c1c">ship()</text>
    <line x1="550" y1="202" x2="600" y2="202" stroke="#302b63" stroke-width="2" marker-end="url(#arrowSM)" />
    <text x="562" y="196" font-size="10" font-family="Segoe UI,sans-serif" font-weight="600" fill="#b71c1c">deliver()</text>
    <line x1="230" y1="218" x2="280" y2="278" stroke="#b71c1c" stroke-width="2" marker-end="url(#arrowSM)" stroke-dasharray="4,3" />
    <text x="240" y="258" font-size="10" font-family="Segoe UI,sans-serif" font-weight="600" fill="#b71c1c">cancel()</text>
    <text x="380" y="345" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">States + transitions triggered by events</text>
  </svg>`}function u(){return`<svg viewBox="0 0 780 360" xmlns="http://www.w3.org/2000/svg">
    <text x="390" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="#302b63" font-family="Segoe UI,sans-serif">Component Diagram - E-commerce</text>
    <circle cx="80" cy="100" r="8" fill="#e65100" />
    <line x1="88" y1="100" x2="180" y2="100" stroke="#e65100" stroke-width="2" />
    <text x="40" y="105" font-size="10" font-family="Segoe UI,sans-serif" font-weight="600" fill="#e65100">UserService</text>
    <circle cx="80" cy="180" r="8" fill="#e65100" />
    <line x1="88" y1="180" x2="180" y2="180" stroke="#e65100" stroke-width="2" />
    <text x="40" y="185" font-size="10" font-family="Segoe UI,sans-serif" font-weight="600" fill="#e65100">OrderService</text>
    <rect x="180" y="80"  width="160" height="44" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="8" />
    <text x="260" y="107" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">UserComponent</text>
    <rect x="180" y="160" width="160" height="44" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="8" />
    <text x="260" y="187" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">OrderComponent</text>
    <rect x="420" y="160" width="160" height="44" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="8" />
    <text x="500" y="187" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">PaymentComponent</text>
    <rect x="420" y="80"  width="160" height="44" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="8" />
    <text x="500" y="107" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">NotificationComponent</text>
    <defs>
      <marker id="arrowCD" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#302b63" />
      </marker>
    </defs>
    <line x1="340" y1="180" x2="420" y2="180" stroke="#302b63" stroke-width="2" marker-end="url(#arrowCD)" />
    <text x="362" y="172" font-size="9" font-family="Segoe UI,sans-serif" font-weight="600" fill="#302b63">uses</text>
    <line x1="340" y1="200" x2="500" y2="124" stroke="#302b63" stroke-width="2" marker-end="url(#arrowCD)" />
    <text x="400" y="160" font-size="9" font-family="Segoe UI,sans-serif" font-weight="600" fill="#302b63">notify</text>
    <text x="390" y="320" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">Components connected through provided/required interfaces</text>
  </svg>`}function d(){return`<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
    <text x="400" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="#302b63" font-family="Segoe UI,sans-serif">Deployment Diagram - 3-tier Web Architecture</text>
    <rect x="40" y="100" width="140" height="60" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="8" />
    <text x="110" y="135" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Client Browser</text>
    <rect x="240" y="80"  width="200" height="100" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="8" />
    <text x="340" y="108" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Web Server</text>
    <rect x="260" y="120" width="160" height="48" fill="#fff3e0" stroke="#e65100" stroke-width="1.5" rx="6" />
    <text x="340" y="150" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#1a1a2e">React SPA .jar</text>
    <rect x="240" y="220" width="200" height="100" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="8" />
    <text x="340" y="248" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">App Server</text>
    <rect x="260" y="260" width="160" height="48" fill="#fff3e0" stroke="#e65100" stroke-width="1.5" rx="6" />
    <text x="340" y="290" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#1a1a2e">Spring Boot .war</text>
    <rect x="500" y="220" width="220" height="100" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="8" />
    <text x="610" y="248" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">DB Server</text>
    <rect x="520" y="260" width="180" height="48" fill="#fff3e0" stroke="#e65100" stroke-width="1.5" rx="6" />
    <text x="610" y="290" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#1a1a2e">MySQL Cluster</text>
    <rect x="500" y="80" width="220" height="100" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="8" />
    <text x="610" y="108" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" font-weight="700" fill="#1a1a2e">Cache Server</text>
    <rect x="520" y="120" width="180" height="48" fill="#fff3e0" stroke="#e65100" stroke-width="1.5" rx="6" />
    <text x="610" y="150" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#1a1a2e">Redis .exe</text>
    <defs>
      <marker id="arrowDP" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#302b63" />
      </marker>
    </defs>
    <line x1="180" y1="130" x2="240" y2="130" stroke="#302b63" stroke-width="2" fill="none" marker-end="url(#arrowDP)" stroke-dasharray="4,3" />
    <line x1="340" y1="180" x2="340" y2="220" stroke="#302b63" stroke-width="2" fill="none" marker-end="url(#arrowDP)" stroke-dasharray="4,3" />
    <line x1="440" y1="270" x2="500" y2="270" stroke="#302b63" stroke-width="2" fill="none" marker-end="url(#arrowDP)" stroke-dasharray="4,3" />
    <line x1="440" y1="140" x2="500" y2="140" stroke="#302b63" stroke-width="2" fill="none" marker-end="url(#arrowDP)" stroke-dasharray="4,3" />
    <text x="400" y="380" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">Nodes (servers) - Artifacts (deployable files) - Connections (protocols)</text>
  </svg>`}function f(){return`<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
    <text x="400" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="#302b63" font-family="Segoe UI,sans-serif">Package Diagram - Layered Architecture</text>
    <rect x="40" y="60" width="220" height="120" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="8" />
    <text x="60" y="84" font-size="13" font-weight="700" fill="#6a1b9a" font-family="Segoe UI,sans-serif">Controllers</text>
    <rect x="60" y="100" width="180" height="32" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5" rx="6" />
    <text x="150" y="120" text-anchor="middle" font-size="10" font-family="monospace" fill="#1a1a2e">UserController</text>
    <rect x="60" y="138" width="180" height="32" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5" rx="6" />
    <text x="150" y="158" text-anchor="middle" font-size="10" font-family="monospace" fill="#1a1a2e">OrderController</text>
    <rect x="290" y="60" width="220" height="120" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="8" />
    <text x="310" y="84" font-size="13" font-weight="700" fill="#6a1b9a" font-family="Segoe UI,sans-serif">Services</text>
    <rect x="310" y="100" width="180" height="32" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5" rx="6" />
    <text x="400" y="120" text-anchor="middle" font-size="10" font-family="monospace" fill="#1a1a2e">UserService</text>
    <rect x="310" y="138" width="180" height="32" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5" rx="6" />
    <text x="400" y="158" text-anchor="middle" font-size="10" font-family="monospace" fill="#1a1a2e">OrderService</text>
    <rect x="540" y="60" width="220" height="120" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="8" />
    <text x="560" y="84" font-size="13" font-weight="700" fill="#6a1b9a" font-family="Segoe UI,sans-serif">Repositories</text>
    <rect x="560" y="100" width="180" height="32" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5" rx="6" />
    <text x="650" y="120" text-anchor="middle" font-size="10" font-family="monospace" fill="#1a1a2e">UserRepository</text>
    <rect x="560" y="138" width="180" height="32" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5" rx="6" />
    <text x="650" y="158" text-anchor="middle" font-size="10" font-family="monospace" fill="#1a1a2e">OrderRepository</text>
    <rect x="170" y="220" width="460" height="120" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="8" />
    <text x="190" y="244" font-size="13" font-weight="700" fill="#6a1b9a" font-family="Segoe UI,sans-serif">Model</text>
    <rect x="190" y="260" width="200" height="32" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5" rx="6" />
    <text x="290" y="280" text-anchor="middle" font-size="10" font-family="monospace" fill="#1a1a2e">User</text>
    <rect x="410" y="260" width="200" height="32" fill="#e3f2fd" stroke="#1565c0" stroke-width="1.5" rx="6" />
    <text x="510" y="280" text-anchor="middle" font-size="10" font-family="monospace" fill="#1a1a2e">Order</text>
    <defs>
      <marker id="arrowPK" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#b71c1c" />
      </marker>
    </defs>
    <line x1="260" y1="116" x2="290" y2="116" stroke="#b71c1c" stroke-width="2" fill="none" marker-end="url(#arrowPK)" />
    <line x1="260" y1="154" x2="290" y2="154" stroke="#b71c1c" stroke-width="2" fill="none" marker-end="url(#arrowPK)" />
    <line x1="510" y1="116" x2="540" y2="116" stroke="#b71c1c" stroke-width="2" fill="none" marker-end="url(#arrowPK)" />
    <line x1="510" y1="154" x2="540" y2="154" stroke="#b71c1c" stroke-width="2" fill="none" marker-end="url(#arrowPK)" />
    <line x1="400" y1="180" x2="290" y2="260" stroke="#b71c1c" stroke-width="2" fill="none" marker-end="url(#arrowPK)" />
    <line x1="430" y1="180" x2="510" y2="260" stroke="#b71c1c" stroke-width="2" fill="none" marker-end="url(#arrowPK)" />
    <text x="400" y="385" text-anchor="middle" font-size="12" font-weight="700" fill="#2e7d32" font-family="Segoe UI,sans-serif">Packages group related classes - show module dependencies</text>
  </svg>`}var p=`https://www.youtube.com/playlist?list=UUTirDqmh7EyUCB8661XdwYw`,m=[{id:`class-diagram`,icon:`fa-th-large`,title:`Class Diagram`,sub:`Structure — static view`,category:`structural`,desc:`Shows classes, their attributes, methods, and the relationships among them.`,definition:`The most common UML diagram. Represents the static structure: classes (name, attributes with type, operations), relationships (inheritance, association, aggregation, composition, dependency), and multiplicities.`,videoLink:p,code:`// ==== CLASS DIAGRAM (structural) ====
// Rendered as boxes with 3 sections: name / attributes / operations

class Employee {                 // +----------+
    private String name;         // | Employee |  <- class name
    private int id;              // +----------+
    private double salary;       // | - name   |  <- attributes
                                 // | - id     |
    public Employee(String n){ } // | - salary |
    public double getSalary(){   // +----------+
        return salary;           // | + Employee  <- operations
    }                            // | + getSalary
    public void setName(String n) { // + setName
        this.name = n;
    }
}

// Relationships to show on the diagram:
//   Employee "1" -------- "1..*" works in "0..*" Department  (association + multiplicity)
//   Manager --> Employee                                        (inheritance)
//   House *-- Room                                             (composition)
//   Car  o-- Wheel                                             (aggregation)
//   Order ..> Logger                                           (dependency, dashed)
`,diagram:a,relation:`Static structure: classes + attributes + operations + relationships`,points:[`3-section box (name/attrs/ops)`,`Visibility: + public, - private, # protected`,`Multiplicity (1, 0..*, 1..*)`,`Association / inheritance / composition arrows`]},{id:`sequence-diagram`,icon:`fa-arrows-alt-v`,title:`Sequence Diagram`,sub:`Behaviour / time-ordered`,category:`behavioral`,desc:`Shows how objects interact over time via messages, in a vertical lifeline timeline.`,definition:`A Sequence diagram maps an object interaction as a vertical timeline: each participant has a lifeline (dashed), activation bars (rectangles), and horizontal arrows for messages, incl. self-calls and returns.`,videoLink:p,code:`/* ==== SEQUENCE DIAGRAM (behavioural, time-ordered) ====
   User         OrderService        PaymentGateway        OrderRepository
    |  placeOrder() |                    |                      |
    |-------------->|  processPayment()  |                      |
    |               |------------------>|                      |
    |               |   paymentOk()     |                      |
    |               |<------------------|                      |
    |               |  save(order)      |                      |
    |               |------------------------------------------->|
    |               |         orderSaved()                       |
    |               |<-------------------------------------------|
    | <confirm>     |                    |                      |
    |<--------------|                    |                      |
--- The vertical dashed lines are LIFELINES.
--- Arrows are MESSAGES sent in time order (top -> bottom).
--- Solid arrows = call, dashed arrow = return.
--- Thin rectangles = ACTIVATION (focus of control).
*/

class OrderService {
    void placeOrder(Order order) {
        boolean ok = pay(order);        // message to PaymentGateway
        if (ok) repository.save(order); // message to OrderRepository
    }
}
`,diagram:o,relation:`Time-ordered messages between objects - lifelines + activation bars`,points:[`Lifelines for each participant`,`Activation bars show focus`,`Call (solid) vs return (dashed) arrows`,`Top-to-bottom time flow`]},{id:`use-case-diagram`,icon:`fa-user-check`,title:`Use-Case Diagram`,sub:`Behaviour / functional view`,category:`behavioral`,desc:`Captures the functional requirements of a system: actors, use cases, and the relationships between them.`,definition:`A Use-Case diagram describes WHAT a system does (not HOW). Actors (stick figures) interact with use cases (ovals) inside a system boundary (rectangle). include reuses a mandatory use case, extend adds optional behavior.`,videoLink:p,code:`// ==== USE-CASE DIAGRAM (behavioural) ====
// Captures functional requirements as ACTORS + USE CASES
//
// Actors (who)  ->  stick figures outside the box
// Use cases     ->  ovals inside the system boundary
// System        ->  rectangle (the "what we're building")
//
// Relationships:
//   -- association : actor connects to use case
//   include        : base use case ALWAYS uses another (mandatory reuse)
//   extend         : base use case OPTIONALLY triggers another
//
// Example - Online Shopping:
//   Customer -- (Browse Products)
//   Customer -- (Place Order) --include--> (Make Payment)
//   Customer -- (Place Order) --extend---> (Apply Coupon)
//   Admin    -- (Manage Inventory)
//   PaymentGateway -- (Make Payment)
`,diagram:s,relation:`What the system does - actors, use cases, system boundary`,points:[`Actors (stick figures) interact with system`,`Use cases = ovals inside system boundary`,`include = mandatory reuse`,`extend = optional behavior`]},{id:`activity-diagram`,icon:`fa-project-diagram`,title:`Activity Diagram`,sub:`Behaviour / workflow`,category:`behavioral`,desc:`Models the workflow / business process as a flowchart of activities, decisions, and parallel actions.`,definition:`An Activity diagram is a flowchart of a process. Start (filled circle) -> Activities (rounded rectangles) -> Decisions (diamonds) -> Fork/Join bars (parallelism) -> End (bull's eye). Perfect for modelling business logic, algorithms, and use-case flows.`,videoLink:p,code:`// ==== ACTIVITY DIAGRAM (behavioural, workflow) ====
// Flowchart of business logic with decisions and parallelism
//
//   (start) -> [Login] -> <valid?> -yes-> <admin?> -yes-> [Admin Panel]
//                                   |                  \\-no-> [User Home]
//                                   \\-no-> [Show Error] -> (end)
//
// Fork/Join bars for PARALLEL work:
//   +----------+
//   | Process  |---> [Send Email]
//   | Order    |--> [Update Inventory]   <-- these run in PARALLEL
//   +----------+
//
// Used to model:
//   * Use-case internals
//   * Business workflows (order -> pay -> ship)
//   * Algorithm steps
//   * Method call flows with parallelism
`,diagram:c,relation:`Workflow / process flow with decisions, forks, joins`,points:[`Start and end nodes`,`Activities = rounded rectangles`,`Decision diamonds, parallel fork/join bars`,`Use for business workflows`]},{id:`state-machine-diagram`,icon:`fa-toggle-on`,title:`State Machine Diagram`,sub:`Behaviour / states of an object`,category:`behavioral`,desc:`Models the lifecycle of a single object: states, events, transitions, and actions.`,definition:`A State Machine diagram (or State-Chart) describes how an object moves through different states in response to events. Useful for object lifecycles (Order -> Pending -> Paid -> Shipped -> Delivered), UI flows, and protocol states.`,videoLink:p,code:`// ==== STATE MACHINE DIAGRAM (behavioural) ====
// Models the LIFECYCLE of ONE object through its states
//
//   (start) --> [Pending] --pay()--> [Paid] --ship()--> [Shipped]
//                                              \\cancel()   |
//                                               \\--------->[Cancelled]
//
// States         = rounded rectangles
// Transitions    = arrows labelled with the EVENT that triggers them
// Initial state  = filled black circle
// Final state    = bull's eye (circle around a filled circle)
//
// Example - Order:
//   Pending   -pay()->    Paid
//   Paid      -ship()->   Shipped
//   Paid      -cancel()-> Cancelled
//   Shipped   -deliver()->Delivered
//   Delivered -refund()-> Refunded
//
// Used for:
//   * Order / payment workflows
//   * User session (logged-out -> logged-in -> expired)
//   * TCP connection states (LISTEN, SYN_SENT, ESTABLISHED, ...)
//   * Vending machine, traffic light, elevator logic
`,diagram:l,relation:`Object lifecycle: states, events and transitions`,points:[`States = rounded rectangles`,`Transitions = arrows labelled with the triggering event`,`Initial (filled circle) and final (bull's eye) states`,`Use for object lifecycles and protocols`]},{id:`component-diagram`,icon:`fa-cubes`,title:`Component Diagram`,sub:`Structural / modules and dependencies`,category:`structural`,desc:`Shows the software modules (components) and the interfaces/dependencies between them.`,definition:`A Component diagram models the high-level software structure: components (rectangles with two small rectangles on the left), provided/required interfaces (lollipops/sockets), and dependency arrows. Helps plan service boundaries and module ownership.`,videoLink:p,code:`// ==== COMPONENT DIAGRAM (structural, architecture) ====
// Models the software as INTERCONNECTED COMPONENTS
//
// Notation:
//   Component     = rectangle with two small rectangles on the left
//   Interface     = small circle (provided = lollipop) or half-circle (required = socket)
//   Dependency    = dashed arrow
//
// Example - Order microservice:
//
//   [API Gateway] ---> [OrderService] ---> [PaymentService]
//                          |  |
//                          |  +--> [InventoryService]
//                          |
//                          +--> [OrderRepository] (DB)
//
//   Each component EXPOSES a provided interface and REQUIRES another.
//   OrderService  --provides--> IOrderApi
//   OrderService  --requires--> IPaymentGateway
//   PaymentService --provides--> IPaymentGateway
//
// Used for:
//   * Microservice / service-oriented architecture
//   * Module ownership in large codebases
//   * Dependency analysis (who depends on whom)
//`,diagram:u,relation:`Components, provided/required interfaces, dependencies`,points:[`Component = rectangle with two side tabs`,`Lollipop = provided interface`,`Socket = required interface`,`Dashed arrows = dependencies`]},{id:`deployment-diagram`,icon:`fa-server`,title:`Deployment Diagram`,sub:`Physical / hardware topology`,category:`structural`,desc:`Shows the physical hardware (nodes) where the software components actually run, and the network links between them.`,definition:`A Deployment diagram maps software artifacts (components) onto physical nodes (servers, containers, devices). Nodes are 3D-style boxes; artifacts are shown inside; arrows are communication paths (TCP, HTTP, etc.). Essential for capacity planning and DevOps.`,videoLink:p,code:`// ==== DEPLOYMENT DIAGRAM (structural, physical view) ====
// Maps software onto HARDWARE / NODES
//
// Notation:
//   Node (device)    = 3D-style box
//   Node (exec env)  = 3D-style box with <<executionEnvironment>> stereotype
//   Artifact         = document with folded corner
//   Connection       = line between nodes (with protocol label)
//
// Example - typical 3-tier web app:
//
//   [Client Browser] ---HTTPS---> [Load Balancer] ---HTTP---> [Web Server]
//                                                                     |
//                                                                [App Server] <----TCP----> [DB Server]
//
// Nodes may be nested:
//   [AWS EC2 Instance]  contains  [Nginx]  contains  [Web App.war]
//   [Docker Container]  contains  [Node.js]
//
// Used for:
//   * Production architecture diagrams
//   * On-call runbooks (where does X run?)
//   * Capacity planning
//`,diagram:d,relation:`Physical view: nodes, artifacts, network connections`,points:[`Nodes = 3D-style boxes (servers, containers)`,`Artifacts inside nodes (war, jar, docker)`,`Connections labelled with protocol (HTTP, TCP, JDBC)`,`Use for architecture and DevOps planning`]},{id:`package-diagram`,icon:`fa-folder-open`,title:`Package Diagram`,sub:`Structural / namespace organisation`,category:`structural`,desc:`Shows how the system is organised into packages (namespaces) and the dependencies between those packages.`,definition:`A Package diagram groups related UML elements (classes, use cases, etc.) into packages (folders). Used to show the high-level module structure of a system, package dependencies, and import directions. Critical for enforcing layered architecture (controller -> service -> repository).`,videoLink:p,code:`// ==== PACKAGE DIAGRAM (structural, namespace view) ====
// Organises the system into PACKAGES (logical folders / namespaces)
//
// Notation:
//   Package      = tabbed folder icon
//   Dependency   = dashed arrow (<<import>>, <<merge>>)
//
// Example - layered Java application:
//
//   +-----------------------+         +---------------------+
//   | com.shop.controller   |         | com.shop.model      |
//   | (REST controllers)    |         | (entities, DTOs)    |
//   +-----------------------+         +---------------------+
//              |                                  ^
//              v                                  |
//   +-----------------------+         +---------------------+
//   | com.shop.service      |-------->| com.shop.repository |
//   | (business logic)      |         | (DB access)         |
//   +-----------------------+         +---------------------+
//              |
//              v
//   +-----------------------+
//   | com.shop.util         |
//   | (helpers, constants)  |
//   +-----------------------+
//
// Used for:
//   * High-level module organisation
//   * Enforcing layered architecture
//   * Identifying cyclic package dependencies (BAD)
`,diagram:f,relation:`Packages, namespace dependencies, layered structure`,points:[`Packages = tabbed folder icons`,`Dashed arrows = package dependencies`,`Use for high-level module layout`,`Detect cyclic package dependencies`]}],h=n(),g=[{key:`association`,label:`Association`,sub:`uses-a (loose connection)`,symbol:`────────`,color:`#1565c0`,desc:`A general link between two classes. Both classes know about each other but live independently.`,example:`Teacher ── Student`},{key:`directed`,label:`Directed Association`,sub:`one-way navigation`,symbol:`───────►`,color:`#0277bd`,desc:`Only one class knows about / navigates to the other. The arrow shows the direction.`,example:`Customer ──► Order`},{key:`aggregation`,label:`Aggregation`,sub:`has-a (weak ownership)`,symbol:`◇───────`,color:`#ef6c00`,desc:`Whole-part relationship where the part CAN exist without the whole. Hollow diamond at the whole side.`,example:`Department ◇── Employee`},{key:`composition`,label:`Composition`,sub:`owns-a (strong ownership)`,symbol:`◆───────`,color:`#c62828`,desc:`Whole-part relationship where the part CANNOT exist without the whole. Filled diamond at the whole side.`,example:`House ◆── Room`},{key:`dependency`,label:`Dependency`,sub:`temporary / weak usage`,symbol:`- - - - ►`,color:`#6a1b9a`,desc:`A class uses another only temporarily (method parameter, local variable). Dashed arrow.`,example:`Controller - - ► Service`},{key:`inheritance`,label:`Inheritance (Generalization)`,sub:`is-a (extends / implements)`,symbol:`────────▷`,color:`#2e7d32`,desc:`Child inherits from parent. Hollow triangle arrow. Also used for interface realization.`,example:`Car ────▷ Vehicle`},{key:`realization`,label:`Realization`,sub:`class implements interface`,symbol:`- - - - -▷`,color:`#00838f`,desc:`A class implements an interface. Dashed line with a hollow triangle arrow.`,example:`ArrayList - - ▷ List`}];function _({rel:e}){return(0,h.jsxs)(`div`,{className:`oops-rel-card`,style:{borderTopColor:e.color},children:[(0,h.jsxs)(`div`,{className:`oops-rel-head`,children:[(0,h.jsx)(`span`,{className:`oops-rel-name`,style:{color:e.color},children:e.label}),(0,h.jsx)(`code`,{className:`oops-rel-symbol`,style:{background:e.color+`15`,color:e.color},children:e.symbol})]}),(0,h.jsx)(`p`,{className:`oops-rel-sub`,children:e.sub}),(0,h.jsx)(`p`,{className:`oops-rel-desc`,children:e.desc}),(0,h.jsxs)(`p`,{className:`oops-rel-example`,children:[(0,h.jsx)(`i`,{className:`fas fa-code`,style:{color:e.color}}),` `,e.example]})]})}function v(){return(0,h.jsxs)(`section`,{className:`oops-relationships-section`,children:[(0,h.jsxs)(`h2`,{className:`oops-category-title`,style:{borderLeftColor:`#e94560`},children:[(0,h.jsx)(`i`,{className:`fas fa-link`,style:{color:`#e94560`}}),`UML Relationships — Quick Reference`]}),(0,h.jsxs)(`p`,{className:`oops-rel-intro`,children:[`Before reading each diagram, learn the`,` `,(0,h.jsx)(`strong`,{children:`standard UML relationships`}),`. Every arrow in UML has a specific meaning — read it before reading the rest of the diagram.`]}),(0,h.jsx)(`div`,{className:`oops-rel-grid`,children:g.map(e=>(0,h.jsx)(_,{rel:e},e.key))})]})}function y({topic:e,isActive:t,onClick:n}){return(0,h.jsxs)(`div`,{className:`oops-topic-card ${t?`active`:``}`,onClick:()=>n(e.id),children:[(0,h.jsx)(`div`,{className:`oops-card-icon`,children:(0,h.jsx)(`i`,{className:`fas ${e.icon}`})}),(0,h.jsx)(`h3`,{children:e.title}),(0,h.jsx)(`span`,{className:`oops-card-sub`,children:e.sub}),(0,h.jsx)(`p`,{children:e.desc}),(0,h.jsxs)(`a`,{className:`oops-video-link`,href:e.videoLink,onClick:e=>e.stopPropagation(),target:`_blank`,rel:`noopener noreferrer`,title:`Watch video`,children:[(0,h.jsx)(`i`,{className:`fas fa-play-circle`}),` Video`]}),(0,h.jsxs)(`span`,{className:`oops-card-tag`,children:[(0,h.jsx)(`i`,{className:`fas fa-diagram-project`}),` UML Diagram`]}),t&&(0,h.jsx)(`span`,{className:`oops-active-indicator`,children:(0,h.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function b({topic:e,onClose:t}){if(!e)return null;let n=e.diagram();return(0,h.jsx)(`div`,{className:`oops-modal-backdrop`,onClick:t,children:(0,h.jsxs)(`div`,{className:`oops-detail-panel modal-visible`,onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(`div`,{className:`oops-detail-header`,children:[(0,h.jsxs)(`h2`,{children:[(0,h.jsx)(`i`,{className:`fas ${e.icon}`}),(0,h.jsx)(`span`,{className:`oops-title-text`,children:e.title}),(0,h.jsxs)(`span`,{className:`oops-detail-sub`,children:[`— `,e.sub]})]}),(0,h.jsx)(`button`,{className:`oops-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,h.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,h.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,h.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,h.jsxs)(`div`,{className:`oops-modal-scroll-content`,children:[(0,h.jsxs)(`div`,{className:`oops-definition-box`,children:[(0,h.jsx)(`strong`,{children:`Definition: `}),e.definition]}),(0,h.jsxs)(`div`,{className:`oops-detail-grid`,children:[(0,h.jsx)(`div`,{children:(0,h.jsxs)(`div`,{className:`oops-code-section`,children:[(0,h.jsxs)(`div`,{className:`oops-code-header`,children:[(0,h.jsxs)(`span`,{children:[(0,h.jsx)(`i`,{className:`fas fa-code`}),` Example`]}),(0,h.jsx)(`span`,{className:`oops-lang-badge`,children:`UML 2.5`})]}),(0,h.jsx)(`pre`,{children:e.code})]})}),(0,h.jsxs)(`div`,{className:`oops-diagram-section`,children:[(0,h.jsxs)(`div`,{className:`oops-diagram-title`,children:[(0,h.jsx)(`i`,{className:`fas fa-project-diagram`}),` `,e.diagramTitle||`UML Diagram`]}),(0,h.jsx)(`div`,{dangerouslySetInnerHTML:{__html:n}}),(0,h.jsxs)(`div`,{className:`oops-relation-line`,children:[(0,h.jsx)(`i`,{className:`fas fa-link`}),` `,e.relation]})]})]}),e.points&&e.points.length>0&&(0,h.jsxs)(`div`,{className:`oops-why-box`,children:[(0,h.jsxs)(`h3`,{children:[(0,h.jsx)(`i`,{className:`fas fa-lightbulb`}),` Key Takeaways`]}),(0,h.jsx)(`ul`,{className:`oops-why-list`,children:e.points.map((e,t)=>(0,h.jsxs)(`li`,{children:[(0,h.jsx)(`i`,{className:`fas fa-check-circle`}),(0,h.jsx)(`span`,{children:e})]},t))})]})]})]})})}function x(){let[e,t]=(0,i.useState)(null),n=m.find(t=>t.id===e)||null,a=m.filter(e=>e.category===`structural`),o=m.filter(e=>e.category===`behavioral`),s=(n,r,i,a)=>(0,h.jsxs)(`div`,{className:`oops-relations-section`,children:[(0,h.jsxs)(`div`,{className:`oops-section-header oops-relations-header`,children:[(0,h.jsx)(`i`,{className:`fas ${r}`}),n,(0,h.jsx)(`span`,{className:`oops-section-sub`,children:i})]}),(0,h.jsx)(`div`,{className:`oops-topic-grid`,children:a.map(n=>(0,h.jsx)(y,{topic:n,isActive:e===n.id,onClick:t},n.id))})]});return(0,h.jsxs)(`div`,{className:`oops-app-wrapper`,children:[(0,h.jsxs)(r,{to:`/maang/system-design-basics`,className:`oops-back`,children:[(0,h.jsx)(`i`,{className:`fas fa-arrow-left`}),` Back to System Design Basics`]}),(0,h.jsxs)(`header`,{className:`oops-main-header`,children:[(0,h.jsxs)(`h1`,{children:[(0,h.jsx)(`i`,{className:`fas fa-project-diagram`}),` UML Diagrams`]}),(0,h.jsx)(`p`,{children:`Unified Modeling Language - the visual language used to design, document & communicate software systems. Master the relationships first, then the 8 essential diagram types.`}),(0,h.jsxs)(`div`,{className:`oops-stats-row`,children:[(0,h.jsxs)(`div`,{className:`oops-stat-box`,children:[(0,h.jsx)(`strong`,{children:`7`}),(0,h.jsx)(`span`,{children:`Relationships`})]}),(0,h.jsxs)(`div`,{className:`oops-stat-box`,children:[(0,h.jsx)(`strong`,{children:m.length}),(0,h.jsx)(`span`,{children:`Diagram Types`})]}),(0,h.jsxs)(`div`,{className:`oops-stat-box`,children:[(0,h.jsx)(`strong`,{children:`8`}),(0,h.jsx)(`span`,{children:`With Examples`})]})]})]}),(0,h.jsx)(v,{}),s(`Structural Diagrams`,`fa-cubes`,`What the system IS - static building blocks`,a),s(`Behavioural Diagrams`,`fa-play-circle`,`What the system DOES - dynamic behaviour & interactions`,o),(0,h.jsxs)(`p`,{className:`oops-footer-note`,children:[(0,h.jsx)(`i`,{className:`fas fa-lightbulb`}),` Learn the 7 relationships first - then every diagram becomes easy to read.`]}),(0,h.jsx)(b,{topic:n,onClose:()=>t(null)})]})}export{x as default};