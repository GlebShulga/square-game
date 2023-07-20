import { useAppSelector } from "../../redux/hooks/hooks";
import { isHardMode } from "../../redux/slices/gameFiledSlice";
import "./Rules.scss";

export const Rules = () => {
  const isHardModeOn = useAppSelector(isHardMode);

  return (
    <div>
      <div className="rules">
        <ol className="rules-list">
          <p className="rules-title">{"Game rules"}</p>
          <li>{"Choose number of vertical and horizontal lines"}</li>
          <li>
            {"Press"} <b>{"Start"}</b>
          </li>
          <li>{"Click on the square when it turns yellow"}</li>
          <li>
            {
              "If you managed to click on the square within 1 second, it turns green"
            }
          </li>
          {isHardModeOn && (
            <li>
              {
                "On a successful hit, the time to hit the next square decreases by 5%, and if you miss, the time increases by 5%"
              }
            </li>
          )}
          <li>{"Keep clicking until half of the squares on the field turn green"}</li>
          <li>{"You win!"}</li>
        </ol>
      </div>
    </div>
  );
};
