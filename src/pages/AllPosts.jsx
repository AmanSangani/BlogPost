import React, { useState, useEffect } from 'react'
import appWriteService from '../appwrite/service'
import { Container, Card } from '../components'

function AllPosts() {
    const [post, setPost] = useState([])
    useEffect(() => {
        appWriteService.getAllPosts([]).then((post) => {
            if (post) {
                setPost(post.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        post.map((data) => (
                            <div className='w-1/4 p-2' key={data.$id}>
                                <Card data={data} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPosts