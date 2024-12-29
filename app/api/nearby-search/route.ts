import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export  async function GET(req: NextApiRequest, res: NextApiResponse) {
  
  const { category, lat, lng } = req.query;

  if (!category || !lat || !lng) {
    return res
      .status(400)
      .json({ error: "Missing required parameters: category, lat, lng" });
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

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error fetching nearby search data:", error);
    NextResponse.json({ error: "Failed to fetch nearby search data." });
  }
}
