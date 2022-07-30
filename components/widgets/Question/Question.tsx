import { QuestionType } from "@core/types";
import { UserInfo } from "../UserInfo";

interface QuestionProps {
  data: QuestionType;
}

export const Question = ({ data }: QuestionProps) => {
  return (
    <div>
      <p>{data.content}</p>

      <UserInfo />
    </div>
  );
};
