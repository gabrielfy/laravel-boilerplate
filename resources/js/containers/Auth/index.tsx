import React from 'react'

import Layout from '@/containers/Layout'

type AppProps = {
  children: React.ReactNode
  image: string
  title: string
  description: string
}

const Auth = ({ children, image, title, description }: AppProps) => {
  return (
    <Layout>
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div
          className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
          style={{ maxWidth: '1000px' }}
        >
          <div className="md:flex w-full">
            <div className="hidden md:flex items-center w-1/2 bg-primary py-10 px-10">
              <img src={image} alt="" />
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-5">
                <h1 className="font-bold text-3xl text-gray-900 mb-2">
                  {title}
                </h1>
                <p>{description}</p>
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Auth
