import type { GetStaticPropsContext, NextPage } from 'next'
import Page from '@layouts/Page'
import { GetStaticPaths } from 'next'
import { useSession } from "next-auth/react";
import { useState } from "react";
import PostPreview from '@components/PostPreview/PostPreview'
import SEO from '@components/SEO'
import { Post, Comment, Like, Category, User } from '@prisma/client'
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from 'src/server/route/app.router';
import superjson from 'superjson'
import { prisma } from "../../server/db/client";
import { createContext }  from '../../server/createContext'
import LikesAndComments from '@components/PostPreview/LikesAndComments'
import { trpc } from 'src/utils/trpc';
import CommentForm from '@components/PostPreview/CommentForm';
import Comments from '@components/PostPreview/Comments';

interface Props {
  post: Post & { Category: Category, likes: Like[], comments: Comment[], author: User}
}

const SinglePost: NextPage<Props> = ({ post }) => {
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false)
  const { data: latestPost, refetch } = trpc.useQuery(['posts.byId', {
    post_id: post.id
  }])

  return (
    <Page>
      <SEO title={post.title} description={post.short_description} author={post.author_id} />
      <div className="grid grid-cols-1 xl:grid-cols-post gap-20">
        <PostPreview post={post} />

        <div className="xl:sticky xl:top-5">
          {latestPost && (
            <>
              <LikesAndComments
                post_id={post.id}
                likes={latestPost.likes}
                comments={latestPost.comments}
                refetch={refetch}
              />

              <Comments 
                comments={latestPost.comments} 
                refetch={refetch}
              />
            </>
          )}

          
          {!showCommentForm && (
              <button 
                className='text-blue-400 mt-2' 
                onClick={() => setShowCommentForm(true)}
              >
                Add Comment
              </button>
          )}

          {showCommentForm && (
            <CommentForm
              post_id={post.id}
              refetch={refetch}
              setShowCommentForm={setShowCommentForm} 
            />
          )}
        </div>
      </div>
    </Page>
  )
}

export default SinglePost

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma?.post.findMany({
    where: {
      visibility: {
        in: ['PUBLIC']
      }
    }
  })

  const paths = posts?.map((post) => {
    return { params: { slug: post.id } };
  });

  return {
    paths: paths || [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext<{slug: string }>) => {
  const slug = context.params?.slug as string

  const ssg = await createSSGHelpers({
    transformer: superjson,
    router: appRouter,
    ctx: await createContext({})
  });

  const posts = await ssg.fetchQuery('posts.byId', {
    post_id: slug
  })

  return {
    props: {
      post: posts
    }
  }
};
