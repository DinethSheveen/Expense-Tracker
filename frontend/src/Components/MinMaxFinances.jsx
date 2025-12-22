function MinMaxFinances({getMinMaxFinance,financeData,title}) {
  return (
    <div className="flex flex-col w-full 2xl:gap-5">
        <div className="flex justify-between items-center gap-3 px-2 font-bold">
            <p>Min</p>
            <p>Max</p>
        </div>
        <div className="flex justify-between items-center gap-3 rounded-[5px] bg-gray-700 border-2 border-gray-500 py-4 px-2 2xl:py-8 2xl:rounded-[10px] 2xl:border-4">
            <p>{getMinMaxFinance(financeData)[0]}</p>
            <p>{title}</p>
            <p>{getMinMaxFinance(financeData)[1]}</p>
        </div>
    </div>
  )
}

export default MinMaxFinances