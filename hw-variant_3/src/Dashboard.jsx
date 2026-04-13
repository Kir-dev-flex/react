import { useQuery } from '@tanstack/react-query'
import { fetchUser, fetchStats, fetchFeed } from './api'
import { Suspense } from 'react'

function DashboardInner() {
    const { data: user } = useQuery({  // меняем все запросы на запросы из танстака. Теперь это не waterfall, ведь реакт query видит ВСЕ запросы и просто будет врубать из по очереди в порядке enabled. Т.е. запросы НЕ ждут друг друга, rqact query сам запускает в параллели все, что может.
        queryKey: ['user'],
        queryFn: fetchUser
    })

    const { data: stats } = useQuery({
        queryKey: ['stats', user?.id],
        queryFn: () => fetchStats(user.id),
        enabled: !!user
    })

    const { data: feed } = useQuery({
        queryKey: ['feed', stats?.teamId],
        queryFn: () => fetchFeed(stats.teamId),
        enabled: !!stats
    })

    return <DashboardContent user={user} stats={stats} feed={feed} />
    }

    export default function Dashboard() {
    return (// А вот это нам нужно, чтобы не показывать элемент без загруженных данных, а вместо него показывать что-то иное - в нашем случае skeleton. А как все готово - покажет DashboardInner. Интересно то, что он тут прям останавливаепт render phase, пока не прогрузщятся данные. 
        <Suspense fallback={<Skeleton />}> 
            <DashboardInner />
        </Suspense>
    )
}