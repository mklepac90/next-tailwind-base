import Head from "next/head";
import { table, getPageContent } from "@/utils/airtable";
import { StaticPageProps } from "@/types";
import ReactMarkdown from 'react-markdown';
import { AirtableRecords } from "@/types";
import PageHeading from "@/components/page-heading"
import SectionHeading from "@/components/section-heading"

export async function getStaticProps() {
  try {
    const items = await table.select({}).firstPage();
    const parsedItems = AirtableRecords.parse(items);
    const pageContent = getPageContent('index', parsedItems);
  
    return {
      props: {
        pageContent
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        err: "Something went wrong 😕",
      },
    };
  }
}

export default function IndexPage({ pageContent, err }: StaticPageProps ) {
  if (err) return err;

  return (
    <>
      <Head>
        <title>Base Template</title>
        <meta name="description" content="Base Template" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-20">
        <PageHeading heading="Persona" />
        
        <div>
          <SectionHeading heading="goals" />

          <ReactMarkdown>
            {pageContent?.goals}
          </ReactMarkdown>
        </div>
        
        <div>
          <SectionHeading heading="video" />

          <a href={pageContent?.videoUrl} target="_blank">
            {pageContent?.videoUrl}
          </a>
        </div>
        
        <div>
          <SectionHeading heading="instructions" />

          <ReactMarkdown>
            {pageContent?.instructions}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
