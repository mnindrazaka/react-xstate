import React from "react";
import { useQuery } from "react-query";

export default function Courses() {
  const { data, status } = useQuery("courses", () =>
    fetch(
      "https://gw.ruangguru.com/skillacademy/discovery/course-categories?categorySerial=CAT-DZYYVTRF&page=1&pageSize=100"
    )
      .then((res) => res.json())
      .then((res) => res.data)
  );

  return status === "loading" || status === "idle" ? (
    <div>loading...</div>
  ) : status === "error" ? (
    <div>error happens</div>
  ) : (
    <div>
      <ol>
        {data.items.map((item) => (
          <li key={item.courseDetail.courseSerial}>
            {item.courseDetail.courseName}
          </li>
        ))}
      </ol>
    </div>
  );
}
