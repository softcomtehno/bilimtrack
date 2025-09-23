import { Accordion, AccordionItem } from "@heroui/react";
import {
  CheckCircle,
  ThumbsUp,
  Sparkles,
  Star,
  BookOpen,
} from "lucide-react";

export default function ScoreMemo() {
  return (
    <Accordion  className="w-full shadow-none rounded" >
      <AccordionItem
      className="w-full p-2 rounded  "
        key="memo"
        aria-label="Памятка"
        title="📌 Памятка по системе оценивания"
      >
        <div className="flex flex-col rounded gap-4 text-slate-700">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
            <p>
              <span className="font-semibold">5 баллов</span> — только{" "}
              <span className="underline">присутствие</span> на занятии.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <ThumbsUp className="w-6 h-6 text-orange-500 shrink-0" />
            <p>
              <span className="font-semibold">6–7 баллов</span> — присутствие +
              <span className="underline"> частичная активность</span> (ответы,
              но не до конца, задание с ошибками).
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-purple-500 shrink-0" />
            <p>
              <span className="font-semibold">8–9 баллов</span> —{" "}
              <span className="underline">хорошая активность</span>, работа почти
              без ошибок, но не на максимум.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Star className="w-6 h-6 text-yellow-500 shrink-0" />
            <p>
              <span className="font-semibold">10 баллов</span> —{" "}
              <span className="underline">максимум за одно занятие</span>:
              присутствие + активность, всё выполнено правильно.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-blue-600 shrink-0" />
            <p>
              <span className="font-semibold">10+ баллов</span> (например, 15 или
              20) — значит в этот день пара проходила{" "}
              <span className="underline">два раза</span>, и баллы начислены за
              каждую.
            </p>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
