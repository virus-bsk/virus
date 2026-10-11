import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{h as t,r as n,u as r}from"./index-Dka5w6n9.js";/* empty css                 *//* empty css                      */var i=e(t(),1),a=n(),o=[{id:`AUTHN`,name:`Authentication`,icon:`🪪`,tagline:`Who are you?`,accent:`#1d4ed8`,meaning:`Authentication (AuthN) verifies identity: proving the user is who they claim to be. Methods: password + hash (bcrypt/argon2), multi-factor (OTP/TOTP/WebAuthn), passkeys, certificates for machines. AuthN happens BEFORE authorization — first establish who, then decide what they may do.`,analogy:`Airport security: showing your passport + boarding pass with ID check = authentication. Once through, your boarding class decides which lounge you can enter — that's authorization.`,sql:`// Password login done right
// 1. store hashes, never passwords
hash = argon2id(password, salt)

// 2. constant-time compare
if (verify(hash, input)) -> issue session/JWT

// 3. add MFA
totp = TOTP(secret, 30s window)
if (!match(totp)) reject

// 4. protect against brute force
- rate limit login attempts
- generic error messages (no user
  enumeration), lockout / captcha

// Session vs token: cookie+session id
// (server state) vs stateless JWT (below).`},{id:`AUTHZ`,name:`Authorization`,icon:`🔑`,tagline:`What are you allowed to do?`,accent:`#c2410c`,meaning:`Authorization (AuthZ) decides what an authenticated identity may do. Models: RBAC (role-based — admin/editor/viewer), ABAC (attribute-based — 'own department AND business hours'), ACL (per-resource lists), ReBAC (relationship-based, e.g. Google Zanzibar). Enforce on the server for every request — never trust the UI alone.`,analogy:`A hotel key card: it authenticates you at the door, but a standard room card won't open the staff-only kitchen. The card encodes what rooms you may enter — that's authorization.`,sql:`# RBAC
user -> role -> permission
alice(editor) can article:edit

# ABAC (context-aware rules)
allow if user.department == doc.department
    and now() in business_hours

# Always fail closed
if (!allowed(user, action, resource)) {
  return 403;   // deny by default
}

# Defend in depth: check in UI (UX only),
# at the gateway (coarse), and in the
# service (authoritative).`},{id:`OAUTH`,name:`OAuth 2.0`,icon:`🎫`,tagline:`Delegated access without sharing passwords`,accent:`#15803d`,meaning:`OAuth 2.0 is an authorization framework: a user grants a third-party app limited access to their resources without sharing their password. Roles: resource owner, client, authorization server, resource server. Flows: Authorization Code (+PKCE) for web/mobile, Client Credentials for machine-to-machine. OIDC adds authentication (who) on top of OAuth (what).`,analogy:`A hotel valet key: you hand the valet a special key that starts the car but doesn't open the glovebox or the trunk, and it expires tomorrow. You never gave away your master key.`,sql:`# Authorization Code + PKCE (web/mobile)
1. app -> auth server: /authorize
     ?client_id&redirect_uri&scope=orders
     &code_challenge (PKCE)
2. user logs in & approves
3. redirect back with ?code=xyz
4. app -> POST /token (code + verifier)
5. receive access_token (JWT) + refresh_token

# Machine-to-machine (no user)
POST /token  grant_type=client_credentials
-> access_token

# OAuth2 = authorization (what you may do)
# OIDC   = authentication (who you are) —
#   adds id_token on top`},{id:`JWT`,name:`JWT`,icon:`🪙`,tagline:`Signed, self-contained tokens`,accent:`#7c3aed`,meaning:`A JSON Web Token is a signed, self-contained credential: header.payload.signature. The server can verify claims (user id, roles, expiry) without a DB lookup — stateless auth. Signed with HMAC (shared secret) or RSA/ECDSA (public key). Caveats: can't be revoked before expiry, so keep them short-lived and use refresh tokens.`,analogy:`A tamper-proof wristband at a festival: it states your VIP status, signed by the organiser. Gate staff verify it instantly without calling the office — but if you lose the wristband, it's valid until it expires. No calling it in.`,sql:`# Structure: xxxxx.yyyyy.zzzzz
header    : {"alg":"RS256","typ":"JWT"}
payload   : {"sub":"u991","role":"editor",
             "exp":1735689600}
signature : HMAC/RSA(header + "." + payload,
                     secret-or-private-key)

# Flow
login -> server signs JWT -> client stores it
each request: Authorization: Bearer <jwt>
server verifies signature + exp ONLY
  (no session store / DB hit)

# Pitfalls
- never put secrets in payload (base64,
  not encrypted!)
- short expiry (15m) + refresh token
- revocation needs a denylist / versioning`},{id:`ENCR`,name:`Encryption`,icon:`🔒`,tagline:`Protect data at rest & in transit`,accent:`#b45309`,meaning:`Encryption scrambles data so only key-holders can read it. In transit: TLS 1.2/1.3 everywhere (HTTPS, mTLS between services). At rest: AES-256 for databases, disks, and backups. Hashing (SHA-256, bcrypt) is one-way — for passwords and integrity — not the same as encryption. Never roll your own crypto; use managed KMS and rotate keys.`,analogy:`Sending a diary in a locked box (encryption at rest) via an armoured truck (TLS in transit). A fingerprint comparison (hashing) can confirm identity but can't reconstruct the person.`,sql:`# In transit
client --TLS 1.3--> gateway --mTLS--> services
  (mTLS = both sides present certificates,
   zero-trust inside the cluster)

# At rest
- DB encryption: AES-256 (KMS-managed keys)
- field-level: encrypt card/PII columns
- backups: encrypted too!

# Hashing (one-way — NOT encryption)
password -> bcrypt/argon2 -> stored hash
integrity -> SHA-256 checksum

# Key management
KMS stores keys separately from data;
rotate annually & on compromise.`}];function s({topic:e,index:t,isActive:n,onClick:r,total:i}){let o=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:o}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Security`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,i]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),n=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(r,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`🔐 Security `,(0,a.jsx)(`span`,{children:`Fundamentals`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`Authentication, authorization, OAuth2, JWT and encryption — the security must-knows.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🔐 5 core concepts`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🎫 OAuth2 & JWT`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`🔒 Encryption everywhere`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`The 5 Security Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with a real-world analogy and example.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,total:o.length,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:n,onClose:()=>t(null)})]})}export{l as default};