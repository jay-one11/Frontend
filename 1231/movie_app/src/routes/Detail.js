import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
function Detail() {
  const { id } = useParams(); // url의 변수를 받아오는 함수
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`, [])
    ).json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <h2 className={styles.Loader}>Loading...</h2>
      ) : (
        <div background-image={movie.background_img} className={styles.movies}>
          <h2>{movie.title_long}</h2>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <div className={styles.infomtaion}>
            <p>
              Genres :{" "}
              {movie.genres.map((g, idx) => (
                <span key={idx}>{g} </span>
              ))}
            </p>
            <p>like count : {movie.like_count}</p>
            <p>running time : {movie.runtime}</p>
            <p>{movie.description_full}</p>
          </div>
        </div>
      )}
      ;
    </div>
  );
}

export default Detail;
