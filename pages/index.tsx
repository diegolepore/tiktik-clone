import axios from 'axios';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import { Post } from '../types';
import { BASE_URL } from '../utils';

interface IProps {
  videos: Post[]
}

const Home = ({ videos }: IProps) => {
  console.log(videos)

  return (
    <div className='flex flex-col gap-10 videos h-full'>
      { videos.length ? (
        videos.map((video: Post) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={'No videos to show 🥸'} />
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let res = await axios.get(`${BASE_URL}/api/post`)

  if(topic) {
    res = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: {
      videos: res.data
    }
  }
}

export default Home
