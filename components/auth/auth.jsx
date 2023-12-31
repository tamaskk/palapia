import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react";
import Image from 'next/image'
import Input from '../ui/input'
import Popup from '../popup/popup'
import { useMainContext } from '@/lib/maincontext'
import { getCountries } from '../../lib/countries';
import { useRef } from 'react';

const Auth = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [countries, setCountries] = useState();
    const router = useRouter();
    const country = useRef();
    const { setRequestError, setRequestStatus, requestError, requestStatus } = useMainContext();

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    const createUser = async ({ firstName, lastName, email, password, nationality, isAdmin, likedFoods, ownFoods, dateOfRegister }) => {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ firstName, lastName, email, password, nationality, isAdmin, likedFoods, ownFoods, dateOfRegister }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            setRequestError(data.message || "Something went wrong!");
            setRequestStatus("error");
        }
        setRequestError("Account created successfully");
        setRequestStatus("success");
        return data;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesData = await getCountries();
                const sortedData = countriesData.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(sortedData);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchData();
    }, []);


    const formHandler = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            if (!firstName || firstName.trim().length === 0) {
                setRequestError("Please enter your first name");
                setRequestStatus("error");
                return;
            }
            if (!lastName || lastName.trim().length === 0) {
                setRequestError("Please enter your last name");
                setRequestStatus("error");
                return;
            }

            if (password !== passwordAgain) {
                setRequestError("Passwords do not match");
                setRequestStatus("error");
                return;
            }

            if (!country.current.value) {
                setRequestError("Please choose your nationality");
                setRequestStatus("error");
                return;
            }
        }


        if (!email || email.trim().length === 0 || !email.includes("@")) {
            setRequestError("Please enter a valid email address");
            setRequestStatus("error");
            return;
        }

        if (!password || password.trim().length === 0 || password.trim().length < 7) {
            setRequestError("Please enter a valid password (min. 7 characters)");
            setRequestStatus("error");
            return;
        }

        const date = new Date()

        if (isLogin) {
            setRequestError("Logging in...");
            setRequestStatus("warning");
            const result = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });

            if (result && !result.error) {
                // set some auth state
                setRequestError("Login success");
                setRequestStatus("success");
                router.replace("/");
            } else {
                setRequestError(result.error);
                setRequestStatus("error");
            }
        } else {
            try {
                setRequestError("Account under construction");
                setRequestStatus("warning");
                const result = await createUser({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    nationality: country.current.value,
                    isAdmin: false,
                    likedFoods: [],
                    ownFoods: [],
                    dateOfRegister: date
                }, setRequestError, setRequestStatus);
                setRequestError(result.message);
                setRequestStatus(result.message === "Succesfully registered!" ? "success" : "error");
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            {requestError && requestStatus && <Popup status={requestStatus} message={requestError} />}
            {
                isLogin &&
                <article className="w-screen h-auto pt-10 overflow-scroll lg:overflow-hidden px-20">
                    <div className="lg:max-w-full xl:max-w-[1200px] h-full mx-auto flex flex-col lg:flex-row items-center justify-start lg:justify-center gap-24">
                        <div className="flex flex-col items-center justify-center gap-10">
                            <div className="w-[75%] md:w-[300px] lg:w-[400px] h-auto md:h-[300px] lg:h-[400px]">
                                <Image
                                    src="/images/logo.png"
                                    alt="logo"
                                    width={500}
                                    height={500}
                                    layout="responsive"
                                />
                            </div>
                            <div className="hidden md:flex flex-row items-center justify-center gap-8 px-4 py-14">
                                <div className="w-24 h-24 bg-black"></div>
                                <div className="w-24 h-24 bg-black"></div>
                                <div className="w-24 h-24 bg-black"></div>
                                <div className="w-24 h-24 bg-black hidden lg:block"></div>
                            </div>
                        </div>
                        <div>
                            <form onSubmit={formHandler}>
                                <div className="flex flex-col gap-10 mb-10">
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            id="email"
                                            type="email"
                                            label="Email address"
                                            onChangeHandler={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <Input
                                            id="password"
                                            type="password"
                                            label="Password"
                                            onChangeHandler={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row flex-wrap gap-20">
                                    <div className="grid grid-cols-1 gap-10 w-full md:w-auto">
                                        <div className="grid grid-cols-1 gap-4">
                                            <button
                                                type="submit"
                                                className="w-full px-14 py-3 flex flex-row whitespace-nowrap items-center justify-center text-center border-none bg-orange-500 md lg:text-lg xl:text-xl text-white rounded-lg hover:bg-orange-700 hover:scale-105 transition-all duration-300"
                                            >
                                                Login
                                            </button>
                                            <button className="w-full flex flex-row whitespace-nowrap items-center justify-center  text-center bg-white px-14 py-3 min-w-full border-none text-md lg:text-lg xl:text-xl text-black rounded-lg hover:bg-slate-200 hover:scale-105 transition-all duration-300">
                                                Login with&nbsp;
                                                <span className="text-blue-500">G</span>
                                                <span className="text-red-500">o</span>
                                                <span className="text-yellow-500">o</span>
                                                <span className="text-blue-500">g</span>
                                                <span className="text-green-500">l</span>
                                                <span className="text-red-500">e</span>
                                            </button>
                                            <button className="w-full flex flex-row whitespace-nowrap items-center justify-center  text-center bg-white px-14 py-3 min-w-full border-none text-md lg:text-lg xl:text-xl text-black rounded-lg hover:bg-slate-200 hover:scale-105 transition-all duration-300">
                                                Login with&nbsp;
                                                <span className="text-blue-500">Facebook</span>
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={switchAuthModeHandler}
                                        className="text-md md:text-lg xl:text-xl w-full md:w-auto text-center md:text-left"
                                    >
                                        Don&apos;t have an account? <br /> Create one
                                    </button>
                                </div>
                            </form>
                            <div className="flex md:hidden flex-row items-center justify-center gap-8 px-4 py-14">
                                <div className="w-24 h-24 bg-black"></div>
                                <div className="w-24 h-24 bg-black"></div>
                                <div className="w-24 h-24 bg-black"></div>
                                <div className="w-24 h-24 bg-black hidden lg:block"></div>
                            </div>
                        </div>
                    </div>
                </article>
            }
            {
                !isLogin &&
                <article className="w-screen min-h-full flex-grow  py-5 overflow-y-auto overflow-x-hidden lg:overflow-hidden bg-[#F1EFEF] px-2 lg:px-20">
                    <div className="block mx-auto lg:hidden w-[75%] md:w-[300px] lg:w-[400px] h-auto md:h-[300px] lg:h-[400px] mb-5">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            width={500}
                            height={500}
                            layout="responsive"
                        />
                    </div>
                    <h1 className="text-4xl font-semibold text-center mb-10 lg:hidden">Create an account</h1>
                    <form
                        onSubmit={formHandler}
                        className="flex flex-col items-center justify-around lg:max-w-full xl:max-w-[1200px] h-full mx-auto lg:flex-row lg:justify-around"
                    >
                        <div className="grid grid-cols-1 w-full md:w-1/3 gap-8 mb-8 lg:mb-0 px-5 lg:px-0">
                            <Input
                                id="firstName"
                                label="First name"
                                onChangeHandler={(e) => setFirstName(e.target.value)}
                                type="text"
                                ownStyle=""
                            />
                            <Input
                                id="lastName"
                                label="Last name"
                                type="text"
                                onChangeHandler={(e) => setLastName(e.target.value)}
                            />
                            <Input
                                id="email"
                                label="Email address"
                                type="email"
                                onChangeHandler={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                onChangeHandler={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                id="passwordagain"
                                label="Password again"
                                type="password"
                                onChangeHandler={(e) => setPasswordAgain(e.target.value)}
                            />

                            <label className="text-4xl font-semibold w-full md:w-auto text-center md:text-left">
                                Nationality
                            </label>
                            <select
                                ref={country}
                                id="nationality"
                                className="p-3 text-xl active:outline-none focus:outline-none shadow-xl rounded-md border-b border-b-gray-600"
                            >
                                <option value="" disabled selected>
                                    Choose your nationality
                                </option>
                                {countries?.map((country, index) => (
                                    <option
                                        key={index}
                                        value={country.name.common}
                                    >
                                        {country.name.common}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <div className="hidden lg:block w-[75%] md:w-[300px] lg:w-[400px] h-auto md:h-[300px] lg:h-[400px]">
                                <Image
                                    src="/images/logo.png"
                                    alt="logo"
                                    width={500}
                                    height={500}
                                    layout="responsive"
                                />
                            </div>
                            <div className="flex flex-col gap-5">
                                <button
                                    disabled={requestStatus === "warning"}
                                    type="submit"
                                    className={`w-full px-14 py-3 flex flex-row whitespace-nowrap items-center justify-center text-center border-none ${requestStatus === "warning" ? "bg-gray-400" : "bg-orange-500"} lg:text-lg xl:text-xl text-white rounded-lg hover:bg-orange-700 hover:scale-105 transition-all duration-300`}
                                >
                                    {
                                        requestStatus === "warning" ?
                                            "Registering..."
                                            :
                                            "Register"
                                    }
                                </button>
                                <button className="w-full flex flex-row whitespace-nowrap items-center justify-center  text-center bg-white px-14 py-3 min-w-full border-none text-md lg:text-lg xl:text-xl text-black rounded-lg hover:bg-slate-200 hover:scale-105 transition-all duration-300">
                                    Login with&nbsp;
                                    <span className="text-blue-500">G</span>
                                    <span className="text-red-500">o</span>
                                    <span className="text-yellow-500">o</span>
                                    <span className="text-blue-500">g</span>
                                    <span className="text-green-500">l</span>
                                    <span className="text-red-500">e</span>
                                </button>
                                <button className="w-full flex flex-row whitespace-nowrap items-center justify-center  text-center bg-white px-14 py-3 min-w-full border-none text-md lg:text-lg xl:text-xl text-black rounded-lg hover:bg-slate-200 hover:scale-105 transition-all duration-300">
                                    Login with&nbsp;<span className="text-blue-500">Facebook</span>
                                </button>

                                <div className="flex flex-row items-center justify-center">
                                    <p className="text-xl">Already have an account?</p>
                                    <button
                                        onClick={switchAuthModeHandler}
                                        className="text-blue-500 text-xl font-semibold ml-2 hover:underline"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </article>
            }
        </div>
    );
}

export default Auth