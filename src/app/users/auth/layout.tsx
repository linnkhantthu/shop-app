import { metadata } from "@/app/layout";

export default function Layout({ children }: any) {
  metadata.title = "Todo: Auth";
  return <>{children}</>;
}
