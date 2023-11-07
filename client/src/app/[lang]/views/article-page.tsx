/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ReactMarkdown from "react-markdown";

export default function ArticlePage({content}: {content: any}) {
  return (
    <div className="wwt-content container relative pt-6 container-sm:pt-10 pb-16 container-lg:pt-20 container-lg:pb-28">
      <div className="p-5 mx-auto bg-white rounded-xl container-sm:rounded-3xl container-lg:rounded-[40px] shadow-lg container-sm:p-10 container-lg:p-16 ">
        <div>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
