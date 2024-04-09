import React, { useState } from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleOnError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to an error reporting service
    console.error("Error caught by error boundary:", error, errorInfo);
    // Update state to indicate an error has occurred
    setHasError(true);
  };

  if (hasError) {
    // You can render any fallback UI here
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <React.Fragment>
      {/* Attach error event listener */}
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, {
          onError: handleOnError,
        })
      )}
    </React.Fragment>
  );
};

export default ErrorBoundary;
