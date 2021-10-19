import App from 'next/app'
import React from 'react'
if (typeof window !== "undefined") {
    require('bootstrap/dist/js/bootstrap.js')
    require('bootstrap/dist/css/bootstrap.css')
}


import Father from '../components/Father'

import {QueryClient,QueryClientProvider,} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 0
            },
        },
    });
function MyApp({ Component, pageProps }) {
    return (
        <>
            <QueryClientProvider client={queryClient}>

                <Father>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Component {...pageProps} />
                    <ReactQueryDevtools/>
                </Father>
            </QueryClientProvider>
        </>
    )
}
export default MyApp;