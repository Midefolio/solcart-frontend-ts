import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import useApi from "../../../hook/useApi";
import useUtilsContext from "../../../hook/useUtilsContext";
import CustomSkeleton from "../../../component/skeleton";
import useUtils from "../../../utils/useutils";

const MyItems = () => {
    const [actv, setActv] = useState('review');
    const [Items, setItems] = useState<any>(null)
    const [query, setQuery] = useState<any>()
    const {makeRequest} = useApi();
    const { isSending, notifySuccess } = useUtils();
    const { currentUser, user} = useUserAuthContext()
    const {BASE_URL} = useUtilsContext()
    const get_item_api = BASE_URL + 'Items/get-by-props';
    const delete_item_api = BASE_URL + 'Items/delete-item';

    const handleClick = (title:any) => {
        setActv(title);
    };

    const getItems = async()=>{
      setItems(null)
       const res = await makeRequest("POST", get_item_api, query, null, user);
       if(res){
        setItems(res.data)
       } 
    }
   
    useEffect(() => {
       if(currentUser){
        setQuery({user_id:currentUser?.user_id, deployment_status:'in-review'})
       }
    }, [currentUser])


    useEffect(() => {
       if(currentUser){
        getItems()
       }
    }, [query])


    const deleteItems = async(item_id:string, name:string)=> {
      const confirm = window.confirm(`Are you sure you want to delete "${name?.slice(0, 9) + '...'}" item`)
      if(!confirm){
        return;
      }
      isSending(true, 'deleteing...');
      const cb =()=> {isSending(false)}
      const res = await makeRequest("POST", delete_item_api, {item_id}, cb, user);
      if(res) {
        isSending(false);
        getItems();
        notifySuccess("Item deleted successfully")
      }
    }

    return (
        <>
            <div className="my-col-10 off-2 xs-container xs-down-9vh">
                <div className="my-container down-10 xs-container bg-white rad-10 my-bottom-50 xs-down-10">
                    <div className="my-col-10 off-1 xs-10 xs-off-1 xs-down-5 down-3">
                        <span className="px20 xs-px15 ubuntuBold">My Items</span>
                    </div>
                    <div className="my-col-10 xs-container xs-down-3 off-1 down-3 faded-sol ubuntuBold bd-bottom my-bottom-10 my-items-links">
                        <span 
                            className={actv === 'review' ? "actv orange" : ""}
                            onClick={() => (setQuery({user_id:currentUser?.user_id, deployment_status:'in-review'}), handleClick('review'))}
                        >
                            <i className="fa fa-spinne "></i> Reviewing
                        </span>
                        <span 
                            className={actv === 'live' ? "actv green" : ""}
                            onClick={() => (setQuery({user_id:currentUser?.user_id, deployment_status:'live'}), handleClick('live'))}
                        >
                            <i className="fa fa-ply"></i> Live
                        </span>
                        <span 
                            className={actv === 'rejected' ? "actv red" : ""}
                            onClick={() => (setQuery({user_id:currentUser?.user_id, deployment_status:'rejected'}), handleClick('rejected'))}
                        >
                            <i className="fas fa-tims"></i> Rejected
                        </span>
                        <span 
                            className={actv === 'suspended' ? "actv color-code-1" : ""}
                            onClick={() => (setQuery({user_id:currentUser?.user_id, deployment_status:'suspended'}), handleClick('suspended'))}
                        >
                            <i className="fas fa-exclaation"></i> Suspended
                        </span>
                    </div>
                    <div className="my-col-10 off-1 xs-container xs-down-1 down-3">
                        {!Items && <CustomSkeleton/>}
                        {Items?.length > 0 && <>
                         {Items?.map((i:any, index:any) =>(
                          <div className="my-col-4 xs-down-5 shadow xs-12 down-1" key={index}>
                            <div className="my-col-11 xs-12 my-b-shad w bg-white rad-10">
                                <div className="my-col-3 xs-3 xs-down-1"><div className="img-container-2"><img src={i.images[0].secure_url} alt="" /></div></div>
                                <div className="my-col-9 xs-9">
                                    <div className="my-container xs-down-3 xs-container">
                                        <div><span className="px12 xs-px12 color-cod-1 ubuntuBold">{i.title?.slice(0, 20) + '...'}</span> <span className="pd-5 xs-px11 rad-30 ubuntuBold bg-clor-code-3 color-code-1">{i.condition}</span></div>
                                        <div className="my-mother xs-down-1">
                                            <span className="px12 xs-px10 ubuntuLight orange">reviewing <i className="fas px10 fa-spinner orange"></i></span>
                                            <span className="faded-sol pd-5 rad-30 mg-5 px10 ubuntuBold bg-color-code-3 xs-px8 color-code-1">withing 10hrs max</span>
                                        </div>
                                        <div className="my-mother">
                                          <AiOutlineDelete onClick={()=> {deleteItems(i?._id, i?.title)}} title="delete item" className="pd-5 faded-sol"/>
                                          <AiOutlineEdit title="update item" className="pd-5 faded-sol"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         ))}
                        </>}
                       {Items?.length < 1 && <>
                        <div className="my-mother xs-down-8">
                            <span className="pd-5 px13 faded-so ubuntuBold">No Items in this category</span>
                        </div>
                       </>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyItems;
