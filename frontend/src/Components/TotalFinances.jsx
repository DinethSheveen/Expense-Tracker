function TotalFinances({getTotalIncome,border,textColor}) {
  return (
    <div className={`rounded-[5px] border-2 ${border} p-2 font-bold flex flex-col md:text-2xl ${textColor} 2xl:text-5xl 2xl:p-6 2xl:border-4 2xl:rounded-[10px]`}>
        <p>Total Income</p>
        <p>${getTotalIncome()}</p>
    </div>
  )
}

export default TotalFinances