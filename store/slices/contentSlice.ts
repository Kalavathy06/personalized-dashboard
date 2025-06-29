import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchNews } from '@/utils/newsApi';
import { fetchTrendingMovies } from '@/utils/tmdbApi';

type NewsItem = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};

type MovieItem = {
  title: string;
  overview: string;
  poster_path: string;
};

interface ContentState {
  news: NewsItem[];
  recs: MovieItem[];
  loading: boolean;
}

const initialState: ContentState = {
  news: [],
  recs: [],
  loading: false,
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (prefs: string[]) => {
    const allNews: NewsItem[] = [];

    for (const cat of prefs) {
      const catNews = await fetchNews(cat.toLowerCase());
      allNews.push(...catNews.slice(0, 3)); // fetch top 3 from each category
    }

    const recs: MovieItem[] = await fetchTrendingMovies();

    return { news: allNews, recs };
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchContent.fulfilled,
      (state, action: PayloadAction<{ news: NewsItem[]; recs: MovieItem[] }>) => {
        state.news = action.payload.news;
        state.recs = action.payload.recs;
        state.loading = false;
      }
    );
    builder.addCase(fetchContent.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default contentSlice.reducer;