// app/api/robots/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  console.log("Request from a " + req + " robot.")
  
  const isProduction = process.env.NODE_ENV === 'production';

  const robotsTxt = `User-agent: * \n
Disallow: ${isProduction ? '/private' : ''} \n
Allow: /`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}