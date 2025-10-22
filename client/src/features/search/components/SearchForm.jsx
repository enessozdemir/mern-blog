import { Button, Select, TextInput } from "flowbite-react";

export default function SearchForm({ searchData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <TextInput
        id="searchTerm"
        placeholder="Type to search"
        type="text"
        value={searchData.searchTerm}
        onChange={handleChange}
      />
      <div className="flex sm:gap-3 sm:justify-normal justify-between">
        <Select id="sort" value={searchData.sort} onChange={handleChange}>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </Select>
        <Select
          id="category"
          value={searchData.category}
          onChange={handleChange}
        >
          <option value="uncategorized">Select a Category</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </Select>

        <Button color="light" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
}
