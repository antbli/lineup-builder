import { useState } from "react";
import { PlayerModel } from "./Player";
import { Lineup, LineupModel } from "./Lineup";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

type LineupId = "1stLine" | "2ndLine" | "3rdLine" | "4thLine";

type RosterModel = {
  goalie?: PlayerModel;
  firstLine: LineupModel;
  secondLine: LineupModel;
  thirdLine: LineupModel;
  fourthLine: LineupModel;
  extraPlayers: PlayerModel[];
};

const initialRoster: RosterModel = {
  firstLine: {},
  secondLine: {},
  thirdLine: {},
  fourthLine: {},
  extraPlayers: [],
};

export const Roster = () => {
  const [roster, setRoster] = useState<RosterModel>(initialRoster);

  const [selectedLineup, setSelectedLineup] = useState<LineupId>("1stLine");

  const getLineup = (): LineupModel => {
    switch (selectedLineup) {
      case "1stLine":
        return roster.firstLine;
      case "2ndLine":
        return roster.secondLine;
      case "3rdLine":
        return roster.thirdLine;
      case "4thLine":
        return roster.fourthLine;
      default:
        const exhaustiveCheck: never = selectedLineup;
        return exhaustiveCheck;
    }
  };

  const setGoalie = (goalie?: PlayerModel) => setRoster({ ...roster, goalie });

  const setLineup = (lineup: LineupModel): void => {
    switch (selectedLineup) {
      case "1stLine":
        setRoster({ ...roster, firstLine: lineup });
        break;
      case "2ndLine":
        setRoster({ ...roster, secondLine: lineup });
        break;
      case "3rdLine":
        setRoster({ ...roster, thirdLine: lineup });
        break;
      case "4thLine":
        setRoster({ ...roster, fourthLine: lineup });
        break;
      default:
        const exhaustiveCheck: never = selectedLineup;
        throw new Error(`Unhandled case: ${exhaustiveCheck}`);
    }
  };

  const copyRoster = () => {
    const rosterCopyText = `First line:\n${
      roster.goalie ?? "No player selected"
    }\n${roster.firstLine.rightDefense ?? "No player selected"} ${
      roster.firstLine.leftDefense ?? "No player selected"
    }\n${roster.firstLine.rightWing ?? "No player selected"} ${
      roster.firstLine.center ?? "No player selected"
    } ${roster.firstLine.rightWing ?? "No player selected"}`;

    navigator.clipboard.writeText(rosterCopyText);
  };

  return (
    <div style={{ width: "344px", margin: "auto" }}>
      <ToggleButtonGroup
        sx={{
          marginBottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        exclusive
        value={selectedLineup}
        onChange={(_, newLineup) => setSelectedLineup(newLineup)}
        size="small"
      >
        <ToggleButton value="1stLine">1st line</ToggleButton>
        <ToggleButton value="2ndLine">2nd line</ToggleButton>
        <ToggleButton value="3rdLine">3rd line</ToggleButton>
        <ToggleButton value="4thLine">4th line</ToggleButton>
      </ToggleButtonGroup>
      <Lineup
        goalie={roster.goalie}
        lineup={getLineup()}
        setGoalie={setGoalie}
        setLineup={setLineup}
      />
      <Button variant="outlined" onClick={() => setRoster(initialRoster)}>
        Clear
      </Button>
      <Button variant="outlined" onClick={copyRoster}>
        Copy
      </Button>
    </div>
  );
};