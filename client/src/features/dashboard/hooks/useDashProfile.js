import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../app/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../auth/store/userSlice";

export const useDashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [deleteUserSuccess, setDeleteUserSuccess] = useState(null);
  const [deleteUserError, setDeleteUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)",
          error
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);

    if (imageFileUploading) {
      setUpdateUserError("Please wait for the image to upload!");
      return;
    }

    try {
      dispatch(updateStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleRemoveImage = async (e) => {
    e.preventDefault();
    const defaultImageUrl = import.meta.env.VITE_DEFAULT_IMAGE_URL;
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    setImageFileUrl(defaultImageUrl);
    setFormData({ ...formData, profilePicture: defaultImageUrl });
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    if (formData.delete !== "delete") {
      setDeleteUserError("Please type 'delete' to confirm deletion!");
      return;
    }
    try {
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        setDeleteUserError(data.message);
      } else {
        setDeleteUserSuccess(data.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (error) {
      setDeleteUserError(error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return {
    currentUser,
    imageFile,
    imageFileUrl,
    imageFileUploadProgress,
    imageFileUploadError,
    imageFileUploading,
    updateUserSuccess,
    updateUserError,
    deleteUserSuccess,
    deleteUserError,
    formData,
    filePickerRef,
    dropdown,
    setDropdown,
    showModal,
    setShowModal,
    handleImageChange,
    handleChange,
    handleSubmit,
    handleRemoveImage,
    handleDeleteUser,
  };
};
