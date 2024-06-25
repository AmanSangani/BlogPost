import React, { useState, useEffect } from 'react'
import appWriteService from '../appwrite/service'
import { Container, Card } from '../components'

function Home() {
    const [post, setPost] = useState([])
    useEffect(() => {
        appWriteService.getAllPosts([]).then((post) => {
            if (post) {
                setPost(post.documents)
            }
        })
    }, [])

    if (post.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='w-full p-2'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        post.map((data) => (
                            <div className='w-1/4 p-2' key={data.$id}>
                                <Card {...data} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Home