export const Table = ({ titles, data }: { titles: string[], data: any[] }) => {
  return (
    <section className="flex flex-col h-full">
      <TitleRow titles={titles} />
      {
        data.map((d, index) => (
          <RowItem key={index} data={d} />
        ))
      }
    </section>
  )
}

const TitleRow = ({ titles }: { titles: string[] }) => {
  return (
    <div className="w-full h-auto flex items-center gap-8 px-4 py-2 border-white border-x-[1px] border-b-[1px] first:border-t-[1px] first:rounded-t-lg last:rounded-b-lg font-semibold">
      {
        titles.map((title) => (
          <ItemTable key={title} text={title} />
        ))
      }
    </div>
  )
}

const RowItem = ({ data }: { data: { message: string, name: string } }) => {
  return (
    <div className="w-full h-auto flex items-center gap-8 px-4 py-2 border-white border-x-[1px] border-b-[1px] first:border-t-[1px] first:rounded-t-lg last:rounded-b-lg">
      {
        Object.entries(data).map(([, value]) => (
          <ItemTable key={value} text={value} />
        ))
      }
    </div>
  )
}

export const ItemTable = ({ text }: { text: string }) => {
  return (
    <div className="w-[200px] h-[40px] flex items-center truncate">
      {text}
    </div>
  )
}