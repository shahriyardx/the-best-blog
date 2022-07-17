import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(['hello'])

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default Home
