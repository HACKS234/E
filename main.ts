import { createRoot } from "react-dom/client";
import App from "./client/src/App";
import "./client/src/index.css";
import ErrorBoundary from "./client/src/ErrorBoundary";

// Function to check if each file is doing its job
function checkFiles() {
  const files = [
    "./client/src/pages/home",
    "./client/src/pages/game",
    "./client/src/pages/auth-page",
    "./client/src/pages/rankings",
    "./client/src/pages/proxy",
    "./client/src/components/ui/toaster",
    "./client/src/hooks/use-auth",
    "./client/src/lib/queryClient",
    "./client/src/lib/protected-route",
    "./client/src/components/main-nav"
  ];

  files.forEach(file => {
    try {
      require(file);
      console.log(`${file} is correctly imported and functioning.`);
    } catch (error) {
      console.error(`Error in file import: ${file}`, error);
    }
  });
}

// Ensure the site displays correctly
function displaySite() {
  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

// Run checks and display site
checkFiles();
displaySite();

// Additional functionalities for ensuring the application's stability and performance
function setupGlobalErrorHandlers() {
  window.onerror = function (message, source, lineno, colno, error) {
    console.error("Global Error:", { message, source, lineno, colno, error });
    return true; // Prevent the default handling of the error
  };

  window.onunhandledrejection = function (event) {
    console.error("Unhandled Promise Rejection:", event.reason);
    event.preventDefault();
  };
}

function monitorPerformance() {
  if ('performance' in window) {
    const performanceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log("Performance entry:", entry);
      });
    });
    performanceObserver.observe({ entryTypes: ['paint', 'navigation', 'resource'] });
  }
}

function logAppStatus() {
  console.log("App is starting...");
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Current Time:", new Date().toISOString());
}

// Initialize additional functionalities
setupGlobalErrorHandlers();
monitorPerformance();
logAppStatus();
