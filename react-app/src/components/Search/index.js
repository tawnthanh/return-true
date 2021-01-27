import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findResults } from "../../store/search.js";

import "./search.css";

const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState("");
    const searchResults = useSelector(state => state.search);

    useEffect(() => {
        console.log(searchResults)

    }, [searchResults])

    useEffect(() => {
        // (async () => {
            let word = search
            dispatch(findResults(word))
        // })();
        // setResult("ReferenceError: No results.")
    }, [search])

    return (
        <div className="search-box sidebar">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    name="search"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)
                    }
                />
            </form>
            <div className="search-results ">
                {result}
            </div>
        </div>
    )
}

export default Search;
