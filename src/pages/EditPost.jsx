import React, { useState, useEffect } from 'react'
import appWriteService from '../appwrite/service'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState()
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appWriteService.getPost(slug)
                .then((post) => {
                    console.log(JSON.stringify(post)+"-------");
                    if (post) {
                        setPost(post)
                    }
                })
            console.log(JSON.stringify(post) + "-----------------------------post---------------------");

        }
        else {
            navigate('/')
        }
    }, [slug, navigate])

    // console.log(post+"-----------------------------post---------------------");

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost