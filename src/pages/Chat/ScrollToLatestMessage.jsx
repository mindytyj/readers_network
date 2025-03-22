import { useEffect, useRef } from "react";

export default function ScrollToLatestMessage() {
  const scrollRef = useRef();
  useEffect(() => scrollRef.current?.scrollIntoView());
  return <div ref={scrollRef} />;
}
