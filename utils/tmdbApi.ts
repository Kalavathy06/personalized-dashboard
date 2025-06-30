export async function 
fetchTrendingMovies() {
  console.log("⚠ TMDB unreachable, using mock data");
  console.log("TMDB API Key:", process.env.NEXT_PUBLIC_TMDB_API_KEY);

  return [
    {
      title: "The Matrix",
      overview: "A computer hacker learns about the true nature of reality...",
      poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    },
    {
      title: "Inception",
      overview: "A thief who steals corporate secrets through dream-sharing...",
      poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    },
    {
      title: "Interstellar",
      overview: "A team of explorers travel through a wormhole in space...",
      poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
  ];
}