import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";var i=e(t(),1);function a(){return`<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg">
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
  </svg>`}function o(){return`<svg viewBox="0 0 740 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .fy-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .fy-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; }
        .fy-method { font-size: 11px; font-family: monospace; }
        .fy-divider { stroke: #ccc; stroke-width: 1; }
        .fy-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .fy-arrow { stroke: #00695c; stroke-width: 2.5; fill: none; marker-end: url(#arrowFY); }
      </style>
      <marker id="arrowFY" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
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

    <line x1="190" y1="80" x2="250" y2="50" class="fy-arrow" />
    <line x1="190" y1="80" x2="460" y2="50" class="fy-arrow" />
    <line x1="190" y1="80" x2="460" y2="160" class="fy-arrow" />
    <line x1="190" y1="80" x2="460" y2="280" class="fy-arrow" />
    <text x="210" y="130" class="fy-label">client never uses 'new'</text>
    <rect x="150" y="330" width="420" height="50" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" rx="8" />
    <text x="360" y="350" text-anchor="middle" class="fy-label" fill="#2e7d32">✅ Factory encapsulates creation — add types without touching client</text>
    <text x="360" y="370" class="fy-method" font-size="11" fill="#2e7d32">create("sms") → SMSNotification at runtime</text>
  </svg>`}function s(){return`<svg viewBox="0 0 740 360" xmlns="http://www.w3.org/2000/svg">
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
  </svg>`}function c(){return`<svg viewBox="0 0 740 400" xmlns="http://www.w3.org/2000/svg">
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
  </svg>`}function l(){return`<svg viewBox="0 0 740 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .st-box { fill: #f8f9fc; stroke: #302b63; stroke-width: 2; rx: 12; }
        .st-title { font-weight: 700; font-size: 13px; font-family: Segoe UI, sans-serif; }
        .st-method { font-size: 11px; font-family: monospace; }
        .st-divider { stroke: #ccc; stroke-width: 1; }
        .st-label { fill: #e94560; font-weight: 600; font-size: 11px; font-family: Segoe UI, sans-serif; }
        .st-arrow { stroke: #00695c; stroke-width: 2.5; fill: none; marker-end: url(#arrowST); }
      </style>
      <marker id="arrowST" markerWidth="12" markerHeight="8" refX="12" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="#00695c" />
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
    <line x1="220" y1="80" x2="250" y2="60" class="st-arrow" />
    <line x1="410" y1="60" x2="460" y2="50" class="st-arrow" />
    <line x1="410" y1="80" x2="460" y2="150" class="st-arrow" />
    <line x1="410" y1="100" x2="460" y2="260" class="st-arrow" />
    <text x="210" y="120" class="st-label">delegates</text>
    <rect x="70" y="340" width="480" height="46" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1.5" rx="8" />
    <text x="310" y="365" text-anchor="middle" class="st-label" fill="#2e7d32">✅ setStrategy(…) swaps algorithm at runtime — no if/else in checkout()</text>
  </svg>`}function u(){return`<svg viewBox="0 0 780 410" xmlns="http://www.w3.org/2000/svg">
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
  </svg>`}function d(){return`<svg viewBox="0 0 800 430" xmlns="http://www.w3.org/2000/svg">
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
  </svg>`}var f=`https://www.youtube.com/playlist?list=UUTirDqmh7EyUCB8661XdwYw`,p=[{id:`singleton`,icon:`fa-infinity`,title:`Singleton`,sub:`Creational · one instance`,category:`creational`,desc:`Ensures a class has only one instance and provides a global point of access.`,definition:`Singleton restricts instantiation to a single object with a private constructor and a static getInstance() method. Thread-safe (double-checked locking) variant included.`,videoLink:f,code:`// ===== SINGLETON PATTERN =====

// Thread-safe Singleton with double-checked locking
class DatabaseConnection {
    private static volatile DatabaseConnection instance;
    private boolean connected;

    private DatabaseConnection() {
        // private constructor → no external new
        this.connected = false;
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {              // first check
            synchronized (DatabaseConnection.class) {
                if (instance == null) {      // second check
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

    public void connect() {
        if (!connected) {
            connected = true;
            System.out.println("Connected to primary DB");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        DatabaseConnection a = DatabaseConnection.getInstance();
        DatabaseConnection b = DatabaseConnection.getInstance();

        System.out.println(a == b);   // true — same instance
        a.connect();                  // Connected once
        b.connect();                  // already connected
    }
}`,diagram:a,relation:`🔂 One instance throughout the app — global access point`,points:[`Private constructor`,`Static getInstance() with double-checked locking`,`Thread-safe (volatile field)`,`Used for DB pools, config, logging`]},{id:`factory`,icon:`fa-industry`,title:`Factory Method`,sub:`Creational · object creation`,category:`creational`,desc:`Defines an interface for creating objects but lets subclasses decide which class to instantiate.`,definition:`Factory Method moves the instantiation logic away from the client into a factory. The client depends on the interface, and the factory decides the concrete type — perfect for OCP.`,videoLink:f,code:`// ===== FACTORY METHOD PATTERN =====

// Product interface
interface Notification {
    void send(String message);
}

// Concrete products
class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("📧 Email: " + message);
    }
}
class SMSNotification implements Notification {
    public void send(String message) {
        System.out.println("📱 SMS: " + message);
    }
}
class PushNotification implements Notification {
    public void send(String message) {
        System.out.println("🔔 Push: " + message);
    }
}

// Factory — decides which concrete object to create
class NotificationFactory {
    public static Notification create(String channel) {
        switch (channel) {
            case "email": return new EmailNotification();
            case "sms":   return new SMSNotification();
            case "push":  return new PushNotification();
            default: throw new IllegalArgumentException("Unknown: " + channel);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        // Client never uses 'new' — factory does the work
        Notification n1 = NotificationFactory.create("email");
        n1.send("Welcome!");

        Notification n2 = NotificationFactory.create("push");
        n2.send("New message");
    }
}`,diagram:o,relation:`🏭 Factory decides the concrete object — client hides 'new'`,points:[`Client depends on the interface`,`Factory encapsulates creation logic`,`Easy to add new product types (OCP)`,`Reduces tight coupling`]},{id:`builder`,icon:`fa-layer-group`,title:`Builder`,sub:`Creational · complex objects`,category:`creational`,desc:`Separates object construction from its representation, step by step.`,definition:`Builder lets you construct complex objects piece by piece with a fluent API. Useful when an object has many optional parameters or an awkward constructor.`,videoLink:f,code:`// ===== BUILDER PATTERN =====

class HttpRequest {
    private final String method;
    private final String url;
    private final String body;      // optional
    private final boolean retry;    // optional

    private HttpRequest(Builder b) {
        this.method = b.method;
        this.url = b.url;
        this.body = b.body;
        this.retry = b.retry;
    }

    public String toString() {
        return method + " " + url + " body='" + body + "' retry=" + retry;
    }

    // Fluent Builder
    public static class Builder {
        private String method = "GET"; // defaults
        private String url = "/";
        private String body = "";
        private boolean retry = false;

        public Builder method(String m) { this.method = m; return this; }
        public Builder url(String u)    { this.url = u; return this; }
        public Builder body(String b)   { this.body = b; return this; }
        public Builder retry(boolean r) { this.retry = r; return this; }

        public HttpRequest build() { return new HttpRequest(this); }
    }
}

public class Main {
    public static void main(String[] args) {
        // Only set what you need — fluent chain
        HttpRequest req = new HttpRequest.Builder()
                .method("POST")
                .url("/api/order")
                .body("{\\"userId\\": 1}")
                .retry(true)
                .build();

        System.out.println(req);
        // POST /api/order body='{"userId": 1}' retry=true
    }
}`,diagram:s,relation:`🧱 Fluent step-by-step construction — optional params without megaconstructors`,points:[`Fluent chained setters`,`Immutability after build`,`Handles many optional parameters`,`Improves readability`]},{id:`observer`,icon:`fa-bell`,title:`Observer`,sub:`Behavioural · publish-subscribe`,category:`behavioral`,desc:`Define a one-to-many dependency so when one object changes, its dependents are notified.`,definition:`Observer (publish/subscribe): a Subject maintains a list of Observers and notifies them of state changes. Decouples producer from consumers — new observers can be added without touching the subject.`,videoLink:f,code:`// ===== OBSERVER PATTERN =====
import java.util.*;

interface Observer {
    void update(String message);
}

// Subject (Publisher)
class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    private String latestNews;

    public void subscribe(Observer o) { observers.add(o); }
    public void unsubscribe(Observer o) { observers.remove(o); }

    // When news arrives, notify everyone
    public void publish(String news) {
        this.latestNews = news;
        for (Observer o : observers) {
            o.update(news);
        }
    }
}

// Observers (Subscribers)
class EmailSubscriber implements Observer {
    private String name;
    public EmailSubscriber(String name) { this.name = name; }
    public void update(String message) {
        System.out.println(name + " got email: " + message);
    }
}
class PushSubscriber implements Observer {
    private String name;
    public PushSubscriber(String name) { this.name = name; }
    public void update(String message) {
        System.out.println(name + " got push: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        NewsAgency agency = new NewsAgency();

        Observer alice = new EmailSubscriber("Alice");
        Observer bob   = new PushSubscriber("Bob");

        agency.subscribe(alice);
        agency.subscribe(bob);

        agency.publish("Breaking: AI wins gold!");
        // Alice got email: Breaking...
        // Bob got push: Breaking...
    }
}`,diagram:c,relation:`🔔 Subject notifies observers on change — publish/subscribe`,points:[`One-to-many dependency`,`Observer decoupled from subject`,`New observers added without subject change`,`Event-driven design`]},{id:`strategy`,icon:`fa-bullseye`,title:`Strategy`,sub:`Behavioural · interchangeable algorithms`,category:`behavioral`,desc:`Define a family of algorithms, encapsulate each, and make them interchangeable at runtime.`,definition:`Strategy pattern lets you swap algorithms at runtime by encapsulating them behind an interface. The context delegates to the current strategy — no if/else chains for behavior selection.`,videoLink:f,code:`// ===== STRATEGY PATTERN =====

// Strategy interface
interface PaymentStrategy {
    void pay(double amount);
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    private String cardNo;
    public CreditCardPayment(String cardNo) { this.cardNo = cardNo; }
    public void pay(double amount) {
        System.out.println("💳 Paid $" + amount + " via card " + cardNo);
    }
}
class PayPalPayment implements PaymentStrategy {
    private String email;
    public PayPalPayment(String email) { this.email = email; }
    public void pay(double amount) {
        System.out.println("🌐 Paid $" + amount + " via PayPal " + email);
    }
}
class CryptoPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("🪙 Paid $" + amount + " via Crypto");
    }
}

// Context — uses a chosen strategy
class Checkout {
    private PaymentStrategy strategy;
    public void setStrategy(PaymentStrategy s) { this.strategy = s; }
    public void checkout(double amount) {
        strategy.pay(amount);   // delegate to current strategy
    }
}

public class Main {
    public static void main(String[] args) {
        Checkout cart = new Checkout();

        cart.setStrategy(new CreditCardPayment("4242-****"));
        cart.checkout(100);   // via card

        cart.setStrategy(new PayPalPayment("user@mail.com"));
        cart.checkout(250);   // swap strategy at runtime

        cart.setStrategy(new CryptoPayment());
        cart.checkout(500);
    }
}`,diagram:l,relation:`🎯 Swap algorithms at runtime — no if/else for behavior`,points:[`Encapsulated interchangeable algorithms`,`Runtime strategy switching`,`Follows OCP (add strategy, don't modify)`,`Delegation to current strategy`]},{id:`proxy`,icon:`fa-shield-halved`,title:`Proxy`,sub:`Structural · controlled access`,category:`structural`,desc:`Provide a placeholder or surrogate for another object to control access to it.`,definition:`Proxy provides a surrogate/placeholder for another object to control access. Common types: Virtual (lazy loading), Protection (auth checks), Remote (network), Caching (memoize). Same interface as the real object.`,videoLink:f,code:`// ===== PROXY PATTERN =====
// Proxy controls access to a real object.
// RealImage is heavy (loads from disk); ProxyImage loads lazily + caches.

public class Main {

    // ---- Subject interface (both Real and Proxy implement this) ----
    interface Image {
        void display();
    }

    // ---- Real subject (heavy / expensive to construct) ----
    static class RealImage implements Image {
        private String filename;

        public RealImage(String filename) {
            this.filename = filename;
            loadFromDisk();             // expensive operation
        }

        private void loadFromDisk() {
            System.out.println("Loading image from disk: " + filename);
        }

        public void display() {
            System.out.println("Displaying image: " + filename);
        }
    }

    // ---- Proxy: lazy load + cache ----
    static class ProxyImage implements Image {
        private String filename;
        private RealImage realImage;     // holds the real subject

        public ProxyImage(String filename) {
            this.filename = filename;     // NOT loading yet
        }

        public void display() {
            // Lazy: only create RealImage when first needed
            if (realImage == null) {
                realImage = new RealImage(filename);
            }
            realImage.display();
        }
    }

    public static void main(String[] args) {
        // Client uses the proxy — does NOT know about RealImage
        Image img1 = new ProxyImage("photo1.jpg");
        Image img2 = new ProxyImage("photo2.jpg");

        // First display → triggers loading
        img1.display();
        img1.display();                  // already loaded, no re-load

        img2.display();
    }
}`,diagram:u,relation:`🛡️ Proxy controls access to real subject — lazy load / cache / auth / remote`,points:[`Same interface as the real object`,`Virtual proxy = lazy initialization`,`Protection proxy = access control / auth`,`Caching & remote proxies are common`]},{id:`chain`,icon:`fa-link`,title:`Chain of Responsibility`,sub:`Behavioural · pass the request`,category:`behavioral`,desc:`Pass a request along a chain of handlers until one of them handles it.`,definition:`Chain of Responsibility decouples sender from receiver by giving multiple objects a chance to handle the request. Each handler holds a reference to the next; if it can't handle, it forwards. Common in logging, auth, approval flows, middleware.`,videoLink:f,code:`// ===== CHAIN OF RESPONSIBILITY PATTERN =====
// A support ticket flows through handlers until one resolves it.
//   $50  → Bot handles
//   $500 → Supervisor handles
//   else → Manager handles

public class Main {

    // ---- Request ----
    static class SupportTicket {
        private String issue;
        private int amount;
        public SupportTicket(String issue, int amount) {
            this.issue = issue;
            this.amount = amount;
        }
        public String getIssue() { return issue; }
        public int    getAmount() { return amount; }
    }

    // ---- Abstract Handler ----
    abstract static class SupportHandler {
        protected SupportHandler next;   // link to next handler
        public void setNext(SupportHandler next) { this.next = next; }
        public abstract void handle(SupportTicket t);
        protected void forward(SupportTicket t) {
            if (next != null) next.handle(t);
            else              System.out.println("No one could handle: " + t.getIssue());
        }
    }

    // ---- Concrete Handler 1: Bot (small issues) ----
    static class BotHandler extends SupportHandler {
        public void handle(SupportTicket t) {
            if (t.getAmount() < 100) {
                System.out.println("[Bot]     resolved: " + t.getIssue() + " ($" + t.getAmount() + ")");
            } else {
                forward(t);     // pass to next
            }
        }
    }

    // ---- Concrete Handler 2: Supervisor ----
    static class SupervisorHandler extends SupportHandler {
        public void handle(SupportTicket t) {
            if (t.getAmount() <= 1000) {
                System.out.println("[Sup]     resolved: " + t.getIssue() + " ($" + t.getAmount() + ")");
            } else {
                forward(t);
            }
        }
    }

    // ---- Concrete Handler 3: Manager ----
    static class ManagerHandler extends SupportHandler {
        public void handle(SupportTicket t) {
            System.out.println("[Mgr]     resolved: " + t.getIssue() + " ($" + t.getAmount() + ")");
        }
    }

    public static void main(String[] args) {
        // Build the chain: Bot → Supervisor → Manager
        SupportHandler bot = new BotHandler();
        SupportHandler sup = new SupervisorHandler();
        SupportHandler mgr = new ManagerHandler();
        bot.setNext(sup);
        sup.setNext(mgr);

        // Send tickets — each finds its handler
        bot.handle(new SupportTicket("Reset password",  0));
        bot.handle(new SupportTicket("Refund request",  500));
        bot.handle(new SupportTicket("Server outage",  10000));
    }
}`,diagram:d,relation:`🔗 Request flows through handlers until one processes it`,points:[`Decouples sender from receiver`,`Each handler decides: handle or pass on`,`Easy to add / remove handlers at runtime`,`Used in: middleware, auth, logging, approvals`]}],m=n();function h({topic:e,isActive:t,onClick:n}){return(0,m.jsxs)(`div`,{className:`oops-topic-card ${t?`active`:``}`,onClick:()=>n(e.id),children:[(0,m.jsx)(`div`,{className:`oops-card-icon`,children:(0,m.jsx)(`i`,{className:`fas ${e.icon}`})}),(0,m.jsx)(`h3`,{children:e.title}),(0,m.jsx)(`span`,{className:`oops-card-sub`,children:e.sub}),(0,m.jsx)(`p`,{children:e.desc}),(0,m.jsxs)(`a`,{className:`oops-video-link`,href:e.videoLink,onClick:e=>e.stopPropagation(),title:`Watch video`,children:[(0,m.jsx)(`i`,{className:`fas fa-play-circle`}),` Video`]}),(0,m.jsxs)(`span`,{className:`oops-card-tag`,children:[(0,m.jsx)(`i`,{className:`fas fa-code`}),` Java + UML`]}),t&&(0,m.jsx)(`span`,{className:`oops-active-indicator`,children:(0,m.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function g({topic:e,onClose:t}){if(!e)return null;let n=e.diagram();return(0,m.jsx)(`div`,{className:`oops-modal-backdrop`,onClick:t,children:(0,m.jsxs)(`div`,{className:`oops-detail-panel modal-visible`,onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(`div`,{className:`oops-detail-header`,children:[(0,m.jsxs)(`h2`,{children:[(0,m.jsx)(`i`,{className:`fas ${e.icon}`}),(0,m.jsx)(`span`,{className:`oops-title-text`,children:e.title}),(0,m.jsxs)(`span`,{className:`oops-detail-sub`,children:[`— `,e.sub]})]}),(0,m.jsx)(`button`,{className:`oops-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,m.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,m.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,m.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,m.jsxs)(`div`,{className:`oops-modal-scroll-content`,children:[(0,m.jsxs)(`div`,{className:`oops-definition-box`,children:[(0,m.jsx)(`strong`,{children:`📘 Definition: `}),e.definition]}),(0,m.jsxs)(`div`,{className:`oops-detail-grid`,children:[(0,m.jsx)(`div`,{children:(0,m.jsxs)(`div`,{className:`oops-code-section`,children:[(0,m.jsxs)(`div`,{className:`oops-code-header`,children:[(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fab fa-java`}),` Java Code`]}),(0,m.jsx)(`span`,{className:`oops-lang-badge`,children:`Java 17+`})]}),(0,m.jsx)(`pre`,{children:e.code})]})}),(0,m.jsxs)(`div`,{className:`oops-diagram-section`,children:[(0,m.jsxs)(`div`,{className:`oops-diagram-title`,children:[(0,m.jsx)(`i`,{className:`fas fa-diagram-project`}),` UML Class Diagram`]}),(0,m.jsx)(`div`,{dangerouslySetInnerHTML:{__html:n}}),(0,m.jsxs)(`div`,{className:`oops-diagram-caption`,children:[(0,m.jsx)(`i`,{className:`fas fa-info-circle`}),(0,m.jsx)(`span`,{className:`oops-rel-tag`,children:e.relation}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-arrow-right`}),` `,e.points.join(` • `)]})]})]})]}),(0,m.jsx)(`div`,{className:`oops-key-points`,children:e.points.map((e,t)=>(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),` `,e]},t))})]})]})})}function _(){let[e,t]=(0,i.useState)(null),n=n=>{t(e===n?null:n)},a=()=>t(null),o=p.find(t=>t.id===e);return(0,m.jsxs)(`div`,{className:`oops-app-wrapper`,children:[(0,m.jsx)(r,{to:`/maang/system-design-basics`,className:`oops-back`,children:`← Back to System Design Basics`}),(0,m.jsxs)(`header`,{className:`oops-main-header`,children:[(0,m.jsxs)(`h1`,{children:[(0,m.jsx)(`i`,{className:`fas fa-puzzle-piece`}),` Design Patterns`,(0,m.jsxs)(`span`,{className:`oops-java-badge`,children:[(0,m.jsx)(`i`,{className:`fab fa-java`}),` Java + UML`]})]}),(0,m.jsxs)(`div`,{className:`oops-sub-info`,children:[(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-diagram-project`}),` Creational · Structural · Behavioural`]}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-code`}),` Real Java Examples`]}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`i`,{className:`fas fa-eye`}),` Visual Diagrams`]}),(0,m.jsxs)(`span`,{className:`oops-badge`,children:[(0,m.jsx)(`i`,{className:`fas fa-mouse-pointer`}),` Click any card`]})]})]}),(0,m.jsxs)(`section`,{className:`oops-why-box`,children:[(0,m.jsxs)(`div`,{className:`oops-why-header`,children:[(0,m.jsx)(`i`,{className:`fas fa-lightbulb`}),` Why do we need Design Patterns?`]}),(0,m.jsxs)(`div`,{className:`oops-why-content`,children:[(0,m.jsxs)(`p`,{children:[`Every senior developer eventually solves the same problems:`,(0,m.jsx)(`i`,{children:`"How do I create only one object?"`}),`,`,(0,m.jsx)(`i`,{children:`"How do I notify many components when something changes?"`}),`,`,(0,m.jsx)(`i`,{children:`"How do I add new features without breaking old code?"`}),`. Design patterns are `,(0,m.jsx)(`b`,{children:`proven, reusable solutions`}),` to these recurring problems — battle-tested by millions of developers.`]}),(0,m.jsxs)(`ul`,{className:`oops-why-list`,children:[(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Faster development`}),` — don't reinvent the wheel, use a known solution`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Common vocabulary`}),` — say "use a Factory" instead of explaining 50 lines`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Loose coupling`}),` — components interact via interfaces, easy to swap`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Production-tested`}),` — used in Spring, Hibernate, Java collections, JDK`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`Interview must-know`}),` — asked in every LLD / System Design round`]})]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`i`,{className:`fas fa-check-circle`}),(0,m.jsxs)(`span`,{children:[(0,m.jsx)(`b`,{children:`3 categories`}),` — Creational (how to create), Structural (how to compose), Behavioural (how to communicate)`]})]})]}),(0,m.jsxs)(`p`,{className:`oops-why-foot`,children:[`👉 Real-world usage: `,(0,m.jsx)(`code`,{children:`Runtime.getRuntime()`}),` is a`,(0,m.jsx)(`b`,{children:` Singleton`}),`. `,(0,m.jsx)(`code`,{children:`Calendar.getInstance()`}),` is a`,(0,m.jsx)(`b`,{children:` Factory`}),`. `,(0,m.jsx)(`code`,{children:`StringBuilder`}),` is a `,(0,m.jsx)(`b`,{children:`Builder`}),`.`,(0,m.jsx)(`code`,{children:` java.util.logging`}),` uses `,(0,m.jsx)(`b`,{children:`Observer`}),`.`,(0,m.jsx)(`code`,{children:` Collections.sort(list, comparator)`}),` uses`,(0,m.jsx)(`b`,{children:` Strategy`}),`. `,(0,m.jsx)(`code`,{children:`java.lang.reflect.Proxy`}),` IS the`,(0,m.jsx)(`b`,{children:` Proxy`}),` pattern. `,(0,m.jsx)(`code`,{children:`Servlet filters`}),` form a`,(0,m.jsx)(`b`,{children:` Chain of Responsibility`}),`.`]})]})]}),[{key:`creational`,label:`Creational Patterns`,sub:`How objects are created`,icon:`fa-cubes`,color:`#ff6b6b`},{key:`structural`,label:`Structural Patterns`,sub:`How classes & objects are composed`,icon:`fa-shapes`,color:`#4ecdc4`},{key:`behavioral`,label:`Behavioural Patterns`,sub:`How objects communicate & assign responsibility`,icon:`fa-people-arrows`,color:`#a78bfa`}].map(t=>{let r=p.filter(e=>e.category===t.key);return r.length===0?null:(0,m.jsxs)(`section`,{className:`oops-pattern-category`,children:[(0,m.jsxs)(`div`,{className:`oops-category-header`,style:{"--cat-color":t.color},children:[(0,m.jsx)(`i`,{className:`fas ${t.icon}`}),(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`h2`,{children:t.label}),(0,m.jsx)(`span`,{children:t.sub})]}),(0,m.jsxs)(`span`,{className:`oops-category-count`,children:[r.length,` pattern`,r.length===1?``:`s`]})]}),(0,m.jsx)(`div`,{className:`oops-topic-grid`,children:r.map(t=>(0,m.jsx)(h,{topic:t,isActive:t.id===e,onClick:n},t.id))})]},t.key)}),(0,m.jsx)(g,{topic:o,onClose:a}),(0,m.jsxs)(`div`,{className:`oops-footer-note`,children:[(0,m.jsx)(`i`,{className:`fas fa-graduation-cap`}),` Master Design Patterns for System Design — Each pattern includes Java code + visual diagram`]})]})}export{g as DetailPanel,h as TopicCard,_ as default};