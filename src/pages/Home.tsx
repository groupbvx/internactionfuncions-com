// @ts-nocheck
import { ArticleCard } from '@/components/ArticleCard';
import { AdSpot } from '@/components/AdSpot';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArticleService, Article } from '../services/ArticleService';
import { NewsletterForm } from '../components/NewsletterForm';
import { SEO } from '../components/SEO';
import { ArrowRight } from 'lucide-react';

/**
 * Home - Página inicial do site
 * 
 * JÁ INCLUI:
 * - AdSpot no hero
 * - Lista de artigos recentes
 * - NewsletterForm no hero
 */
export function Home() {
    const siteName = import.meta.env.VITE_SITE_NAME || 'Nosso Site';
    const siteDescription = import.meta.env.VITE_SITE_DESCRIPTION || 'Seu portal de conteúdo';

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const articles = await ArticleService.getArticles({ limit: 6 });
                setArticles(articles);
            } catch (error) {
                console.error('Error loading articles:', error);
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    return (
        <>
            <SEO
                title={`${siteName} - ${siteDescription}`}
                description={siteDescription}
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Bem-vindo ao {siteName}
                    </h1>
                    <p className="text-xl text-blue-100 mb-8">
                        {siteDescription}
                    </p>

                    {/* Newsletter no Hero */}
                    <div className="max-w-md mx-auto">
                        <NewsletterForm
                            title=""
                            description="Receba novidades diretamente no seu email"
                            buttonText="Inscrever-se"
                            variant="inline"
                            source="hero"
                            className="bg-white/10 backdrop-blur-sm"
                        />
                    </div>
                </div>
            </section>

            {/* AD SPOT: After Hero */}
            <AdSpot position="in-content" className="mb-12" />

            {/* Recent Articles */}
            <section>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Artigos Recentes
                    </h2>
                    <Link
                        to="/artigos"
                        className="text-blue-600 hover:underline flex items-center"
                    >
                        Ver todos
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 h-48 rounded-lg mb-4" />
                                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2" />
                                <div className="bg-gray-200 h-4 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">
                            Nenhum artigo disponível no momento.
                        </p>
                    </div>
                )}
            </section>

            {/* AD SPOT: After Articles */}
            <AdSpot position="in-content" className="mt-12" />
        </>
    );
}

export default Home;
