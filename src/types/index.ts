import { z } from "zod";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export type BoardSections = {
  [name: string]: Task[];
};

export const PageContent = z.object({
  goals: z.string(),
  instructions: z.string(),
  videoUrl: z.string(),
});

export type PageContentType = z.infer<typeof PageContent>;

export type StaticPageProps = {
  pageContent?: PageContentType,
  err?: string
};

const PageContentWithName = PageContent.extend({
  page: z.string(),
});

export const AirtableRecords = z.array(z.object(
    { fields: PageContentWithName }
  ));

export type AirtableRecordsType = z.infer<typeof AirtableRecords>;

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
};