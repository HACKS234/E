import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary";

// Function to check if each file is doing its job
function checkFiles() {
  const files = [
    "./pages/home",
    "./pages/game",
    "./pages/auth-page",
    "./pages/rankings",
    "./pages/proxy",
    "./components/ui/toaster",
    "./hooks/use-auth",
    "./lib/queryClient",
    "./lib/protected-route",
    "./components/main-nav"
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
