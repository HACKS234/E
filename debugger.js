// debugger.js

// Capture uncaught errors
window.onerror = function (message, source, lineno, colno, error) {
  console.error("Global Error:", {
    message,
    source,
    lineno,
    colno,
    error,
  });

  // Attempt to fix common errors
  tryToFixError(error);

  return true; // Prevent the default handling of the error
};

// Capture unhandled promise rejections
window.onunhandledrejection = function (event) {
  console.error("Unhandled Promise Rejection:", event.reason);

  // Attempt to fix common errors
  tryToFixError(event.reason);

  event.preventDefault();
};

// Function to log a custom error message
function logError(message) {
  console.error("Custom Error:", message);
}

// Function to attempt to fix common errors
function tryToFixError(error) {
  if (!error) return;

  // Example: Fixing a missing element by creating it
  if (error.message && error.message.includes('Cannot read property')) {
    const elementId = error.message.match(/'([^']+)'/)[1];
    if (elementId) {
      const newElement = document.createElement('div');
      newElement.id = elementId;
      document.body.appendChild(newElement);
      console.log(`Created missing element with id: ${elementId}`);
    }
  }

  // Add more error-fixing logic as needed
}

// Export the logError function for use in other modules
export { logError };
