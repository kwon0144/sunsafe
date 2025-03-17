const Articles = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-30 lg:px-30">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-semibold">Sun Safety Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
            {[
              {
                image: 'https://s3-tp22.s3.ap-southeast-2.amazonaws.com/article1.jpeg',
                category: 'Health Alert',
                title: 'Burning is risky – so why are tan lines having their time in the sun on social media?',
                date: 'January 11, 2025',
                author: 'Lenore Talyor',
                description: 'Gen Z influencers spruik tan lines as summer’s ‘fav accessory’ to generation ‘obsessed’ with looks',
                readTime: '5 min read',
                link: 'https://www.theguardian.com/australia-news/2025/jan/11/burning-is-risky-so-why-are-tan-lines-having-their-time-in-the-sun-on-social-media'
                },
                {
                image: 'https://s3-tp22.s3.ap-southeast-2.amazonaws.com/article2.jpeg',
                category: 'Research',
                title: "Experts have developed new sun safety advice for diverse skin types. Here's what it says",
                date: 'February 13, 2024',
                author: 'Evan Young and Penny Timms',
                description: 'Researchers have produced updated sun safety advice to better include people with darker skin tones.',
                readTime: '7 min read',
                link: "https://www.abc.net.au/news/2024-02-13/sun-safety-position-statement/103459156"
                }
            ].map((article, index) => (
                <div 
                key={index} 
                onClick={() => article.link && window.open(article.link, '_blank')}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                >
                <div className="relative h-48">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover"/>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-amber-600">{article.category}</span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.description}</p>
                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <i className="fas fa-user-md text-amber-600 mr-2"></i>
                        <span className="text-sm text-gray-600">{article.author}</span>
                    </div>
                    <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Articles;