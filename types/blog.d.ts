export type Blog = {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  author: Author;
  createAt: string;
  updateAt: string;
};

type Author = {
  id: string;
  fullName: string;
  avatar: string;
};
