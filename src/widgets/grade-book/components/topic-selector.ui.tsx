import { Button, Select, SelectItem } from '@heroui/react'
import { Trash2 } from 'lucide-react'

export function TopicSelector({
  sessions,
  selectedDate,
  setSelectedDate,
  currentTopic,
  editing,
  setEditing,
  topics,
  selectedTopic,
  setSelectedTopic,
  handleSave,
  onDelete,
}) {
  return (
    <div className="flex w-full gap-10 flex-col">
      <div className="flex w-full gap-5">
        <Select
          label="Дата"
          selectedKeys={selectedDate ? [selectedDate] : []}
          onChange={(e) => {
            setSelectedDate(e.target.value)
            setEditing(false)
            setSelectedTopic('')
          }}
          renderValue={(items) => {
            const session = sessions.find(
              (s) => `${s.date.replace(/-/g, '_')}_${s.id}` === items[0]?.key
            )
            return (
              <span>
                {session
                  ? `${session.date.replace(/_/g, '.')} — ${session.topic?.title || 'Без темы'}`
                  : ''}
              </span>
            )
          }}
        >
          {sessions.map((s) => {
            console.log(s)

            const key = `${s.date.replace(/-/g, '_')}_${s.id}`
            return (
              <SelectItem
                key={key}
                value={key}
                endContent={
                  <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    variant="light"
                    onClick={(e) => {
                      e.stopPropagation() // чтобы не триггерился выбор Select
                      onDelete(s.id)
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                }
              >
                {s.date.replace(/_/g, '.')} — {s.topic?.title || 'Без темы'}
              </SelectItem>
            )
          })}
        </Select>

        {(!currentTopic || editing) && (
          <Select
            label="Тема"
            selectedKeys={selectedTopic ? [selectedTopic] : []}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {topics.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.title}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>

      {(!currentTopic || editing) && (
        <Button onClick={handleSave} appearance="primary">
          Сохранить
        </Button>
      )}
    </div>
  )
}
