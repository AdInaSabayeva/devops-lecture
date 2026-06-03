import lectureMarkdown from "../../lecture/structure.md?raw";
import { parseLecture } from "./parseLecture";
import { attachTemplates } from "./slideTemplates";

export const slides = attachTemplates(parseLecture(lectureMarkdown));
