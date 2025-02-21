import "@ant-design/v5-patch-for-react-19";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { ConfigProvider } from "antd";
import { Suspense, use } from "react";
import { BrowserRouter } from "react-router";
import { UiErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/Header";
import { ProductsPage } from "./pages//Products/ProductsPage";
import { RootProvider, useRoot } from "./useRoot";
import { fetchDevicesData } from "./utils/dataLoader";
import { antdTheme } from "./utils/theming/antdTheme";
import { styleConst } from "./utils/theming/styleConst";

const emotionCache = createCache({
  key: "uid",
});

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  max-width: ${styleConst.responsive.maxWidth};
  width: 100%;
  align-self: center;
  padding: 0 32px;
  box-sizing: border-box;

  @media (max-width: ${styleConst.breakpoints.md750}) {
    padding: 0 16px;
  }
  @media (max-width: ${styleConst.breakpoints.sm450}) {
    padding: 0;
  }
`;

const dataPromise = fetchDevicesData();

export function Root() {
  return (
    <UiErrorBoundary>
      <CacheProvider value={emotionCache}>
        <ConfigProvider wave={{ disabled: true }} theme={antdTheme}>
          <BrowserRouter>
            <RootContent />
          </BrowserRouter>
        </ConfigProvider>
      </CacheProvider>
    </UiErrorBoundary>
  );
}

function RootContent() {
  const apiDeviceResponse = use(dataPromise);
  const ctx = useRoot(apiDeviceResponse);
  return (
    <RootProvider value={ctx}>
      <Suspense>
        <Header />
        <Main>
          <ProductsPage />
        </Main>
      </Suspense>
    </RootProvider>
  );
}
