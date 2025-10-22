export default function ShowMoreButton({ showMore, handleShowMore }) {
  if (!showMore) return null;

  return (
    <button
      className="block mx-auto mt-10 hover:underline text-teal-400"
      onClick={handleShowMore}
    >
      Show More
    </button>
  );
}
