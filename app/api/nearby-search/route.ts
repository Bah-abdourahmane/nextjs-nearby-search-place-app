import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!category || !lat || !lng) {
    return NextResponse.json(
      { error: "Missing required parameters: category, lat, lng" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/nearbysearch/json`,
      {
        params: {
          fields: "formatted_address,name,rating,opening_hours,geometry,photos",
          type: category,
          location: `${lat},${lng}`,
          radius: 5000,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching nearby search data:", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby search data." },
      { status: 500 }
    );
  }
}
