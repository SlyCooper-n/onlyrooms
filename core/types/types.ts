// firebase snapshots subscription
export type FirebaseSnapshotRoom = {
  createdBy: string;
  title: string;
  questions?: Record<
    string,
    {
      author: {
        name: string;
        avatar: string;
      };
      content: string;
      isAnswered: boolean;
      isHighlighted: boolean;
      likes?: Record<
        string,
        {
          authorId: string;
        }
      >;
    }
  >;
};

// question type for live-rooms
export type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likesCount: number;
  likeId: string | null;
};

// options for Select component
export type SelectOptions = {
  value: string;
  text: string;
};

// type for Theme Context value
export type ThemeContextValue = {
  appTheme: "light" | "dark";
  toggleTheme: () => void;
  setAppThemeToLight: () => void;
  setAppThemeToDark: () => void;
};

// type for logged user
export type UserType = {
  id: string;
  name: string | null;
  avatar: string | null;
};
