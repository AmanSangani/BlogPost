import React from 'react'
import appWriteService from '../appwrite/service'
import { Link } from 'react-router-dom'

function Card({
    $id, title, featuredImage
}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full p-4 bg-gray-500 rounded-xl'>
                <div className='justify-center w-full mb-4'>
                    <img src={appWriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default Card
