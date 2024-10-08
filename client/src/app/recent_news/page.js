'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  /*const [page, setPage] = useState(1); // State to track current page
  const [totalResults, setTotalResults] = useState(0); // Total number of results
  const pageSize = 10; // Number of articles per page*/

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'environmental disaster OR natural disaster OR climate change', // Keywords for environmental disaster-related news
            language: 'en', // Only get articles in English
            sortBy: 'publishedAt', // Sort by latest published articles
            apiKey: '22d374823ffa40159af998a3e5d9c521' // Replace with your actual API key
          }
        });
        setNews(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NewsPage;