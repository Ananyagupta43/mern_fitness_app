import React, { useState } from 'react'
import SearchIcon from "./../assets/icons/search-icon2.png";
import { fetchData, exerciseOptions } from '../utils/fetchData';
import ModelFront from "../assets/images/FRONT.png";
import ModelBack from "../assets/images/BACK.png";

const SearchExercises = ({ setExercises, setIsLoading, setCurrentPage }) => {
  const [search, setSearch] = useState('');
  const handleSearch = async () => {
    if (search) {
      setIsLoading(true);
      window.scrollTo({ top: 800, left: 0, behaviour: "smooth !important" })
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      const searchedExercises = exerciseData.filter((exercise) => exercise.name.toLowerCase().includes(search)
        || exercise.equipment.toLowerCase().includes(search)
        || exercise.bodyPart.toLowerCase().includes(search)
        || exercise.target.toLowerCase().includes(search)
      );
      setSearch("");
      setExercises(searchedExercises);
      setCurrentPage(1);
      setIsLoading(false);
    }
  }

  return (
    <div className="d-flex flex-column">
      <div style={{ border: "2px solid grey", borderRadius: "30px", width: "450px", margin: "20px auto", display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "10px" }}>

        <input type="search" placeholder="Search exercises..." style={{ padding: "0 5px", fontSize: "16px", width: "400px", borderStyle: "none", fontFamily: "Light" }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}>
        </input>

        <img src={SearchIcon} alt="search" style={{ height: "24px", width: "24px", cursor: "pointer" }}
          onClick={handleSearch} ></img>

      </div>

      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", overflowX: "none" }}>
        <div>
          <img src={ModelFront} useMap="#image-map" alt="human-muscles" />

          <map name="image-map" style={{ cursor: "pointer" }}>
            <area target="" alt="Chest" title="Chest" coords="297,183,311,177,324,176,340,179,352,184,373,176,383,155,379,134,360,124,335,121,308,124,290,126,274,132,268,147,272,165,278,175,286,182" shape="poly" onMouseOver={() => setSearch("chest")} onClick={handleSearch} />
            <area target="" alt="Waist" title="Waist" coords="272,188,376,289" shape="rect" onMouseOver={() => setSearch("waist")} onClick={handleSearch} />
            <area target="" alt="Upper Legs" title="Upper Legs" coords="321,339,304,308,292,292,278,293,267,311,257,333,252,360,246,395,252,428,256,435,262,429,270,429,275,441,289,443,297,433,308,406,315,380,320,355" shape="poly" onMouseOver={() => setSearch("upper legs")} onClick={handleSearch} />
            <area target="" alt="Upper Legs" title="Upper Legs" coords="331,335,335,371,346,404,357,443,364,443,375,443,379,431,383,426,391,434,395,440,398,430,404,404,405,374,397,346,384,319,381,302,370,294,357,292,341,313" shape="poly" onMouseOver={() => setSearch("upper legs")} onClick={handleSearch} />
            <area target="" alt="Lower Legs" title="Lower Legs" coords="365,473,362,495,366,532,376,549,384,580,401,575,406,557,409,518,409,495,399,475,396,461,378,464" shape="poly" onMouseOver={() => setSearch("lower legs")} onClick={handleSearch} />
            <area target="" alt="Lower Legs" title="Lower Legs" coords="287,475,274,470,261,469,253,469,242,504,243,539,247,568,258,569,267,568,279,543,284,530,289,512,289,491" shape="poly" onMouseOver={() => setSearch("lower legs")} onClick={handleSearch} />
            <area target="" alt="Upper Arms" title="Upper Arms" coords="265,165,260,188,249,211,234,229,224,212,223,201,214,202,211,210,210,191,218,169,229,158,243,158,255,159" shape="poly" onMouseOver={() => setSearch("upper arms")} onClick={handleSearch} />
            <area target="" alt="Upper Arms" title="Upper Arms" coords="385,163,392,190,397,208,410,221,420,227,424,215,425,206,431,195,438,205,438,192,435,175,428,165,420,158,402,157" shape="poly" onMouseOver={() => setSearch("upper arms")} onClick={handleSearch} />
            <area target="" alt="Shoulders" title="Shoulders" coords="286,126,268,150,258,154,244,154,236,145,246,131,257,121,268,119,281,117,275,136" shape="poly" onMouseOver={() => setSearch("shoulders")} onClick={handleSearch} />
            <area target="" alt="Shoulders" title="Shoulders" coords="376,127,384,144,389,156,395,156,406,155,413,155,420,154,411,141,408,134,399,127,390,123,383,123" shape="poly" onMouseOver={() => setSearch("shoulders")} onClick={handleSearch} />
            <area target="" alt="Neck" title="Neck" coords="281,115,298,106,308,99,345,98,370,117,356,123,299,126" shape="poly" onMouseOver={() => setSearch("neck")} onClick={handleSearch} />
            <area target="" alt="Lower Arms" title="Lower Arms" coords="417,240,427,224,441,220,451,256,449,287,449,297,433,294,425,264" shape="poly" onMouseOver={() => setSearch("lower arms")} onClick={handleSearch} />
            <area target="" alt="Lower Arms" title="Lower Arms" coords="203,252,200,273,201,297,209,297,216,297,222,291,226,271,230,249,230,230,224,218,211,218,203,235" shape="poly" onMouseOver={() => setSearch("lower arms")} onClick={handleSearch} />
          </map>
        </div>
        <div className="click-text" style={{ fontSize: "25px" }}>Click the body part you want to train</div>
        <div>
          <img src={ModelBack} useMap="#new-image-map" alt="human-muscles" />
          <map name="new-image-map" style={{ cursor: "pointer" }}>
            <area target="" alt="Lower Leg" title="Lower Leg" coords="270,458,264,452,252,464,251,470,249,483,242,497,240,509,239,529,243,555,247,591,245,606,260,608,267,609,263,595,268,585,272,572,277,558,284,539,291,502,287,481,283,465" shape="poly" onMouseOver={() => setSearch("lower leg")} onClick={handleSearch} />
            <area target="" alt="Lower Leg" title="Lower Leg" coords="385,602,385,609,394,609,405,609,411,606,407,589,406,572,410,543,411,521,406,492,400,473,394,461,389,452,382,459,374,458,364,477,361,517,375,547,385,574" shape="poly" onMouseOver={() => setSearch("lower leg")} onClick={handleSearch} />
            <area target="" alt="Upper Leg" title="Upper Leg" coords="332,349,336,374,344,420,360,458,361,469,367,461,372,455,378,456,384,446,393,456,395,440,397,426,401,407,400,392,400,380,396,361,393,350,389,337,385,324,375,337,372,352,361,355,347,360,353,356" shape="poly" onMouseOver={() => setSearch("upper leg")} onClick={handleSearch} />
            <area target="" alt="Upper Leg" title="Upper Leg" coords="264,326,248,381,249,415,255,442,254,455,262,447,270,453,278,457,284,464,290,462,294,448,298,428,306,407,315,376,316,356,305,354,294,355,283,345,277,338" shape="poly" onMouseOver={() => setSearch("upper leg")} onClick={handleSearch} />
            <area target="" alt="Back" title="Back" coords="259,177,261,198,273,225,276,253,277,269,290,271,299,281,314,288,326,289,334,288,346,286,360,275,371,270,374,258,374,238,379,218,387,200,390,179,390,159,396,144,377,136,360,128,324,124,292,129,262,139,248,148" shape="poly" onMouseOver={() => setSearch("back")} onClick={handleSearch} />
            <area target="" alt="Upper Arms" title="Upper Arms" coords="400,152,392,163,392,178,393,192,400,208,412,225,426,222,439,225,446,228,446,210,436,181,435,166,418,152" shape="poly" onMouseOver={() => setSearch("upper arms")} onClick={handleSearch} />
            <area target="" alt="Upper Arms" title="Upper Arms" coords="244,151,222,156,212,172,209,194,203,223,218,218,227,223,236,226,247,216,255,197,259,186,256,168" shape="poly" onMouseOver={() => setSearch("upper arms")} onClick={handleSearch} />
            <area target="" alt="Lower Arms" title="Lower Arms" coords="421,235,433,235,446,237,449,253,449,282,449,297,440,298,430,299,428,278,422,258" shape="poly" onMouseOver={() => setSearch("lower arms")} onClick={handleSearch} />
            <area target="" alt="Lower Arms" title="Lower Arms" coords="200,234,223,239,230,245,226,274,222,296,201,296,201,262" shape="poly" onMouseOver={() => setSearch("lower arms")} onClick={handleSearch} />
            <area target="" alt="Glutes" title="Glutes" coords="279,271,273,284,270,306,267,320,280,336,295,350,310,351,318,342,327,338,335,345,344,353,359,353,375,332,384,322,380,305,378,287,373,275,355,281,340,291,325,291,304,286,291,279,284,275" shape="poly" onMouseOver={() => setSearch("glutes")} onClick={handleSearch} />
            <area target="" alt="Shoulders" title="Shoulders" coords="279,113,264,115,242,125,230,143,230,148,239,148,252,142,269,136,285,128,290,122" shape="poly" onMouseOver={() => setSearch("shoulders")} onClick={handleSearch} />
            <area target="" alt="Shoulders" title="Shoulders" coords="373,116,364,120,365,128,377,131,389,138,400,143,411,147,419,148,412,136,407,126,395,117,383,116,386,117" shape="poly" onMouseOver={() => setSearch("shoulders")} onClick={handleSearch} />
            <area target="" alt="Neck" title="Neck" coords="283,112,286,118,291,123,296,125,304,126,312,126,322,125,332,124,340,124,356,124,365,112,358,105,349,97,341,93,328,92,314,91,305,92,294,101,316,101" shape="poly" onMouseOver={() => setSearch("neck")} onClick={handleSearch} />
          </map>
        </div>
      </div>

    </div>

  )
}

export default SearchExercises;