export type figType = {
  _id: string;
  name: string;
  ref: string;
  image: string;
  discipline: {
    name: string;
    ref: string;
  };
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
};

export type statusType = {
  _id: string;
  figure: figType;
  user: string;
  name: string;
  oneSide: string;
  range: number;
};

export type faveType = {
  _id: string;
  figure: figType;
  user: string;
};
