import React, {useState, useEffect} from 'react'
import { Container, Card } from '../components'
import dbService from "../appwrite/db";

function Posts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        dbService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Card {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Posts