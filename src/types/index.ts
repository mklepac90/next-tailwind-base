export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export type BoardSections = {
  [name: string]: Task[];
};

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}