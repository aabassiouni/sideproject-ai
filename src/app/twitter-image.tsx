import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export const size = {
    width: 1024,
    height: 512,
}
export const contentType = 'image/png'

export default async function Image() {

    const fontData = await fetch(new URL('../fonts/AzeretMono-Bold.otf', import.meta.url)).then((res) => res.arrayBuffer())

    return new ImageResponse(
        (
            <div
                style={{
                    backgroundColor: '#cbd5e1',
                    height: '100%',
                    width: '100%',
                    fontSize: 100,
                    fontFamily: '"Necto Mono"',
                    // paddingTop: '100px',
                    // paddingLeft: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontWeight: 700,
                    
                }}
            >
                sideprojectAI
            </div>
        ),
        {
            width: 1024,
            height: 512,
            fonts: [
                {
                    name: 'Azeret Mono',
                    data: fontData,
                    style: 'normal',
                    weight: 700,
                },
            ],
        }
    )
}
