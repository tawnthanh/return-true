import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findResults } from "../../store/search.js";

import "./search.css";

const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const searchResults = useSelector(state => state.search);
    const [error, setError] = useState("")

    useEffect(() => {
        console.log(searchResults)
        if (Array.isArray(searchResults)) {
            setResult(searchResults)
        // } else if (searchResults.errors){
        //     // setResult(searchResults.errors)
        //     setError(searchResults.errors)
        //     setError(searchResults.errors[0])
        //     console.log(searchResults.errors)
        } else {
            setResult([])
        }
    }, [searchResults, error])

    useEffect(() => {
        if (search.length) {
            let word = search
            dispatch(findResults(word))
        } else {
            setResult([])
        }
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
                {result.length > 1 && (
                    <div className="user-results">
                        Users:
                        { result.map((person, idx) => (
                                <p>
                                    <a key={idx}>{person.username}</a>
                                </p>
                            ))
                        }
                    </div>

                )}
            </div>
        </div>
    )
}

export default Search;
