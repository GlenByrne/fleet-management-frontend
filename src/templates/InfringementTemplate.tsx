import { ReactNode } from 'react';
import Head from 'next/head';
import ClientOnly from '@/core/ClientOnly/ClientOnly';

type InfringementTemplateProps = {
  header: ReactNode;
  sidebar: ReactNode;
  content: ReactNode;
};

function InfringementTemplate({
  header,
  sidebar,
  content,
}: InfringementTemplateProps) {
  return (
    <div className="flex h-screen">
      <Head>
        <title>Fleet Management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sidebar}
      <div className="flex flex-1 flex-col overflow-hidden">
        {header}

        {/* Main content */}
        <div className="flex flex-1 items-stretch overflow-hidden p-4">
          <main className="flex-1 overflow-y-auto">
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col lg:order-last"
            >
              <h1 id="primary-heading" className="sr-only">
                Infringements
              </h1>
              <ClientOnly>{content}</ClientOnly>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default InfringementTemplate;
