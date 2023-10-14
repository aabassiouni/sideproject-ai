/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    // reactStrictMode: true,
    modularizeImports: {
        'lucide-react': {
            transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
            // skipDefaultConversion: true,
            preventFullImport: true,
        },
    },
}

module.exports = nextConfig
