import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    dark,
    materialLight,
    coy,
    nord,
    vs,
    dracula,
    prism
} from 'react-syntax-highlighter/dist/esm/styles/prism';


const STYLE_TYPES = {
        "dark":dark,
        "materialLight":materialLight,
        "coy":coy,
        "nord":nord,
        "vs":vs,
        "dracula":dracula,
        "prisa":prism
}

export default function CodeView({
    codeString,
    styleType,
    language,
    editable
}) {
  return (
    <SyntaxHighlighter
      language={language}
      style={STYLE_TYPES[styleType] || dark}
      customStyle={{
        fontSize: "12px",
        maxHeight: "30vh"
      }}
    >
      {codeString}
    </SyntaxHighlighter>
  );
};