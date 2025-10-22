import { useSearch } from "../hooks/useSearch";
import SearchHeader from "../components/SearchHeader";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import ShowMoreButton from "../components/ShowMoreButton";

export default function SearchPage() {
  const {
    searchData,
    posts,
    loading,
    showMore,
    handleChange,
    handleShowMore,
    handleSubmit,
  } = useSearch();

  return (
    <div className="min-h-screen container mx-auto sm:px-0 px-5 py-10 pb-20">
      <div className="flex flex-col sm:flex-row gap-5 justify-between">
        <SearchHeader searchTerm={searchData.searchTerm} />
        <SearchForm
          searchData={searchData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      <SearchResults posts={posts} loading={loading} />
      
      <ShowMoreButton showMore={showMore} handleShowMore={handleShowMore} />
    </div>
  );
}
