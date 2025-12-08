import {Line} from "react-chartjs-2"
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Legend,Tooltip } from "chart.js"
import Chart from "../Components/Chart"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Legend,Tooltip)

function Dashboard() {

  return (
    <div className='homepage flex-1 justify-center border border-white min-h-[80vh] rounded-[10px] p-2'>
      <p className='text-2xl font-bold'>Dashboard</p>
      <div>
        <Chart/>
      </div>
    </div>
  )
}

export default Dashboard