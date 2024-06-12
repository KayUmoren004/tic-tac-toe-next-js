import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import WaitingPage from "../components/waiting-page";

export const metadata: Metadata = {
  title: "Waiting for Friend",
  description: "Waiting to begin game.",
};

const Play = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const username = (searchParams?.username as string) ?? "Player";
  const code = (searchParams?.code as string) ?? "";

  return <WaitingPage username={username} code={code} />;
};

export default Play;
