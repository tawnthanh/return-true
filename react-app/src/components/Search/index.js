import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findResults } from "../../store/search.js";

import "./search.css";

const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const searchResults = useSelector(state => state.search);
    const [error, setError] = useState(false)

    useEffect(() => {
        setResult([])
        if (Array.isArray(searchResults)) {
            setResult(searchResults)
        } else if (searchResults.username) {
            setResult([searchResults])
        } else if (searchResults.errors) {
            setError(true)
            setResult(searchResults.errors)
        } else {
            setResult([])
        }
    }, [searchResults])

    useEffect(() => {
        if (search.length) {
            let word = search
            dispatch(findResults(word))
            setError(false)
        } else {
            setResult([])
        }
    }, [search, dispatch])

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
                {result.length >= 1 && (
                    <div className="user-results">
                        Users:
                        { error &&
                            <p key={1}>{result[0]}</p>
                        }
                        { !error &&
                            result.map((person, idx) => (
                                <p key={idx+1}>
                                    <a href={`/users/${person.id}`} key={idx} className="user-link">
                                        {person.username}
                                        <div key={person.id} className="user-details">
                                            Name: {person.first_name}
                                            <br />
                                            {person.bio}
                                        </div>
                                    </a>
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
