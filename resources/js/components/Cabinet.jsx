import {useEffect, useState} from "react";
import NavDate from "@/components/NavDate.jsx";
import MovieItem from "@/components/MovieItem.jsx";
import useFetching from "@/hooks/useFetching.js";

const Cabinet = () => {
    const [choseData, setChoseData] = useState(new Date());
    const {data: movies} = useFetching('/api/movies');
    const {data: cinemas} = useFetching('/api/cinemas');

    return (
        <div>
            <NavDate choseData={choseData}
                     setChoseData={setChoseData}/>

            <main>
                {movies?.length && movies.map((movie) => <MovieItem key={movie.id} movie={movie}
                                                                    cinemas={cinemas || []}/>)}
            </main>
        </div>
    )
}

export default Cabinet;
