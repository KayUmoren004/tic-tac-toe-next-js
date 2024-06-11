import type { Metadata } from "next";
import ModeSelector from "./components/mode-selector";

export const metadata: Metadata = {
  title: "Ultimate Tic Tac Toe",
  description:
    "Play Ultimate Tic Tac Toe online with friends or against the computer.",
};

export default function Page() {
  return <ModeSelector />;
}
