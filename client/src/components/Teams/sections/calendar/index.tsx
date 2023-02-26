import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { useCalendarHook } from "./hooks";
import { styles } from "./styles";

export const Calendar: React.FC = () => {
  const { calendar, matchDate } = useCalendarHook();
  return (
    <Container>
      <Box sx={styles.root}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            {calendar?.matches.map((match) => (
              <Container key={match.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "start",
                    }}
                  >
                    <Typography sx={[styles.font, { width: "160px" }]}>
                      {matchDate(match.utcDate).date}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {match.competition.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "start",
                      margin: "20px",
                      //    backgroundColor: match.status === "FINISHED" ? "red" : "darkseagreen",
                    }}
                  >
                    <Typography>Тур {match.matchday}</Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                      }}
                    >
                      <Typography sx={[styles.font, { margin: "0 4px 0 4px" }]}>
                        {match.homeTeam.name}
                      </Typography>

                      <Typography sx={styles.font}>
                        {match.score.fullTime.home >= 0
                          ? match.score.fullTime.home
                          : null}
                      </Typography>
                      <Typography sx={{ margin: "4px" }}>-</Typography>
                      <Typography sx={styles.font}>
                        {match.score.fullTime.away >= 0
                          ? match.score.fullTime.away
                          : null}
                      </Typography>

                      <Typography sx={[styles.font, { margin: "0 4px 0 4px" }]}>
                        {match.awayTeam.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider sx={{ marginTop: "5px" }} />
              </Container>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
