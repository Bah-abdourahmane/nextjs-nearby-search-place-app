import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url); // Extraction des paramètres de requête
  const searchtext = searchParams.get("searchtext");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!searchtext || !lat || !lng) {
    return NextResponse.json(
      { error: "Missing required parameters: searchtext, lat, lng" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/findplacefromtext/json`,
      {
        params: {
          fields: "formatted_address,name,rating,opening_hours,geometry,photos",
          input: searchtext,
          inputtype: "textquery",
          locationbias: `circle:20000@${lat},${lng}`,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );
    return NextResponse.json(response.data); // Réponse JSON avec les données
  } catch (error) {
    console.error("Error fetching place data:", error);
    return NextResponse.json(
      { error: "Failed to fetch place data." },
      { status: 500 }
    );
  }
}
