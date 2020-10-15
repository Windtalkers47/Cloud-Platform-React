import React, { createContext, useContext, useState, useEffect } from "react";
import "./style.css";

const LoadingContext = createContext({
  loading: false,
  setLoading: () => {}
});

// get UseContent State for loading
export function useLoading() {
  const { loading, setLoading } = useContext(LoadingContext);
  return [loading, setLoading];
}


// Set State functional Component
export function useLoadingEffect(loading) {
  const [, setLoading] = useLoading();
  useEffect(() => {
    setLoading(loading);
  });
}

// Loading State
export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}


// Style Css Loading
export function Loading() {
  const { loading } = useContext(LoadingContext);
  return (
    loading && (
      <div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#e2e8f0",
            opacity: 0.75
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 16,
            height: 16,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <div className="loading" />
        </div>
      </div>
    )
  );
}
