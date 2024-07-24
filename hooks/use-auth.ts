import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

import _http from "@/utils/http";
import { Profile } from "@/types/profile";
import toast from "react-hot-toast";
import { LoginFromValue } from "@/app/(root)/(auth)/login/components/login-handler";

type Store = {
  profile: Profile | null;
  isLogin: boolean;
  login: (data: LoginFromValue) => Promise<void>;
  getProfile: () => Promise<void>;
  signInWithSocial: (token: string | undefined) => void;
  logout: () => Promise<void>;
  verifyEmail: (userId: string | null, token: string | null) => void;
};

const useAuth = create(
  persist<Store>(
    (set, get) => ({
      profile: null,
      accessToken: "",
      refreshToken: "",
      isLogin: false,
      login: async (data: LoginFromValue) => {
        try {
          const response = await _http.post(`/Authentication/Login`, data);

          if (response.status == 200) {
            set({
              isLogin: true,
            });

            Cookies.set("ac_token", response.data.result.accessToken);
            Cookies.set("rf_token", response.data.result.refreshToken);
          }
        } catch (error: any) {
          console.error("Login failed:", error);
          if (error.response && error.response.status === 401) {
            toast.error("Tài khoản hoặc mật khẩu không chính xác", {
              style: {
                fontSize: "14px",
                fontWeight: "500",
              },
            });
          }

          if (error.response && error.response.status === 403) {
            toast("Tài khoản của bạn chưa được xác thực!", {
              style: {
                fontSize: "14px",
                fontWeight: "500",
              },
              icon: "🔒",
            });
          }
          throw error;
        }
      },

      getProfile: async () => {
        try {
          const response = await _http.get(`/Me/Profile`);

          if (response.status === 200) {
            set({
              profile: response.data.result,
            });
          }
        } catch (error) {
          console.log(error);
        }
      },

      signInWithSocial(token) {
        if (token) {
          _http
            .post(`/api/auth/social?token=${token}`)
            .then((response) => {
              set({
                isLogin: true,
              });

              Cookies.set("token", response.data.token);
              Cookies.set("roles", response.data.user.role);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      logout: async () => {
        try {
          const response = await _http.post("/Authentication/Logout");
          if (response.status === 200) {
            set({ profile: null, isLogin: false });
            Cookies.set("ac_token", "");
            Cookies.set("rf_token", "");

            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      },
      verifyEmail: (userId, token) => {
        _http
          .get(`/api/auth/verify-account?userId=${userId}&token=${token}`)
          .then((response) => {
            set({
              profile: response.data.user,
              isLogin: true,
            });

            Cookies.set("token", response.data.token);
            Cookies.set("roles", response.data.user.role);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
    {
      name: "amak-authentication",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
