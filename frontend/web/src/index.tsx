import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router';
import theme from './styles/theme';
import GlobalStyles from './styles/globalStyles';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <QueryClientProvider client={queryClient}>
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Router />
            </ThemeProvider>
        </RecoilRoot>
    </QueryClientProvider>,
);

reportWebVitals();
