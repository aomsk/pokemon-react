import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idPoke, setIdPoke] = useState(1);
  const [favPoke, setFavPoke] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const getPokemon = async () => {
      try {
        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPoke}`, {
          signal: abortController.signal,
        });
        setPokemons(response.data);
        setError("");
      } catch (error) {
        // console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getPokemon();

    return () => abortController.abort();
  }, [idPoke]);

  const nextPokemon = () => {
    if (idPoke < 1010) {
      setIdPoke((idPoke) => idPoke + 1);
    }
  };

  const backPokemon = () => {
    if (idPoke > 1) {
      setIdPoke((idPoke) => idPoke - 1);
    }
  };

  const favPokemon = (pokemons) => {
    setFavPoke((previousState) => [...previousState, pokemons]);
  };
  console.log(favPoke);

  const StatusComponent = () => {
    return (
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={12} xl={6} className="text-center">
          <h1 className="fw-bold mt-3">
            {idPoke}. {pokemons.name}
          </h1>
          <div className="text-center">
            <img className="w-75 h-75" src={pokemons?.sprites?.other.home.front_default} alt={pokemons.name} />
          </div>
          <div className="mt-3">
            <Button variant="light" onClick={backPokemon}>
              Back
            </Button>
            <Button variant="light" className="m-2" onClick={nextPokemon}>
              Next
            </Button>
            <FontAwesomeIcon className="heart" icon={faHeart} size="xl" style={{ color: "#ff004c" }} onClick={() => favPokemon(pokemons)} />
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} xl={6} className="text-start">
          <Row className="mt-5">
            <h5 className="fw-semibold">Abilitie</h5>
            {pokemons.abilities?.map((abilitie, index) => {
              return (
                <div key={index} className="col-sm col-xl-3">
                  <p key={index} className="border border-dark rounded p-1 text-center">
                    {abilitie.ability.name}
                  </p>
                </div>
              );
            })}
          </Row>
          <h5 className="fw-semibold">Height</h5>
          <p>{pokemons.height} m</p>
          <h5 className="fw-semibold">Weigth</h5>
          <p>{pokemons.weight} kg</p>
          <h5 className="fw-semibold">stats</h5>
          {pokemons.stats?.map((stat, index) => {
            return (
              <div key={index} className="row">
                <div className="col-4">{stat.stat.name}</div>
                <div className="col-8">
                  <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar progress-bar-striped" style={{ width: `${stat.base_stat}%` }}>
                      {stat.base_stat}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="mt-3">
            <h5 className="fw-semibold">Types</h5>
            <Row>
              {pokemons.types?.map((type, index) => {
                return (
                  <div className="col-sm col-xl-3" key={index}>
                    <p className="border border-dark rounded p-1 text-center">{type.type.name}</p>
                  </div>
                );
              })}
            </Row>
          </div>
          <div className="mt-3">
            <h5 className="fw-semibold">Favorite ({favPoke.length})</h5>
            <Row>
              {favPoke?.map((fav, i) => {
                return (
                  <Col xs={6} sm={6} xl={3} key={i}>
                    <FontAwesomeIcon
                      className="icon-minus"
                      icon={faCircleMinus}
                      size="xl"
                      style={{ color: "#ff004c" }}
                      onClick={() => {
                        const index = favPoke.indexOf(fav);
                        if (index > -1) {
                          const currentListCopy = [...favPoke];
                          currentListCopy.splice(index, 1);
                          setFavPoke(currentListCopy);
                        }
                      }}
                    />
                    <img style={{ cursor: "pointer" }} className="w-75 h-100" src={fav?.sprites?.other.home.front_default} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Container>
        {loading ? (
          <Row className="justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
        ) : pokemons ? (
          <StatusComponent />
        ) : (
          <div className="text-center text-danger">
            <h2 className="fw-semibold">{error}</h2>
          </div>
        )}
      </Container>
    </>
  );
}

export default App;
