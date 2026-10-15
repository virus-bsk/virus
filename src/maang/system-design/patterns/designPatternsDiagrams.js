// ===== Design Patterns — SVG Diagrams =====
// Each function returns an SVG string matching the page's theme.

export function svgSingleton() {
  return `<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .sp-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .sp-title { font-weight: 700; font-size: 14px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .sp-method { font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .sp-divider { stroke: #ccc; stroke-width: 1; }
        .sp-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .sp-ok { fill: #2e7d32; font-weight: 600; font-size: 12px; font-family: Segoe UI, sans-serif; }
      </style>
    </defs>
    <rect x="30" y="20" width="240" height="220" class="sp-box" />
    <text x="150" y="44" text-anchor="middle" class="sp-title">« singleton »</text>
    <text x="150" y="64" text-anchor="middle" class="sp-title">DatabaseConnection</text>
    <line x1="40" y1="78" x2="260" y2="78" class="sp-divider" />
    <text x="50" y="102" class="sp-method">- instance: static volatile</text>
    <text x="50" y="124" class="sp-method">- connected: boolean</text>
    <line x1="40" y1="140" x2="260" y2="140" class="sp-divider" />
    <text x="50" y="164" class="sp-method">- DatabaseConnection()  (private)</text>
    <text x="50" y="186" class="sp-method" fill="#2e7d32">+ getInstance(): DatabaseConnection</text>
    <text x="50" y="208" class="sp-method">+ connect(): void</text>
    <text x="150" y="240" class="sp-label">ðŸ”’ only one instance ever</text>

    <rect x="330" y="40" width="150" height="90" class="sp-box" />
    <text x="405" y="64" text-anchor="middle" class="sp-title">caller A</text>
    <text x="405" y="88" text-anchor="middle" class="sp-method">getInstance()</text>
    <rect x="330" y="150" width="150" height="90" class="sp-box" />
    <text x="405" y="174" text-anchor="middle" class="sp-title">caller B</text>
    <text x="405" y="198" text-anchor="middle" class="sp-method">getInstance()</text>
    <rect x="330" y="260" width="150" height="60" class="sp-box" />
    <text x="405" y="284" text-anchor="middle" class="sp-title">caller C</text>
    <text x="405" y="304" text-anchor="middle" class="sp-method">getInstance()</text>

    <line x1="480" y1="85" x2="560" y2="130" stroke="#2e7d32" stroke-width="2.5" marker-end="url(#arrowSP)" />
    <line x1="480" y1="195" x2="560" y2="130" stroke="#2e7d32" stroke-width="2.5" marker-end="url(#arrowSP)" />
    <line x1="480" y1="290" x2="560" y2="130" stroke="#2e7d32" stroke-width="2.5" marker-end="url(#arrowSP)" />
    <rect x="570" y="100" width="100" height="60" fill="#a5d6a7" stroke="#2e7d32" stroke-width="2" rx="10" />
    <text x="620" y="124" text-anchor="middle" class="sp-title" fill="#1b5e20">SAME</text>
    <text x="620" y="144" text-anchor="middle" class="sp-method" fill="#1b5e20">instance</text>
    <text x="420" y="340" text-anchor="middle" class="sp-ok">✅ All callers get the identical single object (a == b == c)</text>
    <marker id="arrowSP" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
      <polygon points="0 0, 12 4, 0 8" fill="#2e7d32" />
    </marker>
  </svg>`;
}

