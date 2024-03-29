import { NextRequest } from "next/server";
import { Results, Trader } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import {
  deleteTraderById,
  getTradersByRole,
  insertTrader,
  updateTraderById,
} from "@/lib/query/trader/query";

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

// { traders: Trader[], message: string}
// GET data.json(): trader: Trader
export async function GET(request: NextRequest) {
  let message: string = Results.REQUIRED_LOGIN;

  // Create response
  const response = new Response();

  // Create session
  const session = await getSession(request, response);
  let { user: currentUser } = session;

  // If User is Logged in
  if (currentUser) {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const page = parseInt(searchParams.get("page")!);
    const cursor = parseInt(searchParams.get("cursor")!);

    // Insert Trader into Database
    const { traders, count } = await getTradersByRole(role, page, cursor);
    message = traders
      ? "Fetched traders successfully."
      : "Failed to fetch traders.";

    return createResponse(
      response,
      JSON.stringify({ traders: traders, count: count, message: message }),
      {
        status: 200,
      }
    );
  }
  return createResponse(response, JSON.stringify({ message: message }), {
    status: 403,
  });
}

// { trader: Trader, message: string}
// PUT data.json(): id, field, data
export async function PUT(request: NextRequest) {
  let message: string = Results.REQUIRED_LOGIN;

  // Create response
  const response = new Response();

  // Create session
  const session = await getSession(request, response);
  let { user: currentUser } = session;

  // If User is Logged in
  if (currentUser) {
    const { id, field, data } = await request.json(); // Insert Trader into Database
    const { updatedTrader, message } = await updateTraderById(id, field, data);
    return createResponse(
      response,
      JSON.stringify({ trader: updatedTrader, message: message }),
      {
        status: 200,
      }
    );
  }
  return createResponse(response, JSON.stringify({ message: message }), {
    status: 403,
  });
}

// { trader: Trader, message: string}
// DELETE data.json(): traderId
export async function DELETE(request: NextRequest) {
  let message: string = Results.REQUIRED_LOGIN;

  // Create response
  const response = new Response();

  // Create session
  const session = await getSession(request, response);
  let { user: currentUser } = session;

  // If User is Logged in
  if (currentUser) {
    const { traderId } = await request.json(); // Insert Trader into Database
    const { deletedTrader } = await deleteTraderById(traderId);
    message = deletedTrader
      ? "Deleted trader successfully."
      : "Failed to delete trader.";

    return createResponse(
      response,
      JSON.stringify({ trader: deletedTrader, message: message }),
      {
        status: 200,
      }
    );
  }
  return createResponse(response, JSON.stringify({ message: message }), {
    status: 403,
  });
}
