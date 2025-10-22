import { useNavigate } from "react-router-dom";

export const usePostCard = () => {
  const navigate = useNavigate();

  const getPreviewContent = (content) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > 150
      ? plainText.substring(0, 150) + "..."
      : plainText;
  };

  const handlePostClick = (slug) => {
    navigate(`/post/${slug}`);
  };

  return {
    getPreviewContent,
    handlePostClick,
  };
};
