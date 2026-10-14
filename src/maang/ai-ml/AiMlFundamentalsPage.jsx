import { useState } from "react";
import { Link } from "react-router-dom";
import "../system-design/api-design/ApiDesignPage.css";
import "../system-design/acid/AcidPage.css";

/**
 * AiMlFundamentalsPage (Route: /maang/ai-ml-fundamentals).
 *
 * The "AI/ML Fundamentals" topic from the MAANG preparation grid.
 * Covers the core machine-learning interview fundamentals — how learning
 * works, the model lifecycle, the bias/variance trade-off, the key
 * algorithms, neural networks, feature engineering and evaluation —
 * explained as DESIGN + WORKING (no code), with real-world analogies
 * and ASCII diagrams.
 *
 * Reuses the ACID page styling (same card grid + modal detail panel) so it
 * looks identical to the rest of the System Design / Reactive track.
 */

const TOPICS = [
  {
    id: "INTRO",
    name: "What is Machine Learning?",
    icon: "🤖",
    tagline: "Learning rules from examples instead of hand-coding them",
    accent: "#c2410c",
    meaning:
      "Traditional programming: you write explicit rules and feed data to get answers. Machine learning flips it — you feed data AND answers, and the algorithm learns the rules (a model). It works when the rules are too many or too fuzzy to write by hand (recognising faces, predicting prices, filtering spam). A model is just a function with parameters that gets tuned until its predictions match reality.",
    analogy:
      "Teaching a child to spot a cat. You don't hand them a rulebook ('pointy ears + whiskers + ...'). You show hundreds of photos saying 'cat / not cat' until their brain tunes its own internal rule. ML does the same with numbers instead of neurons.",
    sql: `TRADITIONAL PROGRAMMING
   rules + data ──► [program] ──► answers

MACHINE LEARNING
   data + answers ──► [learning algo] ──► rules (a MODEL)
                                          │
   new data ──────────────────────────────┴──► predictions

A MODEL = a function with parameters (weights)
   prediction = f(features ; weights)
   TRAINING = search for weights that minimise error (loss)

WHEN ML (not rules): fuzzy, high-dimensional, pattern-rich problems
   where humans can't write the rule but can label examples.`,
  },
  {
    id: "SUPERVISED",
    name: "Supervised Learning",
    icon: "🎯",
    tagline: "Learn from labelled examples (input → correct output)",
    accent: "#15803d",
    meaning:
      "The most common ML type. Every training example has a label — the correct answer. The model learns the mapping from inputs to labels, then predicts labels for new, unseen inputs. Two flavours: REGRESSION (predict a continuous number: price, temperature) and CLASSIFICATION (predict a category: spam/not, cat/dog). It's 'supervised' because a teacher (the labels) grades every example.",
    analogy:
      "Studying with an answer key. You do practice problems (inputs), check the answer (label), and correct your method until you get them right. The final exam is new questions with no answer key — your score is how well you generalised, not memorised.",
    sql: `SUPERVISED LEARNING
   training set: (x1,y1) (x2,y2) ...   xi = features, yi = label
   model learns  ŷ = f(x)  ≈  y

   REGRESSION  -> continuous output
      house size, location ──► price = ₹52,00,000
   CLASSIFICATION -> discrete category
      email text ──► { spam , not-spam }

WORKED EXAMPLE — predicting house price
   features: [ sqft, bedrooms, locality_rating ]
   label:    price
   learn weights so predicted price ≈ actual price

GOAL: generalise to UNSEEN houses, not memorise the training ones`,
  },
  {
    id: "UNSUPERVISED",
    name: "Unsupervised Learning",
    icon: "🧩",
    tagline: "Find hidden structure in data with no labels",
    accent: "#0e7490",
    meaning:
      "No labels, no teacher — just raw data. The algorithm discovers structure on its own. Two core jobs: CLUSTERING (group similar items: customer segments, topics) and DIMENSIONALITY REDUCTION (compress many features into fewer while keeping the signal: PCA for visualisation, removing noise). Harder to evaluate because there's no ground truth to score against — you judge by whether the groups are useful and interpretable.",
    analogy:
      "Handed a mixed bag of fruit with no names and asked to sort it. Nobody tells you what an 'apple' is — you naturally cluster by colour, shape, size. You invented the categories; whether they're useful depends on the goal.",
    sql: `UNSUPERVISED LEARNING — data has NO labels, just x

   CLUSTERING (group similar points)
      customers ──► [K-means] ──► segment A / B / C
      (each point joins nearest centroid; centroids move; repeat)

   DIMENSIONALITY REDUCTION (compress, keep signal)
      100 features ──► [PCA] ──► 2-3 features (for plotting / speed)

   also: ANOMALY DETECTION (find outliers — fraud, defects)

EVALUATION is subjective (no ground truth):
   are the clusters coherent, useful, interpretable?
   (silhouette score, business usefulness)`,
  },
  {
    id: "LIFECYCLE",
    name: "The ML Pipeline",
    icon: "🔄",
    tagline: "Data → features → train → evaluate → deploy → monitor",
    accent: "#1d4ed8",
    meaning:
      "A model is only as good as the pipeline around it. The lifecycle: collect data → clean it → engineer features → split into train/validation/test → train → tune hyperparameters → evaluate on held-out data → deploy → MONITOR for drift and retrain. Most real ML effort (often ~80%) is data + pipelines, not the algorithm. Picking the algorithm is the easy, visible part.",
    analogy:
      "A factory assembly line. The algorithm is one station. Garbage in = garbage out: if raw material (data) is dirty, no station downstream can save it. And you keep quality-checking the product on the shelf (monitoring), not just at the end of the line.",
    sql: `THE ML PIPELINE (where the effort really goes)
   ┌──────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐
   │ collect  │─►│  clean  │─►│ features │─►│  split   │
   │ raw data │  │ missing │  │ engineer │  │train/val │
   └──────────┘  │ outliers│  └──────────┘  │  /test   │
                 └─────────┘                └────┬─────┘
   ┌──────────┐  ┌─────────┐  ┌──────────┐      │
   │ monitor  │◄─│ deploy  │◄─│ evaluate │◄─────┘
   │ + retrain│  │  API    │  │ tune     │
   └──────────┘  └─────────┘  └──────────┘

DATA SPLIT (never train on your test set!)
   train     : fit the model
   validation: tune hyperparameters / pick model
   test      : final unbiased score, touched ONCE

RULE: ~80% of effort = data + pipeline; the algo is the easy part.`,
  },
  {
    id: "BIASVARIANCE",
    name: "Bias / Variance & Overfitting",
    icon: "⚖️",
    tagline: "The central trade-off: too simple vs too wiggly",
    accent: "#7c3aed",
    meaning:
      "BIAS is error from being too simple (underfitting — misses the real pattern, e.g. a straight line through curved data). VARIANCE is error from being too complex (overfitting — memorises noise, great on training data, terrible on new data). Total error = Bias² + Variance + irreducible noise. You can't minimise both at once; regularisation, more data, and cross-validation manage the balance. The goal is the sweet spot that GENERALISES.",
    analogy:
      "Studying for an exam. UNDERFIT = you only read the chapter titles (too simple, you fail everything). OVERFIT = you memorised the exact practice questions word-for-word (perfect on practice, hopeless on a reworded exam). You want to understand the CONCEPTS so you handle new questions — that's the sweet spot.",
    sql: `THE TRADE-OFF
   Total Error ≈ Bias² + Variance + irreducible noise

   UNDERFIT (high bias)   model too simple
      misses the real pattern; bad on train AND test
      e.g. straight line through curved data
   OVERFIT (high variance) model too complex
      memorises noise; great on train, BAD on test
      e.g. a wiggly line through every training dot
   SWEET SPOT (generalises)  — what you actually want

HOW TO FIX
   underfit  -> more features / a more powerful model
   overfit   -> more data, regularisation (L1/L2), dropout,
                simpler model, early stopping, cross-validation
   cross-validation: rotate the validation fold for a stable estimate`,
  },
  {
    id: "TRAINING",
    name: "How Training Works",
    icon: "⛰️",
    tagline: "Gradient descent — walk downhill on the error",
    accent: "#b45309",
    meaning:
      "Training = an optimisation loop. Start with random weights, make predictions, measure how wrong they are with a LOSS function, compute the gradient (which direction increases error), then step the weights the OPPOSITE way to reduce error. Repeat over the data in batches/epochs. The learning rate controls step size: too big and you overshoot and diverge, too small and training crawls. Backpropagation is how neural nets compute these gradients efficiently.",
    analogy:
      "Lost on a mountain in fog, trying to reach the valley (minimum error). You can't see the bottom, but you feel the slope under your feet and step downhill. Each step = one weight update. Step too big and you leap across the valley; too small and you'll never get down by nightfall. That step size is the learning rate.",
    sql: `THE TRAINING LOOP
   1. start with random weights
   2. predict on a batch
   3. compute LOSS (how wrong: MSE for regression,
      cross-entropy for classification)
   4. compute GRADIENT (slope of the loss surface)
   5. step weights DOWNHILL:  w = w - learning_rate * gradient
   6. repeat for many epochs until loss stops improving

LEARNING RATE (step size)
   too big  -> overshoot, loss explodes (diverges)
   too small-> trains forever, gets stuck
BACKPROP = efficient way to compute all gradients in a neural net

OPTIMISERS: SGD | Momentum | Adam (adaptive per-weight step)`,
  },

  {
    id: "ALGOS",
    name: "Core Algorithms",
    icon: "🧰",
    tagline: "Linear/Logistic, Trees, SVM, KNN, K-means — when to use what",
    accent: "#0d9488",
    meaning:
      "Know the toolbelt. LINEAR REGRESSION fits a straight line (continuous output, interpretable). LOGISTIC REGRESSION outputs a probability for classification (despite the name). DECISION TREES split on feature thresholds (very interpretable) and RANDOM FORESTS / GRADIENT BOOSTING (XGBoost) combine many trees for top accuracy on tabular data. SVM finds the widest separating margin; KNN classifies by nearest neighbours (no training, slow at predict). K-means clusters.",
    analogy:
      "A toolbox. A screwdriver (linear regression) is simple and you can see exactly what it does. A power drill (gradient boosting) is heavier but drives screws faster and better on big jobs. A measuring tape (KNN) does no building — it just compares each new item to the ones already on the wall. Pick the lightest tool that solves the job.",
    sql: `ALGORITHM CHEAT-SHEET

  Linear Regression   continuous output; fast, interpretable
  Logistic Regression classification; outputs a PROBABILITY
  Decision Tree       splits on thresholds; very interpretable
  Random Forest       many trees, averaged; robust, less overfit
  Gradient Boosting   trees learn each other's mistakes (XGBoost);
                      usually best on TABULAR data
  SVM                 widest-margin separator; good in high dims
  KNN                 classify by nearest neighbours; no training,
                      slow prediction; needs feature scaling
  K-means             unsupervised clustering into k groups

  RULE OF THUMB
   tabular numbers   -> start with gradient boosting / random forest
   images / text     -> neural networks / deep learning
   need to explain   -> linear / logistic / decision tree`,
  },
  {
    id: "NEURAL",
    name: "Neural Networks & Deep Learning",
    icon: "🧠",
    tagline: "Layers of simple units learning hierarchical features",
    accent: "#4f46e5",
    meaning:
      "A neural network stacks layers of simple units (neurons): input layer → hidden layers → output. Each unit computes a weighted sum, adds a bias, and passes it through a non-linear ACTIVATION (ReLU, sigmoid) — the non-linearity is what lets it learn curves, not just straight lines. 'Deep' means many hidden layers, which lets it learn a hierarchy: edges → shapes → objects. Deep learning dominates images, speech, and text where feature engineering by hand fails.",
    analogy:
      "A company assembly line. Each worker (neuron) does one tiny job on the item, passes it on; later workers see more assembled pieces. Early workers notice raw edges, middle workers combine them into shapes, the final worker says 'that's a dog'. The activation is each worker's judgement call that keeps the line from collapsing into one flat calculation.",
    sql: `A NEURAL NETWORK
   input ──► [hidden layer 1] ──► [hidden layer 2] ──► output
             (weighted sum + bias, then ACTIVATION) repeated

   one unit:  z = w·x + b  ;  a = activation(z)
   ACTIVATION adds non-linearity (ReLU, sigmoid, tanh)
      -> without it, stacked layers collapse to a single line

   DEPTH = feature hierarchy
      edges -> shapes -> objects   (learned, not hand-coded)

   TYPES
      CNN  (convolutional) images   — shared filters, spatial
      RNN/LSTM sequences/time       — memory of the past
      Transformer  attention        — modern NLP/LLMs (parallel)

   needs: lots of data + compute (GPU); regularise with dropout`,
  },
  {
    id: "FEATURES",
    name: "Features & Preprocessing",
    icon: "🧹",
    tagline: "The model is only as good as the inputs you give it",
    accent: "#0e7490",
    meaning:
      "FEATURES are the input numbers the model learns from. Good feature engineering often beats a fancier algorithm. Preprocessing: handle MISSING values, SCALE features (normalise so big-magnitude columns don't dominate), ENCODE categories (one-hot for text labels), and remove OUTLIERS. Feature selection drops noise. Garbage or un-scaled features are the #1 cause of a model that 'should work but doesn't'.",
    analogy:
      "Cooking. The algorithm is the recipe, but the ingredients (features) decide the dish. Stale vegetables, or measuring flour in kilograms and salt in grams (un-scaled), ruins it no matter how good the recipe is. Cleaning and prepping ingredients is most of the work.",
    sql: `PREPROCESSING CHECKLIST
   1. MISSING values   -> drop, or impute (mean/median/model)
   2. SCALE features   -> standardise / normalise
        (critical for KNN, SVM, neural nets, gradient descent;
         trees don't need it)
   3. ENCODE categories-> one-hot ("red","green","blue" -> 3 columns)
   4. OUTLIERS         -> cap, remove, or transform (log)
   5. FEATURE SELECTION-> drop noise / correlated duplicates

   WHY SCALE MATTERS
   unscaled: salary(50000) drowns out age(30) in distance/gradient
   scaled  : every feature contributes fairly

   FEATURE ENGINEERING often beats a fancier algorithm:
      "price per sqft", "day of week", "text length" ...`,
  },

  {
    id: "EVAL",
    name: "Evaluation & Metrics",
    icon: "📏",
    tagline: "Accuracy lies — pick the metric that matches the cost",
    accent: "#c2410c",
    meaning:
      "Never trust plain ACCURACY on imbalanced data (99% accuracy is useless if 99% of cases are the majority class). Use PRECISION (of those you flagged, how many were right — cost of false alarms) and RECALL (of all real cases, how many you caught — cost of misses); F1 balances them. The CONFUSION MATRIX (TP/FP/TN/FN) is the source of all of these. For regression use MAE/RMSE. Always evaluate on held-out data you never trained on.",
    analogy:
      "Cancer screening. A test that says 'everyone is healthy' is 99% accurate and useless. PRECISION = when it shouts 'cancer', how often it's right. RECALL = of the real cancer patients, how many it caught. Missing a cancer (low recall) is far worse than a false scare (low precision) — so you tune the metric to the cost.",
    sql: `CONFUSION MATRIX (the source of every metric)
                    predicted YES    predicted NO
   actual YES         TP (hit)         FN (missed!)
   actual NO          FP (false alarm) TN (correct)

   Accuracy  = (TP+TN) / total   <- MISLEADING if imbalanced
   Precision = TP / (TP+FP)      "of those flagged, how many right"
   Recall    = TP / (TP+FN)      "of all real cases, how many caught"
   F1        = 2·P·R / (P+R)     balance of the two

   REGRESSION: MAE (avg abs error) | RMSE (penalises big errors)

   RULE: match the metric to the BUSINESS COST
      spam filter   -> precision (don't lose real mail)
      fraud/cancer  -> recall (don't miss the bad ones)
   always score on HELD-OUT test data, never training data`,
  },
  {
    id: "INTERVIEW",
    name: "ML Interview Playbook",
    icon: "🎤",
    tagline: "How to talk about an ML problem end-to-end",
    accent: "#15803d",
    meaning:
      "When asked to 'build an ML system', don't jump to an algorithm. Frame it: (1) define the problem + success metric + business cost, (2) get & label data, (3) build a simple baseline first, (4) engineer features, (5) train & evaluate with the right metric, (6) check for overfitting, (7) deploy + monitor for drift + retrain. Then discuss trade-offs. Interviewers score your REASONING and structure, not whether you named the fanciest model.",
    analogy:
      "A doctor seeing a patient. You don't prescribe the strongest drug first — you take a history (frame the problem), run basic tests (data + baseline), then escalate. And you schedule follow-ups (monitoring) because 'cured today' isn't 'cured forever' (drift). The structured process is the skill.",
    sql: `THE 7-STEP ANSWER SKELETON (say it in order)

  1. FRAME     problem, target, success metric, cost of errors
  2. DATA      sources, labelling, size, quality, leakage check
  3. BASELINE  simplest model first (majority class / mean) —
               it's the bar to beat
  4. FEATURES  what signals, preprocessing, scaling, encoding
  5. TRAIN     algorithm choice + why; validate, don't touch test
  6. EVALUATE  right metric (P/R/F1 or MAE/RMSE); overfit check
  7. DEPLOY    serve it, MONITOR for data drift, RETRAIN

RED FLAGS TO CALL OUT (shows seniority)
  - data leakage (test info sneaking into training)
  - imbalanced classes (accuracy lies -> use recall)
  - overfitting (train great, test poor -> regularise / more data)
  - offline metric != online impact (always A/B test)

ONE-LINER: "Start simple, measure honestly, mind the trade-off,
            and never stop monitoring after you ship."`,
  },
];


