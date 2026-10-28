import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  loadPortfolioProfile,
  savePortfolioProfile,
} from "../services/portfolioProfile";
import "./VenkateshBharathAdmin.css";

const EMPTY_PROFILE = {
  name: "",
  headline: "",
  location: "",
  email: "",
  website: "",
  linkedin: "",
  github: "",
  leetcode: "",
  youtube: "",
  avatar: "",
  summary: "",
  experience: [],
  projects: [],
  education: [],
  certifications: [],
  skills: {},
  stats: [],
  goals: [
    {
      term: "Short Term",
      description: "Master AI architecture and integrate LLMs into enterprise products.",
    },
    {
      term: "Mid Term",
      description: "Grow into an engineering leadership or technical lead role.",
    },
    {
      term: "Long Term",
      description: "Build a technology product or business that can scale globally.",
    },
  ],
  hobbies: [
    {
      icon: "🎬",
      title: "Movies",
      description: "Exploring different perspectives and narratives.",
    },
    {
      icon: "🏋️",
      title: "Fitness & Training",
      description: "Watching fitness tutorials and staying active.",
    },
    {
      icon: "🧠",
      title: "Continuous Learning",
      description: "Exploring new technology, frameworks, and AI concepts.",
    },
    {
      icon: "💻",
      title: "Building Websites",
      description: "Experimenting with web technologies and side projects.",
    },
  ],
};

function normalizeProfile(profile) {
  const skills =
    profile.skills && typeof profile.skills === "object"
      ? Object.fromEntries(
          Object.entries(profile.skills).map(([category, values]) => [
            category,
            Array.isArray(values) ? values : [],
          ]),
        )
      : {};

  return {
    ...EMPTY_PROFILE,
    ...profile,
    experience: Array.isArray(profile.experience)
      ? profile.experience.map((item) => ({
          ...item,
          company: Array.isArray(item.company)
            ? item.company.map((company) =>
                typeof company === "string"
                  ? { name: company, wordmark: company.slice(0, 3).toUpperCase() }
                  : company,
              )
            : [],
          points: Array.isArray(item.points) ? item.points : [],
        }))
      : [],
    projects: Array.isArray(profile.projects)
      ? profile.projects.map((item) => ({
          ...item,
          tech: Array.isArray(item.tech) ? item.tech : [],
          solution: Array.isArray(item.solution) ? item.solution : [],
          impact: Array.isArray(item.impact) ? item.impact : [],
        }))
      : [],
    education: Array.isArray(profile.education) ? profile.education : [],
    certifications: Array.isArray(profile.certifications)
      ? profile.certifications
      : [],
    skills,
    stats: Array.isArray(profile.stats) ? profile.stats : [],
    goals: Array.isArray(profile.goals) ? profile.goals : EMPTY_PROFILE.goals,
    hobbies: Array.isArray(profile.hobbies) ? profile.hobbies : EMPTY_PROFILE.hobbies,
  };
}

