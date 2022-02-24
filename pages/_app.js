import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import Head from 'next/head';
import { useState } from 'react';
import '../styles/globals.css';
import '../styles/output.css';

export default function App(props) {
    const { Component, pageProps } = props;
    const [colorScheme, setColorScheme] = useState('light');
    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <title>SMV</title>
            </Head>

            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme,
                    }}
                >
                    <NotificationsProvider>
                        <ModalsProvider>
                            {getLayout(<Component {...pageProps} />)}
                        </ModalsProvider>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}
