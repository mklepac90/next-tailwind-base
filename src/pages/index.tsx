import Head from "next/head";
import { Input } from "@/components/ui/input";
import { table, getPageContent } from "@/utils/airtable";
import { StaticPageProps } from "@/types";
import ReactMarkdown from 'react-markdown';
import { AirtableRecords } from "@/types";

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
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <ReactMarkdown>
            {pageContent?.goals}
          </ReactMarkdown>

          <ReactMarkdown>
            {pageContent?.instructions}
          </ReactMarkdown>

          <a href={pageContent?.videoUrl} target="_blank">
            {pageContent?.videoUrl}
          </a>
        </div>
        <Input type="email" placeholder="Email" />
      </section>
      </>
  );
}
