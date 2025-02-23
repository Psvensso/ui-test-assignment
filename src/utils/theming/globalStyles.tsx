import { css, Global } from "@emotion/react";
import "../../assets/fonts.css";
import { styleConst } from "./styleConst";
export const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body,
      #root {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-y: auto;
      }

      body {
        min-width: 320px;
      }

      #root {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
      }

      :root {
        font-family: ${styleConst.fontFamily.primary};
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        font-synthesis: none;
        font-size: 14px;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        font-size: 16px;
        scroll-behavior: smooth;
      }

      body {
        min-height: 100vh;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
        font-family:
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          sans-serif;
      }

      img,
      picture,
      svg,
      video {
        display: block;
        max-width: 100%;
      }

      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      /* Remove all animations and transitions for people that prefer not to see them */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: 100%;
        font-weight: normal;
        margin: 0;
        line-height: 1.2;
      }

      a {
        text-decoration: none;
      }

      :focus-visible {
        outline: ${styleConst.colors.uniFi.blue06} auto 1px;
      }
    `}
  ></Global>
);
