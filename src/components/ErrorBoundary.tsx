import React from "react";
import { clearDevicesCache } from "../utils/dataLoader";
import { UiLogoSvg } from "./UiLogoSvg";

type Props = {
  children: React.ReactNode;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
};

type State = {
  error: Error | null;
};

export class UiErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  reset = () => {
    clearDevicesCache();
    this.setState({ error: null });
  };

  override render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      // Default fallback UI
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            color: "white",
            textAlign: "center",
            background:
              "linear-gradient(180deg, #000000 0%, #141414 80%, #1a1a1a 100%)",
          }}
        >
          <a
            aria-label="Link to Ui.com"
            type="link"
            rel="noreferrer"
            href="http://www.ui.com"
            target="_blank"
            style={{
              display: "block",
              width: "200px",
              height: "auto",
              color: "white",
            }}
          >
            <UiLogoSvg />
          </a>
          <h1>Well, this is awkward...</h1>
          <pre
            data-part="error-description"
            style={{ maxWidth: 600, textWrap: "wrap" }}
          >
            {this.state.error?.message}
          </pre>
          <a
            onClick={() => {
              //This removes all filters from the URL
              //thats a common way to clean problems
              window.location.search = "";
              this.reset();
            }}
          >
            Try again
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
