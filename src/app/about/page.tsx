import type { Metadata } from "next";
import AboutScreen from "@/screens/about/AboutScreen";

export const metadata: Metadata = {
  title: "About — Portfolio",
  description: "UI/UX Designer & Software Engineer portfolio page.",
};

export default function AboutPage() {
  return <AboutScreen />;
}
