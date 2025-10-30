import axios from 'axios';

var client_id = 'f97b33bf590840f7ab31e7d372b1a1bf';
var client_secret = 'd700cceafc7c4de483b2ec3850f97a6a';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: 'grant_type=client_credentials'
};

async function getAccessToken() {
  try {
    const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
    if (response.status === 200) {
      const token = response.data.access_token;
    //  console.log('Access token:', token);
      return token;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function spotifySearch(query, limit = 10, offset = 0, market = 'id') {
  const token = await getAccessToken();

  if (!token) {
    console.error('Failed to get access token');
    return;
  }

  const searchUrl = `https://api.spotify.com/v1/search?limit=${limit}&offset=${offset}&q=${query}&type=track&market=${market}`;

  try {
    const spoti = await axios.get(searchUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = spoti.data;
    const item = data.tracks.items;
    const spotify = [];

    if (!item.length) {
      const result = {
        status: false,
        data: `${query} tidak ditemukan`
      };
      console.log(result);
      return result;
    }

    for (let i = 0; i < item.length; i++) {
      const album = item[i].album;
      const title = album.name;
      const artis = album.artists[0].name;
      const external = album.artists[0].external_urls;
      const url_artis = external.spotify;
      const rilis = album.release_date;
      const populer = item[i].popularity;
      const durasi = item[i].duration_ms;
      const image = album.images[1].url;
      const preview = item[i].preview_url;
      const urls = item[i].external_urls.spotify;

      spotify.push({
        title,
        artis,
        url_artis,
        rilis,
        populer: populer + '%',
        durasi: convertDuration(durasi),
        image,
        preview,
        urls
      });
    }

    const result = {
      status: true,
      creator: 'NuyyOfc',
      data: spotify
    };

   // console.log(result);
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}

export { spotifySearch }

function convertDuration(durationMs) {
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);

  let result = '';
  if (hours > 0) {
    result += hours + ' jam ';
  }
  if (minutes > 0) {
    result += minutes + ' menit ';
  }
  if (seconds > 0) {
    result += seconds + ' detik';
  }

  return result.trim();
}