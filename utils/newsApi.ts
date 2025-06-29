const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export async function fetchNews(category: string) {
  const url = `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  
  console.log("📢 Fetching News from:", url);

  const res = await fetch(url);
  const data = await res.json();

  console.log("📰 News Articles:", data.articles);
  console.log("🔑 News API Key:", API_KEY);

  return data.articles || [];
}