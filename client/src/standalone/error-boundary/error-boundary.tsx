import React, { Component, ErrorInfo } from "react";

interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info);
  }

  render() {
    return this.state.hasError ? (
      <pre>Hi ha hagut un error.</pre>
    ) : (
      this.props.children
    );
  }
}
