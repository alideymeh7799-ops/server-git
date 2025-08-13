import { ThemeLayout } from "#/enum";
import Logo from "@/components/logo";
import { menuItems } from "@/components/nav/data";
import { down, useMediaQuery } from "@/hooks";
import useProfile from "@/store/profile";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";
import Header from "./header";
import Main from "./main";
import {
  NavHorizontalLayout,
  NavMobileLayout,
  NavToggleButton,
  NavVerticalLayout,
} from "./nav";

// Dashboard Layout
export default function DashboardLayout() {
  const isMobile = useMediaQuery(down("md"));
  const { themeLayout } = useSettings();

  return (
    <div
      data-slot="slash-layout-root"
      className={cn("w-full min-h-svh flex bg-background", {
        "flex-col": isMobile || themeLayout === ThemeLayout.Horizontal,
      })}
    >
      {isMobile ? <MobileLayout /> : <PcLayout />}
    </div>
  );
}

// Pc Layout
function PcLayout() {
  const { themeLayout } = useSettings();

  if (themeLayout === ThemeLayout.Horizontal) return <PcHorizontalLayout />;
  return <PcVerticalLayout />;
}

function PcHorizontalLayout() {
  const keyItemMenu = useProfile((state) => state.keyItemMenu);

  return (
    <div
      data-slot="slash-layout-content"
      className={cn(
        "w-full h-screen flex flex-col transition-all duration-300 ease-in-out"
      )}
    >
      <Header leftSlot={<Logo />} />
      <NavHorizontalLayout data={menuItems(keyItemMenu)} />
      <Main />
    </div>
  );
}

function PcVerticalLayout() {
  const settings = useSettings();
  const { themeLayout } = settings;

  const keyItemMenu = useProfile((state) => state.keyItemMenu);

  return (
    <>
      <div
        data-slot="slash-layout-content"
        className={cn(
          "w-full flex flex-col transition-[padding] duration-300 ease-in-out",
          {
            "pr-[var(--layout-nav-width)]":
              themeLayout === ThemeLayout.Vertical,
            "pr-[var(--layout-nav-width-mini)]":
              themeLayout === ThemeLayout.Mini,
          }
        )}
      >
        <Header leftSlot={<NavToggleButton />} />
        <Main />
      </div>
      <NavVerticalLayout data={menuItems(keyItemMenu)} />
    </>
  );
}

// Mobile Layout
function MobileLayout() {
  const keyItemMenu = useProfile((state) => state.keyItemMenu);

  return (
    <>
      <Main />
      <Header leftSlot={<NavMobileLayout data={menuItems(keyItemMenu)} />} />
    </>
  );
}
