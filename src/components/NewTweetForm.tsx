import ProfileImage from "./ProfileImage";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
export default function NewTweetForm() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const updateTextAreaSize = (textArea?: HTMLTextAreaElement) => {
    if (textArea == null) return;
    textArea.style.height = "0";
    textArea.style.height = `${textArea.scrollHeight}px`;
  };
  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);
  if (session.status !== "authenticated") return;
  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          style={{ height: 0 }}
          className="flex-grow resize-none overflow-hidden p-4 text-lg "
          placeholder="What's happeing?"
        />
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
}
