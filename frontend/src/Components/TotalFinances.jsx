function TotalFinances({getTotalIncome,border,text}) {
  return (
    <div className={`rounded-[5px] border-2 ${border} p-2 font-bold flex flex-col md:text-2xl ${text}`}>
        <p>Total Income</p>
        <p>${getTotalIncome()}</p>
    </div>
  )
}

export default TotalFinances