export function svgFactory() {
  return `<svg viewBox="0 0 740 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .fy-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .fy-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; }
        .fy-method { font-size: 11px; font-family: monospace; }
        .fy-divider { stroke: #ccc; stroke-width: 1; }
        .fy-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .fy-arrow { stroke: #00695c; stroke-width: 2.5; fill: none; marker-end: url(#arrowFY); }
        .fy-impl { stroke: #6a1b9a; stroke-width: 2; stroke-dasharray: 6,3; fill: none; marker-end: url(#arrowImpl); }
        .fy-dep  { stroke: #00695c; stroke-width: 2; stroke-dasharray: 5,3; fill: none; marker-end: url(#arrowDep); }
        .fy-note { fill: #6a1b9a; font-weight: 600; font-size: 10px; font-family: Segoe UI, sans-serif; }
      </style>
      <marker id="arrowFY" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
      </marker>
      <marker id="arrowImpl" markerWidth="14" markerHeight="12" refX="13" refY="6" orient="auto">
        <polygon points="0 0, 13 6, 0 12" fill="#fff" stroke="#6a1b9a" stroke-width="1.5" />
      </marker>
      <marker id="arrowDep" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polyline points="0 0, 12 4, 0 8" fill="none" stroke="#00695c" stroke-width="1.5" />
      </marker>
    </defs>
    <rect x="20" y="40" width="170" height="110" class="fy-box" />
    <text x="105" y="64" text-anchor="middle" class="fy-title">NotificationFactory</text>
    <line x1="30" y1="76" x2="180" y2="76" class="fy-divider" />
    <text x="40" y="98" class="fy-method" fill="#00695c">+ create(channel)</text>
    <text x="40" y="120" class="fy-method" font-size="10" fill="#888">decides which class</text>

    <rect x="250" y="20" width="160" height="90" class="fy-box" />
    <text x="330" y="44" text-anchor="middle" class="fy-title">«interface»</text>
    <text x="330" y="62" text-anchor="middle" class="fy-title">Notification</text>
    <line x1="260" y1="76" x2="410" y2="76" class="fy-divider" />
    <text x="270" y="98" class="fy-method" font-style="italic">+ send(msg)</text>

    <rect x="460" y="20" width="130" height="90" class="fy-box" />
    <text x="525" y="44" text-anchor="middle" class="fy-title">Email</text>
    <text x="525" y="62" text-anchor="middle" class="fy-title">Notification</text>
    <line x1="470" y1="76" x2="580" y2="76" class="fy-divider" />
    <text x="480" y="98" class="fy-method">implements</text>
    <rect x="460" y="130" width="130" height="90" class="fy-box" />
    <text x="525" y="154" text-anchor="middle" class="fy-title">SMS</text>
    <text x="525" y="172" text-anchor="middle" class="fy-title">Notification</text>
    <line x1="470" y1="186" x2="580" y2="186" class="fy-divider" />
    <text x="480" y="208" class="fy-method">implements</text>
    <rect x="460" y="240" width="130" height="90" class="fy-box" />
    <text x="525" y="264" text-anchor="middle" class="fy-title">Push</text>
    <text x="525" y="282" text-anchor="middle" class="fy-title">Notification</text>
    <line x1="470" y1="296" x2="580" y2="296" class="fy-divider" />
    <text x="480" y="318" class="fy-method">implements</text>

    <!-- Factory DEPENDS ON the «interface» Notification (returns the interface, not concretes) -->
    <line x1="190" y1="80" x2="248" y2="60" class="fy-dep" />
    <text x="196" y="52" class="fy-note">«create» returns</text>
    <text x="196" y="64" class="fy-note">Notification</text>

    <!-- Each concrete class IMPLEMENTS the «interface» Notification (dashed, hollow triangle) -->
    <line x1="458" y1="55" x2="412" y2="52" class="fy-impl" />
    <line x1="458" y1="165" x2="412" y2="66" class="fy-impl" />
    <line x1="458" y1="275" x2="412" y2="80" class="fy-impl" />
    <text x="228" y="140" class="fy-label">client never uses 'new'</text>
    <text x="228" y="156" class="fy-note">factory depends on the interface only</text>
    <rect x="150" y="330" width="420" height="50" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" rx="8" />
    <text x="360" y="350" text-anchor="middle" class="fy-label" fill="#2e7d32">✅ Factory encapsulates creation — add types without touching client</text>
    <text x="360" y="370" class="fy-method" font-size="11" fill="#2e7d32">create("sms") → SMSNotification at runtime</text>
  </svg>`;
}
export function svgBuilder() {
  return `<svg viewBox="0 0 740 360" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .bd-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .bd-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; }
        .bd-method { font-size: 11px; font-family: monospace; }
        .bd-divider { stroke: #ccc; stroke-width: 1; }
        .bd-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .bd-arrow { stroke: #e94560; stroke-width: 2.5; fill: none; marker-end: url(#arrowBD); }
      </style>
      <marker id="arrowBD" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#e94560" />
      </marker>
    </defs>
    <rect x="20" y="30" width="260" height="230" class="bd-box" />
    <text x="150" y="54" text-anchor="middle" class="bd-title">HttpRequest.Builder</text>
    <line x1="30" y1="68" x2="270" y2="68" class="bd-divider" />
    <text x="40" y="92" class="bd-method">- method = "GET"</text>
    <text x="40" y="114" class="bd-method">- url = "/"</text>
    <text x="40" y="136" class="bd-method">- body = ""</text>
    <text x="40" y="158" class="bd-method">- retry = false</text>
    <line x1="30" y1="172" x2="270" y2="172" class="bd-divider" />
    <text x="40" y="196" class="bd-method" fill="#2e7d32">+ method(m): Builder</text>
    <text x="40" y="218" class="bd-method" fill="#2e7d32">+ url(u): Builder</text>
    <text x="40" y="240" class="bd-method" fill="#2e7d32">+ build(): HttpRequest</text>
    <text x="150" y="252" class="bd-label">each setter returns this</text>

    <rect x="340" y="30" width="220" height="230" class="bd-box" />
    <text x="450" y="54" text-anchor="middle" class="bd-title">HttpRequest (immutable)</text>
    <line x1="350" y1="68" x2="550" y2="68" class="bd-divider" />
    <text x="360" y="92" class="bd-method">- final method</text>
    <text x="360" y="114" class="bd-method">- final url</text>
    <text x="360" y="136" class="bd-method">- final body</text>
    <text x="360" y="158" class="bd-method">- final retry</text>
    <line x1="350" y1="172" x2="550" y2="172" class="bd-divider" />
    <text x="360" y="196" class="bd-method">- constructor private</text>
    <text x="360" y="218" class="bd-method">- toString()</text>
    <text x="450" y="252" class="bd-label">built once, no setters</text>
    <line x1="280" y1="140" x2="340" y2="140" class="bd-arrow" />
    <text x="285" y="135" class="bd-label">build()</text>

    <rect x="80" y="300" width="480" height="46" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" rx="8" />
    <text x="320" y="325" text-anchor="middle" class="bd-label" fill="#2e7d32">✅ Fluent chain → one immutable object, optional fields handled</text>
  </svg>`;
}
export function svgObserver() {
  return `<svg viewBox="0 0 740 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .ob-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .ob-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; }
        .ob-method { font-size: 11px; font-family: monospace; }
        .ob-divider { stroke: #ccc; stroke-width: 1; }
        .ob-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .ob-arrow { stroke: #00695c; stroke-width: 2.5; fill: none; marker-end: url(#arrowOB); }
      </style>
      <marker id="arrowOB" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
      </marker>
    </defs>
    <rect x="20" y="30" width="220" height="200" class="ob-box" />
    <text x="130" y="54" text-anchor="middle" class="ob-title">NewsAgency (Subject)</text>
    <line x1="30" y1="68" x2="230" y2="68" class="ob-divider" />
    <text x="40" y="92" class="ob-method">- observers: List&lt;Observer&gt;</text>
    <text x="40" y="114" class="ob-method">- latestNews: String</text>
    <line x1="30" y1="128" x2="230" y2="128" class="ob-divider" />
    <text x="40" y="152" class="ob-method">+ subscribe(o): void</text>
    <text x="40" y="174" class="ob-method">+ unsubscribe(o): void</text>
    <text x="40" y="196" class="ob-method" fill="#2e7d32">+ publish(news): void  → notify all</text>
    <line x1="240" y1="80" x2="320" y2="60" class="ob-arrow" />
    <line x1="240" y1="120" x2="320" y2="170" class="ob-arrow" />
    <line x1="240" y1="200" x2="320" y2="280" class="ob-arrow" />
    <text x="255" y="100" class="ob-label">notify</text>

    <rect x="330" y="20" width="150" height="120" class="ob-box" />
    <text x="405" y="44" text-anchor="middle" class="ob-title">EmailSubscriber</text>
    <line x1="340" y1="58" x2="470" y2="58" class="ob-divider" />
    <text x="350" y="82" class="ob-method">- name: String</text>
    <text x="350" y="104" class="ob-method" fill="#2e7d32">+ update(message): void</text>
    <rect x="330" y="160" width="150" height="120" class="ob-box" />
    <text x="405" y="184" text-anchor="middle" class="ob-title">PushSubscriber</text>
    <line x1="340" y1="198" x2="470" y2="198" class="ob-divider" />
    <text x="350" y="222" class="ob-method">- name: String</text>
    <text x="350" y="244" class="ob-method" fill="#2e7d32">+ update(message): void</text>
    <rect x="330" y="300" width="150" height="80" class="ob-box" />
    <text x="405" y="324" text-anchor="middle" class="ob-title">...more observers</text>

    <text x="330" y="0" class="ob-label" fill="#00695c">implements Observer (update)</text>
  </svg>`;
}
export function svgStrategy() {
  return `<svg viewBox="0 0 740 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .st-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .st-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; }
        .st-method { font-size: 11px; font-family: monospace; }
        .st-divider { stroke: #ccc; stroke-width: 1; }
        .st-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .st-arrow { stroke: #00695c; stroke-width: 2.5; fill: none; marker-end: url(#arrowST); }
        .st-impl { stroke: #6a1b9a; stroke-width: 2; stroke-dasharray: 6,3; fill: none; marker-end: url(#arrowImplST); }
      </style>
      <marker id="arrowST" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
      </marker>
      <marker id="arrowImplST" markerWidth="14" markerHeight="12" refX="13" refY="6" orient="auto">
        <polygon points="0 0, 13 6, 0 12" fill="#fff" stroke="#6a1b9a" stroke-width="1.5" />
      </marker>
    </defs>
    <rect x="20" y="30" width="200" height="140" class="st-box" />
    <text x="120" y="54" text-anchor="middle" class="st-title">Checkout (Context)</text>
    <line x1="30" y1="68" x2="210" y2="68" class="st-divider" />
    <text x="40" y="92" class="st-method">- strategy: PaymentStrategy</text>
    <line x1="30" y1="106" x2="210" y2="106" class="st-divider" />
    <text x="40" y="130" class="st-method">+ setStrategy(s): void</text>
    <text x="40" y="152" class="st-method" fill="#2e7d32">+ checkout(amount): void</text>
    <rect x="250" y="30" width="160" height="120" class="st-box" />
    <text x="330" y="54" text-anchor="middle" class="st-title">«interface»</text>
    <text x="330" y="72" text-anchor="middle" class="st-title">PaymentStrategy</text>
    <line x1="260" y1="86" x2="400" y2="86" class="st-divider" />
    <text x="270" y="110" class="st-method" font-style="italic">+ pay(amount): void</text>
    <rect x="460" y="20" width="140" height="90" class="st-box" />
    <text x="530" y="44" text-anchor="middle" class="st-title">CreditCard</text>
    <text x="530" y="60" text-anchor="middle" class="st-title">Payment</text>
    <line x1="470" y1="74" x2="590" y2="74" class="st-divider" />
    <text x="480" y="96" class="st-method">implements</text>
    <rect x="460" y="125" width="140" height="90" class="st-box" />
    <text x="530" y="149" text-anchor="middle" class="st-title">PayPal</text>
    <text x="530" y="165" text-anchor="middle" class="st-title">Payment</text>
    <line x1="470" y1="179" x2="590" y2="179" class="st-divider" />
    <text x="480" y="201" class="st-method">implements</text>
    <rect x="460" y="230" width="140" height="90" class="st-box" />
    <text x="530" y="254" text-anchor="middle" class="st-title">Crypto</text>
    <text x="530" y="270" text-anchor="middle" class="st-title">Payment</text>
    <line x1="470" y1="284" x2="590" y2="284" class="st-divider" />
    <text x="480" y="306" class="st-method">implements</text>
    <!-- Context delegates to the «interface» (association) -->
    <line x1="220" y1="80" x2="248" y2="60" class="st-arrow" />
    <text x="212" y="120" class="st-label">delegates</text>

    <!-- Each concrete IMPLEMENTS «interface» PaymentStrategy (dashed, hollow triangle, concrete -> interface) -->
    <line x1="458" y1="55" x2="412" y2="52" class="st-impl" />
    <line x1="458" y1="160" x2="412" y2="66" class="st-impl" />
    <line x1="458" y1="270" x2="412" y2="80" class="st-impl" />
    <rect x="70" y="340" width="480" height="46" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" rx="8" />
    <text x="310" y="365" text-anchor="middle" class="st-label" fill="#2e7d32">✅ setStrategy(…) swaps algorithm at runtime — no if/else in checkout()</text>
  </svg>`;
}
export function svgDecorator() {
  return `<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .dc-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .dc-title { font-weight: 700; font-size: 12px; font-family: Segoe UI, sans-serif; }
        .dc-method { font-size: 10px; font-family: monospace; }
        .dc-divider { stroke: #ccc; stroke-width: 1; }
        .dc-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .dc-arrow { stroke: #e94560; stroke-width: 2; fill: none; marker-end: url(#arrowDC); }
      </style>
      <marker id="arrowDC" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#e94560" />
      </marker>
    </defs>
    <rect x="20" y="40" width="150" height="120" class="dc-box" />
    <text x="95" y="62" text-anchor="middle" class="dc-title">«interface» Coffee</text>
    <line x1="30" y1="76" x2="160" y2="76" class="dc-divider" />
    <text x="40" y="98" class="dc-method" font-style="italic">+ cost(): double</text>
    <text x="40" y="118" class="dc-method" font-style="italic">+ description(): String</text>
    <rect x="20" y="200" width="150" height="110" class="dc-box" />
    <text x="95" y="222" text-anchor="middle" class="dc-title">SimpleCoffee</text>
    <line x1="30" y1="236" x2="160" y2="236" class="dc-divider" />
    <text x="40" y="258" class="dc-method">cost = 2.0</text>
    <text x="40" y="278" class="dc-method">"Plain Coffee"</text>
    <line x1="170" y1="100" x2="240" y2="100" class="dc-arrow" />

    <rect x="250" y="40" width="160" height="120" class="dc-box" style="stroke:#6a1b9a;" />
    <text x="330" y="62" text-anchor="middle" class="dc-title" fill="#6a1b9a">CoffeeDecorator</text>
    <line x1="260" y1="76" x2="400" y2="76" class="dc-divider" />
    <text x="270" y="98" class="dc-method">- coffee: Coffee</text>
    <text x="270" y="118" class="dc-method" font-style="italic">wraps a Coffee</text>

    <rect x="250" y="200" width="93" height="100" class="dc-box" />
    <text x="296" y="222" text-anchor="middle" class="dc-title">Milk</text>
    <line x1="260" y1="236" x2="333" y2="236" class="dc-divider" />
    <text x="268" y="256" class="dc-method">+0.5</text>
    <rect x="345" y="200" width="93" height="100" class="dc-box" />
    <text x="391" y="222" text-anchor="middle" class="dc-title">Sugar</text>
    <line x1="355" y1="236" x2="428" y2="236" class="dc-divider" />
    <text x="363" y="256" class="dc-method">+0.2</text>
    <rect x="440" y="200" width="93" height="100" class="dc-box" />
    <text x="486" y="222" text-anchor="middle" class="dc-title">Cream</text>
    <line x1="450" y1="236" x2="523" y2="236" class="dc-divider" />
    <text x="458" y="256" class="dc-method">+0.7</text>

    <line x1="410" y1="90" x2="445" y2="205" class="dc-arrow" />
    <line x1="330" y1="160" x2="296" y2="200" class="dc-arrow" />
    <line x1="330" y1="160" x2="440" y2="210" class="dc-arrow" />
    <line x1="330" y1="160" x2="455" y2="205" class="dc-arrow" />

    <rect x="20" y="340" width="560" height="46" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" rx="8" />
    <text x="300" y="358" text-anchor="middle" class="dc-label" fill="#2e7d32">✅ new WhippedCream(Milk(Sugar(SimpleCoffee()))) stacks behavior</text>
    <text x="300" y="376" class="dc-method" font-size="11" fill="#2e7d32">cost = 2.0 + 0.5 + 0.2 + 0.7 → $3.4</text>
  </svg>`;
}
export function svgAdapter() {
  return `<svg viewBox="0 0 740 380" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .ad-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .ad-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; }
        .ad-method { font-size: 11px; font-family: monospace; }
        .ad-divider { stroke: #ccc; stroke-width: 1; }
        .ad-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .ad-arrow { stroke: #00695c; stroke-width: 2.5; fill: none; marker-end: url(#arrowAD); }
      </style>
      <marker id="arrowAD" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
      </marker>
    </defs>
    <rect x="20" y="40" width="150" height="110" class="ad-box" />
    <text x="95" y="64" text-anchor="middle" class="ad-title">Laptop (Client)</text>
    <line x1="30" y1="78" x2="160" y2="78" class="ad-divider" />
    <text x="40" y="102" class="ad-method">+ acceptUsb(USB)</text>
    <text x="40" y="124" class="ad-method" font-size="10" fill="#888">expects USB interface</text>
    <line x1="170" y1="95" x2="250" y2="95" class="ad-arrow" />

    <rect x="250" y="30" width="150" height="120" class="ad-box" style="stroke:#6a1b9a;" />
    <text x="325" y="54" text-anchor="middle" class="ad-title" fill="#6a1b9a">«interface» USB</text>
    <line x1="260" y1="68" x2="390" y2="68" class="ad-divider" />
    <text x="270" y="92" class="ad-method" font-style="italic">+ connect(): void</text>

    <rect x="440" y="30" width="150" height="120" class="ad-box" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2.5" />
    <text x="515" y="54" text-anchor="middle" class="ad-title" fill="#2e7d32">Adapter</text>
    <line x1="450" y1="68" x2="580" y2="68" class="ad-divider" />
    <text x="460" y="92" class="ad-method">LightningToUSBAdapter</text>
    <text x="460" y="114" class="ad-method">+ connect() → plugLightning()</text>
    <text x="460" y="136" class="ad-method">holds a LightningConnector</text>
    <line x1="400" y1="80" x2="440" y2="80" class="ad-arrow" />
    <line x1="590" y1="90" x2="650" y2="90" class="ad-arrow" />

    <rect x="650" y="30" width="90" height="120" class="ad-box" />
    <text x="695" y="54" text-anchor="middle" class="ad-title">Adaptee</text>
    <text x="700" y="90" text-anchor="middle" class="ad-method">Lightning</text>
    <text x="700" y="108" text-anchor="middle" class="ad-method">Connector</text>
    <text x="700" y="130" text-anchor="middle" class="ad-method">+ plugLightning()</text>

    <rect x="60" y="190" width="560" height="46" fill="#fff3e0" stroke="#e65100" stroke-width="1.5" rx="8" />
    <text x="340" y="208" text-anchor="middle" class="ad-label" fill="#e65100">ðŸ”Œ Client only sees USB — Adapter translates to Lightning</text>
    <text x="340" y="226" class="ad-method" font-size="11" fill="#e65100">Neither Laptop nor LightningConnector is modified</text>

    <rect x="60" y="260" width="560" height="46" fill="#fff3e0" stroke="#e65100" stroke-width="1.5" rx="8" />
    <text x="340" y="278" text-anchor="middle" class="ad-label" fill="#e65100">ðŸ“„ XML → JSON: XMLToJSONAdapter implements DataLoader</text>
    <text x="340" y="296" class="ad-method" font-size="11" fill="#e65100">legacy XML service + modern JSON client, bridged by adapter</text>
  </svg>`;
}
export function svgProxy() {
  return `<svg viewBox="0 0 780 410" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .px-real  { fill: #e3f2fd; stroke: #1565c0; stroke-width: 2; rx: 12; }
        .px-proxy { fill: #fff3e0; stroke: #e65100; stroke-width: 2.5; rx: 12; stroke-dasharray: 5,3; }
        .px-client{ fill: #e8f5e9; stroke: #2e7d32; stroke-width: 2; rx: 12; }
        .px-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .px-iface { font-style: italic; fill: #6a1b9a; }
        .px-method{ font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .px-divider { stroke: #ccc; stroke-width: 1; }
        .px-arrow { stroke: #6a1b9a; stroke-width: 2.5; marker-end: url(#arrowPXY); fill: none; }
        .px-arrow-real { stroke: #1565c0; stroke-width: 2.5; marker-end: url(#arrowPXY2); fill: none; }
        .px-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
      </style>
      <marker id="arrowPXY" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#6a1b9a" />
      </marker>
      <marker id="arrowPXY2" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#1565c0" />
      </marker>
    </defs>

    <text x="390" y="22" text-anchor="middle" class="px-title" font-size="15" fill="#6a1b9a">PROXY PATTERN — Controlled Access</text>

    <rect x="40" y="50" width="220" height="120" class="px-client" />
    <text x="150" y="72" text-anchor="middle" class="px-title">Client</text>
    <line x1="50" y1="84" x2="250" y2="84" class="px-divider" />
    <text x="50" y="104" class="px-method">+ main()</text>
    <text x="50" y="122" class="px-method">Image img = new ProxyImage("a.png")</text>
    <text x="50" y="140" class="px-method">img.display();</text>
    <text x="50" y="158" class="px-method">? lazy loads on first display</text>

    <rect x="310" y="50" width="220" height="120" class="px-proxy" />
    <text x="420" y="72" text-anchor="middle" class="px-title" fill="#e65100">ProxyImage (proxy)</text>
    <line x1="320" y1="84" x2="520" y2="84" class="px-divider" />
    <text x="320" y="104" class="px-method">- filename: String</text>
    <text x="320" y="122" class="px-method">- realImage: RealImage</text>
    <text x="320" y="140" class="px-method">+ display()  ? loads if null</text>
    <text x="320" y="158" class="px-label">controls access / lazy load</text>

    <rect x="580" y="50" width="180" height="120" class="px-real" />
    <text x="670" y="72" text-anchor="middle" class="px-title">RealImage (real)</text>
    <text x="570" y="380" text-anchor="middle" class="px-method" font-size="10" fill="#e65100">
      JDK java.lang.reflect.Proxy creates dynamic proxies at runtime
    </text>
  </svg>`;
}

