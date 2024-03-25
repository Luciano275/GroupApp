'use server';

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/routes";

export async function loginAction (provider: 'google' | 'github' = 'google') {
  await signIn(provider, {
    redirect: true,
    redirectTo: DEFAULT_REDIRECT
  })
}