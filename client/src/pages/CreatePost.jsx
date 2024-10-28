import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FiCamera } from "react-icons/fi";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";

export default function CreatePost() {
  const [showPreview, setShowPreview] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    imageUrl: null,
  });
  const imagePickerRef = useRef();

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl: imageUrl });
    }
  };

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
        <h1 className="text-2xl font-semibold">Create a post</h1>
        <form action="" className="flex flex-col gap-4 mt-5">
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            className="rounded"
            onChange={handleChange}
            required
          />
          <Select id="category" onChange={handleChange}>
            <option value="">Select a Category</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Travel">Travel</option>
            <option value="Other">Other</option>
          </Select>

          <div
            className={`flex flex-row justify-between border-4 border-icon-color border-dashed p-2`}
          >
            <FileInput
              id="imageUrl"
              ref={imagePickerRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button
              type="button"
              size="sm"
              color="light"
              onClick={() => imagePickerRef.current.click()}
            >
              Upload Image
            </Button>
          </div>

          <ReactQuill
            theme="snow"
            placeholder="Write your content here"
            className="mb-12 h-72"
            onChange={handleContentChange}
          />

          <Button type="submit" color="success">
            Create Post
          </Button>
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
              {formData.imageUrl ? (
                <img
                  className="w-full h-full rounded-tl-3xl rounded-tr-3xl"
                  src={formData.imageUrl}
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
