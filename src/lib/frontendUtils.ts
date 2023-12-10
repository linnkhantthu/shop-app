import { Trader, TraderRole } from "./models";

export async function fetchTraders(
  role: TraderRole,
  page: number,
  cursor: number
) {
  console.log(page);
  const res = await fetch(
    `/api/traders?role=${role}&page=${page}&cursor=${cursor}`,
    {
      method: "GET",
    }
  );
  const {
    traders,
    count,
    message,
  }: { traders: Trader[]; count: number; message: string } = await res.json();
  return { traders, count, message };
}
