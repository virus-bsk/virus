/**
 * Cline API service
 * OpenAI-compatible Chat Completions endpoint
 * https://docs.cline.bot/api/chat-completions
 *
 * Usage:
 *   import { clineChat, isClineConfigured } from "@/services/cline";
 *
 *   if (isClineConfigured()) {
 *     const reply = await clineChat("Explain React hooks in one sentence.");
 *   }
 */

const DEFAULT_BASE_URL = "https://api.cline.bot/api/v1";
const DEFAULT_MODELS = ["nvidia/nemotron-3.5-super-vl:free"];
const FAILOVER_STATUS_CODES = new Set([401, 402, 403, 408, 429, 500, 502, 503, 504]);

export const DEFAULT_CLINEC_BASE_URL =
  import.meta.env.VITE_CLINEC_BASE_URL || DEFAULT_BASE_URL;
export const DEFAULT_CLINEC_API_KEY = import.meta.env.VITE_CLINEC_API_KEY;
export const DEFAULT_CLINEC_MODELS =
  (import.meta.env.VITE_CLINEC_MODELS
    ? import.meta.env.VITE_CLINEC_MODELS.split(",").map((m) => m.trim()).filter(Boolean)
    : DEFAULT_MODELS) ?? DEFAULT_MODELS;

export const isClineConfigured = () => Boolean(DEFAULT_CLINEC_BASE_URL);

/**
 * Resolve the failover model list at call time:
 * 1. `model` option — a single pinned model
 * 2. `models` option — an explicit list
 * 3. Admin-configured models from Firestore (clineModels/global)
 * 4. VITE_CLINEC_MODELS env / built-in default
 */
async function resolveModels({ model, models } = {}) {
  if (model) return [model];
  if (models && models.length > 0) return models;
  try {
    const { getClineModels } = await import("../utils/clineModels");
    const adminModels = await getClineModels();
    if (Array.isArray(adminModels) && adminModels.length > 0) {
      return adminModels;
    }
  } catch (_) {
    // Firestore unavailable — fall through to env defaults.
  }
  return DEFAULT_CLINEC_MODELS;
}

function buildHeaders(apiKey, baseUrl) {
  const isLocalProxy = baseUrl.includes("localhost");
  const headers = {
    "Content-Type": "application/json",
    "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "",
    "X-Title": "bskcoding",
  };
  if (apiKey && !isLocalProxy) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }
  return headers;
}

