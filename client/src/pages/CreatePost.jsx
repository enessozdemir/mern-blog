import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FiCamera } from "react-icons/fi";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreatePost() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [showPreview, setShowPreview] = useState(true);
  const [createError, setCreateError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });

  const imagePickerRef = useRef();

  const getPreviewContent = (content) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > 330
      ? plainText.substring(0, 330) + "..."
      : plainText;
  };

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
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setCreateError(data.message);
        return;
      }
      if (response.ok) {
        setCreateError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setCreateError(error, "Something went wrong!");
    }
  };

  return (
    <div className="w-full container mx-auto flex flex-col sm:flex-row gap-x-2 justify-between px-5 py-10 mb-20 sm:px-0">
      {/* new post */}
      <div className="w-full sm:w-2/3">
        <h1 className="text-2xl font-semibold">Create a post</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-5"
        >
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            className="rounded"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <Select
            id="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a Category</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="travel">Travel</option>
            <option value="other">Other</option>
          </Select>

          <div
            className={`flex flex-row justify-between border-4 border-icon-color border-dashed p-2`}
          >
            <FileInput
              id="image"
              ref={imagePickerRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              size="sm"
              color="light"
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>
          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write your content here"
            className="mb-12 h-72"
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />

          <Button type="submit" color="success">
            Create Post
          </Button>
          {createError && (
            <Alert className="mt-5" color="failure">
              {createError}
            </Alert>
          )}
        </form>
      </div>

      {/* preview */}
      <div className="w-full sm:w-1/3 border h-full mt-14 sm:mt-0 p-5">
        <div
          className="flex justify-between border-b pb-3 cursor-pointer"
          onClick={() => setShowPreview(!showPreview)}
        >
          <p className="text-xl font-semibold">Preview</p>
          <p className="text-xl mt-1">
            {showPreview ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
          </p>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden mt-5 ${
            showPreview ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full rounded-tl-3xl rounded-tr-3xl border overflow-x-hidden">
            <div
              className="w-full h-60 rounded-tl-3xl rounded-tr-3xl border-b cursor-pointer"
              onClick={() => imagePickerRef.current.click()}
            >
              {formData.image ? (
                <img
                  className="w-full h-full rounded-tl-3xl rounded-tr-3xl"
                  src={formData.image}
                  alt=""
                />
              ) : (
                <div className="flex justify-center pt-20">
                  <FiCamera size={85} />
                </div>
              )}
            </div>

            <div className="flex flex-col mt-7 px-3">
              <h2 className="text-2xl font-semibold">{formData.title}</h2>
              <p className={`text-xs text-icon-color underline`}>
                {formData.category}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: getPreviewContent(formData.content),
                }}
                className="text-sm text-gray-500 text-justify py-10 space-y-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
