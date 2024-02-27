'use client'

import type { SelectedRepo } from '@/types'
import { SetStateAction, createContext, useContext, useState } from 'react'

export const ValueContext = createContext({
    selectedRepo: { owner: '', repo: '', path: '', url: '' },
    setSelectedRepo: (selectedRepo: SelectedRepo) => {},
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {},
    link: '',
    setLink: (link: string) => {},
    generation: { id: '', name: '', bullets: [] } as { id: string; name: string, bullets: string[] } | null,
    setGeneration: (generation: { id: string; name: string, bullets: string[] } | null) => {},
    keywords: [''],
    setKeywords: (keywords: string[]) => {},
})

export default function ValueProvider({ children }: { children: React.ReactNode }) {
    const [selectedRepo, setSelectedRepo] = useState<SelectedRepo>({
        owner: '',
        repo: '',
        path: '',
        url: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [link, setLink] = useState<string>('')
    const [generation, setGeneration] = useState<{ id: string; name: string, bullets: string[] } | null>(null)
    const [keywords, setKeywords] = useState<string[]>([])

    return (
        <ValueContext.Provider
            value={{
                selectedRepo,
                isLoading,
                link,
                setIsLoading,
                setLink,
                setSelectedRepo,
                generation,
                setGeneration,
                keywords,
                setKeywords
            }}
        >
            {children}
        </ValueContext.Provider>
    )
}

export const useValues = () => {
    const context = useContext(ValueContext)
    if (!context) {
        throw new Error('useValues must be used within a ValueProvider')
    }
    return context
}
