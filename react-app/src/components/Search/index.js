import React, {useEffect, useState} from "react";
import "./search.css";

const Search = () => {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState("")

    useEffect(() => {
        if (search == "hi") {
            setResult(search)
        }
    }, [search])

    return (
        <div className="search-box sidebar">
            <input
                name="search"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-results">
                {result}
            </div>
        </div>
    )
}

export default Search;
