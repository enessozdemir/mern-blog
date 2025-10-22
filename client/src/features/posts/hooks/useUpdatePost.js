import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../app/firebase";

export const useUpdatePost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/posts?postId=${postId}`);
        const data = await response.json();
        if (!response.ok) {
          console.log(data.message);
          setUpdateError(data.message);
          return;
        }

        if (response.ok) {
          setUpdateError(null);
          setFormData(data.posts[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/post/update/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setUpdateError(data.message);
        return;
      }
      if (response.ok) {
        setUpdateError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setUpdateError(error, "Something went wrong!");
    }
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return {
    file,
    setFile,
    imageUploadProgress,
    imageUploadError,
    updateError,
    formData,
    handleUploadImage,
    handleSubmit,
    updateFormData,
  };
};
