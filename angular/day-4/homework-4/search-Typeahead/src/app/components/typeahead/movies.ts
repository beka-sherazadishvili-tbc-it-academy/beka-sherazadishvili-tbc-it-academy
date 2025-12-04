export interface IMovies {
    title: string;
    genre: string;
    img: string;
    description: string;
}

export const MOVIES: IMovies[] = [
  {
    title: 'Inception',
    genre: 'Sci-Fi',
    img: 'inception.jpg',
    description: 'A thief enters peoples dreams to steal secrets and plant ideas.'
  },
  {
    title: 'The Dark Knight',
    genre: 'Action',
    img: 'dark-knight.jpg',
    description: 'Batman faces the Joker, a criminal mastermind threatening Gotham.'
  },
  {
    title: 'Interstellar',
    genre: 'Sci-Fi',
    img: 'interstellar.jpg',
    description: 'A team travels through a wormhole in search of a new home for humanity.'
  },
  {
    title: 'The Prestige',
    genre: 'Drama',
    img: 'prestige.png',
    description: 'Two rival magicians engage in a dangerous battle of deception.'
  },
  {
    title: 'Memento',
    genre: 'Thriller',
    img: 'memento.png',
    description: 'A man with short-term memory loss seeks revenge for his wifes murder.'
  },
  {
    title: 'Dunkirk',
    genre: 'War',
    img: 'dunkirk.png',
    description: 'Allied soldiers are evacuated from Dunkirk during WWII.'
  },
  {
    title: 'Tenet',
    genre: 'Sci-Fi',
    img: 'tenet.png',
    description: 'A secret agent manipulates time to prevent global catastrophe.'
  },
  {
    title: 'The Matrix',
    genre: 'Sci-Fi',
    img: 'matrix.png',
    description: 'A hacker discovers the world is a simulated reality controlled by machines.'
  },
  {
    title: 'Fight Club',
    genre: 'Drama',
    img: 'fight-club.jpeg',
    description: 'An insomniac forms an underground fight club to disrupt consumer culture.'
  },
  {
    title: 'Pulp Fiction',
    genre: 'Crime',
    img: 'pulp-fiction.jpeg',
    description: 'Interwoven stories of crime, redemption, and chaos in Los Angeles.'
  }
];
