/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { PiXThin, PiEqualsThin } from "react-icons/pi";
import { Alert, Button, TextInput } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DashSidebar from "./DashSidebar";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  const [dropdown, setDropdown] = useState(false);
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
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }

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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  // const handleRemoveImage = async () => {
  //   try {
  //     const response = await fetch("/api/auth/remove-image", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: currentUser.email }),
  //     });

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error("Error removing profile picture:", errorText);
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log(data);

  //     if (data.message) {
  //       // setCurrentUserProfileImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  //       setImageFileUrl("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  //       dispatch(updateProfilePicture(imageFileUrl));
  //     }
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // };

  return (
    <div className="flex justify-between w-full max-w-5xl px-5 py-5 sm:px-16">
      <div className="font-normal flex-1">
        <h1 className="font-medium text-2xl">Profile Information</h1>
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
                <span className="text-red-500 text-sm cursor-pointer">
                  Remove
                </span>
              </div>
              <p className="text-light-gray text-sm">
                Recommended: Square JPG, PNG.
              </p>
            </div>
          </div>
        </div>

        {/* username */}
        <div className="flex flex-col mt-8 w-full sm:w-2/3 gap-y-1">
          <p className="text-light-gray">Username</p>
          <TextInput value={currentUser.username} readOnly />
        </div>
        {/* email */}
        <div className="flex flex-col mt-8 w-full sm:w-2/3 gap-y-1">
          <p className="text-light-gray">Email</p>
          <TextInput value={currentUser.email} readOnly />
        </div>
        {/* password */}
        <div className="flex flex-col mt-8 w-full sm:w-2/3 gap-y-1">
          <p className="text-light-gray">Password</p>
          <TextInput value={"********"} readOnly />
        </div>

        <div className="flex justify-end sm:justify-start gap-x-5 mt-10 w-full sm:w-2/3">
          <Button color="light" className="w-1/2">
            Update
          </Button>
          <Button color="failure" className="w-1/2">
            Delete Account
          </Button>
        </div>
      </div>

      <div className="block sm:hidden">
        {dropdown ? (
          <PiXThin size={25} onClick={() => setDropdown(!dropdown)} />
        ) : (
          <PiEqualsThin size={25} onClick={() => setDropdown(!dropdown)} />
        )}
        {dropdown && (
          <div className="absolute top-28 left-0 w-full h-full">
            <DashSidebar />
          </div>
        )}
      </div>
    </div>
  );
}
