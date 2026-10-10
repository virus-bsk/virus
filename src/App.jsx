import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ConfigBanner from "./components/ConfigBanner";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";
import RequirePaid from "./components/RequirePaid";
import ChangePasswordModal from "./components/ChangePasswordModal";
import ErrorBoundary from "./components/ErrorBoundary";
import YouTubeLinkHandler from "./components/YouTubeLinkHandler";
import FounderProfileModal from "./components/FounderProfileModal";
import { BASENAME } from "./utils/basePath";

// Route-level code splitting: each page is loaded on demand, so the main
// bundle stays small and large pages (interview/topic pages) are only
// downloaded when the user actually visits them.
const Home = lazy(() => import("./pages/Home"));
const MaangPreparation = lazy(() => import("./pages/MaangPreparation"));
const AdvancedSystemDesign = lazy(
  () => import("./maang/system-design/advance/AdvanceSystemDesignPage"),
);
const MaangDSABasic = lazy(() => import("./maang/basic-dsa/MaangDSABasic"));
const MaangDSAAdvanced = lazy(
  () => import("./maang/advanced-dsa/MaangDSAAdvanced"),
);
const MaangDSAGraph = lazy(() => import("./maang/graph/MaangDSAGraph"));
const MaangDSADp = lazy(() => import("./maang/dp/MaangDSADp"));
const MaangWeeklyPreparation = lazy(
  () => import("./maang/weekly/MaangWeeklyPreparation"),
);
const SystemDesignBasics = lazy(
  () => import("./maang/system-design/SystemDesignBasics"),
);
const OopsPage = lazy(() => import("./maang/system-design/oops/OopsPage"));
const SolidPage = lazy(() => import("./maang/system-design/solid/SolidPage"));
const DesignPatternsPage = lazy(
  () => import("./maang/system-design/patterns/DesignPatternsPage"),
);
const UmlPage = lazy(() => import("./maang/system-design/uml/UmlPage"));
const AcidPage = lazy(() => import("./maang/system-design/acid/AcidPage"));
const CapPage = lazy(() => import("./maang/system-design/cap/CapPage"));
const ScalabilityPage = lazy(
  () => import("./maang/system-design/scalability/ScalabilityPage"),
);
const LoadBalancingPage = lazy(
  () => import("./maang/system-design/load-balancing/LoadBalancingPage"),
);
const CachingPage = lazy(
  () => import("./maang/system-design/caching/CachingPage"),
);
const DatabaseConceptsPage = lazy(
  () => import("./maang/system-design/database-concepts/DatabaseConceptsPage"),
);
const ApiDesignPage = lazy(
  () => import("./maang/system-design/api-design/ApiDesignPage"),
);
const DistributedSystemsPage = lazy(
  () => import("./maang/system-design/distributed-systems/DistributedSystemsPage"),
);
const MessagingPage = lazy(
  () => import("./maang/system-design/messaging/MessagingPage"),
);
const MicroservicesPage = lazy(
  () => import("./maang/system-design/microservices/MicroservicesPage"),
);
const HighAvailabilityPage = lazy(
  () => import("./maang/system-design/high-availability/HighAvailabilityPage"),
);
const ObservabilityPage = lazy(
  () => import("./maang/system-design/observability/ObservabilityPage"),
);
const SecurityPage = lazy(
  () => import("./maang/system-design/security/SecurityPage"),
);
const CdnPage = lazy(() => import("./maang/system-design/cdn/CdnPage"));
const SearchSystemsPage = lazy(
  () => import("./maang/system-design/search-systems/SearchSystemsPage"),
);
const FileStoragePage = lazy(
  () => import("./maang/system-design/file-storage/FileStoragePage"),
);
const DistributedTechniquesPage = lazy(
  () =>
    import(
      "./maang/system-design/distributed-techniques/DistributedTechniquesPage"
    ),
);
const DataProcessingPage = lazy(
  () => import("./maang/system-design/data-processing/DataProcessingPage"),
);
const CloudInfrastructurePage = lazy(
  () =>
    import("./maang/system-design/cloud-infrastructure/CloudInfrastructurePage"),
);
const AdvancedModernPage = lazy(
  () => import("./maang/system-design/advanced-modern/AdvancedModernPage"),
);
const ParkingLotPage = lazy(
  () => import("./maang/system-design/lld-parking-lot/ParkingLotPage"),
);
const ElevatorPage = lazy(
  () => import("./maang/system-design/lld-elevator/ElevatorPage"),
);
const VendingPage = lazy(
  () => import("./maang/system-design/lld-vending/VendingPage"),
);
const SplitwisePage = lazy(
  () => import("./maang/system-design/lld-splitwise/SplitwisePage"),
);
const AtmPage = lazy(
  () => import("./maang/system-design/lld-atm/AtmPage"),
);
const ChessPage = lazy(
  () => import("./maang/system-design/lld-chess/ChessPage"),
);
const TictactoePage = lazy(
  () => import("./maang/system-design/lld-tictactoe/TictactoePage"),
);
const SnakePage = lazy(
  () => import("./maang/system-design/lld-snake/SnakePage"),
);
const LruPage = lazy(
  () => import("./maang/system-design/lld-lru/LruPage"),
);
const RatelimitPage = lazy(
  () => import("./maang/system-design/lld-ratelimit/RatelimitPage"),
);
const LibraryPage = lazy(
  () => import("./maang/system-design/lld-library/LibraryPage"),
);
const UrlShortenerPage = lazy(() =>
  import("./maang/system-design/hld-url-shortener/UrlShortenerPage"),
);
const HotelPage = lazy(
  () => import("./maang/system-design/lld-hotel/HotelPage"),
);
const Roadmap90Day = lazy(
  () => import("./topics/90-day-job-roadmap/Roadmap90Day"),
);
const JavaTopics = lazy(() => import("./topics/java/JavaTopics"));
const JavaCourse = lazy(() => import("./topics/java/JavaCourse"));
const JavaInterview = lazy(() => import("./topics/java/JavaInterview"));
const InterviewPrep = lazy(() => import("./pages/InterviewPrep"));
const JavaScriptTopics = lazy(
  () => import("./topics/javascript/JavaScriptTopics"),
);
const JavaScriptCourse = lazy(
  () => import("./topics/javascript/JavaScriptCourse"),
);
const JavaScriptInterview = lazy(
  () => import("./topics/javascript/JavaScriptInterview"),
);
const ReactJSTopics = lazy(() => import("./topics/reactjs/ReactJSTopics"));
const ReactJSCourse = lazy(() => import("./topics/reactjs/ReactJSCourse"));
const ReactJSInterview = lazy(
  () => import("./topics/reactjs/ReactJSInterview"),
);

