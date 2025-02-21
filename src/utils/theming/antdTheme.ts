import { ThemeConfig } from "antd";
import { styleConst } from "./styleConst";

export const antdTheme = {
  token: {
    colorText: styleConst.colors.text.black65,

    // Colors
    colorPrimary: styleConst.colors.uniFi.blue06,
    colorSuccess: "#38cc65",
    colorWarning: "#f5a524",
    colorError: "#f0383b",
    colorInfo: "#006fff",
    colorBgBase: "#ffffff",
    colorPrimaryBgHover: "#EDEDF0",
    // Border Colors
    colorBorder: "#EDEDF0",
    colorBorderSecondary: "#e2e2e2",

    // Text Colors

    colorTextHeading: styleConst.colors.text.black85,
    colorTextSecondary: "blue",
    colorTextTertiary: "#808893",
    colorTextDisabled: "#c2c6cb",
    colorTextPlaceholder: "#d4d4d4",

    // Background Colors
    colorBgContainer: "#ffffff",

    // Font
    fontFamily: styleConst.fontFamily.primary,

    fontWeightStrong: 700,
    fontSize: 14,
    fontSizeHeading1: 36,
    fontSizeHeading2: 28,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,

    // Line Heights
    lineHeight: 1.5,
    lineHeightLG: 1.6,
    lineHeightSM: 1.4,

    // Border Radius
    borderRadius: 4,
    borderRadiusLG: 8,
    borderRadiusSM: 2,

    // Spacing
    padding: 16,
    paddingXS: 8,
    paddingSM: 12,
    paddingLG: 24,
    paddingXL: 32,

    margin: 16,
    marginXS: 8,
    marginSM: 12,
    marginLG: 24,
    marginXL: 32,

    // Sizes
    controlHeight: 32,
    controlHeightSM: 24,
    controlHeightLG: 40,

    // Shadow
    boxShadow:
      "rgba(77, 41, 41, 0.06) 0px 0px 1px, rgba(0, 0, 0, 0.12) 0px 12px 48px;",
    boxShadowSecondary:
      "rgba(77, 41, 41, 0.06) 0px 0px 1px, rgba(0, 0, 0, 0.12) 0px 12px 48px;",

    // Animation
    motionDurationFast: "0.1s",
    motionDurationMid: "0.2s",
    motionDurationSlow: "0.3s",
    motionEaseInOut: "cubic-bezier(0.28, 0.87, 0.5, 1.6)",
  },
  components: {
    Button: {
      colorTextDisabled: styleConst.colors.text.black45,
      controlOutlineWidth: 1,
      lineWidthFocus: 1,
      dangerColor: styleConst.colors.uniFi.red06,
      colorPrimaryBorder: styleConst.colors.uniFi.blue06,
      borderRadius: 4,
      textHoverBg: styleConst.colors.uniFi.neutral02,
      motionEaseInOut: "none",
    },
    Input: {
      algorithm: true,
      controlHeight: 38,
      paddingInline: 10,
      borderRadius: 4,
    },

    Card: {
      algorithm: true,
      borderRadius: 8,
      padding: 24,
    },
    Menu: {
      algorithm: true,
      itemHeight: 40,
      itemPaddingInline: 16,
    },
    Checkbox: {
      algorithm: true,
      borderRadius: 4,
      controlInteractiveSize: 16,
    },
    Select: {
      algorithm: true,
      controlHeight: 38,
      borderRadius: 4,
    },
    Modal: {
      algorithm: true,
      borderRadius: 8,
      paddingContentHorizontal: 24,
      paddingContentVertical: 24,
    },
    Typography: {
      titleMarginBottom: 4,
      titleMarginTop: 0,
      fontWeightStrong: 700,
      linkDecoration: "none",
      linkFocusDecoration: "none",
    },
    Table: {
      headerColor: styleConst.colors.text.black85,
      algorithm: true,
      borderRadius: 4,
      paddingContentHorizontal: 16,
      paddingContentVertical: 12,
      colorText: styleConst.colors.text.black45,
      rowHoverBg: "#EDEDF0",
    },
  },
} satisfies ThemeConfig;
