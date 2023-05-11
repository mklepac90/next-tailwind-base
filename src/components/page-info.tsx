import { PageContentType } from '@/types'
import React from 'react'

import PageHeading from "@/components/page-heading"
import SectionHeading from "@/components/section-heading"
import ReactMarkdown from 'react-markdown';

const PageInfo = ({ title, goals, instructions, videoUrl }: PageContentType & { title: string }) => {
  return (
    <div className="flex flex-col gap-10 mb-20 lg:gap-20">
        <PageHeading heading={title} />
        
        {
          goals ? 
          <div>
            <SectionHeading heading="goals" />

            <ReactMarkdown>
              {goals}
            </ReactMarkdown>
          </div> 
          :
          null
        }
        
        {
          videoUrl ?
          <div>
            <SectionHeading heading="video" />

            <iframe className="w-4/6 aspect-video rounded-xl" src={videoUrl} />
          </div>
          :
          null
        }
        
        {
          instructions ?
          <div>
            <SectionHeading heading="instructions" />

            <ReactMarkdown>
              {instructions}
            </ReactMarkdown>
          </div>
          :
          null
        }
      </div>
  )
}

export default PageInfo