const SpringBootTopics = lazy(
  () => import("./topics/spring-boot/SpringBootTopics"),
);
const SpringBootCourse = lazy(
  () => import("./topics/spring-boot/SpringBootCourse"),
);
const SpringBootInterview = lazy(
  () => import("./topics/spring-boot/SpringBootInterview"),
);
const MicroservicesTopics = lazy(
  () => import("./topics/microservices/MicroservicesTopics"),
);
const MicroservicesCourse = lazy(
  () => import("./topics/microservices/MicroservicesCourse"),
);
const MicroservicesInterview = lazy(
  () => import("./topics/microservices/MicroservicesInterview"),
);
const SQLTopics = lazy(() => import("./topics/sql/SQLTopics"));
const SQLCourse = lazy(() => import("./topics/sql/SQLCourse"));
const SQLInterview = lazy(() => import("./topics/sql/SQLInterview"));
const KafkaTopics = lazy(() => import("./topics/kafka/KafkaTopics"));
const KafkaCourse = lazy(() => import("./topics/kafka/KafkaCourse"));
const KafkaInterview = lazy(() => import("./topics/kafka/KafkaInterview"));
const ReactiveProgrammingTopics = lazy(
  () => import("./topics/reactive-programming/ReactiveProgrammingTopics"),
);
const ReactiveProgrammingCourse = lazy(
  () => import("./topics/reactive-programming/ReactiveProgrammingCourse"),
);
const ReactiveProgrammingInterview = lazy(
  () => import("./topics/reactive-programming/ReactiveProgrammingInterview"),
);
const LLMCourse = lazy(() => import("./topics/llm/LLMCourse"));
const ForwardDeploymentEngineer = lazy(
  () => import("./topics/forward-deployment-engineer/ForwardDeploymentEngineer"),
);
const ForwardDeploymentEngineerModule = lazy(
  () =>
    import(
      "./topics/forward-deployment-engineer/ForwardDeploymentEngineerModule"
    ),
);
const DSATopics = lazy(() => import("./topics/dsa/DSATopics"));
const DSACourse = lazy(() => import("./topics/dsa/DSACourse"));
const DSALeetcode = lazy(() => import("./pages/DSALeetcode"));
const SystemDesignPage = lazy(() => import("./pages/SystemDesign"));
const CompanyInterview = lazy(() => import("./pages/CompanyInterview"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const Payment = lazy(() => import("./pages/Payment"));
const ResumeBuilderPage = lazy(() => import("./pages/ResumeBuilderPage"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Restores the original route after GitHub Pages 404 redirect.
// When a user refreshes /login, GitHub Pages serves 404.html which
// redirects to <base>/index.html?path=/login. This component reads that
// query param and navigates to the correct page, then cleans the URL.
// On GitHub Pages (<repo>), the clean URL must include the base prefix.
function RouteRestorer() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const path = params.get("path");

    if (path && path !== "/" && path !== "/index.html") {
      const cleanUrl = BASENAME === "/" ? path : BASENAME + path;
      // Replace the URL with the clean path and navigate to it
      window.history.replaceState({}, "", cleanUrl);
      navigate(path, { replace: true });
    }
  }, [navigate]);

  return null;
}

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-spinner" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [founderOpen, setFounderOpen] = useState(false);

  return (
    <BrowserRouter basename={BASENAME}>
      <ScrollToTop />
      <ErrorBoundary>
        <YouTubeLinkHandler />
        <RouteRestorer />
        <div className="app-shell">
          <ConfigBanner />
          <div className="navbar-container">
            <NavBar
              onOpenChangePassword={() => setShowChangePassword(true)}
              onOpenFounder={() => setFounderOpen(true)}
            />
          </div>
          <main className="page-container">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Free routes - open to everyone, no login required */}
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/roadmap" element={<Roadmap90Day />} />
                <Route path="/java" element={<JavaTopics />} />
                <Route path="/java/course" element={<JavaCourse />} />
                <Route path="/java/interview" element={<JavaInterview />} />
                <Route path="/javascript" element={<JavaScriptTopics />} />
                <Route
                  path="/javascript/course"
                  element={<JavaScriptCourse />}
                />
                <Route
                  path="/javascript/interview"
                  element={<JavaScriptInterview />}
                />
                <Route path="/reactjs" element={<ReactJSTopics />} />
                <Route path="/reactjs/course" element={<ReactJSCourse />} />
                <Route
                  path="/reactjs/interview"
                  element={<ReactJSInterview />}
                />
                <Route path="/spring-boot" element={<SpringBootTopics />} />
                <Route
                  path="/spring-boot/course"
                  element={<SpringBootCourse />}
                />
                <Route
                  path="/spring-boot/interview"
                  element={<SpringBootInterview />}
                />
                <Route
                  path="/microservices"
                  element={<MicroservicesTopics />}
                />
                <Route
                  path="/microservices/course"
                  element={<MicroservicesCourse />}
                />
                <Route
                  path="/microservices/interview"
                  element={<MicroservicesInterview />}
                />
                <Route path="/sql" element={<SQLTopics />} />
                <Route path="/sql/course" element={<SQLCourse />} />
                <Route path="/sql/interview" element={<SQLInterview />} />
                <Route path="/kafka" element={<KafkaTopics />} />
                <Route path="/kafka/course" element={<KafkaCourse />} />
                <Route path="/kafka/interview" element={<KafkaInterview />} />
                {/* MAANG Kit — the overview hub and every sub-topic page are paid */}
                <Route
                  path="/maang"
                  element={
                    <RequirePaid>
                      <MaangPreparation />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/interview-prep"
                  element={
                    <RequirePaid>
                      <InterviewPrep />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/basic-dsa"
                  element={
                    <RequirePaid>
                      <MaangDSABasic />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/advanced-dsa"
                  element={
                    <RequirePaid>
                      <MaangDSAAdvanced />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/graphs"
                  element={
                    <RequirePaid>
                      <MaangDSAGraph />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/dp"
                  element={
                    <RequirePaid>
                      <MaangDSADp />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/weekly-preparation"
                  element={
                    <RequirePaid>
                      <MaangWeeklyPreparation />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design-basics"
                  element={
                    <RequirePaid>
                      <SystemDesignBasics />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/oops"
                  element={
                    <RequirePaid>
                      <OopsPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/solid"
                  element={
                    <RequirePaid>
                      <SolidPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/patterns"
                  element={
                    <RequirePaid>
                      <DesignPatternsPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/uml"
                  element={
                    <RequirePaid>
                      <UmlPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/acid"
                  element={
                    <RequirePaid>
                      <AcidPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/cap"
                  element={
                    <RequirePaid>
                      <CapPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/scalability"
                  element={
                    <RequirePaid>
                      <ScalabilityPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/load-balancing"
                  element={
                    <RequirePaid>
                      <LoadBalancingPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/caching"
                  element={
                    <RequirePaid>
                      <CachingPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/database-concepts"
                  element={
                    <RequirePaid>
                      <DatabaseConceptsPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/api-design"
                  element={
                    <RequirePaid>
                      <ApiDesignPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/distributed-systems"
                  element={
                    <RequirePaid>
                      <DistributedSystemsPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/messaging"
                  element={
                    <RequirePaid>
                      <MessagingPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/microservices"
                  element={
                    <RequirePaid>
                      <MicroservicesPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/high-availability"
                  element={
                    <RequirePaid>
                      <HighAvailabilityPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/observability"
                  element={
                    <RequirePaid>
                      <ObservabilityPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/security"
                  element={
                    <RequirePaid>
                      <SecurityPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/cdn"
                  element={
                    <RequirePaid>
                      <CdnPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/search-systems"
                  element={
                    <RequirePaid>
                      <SearchSystemsPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/file-storage"
                  element={
                    <RequirePaid>
                      <FileStoragePage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/distributed-techniques"
                  element={
                    <RequirePaid>
                      <DistributedTechniquesPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/data-processing"
                  element={
                    <RequirePaid>
                      <DataProcessingPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/cloud-infrastructure"
                  element={
                    <RequirePaid>
                      <CloudInfrastructurePage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/advanced-modern"
                  element={
                    <RequirePaid>
                      <AdvancedModernPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-parking-lot"
                  element={
                    <RequirePaid>
                      <ParkingLotPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-elevator"
                  element={
                    <RequirePaid>
                      <ElevatorPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-vending"
                  element={
                    <RequirePaid>
                      <VendingPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-splitwise"
                  element={
                    <RequirePaid>
                      <SplitwisePage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-atm"
                  element={
                    <RequirePaid>
                      <AtmPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-chess"
                  element={
                    <RequirePaid>
                      <ChessPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-tictactoe"
                  element={
                    <RequirePaid>
                      <TictactoePage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-snake"
                  element={
                    <RequirePaid>
                      <SnakePage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-lru"
                  element={
                    <RequirePaid>
                      <LruPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-ratelimit"
                  element={
                    <RequirePaid>
                      <RatelimitPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-library"
                  element={
                    <RequirePaid>
                      <LibraryPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/hld-url-shortener"
                  element={
                    <RequirePaid>
                      <UrlShortenerPage />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/system-design/lld-hotel"
                  element={
                    <RequirePaid>
                      <HotelPage />
                    </RequirePaid>
                  }
                />

                 <Route
                   path="/maang/system-design/advanced"
                   element={
                     <RequirePaid>
                       <AdvancedSystemDesign />
                     </RequirePaid>
                   }
                 />

                <Route
                  path="/reactive-programming"
                  element={<ReactiveProgrammingTopics />}
                />
                <Route
                  path="/reactive-programming/course"
                  element={<ReactiveProgrammingCourse />}
                />
                                                                <Route
                  path="/reactive-programming/interview"
                  element={<ReactiveProgrammingInterview />}
                />
                <Route
                  path="/maang/llm-fundamentals"
                  element={
                    <RequirePaid>
                      <LLMCourse />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/forward-deployment-engineer"
                  element={
                    <RequirePaid>
                      <ForwardDeploymentEngineer />
                    </RequirePaid>
                  }
                />
                <Route
                  path="/maang/forward-deployment-engineer/:moduleId"
                  element={
                    <RequirePaid>
                      <ForwardDeploymentEngineerModule />
                    </RequirePaid>
                  }
                />
                <Route path="/dsa" element={<DSATopics />} />
                <Route path="/dsa/course" element={<DSACourse />} />
                <Route path="/dsa/leetcode" element={<DSALeetcode />} />
                <Route path="/system-design" element={<SystemDesignPage />} />
                <Route
                  path="/company-interview"
                  element={<CompanyInterview />}
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                {/* Payment: live account status from Firestore + Cashfree checkout (wired up later) */}
                <Route
                  path="/payment"
                  element={
                    <RequireAuth>
                      <Payment />
                    </RequireAuth>
                  }
                />
                {/* Resume builder still requires login */}
                <Route
                  path="/resume-builder"
                  element={
                    <RequirePaid>
                      <ResumeBuilderPage />
                    </RequirePaid>
                  }
                />
                {/* Hidden admin console: unlinked, admin-email only (see RequireAdmin). */}
                <Route
                  path="/bsk-admin-97"
                  element={
                    <RequireAdmin>
                      <Admin />
                    </RequireAdmin>
                  }
                />
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <ChangePasswordModal
            isOpen={showChangePassword}
            onClose={() => setShowChangePassword(false)}
          />

          <FounderProfileModal
            isOpen={founderOpen}
            onClose={() => setFounderOpen(false)}
          />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
