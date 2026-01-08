import React, { useEffect, useState } from "react";
import type { Log } from "../App";

const frameStyle: React.CSSProperties = {
  height: "100%",
  width: "100%",
  overflow: "scroll",
  display: "flex",
  flexDirection: "column-reverse",
};

const logsDivStyle: React.CSSProperties = {
  width: "100%",
  height: "170px",
  padding: "10px",
  backgroundColor: "gray",
  border: "1px solid black",
  borderRadius: "10px"
};

interface LogFrameProps {
  logs: Log[]
}


// TODO - FUNCIONALIDADE DE "STICK" FUNCIONANDO, MAS OS DADOS MAIS NOVOS SEMPRE FICAM NA POSIÇÃO OPOSTA

export default function LogFrame({ logs }: LogFrameProps) {
  const [logObjs, setLogObjs] = useState<Array<Log>>([]);

  useEffect(() => {
    setLogObjs(logs || []);
  }, [logs]);

  return (
    <>
      <div className="frame" style={frameStyle}>
        {logObjs ? (
          logObjs.map((log) => (
            <div className="log" style={logsDivStyle} key={log.pk}>
              <p>Description: {log.fields.description}</p>
              <p>Event: {log.fields.event}</p>
              <p>Event Description: {log.fields.event_description}</p>
              <p>New Status: {log.fields.new_status}</p>
              <p>Old Status: {log.fields.old_status}</p>
              <p>Date: {new Date(log.fields.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <h1>There aren't any logs</h1>
        )}
      </div>
    </>
  );
}
