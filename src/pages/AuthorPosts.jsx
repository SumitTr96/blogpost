import PostsItem from "../component/PostsItem";


const AuthorPosts= () => {

  return (
    <section>
      {
        <ul>
        <PostsItem />  {/*The data will look same because it renders same home component,
                          Where as it must show the posts of respective authors*/}
      </ul>
      }

    </section>
  );
};

export default AuthorPosts;