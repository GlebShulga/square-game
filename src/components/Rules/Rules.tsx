import { useAppSelector } from "../../redux/hooks/hooks";
import { isHardMode } from "../../redux/slices/gameFiledSlice";

export const Rules = () => {
  const isHardModeOn = useAppSelector(isHardMode);

  return (
    <div>
      <div className="py-10 px-5 mt-10">
        <ol className="list-decimal text-lg leading-loose text-black text-opacity-75">
          <p className="text-3xl text-center pr-10 underline pb-2">
            {"Game rules"}
          </p>
          <li>{"Choose number of vertical and horizontal lines"}</li>
          <li>
            {"Press"} <span className="font-semibold">{"Start"}</span>
          </li>
          <li>{"Click on the square when it turns yellow"}</li>
          <li>
            {
              "If you managed to click on the square within 1 second, it turns green"
            }
          </li>
          {isHardModeOn && (
            <li>
              {"On hit, the time to hit the next one decreases by 5 percent,"}
              <br />
              {"and if it misses, the time increases by 5 percent."}
            </li>
          )}
          <li>{"Click until half of the squares on the field turn green"}</li>
          <li>{"You win!"}</li>
        </ol>
      </div>
    </div>
  );
};
