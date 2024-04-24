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

export type comboType = {
  _id: string;
  name: string;
  figures: figType[];
  owner: string;
  comment: string;
};

export type entryExitType = {
  _id: string;
  owner: string;
  figureTo: {
    id: string;
    name: string;
  };
  figureFrom: {
    id: string;
    name: string;
  };
};

export type likeType = {
  entryExit: string;
  follower: string;
};
