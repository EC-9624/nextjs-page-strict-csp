import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type Repo = {
    owner: any
    avatar_url: string | undefined
    name: string
    stargazers_count: number
}

export const getServerSideProps = (async () => {
    // Fetch data from external API
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const repo: Repo = await res.json()
    // Pass data to the page via props
    return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: Repo }>

export default function Page({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <main className='flex justify-center items-center h-screen'>
            <h1 className='text-4xl font-bold'>{repo.stargazers_count}</h1>
        </main>

    )
}