function TopicCard({ topic, index, isActive, onClick, total }) {
  const shortMeaning = `${topic.meaning.slice(0, 110)}...`;

  return (
    <article
      className={`acid-card ${isActive ? "active" : ""}`}
      style={{ "--acid-accent": topic.accent }}
      onClick={() => onClick(topic.id)}
    >
      <div className="acid-card-head">
        <span className="acid-card-letter api-topic-icon">{topic.icon}</span>
        <div>
          <h3 className="acid-card-name">{topic.name}</h3>
          <span className="acid-card-tagline">{topic.tagline}</span>
        </div>
      </div>

      <p className="acid-card-summary">{shortMeaning}</p>

      <div className="acid-card-actions">
        <button
          className="acid-card-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick(topic.id);
          }}
        >
          View details
        </button>
        <span className="acid-card-badge">AI/ML</span>
      </div>

      <span className="acid-card-index">
        {index + 1} / {total}
      </span>
      {isActive && (
        <span className="acid-active-indicator">
          <i className="fas fa-check-circle" />
        </span>
      )}
    </article>
  );
}

function DetailPanel({ topic, onClose }) {
  if (!topic) return null;

  return (
    <div className="acid-modal-backdrop" onClick={onClose}>
      <div className="acid-detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="acid-detail-header">
          <h2>
            <span className="acid-detail-letter api-topic-icon">
              {topic.icon}
            </span>
            <span className="acid-detail-title">{topic.name}</span>
            <span className="acid-detail-sub">— {topic.tagline}</span>
          </h2>
          <button
            className="acid-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="acid-modal-scroll-content">
          <div className="acid-definition-box">
            <strong>📘 Definition:</strong> {topic.meaning}
          </div>

          <div className="acid-detail-grid">
            <div className="acid-info-box">
              <h3>Real-world analogy</h3>
              <p>{topic.analogy}</p>
            </div>

            <div className="acid-code-box">
              <h3>Design &amp; working</h3>
              <pre>
                <code>{topic.sql}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiMlFundamentalsPage() {
  const [activeId, setActiveId] = useState(null);
  const activeTopic = TOPICS.find((topic) => topic.id === activeId);

  const handleClick = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <div className="acid-page">
      {/* ===== HERO ===== */}
      <section className="acid-hero">
        <Link to="/maang" className="acid-back">
          ← Back to MAANG Preparation
        </Link>
        <h1 className="acid-title">
          AI/ML <span>Fundamentals</span>
        </h1>
        <p className="acid-subtitle">
          Machines that learn from data. <strong>Supervised</strong> ·{" "}
          <strong>Unsupervised</strong> · <strong>Bias/Variance</strong> ·{" "}
          <strong>Training</strong> · <strong>Algorithms</strong> ·{" "}
          <strong>Neural Nets</strong> · <strong>Evaluation</strong>
        </p>

        <div className="acid-chip-row">
          <span className="acid-chip">🧩 11 core concepts</span>
          <span className="acid-chip">⚡ Design &amp; working only</span>
          <span className="acid-chip">🔥 Real-world analogies</span>
        </div>
      </section>

      {/* ===== SIMPLE DEFINITION ===== */}
      <section className="acid-define">
        <h2>🤔 What is Machine Learning in one line?</h2>
        <p>
          Instead of hand-writing rules, you <b>feed data and answers</b> and let
          an algorithm learn the rules (a <b>model</b>) — then use that model to
          predict on new data. The whole game is a trade-off between{" "}
          <b>bias</b> (too simple) and <b>variance</b> (too wiggly), judged by
          how well it <b>generalises</b> to data it has never seen.
        </p>
        <div className="acid-one-liner">
          💡 Traditional programming = you give <b>rules</b>, get answers. ML =
          you give <b>data + answers</b>, get the rules. Like learning to spot a
          cat from examples, not from a rulebook.
        </div>
      </section>

      {/* ===== TOPIC CARDS ===== */}
      <section className="acid-props">
        <h2 className="acid-section-title">The 11 AI/ML Concepts</h2>
        <p className="acid-section-sub">
          Click any card to open the full explanation with a real-world analogy
          and an ASCII diagram of how it works.
        </p>
        <div className="acid-grid">
          {TOPICS.map((topic, i) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={i}
              total={TOPICS.length}
              isActive={activeId === topic.id}
              onClick={handleClick}
            />
          ))}
        </div>
      </section>

      <DetailPanel topic={activeTopic} onClose={() => setActiveId(null)} />
    </div>
  );
}

export default AiMlFundamentalsPage;