function linesToList(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function listToLines(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function linesToValues(value) {
  return value.split("\n").map((item) => item.trim());
}

function TextField({ label, value, onChange, multiline = false, hint = "" }) {
  const Control = multiline ? "textarea" : "input";
  return (
    <label className="vb-admin-field">
      <span>{label}</span>
      {multiline ? (
        <Control
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
        />
      ) : (
        <Control
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function ListField({ label, values, onChange, hint = "" }) {
  return (
    <TextField
      label={label}
      value={listToLines(values)}
      onChange={(value) => onChange(linesToList(value))}
      multiline
      hint={hint || "Enter one item per line."}
    />
  );
}

function updateArrayItem(setProfile, section, index, updates) {
  setProfile((current) => ({
    ...current,
    [section]: current[section].map((item, itemIndex) =>
      itemIndex === index ? { ...item, ...updates } : item,
    ),
  }));
}

function addItem(setProfile, section, item) {
  setProfile((current) => ({
    ...current,
    [section]: [...current[section], item],
  }));
}

function removeItem(setProfile, section, index) {
  setProfile((current) => ({
    ...current,
    [section]: current[section].filter((_, itemIndex) => itemIndex !== index),
  }));
}

function Section({ title, description, children, onAdd, addLabel }) {
  return (
    <section className="vb-admin-section">
      <div className="vb-admin-section-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {onAdd && (
          <button type="button" className="vb-admin-add" onClick={onAdd}>
            + {addLabel}
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function validateProfile(profile) {
  if (!profile.name.trim() || !profile.headline.trim() || !profile.email.trim()) {
    throw new Error("Name, headline, and email are required.");
  }
  if (!profile.summary.trim()) {
    throw new Error("Add a short profile summary before saving.");
  }
  if (
    Object.entries(profile.skills).some(
      ([category, skills]) =>
        !category.trim() ||
        !Array.isArray(skills) ||
        skills.some((skill) => typeof skill !== "string"),
    )
  ) {
    throw new Error("Check that all skill categories and skills are valid.");
  }
}

export default function VenkateshBharathAdmin() {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    loadPortfolioProfile()
      .then((savedProfile) => {
        if (active && savedProfile) setProfile(normalizeProfile(savedProfile));
      })
      .catch((loadError) => {
        console.error("Could not load the portfolio profile from Firestore.", loadError);
        if (active) {
          setError(
            "Could not load the portfolio profile. Check the Firebase configuration and published Firestore rules.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const updateSkillCategory = (oldCategory, category, skills) => {
    setProfile((current) => {
      const entries = Object.entries(current.skills).filter(
        ([key]) => key !== oldCategory,
      );
      entries.push([category, skills]);
      return { ...current, skills: Object.fromEntries(entries) };
    });
  };

  const save = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      validateProfile(profile);
      await savePortfolioProfile(profile);
      setMessage("Portfolio details saved. The resume PDF remains separate and unchanged.");
    } catch (saveError) {
      console.error("Could not save portfolio changes.", saveError);
      setError(saveError.message || "Could not save portfolio changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="vb-admin">
      <header className="vb-admin-header">
        <div>
          <p>PORTFOLIO ADMIN</p>
          <h1>Edit portfolio content</h1>
          <span>
            This data is stored separately from your resume. Portfolio edits
            never change your resume or its PDF download.
          </span>
        </div>
        <Link to="/venkatesh-bharath">View portfolio</Link>
      </header>

      <form className="vb-admin-form" onSubmit={save}>
        {loading ? (
          <div className="vb-admin-loading" role="status">
            Loading portfolio data from Firestore…
          </div>
        ) : (
          <>
            <Section title="Profile" description="Your public name, role, and contact links.">
              <div className="vb-admin-grid">
                <TextField label="Name" value={profile.name} onChange={(value) => updateField("name", value)} />
                <TextField label="Professional headline" value={profile.headline} onChange={(value) => updateField("headline", value)} />
                <TextField label="Location" value={profile.location} onChange={(value) => updateField("location", value)} />
                <TextField label="Email" value={profile.email} onChange={(value) => updateField("email", value)} />
                <TextField label="Website" value={profile.website} onChange={(value) => updateField("website", value)} />
                <TextField label="LinkedIn URL" value={profile.linkedin} onChange={(value) => updateField("linkedin", value)} />
                <TextField label="GitHub URL" value={profile.github} onChange={(value) => updateField("github", value)} />
                <TextField label="LeetCode URL" value={profile.leetcode} onChange={(value) => updateField("leetcode", value)} />
                <TextField label="YouTube URL" value={profile.youtube} onChange={(value) => updateField("youtube", value)} />
                <TextField label="Profile image URL" value={profile.avatar} onChange={(value) => updateField("avatar", value)} />
              </div>
              <TextField
                label="About / summary"
                value={profile.summary}
                onChange={(value) => updateField("summary", value)}
                multiline
                hint="Use **text** around words you want bold on the public portfolio. The asterisks are stored in Firestore but displayed as bold text."
              />
            </Section>

            <Section
              title="Experience"
              description="Add jobs and client/company names for your portfolio timeline."
              addLabel="Add experience"
              onAdd={() => addItem(setProfile, "experience", {
                role: "",
                company: [],
                period: "",
                location: "",
                points: [],
              })}
            >
              {profile.experience.map((item, index) => (
                <article className="vb-admin-item" key={`experience-${index}`}>
                  <div className="vb-admin-item-heading">
                    <h3>Experience {index + 1}</h3>
                    <button type="button" className="vb-admin-remove" onClick={() => removeItem(setProfile, "experience", index)}>Remove</button>
                  </div>
                  <div className="vb-admin-grid">
                    <TextField label="Role / title" value={item.role} onChange={(value) => updateArrayItem(setProfile, "experience", index, { role: value })} />
                    <TextField
                      label="Company / client names"
                      value={listToLines(item.company?.map((company) => company.name))}
                      onChange={(value) =>
                        updateArrayItem(setProfile, "experience", index, {
                          company: linesToList(value).map((name) => {
                            const oldCompany = item.company?.find(
                              (company) => company.name === name,
                            );
                            return oldCompany || {
                              name,
                              wordmark: name.slice(0, 3).toUpperCase(),
                            };
                          }),
                        })
                      }
                      multiline
                      hint="One company or client per line."
                    />
                    <TextField
                      label="Company logo keys (optional)"
                      value={listToLines(item.company?.map((company) => company.logo || ""))}
                      onChange={(value) =>
                        updateArrayItem(setProfile, "experience", index, {
                          company: item.company.map((company, companyIndex) => ({
                            ...company,
                            logo: linesToValues(value)[companyIndex] || "",
                          })),
                        })
                      }
                      multiline
                      hint="Use built-in keys such as zensar, americanExpress, paypal, oracle, googleCloud, or microsoftLinkedIn; keep line order aligned with company names."
                    />
                    <TextField label="Employment period" value={item.period} onChange={(value) => updateArrayItem(setProfile, "experience", index, { period: value })} />
                    <TextField label="Location / work mode" value={item.location} onChange={(value) => updateArrayItem(setProfile, "experience", index, { location: value })} />
                  </div>
                  <ListField label="Responsibilities and achievements" values={item.points} onChange={(value) => updateArrayItem(setProfile, "experience", index, { points: value })} />
                </article>
              ))}
            </Section>

            <Section
              title="Projects"
              description="Use the case-study fields to explain the problem, architecture, and measurable impact."
              addLabel="Add project"
              onAdd={() => addItem(setProfile, "projects", {
                name: "",
                businessProblem: "",
                solution: [],
                impact: [],
                summary: "",
                tech: [],
                link: null,
              })}
            >
              {profile.projects.map((item, index) => (
                <article className="vb-admin-item" key={`project-${index}`}>
                  <div className="vb-admin-item-heading">
                    <h3>Project {index + 1}</h3>
                    <button type="button" className="vb-admin-remove" onClick={() => removeItem(setProfile, "projects", index)}>Remove</button>
                  </div>
                  <div className="vb-admin-grid">
                    <TextField label="Project name" value={item.name} onChange={(value) => updateArrayItem(setProfile, "projects", index, { name: value })} />
                    <TextField label="Project link (optional)" value={item.link || ""} onChange={(value) => updateArrayItem(setProfile, "projects", index, { link: value || null })} />
                  </div>
                  <TextField
                    label="Business problem"
                    value={item.businessProblem}
                    onChange={(value) => updateArrayItem(setProfile, "projects", index, { businessProblem: value })}
                    multiline
                  />
                  <ListField
                    label="Solution & architecture"
                    values={item.solution}
                    onChange={(value) => updateArrayItem(setProfile, "projects", index, { solution: value })}
                  />
                  <ListField
                    label="Impact / metrics"
                    values={item.impact}
                    onChange={(value) => updateArrayItem(setProfile, "projects", index, { impact: value })}
                    hint="Add one result per line. Include verified metrics only."
                  />
                  <TextField label="Project summary" value={item.summary} onChange={(value) => updateArrayItem(setProfile, "projects", index, { summary: value })} multiline />
                  <ListField label="Technologies" values={item.tech} onChange={(value) => updateArrayItem(setProfile, "projects", index, { tech: value })} />
                </article>
              ))}
            </Section>

            <Section
              title="Vision & future goals"
              description="These goals are editable starter ideas from your brief."
              addLabel="Add goal"
              onAdd={() => addItem(setProfile, "goals", { term: "", description: "" })}
            >
              {profile.goals.map((item, index) => (
                <article className="vb-admin-item" key={`goal-${index}`}>
                  <div className="vb-admin-item-heading">
                    <h3>Goal {index + 1}</h3>
                    <button type="button" className="vb-admin-remove" onClick={() => removeItem(setProfile, "goals", index)}>Remove</button>
                  </div>
                  <div className="vb-admin-grid">
                    <TextField label="Timeline" value={item.term} onChange={(value) => updateArrayItem(setProfile, "goals", index, { term: value })} />
                    <TextField label="Goal" value={item.description} onChange={(value) => updateArrayItem(setProfile, "goals", index, { description: value })} multiline />
                  </div>
                </article>
              ))}
            </Section>

            <Section
              title="Life beyond code"
              description="Editable interests and personal pursuits."
              addLabel="Add interest"
              onAdd={() => addItem(setProfile, "hobbies", { icon: "", title: "", description: "" })}
            >
              {profile.hobbies.map((item, index) => (
                <article className="vb-admin-item" key={`hobby-${index}`}>
                  <div className="vb-admin-item-heading">
                    <h3>Interest {index + 1}</h3>
                    <button type="button" className="vb-admin-remove" onClick={() => removeItem(setProfile, "hobbies", index)}>Remove</button>
                  </div>
                  <div className="vb-admin-grid">
                    <TextField label="Icon / emoji (optional)" value={item.icon} onChange={(value) => updateArrayItem(setProfile, "hobbies", index, { icon: value })} />
                    <TextField label="Title" value={item.title} onChange={(value) => updateArrayItem(setProfile, "hobbies", index, { title: value })} />
                  </div>
                  <TextField label="Description" value={item.description} onChange={(value) => updateArrayItem(setProfile, "hobbies", index, { description: value })} multiline />
                </article>
              ))}
            </Section>

            <Section
              title="Skills"
              description="Create skill categories and list each skill on a separate line."
              addLabel="Add category"
              onAdd={() => {
                const category = `category ${Object.keys(profile.skills).length + 1}`;
                setProfile((current) => ({ ...current, skills: { ...current.skills, [category]: [] } }));
              }}
            >
              {Object.entries(profile.skills).map(([category, skills]) => (
                <article className="vb-admin-item" key={category}>
                  <div className="vb-admin-item-heading">
                    <h3>{category || "Skill category"}</h3>
                    <button type="button" className="vb-admin-remove" onClick={() => {
                      setProfile((current) => {
                        const nextSkills = { ...current.skills };
                        delete nextSkills[category];
                        return { ...current, skills: nextSkills };
                      });
                    }}>Remove</button>
                  </div>
                  <div className="vb-admin-grid">
                    <TextField label="Category name" value={category} onChange={(value) => updateSkillCategory(category, value, skills)} />
                    <ListField label="Skills" values={skills} onChange={(value) => updateSkillCategory(category, category, value)} />
                  </div>
                </article>
              ))}
            </Section>

            <Section
              title="Education"
              addLabel="Add education"
              onAdd={() => addItem(setProfile, "education", { degree: "", institution: "", period: "", details: "" })}
            >
              {profile.education.map((item, index) => (
                <article className="vb-admin-item" key={`education-${index}`}>
                  <div className="vb-admin-item-heading">
                    <h3>Education {index + 1}</h3>
                    <button type="button" className="vb-admin-remove" onClick={() => removeItem(setProfile, "education", index)}>Remove</button>
                  </div>
                  <div className="vb-admin-grid">
                    <TextField label="Degree" value={item.degree} onChange={(value) => updateArrayItem(setProfile, "education", index, { degree: value })} />
                    <TextField label="Institution" value={item.institution} onChange={(value) => updateArrayItem(setProfile, "education", index, { institution: value })} />
                    <TextField label="Period" value={item.period} onChange={(value) => updateArrayItem(setProfile, "education", index, { period: value })} />
                    <TextField label="Location / additional details" value={item.details} onChange={(value) => updateArrayItem(setProfile, "education", index, { details: value })} />
                  </div>
                </article>
              ))}
            </Section>

            <Section
              title="Certifications"
              addLabel="Add certification"
              onAdd={() => addItem(setProfile, "certifications", { name: "", issuer: "", logo: "", url: "" })}
            >
              {profile.certifications.map((item, index) => (
                <article className="vb-admin-item" key={`certification-${index}`}>
                  <div className="vb-admin-item-heading">
                    <h3>Certification {index + 1}</h3>
                    <button type="button" className="vb-admin-remove" onClick={() => removeItem(setProfile, "certifications", index)}>Remove</button>
                  </div>
                  <div className="vb-admin-grid">
                    <TextField label="Certification name" value={item.name} onChange={(value) => updateArrayItem(setProfile, "certifications", index, { name: value })} />
                    <TextField label="Issuer" value={item.issuer} onChange={(value) => updateArrayItem(setProfile, "certifications", index, { issuer: value })} />
                    <TextField label="Logo key (optional)" value={item.logo} onChange={(value) => updateArrayItem(setProfile, "certifications", index, { logo: value })} />
                    <TextField label="Credential URL (optional)" value={item.url} onChange={(value) => updateArrayItem(setProfile, "certifications", index, { url: value })} />
                  </div>
                </article>
              ))}
            </Section>

            <Section
              title="Career highlights"
              addLabel="Add highlight"
              onAdd={() => addItem(setProfile, "stats", { value: "", label: "" })}
            >
              {profile.stats.map((item, index) => (
                <article className="vb-admin-item" key={`stat-${index}`}>
                  <div className="vb-admin-item-heading">
                    <h3>Highlight {index + 1}</h3>
                    <button type="button" className="vb-admin-remove" onClick={() => removeItem(setProfile, "stats", index)}>Remove</button>
                  </div>
                  <div className="vb-admin-grid">
                    <TextField label="Value" value={item.value} onChange={(value) => updateArrayItem(setProfile, "stats", index, { value })} />
                    <TextField label="Label" value={item.label} onChange={(value) => updateArrayItem(setProfile, "stats", index, { label: value })} />
                  </div>
                </article>
              ))}
            </Section>
          </>
        )}

        {error && <p className="vb-admin-error" role="alert">{error}</p>}
        {message && <p className="vb-admin-success" role="status">{message}</p>}

        <button className="vb-admin-save" type="submit" disabled={loading || saving}>
          {saving ? "Saving portfolio…" : "Save portfolio"}
        </button>
      </form>
    </main>
  );
}
