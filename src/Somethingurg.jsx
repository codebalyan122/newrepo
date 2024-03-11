import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const Somethingurg = () => {
  return (
    <div>
      <div>
        <h2>Using CKEditor</h2>
        <CKEditor
          editor={Editor}
          onReady={(editor) => {
            console.log("editor is ready", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(event, editor, data);
          }}
          onBlur={(event, editor) => {
            console.log("blur", editor);
          }}
          onFocus={(event, editor) => {
            console.log("focus", editor);
          }}
        />
      </div>
    </div>
  );
};

export default Somethingurg;
