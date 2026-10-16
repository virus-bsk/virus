import { useState, useRef, useEffect, Fragment } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  FaLocationDot,
  FaSquarePhone,
  FaSquareGithub,
  FaLinkedin,
  FaSquareEnvelope,
} from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { GoogleGenAI } from "@google/genai";
import {
  parseResumeFile,
  buildResumeDataExtractionPrompt,
} from "../utils/fileParser";
import { auth } from "../firebase";
import { getDocument, serverTimestamp, setDocument } from "../utils/firestore";
import { userDocId } from "../utils/userProfile";
import "./ResumeBuilder.css";

// Initialize Gemini AI client for suggestions
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const AI_MODELS = [
  "gemini-3-flash-preview",
  "gemini-2.0-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash-preview",
];

const STEPS = [
  { id: "upload", label: "Upload Resume", icon: "📤" },
  { id: "personal", label: "Personal Info", icon: "👤" },
  { id: "summary", label: "Summary", icon: "📝" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "certificates", label: "Certificates", icon: "📜" },
  { id: "preview", label: "Preview & Download", icon: "📄" },
];

// Display labels for each skill category key — keeps consistent naming
// across the preview and the PDF text export.
const SKILL_LABELS = {
  languages: "Languages",
  frameworks: "Frameworks",
  frontend: "Frontend",
  databases: "Databases",
  devops: "DevOps",
  testing: "Testing",
  cloud: "Cloud",
  messaging: "Messaging",
  concepts: "Core Concepts",
};

// Helper to render text with **bold** markdown syntax as JSX
const formatText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

// Strips **bold** markdown from fields that render as PLAIN text (title,
// techStack, form inputs, PDF export) so the raw asterisks never show.
const stripBold = (text) =>
  typeof text === "string" ? text.replace(/\*\*/g, "").trim() : "";

// "just now" / "3 min ago" / "2 h ago" / "yesterday" / "12 Oct, 10:32 AM"
// for the header's "Last saved" label.
const formatRelativeTime = (date, nowMs) => {
  if (!date) return "";
  const diffMs = Math.max(0, nowMs - date.getTime());
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  return date.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
};

const EMPTY_RESUME = {
  name: "",
  title: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  website: "",
  websiteName: "",
  location: "",
  summary: "",
  experience: [
    {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      location: "",
      points: [""],
    },
  ],
  projects: [{ name: "", techStack: "", points: [""] }],
  skills: {
    languages: "",
    frameworks: "",
    frontend: "",
    databases: "",
    devops: "",
    testing: "",
    cloud: "",
    messaging: "",
    concepts: "",
  },
  education: [
    {
      degree: "",
      institution: "",
      cgpa: "",
      startYear: "",
      endYear: "",
      location: "",
    },
  ],
  certificates: [{ name: "", issuer: "", url: "" }],
};

// Returns the display name of a certificate entry (handles string or {name, url} shapes).
// An entry with a blank/missing name is considered empty and must be hidden everywhere
// (preview, PDF export) so an empty "Certifications" headline never shows.
const getCertName = (cert) =>
  (typeof cert === "string" ? cert : cert?.name || "").trim();
const getCertIssuer = (cert) =>
  (typeof cert === "string" ? "" : cert?.issuer || "").trim();

// Maps whatever skill-category key the AI returns (e.g. "Core Concepts",
// "core_concepts", "Programming Languages", "CI/CD") back to the form's
// fixed lowercase keys. Returns null for unknown categories so stray keys
// are ignored instead of silently landing under names no input is bound to.
const SKILL_KEY_ALIASES = {
  languages: "languages",
  programminglanguages: "languages",
  langs: "languages",
  frameworks: "frameworks",
  framework: "frameworks",
  libraries: "frameworks",
  frontend: "frontend",
  frontenddevelopment: "frontend",
  web: "frontend",
  databases: "databases",
  database: "databases",
  devops: "devops",
  cicd: "devops",
  tools: "devops",
  testing: "testing",
  testingframeworks: "testing",
  cloud: "cloud",
  cloudcomputing: "cloud",
  messaging: "messaging",
  messagingqueues: "messaging",
  queues: "messaging",
  concepts: "concepts",
  coreconcepts: "concepts",
  concept: "concepts",
  fundamentals: "concepts",
  csfundamentals: "concepts",
  computerfundamentals: "concepts",
};

const normalizeSkillKey = (key) => {
  const flat = String(key).toLowerCase().replace(/[\s_-]+/g, "");
  if (SKILL_KEY_ALIASES[flat]) return SKILL_KEY_ALIASES[flat];
  // Fuzzy: accept keys that CONTAIN a known alias (e.g. "corejavaconcepts").
  const match = Object.keys(SKILL_KEY_ALIASES).find(
    (alias) => flat.includes(alias),
  );
  return match ? SKILL_KEY_ALIASES[match] : null;
};

// Coerces a skill-category value to the plain string the inputs expect —
// the model sometimes returns arrays (["Java", "Spring Boot"]) or nested
// objects ({"Core": "Java"}) instead of a comma-separated string. Bold
// markdown is stripped because skills render as plain input text.
const skillValueToString = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((v) => skillValueToString(v))
      .filter(Boolean)
      .join(", ");
  }
  if (value && typeof value === "object") {
    return Object.values(value)
      .map((v) => skillValueToString(v))
      .filter(Boolean)
      .join(", ");
  }
  return typeof value === "string" ? value.replace(/\*\*/g, "").trim() : "";
};

// Maps the personal-field keys the AI/parser tends to return (full_name,
// phoneNumber, email_address, linkedin_url, ...) back to the form's fixed
// field names. Returns null for keys that are not personal fields.
const PERSONAL_KEY_ALIASES = {
  name: "name",
  fullname: "name",
  fullnamecandidate: "name",
  candidatename: "name",
  title: "title",
  jobtitle: "title",
  professionaltitle: "title",
  headline: "title",
  email: "email",
  emailaddress: "email",
  contactemail: "email",
  mail: "email",
  phone: "phone",
  phonenumber: "phone",
  contactphone: "phone",
  mobile: "phone",
  mobilephone: "phone",
  contactnumber: "phone",
  linkedin: "linkedin",
  linkedinurl: "linkedin",
  linkedinprofile: "linkedin",
  github: "github",
  githuburl: "github",
  githubprofile: "github",
  website: "website",
  websiteurl: "website",
  portfolio: "website",
  websitename: "websiteName",
  websitelabel: "websiteName",
  location: "location",
  address: "location",
  city: "location",
  firstname: "name",
  lastname: "name",
  first_name: "name",
  last_name: "name",
  givenname: "name",
  surname: "name",
  contactperson: "name",
  applicantname: "name",
  // Safety net: if the model nests personal info under a "personal" key,
  // normalizePersonalKey("personal") → "personal" so the caller can merge it.
  personal: "personal",
};

const normalizePersonalKey = (key) => {
  const flat = String(key).toLowerCase().replace(/[\s_\-./]+/g, "");
  return PERSONAL_KEY_ALIASES[flat] || null;
};

// Plain-text cleanup for personal fields: strips **bold** markdown, and for
// the title also cuts anything after a "|" separator (the model likes to
// stuff skills into the title, e.g. "Senior Engineer | Java & Spring Boot").
const cleanPersonalValue = (key, value) => {
  const text =
    typeof value === "string"
      ? value.replace(/\*\*/g, "").trim()
      : value == null
        ? ""
        : String(value).replace(/\*\*/g, "").trim();
  if (key === "title") return text.split("|")[0].trim();
  return text;
};

// Counts the form fields the user has actually filled in (arrays and nested
// objects are walked). EMPTY_RESUME scores 0, a couple of typed characters
// score 1-2, and an uploaded/AI-autofilled resume scores many. Used to guard
// against clobbering a saved resume with an almost-blank form.
const countFilledLeafFields = (value) => {
  if (Array.isArray(value)) {
    return value.reduce(
      (total, item) => total + countFilledLeafFields(item),
      0,
    );
  }
  if (value && typeof value === "object") {
    return Object.values(value).reduce(
      (total, item) => total + countFilledLeafFields(item),
      0,
    );
  }
  return typeof value === "string" && value.trim() ? 1 : 0;
};

// Normalizes whatever is stored in Firestore into a complete resume object:
// every known top-level field exists, arrays really are arrays, and the
// skills object always carries all category keys. Used by the on-demand
// load ("Last saved resume").
const normalizeStoredResume = (stored) => {
  const storedResume = Object.fromEntries(
    Object.entries(EMPTY_RESUME).map(([field, defaultValue]) => [
      field,
      stored[field] ?? defaultValue,
    ]),
  );
  return {
    ...EMPTY_RESUME,
    ...storedResume,
    experience: Array.isArray(storedResume.experience)
      ? storedResume.experience
      : EMPTY_RESUME.experience,
    projects: Array.isArray(storedResume.projects)
      ? storedResume.projects
      : EMPTY_RESUME.projects,
    skills: { ...EMPTY_RESUME.skills, ...(storedResume.skills || {}) },
    education: Array.isArray(storedResume.education)
      ? storedResume.education
      : EMPTY_RESUME.education,
    certificates: Array.isArray(storedResume.certificates)
      ? storedResume.certificates
      : EMPTY_RESUME.certificates,
  };
};

