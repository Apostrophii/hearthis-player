export interface Artist {
  id: string;
  permalink: string;
  username: string;
  uri: string;
  permalink_url: string;
  avatar_url: string;
  background_url: string;
  description: string;
  track_count: number;
  playlist_count: number;
  likes_count: number;
  followers_count: number;
  following: boolean;
}

export interface Track {
  id: string;
  created_at: string;
  user_id: string;
  duration: string;
  permalink: string;
  description: string;
  downloadable: string;
  genre: string;
  genre_slush: string;
  title: string;
  uri: string;
  permalink_url: string;
  artwork_url: string;
  background_url: string;
  waveform_data: string;
  waveform_url: string;
  user: {
    id: string;
    permalink: string;
    username: string;
    uri: string;
    permalink_url: string;
    avatar_url: string;
  };
  stream_url: string;
  download_url: string;
  playback_count: string;
  download_count: string;
  favoritings_count: string;
  favorited: boolean;
  comment_count: string;
}
