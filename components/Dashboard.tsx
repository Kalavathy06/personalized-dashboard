import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '@/store/slices/contentSlice';
import { AppDispatch, RootState } from '@/store';
import { PreferencesPanel } from '@/components/PreferencesPanel';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const prefs = useSelector((state: RootState) => state.user.preferences);
  const { news, recs, loading } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    dispatch(fetchContent(prefs));
  }, [dispatch, prefs]);

  console.log('📌 Current Preferences:', prefs);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📊 Personalized Dashboard</h1>

      {/* Preferences Selector */}
      <PreferencesPanel />

      {/* News Feed */}
      <h2 className="text-2xl font-semibold mb-4">📰 Personalized News Feed</h2>

      {loading ? (
        <p className="text-gray-600">Loading content...</p>
      ) : news.length === 0 ? (
        <p className="text-gray-600">No articles found. Try changing your preferences.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, idx) => (
            <div key={idx} className="bg-white rounded shadow p-4">
              {item.urlToImage && (
                <img
                  src={item.urlToImage}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline mt-3 inline-block"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Movie Recommendations */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">🎬 Trending Movies</h2>

      {recs.length === 0 ? (
        <p className="text-gray-600">No movies available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recs.map((movie, idx) => (
            <div key={idx} className="bg-white rounded shadow p-4">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded mb-3"
                />
              )}
              <h3 className="font-semibold text-lg">{movie.title}</h3>
              <p className="text-sm text-gray-700">{movie.overview?.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;