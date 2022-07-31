import { Question } from "@components/widgets";
import { QuestionType } from "@core/types";

interface RoomQuestionsProps {
  questions: QuestionType[];
  variant?: "admin" | "user";
}

export const RoomQuestions = ({
  questions,
  variant = "user",
}: RoomQuestionsProps) => {
  return (
    <>
      {questions.some((question) => question.isHighlighted) && (
        <>
          <section>
            <h3 className="mb-4 text-2xl font-title">Highlighted</h3>

            {questions
              .filter((question) => question.isHighlighted)
              .map((question) => (
                <Question key={question.id} data={question} variant={variant} />
              ))}
          </section>

          <div className="divider" />
        </>
      )}

      <section>
        {questions
          .filter((question) => !question.isAnswered && !question.isHighlighted)
          .map((question) => (
            <Question key={question.id} data={question} variant={variant} />
          ))}
      </section>

      {questions.some((question) => question.isAnswered) && (
        <>
          <div className="divider" />

          <section>
            <h3 className="mb-4 text-2xl font-title">Answered</h3>

            {questions
              .filter((question) => question.isAnswered)
              .map((question) => (
                <Question key={question.id} data={question} variant={variant} />
              ))}
          </section>
        </>
      )}
    </>
  );
};
