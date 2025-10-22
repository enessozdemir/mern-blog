import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FiCamera } from "react-icons/fi";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useUpdatePost } from "../hooks/useUpdatePost";

export default function UpdatePost() {
  const [showPreview, setShowPreview] = useState(true);
  const imagePickerRef = useRef();
  
  const {
    setFile,
    imageUploadProgress,
    imageUploadError,
    updateError,
    formData,
    handleUploadImage,
    handleSubmit,
    updateFormData,
  } = useUpdatePost();

  const getPreviewContent = (content) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > 330
      ? plainText.substring(0, 330) + "..."
      : plainText;
  };

  return (
    <div className="w-full container mx-auto flex flex-col sm:flex-row gap-x-2 justify-between px-5 py-10 mb-20 sm:px-0">
      {/* new post */}
      <div className="w-full sm:w-2/3">
        <h1 className="text-2xl font-semibold">Update Post</h1>
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
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
          />
          <Select
            id="category"
            onChange={(e) => updateFormData("category", e.target.value)}
            value={formData.category}
          >
            <option value="-">Select a Category</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Travel">Travel</option>
            <option value="Other">Other</option>
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
            onChange={(value) => updateFormData("content", value)}
            value={formData.content}
          />

          <Button type="submit" color="success">
            Update Post
          </Button>
          {updateError && (
            <Alert className="mt-5" color="failure">
              {updateError}
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
