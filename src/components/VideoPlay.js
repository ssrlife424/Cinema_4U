import React from 'react'
import { IoClose } from "react-icons/io5";
import useFetchDetails from '../hooks/useFetchDetails';

const VideoPlay = ({data, close,media_type}) => {
  const { data : videoData } = useFetchDetails(`/${media_type}/${data?.id}/videos`)
console.log("videoData",videoData);
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-opacity-50 bg-neutral-700'> 
        <div className='bg-black w-full  max-h-[80vh] max-w-screen-lg aspect-video rounded  relative'>
          
          <button onClick={close} className='absolute z-50 text-3xl -right-1 -top-6'>
              <IoClose/>
          </button>

          {videoData?.results?.[0] ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoData.results[0].key}`}
            className="w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Video not available
          </div>
        )}


        </div>
    </section>
  )
}

export default VideoPlay
