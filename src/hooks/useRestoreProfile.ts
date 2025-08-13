// hooks/useRestoreProfile.ts
import useProfile from "@/store/profile";
import { useEffect } from "react";

const EXPIRY_MINUTES = 20;

export function useRestoreProfile() {
  const setProfile = useProfile((state) => state.setProfile);

  useEffect(() => {
    const stored = localStorage.getItem("user-profile");

    if (stored) {
      const parsed = JSON.parse(stored);
      const loginTime = parsed.loginTimestamp;
      const now = Date.now();

      const diffMinutes = (now - loginTime) / (3000 * 60);

      if (diffMinutes < EXPIRY_MINUTES) {
        setProfile(parsed);

        setTimeout(() => {
          localStorage.removeItem("user-profile");
          window.location.href = "/auth/login";
        }, (EXPIRY_MINUTES - diffMinutes) * 60 * 3000);
      } else {
        localStorage.removeItem("user-profile");
        window.location.href = "/auth/login";
      }
    }
  }, []);
}
