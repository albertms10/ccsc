import moment from "moment";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface TimeRangeOptions {
  textual?: boolean;
}

const momentTime = (time: string): string =>
  moment(time, "HH:mm:ss").format("LT");

/**
 * Hook that returns a function to get the textual
 * time range of two given dates.
 */
export default () => {
  const { t } = useTranslation("events");

  return useCallback(
    (
      start?: string,
      end?: string,
      { textual = false }: TimeRangeOptions = {}
    ): string => {
      if (!start || (!start && !end)) return t("time to determine");

      const timeStart = momentTime(start);

      if (!end) return t("at time", { time: timeStart });

      const timeEnd = momentTime(end);

      return textual
        ? t("from start to end", { start: timeStart, end: timeEnd })
        : `${timeStart}–${timeEnd}`;
    },
    [t]
  );
};
