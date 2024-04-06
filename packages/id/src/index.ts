// written by @chronark and @unkeydev

import baseX from 'base-x'
import crypto from 'crypto'

const prefixes = {
    generation: 'gen',
    error: 'err',
} as const

export function newId(prefix: keyof typeof prefixes): string {
    const buf = new Uint8Array(16)
    crypto.getRandomValues(buf)
    return [prefixes[prefix], baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz').encode(buf)].join('_')
}
