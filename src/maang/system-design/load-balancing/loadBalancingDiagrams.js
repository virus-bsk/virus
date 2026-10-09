// ===== Load Balancing SVG diagrams =====

export function svgLoadBalancer() {
  return `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
    <defs><marker id="lbArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 Z" fill="#64748b"/></marker></defs>
    <text x="360" y="30" text-anchor="middle" font-size="18" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">Load Balancer</text>
    <text x="360" y="52" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#666">Sits in front of multiple backend servers</text>
    <rect x="260" y="90" width="200" height="70" rx="12" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="360" y="120" text-anchor="middle" font-size="14" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1d4ed8">Load Balancer</text>
    <text x="360" y="142" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Routes requests to servers</text>
    <line x1="310" y1="160" x2="180" y2="220" stroke="#64748b" stroke-width="2" marker-end="url(#lbArrow)"/>
    <line x1="360" y1="160" x2="360" y2="220" stroke="#64748b" stroke-width="2" marker-end="url(#lbArrow)"/>
    <line x1="410" y1="160" x2="540" y2="220" stroke="#64748b" stroke-width="2" marker-end="url(#lbArrow)"/>
    <rect x="80" y="220" width="200" height="80" rx="10" fill="#fef2f2" stroke="#b91c1c" stroke-width="2"/>
    <text x="180" y="255" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">Server A</text>
    <text x="180" y="275" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Healthy</text>
    <rect x="260" y="220" width="200" height="80" rx="10" fill="#fef2f2" stroke="#b91c1c" stroke-width="2"/>
    <text x="360" y="255" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">Server B</text>
    <text x="360" y="275" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Healthy</text>
    <rect x="440" y="220" width="200" height="80" rx="10" fill="#fef2f2" stroke="#b91c1c" stroke-width="2"/>
    <text x="540" y="255" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">Server C</text>
    <text x="540" y="275" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Healthy</text>
    <rect x="80" y="330" width="560" height="60" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>
    <text x="360" y="355" text-anchor="middle" font-size="12" font-weight="700" font-family="Segoe UI,sans-serif" fill="#16a34a">Health Checks - LB pings each server</text>
    <text x="360" y="375" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">NGINX, HAProxy, AWS ALB</text>
  </svg>`;
}

export function svgRoundRobin() {
  return `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
    <defs><marker id="rrArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 Z" fill="#64748b"/></marker></defs>
    <text x="360" y="30" text-anchor="middle" font-size="18" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">Round Robin</text>
    <text x="360" y="52" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#666">Requests rotate through servers in order</text>
    <rect x="260" y="90" width="200" height="70" rx="12" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="360" y="120" text-anchor="middle" font-size="14" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1d4ed8">Load Balancer</text>
    <text x="360" y="142" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Round Robin rotation</text>
    <line x1="310" y1="160" x2="180" y2="220" stroke="#64748b" stroke-width="2" marker-end="url(#rrArrow)"/>
    <line x1="360" y1="160" x2="360" y2="220" stroke="#64748b" stroke-width="2" marker-end="url(#rrArrow)"/>
    <line x1="410" y1="160" x2="540" y2="220" stroke="#64748b" stroke-width="2" marker-end="url(#rrArrow)"/>
    <rect x="80" y="220" width="200" height="80" rx="10" fill="#fef2f2" stroke="#b91c1c" stroke-width="2"/>
    <text x="180" y="250" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">Server A</text>
    <text x="180" y="270" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Req 1, 4, 7</text>
    <rect x="260" y="220" width="200" height="80" rx="10" fill="#fef2f2" stroke="#b91c1c" stroke-width="2"/>
    <text x="360" y="250" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">Server B</text>
    <text x="360" y="270" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Req 2, 5, 8</text>
    <rect x="440" y="220" width="200" height="80" rx="10" fill="#fef2f2" stroke="#b91c1c" stroke-width="2"/>
    <text x="540" y="250" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">Server C</text>
    <text x="540" y="270" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Req 3, 6, 9</text>
    <rect x="80" y="330" width="560" height="60" rx="10" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>
    <text x="360" y="355" text-anchor="middle" font-size="12" font-weight="700" font-family="Segoe UI,sans-serif" fill="#ca8a04">Simple rotation - no load check</text>
    <text x="360" y="375" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Best when all servers are equal</text>
  </svg>`;
}

