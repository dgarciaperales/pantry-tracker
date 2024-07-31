'use client';
import Image from "next/image";
import React from "react";

import { collection, addDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import DataTable from "../components/DataTable";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import SignInPage from "../components/SignInPage";


export default function Home() {

  //recently added
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); 
  }, []);

  if (user === null) {
    return <SignInPage />;
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-300 w-full">
      <NavBar/>
      <h1 className="text-5xl p-4 text-center">Pantry Tracker</h1>
      <div className="mt-8">
        <DataTable/>
      </div>
    </main>
  );
}
