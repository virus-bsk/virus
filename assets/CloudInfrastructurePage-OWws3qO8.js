import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{r as n,s as r}from"./index-BjSszV1C.js";/* empty css                 */var i=e(t(),1),a=n(),o=[{id:`DOCKER`,name:`Docker & Containers`,icon:`🐳`,tagline:`Package app + deps into portable units`,accent:`#1d4ed8`,meaning:`Containers package an application with its runtime, dependencies and config into a portable image that runs identically anywhere — dev laptop, CI, production. Unlike VMs, containers share the host OS kernel, so they start in seconds and use far less resources. Images are built from Dockerfiles and run via isolated processes (namespaces, cgroups).`,analogy:`Shipping containers: standardized boxes that fit any ship, truck, or crane worldwide. Cargo companies don't care what's inside — the box shape is universal. Same for your app in any environment.`,sql:`# Dockerfile (simple web service)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

# Commands
docker build -t myapp:1.0 .
docker run -p 3000:3000 myapp:1.0
docker compose up     # multi-container

# Container vs VM
VM     : full guest OS, GBs, minutes
Container: shared kernel, MBs, seconds
# Registry: Docker Hub, ECR, GCR`},{id:`K8S`,name:`Kubernetes`,icon:`☸️`,tagline:`Orchestrate containers at scale`,accent:`#c2410c`,meaning:`Kubernetes (K8s) orchestrates containers across a cluster: it schedules pods onto nodes, restarts failed ones (self-healing), scales replicas on load, rolls out updates with zero downtime, load-balances via Services, and manages config/secrets. It's the de-facto platform for running microservices at scale.`,analogy:`An airport control tower: it doesn't fly planes itself but continuously decides which plane lands where, reschedules when weather hits, replaces grounded aircraft, and keeps the flow running — you just declare how many flights you want.`,sql:`# Declare desired state (YAML)
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: api
        image: myapp:1.0
        resources:
          requests: { cpu: 250m }

# K8s constantly reconciles:
actual state -> desired state

# Key objects
Pod      : smallest unit (1+ containers)
Service  : stable VIP + load balancing
Ingress  : HTTP routing from outside
HPA      : auto-scale pods on CPU/QPS
StatefulSet: DBs with stable identity
# self-healing, rolling updates,
# service discovery built-in (DNS)`},{id:`MESH`,name:`Service Mesh`,icon:`🕸️`,tagline:`Networking for microservices, out of your code`,accent:`#15803d`,meaning:`A service mesh (Istio, Linkerd) injects a sidecar proxy next to every service pod, handling mTLS encryption, retries, timeouts, circuit breaking, traffic shifting (canary), and telemetry — all via infrastructure config, not application code. App developers write business logic; the mesh standardizes service-to-service communication.`,analogy:`A private postal system for an office campus: every building has a mailroom (sidecar) that handles encryption, tracking, re-delivery, and delivery reports. Departments just drop letters in — no one writes their own courier logic.`,sql:`# Sidecar pattern
[pod] = [app container][envoy proxy]
all in/out traffic flows via envoy:
  - mTLS between every pair (zero trust)
  - retry / timeout / circuit breaker
  - golden metrics per hop (free)

# Traffic management (canary)
VirtualService:
  route:
  - destination: reviews-v2
    weight: 10      # 10% new version
  - destination: reviews-v1
    weight: 90

# Trade-off: operational complexity +
# latency per hop; adopt when microservice
# count makes libraries unreliable.`},{id:`CICD`,name:`CI/CD & Infrastructure as Code`,icon:`⚙️`,tagline:`Ship safely and reproducibly`,accent:`#7c3aed`,meaning:`CI automatically builds and tests every commit; CD deploys those artifacts automatically through environments (dev -> staging -> prod) with strategies like blue-green or canary. Infrastructure as Code (Terraform, CloudFormation) defines servers/networks in versioned files, making environments reproducible and reviewable — no snowflake servers.`,analogy:`A restaurant kitchen with standardized recipes (code): every chef (pipeline) cooks a new dish the same way, tastes it (tests) before serving, and rolls it out to a few tables first (canary) before the whole menu.`,sql:`# Pipeline (GitHub Actions example)
push -> CI:
  1. build & unit tests
  2. build Docker image, push to ECR
  3. integration tests
main -> CD:
  4. deploy to staging (auto)
  5. deploy to prod: canary 5% ->
     watch metrics -> 100%
  6. rollback = redeploy previous tag

# Infrastructure as Code (Terraform)
resource "aws_instance" "api" {
  ami           = var.ami
  instance_type = "t3.micro"
}
# infra in git: review, diff, rollback,
# identical dev/staging/prod`}];function s({topic:e,index:t,isActive:n,onClick:r}){let i=`${e.meaning.slice(0,110)}...`;return(0,a.jsxs)(`article`,{className:`acid-card ${n?`active`:``}`,style:{"--acid-accent":e.accent},onClick:()=>r(e.id),children:[(0,a.jsxs)(`div`,{className:`acid-card-head`,children:[(0,a.jsx)(`span`,{className:`acid-card-letter`,children:e.icon}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h3`,{className:`acid-card-name`,children:e.name}),(0,a.jsx)(`span`,{className:`acid-card-tagline`,children:e.tagline})]})]}),(0,a.jsx)(`p`,{className:`acid-card-summary`,children:i}),(0,a.jsxs)(`div`,{className:`acid-card-actions`,children:[(0,a.jsx)(`button`,{className:`acid-card-btn`,type:`button`,onClick:t=>{t.stopPropagation(),r(e.id)},children:`View details`}),(0,a.jsx)(`span`,{className:`acid-card-badge`,children:`Concept`})]}),(0,a.jsxs)(`span`,{className:`acid-card-index`,children:[t+1,` / `,o.length]}),n&&(0,a.jsx)(`span`,{className:`acid-active-indicator`,children:(0,a.jsx)(`i`,{className:`fas fa-check-circle`})})]})}function c({topic:e,onClose:t}){return e?(0,a.jsx)(`div`,{className:`acid-modal-backdrop`,onClick:t,children:(0,a.jsxs)(`div`,{className:`acid-detail-panel`,onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(`div`,{className:`acid-detail-header`,children:[(0,a.jsxs)(`h2`,{children:[(0,a.jsx)(`span`,{className:`acid-detail-letter`,children:e.icon}),(0,a.jsx)(`span`,{className:`acid-detail-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`acid-detail-sub`,children:[`— `,e.tagline]})]}),(0,a.jsx)(`button`,{className:`acid-close-btn`,onClick:t,"aria-label":`Close details`,children:(0,a.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,a.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,a.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,a.jsxs)(`div`,{className:`acid-modal-scroll-content`,children:[(0,a.jsxs)(`div`,{className:`acid-definition-box`,children:[(0,a.jsx)(`strong`,{children:`📘 Definition:`}),` `,e.meaning]}),(0,a.jsxs)(`div`,{className:`acid-detail-grid`,children:[(0,a.jsxs)(`div`,{className:`acid-info-box`,children:[(0,a.jsx)(`h3`,{children:`Real-world analogy`}),(0,a.jsx)(`p`,{children:e.analogy})]}),(0,a.jsxs)(`div`,{className:`acid-code-box`,children:[(0,a.jsx)(`h3`,{children:`How it works`}),(0,a.jsx)(`pre`,{children:(0,a.jsx)(`code`,{children:e.sql})})]})]})]})]})}):null}function l(){let[e,t]=(0,i.useState)(null),n=o.find(t=>t.id===e),l=e=>{t(t=>t===e?null:e)};return(0,a.jsxs)(`div`,{className:`acid-page`,children:[(0,a.jsxs)(`section`,{className:`acid-hero`,children:[(0,a.jsx)(r,{to:`/maang/system-design-basics`,className:`acid-back`,children:`← Back to System Design Basics`}),(0,a.jsxs)(`h1`,{className:`acid-title`,children:[`Cloud & `,(0,a.jsx)(`span`,{children:`Infrastructure`})]}),(0,a.jsx)(`p`,{className:`acid-subtitle`,children:`Docker, Kubernetes, service mesh, CI/CD and Infrastructure as Code — how modern systems are deployed and run.`}),(0,a.jsxs)(`div`,{className:`acid-chip-row`,children:[(0,a.jsx)(`span`,{className:`acid-chip`,children:`🐳 Docker`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`☸️ Kubernetes`}),(0,a.jsx)(`span`,{className:`acid-chip`,children:`⚙️ CI/CD`})]})]}),(0,a.jsxs)(`section`,{className:`acid-props`,children:[(0,a.jsx)(`h2`,{className:`acid-section-title`,children:`Core Concepts`}),(0,a.jsx)(`p`,{className:`acid-section-sub`,children:`Click any card to open the full explanation with analogy and diagrams.`}),(0,a.jsx)(`div`,{className:`acid-grid`,children:o.map((t,n)=>(0,a.jsx)(s,{topic:t,index:n,isActive:e===t.id,onClick:l},t.id))})]}),(0,a.jsx)(c,{topic:n,onClose:()=>t(null)})]})}export{l as default};