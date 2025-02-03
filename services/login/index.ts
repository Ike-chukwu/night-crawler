
import { getCookie, deleteCookie, setCookie } from "cookies-next"
import { toast } from "sonner";
import {
    axiosInstance,
    TOKEN_EXPIRY_DATE_KEY,
    USER_INFO_KEY,
    USER_REFRESH_TOKEN_KEY,
    USER_TOKEN_KEY,
} from "../../constants";
import { AuthResponse, LoginPayload } from "./types";


export class LoginService {


    private static LOGIN_API_BASE = "/auth"

    public static saveToken(response: AuthResponse) {
        setCookie(USER_TOKEN_KEY, response.data.token);
        setCookie(USER_REFRESH_TOKEN_KEY, response.data.refreshToken);
        // setCookie(TOKEN_EXPIRY_DATE_KEY, response.expiresAt);

        // setCookie(
        //     USER_INFO_KEY,
        //     JSON.stringify({
        //         id: response.userId,
        //         circuitId: response.circuitId,
        //     }),
        // );
    }

    public static logOut() {
        console.log(USER_TOKEN_KEY, USER_REFRESH_TOKEN_KEY);

        deleteCookie(USER_TOKEN_KEY);
        deleteCookie(USER_REFRESH_TOKEN_KEY);
        // deleteCookie(USER_INFO_KEY);
        // deleteCookie(TOKEN_EXPIRY_DATE_KEY);
    }

    public static async reAuthenticate() {
        const token = getCookie(USER_TOKEN_KEY);
        const refreshToken = getCookie(USER_REFRESH_TOKEN_KEY);

        try {
            const result = await axiosInstance.post<AuthResponse>(
                this.LOGIN_API_BASE + "/refresh-token",
                {
                    body: {
                        // currentJWT: token,
                        refreshToken: refreshToken,
                    },
                },
            );

            this.saveToken(result.data);

            return result.data.data.token;
        } catch (e) {
            this.logOut();
            toast.error(`${e}`);
        }

        return null;
    }

    public static async login(payload: LoginPayload) {
        // console.log("${this.LOGIN_API_BASE}/sign-in");

        return axiosInstance.post<AuthResponse>(
            `${this.LOGIN_API_BASE}/sign-in`,
            payload,
        );
    }

}