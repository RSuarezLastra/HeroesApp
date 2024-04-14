import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../helpers';
import queryString from 'query-string';
import { HeroCard } from '../components';

export const SearchPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search)

    const heroes = getHeroesByName(q);

    const showSearch = (q.length === 0);
    const showError = (q.length > 0) && heroes.length === 0;

    const { searchInput, onInputChange } = useForm({
        searchInput: q
    });

    const onSearchSubmit = (e) => {
        e.preventDefault();
        // if (searchInput.trim() - length <= 1) return;

        navigate(`?q=${searchInput}`)
    }

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={onSearchSubmit}>
                        <input
                            type="text"
                            name="searchInput"
                            placeholder="search hero"
                            className="form-control"
                            autoComplete="off"
                            value={searchInput}
                            onChange={onInputChange} />

                        <button
                            type='submit'
                            className="btn btn-primary mt-2">
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {/* {
                        (q === '')
                            ? <div className="alert alert-primary">Search a hero</div>
                            : (heroes.length === 0)
                            && <div className="alert alert-danger"> No hero with <b>{q}</b></div>
                    } */}

                    <div
                        className="alert alert-primary animate__animated animate__fadeIn"
                        style={{ display: showSearch ? '' : 'none' }}>
                        Search a hero
                    </div>

                    <div
                        className="alert alert-danger animate__animated animate__fadeIn"
                        style={{ display: showError ? '' : 'none' }}>
                        No hero with <b>{q}</b>
                    </div>

                    {
                        heroes.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
