import {authConfig} from "./auth.config";
import NextAuth from "next-auth";
import { API_AUTH_PREFIX, API_NOTIFICATIONS_PREFIX, AUTH_ROUTES, DEFAULT_REDIRECT, API_GROUP_MESSAGES_PREFIX } from "./routes";

export const {auth} = NextAuth(authConfig)

export default auth((req) => {
  
  const isLoggedIn = !!req.auth;
  const nextUrl = req.nextUrl;

  const isOnApiAuth = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isOnApiNotifications = nextUrl.pathname.startsWith(API_NOTIFICATIONS_PREFIX);
  const isOnApiGroupMessages = nextUrl.pathname.startsWith(API_GROUP_MESSAGES_PREFIX)
  const isOnAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isOnApiAuth) return;

  if (isOnApiNotifications) {
    if (isLoggedIn) return;
    return Response.redirect(new URL('/', nextUrl))
  }

  if (isOnApiGroupMessages){
    if (isLoggedIn) return;
    return Response.redirect(new URL('/', nextUrl))
  }

  if (isOnAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }
    return;
  }

  if (!isLoggedIn && !isOnAuthRoute) {
    return Response.redirect(new URL('/', nextUrl))
  }

  return;

})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};