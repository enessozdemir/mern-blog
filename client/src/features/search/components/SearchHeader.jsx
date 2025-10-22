export default function SearchHeader({ searchTerm }) {
  return (
    <h1 className="text-gray-400 sm:text-4xl text-3xl font-semibold">
      Results for{" "}
      <span className="text-primary-color dark:text-soft-white">
        {searchTerm || "..."}
      </span>
    </h1>
  );
}
