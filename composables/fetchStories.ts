export const fetchStories = async(routes: string[], cacheVersion: number, page: number = 1) => {
    const token = process.env.STORYBLOK_TOKEN
    const version = 'published'
    const perPage = 100
    const toIgnore = ['home', 'config']

    try {
        const response = await fetch(
            `https://api.storyblok.com/v2/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`,
        )
        const data = await response.json()
    
        // Add routes to the array
        Object.values(data.links).forEach(link => {
            if (!toIgnore.includes(link.slug)) {
                routes.push('/' + link.slug)
            }
        })
    
        // Check if there are more pages with links
        const total = response.headers.get('total')
        const maxPage = Math.ceil(total / perPage)
    
        if (maxPage > page) {
            await fetchStories(routes, cacheVersion, ++page)
        }
    } catch (error) {
        console.error(error)
    }
}