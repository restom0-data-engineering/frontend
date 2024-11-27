import React from "react";
import LastValues from "../../components/lastValues";

export default function Dashboard() {
  return (
    <div>
      <div className="mt-10 w-full gap-[20px]">
        <LastValues />
      </div>
    </div>
  );
}