export function svgLeastConnections() {
  return `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
    <text x="360" y="30" text-anchor="middle" font-size="18" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">Least Connections</text>
    <text x="360" y="52" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#666">Send next request to the least busy server</text>
    <rect x="260" y="90" width="200" height="70" rx="12" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="360" y="120" text-anchor="middle" font-size="14" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1d4ed8">Load Balancer</text>
    <text x="360" y="142" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Picks Server C (2 connections)</text>
    <rect x="80" y="220" width="200" height="90" rx="10" fill="#fef2f2" stroke="#b91c1c" stroke-width="2"/>
    <text x="180" y="250" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">Server A</text>
    <text x="180" y="270" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">5 connections - busy</text>
    <rect x="260" y="220" width="200" height="90" rx="10" fill="#fef2f2" stroke="#b91c1c" stroke-width="2"/>
    <text x="360" y="250" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b91c1c">Server B</text>
    <text x="360" y="270" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">8 connections - busiest</text>
    <rect x="440" y="220" width="200" height="90" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
    <text x="540" y="250" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#16a34a">Server C</text>
    <text x="540" y="270" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">2 connections - next here</text>
    <rect x="80" y="340" width="560" height="60" rx="10" fill="#fefce8" stroke="#ca8a04" stroke-width="1.5"/>
    <text x="360" y="365" text-anchor="middle" font-size="12" font-weight="700" font-family="Segoe UI,sans-serif" fill="#ca8a04">Tracks active connections per server</text>
    <text x="360" y="385" text-anchor="middle" font-size="11" font-family="Segoe UI,sans-serif" fill="#555">Better for uneven request durations</text>
  </svg>`;
}

export function svgForwardProxy() {
  return `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
    <text x="360" y="30" text-anchor="middle" font-size="18" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">Forward Proxy</text>
    <text x="360" y="52" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#666">Sits between clients and the internet</text>
    <rect x="40" y="220" width="160" height="80" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="120" y="255" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1d4ed8">Clients</text>
    <rect x="280" y="220" width="160" height="80" rx="10" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
    <text x="360" y="255" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#b45309">Forward Proxy</text>
    <rect x="520" y="220" width="160" height="80" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
    <text x="600" y="255" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#16a34a">Internet</text>
    <rect x="80" y="330" width="560" height="60" rx="10" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
    <text x="360" y="365" text-anchor="middle" font-size="12" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1d4ed8">Egress control, shared cache, anonymity</text>
  </svg>`;
}

export function svgReverseProxy() {
  return `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
    <text x="360" y="30" text-anchor="middle" font-size="18" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1a1a2e">Reverse Proxy</text>
    <text x="360" y="52" text-anchor="middle" font-size="12" font-family="Segoe UI,sans-serif" fill="#666">Single public endpoint for all backends</text>
    <rect x="40" y="220" width="160" height="80" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="120" y="255" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#1d4ed8">Internet</text>
    <rect x="280" y="220" width="160" height="80" rx="10" fill="#ffedd5" stroke="#c2410c" stroke-width="2"/>
    <text x="360" y="255" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#c2410c">Reverse Proxy</text>
    <rect x="520" y="220" width="160" height="80" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
    <text x="600" y="255" text-anchor="middle" font-size="13" font-weight="700" font-family="Segoe UI,sans-serif" fill="#16a34a">Backends 1-3</text>
    <rect x="80" y="330" width="560" height="60" rx="10" fill="#fff7ed" stroke="#c2410c" stroke-width="1.5"/>
    <text x="360" y="365" text-anchor="middle" font-size="12" font-weight="700" font-family="Segoe UI,sans-serif" fill="#c2410c">TLS, balancing, WAF, rate limits</text>
  </svg>`;
}


