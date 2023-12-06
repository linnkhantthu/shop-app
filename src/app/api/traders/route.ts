import { NextRequest } from "next/server";
import { Results, Trader } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import { insertTrader } from "@/lib/query/trader/query";

// { trader: Trader, message: Results}
// POST data.json(): Trader
export async function POST(request: NextRequest) {
  let message: string = Results.REQUIRED_LOGIN;

  // Create response
  const response = new Response();

  // Create session
  const session = await getSession(request, response);
  let { user: currentUser } = session;

  // If User is Logged in
  if (currentUser) {
    const traderData: Trader = await request.json();

    // Insert Trader into Database
    const { addedTrader } = await insertTrader(traderData);
    message = addedTrader
      ? "Added new trader successfully."
      : "The trader(email) is already exist.Check the email and try again.";

    return createResponse(
      response,
      JSON.stringify({ trader: addedTrader, message: message }),
      {
        status: 200,
      }
    );
  }
  return createResponse(response, JSON.stringify({ message: message }), {
    status: 403,
  });
}