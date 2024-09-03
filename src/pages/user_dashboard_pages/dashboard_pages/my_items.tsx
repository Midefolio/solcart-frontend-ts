import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import useApi from "../../../hook/useApi";
import useUtilsContext from "../../../hook/useUtilsContext";
import CustomSkeleton from "../../../component/skeleton";
import useUtils from "../../../utils/useutils";

const MyItems = () => {
    const [actv, setActv] = useState('review');
    const [items, setItems] = useState<any>(null);
    const [query, setQuery] = useState<any>(null);
    const { makeRequest } = useApi();
    const { isSending, notifySuccess } = useUtils();
    const { currentUser, user } = useUserAuthContext();
    const { BASE_URL } = useUtilsContext();
    const get_item_api = `${BASE_URL}Items/get-by-props`;
    const delete_item_api = `${BASE_URL}Items/delete-item`;

    const handleClick = (title: string, status: string) => {
        setActv(title);
        setQuery({ user_id: currentUser?.user_id, deployment_status: status });
    };

    const getItems = async () => {
        setItems(null);
        const res = await makeRequest("POST", get_item_api, query, null, user);
        if (res) {
            setItems(res.data);
        }
    };

    useEffect(() => {
        if (currentUser) {
            setQuery({ user_id: currentUser?.user_id, deployment_status: 'in-review' });
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser && query) {
            getItems();
        }
    }, [query, currentUser]);

    const deleteItems = async (item_id: string, name: string) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${name?.slice(0, 9)}..." item?`);
        if (!confirmDelete) {
            return;
        }
        isSending(true, 'Deleting...');
        const res = await makeRequest("POST", delete_item_api, { item_id }, () => isSending(false), user);
        if (res) {
            isSending(false);
            getItems();
            notifySuccess("Item deleted successfully");
        }
    };

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
                            onClick={() => handleClick('review', 'in-review')}
                        >
                             Reviewing
                        </span>
                        <span
                            className={actv === 'live' ? "actv green" : ""}
                            onClick={() => handleClick('live', 'live')}
                        >
                             Live
                        </span>
                        <span
                            className={actv === 'rejected' ? "actv red" : ""}
                            onClick={() => handleClick('rejected', 'rejected')}
                        >
                             Rejected
                        </span>
                        <span
                            className={actv === 'suspended' ? "actv color-code-1" : ""}
                            onClick={() => handleClick('suspended', 'suspended')}
                        >
                         Suspended
                        </span>
                    </div>
                    <div className="my-col-10 off-1 xs-container xs-down-1 down-3">
                        {!items && <CustomSkeleton />}
                        {items?.length > 0 && (
                            <>
                                {items.map((item: any, index: number) => (
                                    <div className="my-col-4 xs-down-5 shadow xs-12 down-1" key={index}>
                                        <div className="my-col-11 xs-12 my-b-shad w bg-white rad-10">
                                            <div className="my-col-3 xs-3 xs-down-1">
                                                <div className="img-container-2">
                                                    <img src={item.images[0]?.secure_url} alt={item.title} />
                                                </div>
                                            </div>
                                            <div className="my-col-9 xs-9">
                                                <div className="my-container xs-down-3 xs-container">
                                                    <div>
                                                        <span className="px12 xs-px12 color-code-1 ubuntuBold">
                                                            {item.title?.slice(0, 20)}...
                                                        </span>{" "}
                                                        <span className="pd-5 xs-px8 rad-30 ubuntuBold bg-color-code-3 color-code-1">
                                                            {item.condition}
                                                        </span>
                                                    </div>
                                                    <div className="my-mother xs-down-1">
                                                        <span className="px12 xs-px10 ubuntuLight orange">
                                                            {item.deployment_status} <i className="fas px10 fa-spinner orange"></i>
                                                        </span>
                                                        <span className="faded-sol pd-5 rad-30 mg-5 px10 ubuntuBold bg-color-code-3 xs-px8 color-code-1">
                                                            within 10hrs max
                                                        </span>
                                                    </div>
                                                    <div className="my-mother">
                                                        <AiOutlineDelete
                                                            onClick={() => deleteItems(item._id, item.title)}
                                                            title="delete item"
                                                            className="pd-5 faded-sol"
                                                        />
                                                        <AiOutlineEdit
                                                            title="update item"
                                                            className="pd-5 faded-sol"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {items?.length < 1 && (
                            <div className="my-mother xs-down-8">
                                <span className="pd-5 px13 faded-sol ubuntuBold">No Items in this category</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyItems;
