import { useState, useRef } from "react";

import logo from "./logo.png";
import "./App.css";
import { GuessAgeReq, GuessAgeRes } from "@full-stack-monorepo-starter/bff";

const backendURL = "http://localhost:5000";

function App() {
    const [millionaireGuess, setMillionaireGuess] = useState<number>();
    const [name, setName] = useState<string>();
    const ageRef = useRef<HTMLInputElement>(null);

    const guess = async () => {
        if (!name || !ageRef.current) {
            return;
        }

        const data: GuessAgeReq = {
            age: parseInt(ageRef.current.value),
        };

        try {
            const res = await fetch(`${backendURL}/guess`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const responseData: GuessAgeRes = await res.json();
            setMillionaireGuess(responseData.guessedValue);
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };

    return (
        <>
            <div>
                <img src={logo} className="logo" alt="Logo" />
            </div>
            <h1>Full-Stack Monorepo Starter</h1>
            {millionaireGuess ? (
                <>
                    <p>
                        <b>{name}</b>, you will become a millionare at
                    </p>
                    <h1>{millionaireGuess}</h1>
                    <button onClick={() => setMillionaireGuess(undefined)}>
                        Guess again
                    </button>
                </>
            ) : (
                <>
                    <p>
                        Let's predict when you'll reach millionaire status!
                        Please provide some information below.
                    </p>
                    <div className="container">
                        <p>Name</p>
                        <input
                            type="text"
                            id="name-input"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <p>Age</p>
                        <input type="number" id="age-input" ref={ageRef} />
                    </div>
                    <button onClick={guess}>Guess</button>
                </>
            )}
        </>
    );
}

export default App;
