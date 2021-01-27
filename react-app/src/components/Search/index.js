import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findResults } from "../../store/search.js";

import "./search.css";

const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState("");
    const searchResults = useSelector(state => state.results);

    useEffect(() => {
        let word = search
        dispatch(findResults(word))
        // if (searchResults) {
        //     setResult(searchResults)
        // }
        console.log(searchResults)
        setResult(search)
    }, [search, dispatch])

    return (
        <div className="search-box sidebar">
            <input
                name="search"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-results ">
                {result}
            </div>
        </div>
    )
}

export default Search;
