import React from "react";
import CardStripSection from "../../components/CardStripSection";

const HomePageMain = ({ popularMovies, topMovies, popularTV, topTV }) => {
  return (
    <>
      {/* Render Popular Movies */}
      <CardStripSection
        media={popularMovies}
        title={"Popular Movies"}
        linkTo={"/movie/category/popular"}
      />

      {/* Render Top Rated Movies */}
      <CardStripSection
        media={topMovies}
        title={"Top Rated Movies"}
        linkTo={"/movie/category/top-rated"}
      />

      {/* Render Popular Shows */}
      <CardStripSection
        media={popularTV}
        title={"Popular Shows"}
        linkTo={"/tv/category/popular"}
      />

      {/* Render Top Rated Shows */}
      <CardStripSection
        media={topTV}
        title={"Top Rated Shows"}
        linkTo={"/tv/category/top-rated"}
      />
    </>
  );
};

export default HomePageMain;