function ResumeBuilder({ onClose }) {
  const isModal = typeof onClose === "function";
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);
  const [step, setStep] = useState(0);
  const [resume, setResume] = useState(EMPTY_RESUME);
  const [resumeDocPath, setResumeDocPath] = useState("");
  const [resumeReady, setResumeReady] = useState(false);
  const [hasSavedResume, setHasSavedResume] = useState(false);
  const [resumeSyncMessage, setResumeSyncMessage] = useState(
    "Edit your resume, then press Save Resume.",
  );
  // When the resume was last auto-saved (or loaded from the server) — shown
  // in the header so the user always knows their work is safe.
  const [lastSavedAt, setLastSavedAt] = useState(null);
  // Lightweight clock so the relative "last saved" label stays fresh.
  // nowTick starts at 0 (a constant — satisfies react-hooks/purity, which
  // forbids Date.now() during render). It is updated only by the interval
  // callback (not synchronously in the effect body — satisfies
  // react-hooks/set-state-in-effect) and seeded from the save handlers
  // (event handlers are not render, so Date.now() is allowed there).
  const [nowTick, setNowTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setNowTick(Date.now());
    }, 30_000);
    return () => clearInterval(id);
  }, []);
  const resumeBaselineRef = useRef(JSON.stringify(EMPTY_RESUME));
  const resumeLoadGenerationRef = useRef(0);
  const [savedResumeLoading, setSavedResumeLoading] = useState(false);
  const [resumeSaving, setResumeSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [resumeTemplate, setResumeTemplate] = useState("template1");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsingComplete, setParsingComplete] = useState(false);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!active) return;
      // Any in-flight resume load was started for the previous auth state.
      resumeLoadGenerationRef.current += 1;
      if (!user?.email) {
        setResumeDocPath("");
        setResumeReady(false);
        setHasSavedResume(false);
        setLastSavedAt(null);
        resumeBaselineRef.current = JSON.stringify(EMPTY_RESUME);
        setResume(EMPTY_RESUME);
        setStep(0);
        setShowPreview(false);
        setResumeSyncMessage("Sign in to save your resume.");
        return;
      }

      // Deliberately NO Firestore fetch here: the builder opens blank and
      // only loads the saved resume when the user asks for it ("Last saved
      // resume"). This keeps the page from loading the resume on every visit.
      setResumeDocPath(`resume/${userDocId(user)}`);
      setHasSavedResume(false);
      setLastSavedAt(null);
      setResumeReady(true);
      setResumeSyncMessage("Edit your resume, then press Save Resume.");
    });

    return () => {
      active = false;
      resumeLoadGenerationRef.current += 1;
      unsubscribe();
    };
  }, []);

  // MANUAL SAVE — nothing is written to the server unless the user presses
  // "Save Resume". This effect only tracks dirty state so the status line can
  // tell the user whether they have unsaved changes.
  useEffect(() => {
    if (!resumeReady || !resumeDocPath) return;
    const serializedResume = JSON.stringify(resume);
    if (serializedResume !== resumeBaselineRef.current) {
      setResumeSyncMessage("Unsaved changes — press Save Resume to save.");
    } else {
      setResumeSyncMessage(
        hasSavedResume
          ? "All changes saved."
          : "Edit your resume, then press Save Resume.",
      );
    }
  }, [resume, resumeDocPath, resumeReady, hasSavedResume]);

  // MANUAL save — only ever runs when the user clicks "Save Resume".
  const saveResume = async () => {
    if (!resumeDocPath) {
      setResumeSyncMessage("Sign in to save your resume.");
      return false;
    }

    const serializedResume = JSON.stringify(resume);
    if (serializedResume === resumeBaselineRef.current && hasSavedResume) {
      setResumeSyncMessage("Everything is already saved.");
      return true;
    }

    // Safety: never overwrite an existing saved resume with an almost-blank
    // form (e.g. user opened the builder fresh and hit Save immediately).
    if (hasSavedResume && countFilledLeafFields(resume) <= 2) {
      setResumeSyncMessage(
        "Nothing to save yet — your form is empty. Load your last saved resume or add details first.",
      );
      return false;
    }

    // Minimum-content rule: a resume is only worth saving once it has at
    // least one real work experience (company + a date) AND at least one
    // named project. Incomplete drafts are not written to the database.
    const hasExperience = resume.experience.some(
      (e) => (e.company || e.role) && (e.startDate || e.endDate),
    );
    const hasProject = resume.projects.some((p) => p.name);
    if (!hasExperience || !hasProject) {
      const missing = [
        !hasExperience ? "one work experience (company + date)" : null,
        !hasProject ? "one project (name)" : null,
      ]
        .filter(Boolean)
        .join(" and ");
      setResumeSyncMessage(
        `Not saved yet — add ${missing} before saving your resume.`,
      );
      return false;
    }

    setResumeSaving(true);
    setResumeSyncMessage("Saving resume...");
    const result = await setDocument(resumeDocPath, {
      ...resume,
      updatedAt: serverTimestamp(),
    });
    setResumeSaving(false);

    if (!result.ok) {
      setResumeSyncMessage(
        `Could not save resume: ${result.error?.message || "Please try again."}`,
      );
      return false;
    }

    resumeBaselineRef.current = serializedResume;
    setHasSavedResume(true);
    setLastSavedAt(new Date());
    setNowTick(Date.now());
    setResumeSyncMessage("Resume saved.");
    return true;
  };

  // Loads the saved resume from the server ON DEMAND — only ever triggered by
  // the user's "Last saved resume" click, never on mount. On success it
  // hydrates the form and jumps to the preview step; otherwise the sync
  // message already explains what happened.
  const openSavedResumePreview = async () => {
    if (!resumeDocPath) {
      setResumeSyncMessage("Sign in to save your resume.");
      return { ok: false, exists: false };
    }

    const generation = ++resumeLoadGenerationRef.current;
    setSavedResumeLoading(true);
    setResumeSyncMessage("Loading saved resume...");

    const result = await getDocument(resumeDocPath);
    if (generation !== resumeLoadGenerationRef.current) {
      setSavedResumeLoading(false);
      return { ok: false, exists: false };
    }
    setSavedResumeLoading(false);

    if (!result.ok) {
      setResumeSyncMessage(
        `Could not load saved resume: ${result.error?.message || "Please try again."}`,
      );
      return { ok: false, exists: false };
    }

    if (!result.exists) {
      setHasSavedResume(false);
      setLastSavedAt(null);
      setResumeSyncMessage("No saved resume found yet.");
      return { ok: true, exists: false };
    }

    const loadedResume = normalizeStoredResume(result.value);
    resumeBaselineRef.current = JSON.stringify(loadedResume);
    setResume(loadedResume);
    setHasSavedResume(true);
    setLastSavedAt(
      result.value.updatedAt?.toDate?.()
        ? result.value.updatedAt.toDate()
        : new Date(),
    );
    setNowTick(Date.now());
    setResumeSyncMessage("Saved resume loaded — press Save Resume after editing.");
    setShowPreview(true);
    setStep(STEPS.length - 1);
    return { ok: true, exists: true };
  };

  const exitBuilder = () => {
    if (isModal) {
      onClose();
      return;
    }
    navigate("/");
  };

  // Resume upload handler - parses the file and uses AI to auto-fill all fields
  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ai || !apiKey) {
      setAiMessage(
        "⚠️ Gemini API key not configured. Add VITE_GEMINI_API_KEY to .env",
      );
      return;
    }

    setUploadingResume(true);
    setAiLoading(true);
    setAiMessage("");
    setUploadedFile(file.name);

    try {
      // Parse the resume file (PDF/TXT) to extract text
      const parsed = await parseResumeFile(file);

      // Build the structured data extraction prompt
      const prompt = buildResumeDataExtractionPrompt(
        parsed.content,
        parsed.filename,
      );

      let response = null;
      let lastError = null;

      // Try each AI model until one works
      for (const model of AI_MODELS) {
        try {
          response = await ai.models.generateContent({
            model,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          });
          if (response?.text) break;
        } catch (err) {
          lastError = err;
          console.warn(`AI parse model '${model}' failed:`, err?.message);
        }
      }

      if (!response?.text && lastError) throw lastError;

      // Parse the JSON response — strip code fences and, if the model still
      // wrapped it in prose, pull the first {...} block out.
      const text = response.text.trim();
      const jsonStr = text
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/```$/, "")
        .trim();
      let parsedData;
      try {
        parsedData = JSON.parse(jsonStr);
      } catch {
        const match = jsonStr.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("AI response contained no JSON object");
        parsedData = JSON.parse(match[0]);
      }

      // Some models wrap the payload ({"resume": {...}} / {"data": {...}}).
      const inner =
        parsedData?.resume && typeof parsedData.resume === "object"
          ? parsedData.resume
          : parsedData?.data && typeof parsedData.data === "object"
            ? parsedData.data
            : parsedData;

      // Also pull out a nested "personal" block if the model wrapped fields that way,
      // so the personal loop below can merge its sub-fields into the resume.
      const personalBlock =
        inner && typeof inner === "object" && !Array.isArray(inner)
          ? inner.personal || null
          : null;

      // How many fields actually get filled — drives an honest final message
      // instead of always claiming success. The merge is computed synchronously
      // from the current `resume` snapshot (not inside a setResume updater) so
      // the count is reliable.
      let appliedCount = 0;
      const prev = resume;
      const updated = { ...prev };

      // Personal info — accept the AI's key variants (full_name,
      // phoneNumber, email_address, linkedin_url, ...) and clean values.
      // Also handles a nested "personal" block if the model wrapped fields that way.
      const mergePersonalValue = (targetField, rawValue) => {
        if (!targetField || prev[targetField]) return;
        const text = cleanPersonalValue(targetField, rawValue);
        if (text) {
          updated[targetField] = text;
          appliedCount += 1;
        }
      };

      Object.entries(inner || {}).forEach(([key, value]) => {
        const field = normalizePersonalKey(key);
        if (field === "personal" && value && typeof value === "object" && !Array.isArray(value)) {
          // Nested block: { personal: { name: "...", email: "..." } }
          Object.entries(value).forEach(([subKey, subValue]) => {
            mergePersonalValue(normalizePersonalKey(subKey), subValue);
          });
          return;
        }
        mergePersonalValue(field, value);
      });

      // Merge any standalone nested "personal" block not caught by key iteration
      if (personalBlock && typeof personalBlock === "object" && !Array.isArray(personalBlock)) {
        Object.entries(personalBlock).forEach(([subKey, subValue]) => {
          mergePersonalValue(normalizePersonalKey(subKey), subValue);
        });
      }

      // Summary
      if (inner.summary && !prev.summary) {
        updated.summary = String(inner.summary).trim();
        appliedCount += 1;
      }

      // Experience
      if (
        inner.experience &&
        Array.isArray(inner.experience) &&
        inner.experience.length > 0
      ) {
        const validExp = inner.experience.filter(
          (exp) => exp.company || exp.role,
        );
        if (validExp.length > 0) {
          updated.experience = validExp.map((exp) => ({
            company: exp.company || "",
            role: exp.role || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            location: exp.location || "",
            points: Array.isArray(exp.points)
              ? exp.points.filter(Boolean)
              : [""],
          }));
          appliedCount += validExp.length;
        }
      }

      // Projects
      if (
        inner.projects &&
        Array.isArray(inner.projects) &&
        inner.projects.length > 0
      ) {
        const validProjects = inner.projects.filter((p) => p.name);
        if (validProjects.length > 0) {
          updated.projects = validProjects.map((proj) => ({
            name: proj.name || "",
            techStack: proj.techStack || "",
            points: Array.isArray(proj.points)
              ? proj.points.filter(Boolean)
              : [""],
          }));
          appliedCount += validProjects.length;
        }
      }

      // Skills — fuzzy key matching (same as AI Suggest) so "Core
      // Concepts"/"core_concepts"/arrays still land in the right inputs.
      if (inner.skills && typeof inner.skills === "object") {
        const merged = { ...prev.skills };
        Object.entries(inner.skills).forEach(([key, value]) => {
          const targetKey = normalizeSkillKey(key);
          const skillText = skillValueToString(value);
          if (targetKey && skillText && !merged[targetKey]) {
            merged[targetKey] = skillText;
            appliedCount += 1;
          }
        });
        updated.skills = merged;
      }

      // Education
      if (
        inner.education &&
        Array.isArray(inner.education) &&
        inner.education.length > 0
      ) {
        const validEdu = inner.education.filter(
          (edu) => edu.degree || edu.institution,
        );
        if (validEdu.length > 0) {
          updated.education = validEdu.map((edu) => ({
            degree: edu.degree || "",
            institution: edu.institution || "",
            cgpa: edu.cgpa || "",
            startYear: edu.startYear || "",
            endYear: edu.endYear || "",
            location: edu.location || "",
          }));
          appliedCount += validEdu.length;
        }
      }

      // Certificates — accept "certificates"/"certifications"/"certs"
      const certList = ["certificates", "certifications", "certs"].reduce(
        (list, key) =>
          list || (Array.isArray(inner?.[key]) ? inner[key] : null),
        null,
      );
      if (certList) {
        const validCerts = certList
          .filter(Boolean)
          .map((cert) =>
            typeof cert === "string"
              ? { name: cert, issuer: "", url: "" }
              : {
                  name:
                    cert.name ||
                    cert.certificate ||
                    cert.certification ||
                    cert.title ||
                    "",
                  issuer:
                    cert.issuer ||
                    cert.issuerName ||
                    cert.organization ||
                    "",
                  url: cert.url || cert.link || "",
                },
          )
          .map((c) => ({ ...c, name: stripBold(c.name) }))
          .filter((c) => c.name);
        if (validCerts.length > 0) {
          updated.certificates = validCerts;
          appliedCount += validCerts.length;
        }
      }

      if (appliedCount === 0) {
        // Don't claim success on a silent no-op — surface the payload.
        console.warn("Resume parse produced no fillable data:", inner);
        setAiMessage(
          "⚠️ The file was read, but no details could be extracted (unexpected AI format — details in browser console). Try again or fill in the details manually.",
        );
        return;
      }

      // Debug: log the merged payload before committing to state
      console.log("RESUME BEFORE SET:", { ...updated, personalBlock, innerKeys: Object.keys(inner || {}) });
      setResume(updated);
      setParsingComplete(true);
      setAiMessage(
        `✨ Resume parsed successfully! ${appliedCount} details auto-filled. Review each section below.`,
      );

      // Auto-advance to next step after successful parsing
      setTimeout(() => {
        setStep(1);
      }, 1200);
    } catch (error) {
      console.error("Resume parsing error:", error);
      const detail = error?.message || String(error);
      setAiMessage(
        `⚠️ Could not parse the resume: ${detail}. Please try again or fill in the details manually.`,
      );
    } finally {
      setUploadingResume(false);
      setAiLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const updateField = (section, field, value) => {
    setResume((prev) => {
      if (section === "personal") {
        return { ...prev, [field]: value };
      }
      if (section === "summary") {
        return { ...prev, summary: value };
      }
      return {
        ...prev,
        [section]: { ...prev[section], [field]: value },
      };
    });
  };

  const updateArrayItem = (section, index, field, value) => {
    setResume((prev) => {
      const items = [...prev[section]];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, [section]: items };
    });
  };

  const updateArrayPoint = (section, itemIndex, pointIndex, value) => {
    setResume((prev) => {
      const items = [...prev[section]];
      const points = [...items[itemIndex].points];
      points[pointIndex] = value;
      items[itemIndex] = { ...items[itemIndex], points };
      return { ...prev, [section]: items };
    });
  };

  const addArrayItem = (section) => {
    setResume((prev) => {
      const items = [...prev[section]];
      if (section === "experience") {
        items.push({
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          location: "",
          points: [""],
        });
      } else if (section === "projects") {
        items.push({ name: "", techStack: "", points: [""] });
      } else if (section === "education") {
        items.push({
          degree: "",
          institution: "",
          cgpa: "",
          startYear: "",
          endYear: "",
          location: "",
        });
      } else if (section === "certificates") {
        items.push({ name: "", issuer: "", url: "" });
      }
      return { ...prev, [section]: items };
    });
  };

  const removeArrayItem = (section, index) => {
    setResume((prev) => {
      const items = [...prev[section]];
      items.splice(index, 1);
      return { ...prev, [section]: items };
    });
  };

  const addPoint = (section, itemIndex) => {
    setResume((prev) => {
      const items = [...prev[section]];
      items[itemIndex] = {
        ...items[itemIndex],
        points: [...items[itemIndex].points, ""],
      };
      return { ...prev, [section]: items };
    });
  };

  const removePoint = (section, itemIndex, pointIndex) => {
    setResume((prev) => {
      const items = [...prev[section]];
      const points = [...items[itemIndex].points];
      points.splice(pointIndex, 1);
      items[itemIndex] = { ...items[itemIndex], points };
      return { ...prev, [section]: items };
    });
  };

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setShowPreview(true);
    }
  };

  // AI suggestion helper - asks Gemini to suggest content for the current section
  const getAISuggestion = async (sectionId) => {
    if (!ai || !apiKey) {
      setAiMessage(
        "⚠️ Gemini API key not configured. Add VITE_GEMINI_API_KEY to .env",
      );
      return;
    }

    setAiLoading(true);
    setAiMessage("");

    try {
      const sectionNames = {
        personal: "Personal Information",
        summary: "Professional Summary",
        experience: "Work Experience",
        projects: "Projects",
        skills: "Technical Skills",
        education: "Education",
        certificates: "Certificates",
      };

      const sectionName = sectionNames[sectionId] || sectionId;

      const prompt = `You are a professional resume writer. Based on the following resume data the user has already provided, suggest content for the "${sectionName}" section.

CURRENT RESUME DATA:
${JSON.stringify(resume, null, 2)}

TASK: Generate professional ${sectionName} content suggestions. 
- If the user has already entered some data, improve and enhance it.
- If fields are empty, suggest realistic professional content based on their experience level and other sections.
- Return ONLY the suggested content in a structured format that can be directly used.
- IMPORTANT: Make all content ATS-friendly - use strong action verbs, quantified achievements, industry-relevant keywords, and avoid graphics, tables, or special characters that ATS parsers cannot read.
- IMPORTANT: Use **bold** markdown syntax (wrap text in double asterisks, e.g. **RESTful APIs**) to highlight key keywords, metrics, technology names, and achievements within text content (e.g., "Developed **RESTful APIs** using **Spring Boot**, reducing latency by **40%**"). Bold sparingly to emphasize key accomplishments and technical terms — the content is rendered as rich text.
- For skills: you MUST return ALL NINE category keys (languages, frameworks, frontend, databases, devops, testing, cloud, messaging, concepts), each with a non-empty comma-separated string value. Do not omit any category and do not return arrays or nested objects for values — every value must be a single string.
- For summary: write a compelling 2-3 sentence professional summary that is ATS-optimized with relevant keywords.
- For personal title: return ONLY a short plain job title (e.g. "Senior Software Engineer" or "Java Backend Developer") — at most 4-5 words. Do NOT put skills, technology names, special characters, or "|" separators in the title; skills belong in the skills section. Never use **bold** markdown in the title.
- For personal fields: fill EVERY personal key (name, title, email, phone, linkedin, github, website, websiteName, location). Use the user's real values from the resume data above whenever present. When a value is missing, invent a realistic placeholder (e.g. "yourname@gmail.com", "+91 98765 43210", "linkedin.com/in/yourname") that the user can easily replace — never return empty strings for personal fields.
- For experience: suggest ATS-friendly bullet points with strong action verbs and quantified achievements.
- For projects: suggest ATS-friendly project descriptions with tech stack and contributions. The techStack value must be a PLAIN comma-separated list of technologies (e.g. "Spring Boot, React, MySQL, Docker") with NO **bold** markdown — it renders as plain text.
- For education: suggest standard education entries.
- For certificates: suggest relevant certifications for a Java developer.

Format your response as JSON matching this structure:
${sectionId === "personal" ? `{"name": "", "title": "", "email": "", "phone": "", "linkedin": "", "github": "", "website": "", "websiteName": "", "location": ""}` : ""}
${sectionId === "summary" ? `{"summary": "your suggested summary text"}` : ""}
${sectionId === "experience" ? `{"experience": [{"company": "", "role": "", "startDate": "", "endDate": "", "location": "", "points": ["point1", "point2"]}]}` : ""}
${sectionId === "projects" ? `{"projects": [{"name": "", "techStack": "", "points": ["point1", "point2"]}]}` : ""}
${sectionId === "skills" ? `{"skills": {"languages": "", "frameworks": "", "frontend": "", "databases": "", "devops": "", "testing": "", "cloud": "", "messaging": "", "concepts": ""}}` : ""}
${sectionId === "education" ? `{"education": [{"degree": "", "institution": "", "cgpa": "", "startYear": "", "endYear": "", "location": ""}]}` : ""}
${sectionId === "certificates" ? `{"certificates": [{"name": "cert1", "url": "link1"}]}` : ""}

IMPORTANT: Return ONLY valid JSON. No markdown, no explanation.`;

      let response = null;
      let lastError = null;

      for (const model of AI_MODELS) {
        try {
          response = await ai.models.generateContent({
            model,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          });
          if (response?.text) break;
        } catch (err) {
          lastError = err;
          console.warn(`AI suggest model '${model}' failed:`, err?.message);
        }
      }

      if (!response?.text && lastError) throw lastError;

      // Parse the JSON response
      const text = response.text.trim();
      // Remove markdown code fences if present
      const jsonStr = text
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/```$/, "")
        .trim();
      let suggestions;
      try {
        suggestions = JSON.parse(jsonStr);
      } catch {
        // Fallback: pull the first {...} block out of any surrounding prose
        const match = jsonStr.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("AI response contained no JSON object");
        suggestions = JSON.parse(match[0]);
      }

      // If the model wrapped the payload ({"resume": {...}} / {"data": {...}})
      // or forgot the {"skills": {...}} wrapper, normalize the shape so the
      // apply-logic below still works.
      if (
        suggestions?.resume &&
        typeof suggestions.resume === "object" &&
        !Array.isArray(suggestions.resume)
      ) {
        suggestions = suggestions.resume;
      } else if (
        suggestions?.data &&
        typeof suggestions.data === "object" &&
        !Array.isArray(suggestions.data) &&
        !Object.keys(suggestions).some((k) => normalizePersonalKey(k))
      ) {
        suggestions = suggestions.data;
      }
      if (
        sectionId === "skills" &&
        suggestions &&
        !suggestions.skills &&
        typeof suggestions === "object"
      ) {
        const looksLikeSkillMap = Object.keys(suggestions).some((k) =>
          normalizeSkillKey(k),
        );
        if (looksLikeSkillMap) suggestions = { skills: suggestions };
      }

      // Apply suggestions to resume. Computed from the same `resume` snapshot
      // that was sent to the AI (so the merge matches what the model saw),
      // then applied with a plain setUpdate — not a side-effecting updater.
      const prev = resume;
      const updated = { ...prev };
      // Tracks how many fields/entries were actually filled so the success
      // message can tell the truth instead of always claiming success.
      let appliedCount = 0;

      if (sectionId === "personal") {
        // Accept the model's key variants (full_name, phoneNumber,
        // email_address, linkedin_url, ...) via the alias map, and clean
        // values: strip **bold**, and for the title cut anything after "|".
        Object.entries(suggestions).forEach(([key, value]) => {
          const field = normalizePersonalKey(key);
          if (!field || prev[field]) return;
          const text = cleanPersonalValue(field, value);
          if (text) {
            updated[field] = text;
            appliedCount += 1;
          }
        });
      } else if (sectionId === "summary") {
        if (suggestions.summary && !prev.summary) {
          updated.summary = suggestions.summary;
          appliedCount += 1;
        }
      } else if (sectionId === "skills") {
        if (
          suggestions.skills &&
          typeof suggestions.skills === "object" &&
          !Array.isArray(suggestions.skills)
        ) {
          Object.entries(suggestions.skills).forEach(([key, value]) => {
            const targetKey = normalizeSkillKey(key);
            const text = skillValueToString(value);
            if (targetKey && text && !prev.skills[targetKey]) {
              updated.skills = {
                // Spread the ACCUMULATOR (updated), not prev — otherwise
                // each matched category overwrites the previous one and
                // only the last key survives.
                ...updated.skills,
                [targetKey]: text,
              };
              appliedCount += 1;
            }
          });
        }
      } else if (sectionId === "experience") {
        if (suggestions.experience && Array.isArray(suggestions.experience)) {
          const existing = prev.experience.filter((e) => e.company || e.role);
          const suggested = suggestions.experience.filter(
            (e) => e.company || e.role,
          );
          if (existing.length === 0 && suggested.length > 0) {
            updated.experience = suggested;
            appliedCount = suggested.length;
          }
        }
      } else if (sectionId === "projects") {
        if (suggestions.projects && Array.isArray(suggestions.projects)) {
          const existing = prev.projects.filter((p) => p.name);
          const suggested = suggestions.projects
            .filter((p) => p.name)
            .map((p) => ({
              ...p,
              // name & techStack render as plain text — never keep **bold**
              // markers there. Bullet points DO render via formatText, so
              // their **bold** markdown is intentionally preserved.
              name: stripBold(p.name),
              techStack: stripBold(p.techStack),
            }));
          if (existing.length === 0 && suggested.length > 0) {
            updated.projects = suggested;
            appliedCount = suggested.length;
          }
        }
      } else if (sectionId === "education") {
        if (suggestions.education && Array.isArray(suggestions.education)) {
          const existing = prev.education.filter(
            (e) => e.degree || e.institution,
          );
          const suggested = suggestions.education.filter(
            (e) => e.degree || e.institution,
          );
          if (existing.length === 0 && suggested.length > 0) {
            updated.education = suggested;
            appliedCount = suggested.length;
          }
        }
      } else if (sectionId === "certificates") {
        // The model often returns "certifications"/"certs" instead of
        // "certificates", or the bare array with no wrapper key at all —
        // accept all of those shapes.
        const certList = ["certificates", "certifications", "certs"].reduce(
          (list, key) =>
            list ||
            (Array.isArray(suggestions?.[key]) ? suggestions[key] : null),
          Array.isArray(suggestions) ? suggestions : null,
        );
        if (certList) {
          // Filter by actual content (a blank {name:"", ...} row is a
          // truthy object, so filter(Boolean) would wrongly report the
          // section as already filled and never apply suggestions).
          const existing = prev.certificates.filter((c) => getCertName(c));
          const suggested = certList
            .filter(Boolean)
            .map((cert) =>
              typeof cert === "string"
                ? { name: cert, issuer: "", url: "" }
                : {
                    name:
                      cert.name ||
                      cert.certificate ||
                      cert.certification ||
                      cert.title ||
                      "",
                    issuer:
                      cert.issuer ||
                      cert.issuedBy ||
                      cert.issuingOrganization ||
                      cert.authority ||
                      "",
                    url: cert.url || cert.link || "",
                  },
            )
            .map((c) => ({
              ...c,
              name: c.name.replace(/\*\*/g, "").trim(),
              issuer: c.issuer.replace(/\*\*/g, "").trim(),
              url: c.url.trim(),
            }))
            .filter((c) => getCertName(c));
          if (existing.length === 0 && suggested.length > 0) {
            updated.certificates = suggested;
            appliedCount = suggested.length;
          }
        }
      }

      if (appliedCount > 0) {
        setResume(updated);
        setAiMessage("✨ AI suggestions applied! Review and edit as needed.");
      } else {
        // Surface what actually happened so a silent no-op is visible in the
        // console instead of masquerading as a successful apply.
        console.warn("AI suggestions not applied — parsed payload:", {
          sectionId,
          suggestions,
        });
        setAiMessage(
          `⚠️ AI replied, but nothing was added — your ${sectionName} fields may already have content, or the AI returned an unexpected format (details in browser console).`,
        );
      }
    } catch (error) {
      console.error("AI suggestion error:", error);
      setAiMessage("⚠️ Could not generate suggestions. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const downloadPDF = async () => {
    // Ensure the preview is visible so html2canvas can capture it
    if (!showPreview) {
      setShowPreview(true);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    const element = previewRef.current;
    if (!element) return;

    const constraintSelectors =
      ".rb-modal, .rb-body, .rb-overlay, .rb-page, .rb-page-card";

    try {
      // ── Temporarily disable height/overflow constraints on the live DOM
      //    so we can (a) measure exact link positions and (b) capture the
      //    full preview content rather than just the clipped visible area. ──
      const measuredElements = [element];
      document
        .querySelectorAll(constraintSelectors)
        .forEach((p) => measuredElements.push(p));

      const originalStyles = new Map();
      measuredElements.forEach((el) => {
        if (el) {
          originalStyles.set(el, {
            maxHeight: el.style.maxHeight,
            overflow: el.style.overflow,
            overflowY: el.style.overflowY,
          });
          el.style.maxHeight = "none";
          el.style.overflow = "visible";
          el.style.overflowY = "visible";
        }
      });

      // Force a synchronous layout flush so the style changes above
      // take effect before reading element positions
      // prettier-ignore
      void element.offsetHeight;

      // Measured from the CLONED desktop-width layout inside onclone
      // (live DOM on mobile is narrow/column-stacked, so measuring it
      // would misplace the tappable link overlays in the PDF).
      let previewWidthPx = element.getBoundingClientRect().width || 780;
      let linkPositions = [];
      let pageBreakPositions = [];

      // Use html2canvas to capture the EXACT preview HTML as an image,
      // guaranteeing the downloaded PDF matches the on-screen preview
      // pixel for pixel.
      const canvas = await html2canvas(element, {
        scale: 2,
        windowWidth: 1024,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.querySelector(".rb-preview");
          if (clonedEl) {
            clonedEl.style.maxHeight = "none";
            clonedEl.style.overflow = "visible";
            clonedEl.style.overflowY = "visible";
            clonedEl.style.overflowX = "visible";
            // FIX (mobile): capture at desktop width so the top headline /
            // contact row never stacks into a column in the exported PDF.
            // Use a desktop-sized clone viewport so responsive mobile rules
            // cannot change the exported page layout.
            clonedEl.style.width = "780px";
            clonedEl.style.maxWidth = "780px";
            clonedEl.style.minWidth = "780px";
            clonedEl.style.padding = "32px";
            clonedEl.style.wordBreak = "normal";
            clonedEl.style.overflowWrap = "normal";
            // Contact row: desktop row layout (row + wrap + center).
            const clonedContact = clonedEl.querySelector(".rb-preview-contact");
            if (clonedContact) {
              clonedContact.style.display = "flex";
              clonedContact.style.flexDirection = "row";
              clonedContact.style.flexWrap = "wrap";
              clonedContact.style.justifyContent = "center";
              clonedContact.style.alignItems = "center";
              clonedContact.style.gap = "4px 16px";
              clonedContact.style.fontSize = "0.85rem";
              clonedContact.style.maxWidth = "100%";
              clonedContact.style.wordBreak = "normal";
              clonedContact.style.overflowWrap = "normal";
            }
            clonedEl
              .querySelectorAll(".rb-preview-contact-item")
              .forEach((item) => {
                item.style.display = "inline-flex";
                item.style.flexDirection = "row";
                item.style.flexWrap = "nowrap";
                item.style.alignItems = "center";
                item.style.whiteSpace = "nowrap";
                item.style.fontSize = "0.85rem";
                item.style.lineHeight = "1.5";
                item.style.maxWidth = "none";
                item.style.wordBreak = "normal";
                item.style.overflowWrap = "normal";
              });
            // Headline: desktop sizes.
            const clonedName = clonedEl.querySelector(".rb-preview-header h2");
            if (clonedName) {
              clonedName.style.fontSize = "1.6rem";
              clonedName.style.lineHeight = "1.2";
              clonedName.style.wordBreak = "normal";
              clonedName.style.overflowWrap = "normal";
            }
            // Job headers + skills grid: desktop row/grid layout.
            clonedEl
              .querySelectorAll(".rb-preview-item-header")
              .forEach((h) => {
                h.style.display = "flex";
                h.style.flexDirection = "row";
                h.style.justifyContent = "space-between";
                h.style.alignItems = "baseline";
                h.style.gap = "12px";
                h.style.flexWrap = "wrap";
              });
            clonedEl
              .querySelectorAll(".rb-preview-skills-grid")
              .forEach((g) => {
                g.style.display = "grid";
                g.style.gridTemplateColumns = "140px auto 1fr";
                g.style.gap = "4px 12px";
                g.style.fontSize = "0.85rem";
              });
            // Measure preview width + link positions from THIS cloned
            // desktop-width layout (in CSS pixels) — the live DOM on mobile
            // is narrow/column-stacked and would misplace the PDF links.
            const clonedRect = clonedEl.getBoundingClientRect();
            if (clonedRect.width > 0) previewWidthPx = clonedRect.width;
            linkPositions = Array.from(
              clonedEl.querySelectorAll(".rb-preview-link"),
            )
              .map((link) => {
                const rect = link.getBoundingClientRect();
                return {
                  left: rect.left - clonedRect.left,
                  top: rect.top - clonedRect.top,
                  width: rect.width,
                  height: rect.height,
                  url: link.href,
                };
              })
              .filter((pos) => {
                // Keep mailto and well-formed HTTP(S) URLs that have a dot
                // in the hostname — filters out entries like
                // "https://Linkdin".
                if (!pos.url) return false;
                if (pos.url.startsWith("mailto:")) return true;
                if (pos.url.startsWith("tel:")) return true;
                if (
                  pos.url.startsWith("https://") ||
                  pos.url.startsWith("http://")
                ) {
                  try {
                    return new URL(pos.url).hostname.includes(".");
                  } catch {
                    return false;
                  }
                }
                return false;
              });
            pageBreakPositions = Array.from(
              clonedEl.querySelectorAll(
                ".rb-preview-section, .rb-preview-item, .rb-preview-item li",
              ),
            ).flatMap((node) => {
              const rect = node.getBoundingClientRect();
              const positions = [];
              if (node.classList.contains("rb-preview-section")) {
                positions.push(rect.top - clonedRect.top);
              } else {
                positions.push(rect.bottom - clonedRect.top);
              }
              return positions;
            });
          }
          clonedDoc.querySelectorAll(constraintSelectors).forEach((p) => {
            p.style.maxHeight = "none";
            p.style.overflow = "visible";
            p.style.overflowY = "visible";
          });
        },
      });

      // Restore original styles on the live DOM
      measuredElements.forEach((el) => {
        if (el && originalStyles.has(el)) {
          const styles = originalStyles.get(el);
          el.style.maxHeight = styles.maxHeight;
          el.style.overflow = styles.overflow;
          el.style.overflowY = styles.overflowY;
        }
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Compute image dimensions to preserve aspect ratio and fit to
      // PDF page width.
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = pageWidth;

      // Scale factor: CSS pixels -> PDF mm (uniform image scaling)
      const pixelToMm = imgWidth / previewWidthPx;
      const canvasScale = canvasWidth / previewWidthPx;
      const pageCapacityPx = (pageHeight * canvasWidth) / pageWidth;
      const safeBreaks = pageBreakPositions
        .map((position) => position * canvasScale)
        .filter((position) => position > 0 && position < canvasHeight)
        .sort((left, right) => left - right);

      // Slice at section and item boundaries so text is not cut in half.
      let sourceStart = 0;
      let pageIndex = 0;
      while (sourceStart < canvasHeight) {
        const maxSourceEnd = Math.min(
          sourceStart + pageCapacityPx,
          canvasHeight,
        );
        const nextSafeBreak = safeBreaks
          .filter(
            (position) => position > sourceStart && position <= maxSourceEnd,
          )
          .at(-1);
        const sourceEnd =
          maxSourceEnd === canvasHeight
            ? canvasHeight
            : nextSafeBreak || maxSourceEnd;
        const sliceHeight = Math.ceil(sourceEnd - sourceStart);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceHeight;
        pageCanvas
          .getContext("2d")
          .drawImage(
            canvas,
            0,
            sourceStart,
            canvasWidth,
            sliceHeight,
            0,
            0,
            canvasWidth,
            sliceHeight,
          );

        if (pageIndex > 0) pdf.addPage();
        const sliceHeightMm = (sliceHeight * pageWidth) / canvasWidth;
        pdf.addImage(
          pageCanvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          pageWidth,
          sliceHeightMm,
        );

        // Overlay invisible clickable link annotations on top of the
        // rasterised image so that email / LinkedIn / GitHub links are
        // tappable in the downloaded PDF (html2canvas produces a flat
        // image with no interactivity on its own).
        linkPositions.forEach((link) => {
          const linkPdfY = link.top * pixelToMm;
          const sourceStartCss = sourceStart / canvasScale;
          const sourceEndCss = sourceEnd / canvasScale;
          if (link.top >= sourceStartCss && link.top < sourceEndCss) {
            const pdfX = link.left * pixelToMm;
            const pdfY = linkPdfY - sourceStartCss * pixelToMm;
            const pdfW = Math.max(link.width * pixelToMm, 1);
            const pdfH = Math.max(link.height * pixelToMm, 1);
            pdf.link(pdfX, pdfY, pdfW, pdfH, { url: link.url });
          }
        });

        sourceStart = sourceEnd;
        pageIndex += 1;
      }

      pdf.save(`${(resume.name || "resume").replace(/\s+/g, "_")}_Resume.pdf`);
    } catch (error) {
      console.error(
        "PDF generation failed, falling back to text-based PDF:",
        error,
      );
      // Fallback to the original jsPDF text-based approach
      downloadPDFText();
    }
  };

  const downloadPDFText = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    // ===== HEADER (white background with dark blue text - matches preview) =====
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, 55, "F");

    // Name
    doc.setTextColor(0, 0, 0); // dark blue #1e3a8a
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text((resume.name || "Your Name").toUpperCase(), pageWidth / 2, 22, {
      align: "center",
    });

    // Contact line - render as clean text (no emojis for PDF compatibility)
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // gray #4b5563

    const contactItems = [];
    if (resume.location) {
      contactItems.push({ label: resume.location, url: null });
    }
    if (resume.email) {
      const emailUrl = resume.email.startsWith("http")
        ? resume.email
        : `mailto:${resume.email}`;
      contactItems.push({ label: resume.email, url: emailUrl });
    }
    if (resume.phone) {
      const phoneUrl = `tel:${resume.phone.replace(/\s+/g, "")}`;
      contactItems.push({ label: resume.phone, url: phoneUrl });
    }
    if (resume.linkedin) {
      // Handle case where LinkedIn URL is just "LinkedIn" or incomplete
      let linkedinUrl = resume.linkedin;
      if (!linkedinUrl.startsWith("http")) {
        // If it's just "LinkedIn" or similar, we'll leave the label as-is but set url to null
        // so it doesn't show a broken link; the preview will show it as plain text
        contactItems.push({
          label: "LinkedIn",
          url: null,
        });
      } else {
        linkedinUrl = resume.linkedin.startsWith("http")
          ? resume.linkedin
          : `https://${resume.linkedin.replace(/^https?:\/\//, "")}`;
        contactItems.push({
          label: "LinkedIn",
          url: linkedinUrl,
        });
      }
    }
    if (resume.github) {
      const githubUrl = resume.github.startsWith("http")
        ? resume.github
        : `https://${resume.github.replace(/^https?:\/\//, "")}`;
      contactItems.push({
        label: "GitHub",
        url: githubUrl,
      });
    }
    if (resume.website && resume.websiteName) {
      const websiteUrl = resume.website.startsWith("http")
        ? resume.website
        : `https://${resume.website.replace(/^https?:\/\//, "")}`;
      contactItems.push({
        label: resume.websiteName,
        url: websiteUrl,
      });
    }
    const contactLine = contactItems.map((item) => item.label).join("  |  ");
    const contactLines = doc.splitTextToSize(contactLine, contentWidth);
    let contactY = 42;
    contactLines.forEach((line) => {
      doc.text(line, pageWidth / 2, contactY, { align: "center" });
      contactY += 5;
    });

    // Add clickable link annotations over contact items in PDF
    if (contactLines.length > 0) {
      const lineHeight = 5;
      contactLines.forEach((line, lineIdx) => {
        const yPos = 42 + lineIdx * lineHeight;
        const lineWidth = doc.getTextWidth(line);
        const startX = (pageWidth - lineWidth) / 2;
        let runningText = "";

        contactItems.forEach((item) => {
          if (!item.url) {
            runningText += item.label + "  |  ";
            return;
          }
          const itemWidth = doc.getTextWidth(item.label);
          const beforeWidth = doc.getTextWidth(runningText);
          // Add invisible link over the item text
          doc.link(startX + beforeWidth, yPos - 4, itemWidth, lineHeight + 2, {
            url: item.url,
          });
          runningText += item.label + "  |  ";
        });
      });
    }

    y = 70;

    // ===== HELPER FUNCTIONS =====
    // Helper to ensure content fits on current page; moves to new page if needed
    const ensureSpace = (requiredHeight) => {
      if (y + requiredHeight > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
    };

    const addSection = (title) => {
      ensureSpace(15);
      doc.setTextColor(0, 0, 0); // plain black, no blue
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(title.toUpperCase(), margin, y);
      y += 4;
      doc.setDrawColor(209, 213, 219); // light gray line
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    };

    // Parse **bold** markdown syntax into styled text segments
    const parseSegments = (text) => {
      if (!text) return [{ text: "", bold: false }];
      const parts = text.split(/(\*\*.*?\*\*)/g).filter((p) => p.length > 0);
      return parts.map((part) => ({
        text: part.startsWith("**") ? part.slice(2, -2) : part,
        bold: part.startsWith("**"),
      }));
    };

    // Flatten segments into tokens (words + whitespace), each carrying
    // its own bold flag so we can wrap lines and render inline bold.
    const segmentToTokens = (segments) => {
      const tokens = [];
      segments.forEach((seg) => {
        seg.text
          .match(/\S+|\s+/g)
          ?.forEach((t) => tokens.push({ text: t, bold: seg.bold }));
      });
      return tokens;
    };

    // Greedily wrap tokens into lines that fit within maxWidth
    const wrapTokens = (tokens, maxWidth, size) => {
      doc.setFontSize(size);
      const lines = [];
      let currentLine = [];
      let currentWidth = 0;
      tokens.forEach((token) => {
        doc.setFont("helvetica", token.bold ? "bold" : "normal");
        const w = doc.getTextWidth(token.text);
        if (currentWidth + w > maxWidth && currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = [];
          currentWidth = 0;
        }
        currentLine.push(token);
        currentWidth += w;
      });
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
      return lines.length > 0 ? lines : [[]];
    };

    // Render a line of tokens at startX, current baseline y
    const drawTokens = (tokens, startX, size, color) => {
      let currentX = startX;
      tokens.forEach((token) => {
        doc.setFont("helvetica", token.bold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.text(token.text, currentX, y);
        currentX += doc.getTextWidth(token.text);
      });
    };

    const addText = (
      text,
      size = 10,
      bold = false,
      indent = 0,
      color = [0, 0, 0],
    ) => {
      let tokens = segmentToTokens(parseSegments(text));
      if (bold) {
        tokens = tokens.map((t) => ({ ...t, bold: true }));
      }
      const maxWidth = contentWidth - indent;
      const lines = wrapTokens(tokens, maxWidth, size);
      ensureSpace(lines.length * 5.5);
      lines.forEach((line) => {
        drawTokens(line, margin + indent, size, color);
        y += 5.5;
      });
    };

    const addBullet = (text, size = 10, indent = 0) => {
      const tokens = segmentToTokens(parseSegments(text.trim()));
      const maxWidth = contentWidth - 12 - indent;
      const lines = wrapTokens(tokens, maxWidth, size);
      ensureSpace(lines.length * 5.5);
      lines.forEach((line, i) => {
        if (i === 0) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(size);
          doc.setTextColor(0, 0, 0);
          doc.text("•", margin + 2 + indent, y);
        }
        drawTokens(line, margin + 10 + indent, size, [0, 0, 0]);
        y += 5.5;
      });
    };

    // ===== SUMMARY =====
    if (resume.summary && resumeTemplate === "template1") {
      addSection("Professional Summary");
      addText(resume.summary, 10);
      y += 4;
    }

    // ===== SKILLS =====
    const skillEntries = Object.entries(resume.skills).filter(([, v]) => v);
    if (skillEntries.length > 0) {
      addSection(
        resumeTemplate === "template2" ? "Skills" : "Technical Skills",
      );
      const skillLabels = {
        languages: "Languages",
        frameworks: "Frameworks",
        frontend: "Frontend",
        databases: "Databases",
        devops: "DevOps",
        testing: "Testing",
        cloud: "Cloud",
        messaging: "Messaging",
        concepts: "Core Concepts",
      };
      // Calculate max label width for consistent two-column alignment
      const labelWidths = skillEntries.map(([key]) => {
        const label =
          skillLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        return doc.getTextWidth(`${label}:`);
      });
      const maxLabelWidth = Math.max(...labelWidths);
      const valueX = margin + 2 + maxLabelWidth + 6;

      skillEntries.forEach(([key, value]) => {
        const label =
          skillLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`${label}:`, margin + 2, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        const valueLines = doc.splitTextToSize(
          value,
          pageWidth - valueX - margin,
        );
        ensureSpace(valueLines.length * 5.5);
        valueLines.forEach((line) => {
          doc.text(line, valueX, y);
          y += 5.5;
        });
        y += 1;
      });
      y += 3;
    }

    // ===== EXPERIENCE =====
    if (resume.experience.some((e) => e.company || e.role)) {
      addSection(
        resumeTemplate === "template2"
          ? "Experience"
          : "Professional Experience",
      );
      resume.experience.forEach((exp) => {
        if (!exp.company && !exp.role) return;
        ensureSpace(30);
        const hasSeparateRole =
          resumeTemplate === "template2" && Boolean(exp.company && exp.role);
        if (resumeTemplate === "template2") {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
          const company = exp.company || exp.role;
          doc.text(company, margin, y);
          if (hasSeparateRole) {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.text(exp.role, margin, y + 5);
          }
        } else {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
          const title = `${exp.role}${exp.company ? " - " + exp.company : ""}`;
          doc.text(title, margin, y);
        }

        // Location | Dates — right-aligned, same baseline as the title
        if (exp.location || exp.startDate || exp.endDate) {
          // Build compact line: location | dates format
          let lineText = "";
          if (exp.location) {
            lineText = exp.location;
          }
          if (exp.startDate || exp.endDate) {
            const dates = `${exp.startDate || ""}${exp.startDate && exp.endDate ? " - " : ""}${exp.endDate || ""}`;
            if (lineText) {
              lineText += " | " + dates;
            } else {
              lineText = dates;
            }
          }
          if (lineText) {
            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            doc.text(lineText, pageWidth - margin, y, { align: "right" });
          }
        }
        y += hasSeparateRole ? 13 : 8;

        // Bullet points
        exp.points.filter(Boolean).forEach((point) => {
          addBullet(point, 10);
        });
        y += 4;
      });
    }

    // ===== PROJECTS =====
    if (resume.projects.some((p) => p.name)) {
      addSection(
        resumeTemplate === "template2" ? "Projects" : "Technical Projects",
      );
      resume.projects.forEach((proj) => {
        if (!proj.name) return;
        ensureSpace(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(stripBold(proj.name), margin, y);
        if (proj.techStack) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.setTextColor(0, 0, 0);
          const techText = stripBold(proj.techStack);
          const techWidth = doc.getTextWidth(techText);
          doc.text(techText, pageWidth - margin - techWidth, y);
        }
        y += 5;
        proj.points.filter(Boolean).forEach((point) => {
          addBullet(point, 10);
        });
        y += 4;
      });
    }

    // ===== EDUCATION =====
    if (resume.education.some((e) => e.degree || e.institution)) {
      addSection("Education");
      resume.education.forEach((edu) => {
        if (!edu.degree && !edu.institution) return;
        ensureSpace(30);

        // Line 1: Institution (left, bold) and Years (right, normal/italic)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        // Whole institution line is bold by design — strip any ** markers so
        // AI-written markdown never prints as literal asterisks in the PDF.
        doc.text((edu.institution || "").replace(/\*\*/g, ""), margin, y);

        if (edu.startYear || edu.endYear) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          const years = `${edu.startYear || ""}${edu.startYear && edu.endYear ? " – " : ""}${edu.endYear || ""}`;
          doc.text(years, pageWidth - margin, y, { align: "right" });
        }

        y += 5;

        // Line 2: Degree + CGPA (left, degree regular, CGPA italic) and Location (right, italic)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        let degreeText = edu.degree || "";
        let cgpaText = edu.cgpa ? `CGPA: ${edu.cgpa}` : "";

        // The degree can carry **bold** markdown from the AI — draw it as
        // inline bold segments (same tokenizer the bullets use), then the
        // separator and the italic CGPA after it.
        const degreeTokens = segmentToTokens(parseSegments(degreeText));
        const sep = degreeText && cgpaText ? "| " : "";
        let degreeWidth = 0;
        degreeTokens.forEach((t) => {
          doc.setFont("helvetica", t.bold ? "bold" : "normal");
          degreeWidth += doc.getTextWidth(t.text);
        });
        doc.setFont("helvetica", "normal");
        degreeWidth += doc.getTextWidth(sep);
        let dx = margin;
        degreeTokens.forEach((t) => {
          doc.setFont("helvetica", t.bold ? "bold" : "normal");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.text(t.text, dx, y);
          dx += doc.getTextWidth(t.text);
        });
        if (sep) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.text(sep, dx, y);
        }
        if (cgpaText) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.text(cgpaText, margin + degreeWidth, y);
        }

        if (edu.location) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.setTextColor(0, 0, 0);
          doc.text(edu.location, pageWidth - margin, y, { align: "right" });
        }

        y += 8;
      });
    }

    // ===== CERTIFICATES =====
    const certs = resume.certificates.filter(getCertName);
    if (certs.length > 0) {
      addSection("Certifications");
      certs.forEach((cert) => {
        const certName = getCertName(cert);
        const certIssuer = getCertIssuer(cert);
        const certLabel =
          resumeTemplate === "template2" && certIssuer
            ? `${certName} - ${certIssuer}`
            : certName;
        const certIndent = resumeTemplate === "template2" ? 4 : 0;
        const certUrl = typeof cert === "string" ? "" : cert.url || "";
        if (certUrl && certUrl.startsWith("http")) {
          // Draw clickable link for certificate
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(30, 58, 138);
          const lines = doc.splitTextToSize(
            certLabel,
            contentWidth - 12 - certIndent,
          );
          ensureSpace(lines.length * 5.5);
          const linkY = y;
          lines.forEach((line, i) => {
            if (i === 0) {
              doc.text("•", margin + 2 + certIndent, y);
              doc.text(line, margin + 10 + certIndent, y);
            } else {
              doc.text(line, margin + 10 + certIndent, y);
            }
            y += 5.5;
          });
          doc.link(
            margin + 8 + certIndent,
            linkY - 4,
            doc.getTextWidth(certLabel),
            5,
            {
              url: certUrl,
            },
          );
          doc.setTextColor(0, 0, 0);
        } else {
          addBullet(certLabel, 10, certIndent);
        }
      });
    }

    doc.save(`${(resume.name || "resume").replace(/\s+/g, "_")}_Resume.pdf`);
  };

  const renderStep = () => {
    switch (STEPS[step].id) {
      case "upload":
        return (
          <div className="rb-upload-wrap">
            <div className="rb-upload-icon">📤</div>
            <h3>Upload Your Resume</h3>
            <p>
              Upload your existing resume (PDF, TXT) and BSK AI will
              automatically detect your name, contact info, experience,
              projects, skills, education, and more — then fill all the resume
              builder fields for you.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.md,.doc"
              onChange={handleResumeUpload}
              style={{ display: "none" }}
            />

            <button
              className="rb-upload-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingResume || aiLoading}
            >
              {uploadingResume ? (
                <>
                  <span className="rb-ai-spinner">⏳</span>
                  {uploadedFile ? `Parsing ${uploadedFile}...` : "Reading..."}
                </>
              ) : (
                <>
                  <span>📄</span>
                  Choose Resume File
                </>
              )}
            </button>

            {uploadedFile && !uploadingResume && (
              <div className="rb-upload-file">
                <span>✅</span>
                <span>
                  <strong>{uploadedFile}</strong> uploaded
                </span>
                {parsingComplete && (
                  <span className="rb-upload-done">✓ Parsed</span>
                )}
              </div>
            )}

            {parsingComplete && (
              <div className="rb-upload-success">
                <span>🎉</span>
                <div>
                  <strong>Resume data extracted!</strong>
                  <p>
                    {resume.name ? `Welcome, ${resume.name}! ` : ""}All your
                    details have been auto-filled. Review each section and make
                    edits if needed, or click "Next →" to continue.
                  </p>
                </div>
              </div>
            )}

            {resumeReady && !hasSavedResume && (
              <>
                <div className="rb-upload-or">
                  <span>OR</span>
                </div>

                <button className="rb-upload-skip" onClick={() => setStep(1)}>
                  Start from scratch & fill manually →
                </button>
              </>
            )}

            <p className="rb-upload-hint">
              💡 Supported formats: PDF, TXT, MD. Your file is processed locally
              and only sent to Gemini for data extraction.
            </p>
          </div>
        );

      case "personal":
        return (
          <div className="rb-form-grid">
            <div className="rb-field">
              <label>Full Name *</label>
              <input
                type="text"
                value={resume.name}
                onChange={(e) =>
                  updateField("personal", "name", e.target.value)
                }
                placeholder="e.g. Venkatesh Bharath"
              />
            </div>
            <div className="rb-field">
              <label>Professional Title *</label>
              <input
                type="text"
                value={resume.title}
                onChange={(e) =>
                  updateField("personal", "title", e.target.value)
                }
                placeholder="e.g. Full Stack Developer"
              />
            </div>
            <div className="rb-field">
              <label>Email *</label>
              <input
                type="email"
                value={resume.email}
                onChange={(e) =>
                  updateField("personal", "email", e.target.value)
                }
                placeholder="e.g. yourname@email.com"
              />
            </div>
            <div className="rb-field">
              <label>Phone</label>
              <input
                type="tel"
                value={resume.phone}
                onChange={(e) =>
                  updateField("personal", "phone", e.target.value)
                }
                placeholder="e.g. +91-XXXXXXXXXX"
              />
            </div>
            <div className="rb-field">
              <label>Location</label>
              <input
                type="text"
                value={resume.location}
                onChange={(e) =>
                  updateField("personal", "location", e.target.value)
                }
                placeholder="e.g. Bangalore, India"
              />
            </div>
            <div className="rb-field">
              <label>LinkedIn URL</label>
              <input
                type="text"
                value={resume.linkedin}
                onChange={(e) =>
                  updateField("personal", "linkedin", e.target.value)
                }
                placeholder="e.g. linkedin.com/in/yourname"
              />
            </div>
            <div className="rb-field">
              <label>GitHub URL</label>
              <input
                type="text"
                value={resume.github}
                onChange={(e) =>
                  updateField("personal", "github", e.target.value)
                }
                placeholder="e.g. github.com/yourname"
              />
            </div>
            <div className="rb-field">
              <label>Website URL</label>
              <input
                type="text"
                value={resume.website}
                onChange={(e) =>
                  updateField("personal", "website", e.target.value)
                }
                placeholder="e.g. https://yourwebsite.com"
              />
            </div>
            <div className="rb-field">
              <label>Website Name</label>
              <input
                type="text"
                value={resume.websiteName}
                onChange={(e) =>
                  updateField("personal", "websiteName", e.target.value)
                }
                placeholder="e.g. Portfolio, LeetCode, HackerRank"
              />
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="rb-form-grid">
            <div className="rb-field rb-full">
              <label>Professional Summary</label>
              <textarea
                value={resume.summary}
                onChange={(e) =>
                  updateField("summary", "summary", e.target.value)
                }
                placeholder="Write 2-3 sentences about your experience, expertise, and what you bring..."
                rows="5"
              />
              <p className="rb-hint">
                Tip: Type `**text**` (with two asterisks before and after) for
                bold formatting.
              </p>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="rb-form-grid">
            {resume.experience.map((exp, idx) => (
              <div key={idx} className="rb-card-item">
                <div className="rb-card-header">
                  <h4>Experience {idx + 1}</h4>
                  {resume.experience.length > 1 && (
                    <button
                      className="rb-remove-btn"
                      onClick={() => removeArrayItem("experience", idx)}
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>
                <div className="rb-field">
                  <label>Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      updateArrayItem(
                        "experience",
                        idx,
                        "company",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Zensar"
                  />
                </div>
                <div className="rb-field">
                  <label>Role / Title</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) =>
                      updateArrayItem("experience", idx, "role", e.target.value)
                    }
                    placeholder="e.g. Technical Specialist"
                  />
                </div>
                <div className="rb-field-row">
                  <div className="rb-field">
                    <label>Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateArrayItem(
                          "experience",
                          idx,
                          "startDate",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. May 2026"
                    />
                  </div>
                  <div className="rb-field">
                    <label>End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateArrayItem(
                          "experience",
                          idx,
                          "endDate",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. Present"
                    />
                  </div>
                </div>
                <div className="rb-field">
                  <label>Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      updateArrayItem(
                        "experience",
                        idx,
                        "location",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Remote - Bangalore, KA, India"
                  />
                </div>
                <div className="rb-field">
                  <label>Achievements / Responsibilities</label>
                  {exp.points.map((point, pIdx) => (
                    <div key={pIdx} className="rb-point-row">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) =>
                          updateArrayPoint(
                            "experience",
                            idx,
                            pIdx,
                            e.target.value,
                          )
                        }
                        placeholder={`e.g. Developed RESTful APIs using Java, Spring Boot...`}
                      />
                      {exp.points.length > 1 && (
                        <button
                          className="rb-point-remove"
                          onClick={() => removePoint("experience", idx, pIdx)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    className="rb-add-point"
                    onClick={() => addPoint("experience", idx)}
                  >
                    + Add Point
                  </button>
                </div>
              </div>
            ))}
            <button
              className="rb-add-item"
              onClick={() => addArrayItem("experience")}
            >
              + Add Another Experience
            </button>
          </div>
        );

      case "projects":
        return (
          <div className="rb-form-grid">
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="rb-card-item">
                <div className="rb-card-header">
                  <h4>Project {idx + 1}</h4>
                  {resume.projects.length > 1 && (
                    <button
                      className="rb-remove-btn"
                      onClick={() => removeArrayItem("projects", idx)}
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>
                <div className="rb-field">
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) =>
                      updateArrayItem("projects", idx, "name", e.target.value)
                    }
                    placeholder="e.g. MARS Platform"
                  />
                </div>
                <div className="rb-field">
                  <label>Tech Stack</label>
                  <input
                    type="text"
                    value={proj.techStack}
                    onChange={(e) =>
                      updateArrayItem(
                        "projects",
                        idx,
                        "techStack",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Java, Spring Boot, Kafka, Cassandra"
                  />
                </div>
                <div className="rb-field">
                  <label>Key Contributions</label>
                  {proj.points.map((point, pIdx) => (
                    <div key={pIdx} className="rb-point-row">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) =>
                          updateArrayPoint(
                            "projects",
                            idx,
                            pIdx,
                            e.target.value,
                          )
                        }
                        placeholder={`e.g. Developed RESTful APIs for payment processing...`}
                      />
                      {proj.points.length > 1 && (
                        <button
                          className="rb-point-remove"
                          onClick={() => removePoint("projects", idx, pIdx)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    className="rb-add-point"
                    onClick={() => addPoint("projects", idx)}
                  >
                    + Add Point
                  </button>
                </div>
              </div>
            ))}
            <button
              className="rb-add-item"
              onClick={() => addArrayItem("projects")}
            >
              + Add Another Project
            </button>
          </div>
        );

      case "skills":
        return (
          <div className="rb-form-grid">
            <div className="rb-field">
              <label>Languages</label>
              <input
                type="text"
                value={resume.skills.languages}
                onChange={(e) =>
                  updateField("skills", "languages", e.target.value)
                }
                placeholder="e.g. Java, SQL, JavaScript"
              />
            </div>
            <div className="rb-field">
              <label>Frameworks</label>
              <input
                type="text"
                value={resume.skills.frameworks}
                onChange={(e) =>
                  updateField("skills", "frameworks", e.target.value)
                }
                placeholder="e.g. Spring Boot, Spring MVC, Hibernate"
              />
            </div>
            <div className="rb-field">
              <label>Frontend</label>
              <input
                type="text"
                value={resume.skills.frontend}
                onChange={(e) =>
                  updateField("skills", "frontend", e.target.value)
                }
                placeholder="e.g. React.js, Material-UI, HTML5, CSS3"
              />
            </div>
            <div className="rb-field">
              <label>Databases</label>
              <input
                type="text"
                value={resume.skills.databases}
                onChange={(e) =>
                  updateField("skills", "databases", e.target.value)
                }
                placeholder="e.g. MySQL, Oracle, PostgreSQL"
              />
            </div>
            <div className="rb-field">
              <label>DevOps</label>
              <input
                type="text"
                value={resume.skills.devops}
                onChange={(e) =>
                  updateField("skills", "devops", e.target.value)
                }
                placeholder="e.g. Git, Maven, Jenkins, Docker"
              />
            </div>
            <div className="rb-field">
              <label>Testing</label>
              <input
                type="text"
                value={resume.skills.testing}
                onChange={(e) =>
                  updateField("skills", "testing", e.target.value)
                }
                placeholder="e.g. JUnit, Mockito, Postman"
              />
            </div>
            <div className="rb-field">
              <label>Cloud</label>
              <input
                type="text"
                value={resume.skills.cloud}
                onChange={(e) => updateField("skills", "cloud", e.target.value)}
                placeholder="e.g. GCP, AWS, Azure"
              />
            </div>
            <div className="rb-field">
              <label>Messaging</label>
              <input
                type="text"
                value={resume.skills.messaging}
                onChange={(e) =>
                  updateField("skills", "messaging", e.target.value)
                }
                placeholder="e.g. Apache Kafka, JMS, RabbitMQ"
              />
            </div>
            <div className="rb-field rb-full">
              <label>Core Concepts</label>
              <input
                type="text"
                value={resume.skills.concepts}
                onChange={(e) =>
                  updateField("skills", "concepts", e.target.value)
                }
                placeholder="e.g. Microservices, System Design, DSA, Agile/Scrum"
              />
            </div>
          </div>
        );

      case "education":
        return (
          <div className="rb-form-grid">
            {resume.education.map((edu, idx) => (
              <div key={idx} className="rb-card-item">
                <div className="rb-card-header">
                  <h4>Education {idx + 1}</h4>
                  {resume.education.length > 1 && (
                    <button
                      className="rb-remove-btn"
                      onClick={() => removeArrayItem("education", idx)}
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>
                <div className="rb-field">
                  <label>Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateArrayItem(
                        "education",
                        idx,
                        "degree",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Master of Computer Applications"
                  />
                </div>
                <div className="rb-field">
                  <label>Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      updateArrayItem(
                        "education",
                        idx,
                        "institution",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Siddharth Institute of Engineering & Technology"
                  />
                </div>
                <div className="rb-field-row">
                  <div className="rb-field">
                    <label>Start Year</label>
                    <input
                      type="text"
                      value={edu.startYear}
                      onChange={(e) =>
                        updateArrayItem(
                          "education",
                          idx,
                          "startYear",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. 2019"
                    />
                  </div>
                  <div className="rb-field">
                    <label>End Year</label>
                    <input
                      type="text"
                      value={edu.endYear}
                      onChange={(e) =>
                        updateArrayItem(
                          "education",
                          idx,
                          "endYear",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. 2021"
                    />
                  </div>
                </div>
                <div className="rb-field-row">
                  <div className="rb-field">
                    <label>CGPA / Percentage</label>
                    <input
                      type="text"
                      value={edu.cgpa}
                      onChange={(e) =>
                        updateArrayItem(
                          "education",
                          idx,
                          "cgpa",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. 7.90"
                    />
                  </div>
                  <div className="rb-field">
                    <label>Location</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) =>
                        updateArrayItem(
                          "education",
                          idx,
                          "location",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. Puttur"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="rb-add-item"
              onClick={() => addArrayItem("education")}
            >
              + Add Another Education
            </button>
          </div>
        );

      case "certificates":
        return (
          <div className="rb-form-grid">
            {resume.certificates.map((cert, idx) => (
              <div key={idx} className="rb-card-item">
                <div className="rb-card-header">
                  <h4>Certificate {idx + 1}</h4>
                  {resume.certificates.length > 1 && (
                    <button
                      className="rb-remove-btn"
                      onClick={() => removeArrayItem("certificates", idx)}
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>
                <div className="rb-field">
                  <label>Certificate Name</label>
                  <input
                    type="text"
                    value={cert.name || ""}
                    onChange={(e) =>
                      updateArrayItem(
                        "certificates",
                        idx,
                        "name",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Oracle Certified Associate"
                  />
                </div>
                <div className="rb-field">
                  <label>Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.issuer || ""}
                    onChange={(e) =>
                      updateArrayItem(
                        "certificates",
                        idx,
                        "issuer",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Oracle or Google Cloud Platform (GCP)"
                  />
                </div>
                <div className="rb-field">
                  <label>Certificate URL (optional)</label>
                  <input
                    type="text"
                    value={cert.url || ""}
                    onChange={(e) =>
                      updateArrayItem(
                        "certificates",
                        idx,
                        "url",
                        e.target.value,
                      )
                    }
                    placeholder="e.g. https://www.credly.com/badges/..."
                  />
                  <p className="rb-hint">
                    Add a link so the certificate is clickable in the preview
                    and PDF. Use `**text**` for bold formatting.
                  </p>
                </div>
              </div>
            ))}
            <button
              className="rb-add-item"
              onClick={() => addArrayItem("certificates")}
            >
              + Add Another Certificate
            </button>
          </div>
        );

      case "preview":
        return (
          <div className="rb-preview-wrap">
            <div className="rb-preview-actions">
              <div
                className="rb-template-switch"
                role="group"
                aria-label="Resume template"
              >
                <button
                  type="button"
                  className={resumeTemplate === "template1" ? "active" : ""}
                  aria-pressed={resumeTemplate === "template1"}
                  onClick={() => setResumeTemplate("template1")}
                >
                  Template 1
                </button>
                <button
                  type="button"
                  className={resumeTemplate === "template2" ? "active" : ""}
                  aria-pressed={resumeTemplate === "template2"}
                  onClick={() => setResumeTemplate("template2")}
                >
                  Template 2
                </button>
              </div>
              <button className="rb-download-btn" onClick={downloadPDF}>
                ⬇ Download PDF
              </button>
              <button
                className="rb-preview-toggle"
                onClick={() => {
                  setShowPreview(false);
                  setStep(1);
                }}
              >
                Edit This Resume
              </button>
              <button
                className="rb-preview-toggle"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
            <div
              ref={previewRef}
              className={`rb-preview${resumeTemplate === "template2" ? " rb-preview--template2" : ""}`}
              style={{
                display: showPreview
                  ? resumeTemplate === "template2"
                    ? "flex"
                    : "block"
                  : "none",
                flexDirection: "column",
              }}
            >
              <div className="rb-preview-header">
                <h2>{(resume.name || "Your Name").toUpperCase()}</h2>
                {resumeTemplate === "template1" && resume.title && (
                  <p className="rb-preview-title">{resume.title}</p>
                )}
                <p className="rb-preview-contact">
                  {resume.location && (
                    <span className="rb-preview-contact-item">
                      <FaLocationDot className="rb-preview-icon" />
                      {resume.location}
                    </span>
                  )}
                  {resume.email && (
                    <a
                      href={
                        resume.email.startsWith("http")
                          ? resume.email
                          : `mailto:${resume.email}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rb-preview-contact-item rb-preview-link"
                    >
                      <FaSquareEnvelope className="rb-preview-icon" />
                      {resume.email}
                    </a>
                  )}
                  {resume.phone && (
                    <a
                      href={`tel:${resume.phone.replace(/\s+/g, "")}`}
                      className="rb-preview-contact-item rb-preview-link"
                    >
                      <FaSquarePhone className="rb-preview-icon" />
                      {resume.phone}
                    </a>
                  )}
                  {resume.linkedin && (
                    <a
                      href={
                        resume.linkedin.startsWith("http")
                          ? resume.linkedin
                          : `https://${resume.linkedin.replace(/^https?:\/\//, "")}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rb-preview-contact-item rb-preview-link"
                    >
                      <FaLinkedin className="rb-preview-icon" />
                      LinkedIn
                    </a>
                  )}
                  {resume.github && (
                    <a
                      href={
                        resume.github.startsWith("http")
                          ? resume.github
                          : `https://${resume.github.replace(/^https?:\/\//, "")}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rb-preview-contact-item rb-preview-link"
                    >
                      <FaSquareGithub className="rb-preview-icon" />
                      GitHub
                    </a>
                  )}
                  {resume.website && resume.websiteName && (
                    <a
                      href={
                        resume.website.startsWith("http")
                          ? resume.website
                          : `https://${resume.website.replace(/^https?:\/\//, "")}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rb-preview-contact-item rb-preview-link"
                    >
                      <CgWebsite className="rb-preview-icon" />
                      {resume.websiteName}
                    </a>
                  )}
                </p>
              </div>
              {resumeTemplate === "template1" && resume.summary && (
                <div className="rb-preview-section rb-preview-section--summary">
                  <h3>Professional Summary</h3>
                  <p>{formatText(resume.summary)}</p>
                </div>
              )}
              {Object.entries(resume.skills).some(([, v]) => v) && (
                <div className="rb-preview-section rb-preview-section--skills">
                  <h3>
                    {resumeTemplate === "template2"
                      ? "Skills"
                      : "Technical Skills"}
                  </h3>
                  <div className="rb-preview-skills-grid">
                    {Object.entries(resume.skills)
                      .filter(([, v]) => v)
                      .map(([key, value]) => (
                        <Fragment key={key}>
                          <span className="rb-preview-skill-label">
                            {SKILL_LABELS[key] ||
                              key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                          <span className="rb-preview-skill-colon">:</span>
                          <span className="rb-preview-skill-value">
                            {formatText(value)}
                          </span>
                        </Fragment>
                      ))}
                  </div>
                </div>
              )}
              {resume.experience.some((e) => e.company || e.role) && (
                <div className="rb-preview-section rb-preview-section--experience">
                  <h3>
                    {resumeTemplate === "template2"
                      ? "Experience"
                      : "Professional Experience"}
                  </h3>
                  {resume.experience
                    .filter((e) => e.company || e.role)
                    .map((exp, idx) => (
                      <div key={idx} className="rb-preview-item">
                        <div className="rb-preview-item-header">
                          {resumeTemplate === "template2" ? (
                            <div className="rb-preview-experience-title">
                              <strong>{exp.company || exp.role}</strong>
                              {exp.company && exp.role && (
                                <span className="rb-preview-experience-role">
                                  {exp.role}
                                </span>
                              )}
                            </div>
                          ) : (
                            <strong>
                              {exp.role}
                              {exp.company ? ` - ${exp.company}` : ""}
                            </strong>
                          )}
                          <span>
                            {exp.location}
                            {exp.location && (exp.startDate || exp.endDate)
                              ? " | "
                              : ""}
                            {exp.startDate}
                            {exp.startDate && exp.endDate ? " - " : ""}
                            {exp.endDate}
                          </span>
                        </div>
                        <ul>
                          {exp.points.filter(Boolean).map((p, i) => (
                            <li key={i}>{formatText(p.trim())}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              )}
              {resume.projects.some((p) => p.name) && (
                <div className="rb-preview-section rb-preview-section--projects">
                  <h3>
                    {resumeTemplate === "template2"
                      ? "Projects"
                      : "Technical Projects"}
                  </h3>
                  {resume.projects
                    .filter((p) => p.name)
                    .map((proj, idx) => (
                      <div key={idx} className="rb-preview-item">
                        <div className="rb-preview-item-header">
                          <strong>{stripBold(proj.name)}</strong>
                          {proj.techStack && (
                            <span className="rb-preview-tech">
                              {stripBold(proj.techStack)}
                            </span>
                          )}
                        </div>
                        <ul>
                          {proj.points.filter(Boolean).map((p, i) => (
                            <li key={i}>{formatText(p.trim())}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              )}
              {resume.education.some((e) => e.degree || e.institution) && (
                <div className="rb-preview-section rb-preview-section--education">
                  <h3>Education</h3>
                  {resume.education
                    .filter((e) => e.degree || e.institution)
                    .map((edu, idx) => (
                      <div key={idx} className="rb-preview-item">
                        <div className="rb-preview-item-header">
                          <strong>{formatText(edu.institution)}</strong>
                          <span>
                            {edu.startYear}
                            {edu.startYear && edu.endYear ? " - " : ""}
                            {edu.endYear}
                          </span>
                        </div>
                        <div
                          className="rb-preview-item-header"
                          style={{
                            fontStyle: "normal",
                            color: "#000000",
                            marginTop: "2px",
                          }}
                        >
                          <span style={{ fontSize: "0.85rem" }}>
                            {formatText(edu.degree)}
                            {edu.degree && edu.cgpa ? " | " : ""}
                            {edu.cgpa && (
                              <span style={{ fontStyle: "italic" }}>
                                CGPA: {edu.cgpa}
                              </span>
                            )}
                          </span>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontStyle: "italic",
                              color: "#000000",
                            }}
                          >
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {resume.certificates.filter(getCertName).length > 0 && (
                <div className="rb-preview-section rb-preview-section--certifications">
                  <h3>Certifications</h3>
                  <ul>
                    {resume.certificates
                      .filter(getCertName)
                      .map((cert, idx) => {
                        const certName = getCertName(cert);
                        const certIssuer = getCertIssuer(cert);
                        const certLabel =
                          resumeTemplate === "template2" && certIssuer
                            ? `${certName} - ${certIssuer}`
                            : certName;
                        const certUrl =
                          typeof cert === "string" ? "" : cert.url || "";
                        return (
                          <li key={idx}>
                            {certUrl ? (
                              <a
                                href={
                                  certUrl.startsWith("http")
                                    ? certUrl
                                    : `https://${certUrl.replace(/^https?:\/\//, "")}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rb-preview-link"
                              >
                                {certLabel}
                              </a>
                            ) : (
                              certLabel
                            )}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={isModal ? "rb-overlay" : "rb-page"}>
      <div className={isModal ? "rb-modal" : "rb-page-card"}>
        <div className="rb-header">
          <div className="rb-header-info">
            <div>
              <h2>Resume Builder</h2>
              <p>
                Fill in your details step by step to create a professional
                resume
              </p>
              <p
                className={`rb-sync-status${
                  /^(Could not|Not saved yet|Nothing to save)/.test(
                    resumeSyncMessage,
                  )
                    ? " rb-sync-error"
                    : ""
                }`}
                role="status"
              >
                {resumeSyncMessage}
              </p>
            </div>
          </div>
          <div className="rb-header-actions">
            {resumeReady && resumeDocPath && (
              <button
                className="rb-btn rb-btn-primary rb-saved-resume-btn"
                onClick={openSavedResumePreview}
                disabled={savedResumeLoading}
                title="Open your last saved resume"
              >
                {savedResumeLoading
                  ? "Loading..."
                  : lastSavedAt
                    ? `🕘 Last saved: ${formatRelativeTime(lastSavedAt, nowTick)}`
                    : "🕘 Last saved resume"}
              </button>
            )}
            <button
              className="rb-close"
              onClick={exitBuilder}
              aria-label={
                isModal ? "Close resume builder" : "Exit resume builder"
              }
              title={isModal ? "Close" : "Exit to home"}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="rb-steps">
          {STEPS.map((s, idx) => {
            const isClickable = hasSavedResume || idx < step;
            const selectStep = () => {
              if (!isClickable) return;
              setStep(idx);
              setShowPreview(s.id === "preview");
            };

            return (
              <div
                key={s.id}
                className={`rb-step ${idx === step ? "active" : ""} ${idx < step ? "done" : ""} ${isClickable ? "clickable" : ""}`}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                aria-current={idx === step ? "step" : undefined}
                onClick={selectStep}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectStep();
                  }
                }}
              >
                <span className="rb-step-icon">{s.icon}</span>
                <span className="rb-step-label">{s.label}</span>
              </div>
            );
          })}
        </div>

        <div className="rb-body">{renderStep()}</div>

        {aiMessage && (
          <div className="rb-ai-message">
            <span>{aiMessage}</span>
          </div>
        )}

        <div className="rb-footer">
          <button
            className="rb-btn rb-btn-ghost"
            onClick={prevStep}
            disabled={step === 0}
          >
            ← Back
          </button>
          <div className="rb-footer-center">
            {step < STEPS.length - 1 && STEPS[step].id !== "upload" && (
              <button
                className="rb-btn rb-btn-ai"
                onClick={() => getAISuggestion(STEPS[step].id)}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <>
                    <span className="rb-ai-spinner">⏳</span> AI Thinking...
                  </>
                ) : (
                  <>
                    <span>✨</span> AI Suggest
                  </>
                )}
              </button>
            )}
            <div className="rb-step-indicator">
              Step {step + 1} of {STEPS.length}
            </div>
          </div>
          <button
            className="rb-btn rb-btn-primary"
            onClick={async () => {
              if (step < STEPS.length - 1) {
                nextStep();
                return;
              }
              // Last step: save on click, then open the preview.
              const saved = await saveResume();
              if (saved) setShowPreview(true);
            }}
            disabled={resumeSaving}
          >
            {step === STEPS.length - 1
              ? resumeSaving
                ? "Saving..."
                : "Save Resume"
              : STEPS[step].id === "upload"
                ? "Skip →"
                : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
