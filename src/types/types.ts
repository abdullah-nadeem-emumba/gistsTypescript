import React from "react";

export type UserContextType = {
  user: any;
  setUser: React.Dispatch<any>;
};

export type ButtonProps = {
  text: string;
  customstyle?: "light" | "dark";
  children?: JSX.Element;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export type SearchFieldProps = {
  value: string;
  label: string;
  placeholder: string;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: (e: Event) => Promise<[]>;
  handleSearch?: () => any;
};

export type HeaderProps = {
  searchVal: string;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress?: (e: Event) => Promise<[]>;
  handleSearch?: () => any;
};

export type LandingScreenProps = {
  emptyScreen?: Boolean;
  gists: any[];
  page: number;
  count: number;
  loading: Boolean;
  openGistDetails: (gist: any) => void;
  viewType: string;
  setViewType: (type: string) => void;
  handleNextPage: () => void;
  handleChangePage: (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => void;
  handleStar: (id: string, setStarred: (starred: Boolean) => void) => void;
  handleUnstar: (id: string, setStarred: (starred: Boolean) => void) => void;
};

export type RootProps = {
  header: JSX.Element;
  main: JSX.Element;
};

export type TableViewProps = {
  gists: any[];
  onRowClick: (gist: any) => void;
  handleStar: (id: string, setStarred: (starred: Boolean) => void) => void;
  handleUnstar: (id: string, setStarred: (starred: Boolean) => void) => void;
};

export type CardViewProps = {
  gists: any[];
  onCardClick: (gist: any) => void;
};

export type GistCardProps = {
  item: any;
  onCardClick: (gist: any) => void;
};

export type UserInfoProps = {
  item: any;
};

export type ToggleViewProps = {
  viewType: string;
  setViewType: (type: string) => void;
};
