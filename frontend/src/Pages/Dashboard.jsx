import Chart from "../Components/Chart"

function Dashboard() {

  return (
    <div className='dashboard flex-1 justify-center pt-30 rounded-[10px] px-4'>
      {/* FLEX CONTAINER */}
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:gap-2">
        {/* LEFT - CHART */}
        <Chart/>

        {/* RIGHT - RECENT HISTORY */}
        <div className="history flex-1 w-full px-4 md:w-auto md:px-0">
          <p className="text-center mb-3 font-bold">Recent History</p>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-3 items-center bg-gray-700 py-4 px-2 rounded-[5px]">
              <p>Income</p>
              <p>34</p>
            </div>
            <div className="flex justify-between gap-3 items-center bg-gray-700 py-4 px-2 rounded-[5px]">
              <p>Income</p>
              <p>34</p>
            </div>
            <div className="flex justify-between gap-3 items-center bg-gray-700 py-4 px-2 rounded-[5px]">
              <p>Income</p>
              <p>34</p>
            </div>
          </div>
        </div>
      </div>

      {/* FLEX CONTAINER */}
      <div className="flex justify-between items-start gap-4 mt-5">
        <div className="flex-1 grid grid-cols-1 gap-5 md:grid-cols-2 md:flex-2">
          <div className="rounded-[5px] bg-gray-700 border-2 border-gray-500 p-2 text-2xl font-bold flex flex-col">
            <p>Total Income</p>
            <p>$8000</p>
          </div>
          <div className="rounded-[5px] bg-gray-700 border-2 border-gray-500 p-2 text-2xl font-bold flex flex-col">
            <p>Total Expense</p>
            <p>$4000</p>
          </div>
          <div className="rounded-[5px] bg-gray-700 border-2 border-gray-500 p-2 text-2xl font-bold flex flex-col">
            <p>Profit Margin</p>
            <p>$4000</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-between gap-8 h-full">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center px-2 font-bold">
              <p>Min</p>
              <p>Salary</p>
              <p>Max</p>
            </div>
            <div className="flex justify-between items-center rounded-[5px] bg-gray-700 border-2 border-gray-500 py-4 px-2">
              <p className="text-2xl">20</p>
              <p className="text-2xl">200</p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center px-2 font-bold">
              <p>Min</p>
              <p>Salary</p>
              <p>Max</p>
            </div>
            <div className="flex justify-between items-center rounded-[5px] bg-gray-700 border-2 border-gray-500 py-4 px-2">
              <p className="text-2xl">20</p>
              <p className="text-2xl">200</p>
            </div>
          </div>
        </div>
      </div >

    </div>
  )
}

export default Dashboard