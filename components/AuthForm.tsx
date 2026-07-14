"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

// import { auth } from "@/firebase/client";
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
// } from "firebase/auth";
//
// import { signIn, signUp } from "@/lib/actions/auth.action";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormType = "sign-in" | "sign-up";

const getSchema = (type: FormType) =>
    z.object({
        name:
            type === "sign-up"
                ? z.string().min(3, "Name must be at least 3 characters")
                : z.string().optional(),
        email: z.email("Enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

type Props = {
    type: FormType;
};

export default function AuthForm({ type }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const isSignIn = type === "sign-in";
    const schema = getSchema(type);
    type FormValues = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // async function onSubmit(values: FormValues) {
    //     try {
    //         setLoading(true);
    //
    //         if (!isSignIn) {
    //             const { name, email, password } = values;
    //
    //             const credential = await createUserWithEmailAndPassword(
    //                 auth,
    //                 email,
    //                 password
    //             );
    //
    //             const result = await signUp({
    //                 uid: credential.user.uid,
    //                 name: name!,
    //                 email,
    //                 password,
    //             });
    //
    //             if (!result.success) {
    //                 toast.error(result.message);
    //                 return;
    //             }
    //
    //             toast.success("Account created successfully.");
    //             router.push("/sign-in");
    //         } else {
    //             const { email, password } = values;
    //
    //             const credential = await signInWithEmailAndPassword(
    //                 auth,
    //                 email,
    //                 password
    //             );
    //
    //             const idToken = await credential.user.getIdToken();
    //
    //             await signIn({
    //                 email,
    //                 idToken,
    //             });
    //
    //             toast.success("Signed in successfully.");
    //             router.push("/");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Something went wrong.");
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const onSubmit = async (): Promise<void> => {}

    return (
        <Card className="mx-auto w-full max-w-md shadow-lg">
            <CardContent className="space-y-8 p-8">
                <div className="flex items-center justify-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="PrepWise"
                        width={40}
                        height={40}
                    />

                    <h1 className="text-2xl font-bold">
                        PrepKaro
                    </h1>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">
                        {isSignIn ? "Welcome" : "Create New Account"}
                    </h2>

                    <p className="text-muted-foreground">
                        Practice interviews with the help of AI assistance
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {!isSignIn && (
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Name
                            </Label>

                            <Input
                                id="name"
                                placeholder="Sam Wong"
                                {...register("name")}
                            />

                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="sam@example.com"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Password
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password")}
                        />

                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        className="w-full"
                        disabled={loading}
                        type="submit"
                    >
                        {loading
                            ? "Please wait..."
                            : isSignIn
                                ? "Sign In"
                                : "Create Account"}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    {isSignIn
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <Link
                        href={
                            isSignIn
                                ? "/sign-up"
                                : "/sign-in"
                        }
                        className="ml-1 font-medium text-primary hover:underline"
                    >
                        {isSignIn
                            ? "Sign Up"
                            : "Sign In"}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}