import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import ini from "highlight.js/lib/languages/ini";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import plaintext from "highlight.js/lib/languages/plaintext";
import properties from "highlight.js/lib/languages/properties";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

// Single shared Highlight.js instance, built from lib/core plus only the
// languages this app's code samples actually use. The full "highlight.js"
// bundle registers ~190 languages and turned every interview/course chunk
// into a ~900 kB download; this core build is a fraction of that.
//
// Aliases come for free with each language definition, e.g. javascript also
// serves js/jsx/mjs/cjs, bash serves sh/zsh, plaintext serves text/txt, and
// xml serves html/svg — so the `language-...` classes and `language` fields
// used across the data files keep working unchanged.
//
// Unknown languages (e.g. "jsp", which Highlight.js has never shipped) still
// throw from hljs.highlight(); every caller already wraps that in try/catch
// and falls back to escaped plain text, exactly as before.
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("dockerfile", dockerfile);
hljs.registerLanguage("ini", ini);
hljs.registerLanguage("java", java);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("properties", properties);
hljs.registerLanguage("python", python);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("yaml", yaml);

export default hljs;
