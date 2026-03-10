import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: "#020818", color: "#ff4466", minHeight: "100vh", padding: 40, fontFamily: "monospace" }}>
          <h1 style={{ color: "#00d4ff", marginBottom: 16 }}>Runtime Error</h1>
          <pre style={{ whiteSpace: "pre-wrap", color: "#e8f4fd" }}>
            {this.state.error?.message}
          </pre>
          <pre style={{ whiteSpace: "pre-wrap", color: "#7aa3cc", marginTop: 12, fontSize: 12 }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
