"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { getAuthProvider } from "@/lib/auth";
import {
  validateEmail,
  validatePassword,
  validateConfirm,
} from "@/lib/auth/validation";

interface FieldErrors {
  email?: string;
  password?: string;
  confirm?: string;
  form?: string;
}

const inputCls =
  "w-full rounded-md border-2 border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 placeholder-zinc-400 focus-visible:border-brand dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

const btnCls =
  "w-full rounded-md bg-brand px-4 py-3 text-base font-semibold text-zinc-950 transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60";

const errCls = "mt-1.5 text-sm text-red-600 dark:text-red-400";

/**
 * Shared login/signup form. Validation runs on submit (and clears per-field
 * as you type). Backend is the AuthProvider interface - mock today, real later.
 */
export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);

  const isSignup = mode === "signup";

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    const emailErr = validateEmail(email);
    if (emailErr) errs.email = emailErr;
    const pwErr = validatePassword(password);
    if (pwErr) errs.password = pwErr;
    if (isSignup) {
      const cErr = validateConfirm(password, confirm);
      if (cErr) errs.confirm = cErr;
    }
    return errs;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setBusy(true);
    const auth = getAuthProvider();
    const result = isSignup
      ? await auth.signUp(email, password)
      : await auth.signIn(email, password);
    setBusy(false);
    if (!result.ok) {
      setErrors({ form: result.error ?? "Something went wrong. Try again." });
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12"
    >
      <Link href="/landing" className="mb-8 flex items-center gap-3 self-start">
        <span className="text-brand">
          <Logo className="h-9 w-9" />
        </span>
        <span className="text-lg font-bold">ChainCodeCamp</span>
      </Link>

      <h1 className="mb-1 text-3xl font-bold">
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
        {isSignup
          ? "Free forever. Your progress stays on this device until you connect an account."
          : "Log in to pick up where you left off."}
      </p>

      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: undefined }));
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputCls}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className={errCls}>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((p) => ({ ...p, password: undefined }));
            }}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : "password-rules"}
            className={inputCls}
            placeholder={isSignup ? "At least 8 characters" : "Your password"}
          />
          {errors.password && (
            <p id="password-error" role="alert" className={errCls}>
              {errors.password}
            </p>
          )}
          {isSignup && (
            <p
              id="password-rules"
              className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400"
            >
              8+ characters, at least one letter and one number.
            </p>
          )}
        </div>

        {isSignup && (
          <div>
            <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setErrors((p) => ({ ...p, confirm: undefined }));
              }}
              aria-invalid={Boolean(errors.confirm)}
              aria-describedby={errors.confirm ? "confirm-error" : undefined}
              className={inputCls}
              placeholder="Type it again"
            />
            {errors.confirm && (
              <p id="confirm-error" role="alert" className={errCls}>
                {errors.confirm}
              </p>
            )}
          </div>
        )}

        {errors.form && (
          <p
            role="alert"
            className="rounded-md border-2 border-red-600 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:border-red-500 dark:bg-red-950 dark:text-red-300"
          >
            {errors.form}
          </p>
        )}

        <button type="submit" disabled={busy} className={btnCls}>
          {busy ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
        {isSignup ? (
          <>
            Already registered?{" "}
            <Link
              href="/login"
              className="font-medium text-brand underline underline-offset-4"
            >
              Log in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link
              href="/signup"
              className="font-medium text-brand underline underline-offset-4"
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </main>
  );
}