export function svgChainOfResponsibility() {
  return `<svg viewBox="0 0 800 430" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .cor-client   { fill: #f3e5f5; stroke: #6a1b9a; stroke-width: 2; rx: 12; }
        .cor-handler  { fill: #e3f2fd; stroke: #1565c0; stroke-width: 2; rx: 12; }
        .cor-abstract { fill: #fff8e1; stroke: #f57c00; stroke-width: 2; rx: 12; }
        .cor-title    { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; fill: #1a1a2e; }
        .cor-iface    { font-style: italic; fill: #e65100; }
        .cor-method   { font-size: 11px; font-family: monospace; fill: #1a1a2e; }
        .cor-divider  { stroke: #ccc; stroke-width: 1; }
        .cor-arrow    { stroke: #00695c; stroke-width: 2.5; marker-end: url(#arrowCoR); fill: none; }
        .cor-arrow-back { stroke: #d32f2f; stroke-width: 2; stroke-dasharray: 4,3; marker-end: url(#arrowCoRback); fill: none; }
        .cor-label    { fill: #6a1b9a; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .cor-success  { fill: #2e7d32; font-weight: 700; font-size: 12px; font-family: Segoe UI, sans-serif; }
      </style>
      <marker id="arrowCoR" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
      </marker>
      <marker id="arrowCoRback" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#d32f2f" />
      </marker>
    </defs>

    <!-- Client -->
    <rect x="40" y="50" width="160" height="80" class="cor-client" />
    <text x="120" y="72" text-anchor="middle" class="cor-title" fill="#6a1b9a">Client</text>
    <line x1="50" y1="84" x2="190" y2="84" class="cor-divider" />
    <text x="55" y="104" class="cor-method">Request r = new Request(...)</text>
    <text x="55" y="120" class="cor-method">handler1.handle(r)</text>

    <!-- Abstract Handler -->
    <rect x="260" y="20" width="180" height="70" class="cor-abstract" />
    <text x="350" y="42" text-anchor="middle" class="cor-title cor-iface">«abstract» Handler</text>
    <line x1="270" y1="54" x2="430" y2="54" class="cor-divider" />
    <text x="275" y="76" class="cor-method" font-style="italic">+ setNext(Handler)</text>
    <text x="275" y="92" class="cor-method" font-style="italic">+ handle(Request)</text>

    <!-- Concrete handlers in a chain -->
    <rect x="260" y="120" width="180" height="90" class="cor-handler" />
    <text x="350" y="142" text-anchor="middle" class="cor-title">AuthHandler</text>
    <line x1="270" y1="154" x2="430" y2="154" class="cor-divider" />
    <text x="275" y="174" class="cor-method">if (auth ok) next.handle()</text>
    <text x="275" y="192" class="cor-method">else return "FAIL: auth"</text>

    <rect x="260" y="230" width="180" height="90" class="cor-handler" />
    <text x="350" y="252" text-anchor="middle" class="cor-title">ValidationHandler</text>
    <line x1="270" y1="264" x2="430" y2="264" class="cor-divider" />
    <text x="275" y="284" class="cor-method">if (valid) next.handle()</text>
    <text x="275" y="302" class="cor-method">else return "FAIL: invalid"</text>

    <rect x="260" y="340" width="180" height="70" class="cor-handler" />
    <text x="350" y="362" text-anchor="middle" class="cor-title">SaveHandler</text>
    <line x1="270" y1="374" x2="430" y2="374" class="cor-divider" />
    <text x="275" y="394" class="cor-method">return "OK: saved"</text>

    <!-- Chain arrows (forward) -->
    <line x1="180" y1="90" x2="260" y2="55" class="cor-arrow" />
    <line x1="350" y1="90" x2="350" y2="120" class="cor-arrow" />
    <line x1="350" y1="210" x2="350" y2="230" class="cor-arrow" />
    <line x1="350" y1="320" x2="350" y2="340" class="cor-arrow" />

    <!-- Chain-of-responsibility label -->
    <text x="200" y="50" class="cor-label" fill="#00695c">handles or</text>
    <text x="200" y="65" class="cor-label" fill="#00695c">passes to next</text>

    <rect x="480" y="160" width="280" height="220" fill="#fff" stroke="#302b63" stroke-width="1.5" rx="10" />
    <text x="500" y="186" class="cor-title" fill="#302b63">How the chain works:</text>
    <text x="500" y="210" font-size="11" font-family="monospace" fill="#1a1a2e">1. Client → AuthHandler</text>
    <text x="500" y="230" font-size="11" font-family="monospace" fill="#1a1a2e">2. Auth passes   → Validation</text>
    <text x="500" y="250" font-size="11" font-family="monospace" fill="#1a1a2e">3. Valid         → Save</text>
    <text x="500" y="270" font-size="11" font-family="monospace" fill="#2e7d32">4. Save returns "OK"</text>
    <text x="500" y="296" font-size="11" font-family="Segoe UI,sans-serif" fill="#666" font-style="italic">Each handler either:</text>
    <text x="500" y="314" font-size="11" font-family="Segoe UI,sans-serif" fill="#2e7d32">  • Handles the request, OR</text>
    <text x="500" y="332" font-size="11" font-family="Segoe UI,sans-serif" fill="#2e7d32">  • Passes to the next handler</text>
    <text x="500" y="358" font-size="11" font-family="Segoe UI,sans-serif" fill="#d32f2f">  • No handler knows who is next!</text>

    <rect x="40" y="420" width="720" height="6" fill="#e8f5e9" />
    <text x="400" y="416" text-anchor="middle" class="cor-success">
      ✅ Decouples sender from receiver — each handler decides independently
    </text>
  </svg>`;
}
