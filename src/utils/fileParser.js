// Utility to parse resume files (PDF, TXT) and extract text content
// This lets users upload their existing resume so the AI can analyze it
// and help create a properly designed resume.

import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Configure pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Extract text from a PDF file
 */
async function extractPDFText(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => item.str)
        .join(" ")
        .replace(/\s+/g, " ");
      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error(
      "Could not read the PDF file. Please try a different file or format.",
      { cause: error },
    );
  }
}

/**
 * Extract text from a TXT file
 */
async function extractTXTText(file) {
  return await file.text();
}

/**
 * Parse a resume file and return its text content
 * Supported: .pdf, .txt
 */
export async function parseResumeFile(file) {
  const fileName = file.name?.toLowerCase() || "";
  const fileType = file.type?.toLowerCase() || "";

  // Check file type
  if (fileName.endsWith(".pdf") || fileType === "application/pdf") {
    return {
      filename: file.name,
      type: "pdf",
      content: await extractPDFText(file),
    };
  }

  if (fileName.endsWith(".txt") || fileType === "text/plain") {
    return {
      filename: file.name,
      type: "txt",
      content: await extractTXTText(file),
    };
  }

  // Try to read as text if extension is unknown
  if (fileName.endsWith(".md") || fileName.endsWith(".doc")) {
    return {
      filename: file.name,
      type: "text",
      content: await extractTXTText(file),
    };
  }

  throw new Error("Unsupported file format. Please upload a PDF or TXT file.");
}

/**
 * Build a prompt that asks Gemini to extract ALL resume data
 * into the exact JSON structure used by the Resume Builder.
 * This auto-fills every field including name, contact info,
 * summary, experience, projects, skills, education, certificates.
 */
export function buildResumeDataExtractionPrompt(resumeText, filename) {
  return `You are an expert resume parser. I have uploaded my resume file "${filename}".

## 🎯 YOUR GOAL
Extract ALL information from the resume and return it as **valid JSON only** that exactly matches the Resume Builder data structure below.

## 📄 RESUME CONTENT
=== RESUME CONTENT START ===
${resumeText}
=== RESUME CONTENT END ===

## 📋 FIELDS TO EXTRACT
Extract every detail you can find. Use these exact field names:

1. **name** — Full name
2. **title** — Professional title / current job title
3. **email** — Email address
4. **phone** — Phone number
5. **linkedin** — LinkedIn URL (if present)
6. **github** — GitHub URL (if present)
7. **website** — Personal website / portfolio URL (if present)
8. **websiteName** — Display label for the website (if present)
9. **location** — City, State, Country
10. **summary** — Professional summary / objective statement
11. **experience** — Array of work experiences: company, role, startDate, endDate, location, points (array of achievement bullets)
12. **projects** — Array of projects: name, techStack, points (array of contribution bullets)
13. **skills** — Object with ALL nine keys: languages, frameworks, frontend, databases, devops, testing, cloud, messaging, concepts (each a single comma-separated string)
14. **education** — Array of education entries: degree, institution, cgpa, startYear, endYear, location
15. **certificates** — Array of certification objects: name, issuer, url

## ⚠️ CRITICAL RULES (DO NOT VIOLATE)
- **Output ONLY valid JSON.** No markdown code fences, no explanation, no extra text before or after.
- **Use EXACT lowercase key names** shown below. Do NOT use variants like full_name, phoneNumber, email_address, etc.
- **All nine skills keys are required.** Even if a category is empty, include it as an empty string "".
- **If a field is not found in the resume, use an empty string ""** — do not omit it, do not use null.
- **Experience/project points must be an array of strings**, even if there is only one bullet.
- **Dates:** keep as found in the resume (e.g., "Jan 2023", "2023-2025", "Present").
- **Rewrite bullets** with strong action verbs and quantified achievements where possible.
- **Clean up grammar, spelling, and formatting.** Make content concise and impactful.

## 📦 REQUIRED JSON STRUCTURE (copy exactly)
{
  "name": "",
  "title": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "github": "",
  "website": "",
  "websiteName": "",
  "location": "",
  "summary": "",
  "experience": [
    {
      "company": "",
      "role": "",
      "startDate": "",
      "endDate": "",
      "location": "",
      "points": [""]
    }
  ],
  "projects": [
    {
      "name": "",
      "techStack": "",
      "points": [""]
    }
  ],
  "skills": {
    "languages": "",
    "frameworks": "",
    "frontend": "",
    "databases": "",
    "devops": "",
    "testing": "",
    "cloud": "",
    "messaging": "",
    "concepts": ""
  },
  "education": [
    {
      "degree": "",
      "institution": "",
      "cgpa": "",
      "startYear": "",
      "endYear": "",
      "location": ""
    }
  ],
  "certificates": [
    {
      "name": "",
      "issuer": "",
      "url": ""
    }
  ]
}`;
}
