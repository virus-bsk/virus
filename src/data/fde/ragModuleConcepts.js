// RAG Systems & Vector Intelligence — full concept list for FDE Module 3.
// Same shape as pythonModuleConcepts: id, title, category, level,
// description, why, when, code. Rendered by FDEPythonCourse.

export const ragModuleConcepts = [
  {
    id: 1,
    title: "Embeddings: text-embedding-3, sentence-transformers, BGE",
    category: "embeddings",
    level: "beginner",
    description:
      "Embeddings turn text into dense vectors where similar meanings sit close together. OpenAI text-embedding-3 (small/large), open-source sentence-transformers and BGE are the standard choices — pick by quality, cost and latency.",
    why: "Every RAG system starts here: retrieval quality is capped by embedding quality. A weak embedding model means the right chunk never gets retrieved.",
    when: "Choosing the embedding model for a new knowledge base; deciding hosted API vs local open-source embeddings.",
    code: "from openai import OpenAI\nclient = OpenAI()\nres = client.embeddings.create(\n    model=\"text-embedding-3-small\",\n    input=[\"RAG retrieves context before generating.\"],\n)\nprint(len(res.data[0].embedding))  # 1536 for small, 3072 for large\n\nfrom sentence_transformers import SentenceTransformer\nmodel = SentenceTransformer(\"BAAI/bge-small-en-v1.5\")\nvecs = model.encode([\"What is RAG?\", \"RAG grounds LLMs in docs.\"])\nprint(vecs.shape)  # (2, 384)",
  },
  {
    id: 2,
    title: "Cosine Similarity — How Retrieval Ranks Chunks",
    category: "embeddings",
    level: "beginner",
    description:
      "Cosine similarity measures the angle between two vectors: 1 = same direction, 0 = unrelated. Retrieval = embed the query, score every chunk, return the top-k.",
    why: "This single formula powers all of dense retrieval. It explains why normalisation matters and why dot-product and cosine are often interchangeable.",
    when: "Debugging why a chunk did or did not retrieve; implementing brute-force search before moving to a vector DB.",
    code: "import numpy as np\n\ndef cosine(a, b):\n    a, b = np.array(a), np.array(b)\n    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))\n\nquery = [1.0, 0.0, 0.9]\nprint(cosine(query, [0.9, 0.1, 1.0]))  # ~0.99 -> retrieved\nprint(cosine(query, [0.0, 1.0, 0.1]))  # ~0.05 -> ignored",
  },
  {
    id: 3,
    title: "Vector Databases: Pinecone, ChromaDB, FAISS",
    category: "embeddings",
    level: "intermediate",
    description:
      "Vector DBs store millions of embeddings with an ANN index for millisecond search. Pinecone = managed cloud, ChromaDB = easiest local Python option, FAISS = raw high-performance library you host yourself.",
    why: "Brute-force cosine over 1M chunks is too slow. A vector DB gives sub-100ms top-k search plus metadata filtering that production RAG needs.",
    when: "Prototype locally with ChromaDB, scale to Pinecone managed, or maximise control with FAISS on your own infra.",
    code: "import chromadb\nclient = chromadb.Client()\ncol = client.create_collection(\"docs\")\ncol.add(ids=[\"c1\", \"c2\"],\n    documents=[\"RAG grounds answers in docs.\", \"LoRA fine-tunes LLMs cheaply.\"],\n    metadatas=[{\"source\": \"rag\"}, {\"source\": \"ft\"}])\nprint(col.query(query_texts=[\"How does RAG work?\"], n_results=1))\n\nimport faiss, numpy as np\nindex = faiss.IndexFlatL2(384)\nindex.add(np.random.random((1000, 384)).astype(\"float32\"))\nD, I = index.search(np.random.random((1, 384)).astype(\"float32\"), k=3)\nprint(I)",
  },
  {
    id: 4,
    title: "Document Chunking Strategies & Quality Impact",
    category: "embeddings",
    level: "intermediate",
    description:
      "Chunking decides what the retriever can return: fixed-size, recursive, semantic and parent/child. Bad chunks = right answer exists but is split across chunks or buried in noise.",
    why: "Chunking is the highest-leverage RAG knob. Too big dilutes the embedding; too small loses context; no overlap severs sentences.",
    when: "Ingesting PDFs, markdown, code or tables; tuning chunk size when retrieval misses obvious answers.",
    code: "from langchain_text_splitters import RecursiveCharacterTextSplitter\nsplitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)\nchunks = splitter.split_text(open('guide.txt').read())\nprint(len(chunks))",
  },
  {
    id: 5,
    title: "LangChain: LCEL, Chains, Retrievers, Prompt Templates",
    category: "rag-pipeline",
    level: "intermediate",
    description:
      "LCEL (pipe operator |) composes runnables: retriever | prompt | llm | parser. Retrievers expose .invoke(query) -> docs; prompt templates inject context plus question safely.",
    why: "LCEL is how production RAG pipelines are written — declarative, streamable, traceable in LangSmith.",
    when: "Wiring retriever to prompt to LLM; swapping models or retrievers without rewriting pipeline code.",
    code: "from langchain_core.prompts import ChatPromptTemplate\nprompt = ChatPromptTemplate.from_template('Context: {context} Q: {question}')\nchain = ({'context': retriever, 'question': q} | prompt | llm)\nprint(chain.invoke('refund policy?'))",
  },
  {
    id: 6,
    title: "End-to-End Retrieval Pipeline Design",
    category: "rag-pipeline",
    level: "intermediate",
    description:
      "Full pipeline: ingest (load, clean, chunk, embed, upsert with metadata) then serve (rewrite, retrieve top-k, rerank, prompt, generate with citations, log).",
    why: "Missing pieces — dedupe, filters, logging, citations — separate demos from shipped RAG.",
    when: "Designing chat-with-docs from zero; reviewing why answers lack citations or leak across tenants.",
    code: "top = rerank(query, col.search(qvec, top_k=20), k=5)\nanswer = llm(prompt(context=top, question=q))\nlog(q, top, answer)",
  },
  {
    id: 7,
    title: "Production RAG Evaluation with RAGAS",
    category: "rag-pipeline",
    level: "advanced",
    description:
      "RAGAS scores faithfulness (grounded in context?), answer relevancy (answers the question?), context recall and precision (right chunk retrieved and ranked?).",
    why: "Without evals every tuning change is a guess. RAGAS turns feels-better into numbers and catches hallucinations.",
    when: "Before launch and in CI after changing chunk size, embedding model, top-k or prompts.",
    code: "from ragas import evaluate\nresult = evaluate(dataset, metrics=[faithfulness, answer_relevancy])\nprint(result)",
  },
  {
    id: 8,
    title: "Context Window: Stuffing vs Map-Reduce vs Refine",
    category: "rag-pipeline",
    level: "advanced",
    description:
      "Stuffing puts all chunks in one prompt (simple, hits Lost in the Middle). Map-reduce summarises each chunk in parallel then combines. Refine improves one answer chunk by chunk.",
    why: "Naive stuffing fails past ~10 chunks: the model forgets the middle. Strategy choice makes long-context RAG accurate.",
    when: "Answering over many docs; fixing answer-in-chunk-6-but-ignored bugs.",
    code: "stuff = load_summarize_chain(llm, chain_type='stuff')\nmapred = load_summarize_chain(llm, chain_type='map_reduce')\nrefine = load_summarize_chain(llm, chain_type='refine')",
  },
  {
    id: 9,
    title: "BM25 Keyword Search",
    category: "hybrid-search",
    level: "intermediate",
    description:
      "BM25 scores chunks by rare-term overlap with TF saturation and length normalisation. It nails exact names, codes and IDs where dense embeddings paraphrase them away.",
    why: "Dense-only RAG fails on exact-match queries. BM25 is cheap and still the best first stage for keyword-heavy corpora.",
    when: "Product SKUs, error codes, names, dates; as the keyword leg of a hybrid retriever.",
    code: "from rank_bm25 import BM25Okapi\nbm25 = BM25Okapi([d.lower().split() for d in corpus])\nprint(bm25.get_scores('ERR_TIMEOUT'.lower().split()))",
  },
  {
    id: 10,
    title: "HyDE - Hypothetical Document Embeddings",
    category: "hybrid-search",
    level: "advanced",
    description:
      "HyDE prompts the LLM to write a hypothetical answer first, then embeds THAT instead of the short query — closing the query and document vocabulary gap.",
    why: "Short vague queries embed poorly. HyDE lifts recall on abstract questions without re-indexing anything.",
    when: "Queries are short or jargon-mismatched vs docs; zero-shot retrieval boost before a reranker.",
    code: "hypo = llm('Write a paragraph answering: ' + q)\ndocs = store.similarity_search(hypo, k=8)  # never show hypo itself",
  },
  {
    id: 11,
    title: "RRF - Reciprocal Rank Fusion",
    category: "hybrid-search",
    level: "advanced",
    description:
      "RRF merges ranked lists (BM25 plus dense) with score = sum(1 / (k + rank)) per doc, typically k=60. No score normalisation needed.",
    why: "Dense and keyword scores live on different scales and cannot be averaged safely. RRF fuses by rank with zero tuning.",
    when: "Combining BM25 plus vector results; multi-query retrieval into one list.",
    code: "def rrf(lists, k=60):\n    s = {}\n    [s.update({d: s.get(d,0)+1/(k+r)}) for L in lists for r,d in enumerate(L,1)]\n    return sorted(s.items(), key=lambda x: x[1], reverse=True)",
  },
  {
    id: 12,
    title: "Cross-Encoder Reranking with CrossEncoder",
    category: "hybrid-search",
    level: "advanced",
    description:
      "Retrieve 50-100 cheaply with bi-encoders, then rerank to top 5 with a cross-encoder (query, doc) pair scorer like bge-reranker or ms-marco-MiniLM.",
    why: "Reranking is the biggest single quality win in modern RAG — it fixes ordering mistakes both BM25 and dense search make.",
    when: "Final stage of any hybrid pipeline; when top-1 accuracy matters more than a few hundred ms.",
    code: "from sentence_transformers import CrossEncoder\nr = CrossEncoder('BAAI/bge-reranker-base')\nscores = r.predict([(q, d) for d in candidates])\nprint(sorted(zip(scores, candidates), reverse=True)[0])",
  },
];
