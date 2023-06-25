import React from "react";

function statusComponent({ pokemons, idPoke }) {
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

  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-md-12 col-xl-6 text-center">
        <h1 className="fw-bold mt-3">
          {idPoke}. {pokemons.name}
        </h1>
        <div className="text-center">
          <img className="w-75 h-75" src={pokemons?.sprites?.other.home.front_default} alt={pokemons.name} />
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-light m-2" onClick={backPokemon}>
            Back
          </button>
          <button type="button" className="btn btn-light" onClick={nextPokemon}>
            Next
          </button>
        </div>
      </div>
      <div className="col-sm-12 col-md-12 col-xl-6 text-start">
        <div className="row mt-5">
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
        </div>
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
          <div className="row">
            {pokemons.types?.map((type, index) => {
              return (
                <div className="col-sm col-xl-3" key={index}>
                  <p className="border border-dark rounded p-1 text-center">{type.type.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default statusComponent;
