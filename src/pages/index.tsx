import Head from "next/head";
import { StaticPageProps } from "@/types";
import PageInfo from '@/components/page-info';
import getAirtableDataForPage from '@/utils/airtable';

const IndexPage = ({ pageContent }: StaticPageProps) => {
  return (
    <>
      <Head>
        <title>Base Template</title>
        <meta name="description" content="Base Template" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageInfo 
        title="Persona"
        goals={pageContent.goals} 
        instructions={pageContent.instructions} 
        videoUrl={pageContent.videoUrl} 
      />
    </>
  );
}

export async function getStaticProps() {
  const pageContent = await getAirtableDataForPage('index');

  return {
    props: {
      pageContent
    },
  };
}

export default IndexPage;
