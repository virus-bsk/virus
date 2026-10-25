import { Link } from "react-router-dom";
import CodingQuestionsGrid from "../components/CodingQuestionsGrid";
import "./JavaCodingQuestions.css";

function JavaCodingQuestions() {
  return (
    <main className="java-coding-page">
      <nav className="java-coding-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/java">Java</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Coding Interview Questions</span>
      </nav>
      <CodingQuestionsGrid />
    </main>
  );
}

export default JavaCodingQuestions;
