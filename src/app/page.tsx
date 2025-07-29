// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { Grid, Column, Tile } from "@carbon/react";
// import SearchBar from "@/components/SearchBar";
// import WeatherCard from "@/components/WeatherCard";
// import styles from "./Home.module.css";

// export default function Home() {
//   const weather = useSelector((state: RootState) => state.weather.data);

//   return (
//     <main className={styles.main}>
//       <div className={styles.container}>
//         <Grid fullWidth condensed>
//           <Column sm={4} md={6} lg={8}>
//             <Tile className={styles.tile}>
//               <h1 className={styles.title}>🌤 Weather App</h1>
//               <SearchBar />
//               {weather && (
//                 <div className={styles.weatherCardWrapper}>
//                   <WeatherCard />
//                 </div>
//               )}
//             </Tile>
//           </Column>
//         </Grid>
//       </div>
//     </main>
//   );
// }






"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Tile } from "@carbon/react";
import { FlexGrid, Row, Column } from "@carbon/react"; // FlexGrid imports
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import styles from "./Home.module.css";

export default function Home() {
  const weather = useSelector((state: RootState) => state.weather.data);

  return (
    <main className={styles.main}>
      <FlexGrid className={styles.grid} fullWidth>
        <Row>
          <Column sm={4} md={6} lg={8} className={styles.centeredColumn}>
            <Tile className={styles.tile}>
              <h1 className={styles.title}>🌤 Weather App</h1>

              <div className="bx--margin-bottom-06">
                <SearchBar />
              </div>

              {weather && (
                <div className="bx--margin-top-06">
                  <WeatherCard />
                </div>
              )}
            </Tile>
          </Column>
        </Row>
      </FlexGrid>
    </main>
  );
}
