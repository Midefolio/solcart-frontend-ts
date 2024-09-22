import { AiOutlineBars } from "react-icons/ai";
import { solCatCategories } from "../data/category";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CatSideBar = () => {
  const catData = solCatCategories;
  const [openSubCat, setSubCat] = useState<any>(null);
  const [, setSubCatWeb] = useState<any>(null);
  const Navigate = useNavigate();
  // console.log(catData)
  return (
    <>
      <div className="catigory-side-bar bg-white">
        <div className="my-col-11 off-1 down-20 hidden-xs">
          <span className="my-col-1">
            <AiOutlineBars className="px20" />
          </span>
          <span className="my-col-10 off-1 ubuntuBold">All Categories</span>
        </div>
        <div className="my-col-11 hidden-ls my-bottom-20 cats bg-fadd-2 ubuntuMedium rad-10 off-1">
          {catData?.map((i, index) => (
            <div
              className="my-col-11 pd-5 px13"
              key={index}
              onClick={() => {
                setSubCat(index + "mainCat");
              }}
            >
              <span className="my-col-11 faded-sol xs-px12 px13 ubuntuBold down-">
                {" "}
                <span className="pd-5">{i.icon}</span> {i.category.slice(0, 18)}{" "}
                <i className="fas fa-angle-right fl-right down-2"></i>
              </span>
              <div className="my-mother xs-down-2 my-bottom-10">
                {openSubCat == index + "mainCat" && (
                  <div className="xs-10 xs-off-1">
                    {i.subcategories.map((sub, index) => (
                      <div className="pd-5 xs-px11" key={index}>
                        <li>{sub.name.slice(0, 30)}</li>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="my-col-11 hidden-xs cats bg-fadd-2 ubuntuMedium rad-10 off-1 down-5">
          {catData?.map((i, index) => (
            <div
              className="my-col-11 pd-5 mainCat  px13"
              key={index}
              onClick={() => {
                setSubCatWeb(index + "mainCat");
              }}
            >
              <span className="my-col-11 xs-px12 px13 c-pointer ubuntuBold down-">
                {" "}
                <span className="pd-5">{i.icon}</span> {i.category.slice(0, 18)}{" "}
                <i className="fas fa-angle-right fl-right down-2"></i>
              </span>
              <div className="subCat shadow">
                <div className="my-col-10 off-1 down-25">
                  <div className="bd-bottom black my-bottom-10">
                    <span className="ubuntuBold">{i.category}</span>
                  </div>
                  {i.subcategories.map((sub, index) => (
                    <div
                      key={index}
                      className="faded-sol ubuntuBold my-mother c-pointer ubuntuMedium pd-5 down-5 px12"
                    >
                      {sub.name.slice(0, 30)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <span
          onClick={() => {
            Navigate("/profile/Items?p=post-item");
          }}
          className="input-1 hidden-xs px13 down-1 bg-img  ubuntuBold flex unset-indent white c-pointer my-col-10 off-1 bg-color-code-1"
        >
          Sell On Solcart
        </span>
      </div>
    </>
  );
};

export default CatSideBar;
