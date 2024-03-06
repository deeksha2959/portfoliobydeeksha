// "use client";
import Heading from "@/component/Heading";
import Bounded from "@/component/bounded";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

//  export type ContentIndexxProps = Content.ContentIndexxSlice;

/**
 * Props for `ContentIndexx`.
 */
export type ContentIndexProps =
  SliceComponentProps<Content.ContentIndexxSlice>;

/**
 * Component for "ContentIndexx" Slices.
 */
const ContentIndexx = async ({
  slice,
}: ContentIndexProps): Promise< JSX.Element> => {
  const client = createClient()
  const blogPost = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");
  const contentType = slice.primary.content_type || "Blog" 

const items= contentType ==="Blog" ? blogPost : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description}/>
          
        </div>
      )}


      <ContentList
       items ={items} 
       contentType={slice.primary.content_type}
       viewMoretext={slice.primary.view_more_text}
      fallbackItemImage ={slice.primary.fallback_item_image}
      />

    </Bounded>
  );
};

export default ContentIndexx;
