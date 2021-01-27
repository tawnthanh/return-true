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
        <div className="search-box">
            <input
                name="search"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-results sidebar">
                {result}
            </div>
        </div>
    )
}

export default Search;
