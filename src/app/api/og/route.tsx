import { ImageResponse } from 'next/server';

 
export const runtime = 'edge';
 
export async function GET() {

  const fontData = await fetch(
    new URL('../../fonts/Necto-Mono.woff2', import.meta.url),
  ).then((res) => res.arrayBuffer());
 
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#f1f5f9',
          height: '100%',
          width: '100%',
          fontSize: 100,
          fontFamily: '"Necto Mono"',
          paddingTop: '100px',
          paddingLeft: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        sideproject.ai
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Necto Mono',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}