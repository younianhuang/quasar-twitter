export interface UserSnippet {
  id: string;
  name: string;
  photoURL: string;
}

export interface Tweet {
  id: string;
  content: string;
  date: number;
  like: boolean;
  userSnippet: UserSnippet;
}
