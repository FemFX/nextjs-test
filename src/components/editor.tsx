"use client";

import { Dispatch, FC, SetStateAction, useId } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

interface EditorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Editor: FC<EditorProps> = ({ value, setValue }) => {
  const id = useId();
  function onChange(newValue: string) {
    setValue(newValue);
    console.log(value);
  }
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      value={value}
      name={id}
      onChange={onChange}
      editorProps={{ $blockScrolling: true }}
      className="editor"
    />
  );
};

export default Editor;
