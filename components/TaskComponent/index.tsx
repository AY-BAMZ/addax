import { Task } from "@/contexts/TasksContext";
import { styled } from "@/lib/stitches";
import React from "react";

const Text = styled("p", {
  fontWeight: 400,
  fontSize: 14,
});
const TextTwo = styled("p", {
  fontWeight: 400,
  fontSize: 10,
  fontStyle: "italic",
  marginTop: -8,
});
const FlexContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  widthf: "100%",
  backgroundColor: "#ffffff",
  padding: "0.5rem",
  boxShadow: "0 0 3px #DADFE3FF",
  borderRadius: "0.3rem",
});
const FlexRow = styled("span", {
  display: "flex",
  gap: "0.5rem",
  borderRadius: "9999px",
});
const Span = styled("span", {
  width: "3rem",
  height: "0.5rem",
  borderRadius: "9999px",
});
const BlueSpan = styled(Span, { backgroundColor: "#3D6DC3" });
const PinkSpan = styled(Span, { backgroundColor: "#B13DC3FF" });
const GreenSpan = styled(Span, { backgroundColor: "#5CC342" });
const CaramelSpan = styled(Span, { backgroundColor: "#56D4ADFF" });
const YellowSpan = styled(Span, { backgroundColor: "#E9E200" });
const OrangeSpan = styled(Span, { backgroundColor: "#F5B638" });
const RedSpan = styled(Span, { backgroundColor: "#F95353FF" });

function TaskComponent({ data }: { data: Task }) {
  return (
    <FlexContainer>
      <FlexRow>
        {data.type === "holiday" ? (
          <>
            {data.status === "pending" && <PinkSpan />}
            <BlueSpan />
            {data.status === "completed" && (
              <>
                <CaramelSpan />
              </>
            )}
          </>
        ) : data.type === "task" ? (
          <>
            {data.status === "pending" && <GreenSpan />}
            {data.status === "active" && (
              <>
                <GreenSpan />
                <YellowSpan />
              </>
            )}
            {data.status === "completed" && (
              <>
                <GreenSpan />
                <YellowSpan />
                <OrangeSpan />
              </>
            )}
            {data.status === "overdue" && <RedSpan />}
          </>
        ) : null}
      </FlexRow>
      {data.type === "holiday" ? <TextTwo>Holiday</TextTwo> : null}
      <Text>{data?.name}</Text>
    </FlexContainer>
  );
}

export default TaskComponent;
