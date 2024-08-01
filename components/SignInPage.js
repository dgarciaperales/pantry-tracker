import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app/firebase";

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            //Automatically sign in the user after sign-up
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-slate-400">
            <h2 className="text-3xl mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2 p-2 border text-black"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2 p-2 border text-black"
            />
            <button onClick={isSignUp ? handleSignUp : handleSignIn} className="p-2 bg-gray-500 text-white">
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            <button onClick={() => setIsSignUp(!isSignUp)} className="p-2 bg-gray-500 text-white">
                {isSignUp ? 'Already have an account? Sign In' : "Don\'t have an account? Sign Up"}
            </button>
        </div>
    )
}