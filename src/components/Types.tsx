export type figType = {
  _id: string;
  name: string;
  ref: string;
  image: string;
  discipline: string;
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
};

export type statusType = {
  _id: string;
  figure: figType;
  user: string;
  name: string;
};

export type faveType = {
  _id: string;
  figure: figType;
  user: string;
};
