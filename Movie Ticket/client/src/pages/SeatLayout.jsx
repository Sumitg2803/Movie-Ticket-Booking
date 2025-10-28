import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyShowsData, dummyDateTimeData } from '../assets/assets'
import Loading from '../components/Loading'
import { ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'

const SeatLayout = () => {
  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const navigate = useNavigate()

  const getShow = async () => {
    const showData = dummyShowsData.find(s => String(s._id) === String(id)) // <— if your id key is `_id`, use that
    if (showData) {
      setShow({
        movie: showData,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(() => { getShow() }, [id])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
        {/*Available Timings*/}
        <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
            <p className='text-lg font-semibold px-6'>Available Timings</p>
            <div className='mt-5 space-y-1'>
                {show.dateTime[date].map((time)=>(
                    <div key={time.time} onClick={()=> setSelectedTime(time)} className= {`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === time.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}> 
                        <ClockIcon className="w-4 h-4" />
                        <p className='text-sm'>{isoTimeFormat(time.time)}</p>
                    </div>
                ))}
            </div>
        </div>

        {/*Seat Layout*/}
        <div>
            <p className='font-medium'>Seat Layout</p>
        </div>

    </div>
  ) : <Loading />
}

export default SeatLayout