async function tryModel({ baseUrl, apiKey, model, messages, stream, systemMessage, tools }) {
  const msg = [];
  if (systemMessage) msg.push({ role: "system", content: systemMessage });
  msg.push(...messages);

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: buildHeaders(apiKey, baseUrl),
    body: JSON.stringify({
      model,
      messages: msg,
      stream,
      tools: tools.length ? tools : undefined,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const data = await response.json();
  const choices = data?.data?.choices ?? data?.choices ?? [];
  const content = choices?.[0]?.message?.content || "";
  return { ok: true, content };
}

async function tryModelStream({ baseUrl, apiKey, model, messages, systemMessage, tools, onChunk }) {
  const msg = [];
  if (systemMessage) msg.push({ role: "system", content: systemMessage });
  msg.push(...messages);

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: buildHeaders(apiKey, baseUrl),
    body: JSON.stringify({
      model,
      messages: msg,
      stream: true,
      tools: tools.length ? tools : undefined,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullContent = "";
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") continue;

        try {
          const chunk = JSON.parse(payload);
          const delta = chunk.choices?.[0]?.delta;
          if (delta?.content) {
            fullContent += delta.content;
            onChunk(delta.content);
          }
        } catch (_) {
          // Ignore malformed SSE lines
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return { ok: true, content: fullContent };
}

/**
 * Send a message to the Cline chatbot and get a text response.
 * Works both directly (with API key) or via Cloudflare Worker proxy (key in worker).
 *
 * @param {string} message - User's message
 * @param {object} options
 * @param {string} options.model - Model ID (default: VITE_CLINEC_MODEL)
 * @param {boolean} options.stream - Enable streaming (default: false)
 * @param {string} options.systemMessage - Optional system prompt
 * @param {Array} options.tools - Optional OpenAI-compatible tool definitions
 * @returns {Promise<string>} The assistant's reply text
 */
export const clineChat = async (
  message,
  {
    model,
    models,
    stream = false,
    systemMessage,
    tools = [],
    baseUrl = DEFAULT_CLINEC_BASE_URL,
    apiKey = DEFAULT_CLINEC_API_KEY,
  } = {},
) => {
  if (!baseUrl) {
    throw new Error(
      "Cline base URL not configured. Set VITE_CLINEC_BASE_URL in .env",
    );
  }

  const resolvedModels = await resolveModels({ model, models });
  if (resolvedModels.length === 0) {
    throw new Error("No Cline models configured.");
  }

  const userMessages = [{ role: "user", content: message }];
  let lastError = null;

  for (const modelId of resolvedModels) {
    try {
      const result = stream
        ? await tryModelStream({
            baseUrl,
            apiKey,
            model: modelId,
            messages: userMessages,
            systemMessage,
            tools,
            onChunk: () => {},
          })
        : await tryModel({
            baseUrl,
            apiKey,
            model: modelId,
            messages: userMessages,
            stream: false,
            systemMessage,
            tools,
          });

      if (result.ok) {
        return { content: result.content, model: modelId };
      }

      lastError = new Error(`Model "${modelId}" returned HTTP ${result.status}`);
      if (!FAILOVER_STATUS_CODES.has(result.status)) {
        throw lastError;
      }
    } catch (err) {
      lastError = err;
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        continue;
      }
      const statusMatch = err.message.match(/HTTP (\d+)/);
      if (statusMatch && !FAILOVER_STATUS_CODES.has(Number(statusMatch[1]))) {
        throw err;
      }
    }
  }

  throw lastError || new Error("All Cline models failed.");
};

/**
 * Send a message and stream the response via a callback, with model failover.
 * If a model fails before any content is streamed (rate limit, 403, etc.),
 * the next configured model is tried automatically.
 *
 * @param {string} message - User's message
 * @param {function} onChunk - Called with each text chunk
 * @param {object} options
 * @param {string} options.model - Pin a single model (skips failover list)
 * @param {string[]} options.models - Explicit failover model list
 * @param {string} options.systemMessage - Optional system prompt
 * @param {Array} options.tools - Optional OpenAI-compatible tool definitions
 * @returns {Promise<string>} The full assistant reply
 */
export const clineChatStream = async (
  message,
  onChunk,
  {
    model,
    models,
    systemMessage,
    tools = [],
    baseUrl = DEFAULT_CLINEC_BASE_URL,
    apiKey = DEFAULT_CLINEC_API_KEY,
  } = {},
) => {
  if (!baseUrl) {
    throw new Error(
      "Cline base URL not configured. Set VITE_CLINEC_BASE_URL in .env",
    );
  }

  const resolvedModels = await resolveModels({ model, models });
  if (resolvedModels.length === 0) {
    throw new Error("No Cline models configured.");
  }

  const userMessages = [{ role: "user", content: message }];
  let lastError = null;

  for (const modelId of resolvedModels) {
    try {
      const result = await tryModelStream({
        baseUrl,
        apiKey,
        model: modelId,
        messages: userMessages,
        systemMessage,
        tools,
        onChunk,
      });

      if (result.ok) {
        return result.content;
      }

      lastError = new Error(`Model "${modelId}" returned HTTP ${result.status}`);
      if (!FAILOVER_STATUS_CODES.has(result.status)) {
        throw lastError;
      }
    } catch (err) {
      lastError = err;
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        continue;
      }
      const statusMatch = err.message.match(/HTTP (\d+)/);
      if (statusMatch && !FAILOVER_STATUS_CODES.has(Number(statusMatch[1]))) {
        throw err;
      }
    }
  }

  throw lastError || new Error("All Cline models failed.");
};

export default {
  isClineConfigured,
  clineChat,
  clineChatStream,
};
