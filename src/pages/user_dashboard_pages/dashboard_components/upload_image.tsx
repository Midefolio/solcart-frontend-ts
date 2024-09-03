import { useState } from "react";
import useUtils from "../../../utils/useutils";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../../../utils/clouds";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UploadImages = ({ Item, setItem }: any) => {
    const { clickHandler, notifyError, notifySuccess } = useUtils();
    const { currentUser } = useUserAuthContext();
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState<any>(false);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setIsUploading(true);
        if (!file) return;
        try {
            const res = await uploadImageToCloudinary(file);
            if (res) {
                const image = res;
                Item.images = [...Item.images, image];
                setItem((prev: any) => ({ ...prev, images: Item.images }));
                localStorage.setItem(`${currentUser?.user_id}`, JSON.stringify(Item));
                notifySuccess("Image uploaded successfully");
                setIsUploading(false);
            }
        } catch (error) {
            notifyError("Error uploading image");
            setIsUploading(false);
        }
    };

    const handleImageDelete = async (imageId: string) => {
        setIsDeleting(imageId);
        try {
            await deleteImageFromCloudinary(imageId);
            const updatedImages = Item.images.filter((image: any) => image.public_id !== imageId);
            setItem((prev: any) => ({ ...prev, images: updatedImages }));
            localStorage.setItem(`${currentUser?.user_id}`, JSON.stringify({ ...Item, images: updatedImages }));
            notifySuccess("Image deleted successfully");
            setIsDeleting(false);
        } catch (error) {
            notifyError("Error deleting image");
            setIsDeleting(false);
        }
    };

    const addTitle = (imageId: string, title: string) => {
        const updatedImages = Item.images.map((image: any) =>
            image.public_id === imageId ? { ...image, title } : image
        );
        setItem((prev: any) => ({ ...prev, images: updatedImages }));
        localStorage.setItem(`${currentUser?.user_id}`, JSON.stringify({ ...Item, images: updatedImages }));
    };

    return (
        <div className="my-mother down-4 xs-down-10">
            <span className="px13 ubuntuBold">
                Images <sup className="red">*</sup>
            </span>
            <div className="my-mother xs-down-2 down-1">
                <div>
                    <span className="px13 xs-px12 ubuntuMedium">
                        Ensure to upload Quality images
                    </span>
                </div>
                <span className="px12 xs-px11 xs-down-2 xs-12 my-col-10 down-1 faded-sol">
                    First image will be used as the title picture. Images will be arranged as they as uploaded
                </span>
                {Item?.images?.map((i: any, index: any) => (
                    <div key={index} className="my-col-3 xs-3 xs-down-5 down-3">
                        <span
                            className="add-pic my-col-12 centered down-2 bg-faded-4 rad-10 xs-down-1"
                            onClick={() => handleImageDelete(i.public_id)}
                        >
                            <img src={i.secure_url} alt="Uploaded" />
                            {isDeleting === i.public_id ? (
                                <span className="p-absolute">
                                    <AiOutlineLoading3Quarters className="fas fa-spin" />
                                </span>
                            ) : (
                                <i className="fas fa-trash-alt p-absolute white"></i>
                            )}
                        </span>
                        <input
                            type="text"
                            value={i?.title}
                            onChange={(e) => addTitle(i.public_id, e.target.value)}
                            placeholder="image title"
                            className="px12 xs-px10 ubuntuBold rad-20 ls-centered down-3 input-1 bg-fadd-4"
                        />
                    </div>
                ))}
                <input
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                    hidden
                    id="select-image-input"
                />
                {Item?.images.length < 30 && (
                  <div className="my-col-2 xs-3 xs-down-5 mg-5 down-3">
                      <span
                        className="add-pic my-col-12 mg-5 xs-down-1 bg-faded-4 rad-10"
                        onClick={() => clickHandler("select-image-input")}
                    >
                        {isUploading ? (
                            <AiOutlineLoading3Quarters className="fas fa-spin" />
                        ) : (
                            <i className="fas fa-plus"></i>
                        )}
                    </span>
                  </div>
                )}
            </div>
        </div>
    );
};

export default UploadImages;
