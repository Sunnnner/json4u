import { useEffect, useState } from "react";
import { ViewMode } from "@/lib/db/config";
import { useStatusStore } from "@/stores/statusStore";
import { useTreeVersion } from "@/stores/treeStore";
import { useShallow } from "zustand/shallow";
import { sendGAEvent } from "@next/third-parties/google";

export function useTableHTML() {
  const { isTableView } = useStatusStore(
    useShallow((state) => ({
      isTableView: state.viewMode === ViewMode.Table,
    })),
  );
  const treeVersion = useTreeVersion();
  const [innerHTML, setInnerHTML] = useState("");

  useEffect(() => {
    if (!(window.worker && isTableView)) {
      console.l("skip table render:", isTableView, treeVersion);
      return;
    }

    (async () => {
      const tableHTML = await window.worker.createTable();
      setInnerHTML(tableHTML);
      console.l("create a new table:", treeVersion, tableHTML.length, tableHTML.slice(0, 100));
      tableHTML.length > 0 && sendGAEvent("event", "cmd_statistics", { name: "tableModeView" });
    })();
  }, [isTableView, treeVersion]);

  return innerHTML ? { __html: innerHTML } : undefined;
}
