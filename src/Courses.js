import React from "react";
import { useQuery } from "react-query";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

const coursesMachine = createMachine({
  id: "courses",
  initial: "initial",
  states: {
    initial: {
      on: {
        FETCH: { target: "fetching" },
      },
    },
    fetching: {
      on: {
        FETCH_SUCCESS: { target: "main" },
        FETCH_ERROR: { target: "error" },
        FETCH_EMPTY: { target: "empty" },
      },
    },
    error: {
      FETCH: { target: "fetching" },
    },
    main: {
      type: "final",
    },
    empty: {
      type: "final",
    },
  },
});

const getCourses = async () => {
  const res = await fetch(
    "https://gw.ruangguru.com/skillacademy/discovery/course-categories?categorySerial=CAT-DZYYVTRF&page=1&pageSize=100"
  );
  const { data } = await res.json();
  return data;
};

export default function Courses() {
  const { data, status } = useQuery("courses", getCourses);

  const [state, send] = useMachine(coursesMachine);

  React.useEffect(() => {
    if (status === "loading") {
      send("FETCH");
    } else if (status === "success") {
      send("FETCH_SUCCESS");
    } else if (status === "error") {
      send("FETCH_ERROR");
    }
  }, [status, send]);

  return state.value === "initial" || state.value === "fetching" ? (
    <div>loading...</div>
  ) : state.value === "error" ? (
    <div>error happens</div>
  ) : state.value === "empty" ? (
    <div>courses empty</div>
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
