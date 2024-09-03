import axios from 'axios';
import CryptoJS from 'crypto-js';


interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}
const cloudName = 'dv5skyhvl';
const uploadPreset = 'ml_default';

const uploadImageToCloudinary = async (imageFile: File): Promise<CloudinaryUploadResponse | null> => {

  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const { secure_url, public_id } = response.data;
    return { secure_url, public_id };
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};



const deleteImageFromCloudinary = async (publicId: string): Promise<boolean> => {
  const apiKey = "839715384777538";
  const apiSecret = "iJiApRMnr3dFUoW-G81NB2UPWjU";
  const timestamp = Math.floor(Date.now() / 1000);
  
  // Generate a signature using your API secret
  const signature = CryptoJS.SHA1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`).toString();

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('timestamp', String(timestamp));
  formData.append('api_key', apiKey!);
  formData.append('signature', signature);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.result === 'ok';
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export {
  deleteImageFromCloudinary,
  uploadImageToCloudinary
} ;