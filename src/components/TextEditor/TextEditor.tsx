import FroalaEditor from "react-froala-wysiwyg";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/embedly.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";
import { useEffect, useState } from "react";

interface EditorData {
  data: any;
  editedData: any;
  height?: number;
}

const TextEditor = (props: EditorData) => {
  const value = props.data;

  const updatedData = (value: any) => {
    props.editedData(value);
  };
  return (
    <>
      <FroalaEditor
        tag="textarea"
        model={value}
        onModelChange={(data: any) => updatedData(data)}
        config={{
          heightMin: props.height,
          attribution: false,
          placeholderText: "Type Special Instruction",
          toolbarButtons: {
            moreText: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "subscript",
                "superscript",
                "fontFamily",
                "fontSize",
                "textColor",
                "backgroundColor",
                "inlineClass",
                "inlineStyle",
                "clearFormatting",
              ],
            },
            moreParagraph: {
              buttons: [
                "alignLeft",
                "alignCenter",
                "formatOLSimple",
                "alignRight",
                "alignJustify",
                "formatOL",
                "formatUL",
                "paragraphFormat",
                "paragraphStyle",
                "lineHeight",
                "outdent",
                "indent",
                "quote",
              ],
            },
            moreRich: {
              buttons: ["insertImage", "insertTable"],
            },
          },
          pluginsEnabled: ["table", "image"],
        }}
      />
    </>
  );
};

TextEditor.defaultProps = {
  height: 300,
};

export default TextEditor;
