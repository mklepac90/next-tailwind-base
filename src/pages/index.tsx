import Head from "next/head";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Layout } from "@/components/layout";
import { Input } from "@/components/ui/input";

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Base Template</title>
        <meta name="description" content="Base Template" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Beautifully designed components <br className="hidden sm:inline" />
            built with Radix UI and Tailwind CSS.
          </h1>
        </div>
        <Input type="email" placeholder="Email" />
      </section>
    </Layout>
  );
}
