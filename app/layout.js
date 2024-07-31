//'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head'
import React from "react";

const inter = Inter({ subsets: ["latin"] });

/*
export const metadata = {
  title: "Pantry Tracker",
  description: "Track your pantry items",
};
*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;1,300&display=swap" rel="stylesheet"/>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}


/*
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;1,300&display=swap" rel="stylesheet"/>
      </Head>
      <body className={inter.className}>{children}
        <NavBar />
        <main style ={{ marginTop: '64px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
*/