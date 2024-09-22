import { Skeleton } from "@mui/material";
import useItemContext from "../hook/useItemContext";
import Items from "./items";
import CustomSkeleton from "./skeleton";
import { useNavigate } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";

interface ItemsContainerProps {
    title: string;
  }

const ItemsContainer = ({}: ItemsContainerProps) => {
  const { Item } = useItemContext();
  const Navigate = useNavigate();



  return ( <>
    <div className="xs-12   bd-bottm-bold bg-wite">
     <div className="my-mother gap-20 xs-12">
     <div className="xs-5 xs-down-4 interBold px16 xs-px12">
      <span className="pd-10">Items For You</span>
      <div className="dash"></div>
      </div>
      <div className="xs-7 riht xs-down-4 faded-sol">
        <span className="pd-5 mg-5 px12 c-pointer my-bottom-10">Used Items</span>
        <span className="pd-10 px12 c-pointer mg-5">New Items</span>
        <span className="pd-10 px12 c-pointer mg-5 hidden-xs">New from Factory</span>
        <span className="pd-10 mg-5 black"><i className="fas fa-exchange"></i></span>
      </div>
     </div>
    </div>
    <div className="my-mother gap-elemets xs-down-8 down-2">
      {!Item && <div className="my-mother down-1"><CustomSkeleton/></div> }
      {Item?.length > 0 && <>
       {Item?.map((i:any, index:any) => (
          <span onClick={()=> {Navigate(`/items/${i?._id}`)}}><Items key={index} i={i} /></span>
       ))}
      </>}
   </div>
  </> );
}
 
export default ItemsContainer;