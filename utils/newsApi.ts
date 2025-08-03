const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2'; 
export async function fetchNews(category: string) {
  const url = `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  console.log("📢 Fetching News from:", url);

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("📰 News Articles:", data.articles);
    console.log("🔑 News API Key:", API_KEY);

    if (!data.articles || data.articles.length === 0) {
      return [
        {
          title: "Test Article",
          description: "This is a dummy fallback article.",
          url: "https://example.com",
          urlToImage: "https://via.placeholder.com/300",
        }
      ];
    }

    return data.articles;
  } catch (err) {
    console.error("❌ News API Error:", err);
    return [];
  }
}
