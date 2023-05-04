export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export type BoardSections = {
  [name: string]: Task[];
};

export type PageContent = {
  page: string,
  goals: string,
  instructions: string,
  videoUrl: string,
};

export type StaticPageProps = {
  pageContent?: PageContent,
  err?: string
};

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
};