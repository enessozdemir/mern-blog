/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { PiXThin, PiEqualsThin, PiPlusBold } from "react-icons/pi";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DashSidebar from "./DashSidebar";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice";
import { Link } from "react-router-dom";

export default function DashProfile() {
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
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

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

  return (
    <div className="flex flex-col sm:flex-row w-full">
      <div className="flex justify-between sm:w-[78%] w-full max-w-5xl px-5 py-5 sm:px-16">
        <div className="font-normal flex-1">
          <h1 className="text-2xl">Profile Information</h1>
          {/* photo */}
          <div className="flex flex-col mt-8">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
            <p className="text-light-gray">Photo</p>
            <div className="flex gap-x-6 mt-2">
              <div className="relative">
                {imageFileUploadProgress && (
                  <CircularProgressbar
                    value={imageFileUploadProgress || 0}
                    text={`${imageFileUploadProgress}%`}
                    strokeWidth={5}
                    styles={{
                      root: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      },
                      path: {
                        stroke: `rgba(62, 152, 199, ${
                          imageFileUploadProgress / 100
                        })`,
                      },
                    }}
                  />
                )}
                <img
                  src={imageFileUrl || currentUser.profilePicture}
                  alt="User"
                  className={`rounded-full w-20 h-20 object-cover cursor-pointer ${
                    imageFileUploadProgress &&
                    imageFileUploadProgress < 100 &&
                    "opacity-60"
                  }`}
                  onClick={() => filePickerRef.current.click()}
                />
              </div>
              {imageFileUploadError && (
                <Alert color="failure">{imageFileUploadError}</Alert>
              )}
              <div className="flex flex-col justify-evenly">
                <div className="flex gap-x-5">
                  <span
                    className="text-green-500 text-sm cursor-pointer"
                    onClick={() => filePickerRef.current.click()}
                  >
                    Update
                  </span>
                  <span
                    className="text-red-500 text-sm cursor-pointer"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </span>
                </div>
                <p className="text-light-gray text-sm">
                  Recommended: Square JPG, PNG. Max: 2MB
                </p>
              </div>
            </div>
          </div>

          {/* username */}
          <div className="flex flex-col mt-8 w-full sm:w-2/3 gap-y-1">
            <p className="text-light-gray">Username</p>
            <TextInput
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
          </div>
          {/* email */}
          <div className="flex flex-col mt-8 w-full sm:w-2/3 gap-y-1">
            <p className="text-light-gray">Email</p>
            <TextInput
              defaultValue={currentUser.email}
              onChange={handleChange}
              id="email"
            />
          </div>
          {/* password */}
          <div className="flex flex-col mt-8 w-full sm:w-2/3 gap-y-1">
            <p className="text-light-gray">Password</p>
            <TextInput
              type="password"
              id="password"
              placeholder={"********"}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end sm:justify-start gap-x-5 mt-10 w-full sm:w-2/3">
            <Button
              color="light"
              className="w-1/2"
              onClick={handleSubmit}
              disabled={
                !formData.username &&
                !formData.email &&
                !formData.password &&
                !imageFileUrl
              }
            >
              Update
            </Button>
            <Button
              color="failure"
              className="w-1/2"
              onClick={() => setShowModal(true)}
            >
              Delete Account
            </Button>
          </div>

          {showModal && (
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size="md"
              className="text-gray-500"
            >
              <ModalHeader className="p-6">Delete Account</ModalHeader>
              <ModalBody>
                <p className="text-sm text-justify">
                  We are sorry to see you go. Once your account is deleted, all
                  of your content will be permanently gone, including your
                  profile. Hope, we meet again!
                </p>

                <div className="mt-3">
                  <p className="text-sm">
                    To confirm deletion, type{" "}
                    <span className="text-red-600">“delete”</span> below:
                  </p>
                  <TextInput
                    id="delete"
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-end gap-x-2 mt-5">
                  <Button
                    color="light"
                    className="font-extralight text-red-600 border border-red-600"
                    onClick={() => setShowModal(false)}
                    size="sm"
                    pill
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteUser}
                    color="failure"
                    className="font-extralight"
                    size="sm"
                    disabled={formData.delete !== "delete"}
                    pill
                  >
                    Delete Account
                  </Button>
                </div>

                {deleteUserSuccess && (
                  <Alert color="success" className="w-full mt-5">
                    {deleteUserSuccess}
                  </Alert>
                )}

                {deleteUserError && (
                  <Alert color="failure" className="w-full mt-5">
                    {deleteUserError}
                  </Alert>
                )}
              </ModalBody>
            </Modal>
          )}

          {updateUserSuccess && (
            <Alert color="success" className="w-full sm:w-2/3 mt-5">
              {updateUserSuccess}
            </Alert>
          )}

          {updateUserError && (
            <Alert color="failure" className="w-full sm:w-2/3 mt-5">
              {updateUserError}
            </Alert>
          )}
        </div>

        <div className="block sm:hidden">
          {dropdown ? (
            <PiXThin
              className="cursor-pointer"
              size={25}
              onClick={() => setDropdown(!dropdown)}
            />
          ) : (
            <PiEqualsThin
              className="cursor-pointer"
              size={25}
              onClick={() => setDropdown(!dropdown)}
            />
          )}
          {dropdown && (
            <div className="absolute top-28 left-0 w-full h-full">
              <DashSidebar />
            </div>
          )}
        </div>
      </div>

      <Link to={"/create-post"} className="max-h-fit">
        <Button
          type="button"
          color="success"
          className="w-[88%] ml-4 sm:ml-0 sm:w-full sm:mt-4"
        >
          <div className="flex gap-x-1 items-center">
            <PiPlusBold className="w-4 h-4" />
            <p> Create New Post</p>
          </div>
        </Button>
      </Link>
    </div>
  );
}
