import { NextRequest, NextResponse } from "next/server";

import {
  API_URL_V1,
  AuthState,
  TOKEN_EXPIRY_DATE_KEY,
  USER_REFRESH_TOKEN_KEY,
  USER_TOKEN_KEY,
} from "@/constants";
import { AuthResponse } from "./services/login/types";
// import { AuthResponse } from "@/services/user/types";
// import { AuthState } from "@/types";

function saveToken(redirect: NextResponse, response: AuthResponse) {

  redirect.cookies.set(USER_TOKEN_KEY, response.data.token);
  redirect.cookies.set(USER_REFRESH_TOKEN_KEY, response.data.refreshToken);
  //   redirect.cookies.set(TOKEN_EXPIRY_DATE_KEY, response.expiresAt);
  console.log("Cookies set:", redirect.cookies.get(USER_TOKEN_KEY)?.value);//   if (response.roleName && response.claims) {
  //     redirect.cookies.set(
  //       USER_INFO_KEY,
  //       JSON.stringify({
  //         id: response.userId,
  //         claims: response.claims,
  //         roleName: response.roleName,
  //       }),
  //     );
  //   }
}

export const refreshAccessToken = async (
  refreshToken: string,
  accessToken: string,
) => {
  return await fetch(`${API_URL_V1}/Authentication/Generate-Refresh-Token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      currentJWT: accessToken,
      refreshToken: refreshToken,
    }),
  }).then((res) => res.json() as Promise<AuthResponse>);
};

const reAuthenticate = async (request: NextRequest) => {
  const url = new URL(request.url);
  const cookies = request.cookies;

  const refreshToken = cookies.get(USER_REFRESH_TOKEN_KEY)?.value || "";
  const accessToken = cookies.get(USER_TOKEN_KEY)?.value || "";

  try {
    const response = await refreshAccessToken(refreshToken, accessToken);

    const redirect = NextResponse.redirect(
      new URL(url, request.nextUrl.origin),
    );

    saveToken(redirect, response);

    return redirect;
  } catch (error) {
    cookies.clear();

    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }
};

const isAuthenticated = async (
  request: NextRequest,
  attemptRefresh: boolean | undefined = true,
) => {
  const cookies = request.cookies;

  const token = cookies.get(USER_TOKEN_KEY)?.value || "";
  const refreshToken = cookies.get(USER_REFRESH_TOKEN_KEY)?.value || "";
  const expiresAt = new Date(
    cookies.get(TOKEN_EXPIRY_DATE_KEY)?.value || Date.now(),
  ).getTime();

  if (!token && !refreshToken) {
    return AuthState.LOGGED_OUT;
  }

  if ((!token || Date.now() > expiresAt) && refreshToken && attemptRefresh) {
    return AuthState.EXPIRED;
  }

  return AuthState.LOGGED_IN;
};

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("Cookie", request.cookies.toString());

  const isLoggedIn = await isAuthenticated(request);

  if (isLoggedIn == AuthState.EXPIRED) {
    return reAuthenticate(request);
  } else if (isLoggedIn === AuthState.LOGGED_OUT) {
    if (!request.url.includes("login")) {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
  } else {
    if (request.url.includes("login")) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    } else {
      return NextResponse.next({ headers: requestHeaders });
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.svg).*)"],
};
