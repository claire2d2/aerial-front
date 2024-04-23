type focusType = {
  _id: string;
  name: string;
};
export type figType = {
  _id: string;
  name: string;
  ref: string;
  image: string;
  discipline: {
    _id: string;
    name: string;
    ref: string;
  };
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
  focus: focusType[];
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

export type zoneType = {
  _id: string;
  name: string;
};

export type figFormType = {
  name: string;
  ref: string;
  discipline: string;
  difficulty: string;
  image: string;
  imgArtist: string;
  imgArtistUrl: string;
  focus: string[];
};
