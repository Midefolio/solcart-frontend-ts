/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import HtmlParser from "react-html-parser";
const TextContainer = ({ article}:any) => {
  const [text, setText] = useState(article);
  const [isTruncated, setIsTruncated] = useState(false);

  const textController = (index:any) => {
    if (index) {
      const sliced = article?.slice(0, index);
      setText(sliced + "...");
      setIsTruncated(true);
    } else {
      setText(article);
      setIsTruncated(false);
    }
  };

  useEffect(() => {
    if (article?.length > 250) {
      textController(250);
    } else {
      setText(article);
      setIsTruncated(false);
    }
  }, [article]);

  return (
    <>
      <span className="px13">{HtmlParser(text)}</span>
      {isTruncated ? (
        <div className="my-mother">
          <span
            onClick={() => textController(null)}
            className="pd-10-exl color-code-1 my-col-3 c-pointer down-2  px10"
          >
            Read more <i className="fas fa-angle-down px10"></i>
          </span>
        </div>
      ) : (
        article?.length > 250 && (
          <div className="my-mother">
            <span
              onClick={() => textController(250)}
              className="pd-10-exl color-code-1 c-pointer my-col-3 down-2 px10"
            >
              Read Less <i className="fas fa-angle-up px10"></i>
            </span>
          </div>
        )
      )}
    </>
  );
};

export default TextContainer;
