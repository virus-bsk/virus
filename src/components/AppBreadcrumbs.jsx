import { Link, useLocation } from "react-router-dom";
import { buildAppBreadcrumbs } from "../utils/appBreadcrumbs";

function AppBreadcrumbs() {
  const { pathname } = useLocation();
  const breadcrumbs = buildAppBreadcrumbs(pathname);

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="app-breadcrumbs" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => {
        const isCurrent = index === breadcrumbs.length - 1;
        return (
          <span className="app-breadcrumb-item" key={breadcrumb.to}>
            {index > 0 && (
              <span className="app-breadcrumb-separator" aria-hidden="true">
                /
              </span>
            )}
            {isCurrent ? (
              <span aria-current="page">{breadcrumb.label}</span>
            ) : (
              <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default AppBreadcrumbs;
